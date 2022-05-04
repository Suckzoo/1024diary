import * as PIXI from 'pixi.js';

import * as GRAYTILE_IMAGE from './graytile.png';
import * as BG_INIT_STAGE1 from './bg1-obj-stage2.png';
import * as BG_STAGE1 from './bg1.png';
import * as BG_STAGE1_WINDOW from './bg1-obj-window.png';
import * as POT from './bg1-obj-pot.png';
import * as BG_STAGE2 from './bg2.png';
import * as BG_STAGE2_LINGO from './bg2-lingo.png';
import * as BG_STAGE2_TOT from './bg2-tot.png';
import * as BG_NEON1 from './bg2-neon1.png';
import * as BG_NEON2 from './bg2-neon2.png';
import * as BG_NEON3 from './bg2-neon3.png';
import * as BG_NEON4 from './bg2-neon4.png';
import * as BG_STAGE3 from './bg3-kame.png';
import * as BG_STAGE4 from './bg4-bg.png';
import * as BG_STAGE4_BGFLOWERS from './bg4-bgflowers.png';
import * as BG4_DOOR_1 from './bg4-door1.png';
import * as BG4_DOOR_2 from './bg4-door2.png';
import * as BG_FINAL from './bg-final.png';
import * as BG4_CLOUD from './bg4-cloud.png';
import * as LOGO_TEXTURE from './logo.png';
import * as CHAR_SUCKZOO_1 from './char-1.png';
import * as CHAR_SUCKZOO_2 from './char-2.png';
import * as CHAR_SUCKZOO_3 from './char-3.png';
import * as CHAR_SUCKZOO_4 from './char-4.png';
import * as CHAR_SUCKZOO_STAND from './char-stand.png';
import * as ITEM_1024 from './item-1024-1.png';
import * as ITEM_1024_GLOW from './item-1024-2.png';
import * as ITEM_MACBOOK from './item-macbook-1.png';
import * as ITEM_MACBOOK_GLOW from './item-macbook-2.png';
import * as ITEM_LINGO from './item-lingo-1.png';
import * as ITEM_LINGO_GLOW from './item-lingo-2.png';
import * as ITEM_RING from './item-propose-1.png';
import * as ITEM_RING_GLOW from './item-propose-2.png';
import * as ITEM_MUSIC from './item-music-1.png';
import * as ITEM_MUSIC_GLOW from './item-music-2.png';
import * as ITEM_SUSHI from './item-sushi-1.png';
import * as ITEM_SUSHI_GLOW from './item-sushi-2.png';
import * as ITEM_KOUSEI from './item-kousei-1.png';
import * as ITEM_KOUSEI_GLOW from './item-kousei-2.png';
import * as ITEM_TAIKO  from './item-taiko-1.png';
import * as ITEM_TAIKO_GLOW from './item-taiko-2.png';
import * as ITEM_CAT from './item-cat-1.png';
import * as ITEM_CAT_GLOW from './item-cat-2.png';
import * as ITEM_HEART from './item-heart-1.png';
import * as ITEM_HEART_GLOW from './item-heart-2.png';
import * as UI_BUTTON_CLOSE from './ui-button-close.png';
import * as UI_BUTTON_JUMP from './ui-button-jump.png';
import * as UI_BUTTON_JUMP_PRESSED from './ui-button-jump-pressed.png';
import * as UI_BUTTON_START from './ui-button-start.png';
import * as UI_BUTTON_LICENSE from './ui-button-license.png';
import * as UI_POPUP from './ui-popup.png';
import * as UI_ENDING from './ui-ending.png';
import * as PICTURE_1024 from './pic-1024.png';
import * as PICTURE_MAC from './pic-mac.png';
import * as PICTURE_LINGO from './pic-lingo.png';
import * as PICTURE_MUSIC from './pic-music.png';
import * as PICTURE_TAIKO from './pic-taiko.png';
import * as PICTURE_SUSHI from './pic-sushi.png';
import * as PICTURE_KOUSEI from './pic-kousei.png';
import * as PICTURE_CAT from './pic-cat.png';
import * as PICTURE_RING from './pic-ring.png';
import * as PICTURE_HEART from './pic-heart.png';
import * as CONFETTI_1 from './confetti-1.png';
import * as CONFETTI_2 from './confetti-2.png';
import * as CONFETTI_3 from './confetti-3.png';
import * as PICKUP_SOUND from './pickup.wav';
import * as JUMP_SOUND from './jump.wav';
import * as LASER_SOUND from './laser.wav';

interface LoaderAndResources {
    Loader: PIXI.Loader,
    Resources: PIXI.utils.Dict<PIXI.LoaderResource>
}
export function LoadSprites(loader: PIXI.Loader): Promise<LoaderAndResources> {
    loader
        .add('graytile', GRAYTILE_IMAGE)
        .add('bg1-init', BG_INIT_STAGE1)
        .add('bg1', BG_STAGE1)
        .add('bg1-window', BG_STAGE1_WINDOW)
        .add('pot', POT)
        .add('bg2', BG_STAGE2)
        .add('bg2-lingo', BG_STAGE2_LINGO)
        .add('bg2-neon1', BG_NEON1)
        .add('bg2-neon2', BG_NEON2)
        .add('bg2-neon3', BG_NEON3)
        .add('bg2-neon4', BG_NEON4)
        .add('bg2-tot', BG_STAGE2_TOT)
        .add('bg3', BG_STAGE3)
        .add('bg4-bg', BG_STAGE4)
        .add('bg4-bgflowers', BG_STAGE4_BGFLOWERS)
        .add('bg4-cloud', BG4_CLOUD)
        .add('bg4-door1', BG4_DOOR_1)
        .add('bg4-door2', BG4_DOOR_2)
        .add('bg-final', BG_FINAL)
        .add('character1', CHAR_SUCKZOO_1)
        .add('character2', CHAR_SUCKZOO_2)
        .add('character3', CHAR_SUCKZOO_3)
        .add('character4', CHAR_SUCKZOO_4)
        .add('character-stand', CHAR_SUCKZOO_STAND)
        .add('logo', LOGO_TEXTURE)
        .add('1024', ITEM_1024)
        .add('1024-glow', ITEM_1024_GLOW)
        .add('macbook', ITEM_MACBOOK)
        .add('macbook-glow', ITEM_MACBOOK_GLOW)
        .add('lingo', ITEM_LINGO)
        .add('lingo-glow', ITEM_LINGO_GLOW)
        .add('ring', ITEM_RING)
        .add('ring-glow', ITEM_RING_GLOW)
        .add('music', ITEM_MUSIC)
        .add('music-glow', ITEM_MUSIC_GLOW)
        .add('sushi', ITEM_SUSHI)
        .add('sushi-glow', ITEM_SUSHI_GLOW)
        .add('kousei', ITEM_KOUSEI)
        .add('kousei-glow', ITEM_KOUSEI_GLOW)
        .add('taiko', ITEM_TAIKO)
        .add('taiko-glow', ITEM_TAIKO_GLOW)
        .add('cat', ITEM_CAT)
        .add('cat-glow', ITEM_CAT_GLOW)
        .add('heart', ITEM_HEART)
        .add('heart-glow', ITEM_HEART_GLOW)
        .add('ui-button-close', UI_BUTTON_CLOSE)
        .add('ui-button-jump', UI_BUTTON_JUMP)
        .add('ui-button-jump-pressed', UI_BUTTON_JUMP_PRESSED)
        .add('ui-button-start', UI_BUTTON_START)
        .add('ui-button-license', UI_BUTTON_LICENSE)
        .add('ui-popup', UI_POPUP)
        .add('ui-ending', UI_ENDING)
        .add('picture-1024', PICTURE_1024)
        .add('picture-mac', PICTURE_MAC)
        .add('picture-lingo', PICTURE_LINGO)
        .add('picture-music', PICTURE_MUSIC)
        .add('picture-taiko', PICTURE_TAIKO)
        .add('picture-sushi', PICTURE_SUSHI)
        .add('picture-kousei', PICTURE_KOUSEI)
        .add('picture-cat', PICTURE_CAT)
        .add('picture-ring', PICTURE_RING)
        .add('picture-heart', PICTURE_HEART)
        .add('confetti-1', CONFETTI_1)
        .add('confetti-2', CONFETTI_2)
        .add('confetti-3', CONFETTI_3)
        .add('pickup_sound', PICKUP_SOUND)
        .add('laser_sound', LASER_SOUND)
        .add('jump_sound', JUMP_SOUND)
    return new Promise<LoaderAndResources>(resolve => {
        loader.load((loader, resources) => {
            resolve({
                Loader: loader,
                Resources: resources
            })
        })
    });
}