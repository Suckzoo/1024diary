import { sound } from "@pixi/sound";
import { GameInstance } from ".";
import { CharacterObject } from "../gameobject/CharacterObject";
import { ItemObject } from "../gameobject/ItemObject";
import { ObstacleObject } from "../gameobject/ObstacleObject";
import * as PIXI from 'pixi.js';
import Level from './level.json';
import { GameScene } from "./scenes/Game";
import { TextCloudObject } from "../gameobject/TextCloudObject";
import { PopupObject } from "../gameobject/UI/PopupObject";
import { BackgroundObject } from "../gameobject/BackgroundObject";
import { v4 as uuidv4 } from 'uuid';
import { UISpriteObject } from "../gameobject/UI/UISpriteObject";
import { TextObject } from "../gameobject/TextObject";

const GROUND_Y = 499;
const OBSTACLE_HEIGHT_DEFAULT = 64;
const OBSTACLE_HEIGHT_DOUBLE = 128;

function RandomlyGenerateLevel(scene: GameScene, character: CharacterObject): void {
    const coins = [];
    setInterval(() => {
        const coin = new ItemObject(800, 424 - 128 * Math.random(), 10, [
            GameInstance().resources['admit'].texture
        ]);
        coin.hits(character, (coin, _character) => {
            scene.remove(coin);
        })
        coins.push(coin);
        scene.add(coin);
        coins.forEach((coin, index) => {
            if (coin.isDisposable()) {
                scene.remove(coin);
                coins.splice(index, 1);
            }
        })
    }, 100)
}


function ReadLevelAndGenerate(scene: GameScene, character: CharacterObject): void {
    const ItemTextures = GameInstance().ItemTextures;
    
    const objects = [];
    let lastCoinIndex = 0;
    let lastBgIndex = 0;
    let lastRepeat = 0;
    let gameFinished = false;
    const interval = setInterval(() => {
        if (scene.app.paused) {
            return;
        }
        const bgSeq = Level.backgroundSequence;
        if (lastBgIndex === bgSeq.length) {
            if (!gameFinished) {
                gameFinished = true;
                clearInterval(interval);
                scene.app.finish();
            }
        }
        const disposable = scene.bgQueue.filter(bg => bg.isDisposable());
        scene.bgQueue.splice(0, disposable.length);
        disposable.forEach(bg => {
            scene.remove(bg);
        })
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
            lastRepeat++;
            if (lastRepeat === bgSeq[lastBgIndex].repeat) {
                lastBgIndex++;
                lastRepeat = 0;
            }
        }
        let widthSum = scene.bgQueue.reduce((sum, bg) => sum + bg.width, 0);
        while (scene.bgQueue[0].x + widthSum < 850) {
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
            lastRepeat++;
            if (lastRepeat === bgSeq[lastBgIndex].repeat) {
                lastBgIndex++;
                lastRepeat = 0;
            }
        }
        const objSeq = Level.objectSequence;
        if (lastCoinIndex < objSeq.length && scene.app.elapsed >= objSeq[lastCoinIndex].t) {
            if (objSeq[lastCoinIndex].itemType === 'item') {
                const key: string = objSeq[lastCoinIndex]['itemKey']!
                const { x: gallX, y: gallY } = objSeq[lastCoinIndex]['gallerySecretCoord']!;
                const v = objSeq[lastCoinIndex].v;
                const alt = objSeq[lastCoinIndex].y;
                const coin = ItemObject.spawn(800, alt, v, ItemTextures[key]);
                coin.hits(character, (coin, _character) => {
                    localStorage.setItem(`secret${gallX}${gallY}`, 'true');
                    scene.remove(coin);
                    sound.play('pickup_sound')
                    const popup = new PopupObject(
                        `preview-secret${gallX}${gallY}`,
                        (container: PopupObject) => {
                            const pictureObj = new UISpriteObject(`${container.id}#pics`, 100, 100, 600, 400, GameInstance().resources['wow'].texture);
                            container.add(pictureObj);
                            const descriptionObj = new TextObject(100, 550, `${container.id}#description`, '와우! 예아!', new PIXI.TextStyle({
                                fontFamily: 'neodgm',
                                fontSize: 20
                            }));
                            container.add(descriptionObj);
                        },
                        () => {
                            scene.removeById(`preview-secret${gallX}${gallY}`);
                            scene.app.resumeTimer();
                        }
                    );
                    scene.add(popup);
                    scene.app.stopTimer();
                })
                objects.push(coin);
                scene.add(coin);
                lastCoinIndex++;
            } else if (objSeq[lastCoinIndex].itemType === 'textCloud') {
                // const y = objSeq[lastCoinIndex].y;
                // const v = objSeq[lastCoinIndex].v;
                // const text = objSeq[lastCoinIndex].text!;
                // const textCloud = TextCloudObject.spawn(800, y, v, text)
                // lastCoinIndex++;
                // objects.push(textCloud);
                // scene.add(textCloud);
            } else {
                const y = objSeq[lastCoinIndex].y;
                const v = objSeq[lastCoinIndex++].v;
                const obstacle = ObstacleObject.spawn(800, y, 32, (GROUND_Y - y) * 2, v);
                obstacle.hits(character, (obstacle, _character) => {
                    scene.app.over();
                })
                objects.push(obstacle);
                scene.add(obstacle);
            }
            objects.forEach((coin, index) => {
                if (coin.isDisposable()) {
                    scene.remove(coin);
                    objects.splice(index, 1);
                }
            })
        }
        
    }, 100)
}

type ObjectType = 'obstacle' | 'item';
interface Trace {
    t: number;
    y: number;
    v: number;
    itemType: ObjectType;
}
function RecordLevel(scene: GameScene, _character: CharacterObject) {
    const obstacleTraces: Trace[] = [];

    const recordEnds = new Date().getTime() + 1000 * 60 * 2;
    const interval = setInterval(() => {
        const now = new Date().getTime();
        if (now > recordEnds) {
            clearInterval(interval);
            console.log(JSON.stringify(obstacleTraces, null, 4));
            alert('Record done!');
        }
        if (scene.app.elapsed < 2.0) return;
        if (Math.random() < 0.1) {
            let h = OBSTACLE_HEIGHT_DEFAULT / 2;
            if (Math.random() < 0.3) {
                h = OBSTACLE_HEIGHT_DOUBLE / 2;
            }
            obstacleTraces.push({
                t: scene.app.elapsed,
                y: GROUND_Y - h,
                v: 10 + 10 * Math.random(),
                itemType: 'obstacle'
            });
        }
    }, 100);
}

export function LevelGenerator(game: GameScene, character: CharacterObject): void {
    if (game.mode === 'Record') {
        RecordLevel(game, character);
    } else if(game.mode === 'Play') {
        ReadLevelAndGenerate(game, character);
    } else {
        RandomlyGenerateLevel(game, character);
    }
}