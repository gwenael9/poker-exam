import { describe, it, expect } from "vitest";
import { Card } from "@/card";
import { evaluateHand } from "@/hand";
import { compareResults } from "@/comparator";

describe("Comparator - Clear Winners", () => {
  it("should rank Flush higher than One Pair with 7 cards available", () => {
    const board = [
      new Card("2", "spades"),
      new Card("2", "hearts"),
      new Card("3", "clubs"),
      new Card("J", "diamonds"),
      new Card("10", "hearts"),
    ];

    const p1 = evaluateHand([
      ...board,
      new Card("2", "diamonds"),
      new Card("3", "spades"),
    ]);
    const p2 = evaluateHand([
      ...board,
      new Card("A", "hearts"),
      new Card("K", "hearts"),
    ]);

    expect(p1.category).toBe("Full House");
    expect(p2.category).toBe("One Pair");
    expect(compareResults(p1, p2)).toBeGreaterThan(0);
  });

  it("should decide by lower pair in Two Pair tie-break (same high pair)", () => {
    const board = [
      new Card("A", "spades"),
      new Card("K", "hearts"),
      new Card("8", "diamonds"),
      new Card("7", "clubs"),
      new Card("2", "spades"),
    ];

    const handA = evaluateHand([
      ...board,
      new Card("A", "hearts"),
      new Card("8", "clubs"),
    ]);

    const handB = evaluateHand([
      ...board,
      new Card("A", "diamonds"),
      new Card("7", "hearts"),
    ]);

    expect(compareResults(handA, handB)).toBeGreaterThan(0);
  });

  it("should decide by kicker in One Pair tie-break (same pair)", () => {
    const board = [
      new Card("K", "spades"),
      new Card("Q", "hearts"),
      new Card("J", "diamonds"),
      new Card("5", "clubs"),
      new Card("2", "spades"),
    ];

    const handA = evaluateHand([
      ...board,
      new Card("K", "hearts"),
      new Card("10", "spades"),
    ]);

    const handB = evaluateHand([
      ...board,
      new Card("K", "diamonds"),
      new Card("9", "hearts"),
    ]);

    expect(compareResults(handA, handB)).toBeGreaterThan(0);
  });
});

describe("Comparator - Split Pots (Equal Hands)", () => {
  it("should result in a tie when kicker is on the board for Four of a Kind", () => {
    const board = [
      new Card("8", "spades"),
      new Card("8", "hearts"),
      new Card("8", "diamonds"),
      new Card("8", "clubs"),
      new Card("A", "spades"),
    ];

    const p1 = evaluateHand([
      ...board,
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ]);
    const p2 = evaluateHand([
      ...board,
      new Card("4", "hearts"),
      new Card("5", "diamonds"),
    ]);

    expect(compareResults(p1, p2)).toBe(0);
    expect(p1.chosen5.map((c) => c.rank)).toEqual(["8", "8", "8", "8", "A"]);
  });

  it("should result in a tie for identical hands with different suits", () => {
    const board = [
      new Card("2", "spades"),
      new Card("4", "hearts"),
      new Card("6", "diamonds"),
      new Card("8", "clubs"),
      new Card("10", "spades"),
    ];

    const p1 = evaluateHand([
      ...board,
      new Card("A", "spades"),
      new Card("K", "hearts"),
    ]);

    const p2 = evaluateHand([
      ...board,
      new Card("A", "diamonds"),
      new Card("K", "clubs"),
    ]);

    expect(compareResults(p1, p2)).toBe(0);
  });
});
