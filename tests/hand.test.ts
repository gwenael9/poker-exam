import { Card } from "@/card";
import { evaluateHand } from "@/hand";
import { describe, expect, it } from "vitest";

describe("One Pair", () => {
    const cards = [
        new Card("A", "spades"), new Card("A", "hearts"),
        new Card("K", "diamonds"), new Card("9", "clubs"),
        new Card("7", "spades"), new Card("5", "hearts"),
        new Card("3", "diamonds"),
    ];

    it("should detect a pair", () => {
        const result = evaluateHand(cards);
        expect(result.category).toBe("One Pair");
    });

    it("chosen5 should be: pair first, then 3 kickers descending", () => {
        const result = evaluateHand(cards);
        expect(result.chosen5.map(c => c.rank)).toEqual(["A", "A", "K", "9", "7"]);
    });
});