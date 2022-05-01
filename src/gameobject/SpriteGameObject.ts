import * as PIXI from "pixi.js";
import { GameInstance } from "../game";
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
        return this.sprite.x / GameInstance().width * 800;
    }
    set x(x: number) {
        this.sprite.x = x / 800 * GameInstance().width;
    }
    get y() {
        return this.sprite.y / GameInstance().height * 600;
    }
    set y(y: number) {
        this.sprite.y = y / 600 * GameInstance().height;
    }
    get pivot() {
        return this.sprite.pivot;
    }
    set pivot(p) {
        p.x = p.x / 800 * GameInstance().width;
        p.y = p.y / 600 * GameInstance().height;
        this.sprite.pivot = p;
    }
    get width() {
        return this.sprite.width / GameInstance().width * 800;
    }
    set width(width: number) {
        this.sprite.width = width / 800 * GameInstance().width;
    }
    get height() {
        return this.sprite.height / GameInstance().height * 600;
    }
    set height(height: number) {
        this.sprite.height = height / 600 * GameInstance().height;
    }
    onScreenResize(prevWidth: number, prevHeight: number): void {
        if (this.id === 'panel') {
            console.log("I'm listening: panel")
        }
        this.x = this.x / prevWidth * GameInstance().width;
        this.y = this.y / prevHeight * GameInstance().height;
        this.width = this.width / prevWidth * GameInstance().width;
        this.height = this.height / prevHeight * GameInstance().height;
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