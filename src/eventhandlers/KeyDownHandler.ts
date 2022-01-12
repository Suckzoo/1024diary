export class KeyDownHandlerClass {
    constructor() {}
    add(key, cb) {
        document.addEventListener('keydown', (e) => {
            if (e.key === key) {
                cb();
            }
            e.preventDefault();
        });
    }
}

export const KeyDownHandler = new KeyDownHandlerClass();