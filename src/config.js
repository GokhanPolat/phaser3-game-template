import Phaser from 'phaser'

const config = {
  title: 'Blockchain Game | Gökhan Polat\n',
  type: Phaser.AUTO,
  parent: 'game_container',

  // 4:3 Aspect Ratio
  // width: 800,
  // height: 600,

  // 16:9 Aspect Ratio
  width: 854,
  height: 480,

  // antialias: true,
  autoCenter: true,
  expandParent: true,
  // transparent: true,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scale: {
    // parent: 'phaser-example',
    mode: Phaser.Scale.FIT,

    // https://en.wikipedia.org/wiki/Display_resolution#/media/File:Vector_Video_Standards8.svg

    // 4:3
    // min: { width: 640, height: 480 },
    // max: { width: 1280, height: 960 },

    // 16:9
    min: { width: 640, height: 360 },
    max: { width: 1280, height: 720 },

    // mode: Phaser.Scale.RESIZE,
    // for Scale.RESIZE
    // width: '100%',
    // height: '100%',

  },
  // banner: { hidePhaser: true },
  // version: "1.2.3"
  autoFocus: true,
}

export default config
