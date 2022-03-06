import * as PIXI from "pixi.js";
import uuid from 'uuid';
import { SpriteGameObject } from "./SpriteGameObject";


export class BackgroundHelperObject extends SpriteGameObject {
    sprite: PIXI.Sprite;
    id: string;
    v: number;
    constructor(id: string, initialX: number, initialY: number, width: number, height: number, v: number, zIndex: number, texture: PIXI.Texture<PIXI.Resource>) {
        super();
        this.sprite = new PIXI.Sprite(texture);
        this.sprite.zIndex = zIndex;
        this.x = initialX;
        this.y = initialY;
        this.width = width;
        this.height = height;
        this.rotation = 0;
        this.id = id;
        this.v = v;
    }
    stringify(): string {
        return 'bgHelper: ' + this.id;
    }
    update(delta: number, _elapsed: number): void {
        this.x = this.x - this.v * delta;
    }
    isDisposable(): boolean {
        return this.x < -this.width;
    }
}