import * as PIXI from "pixi.js";

export type SpriteType = PIXI.Sprite | PIXI.AnimatedSprite;
export abstract class GameObject {
    abstract id: string;
    constructor() {}
    abstract stringify();
    abstract update(delta: number, elapsed: number): void;
    abstract get PIXIObject();
    abstract onScreenResize(prevWidth: number, prevHeight: number): void;
}