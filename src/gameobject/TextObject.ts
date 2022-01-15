import * as PIXI from "pixi.js";
import uuid from 'uuid';
import { GameObject } from "./GameObject";

const VELOCITY = 10;
const ITEM_SIZE = 32;
const spriteImage = require("../assets/admit.png");

export class TextObject extends GameObject {
    textObj: PIXI.Text;
    style: PIXI.TextStyle;
    id: string;
    constructor(x: number, y: number, id: string, text: string, style?: PIXI.TextStyle) {
        super();
        this.textObj = new PIXI.Text(text);
        this.textObj.x = x;
        this.textObj.y = y;
        this.style = style;
        this.id = id;
    }
    stringify(): string {
        return 'text: ' + this.id;
    }
    update(delta: number, _elapsed: number): void {};
    get PIXIObject(): PIXI.Text {
        return this.textObj;
    }
    get text() {
        return this.textObj.text;
    }
    set text(t: string) {
        this.textObj.text = t;
    }
    get x() {
        return this.textObj.x;
    }
    set x(x: number) {
        this.textObj.x = x;
    }
    get y() {
        return this.textObj.y;
    }
    set y(y: number) {
        this.textObj.y = y;
    }
}