import { WsMessage, WsMessageType } from '../models/ws-messages';
import { roomsDb } from '../db/rooms-db';
import { getWsResponse } from '../helpers/get-ws-response';
import { generateId } from '../helpers/generate-id';
import { WebSocket } from 'ws';
import { socketsDb } from '../db/sockets-db';
import { usersDb } from '../db/users-db';

export const handleRoomCreation = (ws: WebSocket): WsMessage => {
  const { name, index } = usersDb.getUser(socketsDb.getSocketData(ws).userId)!;
  const newRoom = {
    roomId: generateId(),
    roomUsers: [{ name, index }],
  };
  roomsDb.addRoom(newRoom);

  return getWsResponse(WsMessageType.CREATE_ROOM, { indexRoom: newRoom.roomId });
};