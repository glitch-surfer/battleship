import { User } from '../models/user';

const users: User[] = [];

export const usersDb = {
  addUser: (user: User) => {
    users.push(user);
  },
  getUser: (id: number): User | null => {
    return users.find((user) => user.id === id) ?? null;
  },
  getUsers: (): User[] => {
    return users;
  },
  getIndex: (): number => {
    return users.length;
  },
};