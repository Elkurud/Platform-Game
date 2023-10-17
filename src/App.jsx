import { useEffect, useRef, useState } from "react";
import Player from "./classes/Player";
import { handleKeyDown, handleKeyUp } from "./eventListeners/eventListeners";
import Sprite from "./classes/Sprite";
import { collisionsLevel1, collisionsLevel2, collisionsLevel3, collisionsLevel4,collisionsLevel5 } from "./collisions/collisions";
import { CollisionBlock } from "./classes/CollisionBlock";
import { createObjectsFrom2DArray, parse2DArray } from "./utils/utils";

function App() {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);
  const [c, setC] = useState(null);
  const [gravity, setGravity] = useState(0.8);
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
  let parsedCollisions
  let collisionBlocks
  let background


  const player = new Player({
    c,
    canvas,
    gravity,
    collisionBlocks,
    imageSrc: './src/assets/Idle.png',
    frameRate: 8,
    animations: {
      idleRight:{
        frameRate:8,
        frameBuffer:8,
        loop:true,
        imageSrc: './src/assets/Idle.png',
      },
      idleLeft:{
        frameRate:8,
        frameBuffer:8,
        loop:true,
        imageSrc: './src/assets/IdleLeft.png',
      },
      runRight:{
        frameRate:8,
        frameBuffer:3,
        loop:true,
        imageSrc: './src/assets/Running.png',
      },
      runLeft:{
        frameRate:8,
        frameBuffer:3,
        loop:true,
        imageSrc: './src/assets/RunningLeft.png',
      },
    }
  });

  let levels = {
    1: {
      init: () => {
        parsedCollisions = parse2DArray(collisionsLevel1)
        collisionBlocks = createObjectsFrom2DArray(parsedCollisions, c)
        player.objects = collisionBlocks

        background = new Sprite({
          position: { x: 0, y: 0 },
          imageSrc: './src/assets/Level1.png',
          c,
        })
      }
    },
    2: {
      init: () => {
        parsedCollisions = parse2DArray(collisionsLevel2)
        collisionBlocks = createObjectsFrom2DArray(parsedCollisions, c)
        player.objects = collisionBlocks

        background = new Sprite({
          position: { x: 0, y: 0 },
          imageSrc: './src/assets/Level2.png',
          c,
        })
      }
    },
    3: {
      init: () => {
        parsedCollisions = parse2DArray(collisionsLevel3)
        collisionBlocks = createObjectsFrom2DArray(parsedCollisions, c)
        player.objects = collisionBlocks

        background = new Sprite({
          position: { x: 0, y: 0 },
          imageSrc: './src/assets/Level3.png',
          c,
        })
      }
    },
    4: {
      init: () => {
        parsedCollisions = parse2DArray(collisionsLevel4)
        collisionBlocks = createObjectsFrom2DArray(parsedCollisions, c)
        player.objects = collisionBlocks

        background = new Sprite({
          position: { x: 0, y: 0 },
          imageSrc: './src/assets/Level4.png',
          c,
        })
      }
    },
    5: {
      init: () => {
        parsedCollisions = parse2DArray(collisionsLevel5)
        collisionBlocks = createObjectsFrom2DArray(parsedCollisions, c)
        player.objects = collisionBlocks

        background = new Sprite({
          position: { x: 0, y: 0 },
          imageSrc: './src/assets/Level5.png',
          c,
        })
      }
    }

  }


  levels[1].init()

  function animate() {
    if (!c || !canvas) return;

    background.draw()
    collisionBlocks.collisions.forEach(collisionBlock => {
      collisionBlock.draw()
    })
    collisionBlocks.next.forEach(nextLevelBlock => {
      nextLevelBlock.draw()
    })
    collisionBlocks.kill.forEach(killBlock => {
      killBlock.draw()
    })
    

    player.update();

    player.velocity.x = 0;
    if (keys.d.pressed) {
      player.switchSprite('runRight')
      player.velocity.x = 5;
      player.lastDirection = 'right'
    }
    else if (keys.a.pressed) {
    player.velocity.x = -5;
    player.switchSprite('runLeft')
    player.lastDirection = 'left'
  } else {
    if (player.lastDirection === 'left') player.switchSprite('idleLeft')
    else player.switchSprite('idleRight')
  }

    levels[player.level].init()
    requestAnimationFrame(animate);
  }

  return (
    <>
      <canvas ref={canvasRef}></canvas>
    </>
  );
}

export default App;
