import { ResponseData, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { gameSessionDb } from '../db/game-session-db';

export const handleTurn = (currentPlayer: string, gameId: string): ResponseData => {
  gameSessionDb.setCurrentPlayer(gameId, currentPlayer);
  return getWsResponse(WsMessageType.TURN, {
    currentPlayer,
  });
};