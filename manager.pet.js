import { Cat } from './pet.cat.js'
import { catTypes, categorys } from './config.js'

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
  addPet() {
    console.log(categorys.cat)
    const currentSceneScale = this.getCurrentSceneSacle()
    const randomCat = this.math.RND.pick(catTypes)

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