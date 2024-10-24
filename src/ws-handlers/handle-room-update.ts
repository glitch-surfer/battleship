import { WsMessage, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { roomsDb } from '../db/rooms-db';
import { Room } from '../models/room';

export const handleRoomUpdate = (message?: string): WsMessage => {
  if (message) {
    const { indexRoom } = JSON.parse(message);
    roomsDb.removeRoomFromAvailableRooms(indexRoom);
  }

  return getWsResponse<Room[]>(WsMessageType.UPDATE_ROOM, roomsDb.getRooms());
};