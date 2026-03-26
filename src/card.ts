import { Suit } from "./types";

const RANK_VALUES: Record<string, number> = {
  "2": 2, "3": 3, "4": 4, "5": 5, "6": 6,
  "7": 7, "8": 8, "9": 9, "10": 10,
  "J": 11, "Q": 12, "K": 13, "A": 14
};

export class Card {
  rank: string;
  value: number;
  suit: Suit;

  constructor(rank: string,suit: Suit) {
    this.rank = rank;
    this.value = RANK_VALUES[rank];
    this.suit = suit;
  }
}