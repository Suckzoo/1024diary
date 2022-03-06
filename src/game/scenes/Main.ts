import * as PIXI from "pixi.js";
import { THUMBNAIL } from '../../assets/'
import { sound } from "@pixi/sound";
import { GameInstance } from "..";
import { ButtonObject, CallbacksOnEvent, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { UISpriteObject } from "../../gameobject/UI/UISpriteObject";
import { PIXIApp } from "../App";
import { AbstractScene } from "./Scene";
import { PopupObject } from "../../gameobject/UI/PopupObject";
import { TextObject } from "../../gameobject/TextObject";

function setTexture(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    btn.texture = btn.texturesOnEvent[eventType];
}
function playGame(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    sound.play('pickup_sound');
    btn.texture = btn.texturesOnEvent[eventType];
    GameInstance().play();
}
function launchGallery(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    sound.play('pickup_sound');
    btn.texture = btn.texturesOnEvent[eventType];
    GameInstance().launchGallery();
}
function openInvitation(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    location.href = 'https://suckzoo.github.io/wedding-invitation';
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
function shareByKakaoTalk(btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) {
    Kakao.Link.sendDefault({
        objectType: 'location',
        address: '서울 구로구 경인로 624 신도림라마다호텔 5층 세인트그레이스홀',
        addressTitle: '신도림라마다호텔',
        content: {
            title: '석주와 유라의 웨딩런!',
            description: '석주와 유라의 결혼식에 초대합니다!',
            imageUrl: THUMBNAIL,
            link: {
                mobileWebUrl: 'https://suckzoo.github.io/huvafen',
                webUrl: 'https://suckzoo.github.io/huvafen'
            },
        },
        buttons: [
            {
                title: '웹으로 보기',
                link: {
                    mobileWebUrl: 'https://suckzoo.github.io/huvafen',
                    webUrl: 'https://suckzoo.github.io/huvafen'
                },
            },
        ],
    })
}
export class MainScene extends AbstractScene {
    constructor(app: PIXIApp) {
        super(app);
    }
    load(): void {
        const background = new UISpriteObject('background', 0, 0, 800, 500, GameInstance().resources['bg1-init'].texture);
        this.add(background);
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
        const galleryButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['gallery'].texture,
            cancel: GameInstance().resources['gallery'].texture,
            onHover: GameInstance().resources['gallery_hover'].texture,
            onDown: GameInstance().resources['gallery_hover'].texture,
        }
        const galleryButton = new ButtonObject('galleryButton', 245, 385, 150, 75, galleryButtonTextures, {
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
        const ccjButton = new ButtonObject('ccjButton', 405, 385, 150, 75, ccjButtonTextures, {
            onUp: openInvitation,
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(ccjButton);
        const shareButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['ccj'].texture,
            cancel: GameInstance().resources['ccj'].texture,
            onHover: GameInstance().resources['ccj_hover'].texture,
            onDown: GameInstance().resources['ccj_hover'].texture,
        }
        const shareButton = new ButtonObject('ccjButton', 245, 470, 150, 75, shareButtonTextures, {
            onUp: shareByKakaoTalk,
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(shareButton);
        const licenseButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['ccj'].texture,
            cancel: GameInstance().resources['ccj'].texture,
            onHover: GameInstance().resources['ccj_hover'].texture,
            onDown: GameInstance().resources['ccj_hover'].texture,
        }
        const licenseButton = new ButtonObject('ccjButton', 405, 470, 150, 75, licenseButtonTextures, {
            onUp: () => {
                showLicenseInformation(this)
            },
            cancel: setTexture,
            onHover: setTexture,
            onDown: setTexture
        });
        this.add(licenseButton);
    }
    update(delta: number, elapsed: number): void {}
}