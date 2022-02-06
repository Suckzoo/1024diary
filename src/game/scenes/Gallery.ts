import * as PIXI from "pixi.js";
import { BACK_TEXTURE, LOCK_PICTURE, PHOTO_TEXTURE, SECRETPHOTO_TEXTURE, WOW_PICTURE } from "../../assets";
import { ButtonObject, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { PopupWithDescriptionObject } from "../../gameobject/UI/PopupWithDescriptionObject";
import { PIXIApp } from "../App";
import { AbstractScene } from "./Scene";

type Mode = "open" | "secret";

function openPopup(scene: GalleryScene, i: number, j: number) {
    //@TODO: load proper image at i,j
    const popup = new PopupWithDescriptionObject("gallery-popup", 0, 0, WOW_PICTURE, "wow.", () => {
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
            onUp: PIXI.Texture.from(BACK_TEXTURE),
            cancel: PIXI.Texture.from(BACK_TEXTURE),
            onHover: PIXI.Texture.from(BACK_TEXTURE),
            onDown: PIXI.Texture.from(BACK_TEXTURE)
        }
        const backButton = new ButtonObject('backButton', 10, 10, 100, 50, backButtonTextures, {
            onUp: () => this.app.launchMainScene(),
            onDown: () => {},
            cancel: () => {},
            onHover: () => {}
        });
        this.add(backButton);
        const photoButtonTextures: TexturesOnEvent = {
            onUp: PIXI.Texture.from(PHOTO_TEXTURE),
            cancel: PIXI.Texture.from(PHOTO_TEXTURE),
            onHover: PIXI.Texture.from(PHOTO_TEXTURE),
            onDown: PIXI.Texture.from(PHOTO_TEXTURE)
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
            onUp: PIXI.Texture.from(SECRETPHOTO_TEXTURE),
            cancel: PIXI.Texture.from(SECRETPHOTO_TEXTURE),
            onHover: PIXI.Texture.from(SECRETPHOTO_TEXTURE),
            onDown: PIXI.Texture.from(SECRETPHOTO_TEXTURE)
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
                    onUp: PIXI.Texture.from(WOW_PICTURE),
                    cancel: PIXI.Texture.from(WOW_PICTURE),
                    onHover: PIXI.Texture.from(WOW_PICTURE),
                    onDown: PIXI.Texture.from(WOW_PICTURE),
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
                    onUp: PIXI.Texture.from(LOCK_PICTURE),
                    cancel: PIXI.Texture.from(LOCK_PICTURE),
                    onDown: PIXI.Texture.from(LOCK_PICTURE),
                    onHover: PIXI.Texture.from(LOCK_PICTURE),
                };
                if (localStorage.getItem("secret" + i + j) === "true") {
                    wowTextures = {
                        onUp: PIXI.Texture.from(WOW_PICTURE),
                        cancel: PIXI.Texture.from(WOW_PICTURE),
                        onHover: PIXI.Texture.from(WOW_PICTURE),
                        onDown: PIXI.Texture.from(WOW_PICTURE),
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