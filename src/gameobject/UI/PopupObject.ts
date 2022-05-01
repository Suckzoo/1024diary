import * as PIXI from "pixi.js";
import { GameInstance } from "../../game";
import { ContainerGameObject } from "../ContainerGameObject";
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
        const panel = new UISpriteObject(
            'panel',
            0,
            0,
            800,
            600,
            GameInstance().resources['ui-popup'].texture
        )
        this.add(panel);
        this.container.zIndex = 10001;
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
                    onUp: GameInstance().resources['ui-button-close'].texture,
                    cancel: GameInstance().resources['ui-button-close'].texture,
                    onHover: GameInstance().resources['ui-button-close'].texture,
                    onDown: GameInstance().resources['ui-button-close'].texture,
                }
                const closeButton = new ButtonObject(`${id}#close`, 710, 45, 45, 45, closeButtonTextures, {
                    onUp: () => { this.closeCallback() },
                    cancel: () => { },
                    onDown: () => { },
                    onHover: () => { }
                });
                this.add(closeButton);
                addComponentCb(this);
            }
        }, 10);
        
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