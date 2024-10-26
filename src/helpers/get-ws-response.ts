import { ResponseData, WsMessageType } from '../models/ws-messages';

export const getWsResponse = <T>(type: WsMessageType, data: T): ResponseData => ({
  type,
  data: JSON.stringify(data),
  id: 0,
});
