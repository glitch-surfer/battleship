import { WsMessage, WsMessageType } from '../models/ws-messages';
import { handleRegistration } from './handle-registration';
import { handleRoomCreation } from './handle-room-creation';
import { handleRoomUpdate } from './handle-room-update';
import { handleUpdateWinners } from './handle-update-winners';
import { handleAddUserToRoom } from './handle-add-user-to-room';
import { handleCreateGame } from './handle-create-game';
import { WebSocket } from 'ws';
import { createGame } from './create-game';
import { socketsDb } from '../db/sockets-db';
import { addPlayerShips } from './add-ships';
import { handleStartGame } from './handle-start-game';
import { handleTurn } from './handle-turn';

export const wsMessageHandler = (data: string, ws: WebSocket) => {
  const { type, data: message } = JSON.parse(data);
  const socketsToRespond = new Set<WebSocket>().add(ws);
  const messagesToRespond: WsMessage[] = [];

  console.log(`Received message type: ${type} with data: ${message}`);

  switch (type) {
    case WsMessageType.REGISTRATION:
      messagesToRespond.push(handleRegistration(message, ws), handleRoomUpdate(ws), handleUpdateWinners());
      break;

    case WsMessageType.CREATE_ROOM:
      messagesToRespond.push(handleRoomCreation(), handleRoomUpdate(ws));
      break;

    case WsMessageType.ADD_USER_TO_ROOM:
      const room = handleAddUserToRoom(message, ws);
      messagesToRespond.push(handleRoomUpdate(ws));

      const shouldCreateGame = room.roomUsers.length === 2;
      if (shouldCreateGame) {
        const gameId = createGame(room.roomUsers.map(user => user.index) as [string, string]);
        messagesToRespond.push((ws: WebSocket) => handleCreateGame(gameId, ws));
        room.roomUsers.forEach(user => socketsToRespond.add(socketsDb.getByUserId(user.index).socket));
      }
      break;

    case WsMessageType.ADD_SHIPS:
      const { shouldStartGame, gameShips, currentPlayerIndex } = addPlayerShips(message);

      if (shouldStartGame) {
        messagesToRespond.push(handleStartGame(gameShips[currentPlayerIndex], currentPlayerIndex), handleTurn(currentPlayerIndex));
        delete gameShips[currentPlayerIndex];
        const [secondPlayerIndex, secondPlayerShips] = Object.entries(gameShips)[0];
        [handleStartGame(secondPlayerShips, secondPlayerIndex), handleTurn(currentPlayerIndex)].forEach(response => {
          socketsDb.getByUserId(secondPlayerIndex).socket.send(JSON.stringify(response));
        });
      }
      break;

    default:
      console.log(`Unknown message type: ${type}`);
      break;
  }

  socketsToRespond.forEach((ws) => {
    messagesToRespond.map(res => typeof res === 'function' ? res(ws) : res).forEach((response) => {
      console.log(`Response to the message type "${response.type}" with result "${response.data}"`);
      ws.send(JSON.stringify(response));
    });
  });
};