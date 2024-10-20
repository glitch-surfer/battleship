import { WsMessage, WsMessageType } from '../models/ws-messages';
import { handleRegistration } from './handle-registration';

export const wsMessageHandler = (data: string): WsMessage | undefined => {
  const { type, data: message } = JSON.parse(data) as WsMessage;

  switch (type) {
    case WsMessageType.REGISTRATION:
      return handleRegistration(message);

    default:
      console.log(`Unknown message type: ${type}`);
      break;
  }
};