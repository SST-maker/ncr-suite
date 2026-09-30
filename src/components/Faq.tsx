import { useRef } from "react";
import { Plus } from "lucide-react";
import { FAQ } from "../data";
import { useReveal } from "./useReveal";

export default function Faq() {
  const ref = useRef<HTMLElement>(null);
  useReveal(ref);
  return (
    <section id="faq" ref={ref} aria-labelledby="faq-title" className="bg-white py-24 lg:py-32">
      <div className="mx-auto w-[min(92vw,820px)]">
        <div className="text-center">
          <p className="eyebrow" data-reveal>
            Questions fréquentes
          </p>
          <h2 id="faq-title" data-reveal data-delay="0.05" className="mt-4 text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.06] tracking-[-0.03em]">
            Tout ce qu’il faut savoir.
          </h2>
        </div>
        <div className="mt-12 divide-y divide-slate-200 border-y border-slate-200" data-reveal data-delay="0.1">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 rounded-xl py-5 text-left text-[1.05rem] font-semibold tracking-tight text-ink marker:hidden [&::-webkit-details-marker]:hidden">
                {f.q}
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition duration-300 group-open:rotate-45 group-open:bg-brand group-open:text-white">
                  <Plus size={17} aria-hidden="true" />
                </span>
              </summary>
              <p className="max-w-2xl pb-6 pr-12 leading-relaxed text-slate-600">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
