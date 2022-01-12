import * as PIXI from "pixi.js";

export type SpriteType = PIXI.Sprite | PIXI.AnimatedSprite;
export abstract class AbstractGameObject {
    _x: number;
    _y: number;
    _width: number;
    _height: number;
    _rotation: number;
    _scaleX: number;
    _scaleY: number;
    spriteURI: string;
    abstract sprite: SpriteType;
    constructor() {}
    abstract stringify();
    setObjectProperties(
        {
            x, y, width, height, rotation, scaleX, scaleY, spriteURI
        }
        : {
            x: number,
            y: number,
            width: number,
            height: number,
            rotation: number,
            scaleX: number,
            scaleY: number,
            spriteURI: string
        }
    ) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
        this.spriteURI = spriteURI;
    }
    abstract update(delta: number, elapsed: number): void;
    get x() {
        return this._x;
    }
    set x(x: number) {
        this._x = x;
        this.sprite.x = x;
    }
    get y() {
        return this._y;
    }
    set y(y: number) {
        console.log("y: " + y);
        this._y = y;
        this.sprite.y = y;
    }
    get width() {
        return this._width;
    }
    set width(width: number) {
        this._width = width;
        this.sprite.width = width;
    }
    get height() {
        return this._height;
    }
    set height(height: number) {
        this._height = height;
        this.sprite.height = height;
    }
    get rotation() {
        return this._rotation;
    }
    set rotation(rotation: number) {
        this._rotation = rotation;
        this.sprite.rotation = rotation;
    }
    get scaleX() {
        return this._scaleX;
    }
    set scaleX(scale: number) {
        this._scaleX = scale;
        this.sprite.scale.set(scale, 1);
    }
    get scaleY() {
        return this._scaleY;
    }
    set scaleY(scale: number) {
        this._scaleY = scale;
        this.sprite.scale.set(1, scale);
    }
}