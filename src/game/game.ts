import { PIXIScene } from "./Scene";
import { CharacterObject } from "../gameobject/CharacterObject";
import { BackgroundObject } from "../gameobject/BackgroundObject";
import { AABBCollidableObject } from "../gameobject/AABBCollidableObject";
import { GameObject } from "../gameobject/GameObject";
import { TextObject } from "../gameobject/TextObject";
import { LevelGenerator } from "./LevelGenerator";

let Game: PIXIGame | null = null;
interface Modes {
    Record: boolean;
    Play: boolean;
    RandomPlay: boolean;
}
export class PIXIGame {
    mode: keyof Modes;
    scene: PIXIScene;
    objects: Map<string, GameObject>;
    elapsed: number;
    _score: number;
    highScore: number;
    scoreText: TextObject;
    remainingTimeText: TextObject;

    constructor({
        documentBody,
        width,
        height
    }: {
        documentBody: HTMLElement,
        width: number,
        height: number
    }) {
        this.mode = 'RandomPlay';
        // this.mode = 'Play';
        this.highScore = Number(localStorage.getItem('highScore')) || 0;
        this.scene = new PIXIScene(documentBody, width, height);
        this.objects = new Map<string, GameObject>();
        this.elapsed = 0.0;
        this.scoreText = new TextObject(0, 0, 'score', `Score: 0 / High Score: ${this.highScore}`);
        this.remainingTimeText = new TextObject(0, 0, 'remainingTime', `Remaining Time: 60`);
        this.score = 0;
    }
    addObject(obj: GameObject) {
        this.scene.add(obj);
        this.objects.set(obj.stringify(), obj);
    }
    removeObject(obj: GameObject) {
        this.scene.remove(obj);
        this.objects.delete(obj.stringify());
    }
    get score() {
        return this._score;
    }
    set score(score: number) {
        this._score = score;
        if (this.highScore < this._score) {
            this.highScore = this._score;
        }
        this.scoreText.text = `Score: ${score} / High Score: ${this.highScore}`;
    }
    updateScoreByDelta(delta: number) {
        this.score += delta; 
    }
    load() {
        const background1 = new BackgroundObject('background1', 0, this.scene.width, this.scene.height);
        this.addObject(background1);
        const background2 = new BackgroundObject('background2', this.scene.width, this.scene.width, this.scene.height);
        this.addObject(background2);

        this.addObject(this.scoreText);
        this.remainingTimeText.y = 60;
        this.addObject(this.remainingTimeText);

        // Character Object
        const character = new CharacterObject()
        this.addObject(character);

        LevelGenerator(this, character);
    }
    run() {
        this.scene.app.ticker.add((delta: number) => {
            this.elapsed += delta;
            this.objects.forEach(object => {
                object.update(delta, this.elapsed);
            })
            this.objects.forEach(object => {
                if (object instanceof AABBCollidableObject) {
                    object.checkCollision(delta, this.elapsed);
                }
            })
        });
    }
    finish() {
        if (this.highScore === this.score) {
            localStorage.setItem('highScore', this.highScore.toString());
            alert('high score!');
        }
    }
}
export function GameInstance(documentBody, width, height) {
    Game = new PIXIGame({
        documentBody,
        width,
        height,
    });
    Game.load();
    return Game;
}