import * as PIXI from "pixi.js";
import { SpriteGameObject } from "./SpriteGameObject";


export class LinearParticleObject extends SpriteGameObject {
    sprite: PIXI.Sprite;
    id: string;
    initialX: number;
    initialY: number;
    vx: number;
    vy: number;
    elapsedRef: number;
    constructor(
        elapsedRef: number,
        id: string,
        initialX: number,
        initialY: number,
        width: number,
        height: number,
        vx: number,
        vy: number,
        flip: number,
        texture: PIXI.Texture<PIXI.Resource>
    ) {
        super();
        this.elapsedRef = elapsedRef + Math.random() * 30;
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.zIndex = 1000;
        this.x = this.initialX = initialX;
        this.y = this.initialY = initialY;
        this.width = width;
        this.height = height;
        this.rotation = 0;
        this.id = id;
        this.vx = vx;
        this.vy = vy;
        this.scale(flip, 1);
    }
    stringify(): string {
        return this.id;
    }
    update(delta: number, _elapsed: number): void {
        const t = delta / 20;
        this.x += this.vx * t + (50 * this.vx) * t * t / 2;
        this.y += this.vy * t + (50 * this.vy) * t * t / 2;
    }
    isDisposable(): boolean {
        return this.y > 600;
    }
}