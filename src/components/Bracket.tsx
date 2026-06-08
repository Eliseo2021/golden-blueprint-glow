import { useMemo, useState } from "react";
import { type BracketState, type Match, createInitialBracket, isComplete, pickWinner, simulateAll } from "@/lib/bracket";
import { getInitials, type Team } from "@/lib/teams";
import confetti from "canvas-confetti";

const CANVAS_W = 1640;
const CANVAS_H = 900;
const CARD_W = 168;
const CARD_H = 60;

const ROUND_LABELS = ["FASE DE 32", "OCTAVOS", "CUARTOS", "SEMIFINAL", "FINAL"];

function getMatchPos(round: number, side: "L" | "R" | "C", idxInSide: number): { x: number; y: number } {
  if (round === 4) return { x: 820, y: 410 };
  const xCols = side === "L" ? [105, 290, 480, 660] : [1535, 1350, 1160, 980];
  const x = xCols[round];
  const ys: number[][] = [
    [80, 180, 280, 380, 480, 580, 680, 780],
    [130, 330, 530, 730],
    [230, 630],
    [430, 430],
  ];
  return { x, y: ys[round][idxInSide] };
}

function getSideIdx(match: Match): number {
  if (match.round === 0) return match.side === "L" ? match.indexInRound : match.indexInRound - 8;
  if (match.round === 1) return match.side === "L" ? match.indexInRound : match.indexInRound - 4;
  if (match.round === 2) return match.side === "L" ? match.indexInRound : match.indexInRound - 2;
  if (match.round === 3) return match.indexInRound;
  return 0;
}

function TeamSlot({
  team,
  isWinner,
  isLoser,
  onClick,
  disabled,
}: {
  team: Team | null;
  isWinner: boolean;
  isLoser: boolean;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      title={team?.name ?? ""}
      disabled={disabled || !team}
      onClick={onClick}
      className={[
        "group flex h-[26px] w-full items-center gap-1.5 rounded-[4px] px-1.5 text-[10px] font-bold uppercase tracking-wider transition-all",
        "border border-amber-400/20 bg-slate-900/85",
        team ? "cursor-pointer hover:bg-slate-800 hover:border-amber-400/60" : "cursor-default opacity-50",
        isWinner ? "ring-2 ring-amber-400 shadow-[0_0_14px_rgba(251,191,36,0.65)] bg-slate-800 border-amber-400" : "",
        isLoser ? "opacity-40 grayscale" : "",
      ].join(" ")}
    >
      {team ? (
        <>
          <img
            src={`https://flagcdn.com/w40/${team.code}.png`}
            alt={team.name}
            width={18}
            height={12}
            className="h-[12px] w-[18px] flex-shrink-0 rounded-sm object-cover ring-1 ring-black/40"
            loading="lazy"
          />
          <span className={isWinner ? "text-amber-200" : "text-slate-200"}>{getInitials(team.name)}</span>
        </>
      ) : (
        <span className="text-slate-600">--</span>
      )}
    </button>
  );
}

function MatchCard({
  match,
  label,
  onPick,
  pos,
}: {
  match: Match;
  label?: string;
  onPick: (team: Team) => void;
  pos: { x: number; y: number };
}) {
  const winnerId = match.winner?.id;
  return (
    <div
      className="absolute"
      style={{
        left: pos.x - CARD_W / 2,
        top: pos.y - CARD_H / 2,
        width: CARD_W,
        height: CARD_H,
      }}
    >
      {label && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-amber-400/40 bg-slate-950/80 px-2 py-[1px] text-[8px] font-bold uppercase tracking-[0.15em] text-amber-300/90">
          {label}
        </div>
      )}
      <div className="flex h-full flex-col gap-[3px] rounded-md border border-amber-400/30 bg-slate-950/60 p-[3px] shadow-[0_0_18px_rgba(2,6,23,0.8)]">
        <TeamSlot
          team={match.teamA}
          isWinner={!!winnerId && winnerId === match.teamA?.id}
          isLoser={!!winnerId && winnerId !== match.teamA?.id}
          onClick={() => match.teamA && onPick(match.teamA)}
        />
        <TeamSlot
          team={match.teamB}
          isWinner={!!winnerId && winnerId === match.teamB?.id}
          isLoser={!!winnerId && winnerId !== match.teamB?.id}
          onClick={() => match.teamB && onPick(match.teamB)}
        />
      </div>
    </div>
  );
}

function ChampionCard({ champion }: { champion: Team | null }) {
  return (
    <div
      className="absolute flex flex-col items-center"
      style={{ left: 820 - 95, top: 700, width: 190 }}
    >
      <div className="mb-1 text-[10px] font-extrabold uppercase tracking-[0.3em] text-amber-300">Campeón</div>
      <div
        className={[
          "flex h-16 w-full items-center justify-center gap-2 rounded-lg border-2 bg-slate-950/80 p-2 shadow-[0_0_25px_rgba(251,191,36,0.4)]",
          champion ? "border-amber-400 shadow-[0_0_35px_rgba(251,191,36,0.8)]" : "border-amber-400/40",
        ].join(" ")}
      >
        {champion ? (
          <>
            <img
              src={`https://flagcdn.com/w80/${champion.code}.png`}
              alt={champion.name}
              className="h-8 w-12 rounded-sm object-cover ring-1 ring-amber-400"
            />
            <div className="flex flex-col leading-tight">
              <span className="text-base font-extrabold text-amber-300">{getInitials(champion.name)}</span>
              <span className="text-[9px] uppercase tracking-wider text-amber-200/80">{champion.name}</span>
            </div>
          </>
        ) : (
          <span className="text-3xl text-amber-400/70">👑 ?</span>
        )}
      </div>
    </div>
  );
}

function Connectors({ bracket }: { bracket: BracketState }) {
  const paths: string[] = [];

  // For rounds 1..3, each child has 2 parents in (round-1) same side
  for (let r = 1; r <= 3; r++) {
    bracket.rounds[r].forEach((m) => {
      const sideIdx = getSideIdx(m);
      const childPos = getMatchPos(r, m.side, sideIdx);
      const parentSideIdx0 = sideIdx * 2;
      const parentSideIdx1 = sideIdx * 2 + 1;
      const p0 = getMatchPos(r - 1, m.side, parentSideIdx0);
      const p1 = getMatchPos(r - 1, m.side, parentSideIdx1);

      const dir = m.side === "L" ? 1 : -1; // L: child is to the right of parent
      const parentEdgeX = (p: { x: number }) => p.x + dir * (CARD_W / 2);
      const childEdgeX = childPos.x - dir * (CARD_W / 2);
      const midX = (parentEdgeX(p0) + childEdgeX) / 2;

      for (const p of [p0, p1]) {
        paths.push(`M ${parentEdgeX(p)} ${p.y} H ${midX} V ${childPos.y} H ${childEdgeX}`);
      }
    });
  }

  // Final (round 4) - parents are SF[0] (L) and SF[1] (R)
  const finalPos = getMatchPos(4, "C", 0);
  const sfL = getMatchPos(3, "L", 0);
  const sfR = getMatchPos(3, "R", 0);
  // L parent → final left edge
  {
    const parentEdge = sfL.x + CARD_W / 2;
    const finalEdge = finalPos.x - CARD_W / 2;
    const mid = (parentEdge + finalEdge) / 2;
    paths.push(`M ${parentEdge} ${sfL.y} H ${mid} V ${finalPos.y} H ${finalEdge}`);
  }
  {
    const parentEdge = sfR.x - CARD_W / 2;
    const finalEdge = finalPos.x + CARD_W / 2;
    const mid = (parentEdge + finalEdge) / 2;
    paths.push(`M ${parentEdge} ${sfR.y} H ${mid} V ${finalPos.y} H ${finalEdge}`);
  }

  // Final → Champion
  paths.push(`M ${finalPos.x} ${finalPos.y + CARD_H / 2} V 700`);

  return (
    <svg
      className="pointer-events-none absolute inset-0"
      width={CANVAS_W}
      height={CANVAS_H}
      viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
    >
      <defs>
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {paths.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke="#f59e0b"
          strokeWidth={2}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter="url(#goldGlow)"
          opacity={0.9}
        />
      ))}
    </svg>
  );
}

function roundLabelFor(match: Match): string | undefined {
  if (match.round === 0) return undefined; // R32 has team list look
  if (match.round === 1) {
    const n = match.indexInRound + 1;
    return `OCTAVOS ${n}`;
  }
  if (match.round === 2) {
    const n = match.indexInRound + 1;
    return `CUARTOS ${n}`;
  }
  if (match.round === 3) return "SEMIFINAL";
  if (match.round === 4) return "FINAL · CAMPEÓN DEL MUNDO";
  return undefined;
}

export function Bracket({
  onComplete,
  dt,
}: {
  onComplete: (champion: Team) => void;
  dt: string;
}) {
  const [bracket, setBracket] = useState<BracketState>(() => createInitialBracket());

const triggerCelebration = () => {
    const duration = 3 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function () {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      // Confetti dorado, blanco y celeste
      const colors = ['#fbbf24', '#ffffff', '#38bdf8'];

      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }, colors }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }, colors }));
    }, 250);
  };

const handlePick = (round: number, matchIdx: number, team: Team) => {
    const next = pickWinner(bracket, round, matchIdx, team);
    setBracket(next);
    if (isComplete(next) && next.champion) {
      triggerCelebration(); // Dispara el efecto
      onComplete(next.champion);
    }
  };

  const handleReset = () => setBracket(createInitialBracket());
  
  const handleRandom = () => {
    const next = simulateAll(createInitialBracket());
    setBracket(next);
    if (next.champion) {
      triggerCelebration(); // Dispara el efecto también si es aleatorio
      onComplete(next.champion);
    }
  };
  
  const allMatches = useMemo(() => bracket.rounds.flat(), [bracket]);

  return (
    <div className="relative" style={{ width: CANVAS_W, height: CANVAS_H }}>
      {/* Stadium background glow */}
      <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,0.08),transparent_60%),radial-gradient(ellipse_at_top,rgba(251,191,36,0.06),transparent_50%)]" />

      {/* Side labels */}
      <div className="absolute left-6 top-4 text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
        Fase de 32
      </div>
      <div className="absolute right-6 top-4 text-xs font-extrabold uppercase tracking-[0.3em] text-amber-300">
        Fase de 32
      </div>

      {/* Header center */}
      <div className="absolute left-1/2 top-2 -translate-x-1/2 text-center">
        <div className="text-[11px] font-bold uppercase tracking-[0.4em] text-amber-300 italic">
          ★★★ FAMILY ACE 2026 ★★★
        </div>
        <div className="mt-1 font-black uppercase leading-none tracking-wider">
          <span className="bg-gradient-to-b from-amber-200 via-amber-400 to-amber-600 bg-clip-text text-3xl text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
            ⚽ FIXTURE MUNDIAL
          </span>
        </div>
        <div className="text-[10px] font-semibold uppercase tracking-[0.3em] text-amber-200/80">
          FAMILY · 2026
        </div>
      </div>

      {/* DT badge */}
      <div className="absolute right-6 top-12 rounded-lg border border-amber-400/40 bg-slate-950/80 px-3 py-1.5 text-xs">
        <span className="font-bold uppercase tracking-wider text-amber-300">DT: </span>
        <span className="font-semibold text-slate-100">{dt || "—"}</span>
      </div>

      {/* Trophy decoration */}
      <div className="absolute left-1/2 top-[130px] -translate-x-1/2 text-[80px] leading-none opacity-90 drop-shadow-[0_0_30px_rgba(251,191,36,0.5)]">
        🏆
      </div>

      <Connectors bracket={bracket} />

      {/* Match cards */}
      {allMatches.map((m) => {
        const sideIdx = getSideIdx(m);
        const pos = getMatchPos(m.round, m.side, sideIdx);
        return (
          <MatchCard
            key={m.id}
            match={m}
            label={roundLabelFor(m)}
            pos={pos}
            onPick={(team) => handlePick(m.round, m.indexInRound, team)}
          />
        );
      })}

      {/* Champion */}
      <ChampionCard champion={bracket.champion} />

      {/* Action buttons */}
      <div className="absolute left-1/2 top-[820px] flex -translate-x-1/2 gap-3">
        <button
          type="button"
          onClick={handleReset}
          className="rounded-md border-2 border-amber-400/60 bg-slate-950/90 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300 transition hover:bg-slate-900 hover:shadow-[0_0_15px_rgba(251,191,36,0.4)]"
        >
          Reiniciar
        </button>
        <button
          type="button"
          onClick={handleRandom}
          className="rounded-md border-2 border-amber-400 bg-gradient-to-b from-amber-500 to-amber-700 px-5 py-2 text-xs font-extrabold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_18px_rgba(251,191,36,0.6)] transition hover:from-amber-400 hover:to-amber-600"
        >
          Aleatorio (Fiel a la Scaloneta)
        </button>
      </div>

      {/* Round headers for L side */}
      {ROUND_LABELS.slice(1, 4).map((label, i) => {
        const round = i + 1;
        const pos = getMatchPos(round, "L", 0);
        return (
          <div
            key={`hL-${i}`}
            className="absolute -translate-x-1/2 text-[9px] font-extrabold uppercase tracking-[0.25em] text-sky-300/70"
            style={{ left: pos.x, top: 50 }}
          >
            {label}
          </div>
        );
      })}
      {ROUND_LABELS.slice(1, 4).map((label, i) => {
        const round = i + 1;
        const pos = getMatchPos(round, "R", 0);
        return (
          <div
            key={`hR-${i}`}
            className="absolute -translate-x-1/2 text-[9px] font-extrabold uppercase tracking-[0.25em] text-sky-300/70"
            style={{ left: pos.x, top: 50 }}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
}
