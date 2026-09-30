import { useCallback, useEffect, useState } from "react";
import Header from "./components/Header";
import Story from "./components/Story";
import Metiers from "./components/Metiers";
import Produit from "./components/Produit";
import Avantages from "./components/Avantages";
import Faq from "./components/Faq";
import Final from "./components/Final";
import Footer from "./components/Footer";
import { isCompact } from "./three/common";
import { buildMobileView, buildView, VIEW_COUNT } from "./three/ui";

function webglAvailable() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function maxTextureSize() {
  try {
    const gl = document.createElement("canvas").getContext("webgl2") || document.createElement("canvas").getContext("webgl");
    if (gl) return gl.getParameter(gl.MAX_TEXTURE_SIZE) as number;
  } catch {
    /* valeur par défaut */
  }
  return 4096;
}

/** Échelle de dessin des écrans de bureau (base 1024×640) : 3x = 3072×1920 px, au-delà du Full HD. */
function desktopScale() {
  return Math.max(1.5, Math.min(3, maxTextureSize() / 1024));
}

/** Échelle des écrans mobiles (base 480×600) : ~1200×1500 px, calée sur la densité de l'appareil pour éviter tout flou de mipmap. */
function mobileScale() {
  const dpr = window.devicePixelRatio || 1;
  return Math.max(1.75, Math.min(dpr >= 3 ? 2.6 : 2.2, maxTextureSize() / 600));
}

interface Assets {
  views: HTMLCanvasElement[];
  images: string[] | null;
}

const tick = () => new Promise<void>((r) => setTimeout(r, 0));
const toUrl = (c: HTMLCanvasElement) =>
  new Promise<string>((res) =>
    c.toBlob((b) => res(b ? URL.createObjectURL(b) : c.toDataURL("image/jpeg", 0.92)), "image/jpeg", 0.92)
  );

export default function App() {
  const [effects, setEffects] = useState(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    return !reduced && webglAvailable();
  });
  const [assets, setAssets] = useState<Assets | null>(null);
  const [compact, setCompact] = useState(() => isCompact());

  // bascule portrait/paysage ou redimensionnement : on régénère l'interface adaptée
  useEffect(() => {
    const on = () => setCompact(isCompact());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);

  // Les interfaces sont dessinées une fois les polices chargées
  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      try {
        const fonts = document.fonts;
        if (fonts) {
          await Promise.race([
            Promise.all([400, 500, 600, 700, 800].map((w) => fonts.load(`${w} 16px Inter`))),
            new Promise((r) => setTimeout(r, 2500)),
          ]);
        }
      } catch {
        /* polices système en repli */
      }
      if (cancelled) return;
      // un écran par tâche : pas de long blocage du thread principal
      const views: HTMLCanvasElement[] = [];
      if (compact) {
        const ms = mobileScale();
        for (let i = 0; i < VIEW_COUNT; i++) {
          views.push(buildMobileView(i, ms));
          await tick();
          if (cancelled) return;
        }
        setAssets({ views, images: null });
        // images du site (galerie, version statique) : format bureau, générées une à une puis libérées
        const images: string[] = [];
        for (let i = 0; i < VIEW_COUNT; i++) {
          images.push(await toUrl(buildView(i, 1.75)));
          if (cancelled) return;
        }
        setAssets({ views, images });
      } else {
        const scale = desktopScale();
        for (let i = 0; i < VIEW_COUNT; i++) {
          views.push(buildView(i, scale));
          await tick();
          if (cancelled) return;
        }
        setAssets({ views, images: null });
        const images = await Promise.all(views.map(toUrl));
        if (!cancelled) setAssets({ views, images });
      }
    };
    run();
    return () => {
      cancelled = true;
    };
  }, [compact]);

  const fail = useCallback(() => setEffects(false), []);

  return (
    <>
      <Header effects={effects} onToggle={() => setEffects((v) => !v)} />
      <main id="contenu">
        <Story effects={effects} views={assets?.views ?? null} images={assets?.images ?? null} onFail={fail} />
        <Metiers />
        <Produit images={assets?.images ?? null} />
        <Avantages />
        <Faq />
        <Final effects={effects} views={assets?.views ?? null} onFail={fail} />
      </main>
      <Footer />
    </>
  );
}
