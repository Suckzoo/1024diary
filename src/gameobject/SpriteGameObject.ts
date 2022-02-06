import * as PIXI from "pixi.js";
import { GameObject } from "./GameObject";

export type SpriteType = PIXI.Sprite | PIXI.AnimatedSprite;
export abstract class SpriteGameObject extends GameObject {
    spriteURI: string;
    abstract sprite: SpriteType;
    constructor() {
        super();
    }
    get PIXIObject(): SpriteType {
        return this.sprite;
    }
    get x() {
        return this.sprite.x;
    }
    set x(x: number) {
        this.sprite.x = x;
    }
    get y() {
        return this.sprite.y;
    }
    set y(y: number) {
        this.sprite.y = y;
    }
    get pivot() {
        return this.sprite.pivot;
    }
    set pivot(p) {
        this.sprite.pivot = p;
    }
    get width() {
        return this.sprite.width;
    }
    set width(width: number) {
        this.sprite.width = width;
    }
    get height() {
        return this.sprite.height;
    }
    set height(height: number) {
        this.sprite.height = height;
    }
    get rotation() {
        return this.sprite.rotation;
    }
    set rotation(rotation: number) {
        this.sprite.rotation = rotation;
    }
    scale(scaleX, scaleY) {
        this.sprite.scale.x = scaleX;
        this.sprite.scale.y = scaleY;
    }
}