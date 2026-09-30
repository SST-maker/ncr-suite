import { LOGO } from "../logoGeometry";

/* Dessin des interfaces NCR Suite (canvas 2D) — utilisées comme textures WebGL et comme images */

export const C = {
  bg: "#f4f6fa",
  line: "#e8ebf2",
  ink: "#0b0d12",
  sub: "#4b5565",
  mute: "#8a93a3",
  blue: "#0a6cff",
  blueSoft: "#e7f0ff",
  green: "#12b76a",
  greenSoft: "#dcfae6",
  greenInk: "#067647",
  amber: "#f79009",
  amberSoft: "#fef0c7",
  amberInk: "#b54708",
  violet: "#7a5af8",
  violetSoft: "#ebe9fe",
  red: "#f04438",
};

const FONT = '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
type Ctx = CanvasRenderingContext2D;
let SC = 2;

function mk(w: number, h: number, scale: number) {
  const c = document.createElement("canvas");
  c.width = Math.round(w * scale);
  c.height = Math.round(h * scale);
  const ctx = c.getContext("2d")!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  (ctx as unknown as { textRendering: string }).textRendering = "geometricPrecision";
  (ctx as unknown as { fontKerning: string }).fontKerning = "normal";
  ctx.scale(scale, scale);
  SC = scale;
  return { c, ctx };
}

function f(ctx: Ctx, size: number, weight = 500) {
  ctx.font = `${weight} ${size}px ${FONT}`;
}
function t(ctx: Ctx, s: string, x: number, y: number, size = 12, weight = 500, color = C.ink, align: CanvasTextAlign = "left") {
  f(ctx, size, weight);
  ctx.fillStyle = color;
  ctx.textAlign = align;
  ctx.textBaseline = "middle";
  ctx.fillText(s, x, y);
}
function tw(ctx: Ctx, s: string, size: number, weight = 500) {
  f(ctx, size, weight);
  return ctx.measureText(s).width;
}
function rr(ctx: Ctx, x: number, y: number, w: number, h: number, r: number, fill?: string, stroke?: string, lw = 1) {
  ctx.beginPath();
  ctx.roundRect(x, y, w, h, r);
  if (fill) {
    ctx.fillStyle = fill;
    ctx.fill();
  }
  if (stroke) {
    ctx.strokeStyle = stroke;
    ctx.lineWidth = lw;
    ctx.stroke();
  }
}
function card(ctx: Ctx, x: number, y: number, w: number, h: number, r = 14, big = false) {
  ctx.save();
  ctx.shadowColor = big ? "rgba(16,24,40,0.24)" : "rgba(16,24,40,0.05)";
  ctx.shadowBlur = (big ? 34 : 10) * SC;
  ctx.shadowOffsetY = (big ? 16 : 2) * SC;
  rr(ctx, x, y, w, h, r, "#ffffff");
  ctx.restore();
  rr(ctx, x + 0.5, y + 0.5, w - 1, h - 1, r, undefined, C.line);
}
function avatar(ctx: Ctx, cx: number, cy: number, r: number, ini: string, color: string) {
  ctx.beginPath();
  ctx.arc(cx, cy, r, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  ctx.lineWidth = 2;
  ctx.strokeStyle = "#fff";
  ctx.stroke();
  t(ctx, ini, cx, cy + 0.5, r * 0.78, 600, "#fff", "center");
}
function pill(ctx: Ctx, s: string, x: number, y: number, fg: string, bg: string, size = 10.5) {
  const w = tw(ctx, s, size, 600) + 16;
  rr(ctx, x, y - 10, w, 20, 10, bg);
  t(ctx, s, x + 8, y + 0.5, size, 600, fg);
  return w;
}
function check(ctx: Ctx, cx: number, cy: number, s: number, color: string, lw = 2.2) {
  ctx.beginPath();
  ctx.moveTo(cx - s * 0.5, cy);
  ctx.lineTo(cx - s * 0.12, cy + s * 0.38);
  ctx.lineTo(cx + s * 0.55, cy - s * 0.38);
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.stroke();
}
function spark(ctx: Ctx, data: number[], x: number, y: number, w: number, h: number, color: string, fill = false, lw = 2) {
  const min = Math.min(...data);
  const max = Math.max(...data);
  const pts = data.map((v, i) => [x + (w * i) / (data.length - 1), y + h - ((v - min) / (max - min || 1)) * h]);
  const path = () => {
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) {
      const [px, py] = pts[i - 1];
      const [cx, cy] = pts[i];
      const mx = (px + cx) / 2;
      ctx.bezierCurveTo(mx, py, mx, cy, cx, cy);
    }
  };
  if (fill) {
    path();
    ctx.lineTo(x + w, y + h);
    ctx.lineTo(x, y + h);
    ctx.closePath();
    const g = ctx.createLinearGradient(0, y, 0, y + h);
    g.addColorStop(0, color + "38");
    g.addColorStop(1, color + "00");
    ctx.fillStyle = g;
    ctx.fill();
  }
  path();
  ctx.strokeStyle = color;
  ctx.lineWidth = lw;
  ctx.lineCap = "round";
  ctx.stroke();
  return pts[pts.length - 1];
}
export function drawMark(ctx: Ctx, x: number, y: number, h: number, ink: string, accent: string) {
  const { slope, barW, barH, radius, topY, midY, midX, botY, dot, cut, yMin, yMax } = LOGO;
  const k = h / (yMax - yMin);
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(k, k);
  ctx.translate(0, -yMin);
  ctx.fillStyle = ink;
  const bar = (yy: number, x0: number, notch: boolean) => {
    ctx.save();
    if (notch) {
      // l'espace libre autour du point échancre la barre centrale
      ctx.beginPath();
      ctx.rect(-50, -50, 400, 500);
      ctx.moveTo(dot.x + cut, dot.y);
      ctx.arc(dot.x, dot.y, cut, 0, Math.PI * 2);
      ctx.clip("evenodd");
    }
    ctx.transform(1, -slope, 0, 1, 0, 0);
    ctx.beginPath();
    ctx.roundRect(x0, yy, barW - x0, barH, radius);
    ctx.fill();
    ctx.restore();
  };
  bar(topY, 0, false);
  bar(midY, midX, true);
  bar(botY, 0, false);
  ctx.beginPath();
  ctx.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.restore();
}

function navIcon(ctx: Ctx, i: number, x: number, y: number, color: string) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 1.6;
  ctx.lineCap = "round";
  if (i === 0) {
    for (let a = 0; a < 2; a++) for (let b = 0; b < 2; b++) rr(ctx, x + a * 8, y + b * 8, 6, 6, 1.5, color);
  } else if (i === 1) {
    ctx.beginPath();
    ctx.arc(x + 7, y + 4, 3.2, 0, Math.PI * 2);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + 7, y + 14, 6, Math.PI * 1.1, Math.PI * 1.9);
    ctx.stroke();
  } else if (i === 2) {
    rr(ctx, x, y + 1, 14, 13, 3, undefined, color, 1.6);
    ctx.beginPath();
    ctx.moveTo(x, y + 6);
    ctx.lineTo(x + 14, y + 6);
    ctx.stroke();
  } else if (i === 3) {
    rr(ctx, x + 1.5, y, 11, 14, 2.5, undefined, color, 1.6);
    ctx.beginPath();
    ctx.moveTo(x + 4.5, y + 5);
    ctx.lineTo(x + 9.5, y + 5);
    ctx.moveTo(x + 4.5, y + 9);
    ctx.lineTo(x + 9.5, y + 9);
    ctx.stroke();
  } else if (i === 4) {
    t(ctx, "€", x + 7, y + 7.5, 15, 700, color, "center");
  } else {
    rr(ctx, x, y + 7, 3.5, 7, 1.2, color);
    rr(ctx, x + 5.2, y + 3, 3.5, 11, 1.2, color);
    rr(ctx, x + 10.4, y, 3.5, 14, 1.2, color);
  }
}

function shell(ctx: Ctx, active: number, title: string) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, 1024, 640);
  // sidebar
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, 168, 640);
  ctx.fillStyle = C.line;
  ctx.fillRect(168, 0, 1, 640);
  drawMark(ctx, 18, 16, 28, C.ink, C.blue);
  t(ctx, "NCR", 48, 31, 15, 800, C.ink);
  t(ctx, "Suite", 48 + tw(ctx, "NCR", 15, 800) + 4, 31, 15, 400, C.blue);
  const items = ["Tableau de bord", "Clients", "Planning", "Documents", "Facturation", "Statistiques"];
  items.forEach((s, i) => {
    const y = 76 + i * 36;
    const on = i === active || (active === 5 && i === 5);
    if (on) rr(ctx, 10, y - 4, 148, 32, 9, C.blueSoft);
    navIcon(ctx, i, 24, y + 4, on ? C.blue : C.mute);
    t(ctx, s, 50, y + 12, 12.5, on ? 600 : 500, on ? C.blue : C.sub);
  });
  rr(ctx, 12, 572, 144, 52, 12, C.bg);
  avatar(ctx, 34, 598, 14, "EQ", C.blue);
  t(ctx, "Votre équipe", 54, 592, 11, 600, C.ink);
  t(ctx, "Administrateur", 54, 607, 9.5, 400, C.mute);
  // topbar
  ctx.fillStyle = "#fff";
  ctx.fillRect(169, 0, 855, 60);
  ctx.fillStyle = C.line;
  ctx.fillRect(169, 60, 855, 1);
  t(ctx, title, 192, 31, 17, 700);
  rr(ctx, 590, 17, 200, 28, 14, C.bg);
  ctx.beginPath();
  ctx.arc(608, 31, 4.5, 0, Math.PI * 2);
  ctx.strokeStyle = C.mute;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  t(ctx, "VUE ILLUSTRATIVE", 622, 31.5, 10, 600, C.sub);
  rr(ctx, 806, 17, 28, 28, 14, C.bg);
  ctx.beginPath();
  ctx.arc(820, 31, 3.5, 0, Math.PI * 2);
  ctx.fillStyle = C.mute;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(827, 24, 3.2, 0, Math.PI * 2);
  ctx.fillStyle = C.red;
  ctx.fill();
  rr(ctx, 846, 16, 158, 30, 15, C.blue);
  t(ctx, "+ Nouvelle fiche", 925, 31.5, 12, 600, "#fff", "center");
}

/* ------------------------------ VUES ------------------------------ */

function viewDashboard(ctx: Ctx) {
  shell(ctx, 0, "Tableau de bord");
  t(ctx, "Votre activité", 192, 92, 22, 700);
  t(ctx, "Voici l’activité de votre entreprise aujourd’hui.", 192, 116, 12.5, 400, C.sub);
  const kp: [string, string, string, string, number[]][] = [
    ["Chiffre d’affaires", "—", "—", C.green, [3, 4, 3.6, 5, 4.8, 6, 7.2]],
    ["Clients actifs", "—", "Suivi", C.blue, [2, 2.5, 3, 3.1, 4, 4.2, 5]],
    ["Interventions", "—", "—", C.violet, [5, 3, 4.5, 4, 6, 5.5, 7]],
    ["Factures en attente", "—", "À suivre", C.amber, [6, 5, 5.5, 4, 4.5, 3.5, 3.8]],
  ];
  const w = 193.5;
  kp.forEach(([label, val, d, col, data], i) => {
    const x = 188 + i * (w + 14);
    card(ctx, x, 140, w, 96);
    t(ctx, label, x + 16, 162, 11, 500, C.sub);
    t(ctx, val, x + 16, 192, 23, 700);
    const soft = col === C.green ? C.greenSoft : col === C.amber ? C.amberSoft : col === C.violet ? C.violetSoft : C.blueSoft;
    const fg = col === C.green ? C.greenInk : col === C.amber ? C.amberInk : col;
    pill(ctx, d, x + 16, 218, fg, soft, 10);
    spark(ctx, data, x + w - 72, 184, 56, 26, col, false, 2);
  });
  // chart
  card(ctx, 188, 252, 500, 360);
  t(ctx, "Chiffre d’affaires", 208, 278, 14, 700);
  t(ctx, "12 derniers mois", 208, 298, 11, 400, C.mute);
  rr(ctx, 556, 266, 118, 26, 8, C.bg);
  rr(ctx, 560, 269, 34, 20, 6, "#fff", C.line);
  t(ctx, "7 j", 577, 279.5, 10.5, 600, C.ink, "center");
  t(ctx, "30 j", 613, 279.5, 10.5, 500, C.mute, "center");
  t(ctx, "12 m", 652, 279.5, 10.5, 500, C.mute, "center");
  const gx = 252, gy = 330, gw = 420, gh = 230;
  for (let i = 0; i <= 4; i++) {
    const y = gy + (gh * i) / 4;
    ctx.fillStyle = C.line;
    ctx.fillRect(gx, y, gw, 1);
    t(ctx, "—", gx - 14, y, 10, 500, C.mute, "right");
  }
  const mo = ["Jan", "Fév", "Mar", "Avr", "Mai", "Juin", "Juil", "Août", "Sep", "Oct", "Nov", "Déc"];
  mo.forEach((m, i) => i % 2 === 0 && t(ctx, m, gx + (gw * i) / 11, gy + gh + 18, 10, 500, C.mute, "center"));
  const end = spark(ctx, [22, 28, 26, 34, 31, 40, 38, 47, 44, 53, 50, 60], gx, gy + 14, gw, gh - 14, C.blue, true, 2.6);
  ctx.beginPath();
  ctx.arc(end[0], end[1], 5.5, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.lineWidth = 2.6;
  ctx.strokeStyle = C.blue;
  ctx.stroke();
  rr(ctx, end[0] - 78, end[1] - 6, 70, 24, 8, C.ink);
  t(ctx, "—", end[0] - 43, end[1] + 6.5, 11, 600, "#fff", "center");
  // tasks
  card(ctx, 702, 252, 302, 360);
  t(ctx, "Aujourd’hui", 722, 278, 14, 700);
  pill(ctx, "Suivi", 932, 278, C.blue, C.blueSoft, 10);
  const tasks: [string, string, string, string][] = [
    ["09:30", "Rendez-vous client", "Suivi de session", C.blue],
    ["11:00", "Validation du devis", "— · Dossier commercial", C.violet],
    ["14:00", "Intervention Site d’intervention", "Prestation programmée", C.green],
    ["16:30", "Suivi des factures", "Documents à suivre", C.amber],
  ];
  tasks.forEach(([time, title, sub, col], i) => {
    const y = 308 + i * 74;
    rr(ctx, 722, y, 262, 62, 12, C.bg);
    rr(ctx, 730, y + 12, 3.5, 38, 2, col);
    t(ctx, time, 746, y + 17, 10.5, 600, col);
    t(ctx, title, 746, y + 34, 12.5, 650);
    t(ctx, sub, 746, y + 50, 10.5, 400, C.sub);
  });
}

function viewClients(ctx: Ctx) {
  shell(ctx, 1, "Clients");
  t(ctx, "Tous les clients", 192, 92, 22, 700);
  t(ctx, "Fiches, documents et suivi client", 192, 116, 12.5, 400, C.sub);
  const chips = ["Tous", "Actifs", "Prospects", "À relancer"];
  let cx = 640;
  chips.forEach((s, i) => {
    const w = tw(ctx, s, 11.5, 600) + 24;
    rr(ctx, cx, 80, w, 28, 14, i === 0 ? C.ink : "#fff", i === 0 ? undefined : C.line);
    t(ctx, s, cx + w / 2, 94.5, 11.5, 600, i === 0 ? "#fff" : C.sub, "center");
    cx += w + 8;
  });
  card(ctx, 188, 140, 816, 472);
  ctx.fillStyle = C.bg;
  ctx.fillRect(189, 141, 814, 38);
  [["Client", 212], ["Secteur", 470], ["Dernier échange", 590], ["Statut", 730]].forEach(([s, x]) =>
    t(ctx, s as string, x as number, 160, 10.5, 600, C.mute)
  );
  t(ctx, "Chiffre d’affaires", 984, 160, 10.5, 600, C.mute, "right");
  const rows: [string, string, string, string, string, string, string][] = [
    ["Dossier client", "Coordonnées du dossier", "Formation", "Hier", "Actif", "—", C.blue],
    ["Prospect", "Coordonnées du dossier", "Coiffure", "Il y a 2 j", "Prospect", "—", C.violet],
    ["Dossier commercial", "Coordonnées du dossier", "Sécurité", "Aujourd’hui", "Actif", "—", C.green],
    ["Client restauration", "Coordonnées du dossier", "Restauration", "Il y a 3 j", "Actif", "—", C.amber],
    ["Site client", "Coordonnées du dossier", "Nettoyage", "Il y a 1 sem.", "En attente", "—", "#0891b2"],
    ["Organisme formation", "Coordonnées du dossier", "Formation", "Hier", "Actif", "—", "#db2777"],
    ["Site d’intervention", "Coordonnées du dossier", "Nettoyage", "Il y a 4 j", "Actif", "—", "#475467"],
    ["Client salon", "Coordonnées du dossier", "Coiffure", "Il y a 5 j", "Prospect", "—", "#ea580c"],
  ];
  rows.forEach(([name, mail, sec, last, st, amt, col], i) => {
    const y = 180 + i * 53;
    if (i > 0) {
      ctx.fillStyle = C.line;
      ctx.fillRect(189, y, 814, 1);
    }
    const cy = y + 26.5;
    avatar(ctx, 226, cy, 15, name.split(" ").map((w) => w[0]).slice(0, 2).join(""), col);
    t(ctx, name, 250, cy - 7, 12.5, 650);
    t(ctx, mail, 250, cy + 9, 10.5, 400, C.mute);
    t(ctx, sec, 470, cy, 12, 500, C.sub);
    t(ctx, last, 590, cy, 12, 500, C.sub);
    const [fg, bg] = st === "Actif" ? [C.greenInk, C.greenSoft] : st === "Prospect" ? [C.blue, C.blueSoft] : [C.amberInk, C.amberSoft];
    pill(ctx, st, 730, cy, fg, bg);
    t(ctx, amt, 984, cy, 12.5, 650, C.ink, "right");
  });
}

function viewPlanning(ctx: Ctx) {
  shell(ctx, 2, "Planning");
  t(ctx, "Planning de la semaine", 192, 92, 22, 700);
  t(ctx, "Sessions, vacations et rendez-vous", 192, 116, 12.5, 400, C.sub);
  ["Jour", "Semaine", "Mois"].forEach((s, i) => {
    const x = 820 + i * 62;
    rr(ctx, x, 80, 56, 28, 14, i === 1 ? C.ink : "#fff", i === 1 ? undefined : C.line);
    t(ctx, s, x + 28, 94.5, 11.5, 600, i === 1 ? "#fff" : C.sub, "center");
  });
  const X = 188, Y = 136, W = 816, H = 476;
  card(ctx, X, Y, W, H);
  const tc = 54, cw = (W - tc) / 5, hh = 40, rh = (H - hh) / 9;
  ["Lun 9", "Mar 10", "Mer 11", "Jeu 12", "Ven 13"].forEach((d, i) => {
    const cxx = X + tc + cw * i + cw / 2;
    if (i === 2) {
      rr(ctx, cxx - 34, Y + 9, 68, 24, 12, C.blue);
      t(ctx, d, cxx, Y + 21.5, 11.5, 650, "#fff", "center");
    } else t(ctx, d, cxx, Y + 21.5, 11.5, 600, C.sub, "center");
  });
  for (let r = 0; r <= 9; r++) {
    const y = Y + hh + r * rh;
    ctx.fillStyle = C.line;
    ctx.fillRect(X + 1, y, W - 2, 1);
    if (r < 9) t(ctx, `${8 + r}:00`, X + tc - 10, y + 10, 10, 500, C.mute, "right");
  }
  for (let i = 1; i < 5; i++) {
    ctx.fillStyle = C.line;
    ctx.fillRect(X + tc + cw * i, Y + hh, 1, H - hh - 1);
  }
  const ev: [number, number, number, string, string, string, string][] = [
    [0, 9, 1.5, "Session de formation", "Suivi de session", C.blue, C.blueSoft],
    [0, 14, 1, "Appel prospect", "Nouveau prospect", C.violet, C.violetSoft],
    [1, 8.5, 2, "Prestation sur site", "Équipe terrain", C.greenInk, C.greenSoft],
    [1, 13, 1.5, "Réunion d’équipe", "Équipe", C.amberInk, C.amberSoft],
    [2, 10, 1.25, "Signature contrat", "Dossier commercial", C.violet, C.violetSoft],
    [2, 14.5, 1.5, "Préparation du service", "Restauration", C.blue, C.blueSoft],
    [3, 9, 2.5, "Session de formation", "Session 2 sur 3", C.greenInk, C.greenSoft],
    [3, 14, 1, "Validation du devis", "À valider", C.amberInk, C.amberSoft],
    [4, 11, 1.5, "Point trésorerie", "Direction", C.blue, C.blueSoft],
    [4, 14.5, 1.75, "Prestation de nettoyage", "Équipe affectée", C.greenInk, C.greenSoft],
  ];
  ev.forEach(([d, s, dur, title, sub, fg, bg]) => {
    const x = X + tc + cw * d + 6;
    const y = Y + hh + (s - 8) * rh + 3;
    const h = dur * rh - 6;
    rr(ctx, x, y, cw - 12, h, 9, bg);
    rr(ctx, x, y + 6, 3.5, h - 12, 2, fg);
    t(ctx, title, x + 13, y + 15, 10.5, 650, C.ink);
    if (h > 40) t(ctx, sub, x + 13, y + 30, 9.5, 400, C.sub);
  });
  const ny = Y + hh + 3.75 * rh;
  ctx.fillStyle = C.red;
  ctx.fillRect(X + tc, ny, W - tc - 1, 1.6);
  ctx.beginPath();
  ctx.arc(X + tc, ny + 0.8, 4, 0, Math.PI * 2);
  ctx.fill();
}

function viewDocuments(ctx: Ctx) {
  shell(ctx, 3, "Documents");
  t(ctx, "Documents & automatisations", 192, 92, 22, 700);
  card(ctx, 188, 120, 816, 84);
  const steps: [string, string][] = [
    ["Devis envoyé", "Document lié"],
    ["Accepté par le client", "Signature en ligne"],
    ["Facture générée", "Automatique"],
    ["Suivi du dossier", "Historique"],
  ];
  steps.forEach(([a, b], i) => {
    const cx = 188 + 28 + i * 204;
    ctx.beginPath();
    ctx.arc(cx + 14, 162, 15, 0, Math.PI * 2);
    ctx.fillStyle = i === 3 ? C.blue : C.blueSoft;
    ctx.fill();
    check(ctx, cx + 14, 162, 12, i === 3 ? "#fff" : C.blue);
    t(ctx, a, cx + 38, 155, 12, 650);
    t(ctx, b, cx + 38, 171, 10.5, 400, C.mute);
    if (i < 3) {
      ctx.fillStyle = C.line;
      ctx.fillRect(cx + 168, 161, 22, 2);
    }
  });
  card(ctx, 188, 218, 310, 394);
  t(ctx, "Documents récents", 208, 244, 14, 700);
  const docs: [string, string, string, string, string, string][] = [
    ["Devis client", "Dossier commercial · 12 juin", "À valider", C.amberInk, C.amberSoft, C.amber],
    ["Facture client", "Dossier client · 11 juin", "Payée", C.greenInk, C.greenSoft, C.green],
    ["Contrat de prestation", "Site d’intervention · 10 juin", "À signer", C.blue, C.blueSoft, C.blue],
    ["Facture client", "Organisme formation · 9 juin", "Envoyée", C.violet, C.violetSoft, C.violet],
    ["Devis client", "Site client · 8 juin", "Accepté", C.greenInk, C.greenSoft, C.green],
    ["Rapport de visite", "Client restauration · 7 juin", "Archivé", C.greenInk, C.greenSoft, C.green],
  ];
  docs.forEach(([n, s, st, fg, bg, ic], i) => {
    const y = 268 + i * 57;
    if (i === 1) rr(ctx, 198, y - 2, 290, 52, 12, C.bg);
    rr(ctx, 210, y + 6, 30, 36, 7, bg);
    rr(ctx, 216, y + 16, 18, 3, 1.5, ic);
    rr(ctx, 216, y + 23, 14, 3, 1.5, ic);
    rr(ctx, 216, y + 30, 18, 3, 1.5, ic);
    t(ctx, n, 252, y + 16, 12, 650);
    t(ctx, s, 252, y + 33, 10, 400, C.mute);
    const w = tw(ctx, st, 10, 600) + 16;
    pill(ctx, st, 480 - w, y + 24, fg, bg, 10);
  });
  card(ctx, 514, 218, 490, 394);
  t(ctx, "Facture client", 538, 248, 18, 750);
  pill(ctx, "Payée", 940, 248, C.greenInk, C.greenSoft, 10.5);
  t(ctx, "Facturé à", 538, 286, 10, 500, C.mute);
  t(ctx, "Dossier client", 538, 304, 13, 650);
  t(ctx, "Coordonnées du client", 538, 321, 10.5, 400, C.sub);
  t(ctx, "Échéance", 800, 286, 10, 500, C.mute);
  t(ctx, "25 juin", 800, 304, 13, 650);
  rr(ctx, 538, 342, 442, 28, 8, C.bg);
  t(ctx, "Désignation", 552, 356.5, 10, 600, C.mute);
  t(ctx, "Qté", 780, 356.5, 10, 600, C.mute, "right");
  t(ctx, "Prix HT", 870, 356.5, 10, 600, C.mute, "right");
  t(ctx, "Total", 966, 356.5, 10, 600, C.mute, "right");
  const lines: [string, string, string, string][] = [
    ["Prestation programmée", "—", "—", "—"],
    ["Service complémentaire", "—", "—", "—"],
    ["Intervention sur site", "—", "—", "—"],
  ];
  lines.forEach(([a, q, p, tt], i) => {
    const y = 388 + i * 34;
    t(ctx, a, 552, y, 12, 550);
    t(ctx, q, 780, y, 12, 500, C.sub, "right");
    t(ctx, p, 870, y, 12, 500, C.sub, "right");
    t(ctx, tt, 966, y, 12, 650, C.ink, "right");
    ctx.fillStyle = C.line;
    ctx.fillRect(538, y + 17, 442, 1);
  });
  t(ctx, "Total HT", 870, 500, 11.5, 500, C.sub, "right");
  t(ctx, "—", 966, 500, 11.5, 600, C.ink, "right");
  t(ctx, "TVA", 870, 520, 11.5, 500, C.sub, "right");
  t(ctx, "—", 966, 520, 11.5, 600, C.ink, "right");
  t(ctx, "Total TTC", 842, 552, 12, 650, C.ink, "right");
  t(ctx, "—", 966, 552, 19, 800, C.blue, "right");
  rr(ctx, 538, 572, 150, 26, 13, C.blue);
  t(ctx, "Envoyer par e-mail", 613, 585.5, 11, 600, "#fff", "center");
  rr(ctx, 698, 572, 120, 26, 13, "#fff", C.line);
  t(ctx, "Télécharger", 758, 585.5, 11, 600, C.sub, "center");
}

function viewPilot(ctx: Ctx) {
  shell(ctx, 5, "Statistiques");
  t(ctx, "Pilotage de l’entreprise", 192, 92, 22, 700);
  const k: [string, string, string, string, string][] = [
    ["Pilotage métier", "—", "—", C.greenInk, C.greenSoft],
    ["Qualité", "—", "Suivi", C.greenInk, C.greenSoft],
    ["Suivi des dossiers", "—", "Suivi", C.blue, C.blueSoft],
  ];
  const kw = (816 - 28) / 3;
  k.forEach(([l, v, d, fg, bg], i) => {
    const x = 188 + i * (kw + 14);
    card(ctx, x, 118, kw, 92);
    t(ctx, l, x + 18, 140, 11, 500, C.sub);
    t(ctx, v, x + 18, 172, 24, 750);
    pill(ctx, d, x + 18 + tw(ctx, v, 24, 750) + 12, 172, fg, bg, 10);
    rr(ctx, x + 18, 194, kw - 36, 4, 2, C.bg);
    rr(ctx, x + 18, 194, (kw - 36) * (0.55 + i * 0.12), 4, 2, C.blue);
  });
  card(ctx, 188, 224, 500, 388);
  t(ctx, "Indicateurs d’activité", 208, 250, 14, 700);
  t(ctx, "Représentation illustrative", 208, 270, 11, 400, C.mute);
  const vals = [38, 44, 41, 52, 49, 58, 55, 63, 60, 71, 68, 82];
  const bx = 236, by = 300, bw = 440, bh = 270;
  for (let i = 0; i <= 4; i++) {
    ctx.fillStyle = C.line;
    ctx.fillRect(bx, by + (bh * i) / 4, bw, 1);
  }
  vals.forEach((v, i) => {
    const w = 22;
    const x = bx + 10 + i * (bw / 12);
    const h = (v / 90) * bh;
    const g = ctx.createLinearGradient(0, by + bh - h, 0, by + bh);
    g.addColorStop(0, i === 11 ? C.blue : "#9cc3ff");
    g.addColorStop(1, i === 11 ? "#3d8bff" : "#d6e6ff");
    rr(ctx, x, by + bh - h, w, h, 6, undefined);
    ctx.beginPath();
    ctx.roundRect(x, by + bh - h, w, h, [6, 6, 2, 2]);
    ctx.fillStyle = g;
    ctx.fill();
    t(ctx, "JFMAMJJASOND"[i], x + w / 2, by + bh + 16, 10, 500, C.mute, "center");
  });
  ctx.save();
  ctx.setLineDash([5, 4]);
  ctx.strokeStyle = C.ink;
  ctx.lineWidth = 1.2;
  ctx.beginPath();
  ctx.moveTo(bx, by + bh - (60 / 90) * bh);
  ctx.lineTo(bx + bw, by + bh - (60 / 90) * bh);
  ctx.stroke();
  ctx.restore();
  rr(ctx, bx + bw - 76, by + bh - (60 / 90) * bh - 26, 76, 20, 6, C.ink);
  t(ctx, "Repère", bx + bw - 38, by + bh - (60 / 90) * bh - 15.5, 10, 600, "#fff", "center");
  card(ctx, 702, 224, 302, 186);
  t(ctx, "Activité par métier", 722, 250, 14, 700);
  const segs: [number, string, string][] = [[0.46, C.blue, "Formation"], [0.31, C.violet, "Sécurité"], [0.23, C.amber, "Nettoyage"]];
  let a0 = -Math.PI / 2;
  segs.forEach(([p, col]) => {
    const a1 = a0 + p * Math.PI * 2;
    ctx.beginPath();
    ctx.arc(780, 330, 44, a0 + 0.04, a1 - 0.04);
    ctx.strokeStyle = col;
    ctx.lineWidth = 15;
    ctx.lineCap = "butt";
    ctx.stroke();
    a0 = a1;
  });
  t(ctx, "—", 780, 326, 14, 750, C.ink, "center");
  t(ctx, "Illustration", 780, 342, 9.5, 500, C.mute, "center");
  segs.forEach(([, col, l], i) => {
    rr(ctx, 850, 296 + i * 28, 10, 10, 3, col);
    t(ctx, l, 868, 301.5 + i * 28, 11, 550, C.sub);
  });
  card(ctx, 702, 424, 302, 188);
  t(ctx, "Indicateurs métier", 722, 450, 14, 700);
  const goals: [string, number, string][] = [["Chiffre d’affaires", 0.82, C.blue], ["Nouveaux clients", 0.64, C.violet], ["Satisfaction", 0.94, C.green]];
  goals.forEach(([l, p, col], i) => {
    const y = 486 + i * 39;
    t(ctx, l, 722, y, 11.5, 550, C.sub);
    t(ctx, "—", 984, y, 11.5, 700, C.ink, "right");
    rr(ctx, 722, y + 13, 262, 7, 3.5, C.bg);
    rr(ctx, 722, y + 13, 262 * p, 7, 3.5, col);
  });
}

const VIEW_FNS = [viewDashboard, viewClients, viewPlanning, viewDocuments, viewPilot];
export const VIEW_COUNT = VIEW_FNS.length;

export function buildView(i: number, scale: number): HTMLCanvasElement {
  const { c, ctx } = mk(1024, 640, scale);
  VIEW_FNS[i](ctx);
  t(ctx, "Illustration des usages · Sans données réelles · Selon métier et formule", 594, 628, 10, 500, C.sub, "center");
  return c;
}

/* --------------------------- CARTES FLOTTANTES --------------------------- */

export interface FloaterTex {
  canvas: HTMLCanvasElement;
  w: number;
  h: number;
}
const PAD = 30;
function fc(w: number, h: number, scale: number, draw: (ctx: Ctx) => void): FloaterTex {
  const { c, ctx } = mk(w + PAD * 2, h + PAD * 2, scale);
  ctx.translate(PAD, PAD);
  draw(ctx);
  return { canvas: c, w: w + PAD * 2, h: h + PAD * 2 };
}

function clientCard(ctx: Ctx, ini: string, col: string, name: string, co: string, tag: string, fg: string, bg: string, phone: string) {
  card(ctx, 0, 0, 300, 140, 18, true);
  avatar(ctx, 44, 44, 24, ini, col);
  t(ctx, name, 80, 36, 16, 700);
  t(ctx, co, 80, 57, 12, 400, C.sub);
  pill(ctx, tag, 80, 82, fg, bg, 10.5);
  ctx.fillStyle = C.line;
  ctx.fillRect(20, 104, 260, 1);
  t(ctx, phone, 22, 123, 11.5, 500, C.sub);
  t(ctx, "Dernier échange · hier", 278, 123, 10.5, 400, C.mute, "right");
}
function eventCard(ctx: Ctx, time: string, title: string, place: string, col: string) {
  card(ctx, 0, 0, 300, 96, 18, true);
  rr(ctx, 16, 18, 4, 60, 2, col);
  t(ctx, time, 34, 28, 11.5, 650, col);
  t(ctx, title, 34, 52, 15, 700);
  t(ctx, place, 34, 73, 11.5, 400, C.sub);
  avatar(ctx, 252, 48, 14, "EQ", C.blue);
  avatar(ctx, 272, 48, 14, "OP", C.violet);
}
function docCard(ctx: Ctx, type: string, ref: string, client: string, amount: string, st: string, fg: string, bg: string, tfg: string, tbg: string) {
  card(ctx, 0, 0, 230, 290, 16, true);
  pill(ctx, type, 20, 30, tfg, tbg, 10.5);
  drawMark(ctx, 190, 16, 28, C.ink, C.blue);
  t(ctx, ref, 20, 66, 22, 800);
  t(ctx, client, 20, 88, 12, 400, C.sub);
  [0.92, 0.7, 0.85, 0.5, 0.78].forEach((p, i) => rr(ctx, 20, 116 + i * 20, 190 * p, 7, 3.5, C.line));
  ctx.fillStyle = C.line;
  ctx.fillRect(20, 226, 190, 1);
  t(ctx, "Total TTC", 20, 246, 11, 500, C.mute);
  t(ctx, amount, 20, 266, 20, 800);
  pill(ctx, st, 210 - (tw(ctx, st, 10.5, 600) + 16), 266, fg, bg, 10.5);
}
function toast(ctx: Ctx, col: string, soft: string, title: string, sub: string, when: string) {
  card(ctx, 0, 0, 330, 72, 18, true);
  ctx.beginPath();
  ctx.arc(38, 36, 19, 0, Math.PI * 2);
  ctx.fillStyle = soft;
  ctx.fill();
  check(ctx, 38, 36, 13, col, 2.6);
  t(ctx, title, 68, 28, 13.5, 700);
  t(ctx, sub, 68, 49, 11.5, 400, C.sub);
  t(ctx, when, 312, 28, 10, 500, C.mute, "right");
}

export function buildFloaters(scale: number): Record<string, FloaterTex> {
  const o: Record<string, FloaterTex> = {};
  o.toast0 = fc(330, 72, scale, (c) => toast(c, C.green, C.greenSoft, "Devis accepté", "Dossier commercial · —", "maintenant"));
  o.toast1 = fc(330, 72, scale, (c) => toast(c, C.blue, C.blueSoft, "Rendez-vous confirmé", "Dossier client · 09:30", "il y a 2 min"));
  o.toast2 = fc(330, 72, scale, (c) => toast(c, C.violet, C.violetSoft, "Facture payée", "Facture · —", "il y a 8 min"));

  o.client0 = fc(300, 140, scale, (c) => clientCard(c, "CL", C.blue, "Dossier client", "Fiche client", "Client actif", C.greenInk, C.greenSoft, "Coordonnées"));
  o.client1 = fc(300, 140, scale, (c) => clientCard(c, "PR", C.violet, "Prospect", "Suivi commercial", "Prospect", C.blue, C.blueSoft, "Coordonnées"));
  o.client2 = fc(300, 140, scale, (c) => clientCard(c, "DC", C.green, "Dossier commercial", "Documents liés", "Client actif", C.greenInk, C.greenSoft, "Coordonnées"));

  o.event0 = fc(300, 96, scale, (c) => eventCard(c, "09:30 – 11:00", "Rendez-vous client", "Dossier client · Suivi de session", C.blue));
  o.event1 = fc(300, 96, scale, (c) => eventCard(c, "14:00 – 15:30", "Intervention sur site", "Site d’intervention · Site client", C.green));
  o.event2 = fc(300, 96, scale, (c) => eventCard(c, "16:30 – 17:15", "Réunion d’équipe", "Équipe affectée", C.amber));

  o.doc0 = fc(230, 290, scale, (c) => docCard(c, "Devis", "Devis", "Dossier commercial", "—", "À valider", C.amberInk, C.amberSoft, C.blue, C.blueSoft));
  o.doc1 = fc(230, 290, scale, (c) => docCard(c, "Facture", "Facture", "Dossier client", "—", "Payée", C.greenInk, C.greenSoft, C.violet, C.violetSoft));
  o.doc2 = fc(230, 290, scale, (c) => docCard(c, "Contrat", "Contrat", "Site d’intervention", "—", "À signer", C.blue, C.blueSoft, C.greenInk, C.greenSoft));

  o.kpiRev = fc(320, 170, scale, (c) => {
    card(c, 0, 0, 320, 170, 20, true);
    t(c, "Chiffre d’affaires", 22, 30, 12.5, 500, C.sub);
    t(c, "—", 22, 66, 31, 800);
    pill(c, "—", 22 + tw(c, "—", 31, 800) + 12, 68, C.greenInk, C.greenSoft, 11);
    spark(c, [22, 28, 26, 34, 31, 40, 38, 47, 44, 53, 50, 60], 22, 100, 276, 50, C.blue, true, 2.6);
  });
  o.kpiGoal = fc(210, 210, scale, (c) => {
    card(c, 0, 0, 210, 210, 20, true);
    c.beginPath();
    c.arc(105, 92, 54, 0, Math.PI * 2);
    c.strokeStyle = C.line;
    c.lineWidth = 12;
    c.stroke();
    c.beginPath();
    c.arc(105, 92, 54, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.82);
    c.strokeStyle = C.blue;
    c.lineCap = "round";
    c.stroke();
    t(c, "—", 105, 92, 27, 800, C.ink, "center");
    t(c, "Suivi de l’activité", 105, 178, 12, 550, C.sub, "center");
  });
  o.kpiSat = fc(250, 120, scale, (c) => {
    card(c, 0, 0, 250, 120, 20, true);
    t(c, "Évaluations formation", 20, 28, 12, 500, C.sub);
    t(c, "—", 20, 66, 34, 800);
    t(c, "", 20 + tw(c, "—", 34, 800) + 6, 74, 14, 500, C.mute);
    [0.95, 0.8, 0.9, 0.7, 1, 0.85].forEach((p, i) => rr(c, 150 + i * 14, 88 - 54 * p, 8, 54 * p, 4, i === 4 ? C.blue : "#b9d4ff"));
    t(c, "Selon la formule", 20, 100, 11, 500, C.mute);
  });
  o.kpiTask = fc(280, 120, scale, (c) => {
    card(c, 0, 0, 280, 120, 20, true);
    t(c, "Actions coordonnées", 20, 28, 12, 500, C.sub);
    t(c, "—", 20, 64, 30, 800);
    t(c, "Planning et équipes", 260, 66, 11, 500, C.mute, "right");
    rr(c, 20, 90, 240, 8, 4, C.line);
    rr(c, 20, 90, 226, 8, 4, C.green);
  });
  return o;
}

/* ===================== INTERFACES MOBILE (portrait 4:5) =====================
   Dessinées pour être lues sur un téléphone : grands textes, peu d'éléments,
   cibles tactiles généreuses. Logique 480×600, affichée ~350 px de large. */

export const MOBILE_W = 480;
export const MOBILE_H = 600;

function mshell(ctx: Ctx, active: number, title: string, sub: string) {
  ctx.fillStyle = C.bg;
  ctx.fillRect(0, 0, MOBILE_W, MOBILE_H);
  // barre haute
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, MOBILE_W, 64);
  ctx.fillStyle = C.line;
  ctx.fillRect(0, 64, MOBILE_W, 1);
  drawMark(ctx, 20, 16, 32, C.ink, C.blue);
  t(ctx, "NCR", 52, 33, 18, 800, C.ink);
  t(ctx, "Suite", 52 + tw(ctx, "NCR", 18, 800) + 5, 33, 18, 400, C.blue);
  t(ctx, "ILLUSTRATION", 335, 32, 12, 600, C.sub, "right");
  rr(ctx, 356, 18, 34, 28, 14, C.bg);
  ctx.beginPath();
  ctx.arc(373, 32, 4, 0, Math.PI * 2);
  ctx.fillStyle = C.mute;
  ctx.fill();
  ctx.beginPath();
  ctx.arc(383, 24, 4, 0, Math.PI * 2);
  ctx.fillStyle = C.red;
  ctx.fill();
  avatar(ctx, 430, 32, 17, "EQ", C.blue);
  // titres
  t(ctx, title, 20, 98, 27, 750);
  t(ctx, sub, 20, 124, 14, 400, C.sub);
  // barre d'onglets
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 536, MOBILE_W, 64);
  ctx.fillStyle = C.line;
  ctx.fillRect(0, 536, MOBILE_W, 1);
  const tabs: [number, string][] = [[0, "Accueil"], [1, "Clients"], [2, "Planning"], [3, "Documents"], [5, "Stats"]];
  tabs.forEach(([ic, label], i) => {
    const cx = 48 + i * 96;
    const on = i === active;
    if (on) rr(ctx, cx - 34, 543, 68, 46, 14, C.blueSoft);
    navIcon(ctx, ic, cx - 7, 550, on ? C.blue : C.mute);
    t(ctx, label, cx, 577, 11, on ? 650 : 500, on ? C.blue : C.mute, "center");
  });
}

function mDashboard(ctx: Ctx) {
  mshell(ctx, 0, "Votre activité", "Votre activité aujourd’hui");
  card(ctx, 20, 144, 440, 130, 18);
  t(ctx, "Chiffre d’affaires", 40, 170, 14, 500, C.sub);
  t(ctx, "—", 40, 206, 36, 800);
  pill(ctx, "—", 40 + tw(ctx, "—", 36, 800) + 14, 208, C.greenInk, C.greenSoft, 12);
  spark(ctx, [22, 28, 26, 34, 31, 40, 38, 47, 44, 53, 50, 60], 40, 228, 400, 34, C.blue, true, 3);
  const small: [string, string, string, string, string][] = [
    ["Clients actifs", "—", "Suivi", C.blue, C.blueSoft],
    ["Interventions", "—", "—", C.violet, C.violetSoft],
  ];
  small.forEach(([l, v, d, fg, bg], i) => {
    const x = 20 + i * 227;
    card(ctx, x, 290, 213, 100, 18);
    t(ctx, l, x + 18, 314, 13, 500, C.sub);
    t(ctx, v, x + 18, 350, 30, 800);
    pill(ctx, d, x + 18 + tw(ctx, v, 30, 800) + 10, 352, fg, bg, 11.5);
    rr(ctx, x + 18, 372, 177, 5, 2.5, C.bg);
    rr(ctx, x + 18, 372, 120 + i * 20, 5, 2.5, fg);
  });
  t(ctx, "Aujourd’hui", 22, 418, 16, 700);
  pill(ctx, "Suivi", 418, 418, C.blue, C.blueSoft, 11);
  const tasks: [string, string, string, string][] = [
    ["09:30", "Rendez-vous client", "Suivi de session", C.blue],
    ["11:00", "Validation du devis", "Dossier commercial", C.violet],
  ];
  tasks.forEach(([time, title, sub, col], i) => {
    const y = 436 + i * 50;
    card(ctx, 20, y, 440, 44, 13);
    rr(ctx, 32, y + 9, 4, 26, 2, col);
    t(ctx, title, 48, y + 16, 13.5, 650);
    t(ctx, sub, 48, y + 33, 11, 400, C.sub);
    t(ctx, time, 444, y + 22, 13, 700, col, "right");
  });
}

function mClients(ctx: Ctx) {
  mshell(ctx, 1, "Clients", "Fiches et suivi client");
  rr(ctx, 20, 142, 440, 42, 21, "#fff", C.line);
  ctx.beginPath();
  ctx.arc(45, 162, 6, 0, Math.PI * 2);
  ctx.strokeStyle = C.mute;
  ctx.lineWidth = 2;
  ctx.stroke();
  t(ctx, "Rechercher un client…", 62, 163, 14, 500, C.mute);
  let x = 20;
  ["Tous", "Actifs", "Prospects"].forEach((s, i) => {
    const w = tw(ctx, s, 13, 650) + 28;
    rr(ctx, x, 196, w, 30, 15, i === 0 ? C.ink : "#fff", i === 0 ? undefined : C.line);
    t(ctx, s, x + w / 2, 211.5, 13, 650, i === 0 ? "#fff" : C.sub, "center");
    x += w + 8;
  });
  card(ctx, 20, 240, 440, 288, 18);
  const rows: [string, string, string, string, string, string][] = [
    ["Dossier client", "Formation · hier", "Actif", "—", C.blue, "CL"],
    ["Prospect", "Coiffure · il y a 2 j", "Prospect", "—", C.violet, "PR"],
    ["Dossier commercial", "Sécurité · aujourd’hui", "Actif", "—", C.green, "DC"],
    ["Client restauration", "Restauration · il y a 3 j", "Actif", "—", C.amber, "RE"],
    ["Site client", "Nettoyage · 1 sem.", "En attente", "—", "#0891b2", "SI"],
  ];
  rows.forEach(([name, sub, st, amt, col, ini], i) => {
    const y = 240 + i * 57.6;
    if (i > 0) {
      ctx.fillStyle = C.line;
      ctx.fillRect(36, y, 408, 1);
    }
    avatar(ctx, 56, y + 29, 20, ini, col);
    t(ctx, name, 88, y + 22, 15, 650);
    t(ctx, sub, 88, y + 41, 12, 400, C.mute);
    const [fg, bg] = st === "Actif" ? [C.greenInk, C.greenSoft] : st === "Prospect" ? [C.blue, C.blueSoft] : [C.amberInk, C.amberSoft];
    t(ctx, amt, 444, y + 21, 14, 700, C.ink, "right");
    const w = tw(ctx, st, 10.5, 600) + 16;
    pill(ctx, st, 444 - w, y + 42, fg, bg, 10.5);
  });
}

function mPlanning(ctx: Ctx) {
  mshell(ctx, 2, "Votre planning", "Planning adapté au métier");
  const days = ["L", "M", "M", "J", "V"];
  days.forEach((d, i) => {
    const cx = 64 + i * 88;
    t(ctx, d, cx, 158, 12, 600, C.mute, "center");
    if (i === 2) {
      ctx.beginPath();
      ctx.arc(cx, 190, 20, 0, Math.PI * 2);
      ctx.fillStyle = C.blue;
      ctx.fill();
    }
    t(ctx, String(9 + i), cx, 190.5, 16, 700, i === 2 ? "#fff" : C.ink, "center");
  });
  ctx.fillStyle = C.line;
  ctx.fillRect(20, 224, 440, 1);
  const ev: [string, string, string, string, string, string][] = [
    ["09:30", "Rendez-vous client", "Dossier client · session", C.blue, C.blueSoft, C.blue],
    ["11:00", "Signature de contrat", "Dossier commercial", C.violet, C.violetSoft, C.violet],
    ["14:00", "Intervention sur site", "Site d’intervention · Site client", C.greenInk, C.greenSoft, C.green],
    ["16:30", "Réunion d’équipe", "Équipe affectée", C.amberInk, C.amberSoft, C.amber],
  ];
  ctx.fillStyle = C.line;
  ctx.fillRect(68, 244, 2, 272);
  ev.forEach(([time, title, sub, fg, bg, dot], i) => {
    const y = 240 + i * 70;
    t(ctx, time, 20, y + 31, 13, 650, C.sub);
    ctx.beginPath();
    ctx.arc(69, y + 31, 6, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.lineWidth = 3;
    ctx.strokeStyle = dot;
    ctx.stroke();
    rr(ctx, 90, y, 370, 62, 15, bg);
    rr(ctx, 90, y + 11, 4.5, 40, 2.2, fg);
    t(ctx, title, 108, y + 23, 15, 700, C.ink);
    t(ctx, sub, 108, y + 43, 12, 450, C.sub);
  });
}

function mDocuments(ctx: Ctx) {
  mshell(ctx, 3, "Documents", "Devis, factures, contrats");
  card(ctx, 20, 142, 440, 104, 18);
  t(ctx, "Automatisation active", 40, 166, 14.5, 700);
  pill(ctx, "Parcours", 418, 166, C.greenInk, C.greenSoft, 11);
  const steps = ["Devis", "Accepté", "Facture", "Suivi"];
  steps.forEach((s, i) => {
    const cx = 62 + i * 119;
    if (i < 3) {
      ctx.fillStyle = C.blueSoft;
      ctx.fillRect(cx + 16, 197, 119 - 32, 3);
    }
    ctx.beginPath();
    ctx.arc(cx, 198, 15, 0, Math.PI * 2);
    ctx.fillStyle = i === 3 ? C.blue : C.blueSoft;
    ctx.fill();
    check(ctx, cx, 198, 13, i === 3 ? "#fff" : C.blue, 2.6);
    t(ctx, s, cx, 229, 12.5, 600, C.sub, "center");
  });
  card(ctx, 20, 262, 440, 266, 18);
  const docs: [string, string, string, string, string, string][] = [
    ["Devis client", "Dossier commercial", "—", "À valider", C.amberInk, C.amberSoft],
    ["Facture client", "Dossier client", "—", "Payée", C.greenInk, C.greenSoft],
    ["Contrat client", "Site d’intervention", "—", "À signer", C.blue, C.blueSoft],
    ["Facture client", "Organisme formation", "—", "Envoyée", C.violet, C.violetSoft],
  ];
  docs.forEach(([n, c, amt, st, fg, bg], i) => {
    const y = 262 + i * 66.5;
    if (i > 0) {
      ctx.fillStyle = C.line;
      ctx.fillRect(36, y, 408, 1);
    }
    rr(ctx, 38, y + 13, 38, 42, 9, bg);
    rr(ctx, 46, y + 25, 22, 3.5, 1.7, fg);
    rr(ctx, 46, y + 33, 16, 3.5, 1.7, fg);
    rr(ctx, 46, y + 41, 22, 3.5, 1.7, fg);
    t(ctx, n, 90, y + 26, 15, 700);
    t(ctx, c, 90, y + 46, 12.5, 400, C.mute);
    t(ctx, amt, 444, y + 25, 14.5, 750, C.ink, "right");
    const w = tw(ctx, st, 10.5, 600) + 16;
    pill(ctx, st, 444 - w, y + 47, fg, bg, 10.5);
  });
}

function mPilot(ctx: Ctx) {
  mshell(ctx, 4, "Pilotage", "Vue annuelle de l’entreprise");
  card(ctx, 20, 142, 440, 206, 18);
  t(ctx, "Indicateurs d’activité", 40, 166, 14, 500, C.sub);
  t(ctx, "—", 40, 198, 30, 800);
  pill(ctx, "—", 40 + tw(ctx, "—", 30, 800) + 12, 200, C.greenInk, C.greenSoft, 12);
  const vals = [38, 44, 41, 52, 49, 58, 55, 63, 60, 71, 68, 82];
  const bx = 40, by = 226, bw = 400, bh = 96;
  vals.forEach((v, i) => {
    const w = 20;
    const x = bx + 4 + i * (bw / 12);
    const h = (v / 90) * bh;
    const g = ctx.createLinearGradient(0, by + bh - h, 0, by + bh);
    g.addColorStop(0, i === 11 ? C.blue : "#9cc3ff");
    g.addColorStop(1, i === 11 ? "#3d8bff" : "#d6e6ff");
    ctx.beginPath();
    ctx.roundRect(x, by + bh - h, w, h, [6, 6, 2, 2]);
    ctx.fillStyle = g;
    ctx.fill();
  });
  "JFMAMJJASOND".split("").forEach((m, i) => t(ctx, m, bx + 14 + i * (bw / 12), by + bh + 14, 10.5, 500, C.mute, "center"));
  // objectif
  card(ctx, 20, 364, 213, 164, 18);
  ctx.beginPath();
  ctx.arc(126, 428, 40, 0, Math.PI * 2);
  ctx.strokeStyle = C.line;
  ctx.lineWidth = 11;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(126, 428, 40, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * 0.82);
  ctx.strokeStyle = C.blue;
  ctx.lineCap = "round";
  ctx.stroke();
  t(ctx, "—", 126, 428, 23, 800, C.ink, "center");
  t(ctx, "Suivi de l’activité", 126, 500, 12.5, 550, C.sub, "center");
  // indicateurs
  card(ctx, 247, 364, 213, 164, 18);
  t(ctx, "Qualité", 265, 388, 13, 500, C.sub);
  t(ctx, "—", 265, 420, 28, 800);
  pill(ctx, "Suivi", 265, 452, C.greenInk, C.greenSoft, 11);
  t(ctx, "Documents liés", 265, 484, 12.5, 550, C.sub);
  t(ctx, "—", 442, 484, 12.5, 700, C.ink, "right");
  rr(ctx, 265, 498, 177, 7, 3.5, C.bg);
  rr(ctx, 265, 498, 177 * 0.96, 7, 3.5, C.blue);
}

const MOBILE_FNS = [mDashboard, mClients, mPlanning, mDocuments, mPilot];

export function buildMobileView(i: number, scale: number): HTMLCanvasElement {
  const { c, ctx } = mk(MOBILE_W, MOBILE_H, scale);
  MOBILE_FNS[i](ctx);
  return c;
}
