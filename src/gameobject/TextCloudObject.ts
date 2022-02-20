import * as PIXI from "pixi.js";
import uuid from 'uuid';
import { GameInstance } from "../game";
import { TextObject } from "./TextObject";

export class TextCloudObject extends TextObject {
    v: number;
    constructor(x: number, y: number, v: number, id: string, text: string, style: PIXI.TextStyle) {
        super(x, y, id, text, style);
        this.v = v;
    }
    stringify(): string {
        return 'text: ' + this.id;
    }
    update(delta: number, _elapsed: number): void {
        this.x = this.x - this.v * delta;
    };
    static spawn(initialX: number, initialY: number, v: number, text: string) {
        return new TextCloudObject(initialX, initialY, v, uuid.v4(), text, new PIXI.TextStyle({
            fontFamily: 'neodgm',
            fontSize: 32
        }));
    }
    isDisposable(): boolean {
        return this.x < -this.width;
    }
}