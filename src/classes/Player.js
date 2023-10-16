import Sprite from "./Sprite";

class Player extends Sprite {
  constructor({ c, canvas, gravity, collisionBlocks = [], imageSrc }) {
    super({ imageSrc })
    this.position = {
      x: 50,
      y: 50
    } 
    this.c = c;
    this.canvas = canvas
    this.gravity = gravity

    this.velocity = {
      x: 0,
      y: 1,
    };

    this.width = 64;
    this.height = 64;
    this.sides = {
      bottom: this.position.y + this.height,
    }
    this.buffer = 0.01
    this.collisionBlocks = collisionBlocks

  }
  

  update() {
    this.draw();

    this.position.x += this.velocity.x;
    this.checkForHorizontalCollision()
    this.apllyGravity()
    this.checkForVerticalCollision()
  
  }

  checkForHorizontalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
          if (this.velocity.x < 0) {
            this.position.x = collisionBlock.position.x + collisionBlock.width + this.buffer
            break
          }

          if (this.velocity.x > 0) {
            this.position.x = collisionBlock.position.x - this.width - this.buffer
            break
          }
      }
    }
  }

  apllyGravity() {
    this.velocity.y += this.gravity
    this.position.y += this.velocity.y;
  }

  checkForVerticalCollision() {
    for (let i = 0; i < this.collisionBlocks.length; i++) {
      const collisionBlock = this.collisionBlocks[i]
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
          if (this.velocity.y < 0) {
            this.velocity.y = 0
            this.position.y = collisionBlock.position.y + collisionBlock.height + this.buffer
            break
          }

          if (this.velocity.y > 0) {
            this.velocity.y = 0
            this.position.y = collisionBlock.position.y - this.height - this.buffer
            break
          }
      }
    }
  }

}

export default Player;
