import { Card } from '@/card';
import { describe, it, expect } from 'vitest'

describe("Card", () => {
  it("should create a card with a rank and a suit", () => {
    const card = new Card("A", "clubs");
    expect(card.rank).toBe("A");
  });

  it("should have a numeric value — Ace is highest", () => {
    const ace = new Card("A", "diamonds");
    const king = new Card("K", "hearts");
    expect(ace.value).toBeGreaterThan(king.value);
  });

  it("should have a numeric value — 3 is highest", () => {
    const two = new Card("2", "spades");
    const three = new Card("3", "clubs");
    expect(two.value).toBeLessThan(three.value);
  });
});