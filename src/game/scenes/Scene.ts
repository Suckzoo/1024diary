import * as PIXI from "pixi.js";
import { GameObject } from "../../gameobject/GameObject";
import { PIXIApp } from "../App";


export abstract class AbstractScene {
    app: PIXIApp;
    container: PIXI.Container;
    objects: Map<string, GameObject>;
    constructor(app: PIXIApp) {
        this.app = app;
        this.container = new PIXI.Container();
        this.container.x = 0;
        this.container.y = 0;
        this.objects = new Map<string, GameObject>();
    }
    abstract load(): void;
    abstract update(delta: number, elapsed: number): void;
    add(obj: GameObject) {
        this.container.addChild(obj.PIXIObject);
        this.objects.set(obj.stringify(), obj);
    }
    remove(obj: GameObject) {
        this.container.removeChild(obj.PIXIObject);
        this.objects.delete(obj.stringify());
    }
    removeById(id: string) {
        const obj = this.objects.get(id);
        if (!obj) {
            throw new Error("Object with id " + id + " not found");
        }
        this.container.removeChild(obj.PIXIObject);
        this.objects.delete(id);
    }
    destroy(): void {
        this.container.destroy();
    }
}