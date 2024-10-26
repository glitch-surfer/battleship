import { httpServer as server } from './src/http_server/index.js';
import { WebSocketServer } from 'ws';
import { wsMessageHandler } from './src/ws-handlers';
import { socketsDb } from './src/db/sockets-db';

const PORT = 3000;

export const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log(`Client connected to the ${PORT} websocket port!`);
  ws.on('error', console.error);
  ws.on('message', (data) => wsMessageHandler(data.toString(), ws));
  ws.on('close', () => {
      console.log('Client disconnected!');
      socketsDb.removeSocket(ws);
    },
  );
})
  .on('error', console.error);

console.log(`Start static http server on the ${PORT} port!`);
server.listen(PORT);
