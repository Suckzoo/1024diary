import { AABBCollidableObject } from "../../gameobject/AABBCollidableObject";
import { BackgroundHelperObject } from "../../gameobject/BackgroundHelperObject";
import { BackgroundObject } from "../../gameobject/BackgroundObject";
import { CharacterObject } from "../../gameobject/CharacterObject";
import { ButtonObject, TexturesOnEvent } from "../../gameobject/UI/ButtonObject";
import { GameInstance, PIXIApp } from "../App";
import { ObjectType } from "../level";
import { ReadLevelAndGenerate } from "../LevelGenerator";
import { AbstractScene } from "./Scene";
import { KeyboardEventHandler } from '../../eventhandlers/KeyboardEventHandler';
import { MixedParticleShowerSystem } from "../../gameobject/ParticleShowerSystem";

export class GameScene extends AbstractScene {
    mode: 'None' | 'Record' | 'Play' | 'RandomPlay' = 'None';
    bgQueue: BackgroundObject[] = [];
    activeObjects: ObjectType[] = [];
    character: CharacterObject;
    lastItemIndex: number;
    lastBgIndex: number;
    lastBgRepeat: number;
    status: 'playing' | 'waitCharacterToFinishLifecycle' | 'endroll' | 'finished';
    jumpButton: ButtonObject;
    particleSystem: MixedParticleShowerSystem | null = null;
    endRollSprite: BackgroundHelperObject;
    constructor(app: PIXIApp) {
        super(app);
        this.mode = 'Play';
        this.character = new CharacterObject()
        this.lastItemIndex = 0;
        this.lastBgIndex = 0;
        this.lastBgRepeat = 0;
        this.status = 'playing';
        const jumpButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['ui-button-jump'].texture,
            cancel: GameInstance().resources['ui-button-jump'].texture,
            onHover: GameInstance().resources['ui-button-jump'].texture,
            onDown: GameInstance().resources['ui-button-jump-pressed'].texture,
        }
        this.jumpButton = new ButtonObject('jumpbutton', 0, 500, 800, 100, jumpButtonTextures, {
            onUp: () => {},
            onDown: () => {
                this.character.jump();
            },
            onHover: () => {},
            cancel: () => {}
        });
        this.endRollSprite = new BackgroundHelperObject(
            'endroll',
            212,
            -236,
            376,
            236,
            0,
            4,
            GameInstance().resources['ui-ending'].texture
        )
        KeyboardEventHandler.down(' ', () => {
            this.jumpButton.invoke('onDown', null);
        })
        KeyboardEventHandler.up(' ', () => {
            this.jumpButton.invoke('onUp', null);
        })
    }
    load(): void {
        // Character Object
        this.add(this.character);
        this.add(this.jumpButton);

        this.app.resetElapsed();
        const {
            lastItemIndex: itemIdx,
            lastBgIndex: bgIdx,
            lastBgRepeat: bgRep,
        } = ReadLevelAndGenerate(this, this.lastItemIndex, this.lastBgIndex, this.lastBgRepeat);
        this.lastItemIndex = itemIdx;
        this.lastBgIndex = bgIdx;
        this.lastBgRepeat = bgRep;
    }
    addBackgroundParticle(particle: BackgroundObject): void {
        this.bgQueue.push(particle);
        this.add(particle);
    }
    freeze(): void {
        this.jumpButton.disable();
        this.character.freeze();
    }
    unfreeze(): void {
        this.jumpButton.enable();
        this.character.unfreeze();
    }
    startFinale() {
        this.character.preventJump();
        this.status = 'waitCharacterToFinishLifecycle';
    }
    update(delta: number, elapsed: number): void {
        if (this.app.paused) {
            return;
        }
        if (this.status === 'playing') {
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
            this.objects.forEach(object => {
                if (object instanceof AABBCollidableObject) {
                    object.checkCollision(delta, elapsed);
                }
            })
        } else if (this.status === 'waitCharacterToFinishLifecycle') {
            this.character.updateForFinale(delta, elapsed);
            if (this.character.isLifecycleDone()) {
                this.remove(this.character);
                const charStand = new BackgroundHelperObject(
                    'final-character',
                    400 - 172/2,
                    500 - 36 - 129,
                    172,
                    129,
                    0,
                    3,
                    GameInstance().resources['character-stand'].texture
                )
                this.add(charStand);
                this.add(this.endRollSprite);
                this.status = 'endroll';
                this.particleSystem = new MixedParticleShowerSystem(
                    this,
                    elapsed
                );
            }
        } else if (this.status === 'endroll') {
            this.particleSystem.update(delta, elapsed);
            if (this.endRollSprite.y < 80) {
                this.endRollSprite.y += delta * 1.5;
                if (this.endRollSprite.y > 80) {
                    this.endRollSprite.y = 80;
                    this.status = 'finished';
                }
            }
            //TODO
        } else {
            // this.status === finished
            // do nothing
            this.particleSystem.update(delta, elapsed);
        }
        this.container.children.sort((a, b) => {
            return (a.zIndex || 0) - (b.zIndex || 0);
        })
        
    }
}