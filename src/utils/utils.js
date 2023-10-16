import { CollisionBlock } from "../classes/CollisionBlock";

export function parse2DArray(arr) {
    const rows = [];
    for (let i = 0; i < arr.length; i += 16) {
      rows.push(arr.slice(i, i + 16));
    }
    return rows;
}

export function createObjectsFrom2DArray(arr, c) {
    const objects = [];
    arr.forEach((row, y) => {
      row.forEach((symbol, x) => {
        if (symbol === 145) {
          objects.push(
            new CollisionBlock({
              position: { x: x * 64, y: y * 64 },
              c
            })
          );
        }
      });
    });
    return objects;
}