import { useEffect, useRef } from "react";
import { ArrowRight, Check } from "lucide-react";
import { CHAPTERS, TRIAL_URL } from "../data";
import { StoryScene } from "../three/StoryScene";
import { clamp, sstep } from "../three/common";
import { gsap } from "./useReveal";

interface Props {
  effects: boolean;
  views: HTMLCanvasElement[] | null;
  images: string[] | null;
  onFail: () => void;
}

function HeroText({ onDiscover }: { onDiscover: () => void }) {
  return (
    <div className="flex flex-col items-center px-5 text-center">
      <p data-intro className="mb-5 hidden items-center gap-2 [@media(max-height:820px)]:!hidden rounded-full border border-black/5 bg-white/70 px-3.5 py-1.5 text-[0.72rem] font-medium uppercase tracking-[0.14em] text-slate-600 shadow-sm backdrop-blur sm:inline-flex">
        <span className="h-1.5 w-1.5 rounded-full bg-brand" />
        Une suite. Tous vos métiers. Une seule plateforme.
      </p>
      <h1 data-intro className="max-w-4xl text-[clamp(2.2rem,min(6.2vw,7.6vh),5rem)] font-semibold leading-[1.03] tracking-[-0.035em] text-ink">
        Gérez votre métier.
        <br />
        <span className="bg-gradient-to-b from-ink to-slate-500 bg-clip-text text-transparent">Une seule plateforme.</span>
      </h1>
      <p data-intro className="mt-5 max-w-2xl text-[clamp(0.95rem,1.5vw,1.2rem)] leading-relaxed text-slate-600">
        Clients, équipes, planning, documents et facturation : NCR Suite relie vos opérations dans un environnement adapté à votre métier.
      </p>
      <div data-intro className="mt-7 flex w-full max-w-sm flex-col items-stretch gap-3 sm:w-auto sm:max-w-none sm:flex-row sm:items-center">
        <a href={TRIAL_URL} className="btn btn-primary">
          Essai gratuit de 7 jours
          <ArrowRight size={17} aria-hidden="true" />
        </a>
        <button type="button" onClick={onDiscover} className="btn btn-ghost">Explorer la plateforme</button>
      </div>
      <p data-intro className="mt-3 max-w-lg text-xs leading-relaxed text-slate-600">Formation · Sécurité privée · Nettoyage · Restauration · Coiffure-beauté<br />Essai Professionnelle après validation · Sans carte bancaire</p>
      <p className="mt-2 text-[0.65rem] text-slate-500">Interfaces illustratives · Fonctions selon métier et formule</p>
    </div>
  );
}

function ChapterText({ c, i }: { c: (typeof CHAPTERS)[number]; i: number }) {
  return (
    <>
      <p className="eyebrow mb-3">
        Étape {i + 1} / {CHAPTERS.length}
      </p>
      <h2 className="text-[clamp(1.75rem,3.4vw,3.1rem)] font-semibold leading-[1.06] tracking-[-0.03em] text-ink">{c.title}</h2>
      <p className="mt-3 text-[0.98rem] leading-relaxed text-slate-600 lg:mt-4 lg:text-[1.05rem]">{c.text}</p>
      <ul className="mt-5 hidden space-y-2.5 lg:block">
        {c.points.map((p) => (
          <li key={p} className="flex items-center gap-3 text-[0.95rem] font-medium text-slate-800">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Check size={12} strokeWidth={3} aria-hidden="true" />
            </span>
            {p}
          </li>
        ))}
      </ul>
    </>
  );
}

export default function Story({ effects, views, images, onFail }: Props) {
  const secRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const blocks = useRef<(HTMLDivElement | null)[]>([]);
  const dots = useRef<(HTMLButtonElement | null)[]>([]);
  const cueRef = useRef<HTMLDivElement>(null);
  const hudRef = useRef<HTMLDivElement>(null);
  const hudLabel = useRef<HTMLSpanElement>(null);
  const hudBar = useRef<HTMLSpanElement>(null);
  const lastIdx = useRef(-1);

  const go = (i: number) => {
    const sec = secRef.current;
    if (!sec) return;
    if (!effects) {
      document.getElementById(CHAPTERS[i - 1]?.id ?? "gerez")?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
      return;
    }
    const total = sec.offsetHeight - window.innerHeight;
    const top = window.scrollY + sec.getBoundingClientRect().top + (i / 5) * total;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  };

  useEffect(() => {
    if (!effects || !views || !canvasRef.current || !secRef.current) return;
    const sec = secRef.current;
    const update = (s: number) => {
      blocks.current.forEach((el, i) => {
        if (!el) return;
        const op = i === 0 ? 1 - sstep(0.1, 0.4, s) : 1 - sstep(0.2, 0.42, Math.abs(s - i));
        const ty = i === 0 ? -s * 70 : (i - s) * 46;
        el.style.opacity = op.toFixed(3);
        el.style.transform = `translate3d(0,${ty.toFixed(1)}px,0)`;
        el.style.pointerEvents = op > 0.5 ? "auto" : "none";
        el.toggleAttribute("inert", op < 0.5);
      });
      const cur = Math.round(s);
      dots.current.forEach((d, i) => d && (d.dataset.on = String(i === cur)));
      if (cueRef.current) cueRef.current.style.opacity = (1 - sstep(0.02, 0.22, s)).toFixed(3);
      if (hudRef.current) hudRef.current.style.opacity = sstep(0.35, 0.8, s).toFixed(3);
      if (hudBar.current) hudBar.current.style.transform = `scaleX(${(s / 5).toFixed(4)})`;
      if (hudLabel.current && cur !== lastIdx.current) {
        lastIdx.current = cur;
        hudLabel.current.textContent = cur === 0 ? "Introduction" : `0${cur} — ${CHAPTERS[cur - 1].title}`;
      }
    };
    let scene: StoryScene | null = null;
    try {
      scene = new StoryScene({
        canvas: canvasRef.current,
        views,
        mobile: window.innerWidth < 1024,
        getHeroBottom: () => {
          const el = blocks.current[0];
          const par = el?.parentElement as HTMLElement | null;
          return el && par ? par.offsetTop + el.offsetTop + el.offsetHeight : 0;
        },
        getProgress: () => {
          const r = sec.getBoundingClientRect();
          return clamp(-r.top / Math.max(1, r.height - window.innerHeight), 0, 1);
        },
        onFrame: update,
      });
    } catch (e) {
      console.warn("WebGL indisponible, version statique activée.", e);
      onFail();
      return;
    }
    const io = new IntersectionObserver(([e]) => scene?.setActive(e.isIntersecting), { rootMargin: "100px" });
    io.observe(sec);
    update(0);
    const cv = canvasRef.current;
    const raf = requestAnimationFrame(() => {
      cv.style.opacity = "1";
    });
    const intro = blocks.current[0]
      ? gsap.from(blocks.current[0].querySelectorAll("[data-intro]"), {
          y: 34,
          opacity: 0,
          duration: 1.1,
          stagger: 0.1,
          delay: 0.2,
          ease: "power3.out",
          clearProps: "transform,opacity",
        })
      : null;
    return () => {
      cancelAnimationFrame(raf);
      intro?.kill();
      io.disconnect();
      scene?.dispose();
    };
  }, [effects, views, onFail]);

  /* ---------- Version statique / simplifiée (sans WebGL) ---------- */
  if (!effects) {
    return (
      <section id="plateforme" ref={secRef} aria-label="Présentation de la plateforme" className="relative">
        <div className="relative overflow-hidden bg-gradient-to-b from-[#fbfcfe] to-[#eef2f9] pb-16 pt-28 lg:pt-36">
          <HeroText onDiscover={() => go(1)} />
          <div className="mx-auto mt-14 w-[min(92vw,1000px)]">
            <div className="rounded-[1.6rem] bg-[#14171d] p-2.5 shadow-[0_50px_100px_-30px_rgba(16,24,40,0.45)] sm:p-3.5">
              {images ? (
                <img src={images[0]} alt="Illustration du poste de pilotage NCR Suite, sans données réelles" className="aspect-[1.6] w-full rounded-2xl" />
              ) : (
                <div className="aspect-[1.6] w-full rounded-2xl bg-slate-100" />
              )}
            </div>
          </div>
        </div>
        {CHAPTERS.map((c, i) => (
          <div key={c.id} id={c.id} className={i % 2 ? "bg-[#f4f6fa]" : "bg-white"}>
            <div
              className={`mx-auto grid max-w-6xl items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:gap-16 lg:py-24 ${
                i % 2 ? "lg:[&>*:first-child]:order-2" : ""
              }`}
            >
              <div>
                <ChapterText c={c} i={i} />
              </div>
              <div className="rounded-[1.4rem] bg-[#14171d] p-2 shadow-[0_40px_80px_-30px_rgba(16,24,40,0.4)] sm:p-3">
                {images ? (
                  <img src={images[c.view]} alt={`Illustration NCR Suite — ${c.title}, sans données réelles`} loading="lazy" className="aspect-[1.6] w-full rounded-xl" />
                ) : (
                  <div className="aspect-[1.6] w-full rounded-xl bg-slate-100" />
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    );
  }

  /* ---------- Version 3D immersive ---------- */
  return (
    <section id="plateforme" ref={secRef} aria-label="Présentation de la plateforme" className="relative" style={{ height: `${100 + 5 * 95}svh` }}>
      <div className="sticky top-0 h-[100svh] w-full overflow-hidden bg-gradient-to-b from-[#fbfcfe] via-[#f3f6fb] to-[#e9eef7]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full transition-opacity duration-[1400ms] ease-out"
          style={{ opacity: 0 }}
          aria-hidden="true"
        />

        <div className="pointer-events-none absolute inset-x-0 top-0 pt-[5.5rem] lg:pt-28 [@media(max-height:820px)]:lg:!pt-24">
          <div ref={(el) => { blocks.current[0] = el; }} className="will-change-transform">
            <HeroText onDiscover={() => go(1)} />
          </div>
        </div>

        {CHAPTERS.map((c, i) => (
          <div
            key={c.id}
            id={c.id}
            className={`pointer-events-none absolute inset-x-4 bottom-5 lg:inset-x-auto lg:bottom-auto lg:top-1/2 lg:-translate-y-1/2 lg:w-[min(28vw,420px)] ${
              i % 2 === 0 ? "lg:left-[5vw]" : "lg:right-[5vw]"
            }`}
          >
            <div
              ref={(el) => { blocks.current[i + 1] = el; if (el) el.inert = true; }}
              className="glass-m rounded-3xl p-5 opacity-0 will-change-transform sm:p-6 lg:p-0"
            >
              <ChapterText c={c} i={i} />
            </div>
          </div>
        ))}

        <div ref={cueRef} aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-5 flex flex-col items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-slate-500">
          Faire défiler
          <span className="relative block h-9 w-px overflow-hidden bg-slate-300">
            <span className="absolute inset-x-0 top-0 h-3 animate-[cue_1.8s_ease-in-out_infinite] bg-brand" />
          </span>
        </div>

        <div
          ref={hudRef}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-6 left-1/2 hidden w-[min(340px,40vw)] -translate-x-1/2 flex-col items-center gap-2.5 opacity-0 lg:flex"
        >
          <span ref={hudLabel} className="text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-slate-600" />
          <span className="block h-[3px] w-full overflow-hidden rounded-full bg-slate-300/60">
            <span ref={hudBar} className="block h-full origin-left rounded-full bg-brand" style={{ transform: "scaleX(0)" }} />
          </span>
        </div>

        <nav aria-label="Séquences" className="absolute right-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-3 lg:flex">
          {[0, ...CHAPTERS.map((_, i) => i + 1)].map((i) => (
            <button
              key={i}
              ref={(el) => { dots.current[i] = el; }}
              type="button"
              onClick={() => go(i)}
              aria-label={i === 0 ? "Introduction" : CHAPTERS[i - 1].title}
              className="group flex h-4 w-4 items-center justify-center"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-400/60 transition-all duration-300 group-data-[on=true]:h-3 group-data-[on=true]:w-1.5 group-data-[on=true]:bg-brand group-hover:bg-brand" />
            </button>
          ))}
        </nav>
      </div>
    </section>
  );
}
