import { User } from './user';

type UserInRoom = Pick<User, 'name' | 'index'>

export interface Room {
  roomId: string;
  roomUsers: UserInRoom[];
}