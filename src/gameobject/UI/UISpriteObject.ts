import * as PIXI from "pixi.js";
import { SpriteGameObject } from "../SpriteGameObject";

const VELOCITY = 10;

export class UISpriteObject extends SpriteGameObject {
    sprite: PIXI.Sprite;
    id: string;
    constructor(id: string, initialX: number, initialY: number, width: number, height: number, texture: any) {
        super();
        this.sprite = new PIXI.Sprite();
        this.texture = texture;
        this.x = initialX;
        this.y = initialY;
        this.width = width;
        this.height = height;
        this.rotation = 0;
        this.id = id;
    }
    set texture(txt: PIXI.Texture) {
        this.sprite.texture = txt;
    }
    stringify(): string {
        return this.id;
    }
    update(delta: number, _elapsed: number): void {}
}