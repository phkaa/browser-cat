export class WallManager {
    constructor(scene) {
      this.scene = scene
      this.matter = this.scene.matter
      this.thickness = 40
    }
    create() {
      this.updateWall()
    }
    resize() {
      this.updateWall()
    }
    updateWall() {
      const currentSceneScale = this.getCurrentSceneSacle()
    
      this.matter.world.setBounds(0, 0, currentSceneScale.width, currentSceneScale.height, this.thickness)
    }
    getCurrentSceneSacle() {
      return {
        width: this.scene.scale.width,
        height: this.scene.scale.height
      }
    }
}