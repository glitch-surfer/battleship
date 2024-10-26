import { ResponseData, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { WinRes } from '../models/game';
import { socketsDb } from '../db/sockets-db';
import { WebSocket } from 'ws';

export const handleFinish = (ws: WebSocket): ResponseData => {
  return getWsResponse<WinRes>(WsMessageType.FINISH, {
    winPlayer: socketsDb.getSocketData(ws).userId,
  });
};