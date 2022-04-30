import * as PIXI from "pixi.js";
import { sound } from "@pixi/sound";
import { GameInstance } from "..";
import { ButtonObject, CallbacksOnEvent, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { UISpriteObject } from "../../gameobject/UI/UISpriteObject";
import { PIXIApp } from "../App";
import { AbstractScene } from "./Scene";
import { PopupObject } from "../../gameobject/UI/PopupObject";
import { TextObject } from "../../gameobject/TextObject";
import { BackgroundHelperObject } from "../../gameobject/BackgroundHelperObject";

function setTexture(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    btn.texture = btn.texturesOnEvent[eventType];
}
function playGame(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    sound.play('pickup_sound');
    btn.texture = btn.texturesOnEvent[eventType];
    GameInstance().play();
}
function showLicenseInformation(scene: MainScene) {
    const popup = new PopupObject(
        'license',
        (container: PopupObject) => {
            const licenseText = new TextObject(
                100,
                50,
                'licenseText',
                `라이센스 정보

* Neo둥근모

Copyright © 2017-2022, Eunbin Jeong (Dalgona.) <project-neodgm@dalgona.dev>
with reserved font name "Neo둥근모" and "NeoDunggeunmo".


* Grotto Escape Game Art Pack

Artwork created by Luis Zuno (@ansimuz)
License (CC0) You can copy, modify, distribute and perform the work,
even for commercial purposes, all without asking permission:
http://creativecommons.org/publicdomain/zero/1.0/
Get more resources at ansimuz.com, Spread the word!
                `,
                new PIXI.TextStyle({
                    fontFamily: 'neodgm',
                    fontSize: 20
                })
            )
            container.add(licenseText);
        },
        () => {
            scene.removeById('license');
        }
    ) 
    scene.add(popup);
}
export class MainScene extends AbstractScene {
    constructor(app: PIXIApp) {
        super(app);
    }
    load(): void {
        const background = new UISpriteObject('background', 0, 0, 800, 500, GameInstance().resources['bg1-init'].texture);
        this.add(background);
        for(let i = 0; i < 17; i++) {
            const helper = new BackgroundHelperObject(`bg1-${i}`, 800 - 48 * (i + 1), 0, 48, 500, 0, -10000, GameInstance().resources['bg1'].texture);
            this.add(helper);
        }
        const logo = new UISpriteObject('logo', 150, 100, 500, 150, GameInstance().resources['logo'].texture);
        this.add(logo);
        const playButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['play'].texture,
            cancel: GameInstance().resources['play'].texture,
            onHover: GameInstance().resources['play_hover'].texture,
            onDown: GameInstance().resources['play_hover'].texture
        }
        const playButton = new ButtonObject('playButton', 245, 300, 310, 75, playButtonTextures, {
            onUp: playGame,
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(playButton);
        const licenseButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['ccj'].texture,
            cancel: GameInstance().resources['ccj'].texture,
            onHover: GameInstance().resources['ccj_hover'].texture,
            onDown: GameInstance().resources['ccj_hover'].texture,
        }
        const licenseButton = new ButtonObject('licenseButton', 405, 470, 150, 75, licenseButtonTextures, {
            onUp: () => {
                showLicenseInformation(this)
            },
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(licenseButton);
    }
    update(delta: number, elapsed: number): void {
        this.container.children.sort((a, b) => {
            return (a.zIndex || 0) - (b.zIndex || 0);
        })
    }
}