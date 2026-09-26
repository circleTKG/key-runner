const interactiveSelector = 'a, button, input, select, textarea, [role="button"], [tabindex]:not([tabindex="-1"])';

export function initializeCustomCursor() {
    if (!window.matchMedia('(any-hover: hover) and (any-pointer: fine)').matches) {
        return;
    }

    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.setAttribute('aria-hidden', 'true');

    const halo = document.createElement('span');
    halo.className = 'custom-cursor__halo';
    const image = document.createElement('img');
    image.src = new URL('../logo/logo_m.png', import.meta.url).href;
    image.alt = '';
    image.draggable = false;
    cursor.append(halo, image);

    document.body.append(cursor);
    document.body.classList.add('custom-cursor-active');

    const updateHover = (target) => {
        cursor.classList.toggle('is-hovering', target instanceof Element && Boolean(target.closest(interactiveSelector)));
    };

    window.addEventListener('pointermove', (event) => {
        if (event.pointerType === 'touch') return;
        cursor.style.transform = `translate3d(${event.clientX - 3}px, ${event.clientY - 3}px, 0)`;
        cursor.classList.add('is-visible');
    }, { passive: true });

    document.addEventListener('pointerover', (event) => {
        if (event.pointerType !== 'touch') updateHover(event.target);
    });
    document.addEventListener('pointerout', (event) => {
        if (event.pointerType === 'touch') return;
        if (event.relatedTarget instanceof Element) {
            updateHover(event.relatedTarget);
        } else {
            cursor.classList.remove('is-visible', 'is-hovering');
        }
    });
    document.addEventListener('pointerdown', (event) => {
        if (event.pointerType !== 'touch') cursor.classList.add('is-pressed');
    });
    window.addEventListener('pointerup', () => cursor.classList.remove('is-pressed'));
    window.addEventListener('blur', () => cursor.classList.remove('is-visible', 'is-hovering', 'is-pressed'));
    document.addEventListener('focusin', (event) => {
        if (event.target instanceof Element && event.target.closest(interactiveSelector)) {
            cursor.classList.add('is-focused');
        }
    });
    document.addEventListener('focusout', (event) => {
        if (!(event.relatedTarget instanceof Element) || !event.relatedTarget.closest(interactiveSelector)) {
            cursor.classList.remove('is-focused');
        }
    });
}