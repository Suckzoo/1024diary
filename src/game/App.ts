import * as PIXI from "pixi.js";
import PIXISound from '@pixi/sound';
import { AbstractScene } from "./scenes/Scene";
import { MainScene } from "./scenes/Main";
import { GameScene } from "./scenes/Game";
import { GalleryScene } from "./scenes/Gallery";
import { LoadSprites } from "../assets";

let Game: PIXIApp | null = null;

interface Modes {
    Record: boolean;
    Play: boolean;
    RandomPlay: boolean;
};

type Mode = "None" | "Main" | "Game" | "Gallery";

export class PIXIApp {
    mode: Mode;
    currentScene: AbstractScene | null;
    app: PIXI.Application;
    width: number;
    height: number;
    elapsed: number;
    resources: PIXI.utils.Dict<PIXI.LoaderResource>;

    constructor({
        documentBody,
        width,
        height
    }: {
        documentBody: HTMLElement,
        width: number,
        height: number
    }) {
        // this.mode = 'RandomPlay';
        this.mode = 'None';
        this.currentScene = null;
        // this.mode = 'Record';
        this.width = width;
        this.height = height;
        this.app = new PIXI.Application({width, height});
        documentBody.appendChild(this.app.view);
        this.elapsed = 0.0;
    }
    async callSpriteLoader() {
        const { Loader, Resources } = await LoadSprites(this.app.loader)
        this.resources = Resources;
    }
    loadScene(mode: Mode) {
        this.unloadCurrentScene();
        this.mode = mode;
        if (mode === 'None') {
            this.currentScene = null;
        } else if (mode === 'Main') {
            this.currentScene = new MainScene(this);
        } else if (mode === 'Game') {
            this.currentScene = new GameScene(this);
        } else if (mode === 'Gallery') {
            this.currentScene = new GalleryScene(this);
        }
        this.currentScene.load();
        this.app.stage.addChild(this.currentScene.container);
    }
    unloadCurrentScene() {
        if (this.currentScene) {
            this.app.stage.removeChild(this.currentScene.container);
            this.currentScene.destroy();
        }
        this.mode = 'None';
        this.currentScene = null;
    }
    play() {
        this.loadScene('Game');
    }
    launchGallery() {
        this.loadScene('Gallery');
    }
    launchMainScene() {
        this.loadScene('Main');
    }
    run() {
        this.app.ticker.add((delta: number) => {
            this.elapsed += delta;
            if (this.currentScene) {
                this.currentScene.update(delta, this.elapsed);
            }
        });
    }
    resetElapsed() {
        this.elapsed = 0;
    }
    finish() {
    }
    over() {
        alert('Game over!');
        this.loadScene('Main');
    }
}
export function GameInstance(documentBody?: HTMLElement, width?: number, height?: number) {
    if (!Game) {
        Game = new PIXIApp({
            documentBody,
            width,
            height,
        });
        Game.callSpriteLoader()
            .then(() => {
                Game.loadScene('Main');
            });
    }
    return Game;
}