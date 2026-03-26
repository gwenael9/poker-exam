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

describe("Straight", () => {
  it("should detect a straight", () => {
    const cards = [
      new Card("9", "spades"),
      new Card("8", "hearts"),
      new Card("7", "diamonds"),
      new Card("6", "clubs"),
      new Card("5", "spades"),
      new Card("A", "hearts"),
      new Card("K", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Straight");
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "9",
      "8",
      "7",
      "6",
      "5",
    ]);
  });

  it("should detect an ace-high straight", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("K", "hearts"),
      new Card("Q", "diamonds"),
      new Card("J", "clubs"),
      new Card("10", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Straight");
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "K",
      "Q",
      "J",
      "10",
    ]);
  });

  it("should detect an ace-low straight (wheel A-2-3-4-5)", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
      new Card("4", "clubs"),
      new Card("5", "spades"),
      new Card("9", "hearts"),
      new Card("K", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Straight");
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "5",
      "4",
      "3",
      "2",
      "A",
    ]);
  });

  it("should pick the best straight when multiple are possible", () => {
    const cards = [
      new Card("9", "spades"),
      new Card("8", "hearts"),
      new Card("7", "diamonds"),
      new Card("6", "clubs"),
      new Card("5", "spades"),
      new Card("4", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "9",
      "8",
      "7",
      "6",
      "5",
    ]);
  });
});

describe("Flush", () => {
  it("should detect a flush", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("K", "spades"),
      new Card("Q", "spades"),
      new Card("J", "spades"),
      new Card("9", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Flush");
  });

  it("chosen5 should be the top 5 cards of the flush suit", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("K", "spades"),
      new Card("Q", "spades"),
      new Card("J", "spades"),
      new Card("9", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "K",
      "Q",
      "J",
      "9",
    ]);
  });
});

describe("Full House", () => {
  it("should detect a full house", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("A", "hearts"),
      new Card("A", "diamonds"),
      new Card("K", "clubs"),
      new Card("K", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Full House");
  });

  it("chosen5 should be the triplet and the pair", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("A", "hearts"),
      new Card("A", "diamonds"),
      new Card("K", "clubs"),
      new Card("K", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "A",
      "A",
      "K",
      "K",
    ]);
  });
});

describe("Four of a Kind", () => {
  it("should detect four of a kind", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("A", "hearts"),
      new Card("A", "diamonds"),
      new Card("A", "clubs"),
      new Card("K", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Four of a Kind");
  });

  it("chosen5 should be the four of a kind and the highest kicker", () => {
    const cards = [
      new Card("A", "spades"),
      new Card("A", "hearts"),
      new Card("A", "diamonds"),
      new Card("A", "clubs"),
      new Card("K", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "A",
      "A",
      "A",
      "K",
    ]);
  });
});

describe("Straight Flush", () => {
  it("should detect a straight flush", () => {
    const cards = [
      new Card("9", "spades"),
      new Card("8", "spades"),
      new Card("7", "spades"),
      new Card("6", "spades"),
      new Card("5", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Straight Flush");
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "9",
      "8",
      "7",
      "6",
      "5",
    ]);
  });

  it("should detect ace-high straight flush", () => {
    const cards = [
      new Card("A", "hearts"),
      new Card("K", "hearts"),
      new Card("Q", "hearts"),
      new Card("J", "hearts"),
      new Card("10", "hearts"),
      new Card("2", "clubs"),
      new Card("3", "diamonds"),
    ];
    const result = evaluateHand(cards);
    expect(result.category).toBe("Straight Flush");
    expect(result.chosen5.map((c) => c.rank)).toEqual([
      "A",
      "K",
      "Q",
      "J",
      "10",
    ]);
  });
});
