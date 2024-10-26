import { Position, Ship } from '../models/game';

export const mapShipToPositions =(ship: Ship): Position[] => {
  const { position, direction, length } = ship;
  let { x, y } = position;
  const coordinates = [];

  for (let i = 0; i < length; i++) {
    coordinates.push({ x, y });
    if (direction) y++;
    else x++;
  }

  return coordinates;
}