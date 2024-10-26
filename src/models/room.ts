import { User } from './user';

export type UserInRoom = Pick<User, 'name' | 'index'>

export interface Room {
  roomId: string;
  roomUsers: UserInRoom[];
}