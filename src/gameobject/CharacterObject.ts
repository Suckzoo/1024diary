import * as PIXI from "pixi.js";
import { KeyDownHandler } from "../eventhandlers/KeyDownHandler";
import { AbstractGameObject } from "./AbstractGameObject";

type CharacterStatus = {
    onGround: boolean,
    jumping: boolean,
}

const GROUND_Y = 0;
const INITIAL_VELOCITY = 10;
const GRAVITY = 0.5;

export class CharacterObject extends AbstractGameObject {
    sprite: PIXI.Sprite
    refTime: number;
    elapsed: number;
    status: keyof CharacterStatus;
    constructor() {
        super();
        const spriteImage = require("../assets/gnroza.jpg");
        this.sprite = PIXI.Sprite.from(spriteImage);
        this.setObjectProperties({x: 0, y: 0, width: 64, height: 64, rotation: 0, scaleX: 1, scaleY: 1, spriteURI: spriteImage});
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
            super.y = GROUND_Y + INITIAL_VELOCITY * dt - 0.5 * GRAVITY * dt * dt; 
            if (super.y <= 0) {
                this.status = 'onGround';
                super.y = 0;
            }
        }
    }
    registerEventHandlers(): void {
        KeyDownHandler.add(' ', () => {
            console.log('hihi');
            if (this.status === 'onGround') {
                this.refTime = this.elapsed
                this.status = 'jumping';
            }
        })
    }
}