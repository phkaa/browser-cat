import { labels, petState } from './config.js'

export class Cat {
  constructor(scene, catSprite, catType) {
    this.scene = scene
    this.catSprite = catSprite
    this.catType = catType
    this.state = null

    this.catSprite.body.pet = this

    this.updateState(petState.idle)
  }
  create() {
    
  }
  update() {
    if (this.state === petState.run) {
      this.catSprite.setVelocityX(2)
    }
  }
  onCollision(otherBody) {
    if (otherBody.label.startsWith(labels.wall.wall)) {
      this.wallCollision(otherBody)
    }
  }
  wallCollision(wallBody) {
    switch (wallBody.label) {
      case labels.wall.floor:
        this.updateState(petState.run)
        break
      case labels.wall.ceiling:
        break
      case labels.wall.left:
        // this.turnRight()
        break
      case labels.wall.right:
        // this.turnLeft()
        break
    }
  }
  updateState(state) {
    this.state = state
    this.catSprite.play(`${this.catType}-${this.state}`)
  }
}