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

translations.ja.modeEyebrow = 'CHOOSE YOUR RUN';
translations.ja.modeTitle = 'プレイを選ぶ';
translations.en.modeEyebrow = 'CHOOSE YOUR RUN';
translations.en.modeTitle = 'Choose a run';

const language = document.getElementById('language');
const fontSize = document.getElementById('font-size');
const modal = document.getElementById('rules-modal');
const openButton = document.getElementById('rules-open');
const closeButton = document.getElementById('rules-close');
const modals = document.querySelectorAll('.modal');
const gameStart = document.getElementById('game-start');
const modeModal = document.getElementById('mode-modal');

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
if (!localStorage.getItem('key-runner-difficulty')) localStorage.setItem('key-runner-difficulty', 'easy');
modeModal.querySelectorAll('[data-level]').forEach((link) => {
    link.addEventListener('click', () => localStorage.setItem('key-runner-difficulty', link.dataset.level));
});
