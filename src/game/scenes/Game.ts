import { AABBCollidableObject } from "../../gameobject/AABBCollidableObject";
import { BackgroundObject } from "../../gameobject/BackgroundObject";
import { CharacterObject } from "../../gameobject/CharacterObject";
import { ButtonObject, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { GameInstance, PIXIApp } from "../App";
import { ObjectType } from "../level";
import { ReadLevelAndGenerate } from "../LevelGenerator";
import { AbstractScene } from "./Scene";

export class GameScene extends AbstractScene {
    mode: 'None' | 'Record' | 'Play' | 'RandomPlay' = 'None';
    bgQueue: BackgroundObject[] = [];
    activeObjects: ObjectType[] = [];
    character: CharacterObject;
    lastItemIndex: number;
    lastBgIndex: number;
    lastBgRepeat: number;
    constructor(app: PIXIApp) {
        super(app);
        this.mode = 'Play';
        this.character = new CharacterObject()
        this.lastItemIndex = 0;
        this.lastBgIndex = 0;
        this.lastBgRepeat = 0;
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
        const {
            lastItemIndex: itemIdx,
            lastBgIndex: bgIdx,
            lastBgRepeat: bgRep
        } = ReadLevelAndGenerate(this, this.lastItemIndex, this.lastBgIndex, this.lastBgRepeat);
        this.lastItemIndex = itemIdx;
        this.lastBgIndex = bgIdx;
        this.lastBgRepeat = bgRep;
    }
    addBackgroundParticle(particle: BackgroundObject): void {
        this.bgQueue.push(particle);
        this.add(particle);
    }
    update(delta: number, elapsed: number): void {
        if (this.app.paused) {
            return;
        }
        const {
            lastItemIndex: itemIdx,
            lastBgIndex: bgIdx,
            lastBgRepeat: bgRep
        } = ReadLevelAndGenerate(this, this.lastItemIndex, this.lastBgIndex, this.lastBgRepeat);
        this.lastItemIndex = itemIdx;
        this.lastBgIndex = bgIdx;
        this.lastBgRepeat = bgRep;
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