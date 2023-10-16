export class CollisionBlock {
    constructor({ position, c }) {
      this.position = position
      this.c = c
      this.width = 64
      this.height = 64
    }

    draw() {
      this.c.fillStyle = 'rgba(255, 0, 0, 0.5)'
      this.c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
  }