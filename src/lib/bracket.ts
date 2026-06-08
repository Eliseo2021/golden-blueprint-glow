import { worldCup2026Teams, type Team } from "./teams";

export type Match = {
  id: string;
  round: number; // 0=R32, 1=R16, 2=QF, 3=SF, 4=F
  side: "L" | "R" | "C";
  indexInRound: number;
  teamA: Team | null;
  teamB: Team | null;
  winner: Team | null;
};

export type BracketState = {
  rounds: Match[][];
  champion: Team | null;
};

// Standard 32-team seeding pattern (1v32, 16v17, 8v25, ...)
const SEED_PAIRS_LEFT: Array<[number, number]> = [
  [1, 32], [16, 17], [8, 25], [9, 24],
  [4, 29], [13, 20], [5, 28], [12, 21],
];
const SEED_PAIRS_RIGHT: Array<[number, number]> = [
  [2, 31], [15, 18], [7, 26], [10, 23],
  [3, 30], [14, 19], [6, 27], [11, 22],
];

export function getTop32(): Team[] {
  return [...worldCup2026Teams].sort((a, b) => a.fifaRank - b.fifaRank).slice(0, 32);
}

export function createInitialBracket(): BracketState {
  const top32 = getTop32(); // index 0 = seed 1
  const seedOf = (n: number) => top32[n - 1];

  const r32: Match[] = [];
  SEED_PAIRS_LEFT.forEach(([a, b], i) => {
    r32.push({
      id: `r0-${i}`,
      round: 0,
      side: "L",
      indexInRound: i,
      teamA: seedOf(a),
      teamB: seedOf(b),
      winner: null,
    });
  });
  SEED_PAIRS_RIGHT.forEach(([a, b], i) => {
    r32.push({
      id: `r0-${i + 8}`,
      round: 0,
      side: "R",
      indexInRound: i + 8,
      teamA: seedOf(a),
      teamB: seedOf(b),
      winner: null,
    });
  });

  const emptyRound = (round: number, count: number, sideSplit: number): Match[] =>
    Array.from({ length: count }, (_, i) => ({
      id: `r${round}-${i}`,
      round,
      side: round === 4 ? "C" : i < sideSplit ? "L" : "R",
      indexInRound: i,
      teamA: null,
      teamB: null,
      winner: null,
    }));

  return {
    rounds: [
      r32,
      emptyRound(1, 8, 4),
      emptyRound(2, 4, 2),
      emptyRound(3, 2, 1),
      emptyRound(4, 1, 1),
    ],
    champion: null,
  };
}

export function pickWinner(state: BracketState, round: number, matchIdx: number, team: Team): BracketState {
  // Deep clone rounds we'll touch
  const rounds = state.rounds.map((r) => r.map((m) => ({ ...m })));
  let champion = state.champion;

  // Helper: cascade-clear downstream slots if winner changes
  const setMatchWinner = (r: number, idx: number, w: Team | null) => {
    const m = rounds[r][idx];
    if (m.winner?.id === w?.id) return;
    m.winner = w;
    if (r < 4) {
      const childIdx = Math.floor(idx / 2);
      const slot = idx % 2; // 0 = teamA, 1 = teamB
      const child = rounds[r + 1][childIdx];
      if (slot === 0) child.teamA = w;
      else child.teamB = w;
      // Clear child winner if it was previously decided
      if (child.winner && child.winner.id !== w?.id) {
        setMatchWinner(r + 1, childIdx, null);
      }
    } else {
      champion = w;
    }
  };

  setMatchWinner(round, matchIdx, team);
  return { rounds, champion };
}

export function isComplete(state: BracketState): boolean {
  return state.champion !== null;
}

// Probabilistic simulation using strength + championOdds
export function simulateAll(state: BracketState): BracketState {
  let cur = state;
  for (let r = 0; r < 5; r++) {
    cur.rounds[r].forEach((m, idx) => {
      if (!m.teamA || !m.teamB) return;
      const sA = m.teamA.strength + m.teamA.championOdds * 0.5;
      const sB = m.teamB.strength + m.teamB.championOdds * 0.5;
      const pA = sA / (sA + sB);
      const winner = Math.random() < pA ? m.teamA : m.teamB;
      cur = pickWinner(cur, r, idx, winner);
    });
  }
  return cur;
}
