import { ResponseData, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';

export const handleTurn = (currentPlayer: string): ResponseData => {
  return getWsResponse(WsMessageType.TURN, {
    currentPlayer,
  });
};