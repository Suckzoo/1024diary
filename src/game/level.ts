import { BackgroundHelperObject } from "../gameobject/BackgroundHelperObject";
import { ItemObject } from "../gameobject/ItemObject";
import { ObstacleObject } from "../gameobject/ObstacleObject";
import { TextCloudObject } from "../gameobject/TextCloudObject";

export type ObjectType = ObstacleObject | ItemObject | BackgroundHelperObject | TextCloudObject;
export type ObjectTypeKey = 'obstacle' | 'item' | 'backgroundHelper' | 'textCloud';

export interface BackgroundSequence {
    bgKey: string
    repeat: number
    width: number
};

export interface ObjectSequence {
    x: number,
    y: number,
    v?: number,
    width?: number,
    height?: number,
    zIndex?: number,
    text?: string,
    textureKey?: string,
    itemType: ObjectTypeKey,
    itemKey?: string,
    gallerySecretCoord?: {
        x: number,
        y: number
    }
};

export interface Sequence {
    backgroundSequence: BackgroundSequence[],
    objectSequence: ObjectSequence[]
}

const level: Sequence = {
    "backgroundSequence": [
        {
            "bgKey": "bg1-init",
            "repeat": 1,
            "width": 800
        },
        {
            "bgKey": "bg1",
            "repeat": 10,
            "width": 48
        },
        {
            "bgKey": "bg1-window",
            "repeat": 1,
            "width": 794
        },
        {
            "bgKey": "bg1",
            "repeat": 10,
            "width": 48
        },
        {
            "bgKey": "bg2",
            "repeat": 100,
            "width": 48
        }
    ],
    "objectSequence": [
        {
            "x": 1500,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "macbook",
            "gallerySecretCoord": {
                "x": 0,
                "y": 0
            }
        },
        {
            "x": 2431,
            "y": 225,
            "itemType": "backgroundHelper",
            "width": 245,
            "height": 345,
            "textureKey": "pot",
            "zIndex": 1000,
        },
        {
            "x": 2700,
            "y": 30,
            "itemType": "backgroundHelper",
            "width": 248,
            "height": 161,
            "textureKey": "bg2-neon1"
        },
        {
            "x": 3107,
            "y": 100,
            "itemType": "backgroundHelper",
            "width": 185,
            "height": 176,
            "textureKey": "bg2-neon2"
        },
        {
            "x": 3200,
            "y": 0,
            "itemType": "backgroundHelper",
            "width": 1278,
            "height": 500,
            "zIndex": 2,
            "textureKey": "bg2-lingo"
        },
        {
            "x": 3700,
            "y": 80,
            "itemType": "backgroundHelper",
            "width": 170,
            "height": 170,
            "textureKey": "bg2-neon3"
        },
        {
            "x": 4478,
            "y": 100,
            "itemType": "backgroundHelper",
            "width": 167,
            "height": 273,
            "textureKey": "bg2-neon4"
        },
        {
            "x": 3000,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "lingo",
            "gallerySecretCoord": {
                "x": 1,
                "y": 0
            }
        },
        {
            "x": 4500,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "ring",
            "gallerySecretCoord": {
                "x": 2,
                "y": 0
            }
        }
    ]
}
level.objectSequence.sort((a, b) => a.x - b.x)
export const Level = level;