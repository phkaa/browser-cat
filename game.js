import {
  AUTO,
  Game as PhaserGame,
  Scale
} from './phaser_v4.2.1.esm.js'

import { MainScene } from './scene.main.js'

export class Game {
  constructor() {
    this.game = new PhaserGame({
      type: AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'app',
      transparent: true,
      scale: {
        mode: Scale.RESIZE
      },
      physics: {
        default: 'matter',
        matter: {
          gravity: {
              y: 1
          },
          debug: true
        }
    },
      scene: [MainScene]
    })
  }
}