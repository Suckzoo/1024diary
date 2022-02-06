import * as PIXI from "pixi.js";
import { GameInstance } from "..";
import { CCJ_HOVER_TEXTURE, CCJ_TEXTURE, GALLERY_HOVER_TEXTURE, GALLERY_TEXTURE, LOGO_TEXTURE, PLAY_HOVER_TEXTURE, PLAY_TEXTURE } from "../../assets";
import { ButtonObject, CallbacksOnEvent, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { UISpriteObject } from "../../gameobject/UI/UISpriteObject";
import { PIXIApp } from "../App";
import { AbstractScene } from "./Scene";

function setTexture(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    btn.texture = btn.texturesOnEvent[eventType];
}
function playGame(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    btn.texture = btn.texturesOnEvent[eventType];
    GameInstance().play();
}
function launchGallery(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    btn.texture = btn.texturesOnEvent[eventType];
    GameInstance().launchGallery();
}
function toBeImplemented(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    btn.texture = btn.texturesOnEvent[eventType];
    alert("TODO");
}
export class MainScene extends AbstractScene {
    constructor(app: PIXIApp) {
        super(app);
    }
    load(): void {
        const logo = new UISpriteObject('logo', 150, 100, 500, 150, PIXI.Texture.from(LOGO_TEXTURE));
        this.add(logo);
        const playButtonTextures: TexturesOnEvent = {
            onUp: PIXI.Texture.from(PLAY_TEXTURE),
            cancel: PIXI.Texture.from(PLAY_TEXTURE),
            onHover: PIXI.Texture.from(PLAY_HOVER_TEXTURE),
            onDown: PIXI.Texture.from(PLAY_HOVER_TEXTURE)
        }
        const playButton = new ButtonObject('playButton', 325, 300, 150, 75, playButtonTextures, {
            onUp: playGame,
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(playButton);
        const galleryButtonTextures: TexturesOnEvent = {
            onUp: PIXI.Texture.from(GALLERY_TEXTURE),
            cancel: PIXI.Texture.from(GALLERY_TEXTURE),
            onHover: PIXI.Texture.from(GALLERY_HOVER_TEXTURE),
            onDown: PIXI.Texture.from(GALLERY_HOVER_TEXTURE)
        }
        const galleryButton = new ButtonObject('playButton', 325, 385, 150, 75, galleryButtonTextures, {
            onUp: launchGallery,
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(galleryButton);
        const ccjButtonTextures: TexturesOnEvent = {
            onUp: PIXI.Texture.from(CCJ_TEXTURE),
            cancel: PIXI.Texture.from(CCJ_TEXTURE),
            onHover: PIXI.Texture.from(CCJ_HOVER_TEXTURE),
            onDown: PIXI.Texture.from(CCJ_HOVER_TEXTURE)
        }
        const ccjButton = new ButtonObject('playButton', 325, 470, 150, 75, ccjButtonTextures, {
            onUp: toBeImplemented,
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(ccjButton);
    }
    update(delta: number, elapsed: number): void {}
}