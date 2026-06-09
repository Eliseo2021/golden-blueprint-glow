import { useEffect, useRef, useState } from "react";
import stadiumBg from "@/assets/stadium-bg.jpg";
import { Bracket } from "@/components/Bracket";
import type { Team } from "@/lib/teams";
import { getInitials } from "@/lib/teams";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FIXTURE MUNDIAL FAMILY ACEV2 2026" },
      { name: "description", content: "Simulador interactivo del Fixture del Mundial 2026 — armá tu cuadro como un verdadero DT." },
      { property: "og:title", content: "FIXTURE MUNDIAL FAMILY ACEV2 2026" },
      { property: "og:description", content: "Simulá tu propio bracket del Mundial 2026 al estilo Scaloneta." },
    ],
  }),
  component: App,
});

type Screen = "home" | "simulator" | "share";

function App() {
  const [screen, setScreen] = useState<Screen>("home");
  const [dt, setDt] = useState("");
  const [champion, setChampion] = useState<Team | null>(null);

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-100 antialiased">
      <PortraitLock />
      {screen === "home" && (
        <HomeScreen
          dt={dt}
          setDt={setDt}
          onStart={() => setScreen("simulator")}
        />
      )}
      {screen === "simulator" && (
        <SimulatorScreen
          dt={dt}
          champion={champion}
          onComplete={setChampion}
          onShare={() => setScreen("share")}
        />
      )}
      {screen === "share" && champion && (
        <ShareScreen
          dt={dt}
          champion={champion}
          onBack={() => setScreen("simulator")}
        />
      )}
    </div>
  );
}

/* ---------- Portrait lock ---------- */
function PortraitLock() {
  return (
    <div
      className="fixed inset-0 z-[200] hidden h-screen w-screen flex-col items-center justify-center bg-slate-950 portrait:flex landscape:hidden md:portrait:hidden"
    >
      <style>{`
        @media (orientation: portrait) and (max-width: 900px) {
          body { overflow: hidden; }
          .portrait\\:flex { display: flex !important; }
        }
        @media (orientation: landscape), (min-width: 901px) {
          .portrait\\:flex { display: none !important; }
        }
      `}</style>
      <div className="animate-pulse text-7xl">📲</div>
      <p className="mt-6 max-w-xs px-6 text-center text-base font-semibold text-amber-300">
        Por favor, girá tu dispositivo a posición horizontal para jugar
      </p>
    </div>
  );
}

/* ---------- Screen 1: HOME ---------- */
function HomeScreen({ dt, setDt, onStart }: { dt: string; setDt: (v: string) => void; onStart: () => void }) {
  const [error, setError] = useState(false);

  const submit = () => {
    if (!dt.trim()) {
      setError(true);
      return;
    }
    onStart();
  };

  return (
    <div className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">
      <img
        src={stadiumBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1280}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/85 via-slate-950/75 to-slate-950/95" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(2,6,23,0.9)_100%)]" />

      <div className="relative z-10 flex w-full max-w-2xl flex-col items-center px-6 text-center">
        <div className="mb-3 text-xs font-bold uppercase tracking-[0.5em] text-amber-300/90 italic">
          ★ ★ ★ Family ACE 2026 ★ ★ ★
        </div>
        <h1 className="font-black uppercase leading-[0.95] tracking-tight">
          <span className="block bg-gradient-to-b from-white via-amber-100 to-amber-300 bg-clip-text text-5xl text-transparent drop-shadow-[0_4px_18px_rgba(251,191,36,0.4)] md:text-7xl">
            Fixture Mundial
          </span>
          <span
            className="mt-2 block bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 bg-clip-text text-3xl text-transparent md:text-5xl italic inline-flex items-center gap-3"
          >
            <span className="text-2xl md:text-4xl not-italic">🏆</span>
            Family ACEV2 · 2026
            <span className="text-2xl md:text-4xl not-italic">🏆</span>
          </span>
        </h1>
        <div className="mt-6 max-w-md text-sm text-slate-300 md:text-base leading-relaxed text-center mx-auto">
        <div>
            <p className="mb-2 text-[11px] font-bold tracking-[0.25em] text-cyan-bright">
            ¡POR LA CUARTA, FAMILIA!
            </p>
        </div>
           
          <div className="flex justify-center gap-1 text-xl md:text-2xl my-2" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <span
                key={i}
                className="text-[#fbbf24] drop-shadow-[0_0_8px_#fbbf24]"
                style={{ animation: `star-twinkle 2s ease-in-out ${i * 0.2}s infinite` }}
              >
                ★
              </span>
            ))}
          </div>

          <span className="block">
            Armá tu Fixture Mundial 2026 🏆. Elegí los ganadores partido a partido.
          </span>
          <span className="block">
            Coroná al campeón del mundo. Y 📲 Compartí. Tu Final 🥇
          </span>
        </div>
        <div className="mt-10 w-full max-w-md">
          <label className="mb-2 block text-left text-[11px] font-bold uppercase tracking-[0.3em] text-amber-300">
            DT: Ingresá tu nombre
          </label>
          <input
            type="text"
            value={dt}
            onChange={(e) => {
              setDt(e.target.value);
              if (error) setError(false);
            }}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            placeholder="Tu nombre, Director Técnico"
            className={[
              "w-full rounded-lg border-2 bg-slate-950/70 px-4 py-3 text-base font-semibold text-white placeholder-slate-500 outline-none backdrop-blur",
              "transition focus:border-amber-400 focus:shadow-[0_0_20px_rgba(251,191,36,0.4)]",
              error ? "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.5)]" : "border-amber-400/40",
            ].join(" ")}
            maxLength={40}
          />
          {error && <p className="mt-2 text-left text-xs text-red-400">Ingresá tu nombre para comenzar.</p>}
        </div>

        <button
          onClick={submit}
          className="mt-8 rounded-xl border-2 border-amber-400 bg-gradient-to-b from-amber-400 via-amber-500 to-amber-700 px-10 py-4 text-base font-black uppercase tracking-[0.25em] text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.5)] transition hover:scale-[1.03] hover:shadow-[0_0_45px_rgba(251,191,36,0.8)] active:scale-100"
        >
          Comenzar Ahora ⚽
        </button>
      </div>
    </div>
  );
}

/* ---------- Screen 2: SIMULATOR ---------- */
function SimulatorScreen({
  dt,
  champion,
  onComplete,
  onShare,
}: {
  dt: string;
  champion: Team | null;
  onComplete: (t: Team) => void;
  onShare: () => void;
}) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.7);

  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const sx = vw / 1640;
      const sy = vh / 940;
      setScale(Math.min(sx, sy, 1));
    };
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <div className="relative h-screen w-screen overflow-auto bg-slate-950">
      {/* Background ambient */}
      <div
        className="pointer-events-none fixed inset-0 opacity-30"
        style={{
          backgroundImage: `url(${stadiumBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(8px) brightness(0.4)",
        }}
      />
      <div className="pointer-events-none fixed inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/85 to-slate-950" />

      <div
        ref={wrapperRef}
        className="relative mx-auto"
        style={{
          width: 1640 * scale,
          height: 900 * scale,
        }}
      >
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: 1640,
            height: 900,
          }}
        >
          <Bracket dt={dt} onComplete={onComplete} />
        </div>
      </div>

      {champion && (
        <button
          onClick={onShare}
          className="fixed bottom-6 right-6 z-50 animate-pulse rounded-full border-2 border-amber-300 bg-gradient-to-r from-amber-400 to-amber-600 px-6 py-3 text-sm font-extrabold uppercase tracking-widest text-slate-950 shadow-[0_0_30px_rgba(251,191,36,0.8)] transition hover:scale-105"
        >
          📲 Compartir mi fixture
        </button>
      )}
    </div>
  );
}

/* ---------- Screen 3: SHARE ---------- */
function ShareScreen({ dt, champion, onBack }: { dt: string; champion: Team; onBack: () => void }) {
  const canvasRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden p-6">
      <img
        src={stadiumBg}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950/90 to-slate-950" />

      <div className="relative z-10 flex w-full max-w-xl flex-col items-center">
        <div className="text-xs font-bold uppercase tracking-[0.5em] text-amber-300">¡Fixture completo!</div>
        <h2 className="mt-3 bg-gradient-to-b from-amber-200 to-amber-500 bg-clip-text text-4xl font-black uppercase text-transparent md:text-5xl">
          DT {dt || "Anónimo"}
        </h2>
        <p className="mt-2 text-sm text-slate-300">Tu campeón del Mundial 2026 es:</p>

        <div
          ref={canvasRef}
          id="share-canvas"
          className="mt-8 flex w-full flex-col items-center gap-4 rounded-2xl border-2 border-amber-400 bg-slate-950/90 p-8 shadow-[0_0_50px_rgba(251,191,36,0.4)]"
        >
          <div className="text-7xl drop-shadow-[0_0_25px_rgba(251,191,36,0.6)]">🏆</div>
          <img
            src={`https://flagcdn.com/w160/${champion.code}.png`}
            alt={champion.name}
            className="h-20 w-32 rounded-md object-cover ring-2 ring-amber-400 shadow-[0_0_25px_rgba(251,191,36,0.5)]"
          />
          <div className="text-center">
            <div className="text-3xl font-black uppercase tracking-wider text-amber-300">
              {getInitials(champion.name)} · {champion.name}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.3em] text-amber-200/70">
              Campeón del Mundo
            </div>
          </div>
          <div className="mt-2 text-[10px] uppercase tracking-[0.3em] text-slate-400 italic">
            Fixture Mundial Family ACEV2 2026
          </div>
        </div>

        <div className="mt-8 flex gap-3">
          <button
            onClick={onBack}
            className="rounded-lg border-2 border-amber-400/50 bg-slate-950/80 px-5 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-amber-300 transition hover:bg-slate-900"
          >
            ← Volver al fixture
          </button>
          <button
            className="rounded-lg border-2 border-amber-400 bg-gradient-to-b from-amber-400 to-amber-600 px-6 py-3 text-xs font-extrabold uppercase tracking-[0.2em] text-slate-950 shadow-[0_0_25px_rgba(251,191,36,0.6)] transition hover:scale-105"
            onClick={() => {
              // Hook ready for html2canvas integration in a next phase
              alert("Listo para exportar como imagen (html2canvas) en la próxima fase.");
            }}
          >
            📲 Compartir mi fixture
          </button>
        </div>
      </div>
    </div>
  );
}
