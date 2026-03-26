import { Card } from "@/card";
import { Category } from "./types";

type HandResult = {
  category: Category;
  chosen5: Card[];
};

function sortDesc(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => b.value - a.value);
}

function sortGroupsDesc(groups: Map<string, Card[]>): Card[][] {
  return sortDesc([...groups.values()].map(g => g[0]))
    .map(c => groups.get(c.rank) ?? []);
}

function groupByRank(cards: Card[]): Map<string, Card[]> {
  const groups = new Map<string, Card[]>();
  for (const card of cards) {
    const group = groups.get(card.rank) ?? [];
    group.push(card);
    groups.set(card.rank, group);
  }
  return groups;
}

function defaultResult(cards: Card[]): HandResult {
    return {
        category: "High Card",
        chosen5: sortDesc(cards).slice(0, 5),
    };
} 

function detectOnePair(cards: Card[], groups: Map<string, Card[]>): HandResult | null {
  const pairs = sortGroupsDesc(groups).filter(g => g.length === 2);
  if (pairs.length === 0) return null;

  const bestPairRank = pairs[0][0].rank;
  const kickers = sortDesc(cards.filter(c => c.rank !== bestPairRank)).slice(0, 3);

  return {
    category: "One Pair",
    chosen5: [...pairs[0], ...kickers],
  };
}

function detectTwoPair(cards: Card[], groups: Map<string, Card[]>): HandResult | null {
  const pairs = sortGroupsDesc(groups).filter(g => g.length >= 2);
  console.log("pairs2", pairs)
  if (pairs.length < 2) return null;

  const usedRanks = new Set([pairs[0][0].rank, pairs[1][0].rank]);
  const kicker = sortDesc(cards.filter(c => !usedRanks.has(c.rank)))[0];

  return {
    category: "Two Pair",
    chosen5: [...pairs[0], ...pairs[1], kicker],
  };
}


export function evaluateHand(cards: Card[]): HandResult {
    const groups = groupByRank(cards);
    return (
        detectTwoPair(cards, groups) ??
        detectOnePair(cards, groups) ??
        defaultResult(cards)
    );
}