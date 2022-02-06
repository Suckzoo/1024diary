import * as PIXI from "pixi.js";
import { BACKGROUND_IMAGE } from "../assets";
import { SpriteGameObject } from "./SpriteGameObject";

const VELOCITY = 10;

export class BackgroundObject extends SpriteGameObject {
    sprite: PIXI.Sprite;
    id: string;
    constructor(id: string, initialX: number, width: number, height: number) {
        super();
        const spriteImage = BACKGROUND_IMAGE;
        this.sprite = PIXI.Sprite.from(spriteImage);
        this.x = initialX;
        this.y = 0;
        this.width = width;
        this.height = height;
        this.rotation = 0;
        this.spriteURI = spriteImage
        this.id = id;
    }
    stringify(): string {
        return this.id;
    }
    update(delta: number, _elapsed: number): void {
        this.x = this.x - VELOCITY * delta;
        if (this.x < -this.width) {
            const delta = -this.width - this.x;
            this.x = this.width - delta;
        }
    }
}