import { User } from '../models/user';

const users: Record<string, User> = {};

export const usersDb = {
  addUser: (user: User) => {
    users[user.id] = user;
  },
  getUser: (id: number): User | null => {
    return users[id] ?? null;
  },
  getUsers: (): User[] => {
    return Object.values(users);
  },
};