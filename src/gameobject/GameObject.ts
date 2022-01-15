import * as PIXI from "pixi.js";

export type SpriteType = PIXI.Sprite | PIXI.AnimatedSprite;
export abstract class GameObject {
    constructor() {}
    abstract stringify();
    abstract update(delta: number, elapsed: number): void;
    abstract get PIXIObject();
}