import { Winner } from '../models/winner';

const winners: Winner[] = [];

export const winnersDb = {
  addWinner: (name: string) => {
    const winnerIndex = winners.findIndex((winner) => winner.name === name);
    if (winnerIndex === -1) {
      winners.push({ name, wins: 0 });
    } else winners[winnerIndex].wins++;
  },
  getWinners: () => winners,
};