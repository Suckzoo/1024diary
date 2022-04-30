import * as PIXI from "pixi.js";
import { UISpriteObject } from "./UISpriteObject";


export interface TexturesOnEvent {
    onUp: PIXI.Texture;
    onHover: PIXI.Texture;
    onDown: PIXI.Texture;
    cancel: PIXI.Texture;
};
type ButtonCallback = (btn: ButtonObject, eventType: keyof CallbacksOnEvent, event: any) => void;
export interface CallbacksOnEvent {
    onUp: ButtonCallback;
    onHover: ButtonCallback;
    onDown: ButtonCallback;
    cancel: ButtonCallback;
}

export class ButtonObject extends UISpriteObject {
    texturesOnEvent: TexturesOnEvent
    callbacksOnEvent: CallbacksOnEvent;
    id: string;
    constructor(id: string, initialX: number, initialY: number, width: number, height: number, texturesOnEvent: TexturesOnEvent, callbacksOnEvent: CallbacksOnEvent) {
        super(id, initialX, initialY, width, height, texturesOnEvent.onUp);
        this.texturesOnEvent = texturesOnEvent;
        this.callbacksOnEvent = callbacksOnEvent;
        this.sprite.buttonMode = true;
        this.sprite.interactive = true;
        this.sprite
            // set the mousedown and touchstart callback...
            .on('mousedown', this.decorate('onDown'))
            .on('touchstart', this.decorate('onDown'))

            // set the mouseup and touchend callback...
            .on('mouseup', this.decorate('onUp'))
            .on('touchend', this.decorate('onUp'))
            .on('mouseupoutside', this.decorate('cancel'))
            .on('touchendoutside', this.decorate('cancel'))

            // set the mouseover callback...
            .on('mouseover', this.decorate('onHover'))

            // set the mouseout callback...
            .on('mouseout', this.decorate('cancel'))
        this.sprite.zIndex = 10000;
    }
    decorate(fnKey: keyof CallbacksOnEvent): (e: any) => void {
        return (e: any) => {
            const fn = this.callbacksOnEvent[fnKey];
            fn(this, fnKey, e);
        }
    }
    stringify(): string {
        return this.id;
    }
    update(_delta: number, _elapsed: number): void {}
}