import { CharacterObject } from "../gameobject/CharacterObject";
import { ItemObject } from "../gameobject/ItemObject";
import { ObstacleObject } from "../gameobject/ObstacleObject";
import { PIXIApp } from "./App";
import Level from './level.json';
import { GameScene } from "./scenes/Game";

const GROUND_Y = 528;
const OBSTACLE_HEIGHT_DEFAULT = 64;
const OBSTACLE_HEIGHT_DOUBLE = 128;

function RandomlyGenerateLevel(scene: GameScene, character: CharacterObject): void {
    const coins = [];
    setInterval(() => {
        const coin = new ItemObject(scene.app.width, 424 - 128 * Math.random());
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
        if (Level[lastCoinIndex].itemType === 'coin') {
            const coin = ItemObject.spawn(scene.app.width, Level[lastCoinIndex++].y);
            coin.hits(character, (coin, _character) => {
                scene.remove(coin);
            })
            objects.push(coin);
            scene.add(coin);
        } else {
            const y = Level[lastCoinIndex].y;
            const v = Level[lastCoinIndex++].v;
            const obstacle = ObstacleObject.spawn(scene.app.width, y, 32, (GROUND_Y - y) * 2, v);
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