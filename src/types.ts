import { Card } from "./card";

export type Suit = "hearts" | "diamonds" | "clubs" | "spades";

export const HAND_CATEGORIES = [
  "High Card",
  "One Pair",
  "Two Pair",
  "Three of a Kind",
  "Straight",
  "Flush",
  "Full House",
  "Four of a Kind",
  "Straight Flush",
] as const;

export type Category = typeof HAND_CATEGORIES[number];

export type HandResult = {
  category: Category;
  chosen5: Card[];
};

export type Detector = (
  cards: Card[],
  groups: Map<string, Card[]>,
) => HandResult | null;

export type Player = {
  id: string;
  hand: Card[];
};
