import { Cat } from './pet.cat.js'
import { catTypes, categorys, labels, petDirection } from './config.js'

export class PetManager {
  constructor(scene, Math) {
    this.scene = scene
    this.math = Math
    this.matter = this.scene.matter
    this.spriteSize = 48
    this.pets = []
  }
  create() {

  }
  update() {
    for (const pet of this.pets) {
      pet.update()
      pet.keepInWorld()
    }
  }
  addPet() {
    const currentSceneScale = this.getCurrentSceneSacle()
    const randomCat = this.math.RND.pick(catTypes)
    const randomDirection = this.math.RND.pick([petDirection.left, petDirection.right])

    const pet = this.matter.add.sprite(
      this.math.Between(this.spriteSize, currentSceneScale.width - this.spriteSize),
      this.spriteSize,
      `${randomCat}-idle`,
      null,
      {
        label: labels.cat
      }
    )
    pet.setFixedRotation()
    pet.setCollisionCategory(categorys.cat)
    pet.setCollidesWith([categorys.wall])

    const cat = new Cat(this.scene, pet, randomCat, randomDirection)
    this.pets.push(cat)
  }
  getCurrentSceneSacle() {
      return {
        width: this.scene.scale.width,
        height: this.scene.scale.height
      }
    }
}