import { RegistrationResData, WsMessage, WsMessageType } from '../models/ws-messages';
import { getWsResponse } from '../helpers/get-ws-response';
import { usersDb } from '../db/users-db';
import { generateId } from '../helpers/generate-id';

const getRegistrationResponse = (data: RegistrationResData): WsMessage => getWsResponse(WsMessageType.REGISTRATION, data);

export const handleRegistration = (message: string): WsMessage => {
  const { name, password } = JSON.parse(message);

  if (!name || !password) {
    return getRegistrationResponse({
      name: '',
      index: 0,
      error: true,
      errorText: 'Name or password is empty',
    });
  }
  const id = generateId();
  const newUser = {
    name,
    password,
    id,
    index: id,
  };

  usersDb.addUser(newUser);

  return getRegistrationResponse({
    name: newUser.name,
    index: newUser.index,
    error: false,
    errorText: '',
  });
};