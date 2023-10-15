import { useEffect, useRef, useState } from "react";
import Player from "./classes/Player";
import { handleKeyDown, handleKeyUp } from "./eventListeners/eventListeners";
function App() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [c, setC] = useState(null);
  const [gravity, setGravity] = useState(0.5);
  const [keys, setKeys] = useState({
    d: {
      pressed: false,
    },
    a: {
      pressed: false,
    },
  });

  useEffect(() => {
    const keyDownHandler = (event) => {
      const newKeys = handleKeyDown(event, keys, player);
      setKeys(newKeys)
    };
    const keyUpHandler = (event) => {
      const newKeys = handleKeyUp(event, keys);
      setKeys(newKeys)
    };

    setCanvas(canvasRef.current);
    setC(canvasRef.current.getContext("2d"));

    if (canvas && c) {
      canvas.width = 1024;
      canvas.height = 576;

      window.addEventListener("keydown", keyDownHandler);
      window.addEventListener("keyup", keyUpHandler);

      animate();
    }
  }, []);


  class Sprite {
    constructor({position, imageSrc, width, height }) {
      this.position = position
      this.image = new Image()
      this.image.src = imageSrc
      this.width = width;
      this.height = height;
    }
    draw() {
      c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
    }

  }

  const backgroundLevel1 = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './src/assets/Level1.png',
    width: canvas.width,
    height: canvas.height
  })

  const player = new Player(
    {
      x: 200,
      y: 0,
    },
    c,
    canvas,
    gravity
  );

  function animate() {
    if (!c || !canvas) return;

    c.fillStyle = "gray";
    c.fillRect(0, 0, canvas.width, canvas.height);
    backgroundLevel1.draw()

    player.update();

    player.velocity.x = 0;
    if (keys.d.pressed) player.velocity.x = 5;
    else if (keys.a.pressed) player.velocity.x = -5;

    requestAnimationFrame(animate);
  }

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default App;
