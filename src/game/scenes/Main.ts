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

function playGame(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    sound.play('pickup_sound');
    GameInstance().play();
}
function showLicenseInformation(scene: MainScene, btn: ButtonObject) {
    sound.play('pickup_sound');
    const popup = new PopupObject(
        'license',
        (container: PopupObject) => {
            const licenseText = new TextObject(
                100,
                100,
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
                    fontSize: "2.5vh"
                })
            )
            container.add(licenseText);
        },
        () => {
            scene.removeById('license');
            btn.enable();
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
        const logo = new UISpriteObject('logo', 36, 82, 727, 336, GameInstance().resources['logo'].texture);
        this.add(logo);
        const playButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['ui-button-start'].texture,
            cancel: GameInstance().resources['ui-button-start'].texture,
            onHover: GameInstance().resources['ui-button-start'].texture,
            onDown: GameInstance().resources['ui-button-start'].texture,
        }
        const playButton = new ButtonObject('playButton', 0, 500, 800, 100, playButtonTextures, {
            onUp: playGame,
            cancel: () => {},
            onHover: () => {},
            onDown: () => {}
        });
        this.add(playButton);
        const licenseButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['ui-button-license'].texture,
            cancel: GameInstance().resources['ui-button-license'].texture,
            onHover: GameInstance().resources['ui-button-license'].texture,
            onDown: GameInstance().resources['ui-button-license'].texture,
        }
        const licenseButton = new ButtonObject('licenseButton', 632, 0, 148, 85, licenseButtonTextures, {
            onUp: () => {
                licenseButton.disable();
                showLicenseInformation(this, licenseButton)
            },
            cancel: () => {},
            onHover: () => {},
            onDown: () => {}
        });
        this.add(licenseButton);
    }
    update(delta: number, elapsed: number): void {
        this.container.children.sort((a, b) => {
            return (a.zIndex || 0) - (b.zIndex || 0);
        })
    }
}