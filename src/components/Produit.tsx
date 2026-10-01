import { useEffect, useRef, useState } from "react";
import { VERTICALS, verticalStyle } from "../verticals";
import { PANELS } from "../data";
import { gsap, ScrollTrigger, useReveal } from "./useReveal";

export default function Produit({ images, activeVertical, onSelect }: { images: string[] | null; activeVertical: number; onSelect: (index: number) => void }) {
  const ref = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const tiltRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const active = activeVertical + 1;
  const setActive = (index: number) => onSelect(index - 1);
  const [narrow, setNarrow] = useState(false);
  useReveal(ref);

  useEffect(() => {
    const on = () => setNarrow(window.innerWidth < 768);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  // Entrée en perspective pilotée par le scroll
  useEffect(() => {
    if (!stageRef.current || !innerRef.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        innerRef.current,
        { rotateX: 20, y: 80, scale: 0.94 },
        {
          rotateX: 0,
          y: 0,
          scale: 1,
          ease: "none",
          scrollTrigger: { trigger: stageRef.current, start: "top 95%", end: "top 35%", scrub: 0.8 },
        }
      );
    }, stageRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => () => ScrollTrigger.refresh(), []);

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches || !tiltRef.current) return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    tiltRef.current.style.transform = `rotateX(${(-y * 6).toFixed(2)}deg) rotateY(${(x * 10).toFixed(2)}deg)`;
  };
  const onLeave = () => {
    if (tiltRef.current) tiltRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  };

  const onKey = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowLeft", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const next = e.key === "Home" ? 0 : e.key === "End" ? PANELS.length - 1 : (active + (e.key === "ArrowRight" ? 1 : -1) + PANELS.length) % PANELS.length;
    setActive(next);
    document.getElementById(`tab-${next}`)?.focus();
  };

  return (
    <section
      id="produit"
      ref={ref}
      aria-labelledby="produit-title"
      className="relative overflow-hidden bg-night py-24 text-white lg:py-36"
      style={{ ...verticalStyle(activeVertical), background: "radial-gradient(1200px 600px at 50% 0%, var(--vertical-glow) 0%, #05070c 60%), #05070c" }}
    >
      <div className="mx-auto w-[min(92vw,1180px)]">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow !text-[#6aa5ff]" data-reveal>
            Produit
          </p>
          <h2 id="produit-title" data-reveal data-delay="0.05" className="mt-4 text-[clamp(2rem,4.6vw,3.75rem)] font-semibold leading-[1.05] tracking-[-0.035em]">
            Un même ADN. Des outils qui changent.
          </h2>
          <p data-reveal data-delay="0.1" className="mt-5 text-[1.05rem] leading-relaxed text-slate-400 lg:text-lg">
            Un planning de vacations ne ressemble pas à un agenda de salon. Explorez cinq environnements avec leurs priorités, leurs écrans et leur vocabulaire. Mockups illustratifs ; fonctions selon l’offre et les modules.
          </p>
        </div>
      </div>

      {/* Scène 3D de panneaux flottants */}
      <div
        ref={stageRef}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="relative mx-auto mt-14 h-[min(54vw,620px)] max-[819px]:h-[min(104vw,600px)] min-h-[230px] w-full max-w-[1500px] lg:mt-20"
        style={{ perspective: "1800px" }}
      >
        <div ref={tiltRef} className="absolute inset-0 transition-transform duration-500 ease-out" style={{ transformStyle: "preserve-3d" }}>
          <div ref={innerRef} className="absolute inset-0" style={{ transformStyle: "preserve-3d" }}>
            {PANELS.map((p, i) => {
              const off = i - active;
              const a = Math.abs(off);
              return (
                <figure
                  key={p.title}
                  onClick={() => setActive(i)}
                  className={`absolute left-1/2 top-0 m-0 w-[min(84vw,880px)] max-[819px]:w-[min(82vw,480px)] ${a ? "cursor-pointer" : ""}`}
                  style={{
                    transform: `translate3d(calc(-50% + ${off * (narrow ? 40 : 54)}%), ${a * 2.5}%, ${-a * 240}px) rotateY(${-off * (narrow ? 18 : 26)}deg)`,
                    opacity: a > 2 ? 0 : 1 - a * 0.32,
                    zIndex: 10 - a,
                    pointerEvents: a > 2 ? "none" : "auto",
                    transition: "transform 0.95s cubic-bezier(0.2,0.8,0.2,1), opacity 0.7s ease",
                    transformStyle: "preserve-3d",
                    willChange: "transform",
                  }}
                >
                  <div className="relative rounded-[1.2rem] bg-gradient-to-b from-[#3a404d] to-[#14171d] p-[5px] shadow-[0_70px_120px_-30px_rgba(0,0,0,0.9),0_0_0_1px_rgba(255,255,255,0.06)] sm:rounded-[1.5rem] sm:p-[7px]">
                    {images ? (
                      <img
                        src={images[i]}
                        alt={`Illustration des usages NCR Suite — ${p.title}, sans données réelles`}
                        loading="lazy"
                        draggable={false}
                        className="block aspect-[4/5] min-[820px]:aspect-[1.6] w-full rounded-[0.8rem] sm:rounded-[1.05rem]"
                      />
                    ) : (
                      <div className="aspect-[4/5] min-[820px]:aspect-[1.6] w-full rounded-xl bg-slate-800" />
                    )}
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-[5px] rounded-[0.8rem] sm:inset-[7px] sm:rounded-[1.05rem]"
                      style={{ background: "linear-gradient(115deg, rgba(255,255,255,0.14), rgba(255,255,255,0) 35%)" }}
                    />
                  </div>
                </figure>
              );
            })}
          </div>
        </div>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-[10%] -bottom-10 h-24 rounded-[100%] bg-brand/25 blur-3xl"
        />
      </div>

      <div className="mx-auto mt-14 w-[min(92vw,900px)] text-center lg:mt-20">
        <div role="tablist" aria-label="Écrans NCR Suite" onKeyDown={onKey} className="flex flex-wrap items-center justify-center gap-2">
          {PANELS.map((p, i) => (
            <button
              key={p.title}
              role="tab"
              type="button"
              id={`tab-${i}`}
              aria-selected={active === i}
              aria-controls="panel-caption"
              tabIndex={active === i ? 0 : -1}
              onClick={() => setActive(i)}
              style={active === i ? { background: VERTICALS[i - 1]?.soft ?? "#fff", color: VERTICALS[i - 1]?.accent ?? "#25344b" } : undefined}
              className={`rounded-full px-4 py-2 text-[0.88rem] font-medium transition ${
                active === i ? "bg-white text-ink shadow-lg" : "bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-white/10"
              }`}
            >
              {p.title}
            </button>
          ))}
        </div>
        <div id="panel-caption" role="tabpanel" aria-labelledby={`tab-${active}`} aria-live="polite" className="mt-7 min-h-[4.5rem]">
          <h3 className="text-xl font-semibold tracking-tight">{PANELS[active].title}</h3>
          <p className="mx-auto mt-2 max-w-xl text-slate-400">{PANELS[active].text}</p>
          {activeVertical >= 0 && <ul className="mt-5 flex flex-wrap justify-center gap-2">{VERTICALS[activeVertical].features.map(f => <li key={f} className="rounded-full border border-white/15 px-3 py-2 text-xs text-slate-200">{f}</li>)}</ul>}
        </div>
      </div>
    </section>
  );
}
