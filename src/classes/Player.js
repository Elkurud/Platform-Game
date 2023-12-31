import Sprite from "./Sprite";

class Player extends Sprite {
  constructor({ c, canvas, gravity, collisionBlocks = {}, imageSrc, frameRate, animations }) {
    super({ imageSrc, frameRate, animations })
    this.position = {
      x: 65,
      y: 330
    } 
    this.c = c;
    this.canvas = canvas
    this.gravity = gravity
    this.level = 1

    this.velocity = {
      x: 0,
      y: 1,
    };

    this.buffer = 0.01
    if (collisionBlocks.length > 0) {
      this.objects = {
        collisions: collisionBlocks.collisions,
        next: collisionBlocks.next,
        kill: collisionBlocks.kill
      }
    }
  }

  
  

  update() {
    this.draw();

    this.position.x += this.velocity.x;

    this.updateHitbox()

    this.checkForHorizontalCollision()
    this.apllyGravity()

    this.updateHitbox()

    this.checkForVerticalCollision()
    this.checkForNextLevel()
    this.checkForDeath()
  
  }

  updateHitbox() {
    this.hitbox = {
      position: {
        x: this.position.x,
        y: this.position.y + 26,
      },
      width: this.width,
      height: this.height - 26
    }
  }

  switchSprite(name) {
    if (this.image === this.animations[name].image) return
    this.currentFrame = 0
    this.image = this.animations[name].image
    this.frameRate = this.animations[name].frameRate
    this.frameBuffer = this.animations[name].frameBuffer
  }

  checkForHorizontalCollision() {
    if(!this.objects) return
    for (let i = 0; i < this.objects.collisions.length; i++) {
      const collisionBlock = this.objects.collisions[i]
      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
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
    if(!this.objects) return
    for (let i = 0; i < this.objects.collisions.length; i++) {
      const collisionBlock = this.objects.collisions[i]
      if (
        this.hitbox.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.hitbox.position.x + this.hitbox.width >= collisionBlock.position.x &&
        this.hitbox.position.y + this.hitbox.height >= collisionBlock.position.y &&
        this.hitbox.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
          if (this.velocity.y < 0) {
            const offset = this.hitbox.position.y - this.position.y
            this.velocity.y = 0
            this.position.y = collisionBlock.position.y + collisionBlock.height - offset + this.buffer
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

  checkForNextLevel() {
    if(!this.objects) return
    for (let i = 0; i < this.objects.next.length; i++) {
      const nextLevelBlock = this.objects.next[i]
      if (this.position.x <= nextLevelBlock.position.x + nextLevelBlock.width && 
        this.position.x + this.width >= nextLevelBlock.position.x &&
        this.position.y + this.height >= nextLevelBlock.position.y &&
        this.position.y <= nextLevelBlock.position.y + nextLevelBlock.height
        ) {
          if (this.velocity.x !== 0) {
            this.level++
            if ( this.level === 3 ) this.position.y = 300
            else this.position.y = 330
            this.position.x = 65
            
            break
          }
      }
    }
  }

  checkForDeath() {
    if(!this.objects) return
    for (let i = 0; i < this.objects.kill.length; i++) {
      const collisionBlock = this.objects.kill[i]
      if (this.position.x <= collisionBlock.position.x + collisionBlock.width && 
        this.position.x + this.width >= collisionBlock.position.x &&
        this.position.y + this.height >= collisionBlock.position.y &&
        this.position.y <= collisionBlock.position.y + collisionBlock.height
        ) {
          if ( this.level === 3 ) this.position.y = 300
          else this.position.y = 330
          this.position.x = 65
          break
        }
    }
  }

}

export default Player;
