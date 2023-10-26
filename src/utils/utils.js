import { CollisionBlock } from "../classes/CollisionBlock";
import { KillBlock } from "../classes/KillBlock";
import { nextLevelBlock } from "../classes/NextLevelBlock";

export function parse2DArray(arr) {
    const rows = [];
    for (let i = 0; i < arr.length; i += 32) {
      rows.push(arr.slice(i, i + 32));
    }
    return rows;
}

export function createObjectsFrom2DArray(arr, c) {
    const objects = {
      collisions: [],
      next: [],
      kill: []
    };
    arr.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 800) {
          objects.collisions.push(
            new CollisionBlock({
              position: { x: x * 32, y: y * 32 },
              c
            })
          );
        } else if (symbol === 700) {
          objects.next.push(
            new nextLevelBlock({
              position: { x: x * 32, y: y * 32 },
              c
            })
          );
        } else if (symbol === 600) {
          objects.kill.push(
            new KillBlock({
              position: { x: x * 32, y: y * 32 },
              c
            })
          );
        }
      });
    });
    return objects;
}