import * as PIXI from "pixi.js";
import FontFaceObserver from 'fontfaceobserver';
import { AbstractScene } from "./scenes/Scene";
import { MainScene } from "./scenes/Main";
import { GameScene } from "./scenes/Game";
import { LoadSprites } from "../assets";

let Game: PIXIApp | null = null;

interface Modes {
    Record: boolean;
    Play: boolean;
    RandomPlay: boolean;
};

type Mode = "None" | "Main" | "Game";

export class PIXIApp {
    mode: Mode;
    currentScene: AbstractScene | null;
    app: PIXI.Application;
    width: number;
    height: number;
    elapsed: number;
    resources: PIXI.utils.Dict<PIXI.LoaderResource>;
    ItemTextures: {
        [key: string]: PIXI.Texture<PIXI.Resource>[];
    }
    private _paused: boolean;

    constructor({
        container,
        width,
        height
    }: {
        container: HTMLElement,
        width: number,
        height: number
    }) {
        this.mode = 'None';
        this.currentScene = null;
        this.width = width;
        this.height = height;
        this.app = new PIXI.Application({
            resizeTo: container
        });
        container.appendChild(this.app.view);
        this.ItemTextures = {};
        this.elapsed = 0.0;
        this._paused = false;
    }
    async callAssetsLoader() {
        const { Loader, Resources } = await LoadSprites(this.app.loader)
        this.resources = Resources;
        Object.keys(GameInstance().resources).forEach(key => {
            if (key.endsWith('-glow')) {
                if (GameInstance().resources[key.split('-glow')[0]]) {
                    this.ItemTextures[key.split('-glow')[0]] = [
                        GameInstance().resources[key.split('-glow')[0]].texture,
                        GameInstance().resources[key].texture
                    ];
                }
            }
        })
        const font = new FontFaceObserver('neodgm');
        await font.load();
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
    launchMainScene() {
        this.loadScene('Main');
    }
    stopTimer() {
        this._paused = true;
    }
    resumeTimer() {
        this._paused = false;
    }
    get paused() {
        return this._paused;
    }
    run() {
        this.app.ticker.add((delta: number) => {
            if (!this.paused) {
                this.elapsed += delta;
            }
            if (this.currentScene) {
                this.currentScene.update(delta, this.elapsed);
            }
        });
    }
    resetElapsed() {
        this.elapsed = 0;
    }
    finish() {
        this.loadScene('Main');
    }
    over() {
        this.loadScene('Main');
    }
    applyScreenResize(currWidth: number, currHeight: number) {
        const prevWidth = this.width;
        const prevHeight = this.height;
        this.width = currWidth;
        this.height = currHeight;
        this.app.resize();
        if (this.currentScene) {
            this.currentScene.onResize(prevWidth, prevHeight);
        }
    }
}
export function GameInstance(container?: HTMLElement, width?: number, height?: number) {
    if (!Game) {
        Game = new PIXIApp({
            container,
            width,
            height,
        });
        Game.callAssetsLoader()
            .then(() => {
                Game.loadScene('Main');
            });
    }
    return Game;
}