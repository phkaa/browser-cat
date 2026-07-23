import { labels, petState, petDirection } from './config.js'

export class Cat {
  constructor(scene, catSprite, catType, direction) {
    this.scene = scene
    this.catSprite = catSprite
    this.catType = catType
    this.state = null
    this.speed = 0.8
    this.direction = direction

    this.catSprite.body.pet = this

    this.updateState(petState.idle)

    if (this.direction === petDirection.right) {
      this.turnLeft()
    } else {
      this.turnRight()
    }
  }
  create() {
    
  }
  update() {
    if (this.state === petState.run) {
      this.catSprite.setVelocityX(this.speed * this.direction)
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
        this.turnRight()
        break
      case labels.wall.right:
        this.turnLeft()
        break
    }
  }
  turnRight() {
    this.direction = petDirection.right
    this.catSprite.setFlipX(false)
  }
  turnLeft() {
    this.direction = petDirection.left
    this.catSprite.setFlipX(true)
  }
  updateState(state) {
    this.state = state
    this.catSprite.play(`${this.catType}-${this.state}`)
  }
  keepInWorld() {
    const sprite = this.catSprite

    if (
        sprite.x < -100 ||
        sprite.x > this.scene.scale.width + 100 ||
        sprite.y > this.scene.scale.height + 100
    ) {
        sprite.setPosition(
            this.scene.scale.width / 2,
            100
        )

        sprite.setVelocity(0, 0)
    }
  }
}