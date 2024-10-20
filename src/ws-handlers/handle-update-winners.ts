import { winnersDb } from '../db/winners-db';
import { WsMessage, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { Winner } from '../models/winner';

export const handleUpdateWinners = (name?: string): WsMessage => {
  if (name) winnersDb.addWinner(name);

  return getWsResponse<Winner[]>(WsMessageType.UPDATE_WINNERS, winnersDb.getWinners());
}