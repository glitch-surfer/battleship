import { AttackReq, AttackRes } from '../models/game';
import { ResponseData, WsMessageType } from '../models/ws-messages';
import { gameSessionDb } from '../db/game-session-db';
import { getWsResponse } from '../helpers/get-ws-response';

interface AttackResultInterface {
  result: ResponseData;
  nextTurnPlayerId: string;
  userIds: [string, string];
}

export const handleAttack = (message: string): AttackResultInterface => {
  const { gameId, x, y, indexPlayer } = JSON.parse(message) as AttackReq;
  const game = gameSessionDb.getGame(gameId);
  if (!game) throw new Error('Game not found');

  const [enemyId, enemyCoordinates] = Object.entries(game.coordinates).filter(([playerId]) => playerId !== indexPlayer)[0];
  const result = enemyCoordinates.findIndex(coordinate => coordinate.x === x && coordinate.y === y);

  switch (result) {
    case -1:
      return {
        result: getWsResponse<AttackRes>(WsMessageType.ATTACK, {
          status: 'miss',
          position: {
            x,
            y,
          },
          currentPlayer: indexPlayer,
        }),
        nextTurnPlayerId: enemyId,
        userIds: game.userIds,
      };

    default:
      gameSessionDb.addGame({
        ...game,
        coordinates: {
          ...game.coordinates,
          [enemyId]: enemyCoordinates.filter((_, index) => index !== result),
        },
      });

      return {
        result: getWsResponse<AttackRes>(WsMessageType.ATTACK, {
          status: 'shot',
          position: {
            x,
            y,
          },
          currentPlayer: indexPlayer,
        }),
        nextTurnPlayerId: indexPlayer,
        userIds: game.userIds,
      };
  }
};