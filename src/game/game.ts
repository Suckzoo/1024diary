import { PIXIScene } from "./scene";
import * as PIXI from "pixi.js";
import { AbstractGameObject } from "../gameobject/AbstractGameObject";
import { CharacterObject } from "../gameobject/CharacterObject";

export class PIXIGame {
    scene: PIXIScene;
    objects: AbstractGameObject[];
    constructor({
        documentBody,
        width,
        height
    }: {
        documentBody: HTMLElement,
        width: number,
        height: number
    }) {
        this.scene = new PIXIScene(documentBody, width, height);
        this.objects = [];
    }
    addObject(obj: AbstractGameObject) {
        this.scene.add(obj);
        this.objects.push(obj);
    }
    load() {
        // Character Object
        const character = new CharacterObject()
        this.addObject(character);
    }
    run() {
        let elapsed = 0.0;
        this.scene.app.ticker.add((delta: number) => {
            elapsed += delta;
            this.objects.forEach(object => {
                object.update(delta, elapsed);
            })
        });
    }
}