import {
    Scene,
    Math
} from './phaser_v4.2.1.esm.js'
import { WallManager } from './manager.wall.js'

export class MainScene extends Scene {
  preload() {
  }
  create() {
    this.wallManager = new WallManager(this)
    this.wallManager.create()
    this.needResize = false

    this.scale.on('resize', () => {
      this.needResize = true
    })

    this.createPetAddUIButton()
  }
  update() {
    this.updateResizeWall()
  }
  createPetAddUIButton() {
    const size = 30
    const x = 20
    const y = 20

    const buttonBackground = this.add.graphics()
    buttonBackground.fillStyle(0x2d2d2d, 1)
    buttonBackground.fillRoundedRect(-size / 2, -size / 2, size, size, 12)

    const label = this.add.text(0, 0, '+', {
      fontFamily: 'Arial',
      fontSize: '16px',
      color: '#ffffff',
      align: 'center',
      backgroundColor: '#2d2d2d'
    }).setOrigin(0.5)

    const buttonPetAdd = this.add.container(x, y, [buttonBackground, label])
    buttonPetAdd.setSize(size, size)
    buttonPetAdd.setInteractive({ useHandCursor: true })
    buttonPetAdd.on('pointerdown', () => {
      this.matter.add.circle(
        Math.Between(x, this.scale.width),
        100,
        20
      )
    })
  }
  updateResizeWall() {
    if (this.needResize) {
      this.needResize = false
      this.wallManager.resize()
    }
  }
}