import * as PIXI from "pixi.js"
import { GameObject } from "../gameobject/GameObject";
import { SpriteGameObject } from "../gameobject/SpriteGameObject";
import { TextObject } from "../gameobject/TextObject";
export class PIXIScene {
    app: PIXI.Application
    width: number;
    height: number;
    constructor(documentBody: any, width: number, height: number) {
        this.width = width;
        this.height = height;
        this.app = new PIXI.Application({width, height});
        documentBody.appendChild(this.app.view);
    }
    add(obj: GameObject) {
        this.app.stage.addChild(obj.PIXIObject);
    }
    remove(obj: GameObject) {
        this.app.stage.removeChild(obj.PIXIObject);
    }
};