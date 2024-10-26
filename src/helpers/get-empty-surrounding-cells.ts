import { Position } from '../models/game';

export const getEmptySurroundingCells = ({ x, y }: Position, shipCoordinates: Position[], boardSize = 10) => {
  const emptyCoordinates: Position[] = [];

  // Define all possible adjacent coordinates, including diagonals
  const adjacentOffsets = [
    { dx: -1, dy: -1 }, { dx: 0, dy: -1 }, { dx: 1, dy: -1 },
    { dx: -1, dy: 0 }, { dx: 1, dy: 0 },
    { dx: -1, dy: 1 }, { dx: 0, dy: 1 }, { dx: 1, dy: 1 },
  ];

  adjacentOffsets.forEach(offset => {
    const newX = x + offset.dx;
    const newY = y + offset.dy;

    // Check if the new coordinates are within the board
    if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardSize) {
      // Check if this coordinate is not occupied by a ship
      if (!shipCoordinates.some(coord => coord.x === newX && coord.y === newY)) {
        emptyCoordinates.push({ x: newX, y: newY });
      }
    }
  });

  return emptyCoordinates;
};