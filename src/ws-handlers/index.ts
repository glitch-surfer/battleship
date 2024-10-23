import { WsMessage, WsMessageType } from '../models/ws-messages';
import { handleRegistration } from './handle-registration';
import { handleRoomCreation } from './handle-room-creation';
import { handleRoomUpdate } from './handle-room-update';
import { handleUpdateWinners } from './handle-update-winners';

export const wsMessageHandler = (data: string): WsMessage[] | undefined => {
  const { type, data: message } = JSON.parse(data) as WsMessage;

  console.log(`Received message type: ${type} with data: ${message}`);
  switch (type) {
    case WsMessageType.REGISTRATION:
      return [handleRegistration(message), handleRoomUpdate(), handleUpdateWinners()];

    case WsMessageType.CREATE_ROOM:
      return [handleRoomCreation(), handleRoomUpdate()];

    default:
      console.log(`Unknown message type: ${type}`);
      break;
  }
};