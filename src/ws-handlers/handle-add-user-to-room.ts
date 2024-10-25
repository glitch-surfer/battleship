import { roomsDb } from '../db/rooms-db';
import { WebSocket } from 'ws';
import { usersDb } from '../db/users-db';
import { socketsDb } from '../db/sockets-db';
import { Room } from '../models/room';

export const handleAddUserToRoom = (message: string, ws: WebSocket): Room => {
  const { indexRoom } = JSON.parse(message);
  const user = usersDb.getUser(socketsDb.getSocketData(ws)?.userId ?? '');
  if (!user) throw new Error('User not found');

  return roomsDb.addUserToRoom(indexRoom, user);
};