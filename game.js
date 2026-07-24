import {
  AUTO,
  Game as PhaserGame,
  Scale
} from './phaser_v4.2.1.esm.js'

import { config } from './config.js'
import { MainScene } from './scene.main.js'

class Game {
  constructor() {
    this.game = new PhaserGame({
      type: AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: 'browser-cat-container',
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
          debug: false
        }
    },
      scene: [MainScene]
    })
  }
}

window.addEventListener('message', (event) => {
  if (event.source !== window) return
  if (event.data.source !== 'browser-cat') return
  if (event.data.type !== 'INIT') return

  config.baseUrl = event.data.payload.extensionUrl

  new Game()
})