import { useEffect, useRef, useState } from "react";
import Player from "./classes/Player";
import { handleKeyDown, handleKeyUp } from "./eventListeners/eventListeners";
import Sprite from "./classes/Sprite";
import { collisionsLevel1 } from "./collisions/collisions";
import { CollisionBlock } from "./classes/CollisionBlock";
import { createObjectsFrom2DArray, parse2DArray } from "./utils/utils";

function App() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [c, setC] = useState(null);
  const [gravity, setGravity] = useState(0.8);
  // const [imageSrc, setImageSrc] = useState()
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
    const context = canvasRef.current.getContext("2d")
    setC(context);

    if (canvas && c) {
      canvas.width = 1024;
      canvas.height = 576;

      window.addEventListener("keydown", keyDownHandler);
      window.addEventListener("keyup", keyUpHandler);

      animate();
    }
  }, []);

  const parsedCollisions = parse2DArray(collisionsLevel1)
  const collisionBlocks = createObjectsFrom2DArray(parsedCollisions, c)

  const backgroundLevel1 = new Sprite({
    position: { x: 0, y: 0 },
    imageSrc: './src/assets/Level1.png',
    c,
  })

  const player = new Player({
    c,
    canvas,
    gravity,
    collisionBlocks,
    imageSrc: './src/assets/Idle.png',
    frameRate: 2
  });


  function animate() {
    if (!c || !canvas) return;

    backgroundLevel1.draw()
    collisionBlocks.forEach(collisionBlock => {
      collisionBlock.draw()
    })

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
