import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.161.0/build/three.module.js';
import { createKeyboardState } from './controls.js';

const translations = {
    ja: { pageTitle: 'Key-Runner', time: 'TIME', score: 'SCORE', liveExploration: 'LIVE EXPLORATION', threeError: 'Three.jsの読み込みに失敗しました。', tacticalMap: 'TACTICAL MAP', legendPlayer: '▲ 自分の向き', legendGoal: '● ゴール', mapHelp: '矢印が現在の視線方向。迷宮の奥にある脱出ゲートへ向かおう。', restart: 'リスタート', explorePrompt: '探索して、赤いタイピング扉を探そう。', inputPlaceholder: '扉の前で単語を入力してEnter', initialMessage: '扉から遠ざかることもできます。', loading: 'LOADING KEY-RUNNER', launch: 'ゲームを始める', again: 'もう一度', tutorialPrompt: 'チュートリアル：WASDで右へ進み、赤い扉を目指そう。', doorPrompt: '単語を入力して扉を開けよう。', tutorialDoorPrompt: 'チュートリアル：表示された単語を入力して扉を開けよう。', idleMessage: 'WASDで探索開始。', tutorialIdleMessage: 'WADで右へ進もう。', notNearDoor: '扉の近くにいません。', correct: '正解！扉が開いた。', incorrect: '不正解。', seconds: '秒減少。', tutorialComplete: 'チュートリアル完了！', escaped: '脱出成功！', timeUp: '時間切れ。', home: 'ホームへ戻る', easy: '簡単', normal: '普通', hard: '難しい' },
    en: { pageTitle: 'Key-Runner', time: 'TIME', score: 'SCORE', liveExploration: 'LIVE EXPLORATION', threeError: 'Three.js failed to load.', tacticalMap: 'TACTICAL MAP', legendPlayer: '▲ Player direction', legendGoal: '● Goal', mapHelp: 'Follow the arrow and reach the escape gate deep in the maze.', restart: 'Restart', explorePrompt: 'Explore and find the red typing door.', inputPlaceholder: 'Type the word near the door and press Enter', initialMessage: 'You can also move away from the door.', loading: 'LOADING KEY-RUNNER', launch: 'Start game', again: 'Again', tutorialPrompt: 'Tutorial: move right with WASD and find the red door.', doorPrompt: 'Type the word to open the door.', tutorialDoorPrompt: 'Tutorial: type the shown word to open the door.', idleMessage: 'Use WASD to explore.', tutorialIdleMessage: 'Use WASD to move right.', notNearDoor: 'You are not near a door.', correct: 'Correct! The door opened.', incorrect: 'Incorrect. ', seconds: ' seconds lost.', tutorialComplete: 'Tutorial complete!', escaped: 'Escape successful!', timeUp: 'Time up.', home: 'Back to home', easy: 'Easy', normal: 'Normal', hard: 'Hard' },
    es: { pageTitle: 'Key-Runner', time: 'TIEMPO', score: 'PUNTOS', liveExploration: 'EXPLORACION EN VIVO', threeError: 'No se pudo cargar Three.js.', tacticalMap: 'MAPA TACTICO', legendPlayer: '▲ Direccion del jugador', legendGoal: '● Meta', mapHelp: 'Sigue la flecha y llega a la puerta de escape al fondo del laberinto.', restart: 'Reiniciar', explorePrompt: 'Explora y encuentra la puerta roja de mecanografia.', inputPlaceholder: 'Escribe la palabra cerca de la puerta y pulsa Enter', initialMessage: 'Tambien puedes alejarte de la puerta.', loading: 'CARGANDO KEY-RUNNER', launch: 'Iniciar partida', again: 'Otra vez', tutorialPrompt: 'Tutorial: avanza a la derecha con WASD y busca la puerta roja.', doorPrompt: 'Escribe la palabra para abrir la puerta.', tutorialDoorPrompt: 'Tutorial: escribe la palabra mostrada para abrir la puerta.', idleMessage: 'Usa WASD para explorar.', tutorialIdleMessage: 'Usa WASD para avanzar a la derecha.', notNearDoor: 'No estas cerca de una puerta.', correct: 'Correcto. La puerta se abrio.', incorrect: 'Incorrecto. ', seconds: ' segundos perdidos.', tutorialComplete: 'Tutorial completado.', escaped: 'Escape conseguido.', timeUp: 'Se acabo el tiempo.', home: 'Volver al inicio', easy: 'Facil', normal: 'Normal', hard: 'Dificil' }
};
translations.ja.grid = 'GRID';
translations.ja.pause = '一時中断';
translations.ja.pauseTitle = '一時中断';
translations.ja.resume = '続ける';
translations.ja.retry = 'やり直す';
translations.ja.home = 'ホームに戻る';
translations.ja.extreme = '激むず';
translations.ja.gateBreached = 'GATE BREACHED';
translations.ja.timeUpTitle = 'TIME UP';
translations.ja.publishTitle = 'ランキングに掲載';
translations.ja.publishDescription = 'この記録をランキングに掲載しますか？';
translations.ja.nicknameLabel = 'ニックネーム';
translations.ja.nicknameWarning = '不適切なニックネームは使用しないでください。';
translations.ja.pendingScoreAdded = '判定APIを利用できないため、審査待ちキューに追加しました。';
translations.ja.scoreNotSaved = 'サーバーに接続できなかったため、記録を保存できませんでした。';
translations.ja.nicknameRejected = 'そのニックネームは使用できません。';
translations.ja.publishAnonymous = '掲載しない';
translations.ja.publishSubmit = '掲載する';
translations.en.grid = 'GRID';
translations.en.pause = 'Pause';
translations.en.pauseTitle = 'Paused';
translations.en.resume = 'Resume';
translations.en.retry = 'Retry';
translations.en.home = 'Back to home';
translations.en.extreme = 'Extreme';
translations.en.gateBreached = 'GATE BREACHED';
translations.en.timeUpTitle = 'TIME UP';
translations.en.publishTitle = 'Publish to ranking';
translations.en.publishDescription = 'Would you like to publish this run?';
translations.en.nicknameLabel = 'Nickname';
translations.en.nicknameWarning = 'Please do not use inappropriate nicknames.';
translations.en.pendingScoreAdded = 'The API was unavailable, so this record was added to the review queue.';
translations.en.scoreNotSaved = 'The record could not be saved because the server was unavailable.';
translations.en.nicknameRejected = 'That nickname cannot be used.';
translations.en.publishAnonymous = 'Do not publish';
translations.en.publishSubmit = 'Publish';
translations.es.grid = 'CUADRICULA';
translations.es.pause = 'Pausa';
translations.es.pauseTitle = 'Juego pausado';
translations.es.resume = 'Continuar';
translations.es.retry = 'Reintentar';
translations.es.home = 'Volver al inicio';
translations.es.gateBreached = 'PUERTA ABIERTA';
translations.es.timeUpTitle = 'TIEMPO AGOTADO';
translations.es.extreme = 'Extremo';
translations.es.publishTitle = 'Publicar en la tabla';
translations.es.publishDescription = 'Quieres publicar esta partida?';
translations.es.nicknameLabel = 'Apodo';
translations.es.nicknameWarning = 'No utilices apodos inapropiados.';
translations.es.pendingScoreAdded = 'La API no estaba disponible; el registro se anadio a la cola de revision.';
translations.es.scoreNotSaved = 'No se pudo guardar el registro porque el servidor no estaba disponible.';
translations.es.nicknameRejected = 'Ese apodo no se puede utilizar.';
translations.es.publishAnonymous = 'No publicar';
translations.es.publishSubmit = 'Publicar';
const locale = translations[localStorage.getItem('key-runner-locale')] ? localStorage.getItem('key-runner-locale') : 'ja';
const text = translations[locale];
const progressionStorageKey = 'key-runner-progress';
const progressionOrder = ['tutorial', 'easy', 'normal', 'hard', 'extreme'];

function getDefaultProgressState() {
    return { tutorial: true, easy: false, normal: false, hard: false, extreme: false };
}

function getProgressState() {
    try {
        const stored = JSON.parse(localStorage.getItem(progressionStorageKey) || 'null');
        const progress = stored && typeof stored === 'object' ? { ...getDefaultProgressState(), ...stored } : getDefaultProgressState();
        localStorage.setItem(progressionStorageKey, JSON.stringify(progress));
        return progress;
    } catch {
        const progress = getDefaultProgressState();
        localStorage.setItem(progressionStorageKey, JSON.stringify(progress));
        return progress;
    }
}

function isLevelUnlocked(level) {
    if (level === 'tutorial') {
        return true;
    }
    return Boolean(getProgressState()[level]);
}

function getHighestUnlockedLevel() {
    const progress = getProgressState();
    for (let index = progressionOrder.length - 1; index >= 0; index -= 1) {
        const level = progressionOrder[index];
        if (level !== 'tutorial' && progress[level]) {
            return level;
        }
    }
    return 'easy';
}

function markDifficultyCleared(level) {
    const progress = getProgressState();
    const currentIndex = progressionOrder.indexOf(level);
    if (currentIndex === -1) {
        return;
    }
    const nextLevel = progressionOrder[currentIndex + 1];
    if (nextLevel && nextLevel !== 'tutorial') {
        progress[nextLevel] = true;
    }
    localStorage.setItem(progressionStorageKey, JSON.stringify(progress));
}

document.documentElement.lang = locale;
document.title = text.pageTitle;

const mazeLayouts = {
    easy: [
        '###############',
        '#S............#',
        '#.#####.#####.#',
        '#.....#.#.....#',
        '#####.#.#.#####',
        '#.....#.#.....#',
        '#.#####.#####.#',
        '#.............#',
        '#.#####.#####.#',
        '#.....#.#.....#',
        '#####.#.#.#####',
        '#.....#.#.....#',
        '#.#####.#####.#',
        '#............G#',
        '###############'
    ],
    normal: [
        '###############',
        '#S..#....L....#',
        '#.#.#.#######.#',
        '#.#...#...#...#',
        '#.#####.#.#.###',
        '#.....#.#.#...#',
        '#####.#.#.###.#',
        '#...L.#...#..L#',
        '#.#####.#####.#',
        '#.....#.....#.#',
        '#.###.#####.#.#',
        '#...#L......#.#',
        '###.#########.#',
        '#.L..L.......G#',
        '###############'
    ],
    hard: [
        '###############',
        '#S....#....L..#',
        '#.###.#L#####.#',
        '#...#.#....G#.#',
        '###.#.#####L#.#',
        '#...#.....#.L.#',
        '#.#.#####.#.#.#',
        '#.#...L...#.L.#',
        '#.#####.#####.#',
        '#.....#.....#.#',
        '#.###.#####.#.#',
        '#...#.......#.#',
        '###.#########.#',
        '#.L..........L#',
        '###############'
    ],
    extreme: [
        '###############',
        '#S..#....L....#',
        '#.#.#.#######.#',
        '#.#...#L..#...#',
        '#.#####.#.#.###',
        '#.....#.#.#L..#',
        '#####.#.#.###.#',
        '#...L.#...#...#',
        '#.#####.#####.#',
        '#.....#.....#.#',
        '#.###.#####.#.#',
        '#...#.......#.#',
        '#######L#####.#',
        '#.L.........G#',
        '###############'
    ]
};

const isTutorial = new URLSearchParams(window.location.search).get('mode') === 'tutorial';
const tutorialLayout = [
    '###############',
    '###############',
    '###############',
    '###############',
    '###############',
    '###############',
    '###############',
    '#S.....L.....G#',
    '###############',
    '###############',
    '###############',
    '###############',
    '###############',
    '###############',
    '###############'
];
const storedDifficulty = localStorage.getItem('key-runner-difficulty') || 'easy';
const unlockedDifficulty = isLevelUnlocked(storedDifficulty) ? storedDifficulty : getHighestUnlockedLevel();
const selectedDifficulty = isTutorial ? 'tutorial' : unlockedDifficulty;
const raw = isTutorial ? tutorialLayout : mazeLayouts[selectedDifficulty] || mazeLayouts.normal;
const fontScales = { small: '0.8', medium: '1', large: '1.6' };
document.documentElement.style.setProperty('--font-scale', fontScales[localStorage.getItem('key-runner-font-size')] || '1');
const grid = raw.map((row) => row.split(''));
const H = grid.length;
const W = grid[0].length;

function findCell(value) {
    for (let y = 0; y < H; y += 1) {
        const x = grid[y].indexOf(value);
        if (x !== -1) {
            return { x: x + 0.5, y: y + 0.5 };
        }
    }
    return { x: 1.5, y: 1.5 };
}

const start = findCell('S');
const goal = findCell('G');
const player = { x: start.x, y: start.y, angle: 0 };
const difficultySettings = {
    easy: { time: 360, speed: 0.07, missPenalty: 3, words: ['apple', 'ball', 'car', 'diary', 'egg', 'fish', 'gate', 'hour', 'interesting', 'live', 'make', 'nice', 'ourselves', 'place', 'rain', 'school', 'ten', 'under', 'view', 'white', 'year'] },
    normal: { time: 300, speed: 0.06, missPenalty: 5, words: ['apple', 'ball', 'car', 'diary', 'egg', 'fish', 'gate', 'hour', 'interesting', 'live', 'make', 'nice', 'ourselves', 'place', 'rain', 'school', 'ten', 'under', 'view', 'white', 'year'] },
    hard: { time: 180, speed: 0.05, missPenalty: 10, words: ['apple', 'ball', 'car', 'diary', 'egg', 'fish', 'gate', 'hour', 'interesting', 'live', 'make', 'nice', 'ourselves', 'place', 'rain', 'school', 'ten', 'under', 'view', 'white', 'year'] },
    extreme: { time: 150, speed: 0.045, missPenalty: 15, words: ['abate', 'banal', 'capricious', 'dichotomy', 'ephemeral', 'fallacious', 'garner', 'hedonism', 'immutable', 'jettison', 'ken', 'laconic', 'neophyte', 'obdurate', 'paradigm', 'quaint', 'sacrosanct', 'taciturn', 'venerate', 'wane', 'xylem', 'yen', 'zephyr'] }
};

const leaderboardApiUrl = window.__KEY_RUNNER_API_URL__ || localStorage.getItem('key-runner-api-url') || 'https://rta-leaderboard-api.bvszp558ds.workers.dev';
const difficulty = isTutorial ? { time: 999, speed: 0.06, missPenalty: 0, words: ['open'] } : difficultySettings[selectedDifficulty] || difficultySettings.normal;

let unlocked = new Set();
let activeDoor = null;
let word = '';
let score = 0;
let time = difficulty.time;
let startedAt = 0;
let ended = false;
let gameStarted = false;
let paused = false;
let timer;
let doorMeshes = [];
let renderer;
let scene;
let camera;
let mazeGroup;
let doorGroup;
let goalGroup;
let goalCore;
let avatarGroup;

const sceneElement = document.getElementById('scene');
const fallback = document.getElementById('fallback');
const mapElement = document.getElementById('map');
mapElement.style.setProperty('--map-columns', W);
const typingElement = document.querySelector('.typing');
const input = document.getElementById('input');
const wordElement = document.getElementById('word');
const promptElement = document.getElementById('prompt');
const messageElement = document.getElementById('msg');
const coordinatesElement = document.getElementById('coords');
const keys = createKeyboardState();
const pauseOverlay = document.getElementById('pause-overlay');
const pauseButton = document.getElementById('pause');
const resumeButton = document.getElementById('resume');
const pauseRestartButton = document.getElementById('pause-restart');

document.querySelectorAll('[data-i18n]').forEach((element) => {
    element.textContent = text[element.dataset.i18n];
});
document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
    element.placeholder = text[element.dataset.i18nPlaceholder];
});
document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
    element.setAttribute('aria-label', text[element.dataset.i18nAriaLabel]);
});
document.getElementById('grid-size').textContent = `${W} × ${H} ${text.grid}`;

function material(color, roughness = 0.7, metalness = 0) {
    return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

function doorId(x, y) {
    return `${Math.floor(y)},${Math.floor(x)}`;
}

function cell(x, y) {
    return grid[Math.floor(y)]?.[Math.floor(x)] || '#';
}

function blocked(x, y) {
    const value = cell(x, y);
    return value === '#' || (value === 'L' && !unlocked.has(doorId(x, y)));
}

function move(dx, dy) {
    if (!blocked(player.x + dx, player.y)) {
        player.x += dx;
    }
    if (!blocked(player.x, player.y + dy)) {
        player.y += dy;
    }
}

function moveRelative(distance) {
    move(Math.cos(player.angle) * distance, Math.sin(player.angle) * distance);
}

function buildDoor(x, y) {
    const group = new THREE.Group();
    group.position.set(x + 0.5, 0, y + 0.5);
    group.userData.id = doorId(x, y);

    const frameMaterial = new THREE.MeshStandardMaterial({
        color: 0x40182b,
        emissive: 0x8b183c,
        emissiveIntensity: 2.3,
        metalness: 0.5,
        roughness: 0.3
    });
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.76, 2.65, 0.12), frameMaterial);
    panel.position.y = 1.35;
    group.add(panel);

    const left = new THREE.Mesh(new THREE.BoxGeometry(0.08, 3, 0.16), frameMaterial);
    const right = left.clone();
    left.position.set(-0.45, 1.5, 0);
    right.position.set(0.45, 1.5, 0);
    group.add(left, right);

    const lamp = new THREE.PointLight(0xff3d73, 2.8, 3);
    lamp.position.set(0, 2.7, 0.25);
    group.add(lamp);
    doorGroup.add(group);
    doorMeshes.push(group);
}

function buildMaze() {
    mazeGroup.clear();
    doorGroup.clear();
    doorMeshes = [];

    const floorMaterial = material(0x3a6978, 0.62, 0.22);
    const wallMaterial = material(0xe8e0d6, 0.45, 0.35);
    const ceilingMaterial = material(0x0606, 0.9);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(W, H), floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(W / 2, 0, H / 2);
    mazeGroup.add(floor);

    const ceiling = new THREE.Mesh(new THREE.PlaneGeometry(W, H), ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(W / 2, 3.7, H / 2);
    mazeGroup.add(ceiling);

    for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
            const value = grid[y][x];
            if (value === '#') {
                const wall = new THREE.Mesh(new THREE.BoxGeometry(0.9, 3.7, 0.9), wallMaterial);
                wall.position.set(x + 0.5, 1.85, y + 0.5);
                mazeGroup.add(wall);
                const strip = new THREE.Mesh(new THREE.BoxGeometry(0.025, 3.1, 0.025), new THREE.MeshBasicMaterial({ color: 0x72d8ff }));
                strip.position.set(x + 0.5, 1.85, y + 0.02);
                mazeGroup.add(strip);
            }
            if (value === 'L') {
                buildDoor(x, y);
            }
        }
    }

    const lamps = [
        [-0.45, 0x42dfff],
        [W + 0.45, 0xff557d],
        [0, 0xff557d],
        [W, 0xffd166]
    ];
    lamps.forEach(([x, color]) => {
        const light = new THREE.PointLight(color, 2.4, 8);
        light.position.set(x, 2.6, H * 0.5);
        mazeGroup.add(light);
    });
}

function buildGoal() {
    goalGroup.clear();
    const gold = new THREE.MeshStandardMaterial({
        color: 0xffb52e,
        emissive: 0xff8c18,
        emissiveIntensity: 2.8,
        metalness: 0.35,
        roughness: 0.25
    });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(0.42, 0.06, 10, 32), gold);
    ring.rotation.x = Math.PI / 2;
    ring.position.set(goal.x, 0.2, goal.y);
    goalGroup.add(ring);

    goalCore = new THREE.Mesh(new THREE.OctahedronGeometry(0.23, 1), gold);
    goalCore.position.set(goal.x, 1.2, goal.y);
    goalGroup.add(goalCore);

    const light = new THREE.PointLight(0xffb52e, 4, 5);
    light.position.set(goal.x, 1.3, goal.y);
    goalGroup.add(light);
}

function buildPlayerAvatar() {
    avatarGroup = new THREE.Group();
    const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x58e89a, emissive: 0x18a86b, emissiveIntensity: 1.8, metalness: 0.25, roughness: 0.3 });
    const visorMaterial = new THREE.MeshStandardMaterial({ color: 0x071c2d, emissive: 0x31d8ff, emissiveIntensity: 2.2, metalness: 0.55, roughness: 0.18 });
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 0.42, 4, 10), bodyMaterial);
    body.position.y = 0.55;
    avatarGroup.add(body);
    const visor = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 10), visorMaterial);
    visor.scale.set(1, 0.72, 0.62);
    visor.position.set(0.13, 0.91, 0);
    avatarGroup.add(visor);
    scene.add(avatarGroup);
}

function updatePlayer() {
    if (ended || paused || !gameStarted) {
        return;
    }
    if (!avatarGroup) {
        buildPlayerAvatar();
    }
    avatarGroup.visible = false;
    renderer.toneMappingExposure = 1.45;
    scene.fog.density = 0.026;
    const speed = (keys.ShiftLeft || keys.ShiftRight) ? difficulty.speed + 1 : difficulty.speed;

    if (keys.KeyW || keys.ArrowUp) {
        moveRelative(speed);
    }
    if (keys.KeyA || keys.ArrowLeft) {
        player.angle -= 0.045;
    }
    if (keys.KeyD || keys.ArrowRight) {
        player.angle += 0.045;
    }

    camera.position.set(player.x, 1.18, player.y);
    camera.rotation.set(0, -player.angle - Math.PI / 2, 0);
    if (Math.hypot(player.x - goal.x, player.y - goal.y) < 0.5) {
        finish(true);
    }
}

function nearDoor() {
    let best = null;
    let bestDistance = 1;
    for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
            if (grid[y][x] !== 'L' || unlocked.has(doorId(x, y))) {
                continue;
            }
            const distance = Math.hypot(x + 0.5 - player.x, y + 0.5 - player.y);
            if (distance < bestDistance) {
                bestDistance = distance;
                best = { x, y, id: doorId(x, y) };
            }
        }
    }
    return best;
}

function updateDoorVisuals(now) {
    doorMeshes.forEach((door) => {
        door.visible = !unlocked.has(door.userData.id);
    });
    const near = nearDoor();
    const wasNear = Boolean(activeDoor);
    activeDoor = near;
    typingElement.classList.toggle('open', Boolean(near));
    input.disabled = !near;

    if (near) {
        promptElement.textContent = isTutorial ? text.tutorialDoorPrompt : text.doorPrompt;
        wordElement.textContent = word;
        if (!wasNear) {
            input.focus();
        }
    } else {
        promptElement.textContent = isTutorial ? text.tutorialPrompt : text.explorePrompt;
        wordElement.textContent = '---';
    }
    if (goalCore) {
        goalCore.rotation.y = now * 0.0012;
        goalCore.position.y = 1.2 + Math.sin(now * 0.002) * 0.12;
    }
}

function drawMap() {
    mapElement.innerHTML = '';
    const limitedVisibility = selectedDifficulty === 'extreme';
    for (let y = 0; y < H; y += 1) {
        for (let x = 0; x < W; x += 1) {
            const item = document.createElement('div');
            const value = grid[y][x];
            const visible = !limitedVisibility || (Math.abs(Math.floor(player.x) - x) <= 1 && Math.abs(Math.floor(player.y) - y) <= 1);
            item.className = `cell ${visible ? '' : 'hidden'} ${value === '#' ? 'wall' : value === 'L' && !unlocked.has(doorId(x, y)) ? 'lock' : value === 'G' ? 'goal' : ''}`;
            if (Math.floor(player.x) === x && Math.floor(player.y) === y) {
                item.className = 'cell player';
                item.style.setProperty('--heading', `${player.angle}rad`);
            }
            mapElement.appendChild(item);
        }
    }
}

function chooseWord() {
    word = difficulty.words[Math.floor(Math.random() * difficulty.words.length)];
}

function updateHud() {
    document.getElementById('score').textContent = score;
    document.getElementById('time').textContent = time;
    coordinatesElement.textContent = `X ${player.x.toFixed(1).padStart(4, '0')} / Y ${player.y.toFixed(1).padStart(4, '0')}`;
}

function formatTime(milliseconds) {
    const value = Math.max(0, Number(milliseconds) || 0);
    const minutes = Math.floor(value / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    const centiseconds = Math.floor((value % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
}

const blockedNicknameTerms = ['fuck', 'shit', 'bitch', 'asshole', 'cunt', 'sex', 'ばか', 'バカ', 'あほ', 'アホ', 'しね', '死ね', 'くたばれ'];

function isNicknameAllowed(nickname) {
    const normalized = nickname.normalize('NFKC').toLocaleLowerCase().replace(/[\s\p{P}\p{S}]/gu, '');
    return normalized.length > 0 && !blockedNicknameTerms.some((term) => normalized.includes(term));
}

function finish(win) {
    if (ended) {
        return;
    }
    ended = true;
    clearInterval(timer);
    timer = undefined;
    const clearTime = Math.max(0, Math.round((performance.now() - startedAt) / 10) * 10);
    const currentLevel = isTutorial ? 'tutorial' : selectedDifficulty;
    const nextLevel = currentLevel === 'tutorial'
        ? 'easy'
        : currentLevel === 'easy'
            ? 'normal'
            : currentLevel === 'normal'
                ? 'hard'
                : currentLevel === 'hard'
                    ? 'extreme'
                    : null;

    document.getElementById('title').textContent = win ? text.gateBreached : text.timeUpTitle;
    const resultMessage = isTutorial && win ? text.tutorialComplete : win ? text.escaped : text.timeUp;
    const extremeResult = difficulty === difficultySettings.extreme && win ? `<br>完走タイム: <b>${formatTime(clearTime)}</b>` : '';

    const actionHtml = [`<a class="button" href="index.html">${text.home}</a>`];
    if (win && nextLevel) {
        actionHtml.push(`<a class="button button--primary" href="key-runner.html" data-level="${nextLevel}">${text[nextLevel] || nextLevel}</a>`);
    }

    document.getElementById('result').innerHTML = `${resultMessage}<br>${text.score}: <b>${score}</b>${extremeResult}<div class="result-actions">${actionHtml.join('')}</div>`;
    document.getElementById('overlay').classList.add('show');

    document.querySelectorAll('.result-actions a[data-level]').forEach((link) => {
        link.addEventListener('click', () => localStorage.setItem('key-runner-difficulty', link.dataset.level));
    });

    if (win) {
        if (currentLevel !== 'extreme') {
            markDifficultyCleared(currentLevel);
        }
    }

    if (difficulty === difficultySettings.extreme && win) openPublishDialog(clearTime, score);
}

async function saveExtremeScore(clearTime, baseScore, nickname) {
    const runId = window.crypto?.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const entry = {
        run_id: runId,
        nickname,
        user_id: nickname,
        clear_time: clearTime,
        score: baseScore,
        total_score: baseScore
    };

    try {
        if (leaderboardApiUrl) {
            const response = await fetch(`${leaderboardApiUrl.replace(/\/$/, '')}/scores`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(entry)
            });
            if (response.status === 400 || response.status === 422) return;
            if (!response.ok && response.status !== 409) throw new Error(`leaderboard request failed: ${response.status}`);
            const payload = await response.json().catch(() => ({}));
            if (payload.status === 'pending') messageElement.textContent = text.pendingScoreAdded;
            return;
        }
    } catch {
        // Use the local cache when the API is unavailable.
    }

    messageElement.textContent = text.scoreNotSaved;
}

function openPublishDialog(clearTime, baseScore) {
    const publishOverlay = document.getElementById('publish-overlay');
    const nicknameInput = document.getElementById('publish-nickname');
    const nicknameMessage = document.getElementById('publish-message');
    publishOverlay.hidden = false;
    publishOverlay.classList.add('show');
    nicknameInput.value = '';
    nicknameMessage.textContent = '';
    nicknameInput.focus();

    const close = async (nickname) => {
        const normalizedNickname = nickname.trim() || 'anonymous';
        if (normalizedNickname !== 'anonymous' && !isNicknameAllowed(normalizedNickname)) {
            nicknameMessage.textContent = text.nicknameRejected;
            nicknameInput.focus();
            return;
        }
        publishOverlay.hidden = true;
        publishOverlay.classList.remove('show');
        await saveExtremeScore(clearTime, baseScore, normalizedNickname);
    };
    document.getElementById('publish-anonymous').onclick = () => close('anonymous');
    document.getElementById('publish-submit').onclick = () => close(nicknameInput.value);
}

function reset() {
    player.x = start.x;
    player.y = start.y;
    player.angle = 0;
    unlocked = new Set();
    score = 0;
    time = difficulty.time;
    startedAt = gameStarted ? performance.now() : 0;
    ended = false;
    paused = false;
    activeDoor = null;
    typingElement.classList.remove('open');
    chooseWord();
    input.value = '';
    messageElement.textContent = isTutorial ? text.tutorialIdleMessage : text.idleMessage;
    document.getElementById('overlay').classList.remove('show');
    const publishOverlay = document.getElementById('publish-overlay');
    publishOverlay.hidden = true;
    publishOverlay.classList.remove('show');
    pauseOverlay.hidden = true;
    pauseOverlay.classList.remove('show');
    buildMaze();
    drawMap();
    updateHud();
    clearInterval(timer);
    if (!gameStarted) return;
    timer = setInterval(() => {
        if (!ended && !paused) {
            time -= 1;
            updateHud();
            if (time <= 0) {
                finish(false);
            }
        }
    }, 1000);
}

function resize() {
    const width = sceneElement.clientWidth;
    const height = sceneElement.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
}

function loop(now) {
    updatePlayer();
    updateDoorVisuals(now);
    updateHud();
    drawMap();
    renderer.render(scene, camera);
    requestAnimationFrame(loop);
}

input.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' || ended) {
        return;
    }
    if (!activeDoor) {
        messageElement.textContent = text.notNearDoor;
        return;
    }
    if (input.value.trim().toLowerCase() === word) {
        unlocked.add(activeDoor.id);
        score += 250;
        time = Math.min(150, time + 8);
        messageElement.textContent = `${text.correct} +250 / +8${locale === 'ja' ? '秒' : locale === 'es' ? ' s' : ' sec'}`;
        input.value = '';
        chooseWord();
        drawMap();
    } else {
        time = Math.max(0, time - difficulty.missPenalty);
        updateHud();
        messageElement.textContent = `${text.incorrect}${difficulty.missPenalty}${text.seconds}`;
        input.select();
    }
});

function setPaused(value) {
    if (!gameStarted || ended) return;
    paused = value;
    pauseOverlay.hidden = !value;
    pauseOverlay.classList.toggle('show', value);
    if (value) {
        input.blur();
        resumeButton.focus();
    } else {
        pauseButton.focus();
    }
}

pauseButton.onclick = () => setPaused(true);
resumeButton.onclick = () => setPaused(false);
pauseRestartButton.onclick = () => { setPaused(false); reset(); };
document.getElementById('again').onclick = reset;
window.addEventListener('resize', resize);

scene = new THREE.Scene();
scene.background = new THREE.Color(0xFFFFFF);
scene.fog = new THREE.FogExp2(0x07131e, 0.047);
camera = new THREE.PerspectiveCamera(72, 1, 0.05, 100);
renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
scene.add(new THREE.HemisphereLight(0x8bdcff, 0x07111d, 0.7));
scene.add(new THREE.AmbientLight(0xb9eaff, 0.65));
mazeGroup = new THREE.Group();
doorGroup = new THREE.Group();
goalGroup = new THREE.Group();
scene.add(mazeGroup, doorGroup, goalGroup);
renderer.domElement.className = 'three-canvas';
sceneElement.prepend(renderer.domElement);
buildMaze();
buildGoal();
resize();
reset();
requestAnimationFrame(loop);

const loadingScreen = document.getElementById('loading-screen');
const launchButton = document.getElementById('game-launch');
const progressBar = document.getElementById('progress-bar');
const progressValue = document.getElementById('progress-value');
const progressTrack = document.querySelector('.progress-track');
let progress = 0;
const loadingTimer = setInterval(() => {
    progress = Math.min(progress + 10, 100);
    progressBar.style.width = `${progress}%`;
    progressValue.textContent = `${progress}%`;
    progressTrack.setAttribute('aria-valuenow', progress);
    if (progress === 100) {
        clearInterval(loadingTimer);
        launchButton.disabled = false;
        launchButton.classList.remove('is-disabled');
    }
}, 80);

function launchGame() {
    gameStarted = true;
    startedAt = performance.now();
    loadingScreen.classList.add('is-complete');
    reset();
}

launchButton.addEventListener('click', launchGame);