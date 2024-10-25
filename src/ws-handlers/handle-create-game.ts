import { ResponseData, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { socketsDb } from '../db/sockets-db';
import { WebSocket } from 'ws';

export const handleCreateGame = (idGame: string, ws: WebSocket): ResponseData => {
  return getWsResponse(WsMessageType.CREATE_GAME, {
    idGame,
    idPlayer: socketsDb.getSocketData(ws).userId,
  });
};