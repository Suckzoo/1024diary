import { CharacterObject } from "../gameobject/CharacterObject";
import { ItemObject } from "../gameobject/ItemObject";
import { PIXIGame } from "./Game";
import Level from './level.json';

function RandomlyGenerateLevel(game, character: CharacterObject): void {
    const coins = [];
    setInterval(() => {
        const coin = new ItemObject(game.scene.width, 424 - 128 * Math.random());
        coin.hits(character, (coin, _character) => {
            game.updateScoreByDelta(10);
            game.removeObject(coin);
        })
        coins.push(coin);
        game.addObject(coin);
        coins.forEach((coin, index) => {
            if (coin.isDisposable()) {
                game.removeObject(coin);
                coins.splice(index, 1);
            }
        })
    }, 100)
}

function ReadLevelAndGenerate(game: PIXIGame, character: CharacterObject): void {
    const coins = [];
    let lastCoinIndex = 0;
    const interval = setInterval(() => {
        if (lastCoinIndex > Level.length - 1) {
            setTimeout(() => {
                clearInterval(interval);
                game.finish();
            }, 5 * 1000);
        }
        if (game.elapsed < Level[lastCoinIndex].t) {
            return;
        }
        const coin = new ItemObject(game.scene.width, Level[lastCoinIndex++].y);
        coin.hits(character, (coin, _character) => {
            game.updateScoreByDelta(10);
            game.removeObject(coin);
        })
        coins.push(coin);
        game.addObject(coin);
        coins.forEach((coin, index) => {
            if (coin.isDisposable()) {
                game.removeObject(coin);
                coins.splice(index, 1);
            }
        })
    }, 100)
}

type ItemType = 'coin' | 'memorial';
interface Trace {
    t: number;
    y: number;
    itemType: ItemType;
}
function RecordLevel(game: PIXIGame, character: CharacterObject) {
    const coinTraces: Trace[] = [];

    const recordEnds = new Date().getTime() + 1000 * 60 * 1;
    const interval = setInterval(() => {
        const now = new Date().getTime();
        game.remainingTimeText.text = `Remaining Record Time: ${(recordEnds - now) / 1000.0}s`;
        if (now > recordEnds) {
            clearInterval(interval);
            console.log(JSON.stringify(coinTraces, null, 4));
            alert('Record done!');
        }
        if (game.elapsed < 2.0) return;
        coinTraces.push({
            t: game.elapsed,
            y: character.y + character.height / 2,
            itemType: 'coin'
        });
    }, 100);
}

export function LevelGenerator(game: PIXIGame, character: CharacterObject): void {
    if (game.mode === 'Record') {
        RecordLevel(game, character);
    } else if(game.mode === 'Play') {
        ReadLevelAndGenerate(game, character);
    } else {
        RandomlyGenerateLevel(game, character);
    }
}