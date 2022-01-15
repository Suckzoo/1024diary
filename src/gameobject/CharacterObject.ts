import * as PIXI from "pixi.js";
import { KeyDownHandler } from "../eventhandlers/KeyDownHandler";
import { AABBCollidableObject } from "./AABBCollidableObject";

type CharacterStatus = {
    onGround: boolean,
    jumping: boolean,
    secondJump: boolean
}

const GROUND_Y = 400;
const INITIAL_VELOCITY = 12.5;
const GRAVITY = 0.5;

export class CharacterObject extends AABBCollidableObject {
    sprite: PIXI.Sprite
    refTime: number;
    secondJumpRefY: number;
    elapsed: number;
    status: keyof CharacterStatus;
    constructor() {
        super();
        const spriteImage = require("../assets/gnroza.jpg");
        this.sprite = PIXI.Sprite.from(spriteImage);
        this.x = 64;
        this.y = 400;
        this.width = 64;
        this.height = 128;
        this.rotation = 0;
        this.spriteURI = spriteImage;
        this.refTime = 0;
        this.status = 'onGround';
        this.registerEventHandlers();
    }
    stringify(): string {
        return 'character';
    }
    update(_delta: number, elapsed: number): void {
        this.elapsed = elapsed;
        if (this.status === 'jumping') {
            const dt = elapsed - this.refTime;
            this.y = GROUND_Y - (INITIAL_VELOCITY * dt - 0.5 * GRAVITY * dt * dt); 
        } else if (this.status === 'secondJump') {
            const dt = elapsed - this.refTime;
            this.y = this.secondJumpRefY - (INITIAL_VELOCITY * dt - 0.5 * GRAVITY * dt * dt);
        }
        if (this.y >= GROUND_Y) {
            this.status = 'onGround';
            this.y = GROUND_Y;
        }
    }
    registerEventHandlers(): void {
        KeyDownHandler.add(' ', () => {
            console.log('hihi');
            if (this.status === 'onGround') {
                this.refTime = this.elapsed;
                this.status = 'jumping';
            } else if (this.status === 'jumping') {
                this.status = 'secondJump';
                this.secondJumpRefY = this.y;
                this.refTime = this.elapsed;
            }
        })
    }
}