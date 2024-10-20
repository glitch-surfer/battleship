import { WsMessage, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { roomsDb } from '../db/rooms-db';
import { Room } from '../models/room';

export const handleRoomUpdate = (): WsMessage => {
  return getWsResponse<Room[]>(WsMessageType.UPDATE_ROOM, roomsDb.getRoomsWithOnePlayer());
};