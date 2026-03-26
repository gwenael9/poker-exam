import { Card } from "@/card";
import { HandResult } from "@/types";

export function sortDesc(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => b.value - a.value);
}

export function sortGroupsDesc(groups: Map<string, Card[]>): Card[][] {
  return [...groups.entries()]
    .sort(([, a], [, b]) => b[0].value - a[0].value)
    .map(([, group]) => group);
}

export function groupByRank(cards: Card[]): Map<string, Card[]> {
  const groups = new Map<string, Card[]>();
  for (const card of cards) {
    const group = groups.get(card.rank) ?? [];
    group.push(card);
    groups.set(card.rank, group);
  }
  return groups;
}

export function selectKickers(
  cards: Card[],
  excludeRanks: Set<string>,
  count: number,
): Card[] {
  return sortDesc(cards.filter((c) => !excludeRanks.has(c.rank))).slice(
    0,
    count,
  );
}

export function defaultResult(cards: Card[]): HandResult {
  return {
    category: "High Card",
    chosen5: sortDesc(cards).slice(0, 5),
  };
}