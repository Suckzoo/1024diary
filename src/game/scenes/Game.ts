import { AABBCollidableObject } from "../../gameobject/AABBCollidableObject";
import { BackgroundObject } from "../../gameobject/BackgroundObject";
import { CharacterObject } from "../../gameobject/CharacterObject";
import { PIXIApp } from "../App";
import { LevelGenerator } from "../LevelGenerator";
import { AbstractScene } from "./Scene";

export class GameScene extends AbstractScene {
    mode: 'None' | 'Record' | 'Play' | 'RandomPlay' = 'None';
    constructor(app: PIXIApp) {
        super(app);
        this.mode = 'Play';
    }
    load(): void {
        const background1 = new BackgroundObject('background1', 0, this.app.width, this.app.height);
        this.add(background1);
        const background2 = new BackgroundObject('background2', this.app.width, this.app.width, this.app.height);
        this.add(background2);

        // Character Object
        const character = new CharacterObject()
        this.add(character);

        this.app.resetElapsed();
        LevelGenerator(this, character);
    }
    update(delta: number, elapsed: number): void {
        this.objects.forEach(object => {
            object.update(delta, elapsed);
        })
        this.objects.forEach(object => {
            if (object instanceof AABBCollidableObject) {
                object.checkCollision(delta, elapsed);
            }
        })
    }
}