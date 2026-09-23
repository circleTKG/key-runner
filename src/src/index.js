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
Object.assign(translations.ja, { difficultyExtreme: '激むず', scoreboardButton: 'スコアを表示', creditButton: 'Credit', creditTitle: 'Credit', creditDescription: 'Key-Runnerの制作情報です。', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'スコアボード', scoreboardDescription: '激むずクリア後に掲載を選択できます。', rtaAnyPercent: 'RTA any%', pendingLabel: '審査中', creditProject: 'Key-Runner', creditPlanning: '企画', creditPlanningValue: '高校3年生 チームB', creditTechnology: '使用技術', creditFrontend: 'フロントエンド', creditFrontendValue: 'Rust / Tauri / Three.js', creditBackend: 'バックエンド', creditBackendValue: 'Rust / TypeScript', creditInfrastructure: 'インフラ・データベース', creditInfrastructureValue: 'Cloudflare Workers / D1', creditThanks: 'Special Thanks', creditThanksValue: 'デバッグ協力: 大富豪の方々', scoreboardExport: 'スコアをエクスポート', scoreboardImport: 'スコアをインポート', scoreboardExported: 'スコアをエクスポートしました。', scoreboardImported: 'スコアをインポートしました。', scoreboardImportError: 'インポートに失敗しました。', anonymous: 'anonymous', scoreboardEmpty: 'まだ記録がありません。' });
Object.assign(translations.en, { difficultyExtreme: 'Extreme', scoreboardButton: 'View scores', creditButton: 'Credit', creditTitle: 'Credit', creditDescription: 'About the people and technology behind Key-Runner.', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'Scoreboard', scoreboardDescription: 'Choose whether to publish after clearing Extreme.', rtaAnyPercent: 'RTA any%', pendingLabel: 'Under review', creditProject: 'Key-Runner', creditPlanning: 'Planning', creditPlanningValue: 'Grade 12, Team B', creditTechnology: 'Technology', creditFrontend: 'Frontend', creditFrontendValue: 'Rust / Tauri / Three.js', creditBackend: 'Backend', creditBackendValue: 'Rust / TypeScript', creditInfrastructure: 'Infrastructure and database', creditInfrastructureValue: 'Cloudflare Workers / D1', creditThanks: 'Special thanks', creditThanksValue: 'Debug support: the Daifugo team', scoreboardExport: 'Export scores', scoreboardImport: 'Import scores', scoreboardExported: 'Scores exported.', scoreboardImported: 'Scores imported.', scoreboardImportError: 'Import failed.', anonymous: 'anonymous', scoreboardEmpty: 'No records yet.' });
Object.assign(translations.es, { difficultyExtreme: 'Extremo', scoreboardButton: 'Ver puntuaciones', creditButton: 'Credit', creditTitle: 'Credit', creditDescription: 'Informacion sobre el equipo y la tecnologia de Key-Runner.', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'Tabla de puntuaciones', scoreboardDescription: 'Elige si quieres publicar despues de completar Extremo.', rtaAnyPercent: 'RTA any%', pendingLabel: 'En revision', creditProject: 'Key-Runner', creditPlanning: 'Planificacion', creditPlanningValue: 'Ultimo curso, equipo B', creditTechnology: 'Tecnologia', creditFrontend: 'Frontend', creditFrontendValue: 'Rust / Tauri / Three.js', creditBackend: 'Backend', creditBackendValue: 'Rust / TypeScript', creditInfrastructure: 'Infraestructura y base de datos', creditInfrastructureValue: 'Cloudflare Workers / D1', creditThanks: 'Agradecimientos', creditThanksValue: 'Ayuda de depuracion: equipo Daifugo', anonymous: 'anonymous', scoreboardEmpty: 'Aun no hay registros.' });

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
        document.getElementById(modalId).querySelector('[data-modal-close]').focus();
    } else {
        const triggerId = modalId === 'mode-modal' ? 'game-start' : `${modalId.replace('-modal', '')}-open`;
        document.getElementById(triggerId).focus();
    }
}

language.addEventListener('change', () => setLanguage(language.value));
fontSize.addEventListener('change', () => setFontSize(fontSize.value));
gameStart.addEventListener('click', () => {
    window.location.href = 'key-runner.html?mode=tutorial';
});
scoreboardOpen.addEventListener('click', async () => { setModal(true, 'scoreboard-modal'); await loadScoreboard(); });
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

