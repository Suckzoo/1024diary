import * as PIXI from "pixi.js";
import uuid from 'uuid';
import { CONE_IMAGE } from "../assets";
import { AABBCollidableObject } from "./AABBCollidableObject";

const spriteImage = CONE_IMAGE;

export class ObstacleObject extends AABBCollidableObject {
    sprite: PIXI.Sprite;
    id: string;
    velocity: number;
    constructor(initialX: number, initialY: number, width: number, height: number, velocity: number) {
        super();
        this.sprite = PIXI.Sprite.from(spriteImage);
        this.x = initialX;
        this.y = initialY;
        this.width = width;
        this.height = height;
        this.velocity = velocity;
        this.rotation = 0;
        this.spriteURI = spriteImage;
        this.id = uuid.v4();
    }
    static spawn(initialX: number, initialY: number, width: number, height: number, velocity: number) {
        const xx = initialX;
        const yy = initialY - height / 2;
        return new ObstacleObject(xx, yy, width, height, velocity);
    }
    stringify(): string {
        return 'item: ' + this.id;
    }
    update(delta: number, _elapsed: number): void {
        this.x = this.x - this.velocity * delta;
    }
    isDisposable(): boolean {
        return this.x < -this.width;
    }
}