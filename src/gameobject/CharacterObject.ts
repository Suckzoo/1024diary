import * as PIXI from "pixi.js";
import { sound } from '@pixi/sound';
import { KeyDownHandler } from "../eventhandlers/KeyDownHandler";
import { GameInstance } from "../game";
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
    sprite: PIXI.AnimatedSprite
    refTime: number;
    secondJumpRefY: number;
    elapsed: number;
    status: keyof CharacterStatus;
    constructor() {
        super();
        this.sprite = new PIXI.AnimatedSprite([
            GameInstance().resources['character1'].texture,
            GameInstance().resources['character2'].texture,
            GameInstance().resources['character3'].texture,
            GameInstance().resources['character4'].texture,
        ]);
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
        this.x = 64;
        this.y = 400;
        this.width = 86;
        this.height = 129;
        this.rotation = 0;
        this.refTime = 0;
        this.status = 'onGround';
        this.registerEventHandlers();
    }
    stringify(): string {
        return 'character';
    }
    jump(): void {
        if (this.status !== 'secondJump') {
            this.sprite.stop();
            sound.play('sword_sound');
        }
        if (this.status === 'onGround') {
            this.refTime = this.elapsed;
            this.status = 'jumping';
        } else if (this.status === 'jumping') {
            this.status = 'secondJump';
            this.secondJumpRefY = this.y;
            this.refTime = this.elapsed;
        }
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
            this.sprite.play();
            this.status = 'onGround';
            this.y = GROUND_Y;
        }
    }
    registerEventHandlers(): void {
        KeyDownHandler.add(' ', () => {
            this.jump()
        });
    }
}