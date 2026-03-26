import { Card } from "@/card";
import { evaluateHand } from "@/hand";
import { compareResults } from "@/comparator";
import { HandResult, Player } from "@/types";

export interface PlayerFinalResult extends HandResult {
  id: string;
}

export function solveRound(board: Card[], players: Player[]) {
  const results: PlayerFinalResult[] = players.map((p) => ({
    id: p.id,
    ...evaluateHand([...board, ...p.hand]),
  }));

  const sorted = [...results].sort((a, b) => compareResults(b, a));

  const winners = sorted.filter(
    (res) => compareResults(res, sorted[0]) === 0
  );

  return {
    allPlayers: results,
    winners: winners.map((w) => w.id),
  };
}