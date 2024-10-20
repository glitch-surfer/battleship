import { httpServer as server } from './src/http_server/index.js';
import { WebSocketServer } from 'ws';

const HTTP_PORT = 3000;

export const wss = new WebSocketServer({ server });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });
});

console.log(`Start static http server on the ${HTTP_PORT} port!`);
server.listen(HTTP_PORT);
