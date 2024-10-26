import { gameSessionDb } from '../db/game-session-db';
import { Ship } from '../models/game';
import { mapShipToPositions } from '../helpers/map-ship-to-positions';

export const addPlayerShips = (message: string): {
  shouldStartGame: boolean,
  gameShips: Record<string, Ship[]>,
  currentPlayerIndex: string
} => {
  const { gameId, ships, indexPlayer } = JSON.parse(message);
  const game = gameSessionDb.getGame(gameId);
  if (!game) throw new Error('Game not found');

  game.ships[indexPlayer] = ships.slice();
  game.coordinates[indexPlayer] = ships.flatMap(mapShipToPositions);

  return {
    shouldStartGame: Object.keys(game.ships).length === 2,
    currentPlayerIndex: indexPlayer,
    gameShips: game.ships,
  };
};
