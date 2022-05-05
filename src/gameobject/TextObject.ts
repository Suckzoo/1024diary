import * as PIXI from "pixi.js";
import { GameInstance } from "../game";
import { GameObject } from "./GameObject";

export class TextObject extends GameObject {
    textObj: PIXI.Text;
    style: PIXI.TextStyle;
    id: string;
    width: number;
    fontSize: number;
    constructor(x: number, y: number, width: number, id: string, text: string, fontSize: number) {
        super();
        this.style = new PIXI.TextStyle({
            fontFamily: 'neodgm',
            fill: '#1f1a19',
        })
        this.style.wordWrap = true;
        this.width = width;
        this.fontSize = fontSize;
        this.resizeFontSize();
        this.resizeWordWrapWidth();
        this.textObj = new PIXI.Text(text, this.style);
        this.textObj.roundPixels = true;
        this.x = x;
        this.y = y;
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
        return this.textObj.x / GameInstance().width * 800;
    }
    set x(x: number) {
        this.textObj.x = x / 800 * GameInstance().width;
    }
    get y() {
        return this.textObj.y / GameInstance().height * 600;
    }
    set y(y: number) {
        this.textObj.y = y / 600 * GameInstance().height;
    }
    resizeWordWrapWidth() {
        this.style.wordWrapWidth = this.width / 800 * GameInstance().width;
    }
    resizeFontSize() {
        this.style.fontSize = this.fontSize / 600 * GameInstance().height;
        this.style.lineHeight = (this.fontSize + 4) / 600 * GameInstance().height;
    }

    onScreenResize(prevWidth: number, prevHeight: number): void {
        this.x = this.x / prevWidth * GameInstance().width;
        this.y = this.y / prevHeight * GameInstance().height;
        // this.width = this.width / prevWidth * GameInstance().width;
        this.resizeWordWrapWidth();
        this.resizeFontSize();
    }
}