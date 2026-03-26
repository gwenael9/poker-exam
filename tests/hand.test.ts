import { Card } from "@/card";
import { evaluateHand } from "@/hand";
import { describe, expect, it } from "vitest";

describe("One Pair", () => {
  const cards = [
    new Card("A", "spades"),
    new Card("A", "hearts"),
    new Card("K", "diamonds"),
    new Card("9", "clubs"),
    new Card("7", "spades"),
    new Card("5", "hearts"),
    new Card("3", "diamonds"),
  ];

  it("should detect a pair", () => {
    const result = evaluateHand(cards);
    expect(result.category).toBe("One Pair");
  });

  it("chosen5 should be: pair first, then 3 kickers descending", () => {
    const result = evaluateHand(cards);
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "A",
      "K",
      "9",
      "7",
    ]);
  });
});

describe("Two Pair", () => {
  it("should detect two pair", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("A", "hearts"),
      new Card("K", "diamonds"),
      new Card("K", "clubs"),
      new Card("9", "spades"),
      new Card("5", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Two Pair");
  });

  it("chosen5 should be: higher pair, lower pair, then best kicker", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("A", "hearts"),
      new Card("K", "diamonds"),
      new Card("K", "clubs"),
      new Card("9", "spades"),
      new Card("5", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "A",
      "K",
      "K",
      "9",
    ]);
  });

  it("should pick the best two pairs when 3 pairs are available", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("A", "hearts"),
      new Card("K", "diamonds"),
      new Card("K", "clubs"),
      new Card("9", "spades"),
      new Card("9", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "A",
      "K",
      "K",
      "9",
    ]);
  });
});

describe("Three of a Kind", () => {
  const cards = [
    new Card("A", "spades"),
    new Card("A", "hearts"),
    new Card("A", "diamonds"),
    new Card("K", "clubs"),
    new Card("9", "spades"),
    new Card("5", "hearts"),
    new Card("3", "diamonds"),
  ];

  it("should detect three of a kind", () => {
    const result = evaluateHand(cards);
    expect(result.category).toBe("Three of a Kind");
  });

  it("chosen5 should be: triplet first, then 2 kickers descending", () => {
    const result = evaluateHand(cards);
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "A",
      "A",
      "K",
      "9",
    ]);
  });
});
