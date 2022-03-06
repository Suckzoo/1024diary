import { AABBCollidableObject } from "../../gameobject/AABBCollidableObject";
import { BackgroundObject } from "../../gameobject/BackgroundObject";
import { CharacterObject } from "../../gameobject/CharacterObject";
import { ButtonObject, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { GameInstance, PIXIApp } from "../App";
import { LevelGenerator } from "../LevelGenerator";
import { AbstractScene } from "./Scene";

export class GameScene extends AbstractScene {
    mode: 'None' | 'Record' | 'Play' | 'RandomPlay' = 'None';
    bgQueue: BackgroundObject[] = [];
    character: CharacterObject;
    constructor(app: PIXIApp) {
        super(app);
        this.mode = 'Play';
        this.character = new CharacterObject()
    }
    load(): void {
        // Character Object
        this.add(this.character);

        const jumpButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['back'].texture,
            cancel: GameInstance().resources['back'].texture,
            onHover: GameInstance().resources['back'].texture,
            onDown: GameInstance().resources['back'].texture,
        }
        const jumpButton = new ButtonObject('jumpbutton', 600, 500, 200, 100, jumpButtonTextures, {
            onUp: () => {},
            onDown: () => {
                this.character.jump();
            },
            onHover: () => {},
            cancel: () => {}
        });
        this.add(jumpButton);

        this.app.resetElapsed();
        LevelGenerator(this, this.character);
    }
    addBackgroundParticle(particle: BackgroundObject): void {
        this.bgQueue.push(particle);
        this.add(particle);
    }
    update(delta: number, elapsed: number): void {
        if (this.app.paused) {
            return;
        }
        this.objects.forEach(object => {
            object.update(delta, elapsed);
        })
        this.container.children.sort((a, b) => {
            return (a.zIndex || 0) - (b.zIndex || 0);
        })
        this.objects.forEach(object => {
            if (object instanceof AABBCollidableObject) {
                object.checkCollision(delta, elapsed);
            }
        })
    }
}