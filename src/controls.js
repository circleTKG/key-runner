export function createKeyboardState(target = document) {
    const keys = {};
    const movementCodes = new Set([
        'KeyW',
        'KeyA',
        'KeyD',
        'ArrowUp',
        'ArrowLeft',
        'ArrowRight'
    ]);

    target.addEventListener('keydown', (event) => {
        if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
            return;
        }
        if (movementCodes.has(event.code)) {
            keys[event.code] = true;
            event.preventDefault();
        }
    });

    target.addEventListener('keyup', (event) => {
        keys[event.code] = false;
    });

    window.addEventListener('blur', () => {
        movementCodes.forEach((code) => {
            keys[code] = false;
        });
    });

    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            movementCodes.forEach((code) => {
                keys[code] = false;
            });
        }
    });

    return keys;
}
