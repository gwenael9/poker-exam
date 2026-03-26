import { Card } from "@/card";

type HandResult = {
  category: string;
  chosen5: Card[];
};

function sortDesc(cards: Card[]): Card[] {
  return [...cards].sort((a, b) => b.value - a.value);
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

// function detectOnePair(cards: Card[]): HandResult | null {
//   const groups = groupByRank(cards);
//   const pairs = [...groups.values()].filter(g => g.length === 2);
//   if (pairs.length === 0) return null;

//   const bestPair = sortDesc(pairs.map(p => p[0])).map(c => groups.get(c.rank) ?? [])[0];
//   const kickers = sortDesc(cards.filter(c => c.rank !== bestPair[0].rank)).slice(0, 3);

//   return {
//     category: "One Pair",
//     chosen5: [...bestPair, ...kickers],
//   };
// }

function detectOnePair(cards: Card[]): HandResult | null {
  const groups = groupByRank(cards);
  const pairs = [...groups.values()].filter(g => g.length === 2);
  
  if (pairs.length === 0) return null;

  const pairsSortedByRank = sortDesc(pairs.map(p => p[0]));
  const bestPairRank = pairsSortedByRank[0].rank;
  const bestPair = groups.get(bestPairRank) ?? [];
  const kickers = sortDesc(cards.filter(c => c.rank !== bestPairRank)).slice(0, 3);

  return {
    category: "One Pair",
    chosen5: [...bestPair, ...kickers],
  };
}


export function evaluateHand(cards: Card[]): HandResult {
  return detectOnePair(cards) ?? defaultResult(cards);
}