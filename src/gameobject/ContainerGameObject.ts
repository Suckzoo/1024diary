import * as PIXI from "pixi.js";
import { GameInstance } from "../game";
import { GameObject } from "./GameObject";

export abstract class ContainerGameObject extends GameObject {
    abstract container: PIXI.Container;
    map: Map<string, GameObject>;
    constructor() {
        super();
        this.map = new Map<string, GameObject>();
    }
    add(obj: GameObject): void {
        this.map.set(obj.stringify(), obj);
        this.container.addChild(obj.PIXIObject)
    }
    removeById(id: string): void {
        const obj = this.map.get(id);
        if (!obj) return;
        this.map.delete(id);
        this.container.removeChild(obj.PIXIObject);
    }
    get PIXIObject(): PIXI.Container {
        return this.container;
    }
    get x() {
        return this.container.x / GameInstance().width * 800;
    }
    set x(x: number) {
        this.container.x = x / 800 * GameInstance().width;
    }
    get y() {
        return this.container.y / GameInstance().height * 600;
    }
    set y(y: number) {
        this.container.y = y / 600 * GameInstance().height;
    }
    get pivot() {
        return this.container.pivot;
    }
    set pivot(p) {
        p.x = p.x / 800 * GameInstance().width;
        p.y = p.y / 600 * GameInstance().height;
        this.container.pivot = p;
    }
    get width() {
        return this.container.width / GameInstance().width * 800;
    }
    set width(width: number) {
        this.container.width = width / 800 * GameInstance().width;
    }
    get height() {
        return this.container.height / GameInstance().height * 600;
    }
    set height(height: number) {
        this.container.height = height / 600 * GameInstance().height;
    }
    onScreenResize(prevWidth: number, prevHeight: number): void {
        this.x = this.x / prevWidth * GameInstance().width;
        this.y = this.y / prevHeight * GameInstance().height;
        // this.width = this.width / prevWidth * GameInstance().width;
        // this.height = this.height / prevHeight * GameInstance().height;
        this.map.forEach((obj: GameObject) => {
            obj.onScreenResize(prevWidth, prevHeight);
        })
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