import * as PIXI from "pixi.js";
import { sound } from '@pixi/sound';
import { KeyDownHandler } from "../eventhandlers/KeyDownHandler";
import { GameInstance } from "../game";
import { AABBCollidableObject } from "./AABBCollidableObject";

type CharacterStatus = {
    onGround: boolean,
    jumping: boolean,
    secondJump: boolean,
    frozen: boolean,
    done: boolean
}

const GROUND_Y = 371;
const INITIAL_VELOCITY = 12.5;
const GRAVITY = 0.5;
const FINALE_X_SPEED = 1.5;

export class CharacterObject extends AABBCollidableObject {
    sprite: PIXI.AnimatedSprite
    refTime: number;
    frozenTime: number;
    frozenRef: number;
    frozenStatus: keyof CharacterStatus;
    secondJumpRefY: number;
    elapsed: number;
    status: keyof CharacterStatus;
    finalJump: boolean;
    jumpPrevented: boolean;
    constructor() {
        super();
        this.sprite = new PIXI.AnimatedSprite([
            GameInstance().resources['character1'].texture,
            GameInstance().resources['character2'].texture,
            GameInstance().resources['character3'].texture,
            GameInstance().resources['character4'].texture,
        ]);
        this.sprite.zIndex = 999;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
        this.x = 64;
        this.y = GROUND_Y;
        this.width = 172;
        this.height = 129;
        this.rotation = 0;
        this.refTime = 0;
        this.frozenTime = 0;
        this.frozenRef = 0;
        this.frozenStatus = 'frozen';
        this.status = 'onGround';
        this.finalJump = false;
        this.jumpPrevented = false;
        this.registerEventHandlers();
    }
    stringify(): string {
        return 'character';
    }
    preventJump(): void {
        console.log("Finale mode: jump prevented");
        this.jumpPrevented = true;
    }
    jump(force: boolean = false): void {
        if (this.jumpPrevented && !force) return;
        if (this.finalJump) return;
        if (this.status === 'frozen') return;
        if (this.status !== 'secondJump') {
            this.sprite.stop();
            sound.play('jump_sound');
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
    freeze(): void {
        this.frozenTime = this.elapsed;
        this.frozenRef = this.elapsed - this.refTime;
        this.frozenStatus = this.status;
        this.status = 'frozen';
    }
    unfreeze(): void {
        this.status = this.frozenStatus;
        this.refTime = this.elapsed - this.frozenRef;
        this.frozenStatus = 'frozen';
    }
    update(_delta: number, elapsed: number): void {
        this.elapsed = elapsed;
        if (this.status === 'frozen') {
            // do nothing
        } else if (this.status === 'jumping') {
            const dt = elapsed - this.refTime;
            this.y = GROUND_Y - (INITIAL_VELOCITY * dt - 0.5 * GRAVITY * dt * dt); 
        } else if (this.status === 'secondJump') {
            const dt = elapsed - this.refTime;
            this.y = this.secondJumpRefY - (INITIAL_VELOCITY * dt - 0.5 * GRAVITY * dt * dt);
        }
        if (this.status !== 'onGround' && this.y >= GROUND_Y) {
            this.sprite.play();
            this.status = 'onGround';
            this.y = GROUND_Y;
        }
    }
    isLifecycleDone(): boolean {
        return this.status === 'done';
    }
    updateForFinale(delta: number, elapsed: number): void {
        this.elapsed = elapsed;
        this.x += delta * FINALE_X_SPEED;
        if (this.status === 'onGround') {
            if (!this.finalJump && this.x >= 400 - this.width / 2 - 46 * FINALE_X_SPEED) {
                this.jump(true);
                this.finalJump = true;
            } else if (this.finalJump) {
                this.x = 400 - this.width / 2;
            }
        } else if (this.status === 'jumping') {
            const dt = elapsed - this.refTime;
            this.y = GROUND_Y - (INITIAL_VELOCITY * dt - 0.5 * GRAVITY * dt * dt); 
        } else if (this.status === 'secondJump') {
            const dt = elapsed - this.refTime;
            this.y = this.secondJumpRefY - (INITIAL_VELOCITY * dt - 0.5 * GRAVITY * dt * dt);
        }
        if (this.finalJump) {
            const dt = elapsed - this.refTime;
            const v = INITIAL_VELOCITY - dt * GRAVITY;
            if (this.y >= GROUND_Y - 36 && v < 0) {
                this.x = 400 - this.width / 2;
                this.y = GROUND_Y - 36;
                this.status = 'done';
            }
        } else if (!this.finalJump && this.status !== 'onGround' && this.y >= GROUND_Y) {
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