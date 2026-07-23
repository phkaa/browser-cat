import {
    Scene,
    Math
} from './phaser_v4.2.1.esm.js'
import { WallManager } from './manager.wall.js'
import { PetManager } from './manager.pet.js'
import { catTypes, categorys, labels } from './config.js'

export class MainScene extends Scene {
  preload() {
    this.loadResources()
    this.loadCategory()
  }
  create() {
    this.loadAnims()

    this.wallManager = new WallManager(this)
    this.wallManager.create()
    this.needResize = false

    this.petManager = new PetManager(this, Math)
    this.petManager.create()

    this.scale.on('resize', () => {
      this.needResize = true
    })

    this.createPetAddUIButton()
    
    this.matter.world.on('collisionstart', this.worldCollisionStart)
  }
  update() {
    this.updateResizeWall()
    this.petManager.update()
  }
  updateResizeWall() {
    if (this.needResize) {
      this.needResize = false
      this.wallManager.resize()
    }
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
      this.petManager.addPet()
    })
  }
  loadResources() {
    for (const cat of catTypes) {
      this.load.spritesheet(`${cat}-idle`, `./assets/${cat}-idle.png`, { frameWidth: 48, frameHeight: 48})
      this.load.spritesheet(`${cat}-run`, `./assets/${cat}-run.png`, { frameWidth: 48, frameHeight: 48})
    }
  }
  loadAnims() {
    for (const cat of catTypes) {
      this.anims.create({ 
        key: `${cat}-idle`,
        frames: this.anims.generateFrameNumbers(`${cat}-idle`, { start: 0, end: 11 }),
        frameRate: 10,
        repeat: -1
      })
      this.anims.create({ 
        key: `${cat}-run`,
        frames: this.anims.generateFrameNumbers(`${cat}-run`, { start: 0, end: 5 }),
        frameRate: 12,
        repeat: -1
      })
    }
  }
  loadCategory() {
    categorys.cat = this.matter.world.nextCategory()
    categorys.wall = this.matter.world.nextCategory()
  }
  worldCollisionStart(event) {
    for (const pair of event.pairs) {
      const bodyA = pair.bodyA
      const bodyB = pair.bodyB

      if (bodyA.label === labels.cat) {
        bodyA.pet.onCollision(bodyB)
      }

      if (bodyB.label === labels.cat) {
        bodyB.pet.onCollision(bodyA)
      }
    }
  }
}