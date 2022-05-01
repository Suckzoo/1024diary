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
    rewardTextureKey?: string,
    rewardText?: string
};

export interface Sequence {
    backgroundSequence: BackgroundSequence[],
    objectSequence: ObjectSequence[],
    finaleXCoord: number
}

function LevelSequence() {
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
                "repeat": 80,
                "width": 48
            },
            {
                "bgKey": "bg3",
                "repeat": 1,
                "width": 1707
            }
        ],
        "objectSequence": [
            {
                "x": 1500,
                "y": 300.0,
                "itemType": "item",
                "itemKey": "macbook",
                "rewardTextureKey": "picture-frame-mock",
                "rewardText": "링고링고링"
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
                "x": 6271,
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
                "x": 4900,
                "y": 100,
                "itemType": "backgroundHelper",
                "width": 167,
                "height": 273,
                "textureKey": "bg2-neon4"
            },
            {
                "x": 5100,
                "y": 0,
                "itemType": "backgroundHelper",
                "width": 1185,
                "height": 500,
                "textureKey": "bg2-tot"
            },
            {
                "x": 3000,
                "y": 300.0,
                "itemType": "item",
                "itemKey": "lingo",
                "rewardTextureKey": "picture-frame-mock",
                "rewardText": "링고링고링"
            },
            {
                "x": 4500,
                "y": 300.0,
                "itemType": "item",
                "itemKey": "ring",
                "rewardTextureKey": "picture-frame-mock",
                "rewardText": "티파티파니"
            },
            {
                "x": 4700,
                "y": 300.0,
                "itemType": "item",
                "itemKey": "music",
                "rewardTextureKey": "picture-frame-mock",
                "rewardText": "크레이지셔플"
            },
            {
                "x": 4900,
                "y": 300.0,
                "itemType": "item",
                "itemKey": "taiko",
                "rewardTextureKey": "picture-frame-mock",
                "rewardText": "혐듬겜극혐"
            },
            {
                "x": 5100,
                "y": 300.0,
                "itemType": "item",
                "itemKey": "cat",
                "rewardTextureKey": "picture-frame-mock",
                "rewardText": "고양고양이"
            },
            {
                "x": 7247,
                "y": 300.0,
                "itemType": "item",
                "itemKey": "sushi",
                "rewardTextureKey": "picture-frame-mock",
                "rewardText": "카메존맛"
            },
            {
                "x": 8101,
                "y": 0,
                "itemType": "backgroundHelper",
                "textureKey": "bg4-cloud",
                "width": 1238,
                "height": 328,
                "zIndex": 1,
                "v": 3
            },
            {
                "x": 8101 + 1238 * 2 + 100,
                "y": 0,
                "itemType": "backgroundHelper",
                "textureKey": "bg4-cloud",
                "width": 1238,
                "height": 328,
                "zIndex": 1,
                "v": 3
            },
        ],
        finaleXCoord: 0
    }
    //generator for stage 1
    for(let i = 0; i < 17; i++) {
        level.objectSequence.push({
            "x": 800 - 48 * (i + 1),
            "y": 0,
            "itemType": "backgroundHelper",
            "textureKey": "bg1",
            "width": 48,
            "height": 500,
            "zIndex": -10000
        })
    }
    //generator for stage 4
    const widthSum = level.backgroundSequence.reduce((acc, cur) => acc + cur.width * cur.repeat, 0);
    level.backgroundSequence.push({
        "bgKey": "bg4-bg",
        "repeat": 1000,
        "width": 14
    })
    level.objectSequence.push({
        "x": widthSum - 120,
        "y": 225,
        "itemType": "backgroundHelper",
        "width": 245,
        "height": 345,
        "textureKey": "pot",
        "zIndex": 1000
    })
    const n = 10;
    let maxx = 0;
    for(let i = 0; i < n; i++) {
        const frag: ObjectSequence = {
            "x": widthSum + 448 * i - (20 * i),
            "y": 292,
            "itemType": "backgroundHelper",
            "width": 448,
            "height": 208,
            "zIndex": 2,
            "textureKey": "bg4-bgflowers"
        }
        level.objectSequence.push(frag);
        maxx = frag.x;
    }
    const stageX = maxx + 448 - 20;
    level.objectSequence.push({
        "x": stageX,
        "y": 500 - 376,
        "itemType": "backgroundHelper",
        "width": 1260,
        "height": 376,
        "zIndex": 2,
        "textureKey": "bg-final"
    })
    level.finaleXCoord = stageX + (1260 / 2) - 400;
    level.objectSequence.sort((a, b) => a.x - b.x)
    return level;
}
export const Level = LevelSequence();