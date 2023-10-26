export function handleKeyDown(event, keys, player) {
  const updatedKeys = { ...keys };

  switch (event.key) {
    case "d":
      updatedKeys.d.pressed = true;
      break;
    case "a":
      updatedKeys.a.pressed = true;
      break;
    case "w":
      if (player.velocity.y === 0) player.velocity.y = -15;

      break;
  }

  return updatedKeys;
}

export function handleKeyUp(event, keys) {
  const updatedKeys = { ...keys };

  switch (event.key) {
    case "d":
      updatedKeys.d.pressed = false;
      break;
    case "a":
      updatedKeys.a.pressed = false;
      break;
  }

  return updatedKeys;
}
