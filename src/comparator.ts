import { HandResult } from "@/types";

/**
 * Compare deux résultats de main.
 * Retourne > 0 si handA gagne, < 0 si handB gagne, 0 si égalité.
 */
export function compareResults(handA: HandResult, handB: HandResult): number {
  const rankOrder = [
    "High Card",
    "One Pair",
    "Two Pair",
    "Three of a Kind",
    "Straight",
    "Flush",
    "Full House",
    "Four of a Kind",
    "Straight Flush",
  ];

  const scoreA = rankOrder.indexOf(handA.category);
  const scoreB = rankOrder.indexOf(handB.category);

  if (scoreA !== scoreB) return scoreA - scoreB;

  for (let i = 0; i < 5; i++) {
    const valA = handA.chosen5[i].value;
    const valB = handB.chosen5[i].value;

    if (valA !== valB) return valA - valB;
  }

  return 0;
}
