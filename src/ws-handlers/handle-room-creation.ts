import { WsMessage, WsMessageType } from '../models/ws-messages';
import { roomsDb } from '../db/rooms-db';
import { getWsResponse } from '../helpers/get-ws-response';

export const handleRoomCreation = (): WsMessage => {
  const newRoom = {
    roomId: Date.now(),
    roomUsers: [],
  };
  roomsDb.addRoom(newRoom);

  return getWsResponse(WsMessageType.CREATE_ROOM, { indexRoom: newRoom.roomId });
};