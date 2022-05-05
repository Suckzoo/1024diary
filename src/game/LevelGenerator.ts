import { sound } from "@pixi/sound";
import { GameInstance } from ".";
import { CharacterObject } from "../gameobject/CharacterObject";
import { ItemObject } from "../gameobject/ItemObject";
import { ObstacleObject } from "../gameobject/ObstacleObject";
import * as PIXI from 'pixi.js';
import { BackgroundSequence, Level, ObjectSequence } from './level';
import { GameScene } from "./scenes/Game";
import { TextCloudObject } from "../gameobject/TextCloudObject";
import { PopupObject } from "../gameobject/UI/PopupObject";
import { BackgroundObject, BACKGROUND_VELOCITY } from "../gameobject/BackgroundObject";
import { v4 as uuidv4 } from 'uuid';
import { UISpriteObject } from "../gameobject/UI/UISpriteObject";
import { TextObject } from "../gameobject/TextObject";
import { BackgroundHelperObject } from "../gameobject/BackgroundHelperObject";

const GROUND_Y = 499;
const OBSTACLE_HEIGHT_DEFAULT = 64;
const OBSTACLE_HEIGHT_DOUBLE = 128;



function isGameFinished(
    scene: GameScene,
): boolean {
    const X = scene.app.elapsed * BACKGROUND_VELOCITY;
    return X >= Level.finaleXCoord;
}

function disposeOldBackgroundFragments(
    scene: GameScene
): void {
    const disposable = scene.bgQueue.filter(bg => bg.isDisposable());
    scene.bgQueue.splice(0, disposable.length);
    disposable.forEach(bg => {
        scene.remove(bg);
    })
}

function generateBackgroundFragments(
    scene: GameScene,
    bgSeq: BackgroundSequence[],
    lastBgIndex: number,
    lastBgRepeat: number
): { lastBgIndex: number, lastBgRepeat: number } {
    if (scene.bgQueue.length === 0) {
        const bgKey = bgSeq[lastBgIndex].bgKey;
        const bgParticle = new BackgroundObject(
            `bg-${bgKey}-${uuidv4()}`,
            bgKey,
            0,
            bgSeq[lastBgIndex].width,
            500,
        )
        scene.addBackgroundParticle(bgParticle);
        lastBgRepeat++;
        if (lastBgRepeat === bgSeq[lastBgIndex].repeat) {
            lastBgIndex++;
            lastBgRepeat = 0;
        }
    }
    let widthSum = scene.bgQueue.reduce((sum, bg) => sum + bg.width, 0);
    while (lastBgIndex < bgSeq.length && scene.bgQueue[0].x + widthSum < 850) {
        const shiftX = 850 - (scene.bgQueue[0].x + widthSum);
        const bgParticle = new BackgroundObject(
            `bg-${bgSeq[lastBgIndex].bgKey}-${uuidv4()}`,
            bgSeq[lastBgIndex].bgKey,
            850 - shiftX,
            bgSeq[lastBgIndex].width,
            500
        )
        scene.addBackgroundParticle(bgParticle);
        widthSum += bgSeq[lastBgIndex].width;
        lastBgRepeat++;
        if (lastBgRepeat === bgSeq[lastBgIndex].repeat) {
            lastBgIndex++;
            lastBgRepeat = 0;
        }
    }
    return {
        lastBgIndex,
        lastBgRepeat,
    }
}


function spawnObjects(
    scene: GameScene,
    objSeq: ObjectSequence[],
    lastItemIndex: number
) {
    const ItemTextures = GameInstance().ItemTextures;
    const character = scene.character;
    const X = scene.app.elapsed * BACKGROUND_VELOCITY > Level.finaleXCoord ? Level.finaleXCoord : scene.app.elapsed * BACKGROUND_VELOCITY;
    while (lastItemIndex < objSeq.length && objSeq[lastItemIndex].x - X < 850) {
        const initX = objSeq[lastItemIndex].x - X;
        if (objSeq[lastItemIndex].itemType === 'item') {
            const key: string = objSeq[lastItemIndex].itemKey!
            const rewardTextureKey: string = objSeq[lastItemIndex].rewardTextureKey!;
            const rewardText: string = objSeq[lastItemIndex].rewardText!;
            const v = objSeq[lastItemIndex].v || BACKGROUND_VELOCITY;
            const alt = objSeq[lastItemIndex].y;
            const coin = ItemObject.spawn(initX, alt, v, ItemTextures[key]);
            coin.hits(character, (coin, _character) => {
                scene.freeze();
                scene.remove(coin);
                sound.play('pickup_sound')
                const popup = new PopupObject(
                    `preview-secret-${key}`,
                    (container: PopupObject) => {
                        const pictureObj = new UISpriteObject(`${container.id}#pics`, 70, 70, 660, 340, GameInstance().resources[rewardTextureKey].texture);
                        container.add(pictureObj);
                        const descriptionObj = new TextObject(100, 440, 600, `${container.id}#description`, rewardText, 22);
                        container.add(descriptionObj);
                    },
                    () => {
                        scene.unfreeze();
                        scene.removeById(`preview-secret-${key}`);
                        scene.app.resumeTimer();
                    }
                );
                scene.add(popup);
                scene.app.stopTimer();
            })
            scene.activeObjects.push(coin);
            scene.add(coin);
        } else if (objSeq[lastItemIndex].itemType === 'backgroundHelper') {
            const bgHelper = new BackgroundHelperObject(
                `bg-helper-${lastItemIndex}`,
                initX,
                objSeq[lastItemIndex].y,
                objSeq[lastItemIndex].width,
                objSeq[lastItemIndex].height,
                objSeq[lastItemIndex].v || BACKGROUND_VELOCITY,
                objSeq[lastItemIndex].zIndex || 0,
                GameInstance().resources[objSeq[lastItemIndex].textureKey!].texture
            )
            scene.activeObjects.push(bgHelper);
            scene.add(bgHelper);
        } else if (objSeq[lastItemIndex].itemType === 'textCloud') {
            const y = objSeq[lastItemIndex].y;
            const v = objSeq[lastItemIndex].v;
            const text = objSeq[lastItemIndex].text!;
            const textCloud = TextCloudObject.spawn(initX, y, v, text)
            scene.activeObjects.push(textCloud);
            scene.add(textCloud);
        } else {
            const y = objSeq[lastItemIndex].y;
            const v = objSeq[lastItemIndex].v;
            const obstacle = ObstacleObject.spawn(initX, y, 32, (GROUND_Y - y) * 2, v);
            obstacle.hits(character, (obstacle, _character) => {
                scene.app.over();
            })
            scene.activeObjects.push(obstacle);
            scene.add(obstacle);
        }
        lastItemIndex++;
    }
    scene.activeObjects.forEach((coin, index) => {
        if (coin.isDisposable()) {
            scene.remove(coin);
            scene.activeObjects.splice(index, 1);
        }
    })
    return lastItemIndex;
}


export function ReadLevelAndGenerate(
    scene: GameScene,
    lastItemIndex: number,
    lastBgIndex: number,
    lastBgRepeat: number
): {
    lastItemIndex: number,
    lastBgIndex: number,
    lastBgRepeat: number,
} {
    const bgSeq = Level.backgroundSequence;
    const objSeq = Level.objectSequence as unknown as ObjectSequence[];
    let { lastBgIndex: idx, lastBgRepeat: rep } = generateBackgroundFragments(
        scene,
        bgSeq,
        lastBgIndex,
        lastBgRepeat
    )
    disposeOldBackgroundFragments(scene);
    if (lastItemIndex < objSeq.length) {
        lastItemIndex = spawnObjects(
            scene,
            objSeq,
            lastItemIndex
        )
    } 
    if (isGameFinished(scene)) {
        scene.startFinale();
    }
    return {
        lastItemIndex,
        lastBgIndex: idx,
        lastBgRepeat: rep,
    }
}
