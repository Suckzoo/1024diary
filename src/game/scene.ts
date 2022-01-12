import * as PIXI from "pixi.js"
import { AbstractGameObject } from "../gameobject/AbstractGameObject";
export class PIXIScene {
    app: PIXI.Application
    constructor(documentBody: any, width: number, height: number) {
        this.app = new PIXI.Application({width, height});
        documentBody.appendChild(this.app.view);
    }
    add(obj: AbstractGameObject) {
        this.app.stage.addChild(obj.sprite);
    }
};