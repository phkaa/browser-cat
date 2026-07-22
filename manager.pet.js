export class PetManager {
  constructor(scene, Math) {
    this.math = Math
    this.scene = scene
    this.matter = this.scene.matter
    this.spriteSize = 48
    this.pets = []
  }
  create() {

  }
  addPet() {
    const currentSceneScale = this.getCurrentSceneSacle()

    const pet = this.matter.add.sprite(
      this.math.Between(this.spriteSize, currentSceneScale.width - this.spriteSize),
      this.spriteSize,
      'black-cat-idle'
    )
    pet.setFixedRotation()
    pet.play('black-cat-idle')

    this.pets.push(pet)
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