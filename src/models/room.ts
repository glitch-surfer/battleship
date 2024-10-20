import { User } from './user';

type UserInRoom = Pick<User, 'name' | 'index'>

export interface Room {
  roomId: number;
  roomUsers: UserInRoom[];
}