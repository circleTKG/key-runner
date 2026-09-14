use serde::{Deserialize, Serialize};
use sha2::{Digest, Sha256};
use std::{fs, path::PathBuf};
use tauri::Manager;

#[derive(Default, Serialize, Deserialize)]
struct ScoreStore {
  users: std::collections::HashMap<String, String>,
  scores: Vec<ScoreEntry>,
}

#[derive(Clone, Serialize, Deserialize)]
struct ScoreEntry {
  user_id: String,
  clear_time: u64,
  score: u64,
  total_score: u64,
}

fn store_path(app: &tauri::AppHandle) -> Result<PathBuf, String> {
  let directory = app.path().app_data_dir().map_err(|error| error.to_string())?;
  fs::create_dir_all(&directory).map_err(|error| error.to_string())?;
  Ok(directory.join("key-runner-data.json"))
}

fn read_store(app: &tauri::AppHandle) -> Result<ScoreStore, String> {
  let path = store_path(app)?;
  if !path.exists() {
    return Ok(ScoreStore::default());
  }
  let contents = fs::read_to_string(path).map_err(|error| error.to_string())?;
  serde_json::from_str(&contents).map_err(|error| error.to_string())
}

fn write_store(app: &tauri::AppHandle, store: &ScoreStore) -> Result<(), String> {
  let path = store_path(app)?;
  let contents = serde_json::to_string_pretty(store).map_err(|error| error.to_string())?;
  fs::write(path, contents).map_err(|error| error.to_string())
}

fn hash_password(password: &str) -> String {
  let digest = Sha256::digest(password.as_bytes());
  format!("{digest:x}")
}

#[tauri::command]
fn register_user(app: tauri::AppHandle, user_id: String, password: String) -> Result<(), String> {
  if user_id.trim().is_empty() || password.is_empty() {
    return Err("user-id and password are required".into());
  }
  let mut store = read_store(&app)?;
  if store.users.contains_key(&user_id) {
    return Err("user-id is already registered".into());
  }
  store.users.insert(user_id, hash_password(&password));
  write_store(&app, &store)
}

#[tauri::command]
fn save_score(app: tauri::AppHandle, user_id: String, password: String, clear_time: u64, score: u64, total_score: u64) -> Result<(), String> {
  let mut store = read_store(&app)?;
  match store.users.get(&user_id) {
    Some(hash) if hash == &hash_password(&password) => {}
    _ => return Err("invalid user-id or password".into()),
  }
  store.scores.push(ScoreEntry { user_id, clear_time, score, total_score });
  write_store(&app, &store)
}

#[tauri::command]
fn get_scoreboard(app: tauri::AppHandle) -> Result<Vec<ScoreEntry>, String> {
  Ok(read_store(&app)?.scores)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![register_user, save_score, get_scoreboard])
    .setup(|app| {
      if cfg!(debug_assertions) {
        app.handle().plugin(
          tauri_plugin_log::Builder::default()
            .level(log::LevelFilter::Info)
            .build(),
        )?;
      }
      Ok(())
    })
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}
