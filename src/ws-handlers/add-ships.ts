import { gameSessionDb } from '../db/game-session-db';
import { Ship } from '../models/game';

export const addPlayerShips = (message: string): {
  shouldStartGame: boolean,
  gameShips: Record<string, Ship[]>,
  currentPlayerIndex: string
} => {
  const { gameId, ships, indexPlayer } = JSON.parse(message);
  const game = gameSessionDb.getGame(gameId);
  if (!game) throw new Error('Game not found');

  game.ships[indexPlayer] = ships.slice();

  return {
    shouldStartGame: Object.keys(game.ships).length === 2,
    currentPlayerIndex: indexPlayer,
    gameShips: game.ships,
  };
};