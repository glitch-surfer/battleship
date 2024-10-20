import { WsMessage, WsMessageType } from '../models/ws-messages';

export const getWsResponse = <T>(type: WsMessageType, data: T): WsMessage => ({
  type,
  data: JSON.stringify(data),
  id: 0,
});
