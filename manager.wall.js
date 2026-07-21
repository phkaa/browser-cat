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

        const width = this.scene.scale.width
        const height = this.scene.scale.height
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
      const width = this.scene.scale.width
      const height = this.scene.scale.height
      const thickness = this.thickness

      this.matter.body.setPosition(this.walls.floor, { x: width / 2, y: height + (thickness / 2) })
      this.matter.body.setPosition(this.walls.ceiling, { x: width / 2, y: -thickness / 2 })
      this.matter.body.setPosition(this.walls.left, { x: -thickness / 2, y: height / 2 })
      this.matter.body.setPosition(this.walls.right, { x: (width + thickness / 2), y: height / 2 })
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