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
            "x": offset[1] - 122,
            "y": 155,
            "itemType": "backgroundHelper",
            "width": 245,
            "height": 345,
            "textureKey": "pot",
            "zIndex": 1000,
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
            "x": offset[3] - 122,
            "y": 155,
            "itemType": "backgroundHelper",
            "width": 245,
            "height": 345,
            "textureKey": "pot",
            "zIndex": 1000,
        },
        {
            "x": offset[4] - 122,
            "y": 155,
            "itemType": "backgroundHelper",
            "width": 245,
            "height": 345,
            "textureKey": "pot",
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
            "rewardText": "2022년 5월 5일은 저희가 만난 지 1024일이 되는 날이자, 결혼을 17일 앞둔 날입니다.\n이를 기념해서 지금까지 우리의 여정을 되돌아 보았어요."
        },
        {
            "x": offset[0] + 2535,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "macbook",
            "rewardTextureKey": "picture-mac",
            "rewardText": "저희는 알고리즘 스터디에서 함께 어려운 문제들을 풀어나가며 처음으로 친해지게 되었습니다."
        },
        {
            "x": offset[1] + 650,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "lingo",
            "rewardTextureKey": "picture-lingo",
            "rewardText": "그러다가 자주 가던 펍에서 서로의 마음을 확인했고,\n함께로서의 1일을 시작하게 되었어요."
        },
        {
            "x": offset[2] + 500,
            "y": 230.0,
            "itemType": "item",
            "itemKey": "music",
            "rewardTextureKey": "picture-music",
            "rewardText": "저희는 비슷한 점이 많았어요! \n음악 취향도 비슷해서 함께 이런저런 공연을 보러 다니기도 했죠."
        },
        {
            "x": offset[2] + 1600,
            "y": 160.0,
            "itemType": "item",
            "itemKey": "taiko",
            "rewardTextureKey": "picture-taiko",
            "rewardText": "리듬게임을 좋아한다는 점도 비슷해서, \n이런저런 컨트롤러를 구매해서 집에서 함께 게임을 하곤 합니다."
        },
        {
            "x": offset[3] + 450,
            "y": 310.0,
            "itemType": "item",
            "itemKey": "sushi",
            "rewardTextureKey": "picture-sushi",
            "rewardText": "함께 맛있는 것을 먹으러 다니기도 하고,"
        },
        {
            "x": offset[3] + 1200,
            "y": 310.0,
            "itemType": "item",
            "itemKey": "kousei",
            "rewardTextureKey": "picture-kousei",
            "rewardText": "함께 맛있는 것을 만들며 시간을 보내기도 했어요."
        },
        {
            "x": offset[4] + 800,
            "y": 180.0,
            "itemType": "item",
            "itemKey": "ring",
            "rewardTextureKey": "picture-ring",
            "rewardText": "그리고 512일이 되던 때, \n앞으로 평생 함께하기로 약속했답니다."
        },
        {
            "x": offset[4] + 1500,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "cat",
            "rewardTextureKey": "picture-cat",
            "rewardText": "각각 고양이 1마리의 집사였던 우리들이 만나, \n이제 고양이 2마리의 집사가 되려고 합니다."
        },
        {
            "x": offset[4] + 2300,
            "y": 300.0,
            "itemType": "item",
            "itemKey": "heart",
            "rewardTextureKey": "picture-heart",
            "rewardText": "2022년 5월 22일, 결혼합니다! \n저희에게 펼쳐진 앞으로의 여정을 많이 축복해 주세요. 감사합니다!"
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