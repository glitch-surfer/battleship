export interface Position {
  x: number;
  y: number;
}

export interface Ship {
  position: Position;
  direction: boolean;
  length: number;
  type: 'small' | 'medium' | 'large' | 'huge';
}

export interface Game {
  id: string;
  userIds: [string, string];
  ships: {
    [key: string]: Ship[]
  };
  coordinates: {
    [key: string]: Position[]
  };
  currentPlayer: string;
  isFinished: boolean;
}

export interface AttackReq {
  gameId: string;
  x: number;
  y: number;
  indexPlayer: string;
}

export interface AttackRes {
  status: 'miss' | 'killed' | 'shot';
  position: Position;
  currentPlayer: string;
}