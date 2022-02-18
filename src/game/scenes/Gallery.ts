import * as PIXI from "pixi.js";
import { GameInstance } from "..";
import { ButtonObject, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { PopupWithDescriptionObject } from "../../gameobject/UI/PopupWithDescriptionObject";
import { PIXIApp } from "../App";
import { AbstractScene } from "./Scene";

type Mode = "open" | "secret";

function openPopup(scene: GalleryScene, i: number, j: number) {
    //@TODO: load proper image at i,j
    const popup = new PopupWithDescriptionObject("gallery-popup", 0, 0, 'wow', "wow.", () => {
        scene.removeById("gallery-popup");
    })
    scene.add(popup);
}
export class GalleryScene extends AbstractScene {
    _mode: Mode;
    constructor(app: PIXIApp) {
        super(app);
        this._mode = "open";
    }
    get mode() {
        return this._mode;
    }
    set mode(mode: Mode) {
        if (this._mode !== mode) {
            for(let i = 0; i < 3; i++) {
                for(let j = 0; j < 3; j++) {
                    this.removeById(`photoButton(${i},${j})`);
                }
            }
            this._mode = mode;
            this.reveal();
        }
    }
    load(): void {
        const backButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['back'].texture,
            cancel: GameInstance().resources['back'].texture,
            onHover: GameInstance().resources['back'].texture,
            onDown: GameInstance().resources['back'].texture,
        }
        const backButton = new ButtonObject('backButton', 10, 10, 100, 50, backButtonTextures, {
            onUp: () => this.app.launchMainScene(),
            onDown: () => {},
            cancel: () => {},
            onHover: () => {}
        });
        this.add(backButton);
        const photoButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['photo'].texture,
            cancel: GameInstance().resources['photo'].texture,
            onHover: GameInstance().resources['photo'].texture,
            onDown: GameInstance().resources['photo'].texture,
        }
        const photoButton = new ButtonObject('photoButton', 120, 10, 100, 50, photoButtonTextures, {
            onUp: () => {
                this.mode = "open";
            },
            onDown: () => {},
            cancel: () => {},
            onHover: () => {}
        });
        this.add(photoButton);
        const secretPhotoButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['secretphoto'].texture,
            cancel: GameInstance().resources['secretphoto'].texture,
            onHover: GameInstance().resources['secretphoto'].texture,
            onDown: GameInstance().resources['secretphoto'].texture,
        }
        const secretPhotoButton = new ButtonObject('secretphotoButton', 230, 10, 100, 50, secretPhotoButtonTextures, {
            onUp: () => {
                this.mode = "secret";
            },
            onDown: () => {},
            cancel: () => {},
            onHover: () => {}
        });
        this.add(secretPhotoButton);
        this.reveal();
        
    }
    reveal() {
        if (this.mode === "open") {
            this.revealOpenedImages();
        } else {
            this.revealSecretImages();
        }
    }
    revealOpenedImages() {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                const wowTextures: TexturesOnEvent = {
                    onUp: GameInstance().resources['wow'].texture,
                    cancel: GameInstance().resources['wow'].texture,
                    onHover: GameInstance().resources['wow'].texture,
                    onDown: GameInstance().resources['wow'].texture,
                }
                const photo = new ButtonObject(`photoButton(${i},${j})`, 10 + i * 210, 100 + j * 160, 200, 150, wowTextures, {
                    onUp: () => { openPopup(this, i, j); },
                    onDown: () => {},
                    cancel: () => {},
                    onHover: () => {}
                });
                this.add(photo);
            }
        }
    }
    revealSecretImages() {
        for(let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                let wowTextures: TexturesOnEvent = {
                    onUp: GameInstance().resources['lock'].texture,
                    cancel: GameInstance().resources['lock'].texture,
                    onHover: GameInstance().resources['lock'].texture,
                    onDown: GameInstance().resources['lock'].texture,
                };
                if (localStorage.getItem("secret" + i + j) === "true") {
                    wowTextures = {
                        onUp: GameInstance().resources['wow'].texture,
                        cancel: GameInstance().resources['wow'].texture,
                        onHover: GameInstance().resources['wow'].texture,
                        onDown: GameInstance().resources['wow'].texture,
                    }
                }
                
                const photo = new ButtonObject(`photoButton(${i},${j})`, 10 + i * 210, 100 + j * 160, 200, 150, wowTextures, {
                    onUp: () => {
                        if (localStorage.getItem("secret" + i + j) === "true") {
                            openPopup(this, i, j);
                        }
                    },
                    onDown: () => {},
                    cancel: () => {},
                    onHover: () => {}
                });
                this.add(photo);
            }
        }
    }
    update(delta: number, elapsed: number): void {}
}