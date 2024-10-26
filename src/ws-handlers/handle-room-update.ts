import { WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { roomsDb } from '../db/rooms-db';
import { Room } from '../models/room';
import { socketsDb } from '../db/sockets-db';
import { WebSocket } from 'ws';

export const handleRoomUpdate = (ws: WebSocket) => {
  const currentUserId = socketsDb.getSocketData(ws).userId;
  socketsDb.getAll().forEach(socket => socket.send(JSON.stringify(getWsResponse<Room[]>(WsMessageType.UPDATE_ROOM, roomsDb.getRooms(currentUserId)))));
};