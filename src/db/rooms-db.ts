import { Room } from '../models/room';

const rooms: Room[] = [];

export const roomsDb = {
  addRoom: (room: Room) => rooms.push(room),
  getRoom: (index: number) => rooms[index],
  getRoomsWithOnePlayer: (/*userId: number*/) => rooms.filter(room => room.roomUsers.length === 1/* && room.roomUsers[0].index !== userId*/),
  //todo check ids etc
  // getRoomsWithoutCurrentPlayer: (userId: number) => rooms.filter(room => room.roomUsers.findIndex(user => user.index === userId) === -1),
};