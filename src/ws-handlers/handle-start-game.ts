import { ResponseData, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { Ship } from '../models/game';

export const handleStartGame = (ships: Ship[], currentPlayerIndex: string): ResponseData => {
  if (!ships?.length || !currentPlayerIndex) throw new Error('Invalid start game data');

  return getWsResponse(WsMessageType.START_GAME, {
    currentPlayerIndex,
    ships,
  });
};