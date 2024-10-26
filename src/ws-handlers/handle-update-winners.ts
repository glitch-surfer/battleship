import { winnersDb } from '../db/winners-db';
import { WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { Winner } from '../models/winner';
import { socketsDb } from '../db/sockets-db';

export const handleUpdateWinners = (name?: string) => {
  if (name) winnersDb.addWinner(name);

  socketsDb.getAll().forEach(socket => socket.send(JSON.stringify(getWsResponse<Winner[]>(WsMessageType.UPDATE_WINNERS, winnersDb.getWinners()))));
};