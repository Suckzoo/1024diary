import * as PIXI from "pixi.js";
import { GameObject } from "./GameObject";

export abstract class ContainerGameObject extends GameObject {
    spriteURI: string;
    abstract container: PIXI.Container;
    constructor() {
        super();
    }
    get PIXIObject(): PIXI.Container {
        return this.container;
    }
    get x() {
        return this.container.x;
    }
    set x(x: number) {
        this.container.x = x;
    }
    get y() {
        return this.container.y;
    }
    set y(y: number) {
        this.container.y = y;
    }
    get pivot() {
        return this.container.pivot;
    }
    set pivot(p) {
        this.container.pivot = p;
    }
    get width() {
        return this.container.width;
    }
    set width(width: number) {
        this.container.width = width;
    }
    get height() {
        return this.container.height;
    }
    set height(height: number) {
        this.container.height = height;
    }
    get rotation() {
        return this.container.rotation;
    }
    set rotation(rotation: number) {
        this.container.rotation = rotation;
    }
    scale(scaleX, scaleY) {
        this.container.scale.x = scaleX;
        this.container.scale.y = scaleY;
    }
}