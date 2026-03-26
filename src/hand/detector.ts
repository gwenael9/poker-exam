import { Card } from "@/card";
import { selectKickers, sortDesc, sortGroupsDesc } from "./util";
import { HandResult } from "@/types";

export function detectOnePair(
  cards: Card[],
  groups: Map<string, Card[]>,
): HandResult | null {
  const pairs = sortGroupsDesc(groups).filter((g) => g.length === 2);
  if (pairs.length === 0) return null;

  const bestPairRank = pairs[0][0].rank;
  const kickers = selectKickers(cards, new Set([bestPairRank]), 3);

  return {
    category: "One Pair",
    chosen5: [...pairs[0], ...kickers],
  };
}

export function detectTwoPair(
  cards: Card[],
  groups: Map<string, Card[]>,
): HandResult | null {
  const pairs = sortGroupsDesc(groups).filter((g) => g.length >= 2);
  if (pairs.length < 2) return null;

  const usedRanks = new Set([pairs[0][0].rank, pairs[1][0].rank]);
  const kickers = selectKickers(cards, usedRanks, 1);

  return {
    category: "Two Pair",
    chosen5: [...pairs[0], ...pairs[1], ...kickers],
  };
}

export function detectThreeOfAKind(
  cards: Card[],
  groups: Map<string, Card[]>,
): HandResult | null {
  const triplets = sortGroupsDesc(groups).filter((g) => g.length === 3);
  if (triplets.length === 0) return null;

  const bestTripletRank = triplets[0][0].rank;
  const kickers = selectKickers(cards, new Set([bestTripletRank]), 2);

  return {
    category: "Three of a Kind",
    chosen5: [...triplets[0], ...kickers],
  };
}

export function detectStraight(cards: Card[]): HandResult | null {
  const sorted = sortDesc(cards);

  // cas particulier : on vérifie si on a A, 2, 3, 4, 5
  const hasAce = sorted.some((c) => c.rank === "A");
  if (hasAce) {
    const wheelRanks = ["5", "4", "3", "2", "A"];
    const wheelCards = wheelRanks.map((r) => sorted.find((c) => c.rank === r));
    if (wheelCards.every(Boolean)) {
      return {
        category: "Straight",
        chosen5: wheelCards as Card[],
      };
    }
  }

  // cas général : on cherche 5 cartes consécutives
  for (let i = 0; i <= sorted.length - 5; i++) {
    const candidateStraight = sorted.slice(i, i + 5);
    const isConsecutive = candidateStraight.every(
      (c, j) => j === 0 || c.value === candidateStraight[j - 1].value - 1,
    );
    if (isConsecutive) {
      return {
        category: "Straight",
        chosen5: candidateStraight,
      };
    }
  }

  return null;
}
