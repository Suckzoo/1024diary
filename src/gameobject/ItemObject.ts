import * as PIXI from "pixi.js";
import uuid from 'uuid';
import { GameInstance } from "../game";
import { AABBCollidableObject } from "./AABBCollidableObject";

const ITEM_SIZE = 64;

export class ItemObject extends AABBCollidableObject {
    sprite: PIXI.AnimatedSprite;
    id: string;
    v: number;
    constructor(initialX: number, initialY: number, v: number, texture: PIXI.Texture<PIXI.Resource>[]) {
        super();
        this.sprite = new PIXI.AnimatedSprite(texture);
        this.sprite.animationSpeed = 0.1;
        this.sprite.zIndex = 99;
        this.sprite.play();
        this.x = initialX;
        this.y = initialY;
        this.width = ITEM_SIZE;
        this.height = ITEM_SIZE;
        this.rotation = 0;
        this.id = uuid.v4();
        this.v = v;
    }
    static spawn(initialX: number, initialY: number, v: number, texture: PIXI.Texture<PIXI.Resource>[]) {
        const xx = initialX;
        const yy = initialY - ITEM_SIZE / 2;
        return new ItemObject(xx, yy, v, texture);
    }
    stringify(): string {
        return 'item: ' + this.id;
    }
    update(delta: number, _elapsed: number): void {
        this.x = this.x - this.v * delta;
    }
    isDisposable(): boolean {
        return this.x < -ITEM_SIZE;
    }
}