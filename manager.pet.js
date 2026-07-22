import { Cat } from './pet.cat.js'

export class PetManager {
  constructor(scene, Math, cats) {
    this.scene = scene
    this.math = Math
    this.cats = cats
    this.matter = this.scene.matter
    this.spriteSize = 48
    this.pets = []
  }
  create() {

  }
  addPet() {
    const currentSceneScale = this.getCurrentSceneSacle()
    const randomCat = this.math.RND.pick(this.cats)

    const pet = this.matter.add.sprite(
      this.math.Between(this.spriteSize, currentSceneScale.width - this.spriteSize),
      this.spriteSize,
      `${randomCat}-idle`
    )
    pet.setFixedRotation()

    const cat = new Cat(pet, randomCat)
    
    this.pets.push(cat)
  }
  keepInWorld() {

  }
  getCurrentSceneSacle() {
      return {
        width: this.scene.scale.width,
        height: this.scene.scale.height
      }
    }
}