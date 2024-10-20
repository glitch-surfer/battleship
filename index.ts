import { httpServer as server } from './src/http_server/index.js';
import { WebSocketServer } from 'ws';
import { wsMessageHandler } from './src/ws-handlers';

const PORT = 3000;

export const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  console.log(`Client connected to the ${PORT} websocket port!`);
  ws.on('error', console.error);

  ws.on('message', (data) => {
    const responses = wsMessageHandler(data.toString());
    if (!responses?.length) return;

    responses.forEach(response => {
      console.log(`Response to the message type "${response.type}" with result "${response.data}"`);
      ws.send(JSON.stringify(response));
    });
  });
});

console.log(`Start static http server on the ${PORT} port!`);
server.listen(PORT);
