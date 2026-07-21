export class WallManager {
    constructor(scene) {
      this.scene = scene
      this.matter = this.scene.matter
      this.thickness = 40
      this.wallLength = 50000

      this.walls = this.initWalls()
    }
    create() {
        this.destroy()

        const currentSceneScale = this.getCurrentSceneSacle()
        const width = currentSceneScale.width
        const height = currentSceneScale.height
        const thickness = this.thickness
        const wallLength = this.wallLength

        // 이미 생성되어 있다면 생성하지 않음
        if (this.walls.floor) {
          return
        }

        // 바닥
        this.walls.floor = this.createWall(width / 2, height + (thickness / 2), wallLength, thickness, { isStatic: true})
        // 천장
        this.walls.ceiling = this.createWall(width / 2, -thickness / 2, wallLength, thickness, { isStatic: true})
        // 왼쪽 벽
        this.walls.left = this.createWall(-thickness / 2, height / 2, thickness, wallLength, { isStatic: true})
        // 오른쪽 벽
        this.walls.right = this.createWall(width + thickness / 2, height / 2, thickness, wallLength, { isStatic: true})
    }
    destroy() {
      for (const wall of Object.values(this.walls)) {
          if (wall) {
            this.scene.matter.world.remove(wall)
          }
      }

      this.walls = this.initWalls()
    }
    createWall(x, y, width, height, options) {
      return this.matter.add.rectangle(
        x,
        y,
        width,
        height,
        options
      )
    }
    resize() {
      const currentSceneScale = this.getCurrentSceneSacle()
      const width = currentSceneScale.width
      const height = currentSceneScale.height
      const thickness = this.thickness

      this.updatePosition(this.walls.floor, width / 2, height + (thickness / 2))
      this.updatePosition(this.walls.ceiling, width / 2, -thickness / 2)
      this.updatePosition(this.walls.left, -thickness / 2, height / 2)
      this.updatePosition(this.walls.right, width + (thickness / 2), height / 2)
    }
    updatePosition(wall, chageX, changeY) {
      this.matter.body.setPosition(wall, { x: chageX, y: changeY })
    }
    getCurrentSceneSacle() {
      return {
        width: this.scene.scale.width,
        height: this.scene.scale.height
      }
    }
    initWalls() {
      return {
        floor: null,
        ceiling: null,
        left: null,
        right: null
      }
    }
}