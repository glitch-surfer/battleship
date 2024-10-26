import { WebSocket } from 'ws';

export interface SocketMetaData {
  userId: string;
  socket: WebSocket;
}

const sockets = new Map<WebSocket, SocketMetaData>();

export const socketsDb = {
  addSocket: (socket: WebSocket, userId: string) => {
    sockets.set(socket, { userId, socket });
  },
  removeSocket: (socket: WebSocket) => {
    sockets.delete(socket);
  },
  getSocketData: (socket: WebSocket): SocketMetaData => sockets.get(socket)!,
  getByUserId: (userId: string) => {
    return Array.from(sockets.values()).find(socket => socket.userId === userId)!;
  }
};