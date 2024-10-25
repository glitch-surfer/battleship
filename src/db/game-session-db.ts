interface Game {
  id: string;
  userIds: [string, string];
}

const gameSession: Record<string, Game> = {};

export const gameSessionDb = {
  getGame: (id: string): Game | undefined => gameSession[id],
  addGame: (game: Game) => {
    gameSession[game.id] = game;
  },
};