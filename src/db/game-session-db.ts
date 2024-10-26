import { Game, Position } from '../models/game';

const gameSession: Record<string, Game> = {};

export const gameSessionDb = {
  getGame: (id: string): Game | undefined => ({ ...gameSession[id] }),
  addGame: (game: Game) => {
    gameSession[game.id] = { ...game };
  },
  setCurrentPlayer: (gameId: string, indexPlayer: string) => {
    gameSession[gameId].currentPlayer = indexPlayer;
  },
  setCoordinates: (gameId: string, playerId: string, coordinates: Position[]) => {
    gameSession[gameId].coordinates[playerId] = coordinates;
  },
};