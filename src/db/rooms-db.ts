import { Room } from '../models/room';

const rooms: Room[] = [];

export const roomsDb = {
  addRoom: (room: Room) => rooms.push(room),
  getRooms: (): Room[] => rooms,
  getRoom: (roomId: string): Room | undefined => rooms.find(room => room.roomId === roomId),
  removeRoomFromAvailableRooms: (roomId: string) => {
    rooms.filter(room => room.roomId !== roomId);
  },
};