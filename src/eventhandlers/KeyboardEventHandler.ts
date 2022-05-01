export class KeyboardEventHandlerClass {
    constructor() {}
    down(key, cb) {
        document.addEventListener('keydown', (e) => {
            if (e.key === key) {
                cb();
            }
            e.preventDefault();
        });
    }
    up(key, cb) {
        document.addEventListener('keyup', (e) => {
            if (e.key === key) {
                cb();
            }
            e.preventDefault();
        });
    }
}

export const KeyboardEventHandler = new KeyboardEventHandlerClass();