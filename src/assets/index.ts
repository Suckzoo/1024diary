import * as PIXI from 'pixi.js';

import * as BACKGROUND_IMAGE from './background.jpg';
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
import * as LOGO_TEXTURE from './logo.png';
import * as PLAY_TEXTURE from './play.png';
import * as PLAY_HOVER_TEXTURE from './play_hover.png';
import * as GALLERY_TEXTURE from './gallery.png';
import * as GALLERY_HOVER_TEXTURE from './gallery_hover.png';
import * as CCJ_TEXTURE from './ccj.png';
import * as CCJ_HOVER_TEXTURE from './ccj_hover.png';
import * as BACK_TEXTURE from './back.png';
import * as PHOTO_TEXTURE from './photo.png';
import * as SECRETPHOTO_TEXTURE from './secretphoto.png';
import * as WOW_PICTURE from './wow.png';
import * as LOCK_PICTURE from './lock.png';
import * as X_TEXTURE from './x.png';
import * as CHAR_SUCKZOO_1 from './char-1.png';
import * as CHAR_SUCKZOO_2 from './char-2.png';
import * as CHAR_SUCKZOO_3 from './char-3.png';
import * as CHAR_SUCKZOO_4 from './char-4.png';
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
import * as ITEM_TAIKO from './item-taiko-1.png';
import * as ITEM_TAIKO_GLOW from './item-taiko-2.png';
import * as ITEM_CAT from './item-cat-1.png';
import * as ITEM_CAT_GLOW from './item-cat-2.png';
import * as PICKUP_SOUND from './pickup.wav';
import * as JUMP_SOUND from './jump.wav';
import * as LASER_SOUND from './laser.wav';

interface LoaderAndResources {
    Loader: PIXI.Loader,
    Resources: PIXI.utils.Dict<PIXI.LoaderResource>
}
export function LoadSprites(loader: PIXI.Loader): Promise<LoaderAndResources> {
    loader
        .add('background', BACKGROUND_IMAGE)
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
        .add('character1', CHAR_SUCKZOO_1)
        .add('character2', CHAR_SUCKZOO_2)
        .add('character3', CHAR_SUCKZOO_3)
        .add('character4', CHAR_SUCKZOO_4)
        .add('logo', LOGO_TEXTURE)
        .add('play', PLAY_TEXTURE)
        .add('play_hover', PLAY_HOVER_TEXTURE)
        .add('gallery', GALLERY_TEXTURE)
        .add('gallery_hover', GALLERY_HOVER_TEXTURE)
        .add('ccj', CCJ_TEXTURE)
        .add('ccj_hover', CCJ_HOVER_TEXTURE)
        .add('back', BACK_TEXTURE)
        .add('photo', PHOTO_TEXTURE)
        .add('secretphoto', SECRETPHOTO_TEXTURE)
        .add('wow', WOW_PICTURE)
        .add('lock', LOCK_PICTURE)
        .add('x', X_TEXTURE)
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
        .add('taiko', ITEM_TAIKO)
        .add('taiko-glow', ITEM_TAIKO_GLOW)
        .add('cat', ITEM_CAT)
        .add('cat-glow', ITEM_CAT_GLOW)
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