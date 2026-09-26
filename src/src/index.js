import { initializeCustomCursor } from './cursor.js';

initializeCustomCursor();

const translations = {
    ja: {
        pageTitle: 'Key-Runner', languageLabel: '言語', difficultyLabel: '難易度', fontSizeLabel: '文字の大きさ', fontSizeSmall: '小', fontSizeMedium: '中', fontSizeLarge: '大', difficultyEasy: 'かんたん', difficultyNormal: 'ふつう', difficultyHard: 'むずかしい', start: 'ゲームスタート', rulesButton: '説明を見る', tutorialButton: 'チュートリアル', settingsButton: '設定', close: '閉じる', modeEyebrow: 'CHOOSE YOUR RUN', modeTitle: 'プレイを選ぶ', rulesEyebrow: 'HOW TO PLAY', rulesTitle: '遊び方', rulesDescription: 'このゲームは迷路ゲームです。キーボードのみでも遊ぶことができます。', ruleMove: 'WAD または矢印キーで移動します。', ruleDoors: '赤い扉の近くで単語を入力し、Enter キーで扉を開きます。', ruleGoal: '制限時間内に迷宮の奥にある脱出ゲートを目指します。', tutorialEyebrow: 'FIRST RUN', tutorialTitle: 'チュートリアル', tutorialStep1Title: '歩く', tutorialStep1: 'WASD または矢印キーで迷路を進みます。', tutorialStep2Title: '扉を開ける', tutorialStep2: '赤い扉の近くで表示された単語を入力し、Enter を押します。', tutorialStep3Title: '脱出する', tutorialStep3: 'ゴールの光るゲートへ到達するとクリアです。', settingsEyebrow: 'PREFERENCES', settingsTitle: '設定'
    },
    en: {
        pageTitle: 'Key-Runner', languageLabel: 'Language', difficultyLabel: 'Difficulty', fontSizeLabel: 'Text size', fontSizeSmall: 'Small', fontSizeMedium: 'Medium', fontSizeLarge: 'Large', difficultyEasy: 'Easy', difficultyNormal: 'Normal', difficultyHard: 'Hard', start: 'Start game', rulesButton: 'How to play', tutorialButton: 'Tutorial', settingsButton: 'Settings', close: 'Close', rulesEyebrow: 'HOW TO PLAY', rulesTitle: 'Rules', rulesDescription: 'Key-Runner is a maze game that can be played with the keyboard alone.', ruleMove: 'Move with WAD or the arrow keys.', ruleDoors: 'Type the word near a red door, then press Enter to open it.', ruleGoal: 'Reach the escape gate deep in the maze before time runs out.', tutorialEyebrow: 'FIRST RUN', tutorialTitle: 'Tutorial', tutorialStep1Title: 'Move', tutorialStep1: 'Use WASD or the arrow keys to explore the maze.', tutorialStep2Title: 'Open doors', tutorialStep2: 'Type the word shown near a red door, then press Enter.', tutorialStep3Title: 'Escape', tutorialStep3: 'Reach the glowing gate to complete the maze.', settingsEyebrow: 'PREFERENCES', settingsTitle: 'Settings'
    }
};

translations.es = {
    ...translations.en,
    languageLabel: 'Idioma',
    fontSizeLabel: 'Tamano del texto',
    fontSizeSmall: 'Pequeno',
    fontSizeMedium: 'Mediano',
    fontSizeLarge: 'Grande',
    difficultyEasy: 'Facil',
    difficultyNormal: 'Normal',
    difficultyHard: 'Dificil',
    start: 'Iniciar partida',
    rulesButton: 'Como jugar',
    tutorialButton: 'Tutorial',
    settingsButton: 'Ajustes',
    close: 'Cerrar',
    modeTitle: 'Elige una partida',
    rulesTitle: 'Reglas',
    settingsTitle: 'Ajustes'
};
Object.assign(translations.ja, {
    rulesEyebrow: 'HOW TO PLAY',
    rulesTitle: '遊び方',
    rulesDescription: '操作、扉の開け方、スコアとマップの見方を確認できます。',
    ruleMoveTitle: '移動と向き',
    ruleMove: 'W / ↑ で前進、A / ← で左を向き、D / → で右を向きます。A・D はその場で向きを変える操作です。後退キーはありません。',
    ruleDoorTitle: '扉を開ける',
    ruleDoors: '赤い扉に近づくと単語と入力欄が表示され、入力欄にカーソルが移ります。単語を入力して Enter を押してください。大文字・小文字は区別されません。',
    ruleMistakeTitle: '入力を間違えたら',
    ruleMistake: '不正解でも入力し直せますが、難易度に応じて残り時間が減ります。チュートリアルでは時間のペナルティはありません。',
    ruleMapTitle: 'マップと表示',
    ruleMap: 'マップの矢印は自分の位置と向き、赤いマスは未解除の扉、ゴールのマスは脱出地点です。激むずでは周囲だけが表示されます。残り時間とスコアは画面上部で確認できます。',
    ruleScoreTitle: 'スコアを獲得する',
    ruleScore: '単語を正解すると扉が開き、スコアが250加算されます。すべての扉を開ける必要はありません。',
    ruleGoalTitle: 'ゴールを目指す',
    ruleGoal: '残り時間がなくなる前に、迷路の奥にある光る脱出ゲートへ到達するとクリアです。'
});
Object.assign(translations.en, {
    rulesEyebrow: 'HOW TO PLAY',
    rulesTitle: 'How to play',
    rulesDescription: 'Review movement, door typing, scoring, and the map.',
    ruleMoveTitle: 'Movement and facing',
    ruleMove: 'Press W / ↑ to move forward, A / ← to turn left, and D / → to turn right. A and D turn you in place; there is no reverse key.',
    ruleDoorTitle: 'Open doors',
    ruleDoors: 'When you get close to a red door, its word and an input field appear, and the field receives focus. Type the word and press Enter. Letter case does not matter.',
    ruleMistakeTitle: 'If your answer is wrong',
    ruleMistake: 'You can try again, but a wrong answer costs time based on the difficulty. Wrong answers do not cost time in the tutorial.',
    ruleMapTitle: 'Map and HUD',
    ruleMap: 'The arrow shows your position and facing direction, red cells are locked doors, and the goal cell marks the exit. Extreme shows only nearby cells. Check your time and score at the top of the screen.',
    ruleScoreTitle: 'Earn score',
    ruleScore: 'A correct word opens the door and adds 250 points. You do not need to open every door.',
    ruleGoalTitle: 'Reach the goal',
    ruleGoal: 'Reach the glowing escape gate deep in the maze before time runs out.'
});
Object.assign(translations.es, {
    rulesEyebrow: 'COMO JUGAR',
    rulesTitle: 'Como jugar',
    rulesDescription: 'Consulta el movimiento, la escritura en puertas, la puntuacion y el mapa.',
    ruleMoveTitle: 'Movimiento y orientacion',
    ruleMove: 'Pulsa W / ↑ para avanzar, A / ← para girar a la izquierda y D / → para girar a la derecha. A y D giran en el sitio; no hay tecla para retroceder.',
    ruleDoorTitle: 'Abrir puertas',
    ruleDoors: 'Al acercarte a una puerta roja aparece una palabra y un campo que recibe el foco. Escribe la palabra y pulsa Enter. No se distinguen mayusculas y minusculas.',
    ruleMistakeTitle: 'Si te equivocas',
    ruleMistake: 'Puedes intentarlo de nuevo, pero una respuesta incorrecta resta tiempo segun la dificultad. En el tutorial no se pierde tiempo por errores.',
    ruleMapTitle: 'Mapa e indicadores',
    ruleMap: 'La flecha muestra tu posicion y orientacion; las casillas rojas son puertas cerradas y la casilla de meta marca la salida. En Extremo solo se muestran las casillas cercanas. Consulta el tiempo y la puntuacion en la parte superior.',
    ruleScoreTitle: 'Ganar puntos',
    ruleScore: 'Cada palabra correcta abre la puerta y suma 250 puntos. No hace falta abrir todas las puertas.',
    ruleGoalTitle: 'Llegar a la meta',
    ruleGoal: 'Llega a la salida iluminada al fondo del laberinto antes de que se agote el tiempo.'
});
Object.assign(translations.ja, {
    tutorialStep1Title: '移動と向き', tutorialStep1: 'W / ↑ で前進、A / ← で左を向き、D / → で右を向きます。A・D はその場で向きを変える操作です。後退キーはありません。',
    tutorialStep2Title: '扉を開ける', tutorialStep2: '赤い扉に近づくと単語と入力欄が表示され、入力欄にカーソルが移ります。単語を入力して Enter を押してください。大文字・小文字は区別されません。',
    tutorialStep3Title: '入力を間違えたら', tutorialStep3: '不正解でも入力し直せますが、難易度に応じて残り時間が減ります。チュートリアルでは時間のペナルティはありません。',
    tutorialStep4Title: 'マップと表示', tutorialStep4: 'マップの矢印は自分の位置と向き、赤いマスは未解除の扉、ゴールのマスは脱出地点です。激むずでは周囲だけが表示されます。残り時間とスコアは画面上部で確認できます。',
    tutorialStep5Title: 'スコアを獲得する', tutorialStep5: '単語を正解すると扉が開き、スコアが250加算されます。すべての扉を開ける必要はありません。',
    tutorialStep6Title: 'ゴールを目指す', tutorialStep6: '残り時間がなくなる前に、迷路の奥にある光る脱出ゲートへ到達するとクリアです。'
});
Object.assign(translations.en, {
    tutorialStep1Title: 'Movement and facing', tutorialStep1: 'Press W / ↑ to move forward, A / ← to turn left, and D / → to turn right. A and D turn you in place; there is no reverse key.',
    tutorialStep2Title: 'Open doors', tutorialStep2: 'When you get close to a red door, its word and an input field appear, and the field receives focus. Type the word and press Enter. Letter case does not matter.',
    tutorialStep3Title: 'If your answer is wrong', tutorialStep3: 'You can try again, but a wrong answer costs time based on the difficulty. Wrong answers do not cost time in the tutorial.',
    tutorialStep4Title: 'Map and HUD', tutorialStep4: 'The arrow shows your position and facing direction, red cells are locked doors, and the goal cell marks the exit. Extreme shows only nearby cells. Check your time and score at the top of the screen.',
    tutorialStep5Title: 'Earn score', tutorialStep5: 'A correct word opens the door and adds 250 points. You do not need to open every door.',
    tutorialStep6Title: 'Reach the goal', tutorialStep6: 'Reach the glowing escape gate deep in the maze before time runs out.'
});
Object.assign(translations.ja, { difficultyExtreme: '激むず', scoreboardButton: 'スコアを表示', creditButton: 'Credit', creditTitle: 'Credit', creditDescription: 'Key-Runnerの制作情報です。', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'スコアボード', scoreboardDescription: '激むずクリア後に掲載を選択できます。', rtaAnyPercent: 'RTA any%', pendingLabel: '審査中', creditProject: 'Key-Runner', creditPlanning: '企画', creditPlanningValue: '高校3年生 チームB', creditTechnology: '使用技術', creditFrontend: 'フロントエンド', creditFrontendValue: 'Rust / Tauri / Three.js', creditBackend: 'バックエンド', creditBackendValue: 'Rust / TypeScript', creditInfrastructure: 'インフラ・データベース', creditInfrastructureValue: 'Cloudflare Workers / D1', creditThanks: 'Special Thanks', creditThanksValue: 'デバッグ協力: 大富豪の方々', scoreboardExport: 'スコアをエクスポート', scoreboardImport: 'スコアをインポート', scoreboardExported: 'スコアをエクスポートしました。', scoreboardImported: 'スコアをインポートしました。', scoreboardImportError: 'インポートに失敗しました。', anonymous: 'anonymous', scoreboardEmpty: 'まだ記録がありません。' });
Object.assign(translations.en, { difficultyExtreme: 'Extreme', scoreboardButton: 'View scores', creditButton: 'Credit', creditTitle: 'Credit', creditDescription: 'About the people and technology behind Key-Runner.', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'Scoreboard', scoreboardDescription: 'Choose whether to publish after clearing Extreme.', rtaAnyPercent: 'RTA any%', pendingLabel: 'Under review', creditProject: 'Key-Runner', creditPlanning: 'Planning', creditPlanningValue: 'Grade 12, Team B', creditTechnology: 'Technology', creditFrontend: 'Frontend', creditFrontendValue: 'Rust / Tauri / Three.js', creditBackend: 'Backend', creditBackendValue: 'Rust / TypeScript', creditInfrastructure: 'Infrastructure and database', creditInfrastructureValue: 'Cloudflare Workers / D1', creditThanks: 'Special thanks', creditThanksValue: 'Debug support: the Daifugo team', scoreboardExport: 'Export scores', scoreboardImport: 'Import scores', scoreboardExported: 'Scores exported.', scoreboardImported: 'Scores imported.', scoreboardImportError: 'Import failed.', anonymous: 'anonymous', scoreboardEmpty: 'No records yet.' });
Object.assign(translations.es, { difficultyExtreme: 'Extremo', scoreboardButton: 'Ver puntuaciones', creditButton: 'Credit', creditTitle: 'Credit', creditDescription: 'Informacion sobre el equipo y la tecnologia de Key-Runner.', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'Tabla de puntuaciones', scoreboardDescription: 'Elige si quieres publicar despues de completar Extremo.', rtaAnyPercent: 'RTA any%', pendingLabel: 'En revision', creditProject: 'Key-Runner', creditPlanning: 'Planificacion', creditPlanningValue: 'Ultimo curso, equipo B', creditTechnology: 'Tecnologia', creditFrontend: 'Frontend', creditFrontendValue: 'Rust / Tauri / Three.js', creditBackend: 'Backend', creditBackendValue: 'Rust / TypeScript', creditInfrastructure: 'Infraestructura y base de datos', creditInfrastructureValue: 'Cloudflare Workers / D1', creditThanks: 'Agradecimientos', creditThanksValue: 'Ayuda de depuracion: equipo Daifugo', anonymous: 'anonymous', scoreboardEmpty: 'Aun no hay registros.' });
Object.assign(translations.ja, { creditLicense: 'ライセンス' });
Object.assign(translations.en, { creditLicense: 'License' });
Object.assign(translations.es, { creditLicense: 'Licencia' });

translations.ja.modeEyebrow = 'CHOOSE YOUR RUN';
translations.ja.modeTitle = 'プレイを選ぶ';
translations.en.modeEyebrow = 'CHOOSE YOUR RUN';
translations.en.modeTitle = 'Choose a run';
translations.ja.scoreboardReviewNotice = 'スコアの審査には時間がかかることがあります。';
translations.en.scoreboardReviewNotice = 'Score review may take some time.';
translations.es.scoreboardReviewNotice = 'La revision de la puntuacion puede tardar un tiempo.';

const language = document.getElementById('language');
const fontSize = document.getElementById('font-size');
const modal = document.getElementById('rules-modal');
const progressStorageKey = 'key-runner-progress';
const leaderboardApiUrl = window.__KEY_RUNNER_API_URL__ || localStorage.getItem('key-runner-api-url') || 'https://rta-leaderboard-api.bvszp558ds.workers.dev';
const openButton = document.getElementById('rules-open');
const closeButton = document.getElementById('rules-close');
const modals = document.querySelectorAll('.modal');
const gameStart = document.getElementById('game-start');
const modeModal = document.getElementById('mode-modal');
const scoreboardOpen = document.getElementById('scoreboard-open');
const creditOpen = document.getElementById('credit-open');
const scoreboardMessage = document.getElementById('scoreboard-message');
const creditMessage = document.getElementById('credit-message');
const adminVersion = document.getElementById('admin-version');
const adminLoginForm = document.getElementById('admin-login-form');
const adminLoginMessage = document.getElementById('admin-login-message');
const adminMessage = document.getElementById('admin-message');
const adminScoreRows = document.getElementById('admin-score-rows');
const adminPendingCount = document.getElementById('admin-pending-count');
const adminApply = document.getElementById('admin-apply');
const adminDiscard = document.getElementById('admin-discard');
let adminClickCount = 0;
let adminSessionToken = '';
let adminScores = [];
let pendingAdminChanges = new Map();
let isApplyingAdminChanges = false;

function renderScoreboard(entries = []) {
    ['rta-any-percent'].forEach((id) => {
        const target = document.getElementById(id);
        target.innerHTML = '';
        const sorted = [...entries].sort((a, b) => Number(a.clear_time) - Number(b.clear_time));
        sorted.slice(0, 10).forEach((entry) => {
            const item = document.createElement('li');
            const label = entry.status === 'pending' ? translations[document.documentElement.lang].pendingLabel : entry.nickname || entry.user_id || translations[document.documentElement.lang].anonymous;
            item.textContent = `${label} - ${formatTime(entry.clear_time)}`;
            target.appendChild(item);
        });
        if (!sorted.length) target.innerHTML = `<li>${translations[document.documentElement.lang].scoreboardEmpty}</li>`;
    });
}

function formatTime(milliseconds) {
    const value = Math.max(0, Number(milliseconds) || 0);
    const minutes = Math.floor(value / 60000);
    const seconds = Math.floor((value % 60000) / 1000);
    const centiseconds = Math.floor((value % 1000) / 10);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(centiseconds).padStart(2, '0')}`;
}

function getProgressState() {
    const defaultState = { tutorial: true, easy: false, normal: false, hard: false, extreme: false };
    try {
        const stored = JSON.parse(localStorage.getItem(progressStorageKey) || 'null');
        if (!stored || typeof stored !== 'object') {
            localStorage.setItem(progressStorageKey, JSON.stringify(defaultState));
            return { ...defaultState };
        }
        const progress = { ...defaultState, ...stored };
        if (progress.tutorial === undefined) progress.tutorial = true;
        localStorage.setItem(progressStorageKey, JSON.stringify(progress));
        return progress;
    } catch {
        localStorage.setItem(progressStorageKey, JSON.stringify(defaultState));
        return { ...defaultState };
    }
}

function updateModeButtons() {
    const progress = getProgressState();
    const modeLinks = modeModal.querySelectorAll('[data-level]');
    modeLinks.forEach((link) => {
        const level = link.dataset.level;
        const unlocked = level === 'tutorial' || progress[level];
        link.hidden = !unlocked;
        link.disabled = !unlocked;
        if (!unlocked) {
            link.setAttribute('aria-disabled', 'true');
        } else {
            link.removeAttribute('aria-disabled');
        }
    });
}

async function loadScoreboard() {
    try {
        const response = await fetch(`${leaderboardApiUrl.replace(/\/$/, '')}/scores`, { headers: { Accept: 'application/json' } });
        if (!response.ok) throw new Error(`leaderboard request failed: ${response.status}`);
        const payload = await response.json();
        renderScoreboard(Array.isArray(payload.scores) ? payload.scores : []);
    } catch {
        renderScoreboard([]);
    }
}

async function loadAdminScores() {
    adminMessage.textContent = '読み込み中...';
    try {
        const response = await fetch(`${leaderboardApiUrl.replace(/\/$/, '')}/admin/scores`, {
            headers: { Accept: 'application/json', Authorization: `Bearer ${adminSessionToken}` }
        });
        if (response.status === 401) throw new Error('ログインの有効期限が切れました。もう一度ログインしてください。');
        if (!response.ok) throw new Error('スコアを読み込めませんでした。');
        const payload = await response.json();
        adminScores = Array.isArray(payload.scores) ? payload.scores : [];
        pendingAdminChanges.clear();
        renderAdminScores();
        updateAdminApplyControls();
        adminMessage.textContent = `${payload.scores.length} 件`;
    } catch (error) {
        adminMessage.textContent = error.message;
        if (!adminSessionToken || error.message.includes('有効期限')) {
            adminSessionToken = '';
            adminLoginMessage.textContent = error.message;
            setModal(true, 'admin-login-modal');
        }
    }
}

function renderAdminScores() {
    adminScoreRows.replaceChildren();
    adminScores.forEach((entry) => {
        const row = document.createElement('tr');
        [entry.id, entry.run_id, entry.nickname, formatTime(entry.clear_time), entry.score, entry.total_score, entry.status, entry.created_at].forEach((value) => {
            const cell = document.createElement('td');
            cell.textContent = String(value ?? '');
            row.appendChild(cell);
        });
        const actions = document.createElement('td');
        actions.appendChild(createReviewButton('承認', entry.id, 'approved'));
        actions.appendChild(createReviewButton('却下', entry.id, 'rejected'));
        row.appendChild(actions);
        adminScoreRows.appendChild(row);
    });
    if (!adminScores.length) {
        const row = document.createElement('tr');
        const cell = document.createElement('td');
        cell.colSpan = 9;
        cell.textContent = '記録がありません。';
        row.appendChild(cell);
        adminScoreRows.appendChild(row);
    }
}

function createReviewButton(label, id, status) {
    const button = document.createElement('button');
    button.className = status === 'approved' ? 'button button--primary' : 'button';
    button.type = 'button';
    button.textContent = label;
    const stagedStatus = pendingAdminChanges.get(id);
    button.setAttribute('aria-pressed', String(stagedStatus === status));
    button.disabled = isApplyingAdminChanges;
    button.addEventListener('click', () => {
        if (isApplyingAdminChanges) return;
        if (stagedStatus === status) pendingAdminChanges.delete(id);
        else pendingAdminChanges.set(id, status);
        renderAdminScores();
        updateAdminApplyControls();
    });
    return button;
}

function updateAdminApplyControls() {
    const count = pendingAdminChanges.size;
    adminPendingCount.textContent = count ? `${count} 件の変更が未適用です` : '未適用の変更はありません';
    adminApply.disabled = count === 0;
    adminDiscard.disabled = count === 0;
}

adminDiscard.addEventListener('click', () => {
    pendingAdminChanges.clear();
    renderAdminScores();
    updateAdminApplyControls();
    adminMessage.textContent = '変更を取り消しました。';
});

adminApply.addEventListener('click', async () => {
    const updates = [...pendingAdminChanges].map(([id, status]) => ({ id, status }));
    if (!updates.length || isApplyingAdminChanges) return;
    isApplyingAdminChanges = true;
    adminApply.disabled = true;
    adminDiscard.disabled = true;
    renderAdminScores();
    adminMessage.textContent = '適用中...';
    try {
        const response = await fetch(`${leaderboardApiUrl.replace(/\/$/, '')}/admin/scores`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${adminSessionToken}` },
            body: JSON.stringify({ updates })
        });
        if (!response.ok) {
            const details = await response.json().catch(() => ({}));
            if (response.status === 405) throw new Error('一括更新APIが未反映です。rta-leaderboard-api で npm run deploy を実行してください。');
            if (response.status === 401) throw new Error('ログインの有効期限が切れた可能性があります。管理画面を閉じて再ログインしてください。');
            if (response.status === 429) throw new Error('APIの利用上限に達しました。時間をおいてから再度Applyしてください。');
            throw new Error(`更新に失敗しました (HTTP ${response.status}${details.error ? `: ${details.error}` : ''})。`);
        }
        const result = await response.json();
        const statuses = new Map(result.updates.map((update) => [update.id, update.status]));
        adminScores = adminScores.map((score) => statuses.has(score.id) ? { ...score, status: statuses.get(score.id) } : score);
        pendingAdminChanges.clear();
        isApplyingAdminChanges = false;
        renderAdminScores();
        updateAdminApplyControls();
        adminMessage.textContent = `${result.updated} 件を適用しました。`;
    } catch (error) {
        isApplyingAdminChanges = false;
        renderAdminScores();
        adminMessage.textContent = error.message;
        updateAdminApplyControls();
    }
});

function setLanguage(value) {
    const locale = translations[value] ? value : 'ja';
    document.documentElement.lang = locale;
    language.value = locale;
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        element.textContent = translations[locale][element.dataset.i18n];
    });
    document.querySelectorAll('[data-i18n-aria-label]').forEach((element) => {
        element.setAttribute('aria-label', translations[locale][element.dataset.i18nAriaLabel]);
    });
    document.title = translations[locale].pageTitle;
    localStorage.setItem('key-runner-locale', locale);
}

function setFontSize(value) {
    const size = ['small', 'medium', 'large'].includes(value) ? value : 'medium';
    const scales = { small: '0.9', medium: '1', large: '1.12' };
    fontSize.value = size;
    document.documentElement.style.setProperty('--font-scale', scales[size]);
    localStorage.setItem('key-runner-font-size', size);
}

function setModal(open, modalId = 'rules-modal') {
    modals.forEach((item) => { item.hidden = !open || item.id !== modalId; });
    document.body.classList.toggle('modal-open', open);
    if (open) {
        document.getElementById(modalId).querySelector('button[data-modal-close]')?.focus();
    } else {
        const triggerId = modalId === 'mode-modal' ? 'game-start' : modalId.startsWith('admin') ? 'admin-version' : `${modalId.replace('-modal', '')}-open`;
        document.getElementById(triggerId)?.focus();
    }
}

language.addEventListener('change', () => setLanguage(language.value));
fontSize.addEventListener('change', () => setFontSize(fontSize.value));
gameStart.addEventListener('click', () => {
    window.location.href = 'key-runner.html?mode=tutorial';
});
scoreboardOpen.addEventListener('click', async () => { setModal(true, 'scoreboard-modal'); await loadScoreboard(); });
adminVersion.addEventListener('click', () => {
    adminClickCount += 1;
    if (adminClickCount === 5) {
        adminClickCount = 0;
        adminLoginMessage.textContent = '';
        setModal(true, 'admin-login-modal');
    }
});
adminLoginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    adminLoginMessage.textContent = '確認中...';
    const password = new FormData(adminLoginForm).get('password');
    try {
        const response = await fetch(`${leaderboardApiUrl.replace(/\/$/, '')}/admin/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ password })
        });
        if (!response.ok) throw new Error(response.status === 401 ? 'パスワードが違います。' : 'ログインできませんでした。');
        const payload = await response.json();
        adminSessionToken = payload.token;
        adminLoginForm.reset();
        setModal(true, 'admin-modal');
        await loadAdminScores();
    } catch (error) {
        adminLoginMessage.textContent = error.message;
    }
});
document.getElementById('admin-logout').addEventListener('click', () => {
    adminSessionToken = '';
    adminScores = [];
    pendingAdminChanges.clear();
    renderAdminScores();
    updateAdminApplyControls();
    setModal(false, 'admin-modal');
});
creditOpen.addEventListener('click', () => setModal(true, 'credit-modal'));
openButton.addEventListener('click', () => setModal(true));
closeButton.addEventListener('click', () => setModal(false, 'rules-modal'));
document.getElementById('settings-open').addEventListener('click', () => setModal(true, 'settings-modal'));
modals.forEach((item) => item.querySelectorAll('[data-modal-close]').forEach((button) => button.addEventListener('click', () => setModal(false, item.id))));
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        const activeModal = [...modals].find((item) => !item.hidden);
        if (activeModal) setModal(false, activeModal.id);
    }
});

setLanguage(localStorage.getItem('key-runner-locale') || navigator.language.slice(0, 2));
setFontSize(localStorage.getItem('key-runner-font-size') || 'medium');
getProgressState();
if (!localStorage.getItem('key-runner-difficulty')) localStorage.setItem('key-runner-difficulty', 'easy');
updateModeButtons();
modeModal.querySelectorAll('[data-level]').forEach((link) => {
    link.addEventListener('click', () => {
        const level = link.dataset.level;
        if (level === 'tutorial' || getProgressState()[level]) {
            localStorage.setItem('key-runner-difficulty', level);
        }
    });
});

