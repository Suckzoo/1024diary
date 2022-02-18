import * as PIXI from "pixi.js";
import uuid from 'uuid';
import { GameInstance } from "../game";
import { AABBCollidableObject } from "./AABBCollidableObject";

const VELOCITY = 10;
const ITEM_SIZE = 32;

export class ItemObject extends AABBCollidableObject {
    sprite: PIXI.Sprite;
    id: string;
    constructor(initialX: number, initialY: number) {
        super();
        const sprite = GameInstance().resources['admit'].texture;
        this.sprite = new PIXI.Sprite(sprite);
        this.x = initialX;
        this.y = initialY;
        this.width = ITEM_SIZE;
        this.height = ITEM_SIZE;
        this.rotation = 0;
        this.id = uuid.v4();
    }
    static spawn(initialX: number, initialY: number) {
        const xx = initialX;
        const yy = initialY - ITEM_SIZE / 2;
        return new ItemObject(xx, yy);
    }
    stringify(): string {
        return 'item: ' + this.id;
    }
    update(delta: number, _elapsed: number): void {
        this.x = this.x - VELOCITY * delta;
    }
    isDisposable(): boolean {
        return this.x < -ITEM_SIZE;
    }
}