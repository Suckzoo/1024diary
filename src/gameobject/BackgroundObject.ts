import * as PIXI from "pixi.js";
import { GameInstance } from "../game";
import { SpriteGameObject } from "./SpriteGameObject";

export const BACKGROUND_VELOCITY = 10;

export class BackgroundObject extends SpriteGameObject {
    sprite: PIXI.Sprite;
    id: string;
    constructor(id: string, resourceKey: string, initialX: number, width: number, height: number) {
        super();
        const spriteImage = GameInstance().resources[resourceKey].texture;
        this.sprite = new PIXI.Sprite(spriteImage);
        this.sprite.zIndex = -9999;
        this.x = initialX;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.rotation = 0;
        this.id = id;
    }
    stringify(): string {
        return this.id;
    }
    update(delta: number, _elapsed: number): void {
        this.x = this.x - BACKGROUND_VELOCITY * delta;
    }
    isDisposable() {
        return this.x < -this.width;
    }
}