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
    level: number
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
                "bgKey": "graytile",
                "repeat": 1,
                "width": 1500,
                "level": 1
            },
            {
                "bgKey": "bg1",
                "repeat": 20,
                "width": 48,
                "level": 1
            },
            {
                "bgKey": "bg1-window",
                "repeat": 1,
                "width": 794,
                "level": 1
            },
            {
                "bgKey": "bg1",
                "repeat": 10,
                "width": 48,
                "level": 1
            },
            {
                "bgKey": "bg2",
                "repeat": 80,
                "width": 24,
                "level": 2
            },
            {
                "bgKey": "bg2",
                "repeat": 80,
                "width": 24,
                "level": 3
            },
            {
                "bgKey": "bg3",
                "repeat": 1,
                "width": 1707,
                "level": 4
            },
            {
                "bgKey": "bg4-bg",
                "repeat": 1600,
                "width": 14,
                "level": 5
            }
        ],
        "objectSequence": [],
        finaleXCoord: 0
    }
    const offset = Array.from(Array(5).keys()).map((_, i) => {
        const val = level.backgroundSequence.reduce((sum, bg) => sum + (bg.level === i ? bg.width * bg.repeat : 0), 0)
        return val;
    })
    for(let i = 1; i < 5; i++) {
        offset[i] = offset[i-1] + offset[i];
    }
    level.objectSequence = [
        {
            "x": offset[0] + 1200,
            "y": 0,
            "itemType": "backgroundHelper",
            "width": 800,
            "height": 500,
            "textureKey": "bg1-init",
            "zIndex": 1
        },
        {
            "x": offset[0] + 2060,
            "y": 0,
            "itemType": "backgroundHelper",
            "width": 1000,
            "height": 500,
            "textureKey": "bg1-outside",
            "zIndex": -10000,
            "v": 5
        },
        {
            "x": offset[1] - 60,
            "y": 155,
            "itemType": "backgroundHelper",
            "width": 245,
            "height": 345,
            "textureKey": "pot",
            "zIndex": 1000,
            "v": 6.7
        },
        {
            "x": offset[1] + 200,
            "y": 30,
            "itemType": "backgroundHelper",
            "width": 248,
            "height": 161,
            "textureKey": "bg2-neon1"
        },
        {
            "x": offset[1] + 500,
            "y": 0,
            "itemType": "backgroundHelper",
            "width": 1278,
            "height": 500,
            "zIndex": 2,
            "textureKey": "bg2-lingo"
        },
        {
            "x": offset[1] + 900,
            "y": 100,
            "itemType": "backgroundHelper",
            "width": 185,
            "height": 176,
            "textureKey": "bg2-neon2"
        },
        {
            "x": offset[1] + 1500,
            "y": 80,
            "itemType": "backgroundHelper",
            "width": 170,
            "height": 170,
            "textureKey": "bg2-neon3"
        },
        {
            "x": offset[2] + 0,
            "y": 100,
            "itemType": "backgroundHelper",
            "width": 167,
            "height": 273,
            "textureKey": "bg2-neon4"
        },
        {
            "x": offset[2] + 300,
            "y": 0,
            "itemType": "backgroundHelper",
            "width": 1185,
            "height": 500,
            "textureKey": "bg2-tot"
        },
        {
            "x": offset[3] - 60,
            "y": 155,
            "itemType": "backgroundHelper",
            "width": 245,
            "height": 345,
            "textureKey": "pot",
            "zIndex": 1000,
            "v": 6.7
        },
        {
            "x": offset[4] - 100,
            "y": 0,
            "itemType": "backgroundHelper",
            "width": 208,
            "height": 500,
            "textureKey": "bg4-door1",
        },
        {
            "x": offset[4] - 100,
            "y": 0,
            "itemType": "backgroundHelper",
            "width": 208,
            "height": 500,
            "textureKey": "bg4-door2",
            "zIndex": 1000
        },
        {
            "x": offset[4] + 100,
            "y": 0,
            "itemType": "backgroundHelper",
            "textureKey": "bg4-cloud",
            "width": 1238,
            "height": 328,
            "zIndex": 1,
            "v": 4.8
        },
        {
            "x": offset[4] + 100 + 1238 * 1.5 + 100,
            "y": 0,
            "itemType": "backgroundHelper",
            "textureKey": "bg4-cloud",
            "width": 1238,
            "height": 328,
            "zIndex": 1,
            "v": 4.8
        },
        {
            "x": offset[0] + 800,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "1024",
            "rewardTextureKey": "picture-1024",
            "rewardText": "2022??? 5??? 5?????? ????????? ?????? ??? 1024?????? ?????? ?????????, ????????? 17??? ?????? ????????????.\n?????? ???????????? ???????????? ????????? ????????? ????????? ????????????."
        },
        {
            "x": offset[0] + 2535,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "macbook",
            "rewardTextureKey": "picture-mac",
            "rewardText": "????????? ???????????? ??????????????? ?????? ????????? ???????????? ??????????????? ???????????? ???????????? ???????????????."
        },
        {
            "x": offset[1] + 650,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "lingo",
            "rewardTextureKey": "picture-lingo",
            "rewardText": "????????? ?????? ?????? ?????? ????????? ????????? ????????? ????????????,\n??????????????? 1?????? ???????????? ????????????."
        },
        {
            "x": offset[2] + 500,
            "y": 230.0,
            "itemType": "item",
            "itemKey": "music",
            "rewardTextureKey": "picture-music",
            "rewardText": "????????? ????????? ?????? ????????????! \n?????? ????????? ???????????? ?????? ???????????? ????????? ?????? ???????????? ??????."
        },
        {
            "x": offset[2] + 1600,
            "y": 160.0,
            "itemType": "item",
            "itemKey": "taiko",
            "rewardTextureKey": "picture-taiko",
            "rewardText": "??????????????? ??????????????? ?????? ????????????,\n???????????? ??????????????? ???????????? ????????? ?????? ????????? ?????? ?????????."
        },
        {
            "x": offset[3] + 450,
            "y": 310.0,
            "itemType": "item",
            "itemKey": "sushi",
            "rewardTextureKey": "picture-sushi",
            "rewardText": "?????? ????????? ?????? ????????? ???????????? ??????,"
        },
        {
            "x": offset[3] + 1200,
            "y": 310.0,
            "itemType": "item",
            "itemKey": "kousei",
            "rewardTextureKey": "picture-kousei",
            "rewardText": "?????? ????????? ?????? ????????? ????????? ???????????? ?????????."
        },
        {
            "x": offset[4] + 800,
            "y": 180.0,
            "itemType": "item",
            "itemKey": "ring",
            "rewardTextureKey": "picture-ring",
            "rewardText": "????????? 512?????? ?????? ??????, \n????????? ????????? ??????????????? ??????????????????."
        },
        {
            "x": offset[4] + 1500,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "cat",
            "rewardTextureKey": "picture-cat",
            "rewardText": "?????? ????????? 1????????? ???????????? ???????????? ??????, \n?????? ????????? 2????????? ????????? ????????? ?????????."
        },
        {
            "x": offset[4] + 2100,
            "y": 250.0,
            "itemType": "item",
            "itemKey": "heart",
            "rewardTextureKey": "picture-heart",
            "rewardText": "2022??? 5??? 22???, ???????????????! \n???????????? ????????? ???????????? ????????? ?????? ????????? ?????????. ???????????????!"
        },
    ]
    //generator for stage 4
    level.objectSequence.push()
    const n = 5;
    let maxx = 0;
    for(let i = 0; i < n; i++) {
        const frag: ObjectSequence = {
            "x": offset[4] + 448 * i - (20 * i),
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