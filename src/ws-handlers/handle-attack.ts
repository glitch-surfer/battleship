import { AttackReq, AttackRes } from '../models/game';
import { ResponseData, WsMessageType } from '../models/ws-messages';
import { gameSessionDb } from '../db/game-session-db';
import { getWsResponse } from '../helpers/get-ws-response';
import { isShipSunk } from '../helpers/is-ship-sunk';
import { getEmptySurroundingCells } from '../helpers/get-empty-surrounding-cells';

interface AttackResultInterface {
  result: ResponseData[];
  nextTurnPlayerId: string;
  userIds: [string, string];
  gameId: string;
  isWin: boolean;
}

export const handleAttack = (message: string): AttackResultInterface | null => {
  const { gameId, x, y, indexPlayer } = JSON.parse(message) as AttackReq;
  const game = gameSessionDb.getGame(gameId);
  if (!game) throw new Error('Game not found');
  if (indexPlayer !== game.currentPlayer) return null;

  const [enemyId, enemyCoordinates] = Object.entries(game.coordinates).filter(([playerId]) => playerId !== indexPlayer)[0];
  const result = enemyCoordinates.findIndex(coordinate => coordinate.x === x && coordinate.y === y);

  switch (result) {
    case -1:
      gameSessionDb.setCurrentPlayer(gameId, enemyId);

      return {
        result: [getWsResponse<AttackRes>(WsMessageType.ATTACK, {
          status: 'miss',
          position: {
            x,
            y,
          },
          currentPlayer: indexPlayer,
        })],
        nextTurnPlayerId: enemyId,
        userIds: game.userIds,
        gameId,
        isWin: false,
      };

    default:
      gameSessionDb.setCurrentPlayer(gameId, indexPlayer);
      gameSessionDb.setCoordinates(gameId, enemyId, enemyCoordinates.filter((_, index) => index !== result));

      const status = isShipSunk({ x, y }, enemyCoordinates) ? 'killed' : 'shot';

      const response = {
        result: [getWsResponse<AttackRes>(WsMessageType.ATTACK, {
          status,
          position: {
            x,
            y,
          },
          currentPlayer: indexPlayer,
        })],
        nextTurnPlayerId: indexPlayer,
        userIds: game.userIds,
        gameId,
        isWin: gameSessionDb.isWin(gameId, enemyId),
      };

      if (status === 'killed') {
        response.result.push(...getEmptySurroundingCells({ x, y }, enemyCoordinates)
          .map(({ x, y }) => getWsResponse<AttackRes>(WsMessageType.ATTACK, {
            status: 'miss',
            position: {
              x,
              y,
            },
            currentPlayer: indexPlayer,
          })));
      }

      return response;
  }
};