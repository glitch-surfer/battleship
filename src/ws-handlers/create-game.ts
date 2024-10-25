import { generateId } from '../helpers/generate-id';
import { gameSessionDb } from '../db/game-session-db';

export const createGame = (userIds: [string, string]): string => {
  const gameId = generateId();

  gameSessionDb.addGame({
    id: gameId,
    userIds,
  });

  return gameId;
};