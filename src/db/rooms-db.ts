import { Room, UserInRoom } from '../models/room';

const rooms: Room[] = [];

export const roomsDb = {
  addRoom: (room: Room) => rooms.push(room),
  getRooms: (currentUserId: string): Room[] => rooms.filter(room => room.roomUsers.length < 2 && room.roomUsers.every(user => user.index !== currentUserId)),
  getRoom: (roomId: string): Room | undefined => rooms.find(room => room.roomId === roomId),
  addUserToRoom: (roomId: string, { name, index }: UserInRoom): Room => {
    const room = roomsDb.getRoom(roomId);
    if (!room) throw new Error('Room not found');

    room.roomUsers.push({ name, index });
    return { ...room };
  },
};