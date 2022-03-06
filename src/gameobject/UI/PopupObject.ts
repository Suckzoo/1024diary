import * as PIXI from "pixi.js";
import { GameInstance } from "../../game";
import { ContainerGameObject } from "../ContainerGameObject";
import { TextObject } from "../TextObject";
import { ButtonObject, TexturesOnEvent } from "./ButtonObject";
import { UISpriteObject } from "./UISpriteObject";

const INITIAL_WIDTH = 16;
const INITIAL_HEIGHT = 12;

type AddComponentCallback = (obj: PopupObject) => void;
type CloseCallback = () => void;

export class PopupObject extends ContainerGameObject {
    container: PIXI.Container;
    closeCallback: CloseCallback;
    id: string;
    constructor(id: string, addComponentCb: AddComponentCallback, cb: CloseCallback) {
        super();
        this.closeCallback = cb;
        this.container = new PIXI.Container();
        const graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(0, 0, GameInstance().width, GameInstance().height);
        graphics.endFill();
        const interval = setInterval(() => {
            if (this.width < 800) {
                this.width += INITIAL_WIDTH;
                this.height += INITIAL_HEIGHT;
                this.x = 400 - this.width / 2;
                this.y = 300 - this.height / 2;
            } else {
                clearInterval(interval);
                this.width = 800;
                this.height = 600;
                this.x = 0;
                this.y = 0;
                const closeButtonTextures: TexturesOnEvent = {
                    onUp: GameInstance().resources['x'].texture,
                    cancel: GameInstance().resources['x'].texture,
                    onHover: GameInstance().resources['x'].texture,
                    onDown: GameInstance().resources['x'].texture,
                }
                const closeButton = new ButtonObject(`${id}#close`, 750, 0, 50, 50, closeButtonTextures, {
                    onUp: () => { this.closeCallback() },
                    cancel: () => { },
                    onDown: () => { },
                    onHover: () => { }
                });
                this.add(closeButton);
                addComponentCb(this);
            }
        }, 10);
        this.container.addChild(graphics);
        
        this.x = 392;
        this.y = 294;
        this.width = 16;
        this.height = 12;
        this.rotation = 0;
        this.id = id;
    }
    stringify(): string {
        return this.id;
    }
    update(delta: number, _elapsed: number): void {}
}