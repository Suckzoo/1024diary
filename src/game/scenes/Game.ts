import { AABBCollidableObject } from "../../gameobject/AABBCollidableObject";
import { BackgroundObject } from "../../gameobject/BackgroundObject";
import { CharacterObject } from "../../gameobject/CharacterObject";
import { ButtonObject, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { GameInstance, PIXIApp } from "../App";
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

        const jumpButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['back'].texture,
            cancel: GameInstance().resources['back'].texture,
            onHover: GameInstance().resources['back'].texture,
            onDown: GameInstance().resources['back'].texture,
        }
        const jumpButton = new ButtonObject('jumpbutton', this.app.width - 200, this.app.height - 100, 200, 100, jumpButtonTextures, {
            onUp: () => {},
            onDown: () => {
                character.jump();
            },
            onHover: () => {},
            cancel: () => {}
        });
        this.add(jumpButton);

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