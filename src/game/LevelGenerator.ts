import { sound } from "@pixi/sound";
import { GameInstance } from ".";
import { CharacterObject } from "../gameobject/CharacterObject";
import { ItemObject } from "../gameobject/ItemObject";
import { ObstacleObject } from "../gameobject/ObstacleObject";
import * as PIXI from 'pixi.js';
import Level from './level.json';
import { GameScene } from "./scenes/Game";
import { TextCloudObject } from "../gameobject/TextCloudObject";
import { PopupWithDescriptionObject } from "../gameobject/UI/PopupWithDescriptionObject";

const GROUND_Y = 528;
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
    const interval = setInterval(() => {
        if (lastCoinIndex > Level.length - 1) {
            setTimeout(() => {
                clearInterval(interval);
                scene.app.finish();
            }, 5 * 1000);
        }
        if (scene.app.elapsed < Level[lastCoinIndex].t) {
            return;
        }
        if (Level[lastCoinIndex].itemType === 'item') {
            const key: string = Level[lastCoinIndex]['itemKey']!
            const {gallX, gallY} = Level[lastCoinIndex]['gallerySecretCoord']!;
            const v = Level[lastCoinIndex].v;
            const alt = Level[lastCoinIndex].y;
            const coin = ItemObject.spawn(800, alt, v, ItemTextures[key]);
            coin.hits(character, (coin, _character) => {
                localStorage.setItem(`secret${gallX}${gallY}`, 'true');
                scene.remove(coin);
                sound.play('sword_sound')
                const popup = new PopupWithDescriptionObject(
                    `preview-secret${gallX}${gallY}`,
                    0,
                    0,
                    'wow',
                    '우리 만나볼래요?',
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
        } else if (Level[lastCoinIndex].itemType === 'textCloud') {
            const y = Level[lastCoinIndex].y;
            const v = Level[lastCoinIndex].v;
            const text = Level[lastCoinIndex]['text']!;
            const textCloud = TextCloudObject.spawn(800, y, v, text)
            lastCoinIndex++;
            objects.push(textCloud);
            scene.add(textCloud);
        } else {
            const y = Level[lastCoinIndex].y;
            const v = Level[lastCoinIndex++].v;
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