import { SpriteGameObject } from "./SpriteGameObject";

type CollisionCallbackType = (source: AABBCollidableObject, obj: AABBCollidableObject) => void;

interface CollisionHandlerInterface {
    obj: AABBCollidableObject;
    hit: () => boolean;
    cb: CollisionCallbackType;
}

export abstract class AABBCollidableObject extends SpriteGameObject{
    collisionHandlers: CollisionHandlerInterface[] = []
    constructor() {
        super();
    }
    hits(obj: AABBCollidableObject, cb: CollisionCallbackType): void {
        const handler: CollisionHandlerInterface = {
            obj,
            hit: () => {
                const objAABB = obj.getAABB();
                const thisAABB = this.getAABB();
                return !(objAABB.right < thisAABB.left ||
                    objAABB.left > thisAABB.right ||
                    objAABB.bottom < thisAABB.top ||
                    objAABB.top > thisAABB.bottom);
            },
            cb
        }
        this.collisionHandlers.push(handler)
    }
    checkCollision(_delta: number, _elapsed: number): void {
        this.collisionHandlers.forEach(handler => {
            if (handler.hit()) {
                handler.cb(this, handler.obj);
            }
        })
    }
    getAABB() {
        return {
            left: this.x,
            right: this.x + this.width,
            top: this.y,
            bottom: this.y + this.height
        };
    }
}