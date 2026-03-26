import { Card } from "@/card";
import { Detector, HandResult } from "@/types";
import { defaultResult, groupByRank } from "./util";
import {
  detectStraight,
  detectThreeOfAKind,
  detectTwoPair,
  detectOnePair,
} from "./detector";

const detectors: Detector[] = [
  detectStraight,
  detectThreeOfAKind,
  detectTwoPair,
  detectOnePair,
];

export function evaluateHand(cards: Card[]): HandResult {
  const groups = groupByRank(cards);

  for (const detect of detectors) {
    const result = detect(cards, groups);
    if (result) return result;
  }

  return defaultResult(cards);
}
