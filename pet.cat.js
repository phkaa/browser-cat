export class Cat {
  constructor(catObj, catType) {
    this.catObj = catObj
    this.catType = catType
    this.state = null

    this.updateState('idle')
  }
  create() {
    
  }
  updateState(state) {
    this.state = state
    let anim = null

    if (this.state === 'idle') {
      anim = `${this.catType}-${this.state}`
    }

    this.catObj.play(anim)
  }
}