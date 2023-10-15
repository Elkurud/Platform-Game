class Player {
  constructor(position, c, canvas, gravity) {

    this.position = position;
    this.c = c;
    this.canvas = canvas
    this.gravity = gravity

    this.velocity = {
      x: 0,
      y: 1,
    };

    this.width = 64;
    this.height = 64;
  }
  draw() {
    this.c.fillStyle = "red";
    this.c.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update() {
    this.draw();

    this.position.y += this.velocity.y;
    this.position.x += this.velocity.x;

    if (this.position.y + this.height + this.velocity.y < this.canvas.height){
      this.velocity.y += this.gravity
    } else this.velocity.y = 0;
   
  }
}

export default Player;
