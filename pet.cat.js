export class Cat {
  constructor(catObj, catName) {
    this.catObj = catObj
    this.catName = catName
    this.state = 'idle'

    this.updateState(this.state)
  }
  create() {
    
  }
  updateState(state) {
    this.state = state
    let anim = null

    if (this.state === 'idle') {
      anim = `${this.catName}-${this.state}`
    }

    this.catObj.play(anim)
  }
}