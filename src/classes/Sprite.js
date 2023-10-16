class Sprite {
    constructor({position, imageSrc, c}) {
      this.position = position
      this.c = c;
      this.image = new Image()
      this.image.onload = () => {
        this.loaded = true
      }
      this.image.src = imageSrc
      this.loaded = false
    }
    draw() {
      if (!this.loaded) return
      this.c.drawImage(this.image, this.position.x, this.position.y)
    }

}

export default Sprite