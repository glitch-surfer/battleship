export interface Ship {
  position: {
    x: number;
    y: number;
  };
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
}