import * as PIXI from "pixi.js";
import { sound } from "@pixi/sound";
import { GameInstance } from "..";
import { ButtonObject, CallbacksOnEvent, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { UISpriteObject } from "../../gameobject/UI/UISpriteObject";
import { PIXIApp } from "../App";
import { AbstractScene } from "./Scene";

function setTexture(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    btn.texture = btn.texturesOnEvent[eventType];
}
function playGame(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    sound.play('sword_sound');
    btn.texture = btn.texturesOnEvent[eventType];
    GameInstance().play();
}
function launchGallery(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    sound.play('sword_sound');
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
        const logo = new UISpriteObject('logo', 150, 100, 500, 150, GameInstance().resources['logo'].texture);
        this.add(logo);
        const playButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['play'].texture,
            cancel: GameInstance().resources['play'].texture,
            onHover: GameInstance().resources['play_hover'].texture,
            onDown: GameInstance().resources['play_hover'].texture
        }
        const playButton = new ButtonObject('playButton', 325, 300, 150, 75, playButtonTextures, {
            onUp: playGame,
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(playButton);
        const galleryButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['gallery'].texture,
            cancel: GameInstance().resources['gallery'].texture,
            onHover: GameInstance().resources['gallery_hover'].texture,
            onDown: GameInstance().resources['gallery_hover'].texture,
        }
        const galleryButton = new ButtonObject('playButton', 325, 385, 150, 75, galleryButtonTextures, {
            onUp: launchGallery,
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(galleryButton);
        const ccjButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['ccj'].texture,
            cancel: GameInstance().resources['ccj'].texture,
            onHover: GameInstance().resources['ccj_hover'].texture,
            onDown: GameInstance().resources['ccj_hover'].texture,
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