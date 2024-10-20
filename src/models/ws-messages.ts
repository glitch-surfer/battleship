export enum WsMessageType {
  REGISTRATION = 'reg',
  SHOOT = 'update_winners',
  CREATE_ROOM = 'create_room',
  ADD_USER_TO_ROOM = 'add_user_to_room',
  CREATE_GAME = 'create_game',
  UPDATE_ROOM = 'update_room',
  ADD_SHIPS = 'add_ships',
  START_GAME = 'start_game',
  ATTACK = 'attack',
  RANDOM_ATTACK = 'randomAttack',
  TURN = 'turn',
  FINISH = 'finish',
}

export interface WsMessage {
  type: WsMessageType;
  data: string;
  id: 0;
}

export interface RegistrationReqData {
  name: string;
  password: string;
}

export interface RegistrationResData {
  name: string;
  index: number | string;
  error: boolean;
  errorText: string;
}