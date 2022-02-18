import * as PIXI from "pixi.js";
import { GameInstance } from "../../game";
import { ContainerGameObject } from "../ContainerGameObject";
import { TextObject } from "../TextObject";
import { ButtonObject, TexturesOnEvent } from "./ButtonObject";
import { UISpriteObject } from "./UISpriteObject";

const VELOCITY = 10;
const WIDTH = 800;
const HEIGHT = 600;

type CloseCallback = () => void;

export class PopupWithDescriptionObject extends ContainerGameObject {
    container: PIXI.Container;
    closeCallback: CloseCallback;
    id: string;
    constructor(id: string, initialX: number, initialY: number, picture: string, description: string, cb: CloseCallback) {
        super();
        this.closeCallback = cb;
        this.container = new PIXI.Container();
        var graphics = new PIXI.Graphics();
        graphics.beginFill(0xFFFFFF);
        graphics.drawRect(0, 0, WIDTH, HEIGHT);
        this.container.addChild(graphics);
        const pictureObj = new UISpriteObject(`${id}#pics`, 100, 100, 600, 400, GameInstance().resources[picture].texture);
        
        const closeButtonTextures: TexturesOnEvent = {
            onUp: GameInstance().resources['x'].texture,
            cancel: GameInstance().resources['x'].texture,
            onHover: GameInstance().resources['x'].texture,
            onDown: GameInstance().resources['x'].texture,
        }
        this.container.addChild(pictureObj.PIXIObject);
        const closeButton = new ButtonObject(`${id}#close`, 750, 50, 50, 50, closeButtonTextures, {
            onUp: () => { this.closeCallback() },
            cancel: () => {},
            onDown: () => {},
            onHover: () => {}
        });
        this.container.addChild(closeButton.PIXIObject);
        const descriptionObj = new TextObject(100, 550, `${id}#description`, description);
        this.container.addChild(descriptionObj.PIXIObject);
        this.x = initialX;
        this.y = initialY;
        this.width = WIDTH;
        this.height = HEIGHT;
        this.rotation = 0;
        this.id = id;
    }
    stringify(): string {
        return this.id;
    }
    update(delta: number, _elapsed: number): void {}
}