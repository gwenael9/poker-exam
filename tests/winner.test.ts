import { Card } from "@/card";
import { Player } from "@/types";
import { solveRound } from "@/winner";
import { describe, expect, it } from "vitest";

describe("Global Engine - solveRound", () => {
  it("should detect a tie (split pot) when the board plays", () => {
    const board = [
      new Card("5", "spades"),
      new Card("6", "hearts"),
      new Card("7", "diamonds"),
      new Card("8", "clubs"),
      new Card("9", "spades"),
    ];

    const players: Player[] = [
      {
        id: "1",
        hand: [new Card("A", "hearts"), new Card("A", "diamonds")],
      },
      {
        id: "2",
        hand: [new Card("K", "hearts"), new Card("Q", "diamonds")],
      },
    ];

    const outcome = solveRound(board, players);
    expect(outcome.winners).toEqual(["1", "2"]);

    expect(outcome.allPlayers[0].category).toBe("Straight");
    expect(outcome.allPlayers[0].chosen5.map((c) => c.rank)).toEqual([
      "9",
      "8",
      "7",
      "6",
      "5",
    ]);
  });
});

describe("Global Engine - Unique Winner", () => {
  it("should determine a single winner based on a better Full House", () => {
    const board = [
      new Card("10", "spades"),
      new Card("10", "hearts"),
      new Card("2", "diamonds"),
      new Card("2", "clubs"),
      new Card("5", "spades"),
    ];

    const players: Player[] = [
      {
        id: "1",
        hand: [new Card("10", "diamonds"), new Card("3", "spades")],
      },
      {
        id: "2",
        hand: [new Card("2", "spades"), new Card("A", "hearts")],
      },
    ];

    const outcome = solveRound(board, players);
    expect(outcome.winners).toEqual(["1"]);
  });

  it("should determine a single winner with a higher Straight Flush (Royal Flush)", () => {
    const board = [
      new Card("10", "hearts"),
      new Card("J", "hearts"),
      new Card("Q", "hearts"),
      new Card("2", "spades"),
      new Card("3", "diamonds"),
    ];

    const players: Player[] = [
      {
        id: "1",
        hand: [new Card("K", "hearts"), new Card("A", "hearts")],
      },
      {
        id: "2",
        hand: [new Card("9", "hearts"), new Card("8", "hearts")],
      },
    ];

    const outcome = solveRound(board, players);
    expect(outcome.winners).toEqual(["1"]);
    expect(outcome.allPlayers.find((p) => p.id === "1")?.category).toBe(
      "Straight Flush",
    );
  });

  it("should determine a winner by the 5th card (3rd kicker) in One Pair", () => {
    const board = [
      new Card("8", "spades"),
      new Card("8", "hearts"),
      new Card("10", "diamonds"),
      new Card("4", "clubs"),
      new Card("2", "spades"),
    ];

    const players: Player[] = [
      {
        id: "1",
        hand: [new Card("A", "hearts"), new Card("J", "diamonds")],
      },
      {
        id: "2",
        hand: [new Card("A", "spades"), new Card("9", "clubs")],
      },
    ];

    const outcome = solveRound(board, players);
    expect(outcome.winners).toEqual(["1"]);
  });

  it("should handle 3 players", () => {
    const board = [
      new Card("A", "spades"),
      new Card("K", "spades"),
      new Card("Q", "spades"),
      new Card("2", "hearts"),
      new Card("3", "diamonds"),
    ];

    const players = [
      { id: "1", hand: [new Card("J", "spades"), new Card("10", "spades")] },
      { id: "2", hand: [new Card("5", "hearts"), new Card("4", "diamonds")] },
      { id: "3", hand: [new Card("7", "clubs"), new Card("8", "clubs")] },
    ];

    const outcome = solveRound(board, players);
    expect(outcome.winners).toEqual(["1"]);
    expect(outcome.allPlayers).toHaveLength(3);
  });
});
