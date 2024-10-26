import { Position } from '../models/game';

export const isShipSunk = (lastShot: Position, remainingCoordinates: Position[]): boolean => {
  const { x, y } = lastShot;
  const adjacentCoordinatess = [
    { x: x - 1, y }, { x: x + 1, y },
    { x, y: y - 1 }, { x, y: y + 1 },
  ];

  return !adjacentCoordinatess.some(coord =>
    remainingCoordinates.some(shipCoord =>
      shipCoord.x === coord.x && shipCoord.y === coord.y,
    ),
  );
};