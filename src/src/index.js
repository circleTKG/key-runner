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
Object.assign(translations.ja, { difficultyExtreme: '激むず', scoreboardButton: 'スコアを表示', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'スコアボード', rtaAnyPercent: 'RTA any%', rtaTotalScore: 'RTA 総合スコア', scoreboardExport: 'スコアをエクスポート', scoreboardImport: 'スコアをインポート', scoreboardExported: 'スコアをエクスポートしました。', scoreboardImported: 'スコアをインポートしました。', scoreboardImportError: 'インポートに失敗しました。', anonymous: 'anonymous', scoreboardEmpty: 'まだ記録がありません。' });
Object.assign(translations.en, { difficultyExtreme: 'Extreme', scoreboardButton: 'View scores', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'Scoreboard', rtaAnyPercent: 'RTA any%', rtaTotalScore: 'RTA total score', scoreboardExport: 'Export scores', scoreboardImport: 'Import scores', scoreboardExported: 'Scores exported.', scoreboardImported: 'Scores imported.', scoreboardImportError: 'Import failed.', anonymous: 'anonymous', scoreboardEmpty: 'No records yet.' });
Object.assign(translations.es, { difficultyExtreme: 'Extremo', scoreboardButton: 'Ver puntuaciones', scoreboardEyebrow: 'RANKINGS', scoreboardTitle: 'Tabla de puntuaciones', rtaAnyPercent: 'RTA any%', rtaTotalScore: 'Puntuacion total RTA', scoreboardExport: 'Exportar puntuaciones', scoreboardImport: 'Importar puntuaciones', scoreboardExported: 'Puntuaciones exportadas.', scoreboardImported: 'Puntuaciones importadas.', scoreboardImportError: 'Error al importar.', anonymous: 'anonymous', scoreboardEmpty: 'Aun no hay registros.' });

translations.ja.modeEyebrow = 'CHOOSE YOUR RUN';
translations.ja.modeTitle = 'プレイを選ぶ';
translations.en.modeEyebrow = 'CHOOSE YOUR RUN';
translations.en.modeTitle = 'Choose a run';

const language = document.getElementById('language');
const fontSize = document.getElementById('font-size');
const modal = document.getElementById('rules-modal');
const progressStorageKey = 'key-runner-progress';
const scoreboardStorageKey = 'key-runner-scores';
const openButton = document.getElementById('rules-open');
const closeButton = document.getElementById('rules-close');
const modals = document.querySelectorAll('.modal');
const gameStart = document.getElementById('game-start');
const modeModal = document.getElementById('mode-modal');
const scoreboardOpen = document.getElementById('scoreboard-open');
const scoreboardMessage = document.getElementById('scoreboard-message');

function getStoredScores() {
    try {
        return JSON.parse(localStorage.getItem('key-runner-scores') || '[]');
    } catch {
        return [];
    }
}

function renderScoreboard(entries = []) {
    ['rta-any-percent', 'rta-total-score'].forEach((id, index) => {
        const target = document.getElementById(id);
        target.innerHTML = '';
        const sorted = [...entries].sort((a, b) => index === 0 ? a.clear_time - b.clear_time : b.total_score - a.total_score);
        sorted.slice(0, 10).forEach((entry) => {
            const item = document.createElement('li');
            const label = entry.nickname || entry.user_id || translations[document.documentElement.lang].anonymous;
            item.textContent = `${label} - ${entry.clear_time}s / ${entry.total_score}`;
            target.appendChild(item);
        });
        if (!sorted.length) target.innerHTML = `<li>${translations[document.documentElement.lang].scoreboardEmpty}</li>`;
    });
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

function attachScoreboardImportExportHandlers() {
    const scoreboardImportFile = document.getElementById('scoreboard-import-file');
    document.getElementById('scoreboard-export').addEventListener('click', exportScoreboard);
    document.getElementById('scoreboard-import').addEventListener('click', () => scoreboardImportFile.click());
    scoreboardImportFile.addEventListener('change', (event) => {
        const file = event.target.files && event.target.files[0];
        importScoreboard(file);
        event.target.value = '';
    });
}

function exportScoreboard() {
    const entries = getStoredScores();
    const json = JSON.stringify(entries, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `key-runner-scores-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
    scoreboardMessage.textContent = translations[document.documentElement.lang].scoreboardExported;
}

function importScoreboard(file) {
    if (!file) {
        return;
    }

    const reader = new FileReader();
    reader.onload = () => {
        try {
            const parsed = JSON.parse(String(reader.result || '[]'));
            const imported = Array.isArray(parsed) ? parsed : Array.isArray(parsed.scores) ? parsed.scores : [];
            const merged = [...getStoredScores(), ...imported];
            localStorage.setItem(scoreboardStorageKey, JSON.stringify(merged));
            renderScoreboard(merged);
            scoreboardMessage.textContent = translations[document.documentElement.lang].scoreboardImported;
        } catch {
            scoreboardMessage.textContent = translations[document.documentElement.lang].scoreboardImportError;
        }
    };
    reader.readAsText(file);
}

async function loadScoreboard() {
    renderScoreboard(getStoredScores());
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
gameStart.addEventListener('click', () => setModal(true, 'mode-modal'));
scoreboardOpen.addEventListener('click', async () => { setModal(true, 'scoreboard-modal'); await loadScoreboard(); });
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
attachScoreboardImportExportHandlers();
modeModal.querySelectorAll('[data-level]').forEach((link) => {
    link.addEventListener('click', () => {
        const level = link.dataset.level;
        if (level === 'tutorial' || getProgressState()[level]) {
            localStorage.setItem('key-runner-difficulty', level);
        }
    });
});

