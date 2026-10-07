/* Generador de las escenas botánicas del sitio.
   Todo el arte es SVG propio, por capas, con aleatoriedad sembrada
   para que el resultado sea reproducible. Correr: node tools/gen-art.mjs */
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = resolve(dirname(fileURLToPath(import.meta.url)), '../assets/art');
mkdirSync(OUT, { recursive: true });

/* --- azar sembrado (mulberry32) --- */
const rng = (seed) => () => {
  seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
  let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
  t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
};
const mk = (seed) => { let s = seed; return () => { s = (s * 1664525 + 1013904223) % 4294967296; return s / 4294967296; }; };
const R = (r, a, b) => a + r() * (b - a);
const pick = (r, arr) => arr[Math.floor(r() * arr.length)];
const n = (v) => Math.round(v * 100) / 100;

const C = {
  forest: '#16281D', pine: '#1E3626', moss: '#33513A', fern: '#4A6B4E',
  sage: '#8FA98B', sagePale: '#C3D2BC', bone: '#F5F2EA', boneVeil: '#FBF9F4',
  sun: '#E0B472', sunPale: '#F0D9AE', dusk: '#A79BB0', deep: '#101E16',
};

const svg = (w, h, body, extra = '') =>
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" preserveAspectRatio="xMidYMid slice" role="presentation"${extra}>${body}</svg>`;

/* --- un tallo: curva desde la base hacia arriba, con deriva --- */
function stem(r, x, baseY, len, drift, w, color, op) {
  const topY = baseY - len;
  const cx1 = x + drift * 0.35, cy1 = baseY - len * 0.45;
  const cx2 = x + drift * 0.9, cy2 = baseY - len * 0.8;
  const tx = x + drift;
  let d = `M${n(x)} ${n(baseY)}C${n(cx1)} ${n(cy1)} ${n(cx2)} ${n(cy2)} ${n(tx)} ${n(topY)}`;
  let out = `<path d="${d}" fill="none" stroke="${color}" stroke-width="${n(w)}" stroke-linecap="round" opacity="${n(op)}"/>`;
  if (r() > 0.55) {
    const hl = R(r, len * 0.06, len * 0.13);
    out += `<ellipse cx="${n(tx)}" cy="${n(topY - hl / 2)}" rx="${n(w * 1.5)}" ry="${n(hl / 2)}" fill="${color}" opacity="${n(op * 0.9)}" transform="rotate(${n(R(r, -12, 12))} ${n(tx)} ${n(topY)})"/>`;
  }
  return out;
}

/* --- una fronda de helecho: raquis + folíolos --- */
function frond(r, x, y, len, angle, scale, color, op) {
  const rad = (angle * Math.PI) / 180;
  const ex = x + Math.cos(rad) * len, ey = y + Math.sin(rad) * len;
  const bow = R(r, 0.16, 0.3);
  const mx = (x + ex) / 2 + Math.cos(rad + Math.PI / 2) * len * bow;
  const my = (y + ey) / 2 + Math.sin(rad + Math.PI / 2) * len * bow;
  let out = `<path d="M${n(x)} ${n(y)}Q${n(mx)} ${n(my)} ${n(ex)} ${n(ey)}" fill="none" stroke="${color}" stroke-width="${n(3.4 * scale)}" stroke-linecap="round" opacity="${n(op)}"/>`;
  const N = Math.round(R(r, 16, 26));
  for (let i = 1; i < N; i++) {
    const t = i / N;
    const px = (1 - t) ** 2 * x + 2 * (1 - t) * t * mx + t * t * ex;
    const py = (1 - t) ** 2 * y + 2 * (1 - t) * t * my + t * t * ey;
    const dx = 2 * (1 - t) * (mx - x) + 2 * t * (ex - mx);
    const dy = 2 * (1 - t) * (my - y) + 2 * t * (ey - my);
    const a = Math.atan2(dy, dx);
    const leaf = (1 - t) * R(r, 26, 40) * scale + 6 * scale;
    for (const side of [1, -1]) {
      const sweep = a + side * (Math.PI / 2.5) - side * t * 0.5;
      const lx = px + Math.cos(sweep) * leaf, ly = py + Math.sin(sweep) * leaf;
      out += `<path d="M${n(px)} ${n(py)}Q${n(px + Math.cos(sweep - side * 0.5) * leaf * 0.7)} ${n(py + Math.sin(sweep - side * 0.5) * leaf * 0.7)} ${n(lx)} ${n(ly)}" fill="none" stroke="${color}" stroke-width="${n(2.1 * scale)}" stroke-linecap="round" opacity="${n(op * R(r, 0.72, 1))}"/>`;
    }
  }
  return out;
}

/* --- masa de follaje lejano, sin filtros: elipses superpuestas --- */
function canopy(r, w, baseY, height, color, op, count) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const cx = R(r, -w * 0.05, w * 1.05);
    const rx = R(r, w * 0.06, w * 0.19);
    const ry = R(r, height * 0.4, height * 1.05);
    const cy = baseY - R(r, -height * 0.1, height * 0.45);
    out += `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(ry)}" fill="${color}" opacity="${n(op * R(r, 0.6, 1))}"/>`;
  }
  return out;
}

function bokeh(r, w, h, count, color) {
  let out = '';
  for (let i = 0; i < count; i++) {
    const cx = R(r, w * 0.35, w * 1.0), cy = R(r, 0, h * 0.72);
    const rad = R(r, 5, 44);
    out += `<circle cx="${n(cx)}" cy="${n(cy)}" r="${n(rad)}" fill="url(#glow)" opacity="${n(R(r, 0.06, 0.2))}"/>`;
  }
  return out;
}

const grainDefs = `
<filter id="grain" x="0" y="0" width="100%" height="100%">
  <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="3" stitchTiles="stitch"/>
  <feColorMatrix type="saturate" values="0"/>
</filter>`;

/* ============ HERO: juncal al amanecer ============
   Mismo idioma que la ilustración de Mar —bandas planas, horizonte con brillo,
   trazos horizontales, columna de reflejo— pero el protagonista son los juncos.
   El sol está saliendo: apoyado sobre la línea del agua, todavía a medio subir.
   Cuatro capas, para que el parallax del hero siga funcionando.               */

const HZ = 0.36;   // línea del horizonte, alta: el sol queda libre del velo
const SX = 0.65;   // el sol, a lo ancho

/* un junco: tallo que se afina, espadaña arriba y punta fina */
function junco(r, x, baseY, alt, deriva, grosor, color, op, espiga) {
  const topY = baseY - alt;
  const tx = x + deriva;
  const c1x = x + deriva * 0.28, c1y = baseY - alt * 0.5;
  const c2x = x + deriva * 0.72, c2y = baseY - alt * 0.82;
  let out = `<path d="M${n(x)} ${n(baseY)}C${n(c1x)} ${n(c1y)} ${n(c2x)} ${n(c2y)} ${n(tx)} ${n(topY)}" fill="none" stroke="${color}" stroke-width="${n(grosor)}" stroke-linecap="round" opacity="${n(op)}"/>`;
  if (espiga) {
    const eh = alt * R(r, 0.09, 0.15);
    const ew = grosor * R(r, 2.4, 3.4);
    const ey = topY + alt * 0.04;
    out += `<rect x="${n(tx - ew / 2)}" y="${n(ey)}" width="${n(ew)}" height="${n(eh)}" rx="${n(ew / 2)}" fill="${color}" opacity="${n(op)}"/>`;
    out += `<path d="M${n(tx)} ${n(ey)}L${n(tx + deriva * 0.05)} ${n(ey - eh * 0.55)}" stroke="${color}" stroke-width="${n(grosor * 0.7)}" stroke-linecap="round" opacity="${n(op)}"/>`;
  }
  return out;
}

/* una hoja de junco: cinta larga que se arquea y termina en punta */
function hoja(r, x, baseY, largo, curva, ancho, color, op) {
  const tipx = x + curva, tipy = baseY - largo;
  const mx = x + curva * 0.25, my = baseY - largo * 0.55;
  return `<path d="M${n(x - ancho / 2)} ${n(baseY)}Q${n(mx - ancho * 0.35)} ${n(my)} ${n(tipx)} ${n(tipy)}Q${n(mx + ancho * 0.35)} ${n(my)} ${n(x + ancho / 2)} ${n(baseY)}Z" fill="${color}" opacity="${n(op)}"/>`;
}

/* --- capa 1: cielo del amanecer, sol y agua --- */
function heroSky(w = 1600, h = 1000) {
  const r = mk(5150607);
  const hz = h * HZ;
  const sx = w * SX;
  const solR = h * 0.078;
  let body = `
<defs>
  <linearGradient id="alba" x1="0" y1="0" x2=".1" y2="1">
    <stop offset="0" stop-color="#12302A"/>
    <stop offset=".26" stop-color="#2B5247"/>
    <stop offset=".52" stop-color="#6E8D79"/>
    <stop offset=".76" stop-color="#C3BE9A"/>
    <stop offset=".92" stop-color="#EEDCAE"/>
    <stop offset="1" stop-color="#FCF0D2"/>
  </linearGradient>
  <linearGradient id="agua" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#E4D6B0"/>
    <stop offset=".06" stop-color="#A8B695"/>
    <stop offset=".2" stop-color="#5A7A64"/>
    <stop offset=".55" stop-color="#274638"/>
    <stop offset="1" stop-color="#132419"/>
  </linearGradient>
  <radialGradient id="halo" cx=".5" cy=".5" r=".5">
    <stop offset="0" stop-color="#FCE9BA" stop-opacity=".7"/>
    <stop offset=".22" stop-color="#F4D79C" stop-opacity=".4"/>
    <stop offset=".55" stop-color="#E9BE78" stop-opacity=".15"/>
    <stop offset="1" stop-color="${C.sun}" stop-opacity="0"/>
  </radialGradient>
  <radialGradient id="alba-glow" cx="${SX}" cy="${HZ}" r=".58">
    <stop offset="0" stop-color="#FFFAEB" stop-opacity=".95"/>
    <stop offset=".1" stop-color="#FCEFCB" stop-opacity=".6"/>
    <stop offset=".34" stop-color="#F0C983" stop-opacity=".24"/>
    <stop offset="1" stop-color="${C.sun}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${w}" height="${n(hz + 2)}" fill="url(#alba)"/>
<rect y="${n(hz)}" width="${w}" height="${n(h - hz)}" fill="url(#agua)"/>
<rect width="${w}" height="${h}" fill="url(#alba-glow)"/>`;

  /* unas pocas nubes largas y muy tenues, apoyadas cerca del horizonte */
  for (let i = 0; i < 9; i++) {
    const t = r();
    const y = hz - h * 0.06 - t * t * hz * 0.9;
    const largo = R(r, w * 0.22, w * 0.66);
    const alto = R(r, 10, 26);
    body += `<ellipse cx="${n(R(r, 0, w))}" cy="${n(y)}" rx="${n(largo / 2)}" ry="${n(alto / 2)}" fill="${pick(r, ['#FDF2D8', '#E7DDBE'])}" opacity="${n(R(r, 0.05, 0.13))}"/>`;
  }

  /* el sol saliendo: apoyado sobre la línea del agua, todavía a medio subir */
  const solY = hz - solR * 0.55;
  body += `<circle cx="${n(sx)}" cy="${n(solY)}" r="${n(solR * 3.2)}" fill="url(#halo)"/>`;
  body += `<circle cx="${n(sx)}" cy="${n(solY)}" r="${n(solR)}" fill="#FFF2CC" opacity=".96"/>`;
  /* la línea del horizonte, encendida */
  body += `<rect y="${n(hz - 1)}" width="${w}" height="2" fill="#FFF6DC" opacity=".22"/>`;

  /* columna de reflejo bajo el sol */
  for (let i = 0; i < 90; i++) {
    const t = r();
    const y = hz + 4 + t * t * (h - hz) * 0.9;
    const disp = 40 + t * w * 0.16;
    const largo = R(r, 10, 120) * (0.3 + t);
    body += `<rect x="${n(R(r, sx - disp, sx + disp) - largo / 2)}" y="${n(y)}" width="${n(largo)}" height="${n(R(r, 1.4, 3 + t * 4))}" rx="2" fill="${pick(r, ['#FFF3D6', '#F0D9AE', '#BCD0B0'])}" opacity="${n(R(r, 0.12, 0.55) * (1 - t * 0.55))}"/>`;
  }
  /* ondas del agua a lo ancho */
  for (let i = 0; i < 34; i++) {
    const y = hz + R(r, 6, h - hz);
    body += `<path d="M0 ${n(y)}Q${n(w / 2)} ${n(y + R(r, -6, 6))} ${w} ${n(y)}" fill="none" stroke="#93B39C" stroke-width="${n(R(r, 0.6, 2))}" opacity="${n(R(r, 0.05, 0.15))}"/>`;
  }
  return svg(w, h, body);
}

/* --- capa 2: juncal lejano, casi a contraluz --- */
function heroFar(w = 1600, h = 1000) {
  const r = mk(20240817);
  const hz = h * HZ;
  let body = '';
  /* bruma que separa el agua del juncal */
  body += `<rect y="${n(hz)}" width="${w}" height="${n(h * 0.1)}" fill="#F1E2BB" opacity=".18"/>`;
  const cols = ['#A9BFA0', '#8FA98B', '#C3D2BC', '#7C9C82'];
  for (let i = 0; i < 230; i++) {
    const x = R(r, -40, w + 40);
    const base = hz + R(r, h * 0.14, h * 0.26);
    body += junco(r, x, base, R(r, h * 0.05, h * 0.17), R(r, -18, 18), R(r, 0.8, 1.8), pick(r, cols), R(r, 0.14, 0.4), r() > 0.55);
  }
  body += `<rect y="${n(hz + h * 0.12)}" width="${w}" height="${n(h * 0.12)}" fill="#EBDCB6" opacity=".12"/>`;
  return svg(w, h, body);
}

/* --- capa 3: el juncal medio, donde pega la luz --- */
function heroMid(w = 1600, h = 1000) {
  const r = mk(77712);
  const hz = h * HZ;
  const base = hz + h * 0.3;
  let body = '';
  /* la mata de agua de la que salen los juncos */
  let d = `M0 ${h} L0 ${n(base)}`;
  for (let i = 1; i <= 10; i++) {
    const x = (w / 10) * i, px = (w / 10) * (i - 0.5);
    d += ` Q${n(px)} ${n(base - R(r, 0, h * 0.035))} ${n(x)} ${n(base + R(r, -h * 0.02, h * 0.015))}`;
  }
  body += `<path d="${d} L${w} ${h} Z" fill="#2C4C39" opacity=".82"/>`;

  const cols = ['#6BA774', '#4F8659', '#93C795', '#3A6B46', '#B4D3A6'];
  for (let i = 0; i < 120; i++) {
    const x = R(r, -50, w + 50);
    const t = r();
    body += hoja(r, x, h + 20, R(r, h * 0.14, h * 0.38) * (0.7 + t * 0.5), R(r, -90, 90), R(r, 5, 14), pick(r, cols), R(r, 0.14, 0.34));
  }
  for (let i = 0; i < 150; i++) {
    const x = R(r, -50, w + 50);
    const alt = R(r, h * 0.14, h * 0.46);
    body += junco(r, x, h + 20, alt, R(r, -34, 34), R(r, 1.4, 3.2), pick(r, cols), R(r, 0.3, 0.72), r() > 0.42);
  }
  /* apenas unos trazos de luz rasante entre los juncos */
  for (let i = 0; i < 34; i++) {
    const t = r();
    const y = base + t * t * (h - base);
    body += `<rect x="${n(R(r, -60, w))}" y="${n(y)}" width="${n(R(r, 18, 90) * (0.3 + t))}" height="${n(R(r, 1.2, 2.4))}" rx="2" fill="${pick(r, ['#D8E5BE', '#F0DDAE'])}" opacity="${n(R(r, 0.04, 0.12))}"/>`;
  }
  return svg(w, h, body);
}

/* --- capa 4: juncos de primer plano, en silueta --- */
function heroNear(w = 1600, h = 1000) {
  const r = mk(4410092);
  const oscuro = ['#132419', '#0C1B12', '#1B3122'];
  let body = '';
  for (let i = 0; i < 46; i++) {
    body += hoja(r, R(r, -60, w + 60), h + 24, R(r, h * 0.18, h * 0.52), R(r, -140, 140), R(r, 8, 22), pick(r, oscuro), R(r, 0.6, 0.95));
  }
  for (let i = 0; i < 104; i++) {
    const alt = R(r, h * 0.2, h * 0.7);
    body += junco(r, R(r, -50, w + 50), h + 24, alt, R(r, -60, 60), R(r, 2.4, 5.4), pick(r, oscuro), R(r, 0.72, 0.98), r() > 0.35);
  }
  return svg(w, h, body);
}

/* ============ LENGUAJE HOLÍSTICO de las escenas de servicio ============
   Luz dorada que atraviesa todo, halos y rayos, bruma, botánica que enmarca,
   ondas de energía y un toque del malva crepuscular. Las personas, siempre en
   silueta, de espaldas o de perfil.                                          */

const DEFS_SUAVES = `
  <filter id="b4" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="4"/></filter>
  <filter id="b10" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="10"/></filter>
  <filter id="b24" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="24"/></filter>`;

/* abanico de rayos de luz, todos con un degradado radial centrado en la fuente */
function rayos(r, cx, cy, cant, largo, desde, hasta, id) {
  let o = `<radialGradient id="${id}" gradientUnits="userSpaceOnUse" cx="${n(cx)}" cy="${n(cy)}" r="${n(largo)}"><stop offset="0" stop-color="#FFF4D6" stop-opacity=".6"/><stop offset=".55" stop-color="#FCEBC4" stop-opacity=".18"/><stop offset="1" stop-color="#FCEBC4" stop-opacity="0"/></radialGradient>`;
  for (let i = 0; i < cant; i++) {
    const a = (desde + (hasta - desde) * (i + R(r, -0.3, 0.3)) / (cant - 1)) * Math.PI / 180;
    const ab = R(r, 0.012, 0.04);
    o += `<path d="M${n(cx)} ${n(cy)}L${n(cx + Math.cos(a - ab) * largo)} ${n(cy + Math.sin(a - ab) * largo)}L${n(cx + Math.cos(a + ab) * largo)} ${n(cy + Math.sin(a + ab) * largo)}Z" fill="url(#${id})" opacity="${n(R(r, 0.22, 0.55))}"/>`;
  }
  return o;
}

/* una hoja ancha que entra desde el borde: base en (x, y), punta hacia 'ang' */
function hojaAncha(x, y, largo, ang, ancho, color, op = 1, nervio = null) {
  const a = ang * Math.PI / 180, ca = Math.cos(a), sa = Math.sin(a), px = -sa, py = ca;
  const tx = x + ca * largo, ty = y + sa * largo;
  const mx = x + ca * largo * 0.45, my = y + sa * largo * 0.45;
  let o = `<path d="M${n(x)} ${n(y)}Q${n(mx + px * ancho)} ${n(my + py * ancho)} ${n(tx)} ${n(ty)}Q${n(mx - px * ancho)} ${n(my - py * ancho)} ${n(x)} ${n(y)}Z" fill="${color}" opacity="${n(op)}"/>`;
  if (nervio) o += `<path d="M${n(x)} ${n(y)}Q${n(mx + px * ancho * 0.12)} ${n(my + py * ancho * 0.12)} ${n(tx)} ${n(ty)}" fill="none" stroke="${nervio}" stroke-width="1.6" opacity=".45"/>`;
  return o;
}

/* un ramo de hojas desde una esquina, desenfocado: el primer plano de la escena */
function ramo(r, x, y, base, haciaDerecha, cols) {
  let o = '<g filter="url(#b4)">';
  for (let i = 0; i < 9; i++) {
    const ang = haciaDerecha ? R(r, -80, -18) : R(r, -162, -100);
    o += hojaAncha(x + R(r, -30, 30), y + R(r, -10, 20), R(r, base * 0.6, base * 1.15), ang, R(r, base * 0.12, base * 0.2), pick(r, cols), R(r, 0.85, 1), '#0A160E');
  }
  return o + '</g>';
}

/* una flor chica de cinco pétalos */
function flor(x, y, rad, color, centro = '#E9C46A', op = 1) {
  let o = `<g opacity="${n(op)}">`;
  for (let k = 0; k < 5; k++) {
    const a = (k / 5) * Math.PI * 2 - Math.PI / 2;
    o += `<circle cx="${n(x + Math.cos(a) * rad * 0.9)}" cy="${n(y + Math.sin(a) * rad * 0.9)}" r="${n(rad * 0.62)}" fill="${color}"/>`;
  }
  return o + `<circle cx="${n(x)}" cy="${n(y)}" r="${n(rad * 0.45)}" fill="${centro}"/></g>`;
}

/* motas de luz flotando */
function motas(r, w, h, cant, y0, y1, col = '#FFF4D6') {
  let o = '';
  for (let i = 0; i < cant; i++) {
    const rr = R(r, 1.2, 4.5);
    o += `<circle cx="${n(R(r, 0, w))}" cy="${n(R(r, y0, y1))}" r="${n(rr)}" fill="${col}" opacity="${n(R(r, 0.2, 0.75))}"${rr > 3.4 ? ' filter="url(#b4)"' : ''}/>`;
  }
  return o;
}

/* ondas concéntricas sobre el suelo: la energía que circula */
function ondas(cx, cy, desde, hasta, paso, achatado, col, opMax) {
  let o = '';
  for (let rx = desde, k = 0; rx <= hasta; rx += paso, k++) {
    const op = opMax * (1 - (rx - desde) / (hasta - desde + 1));
    o += `<ellipse cx="${n(cx)}" cy="${n(cy)}" rx="${n(rx)}" ry="${n(rx * achatado)}" fill="none" stroke="${col}" stroke-width="${k % 3 === 0 ? 2 : 1.2}" opacity="${n(op)}"/>`;
  }
  return o;
}

/* una mujer sentada con las piernas cruzadas, de perfil; dir = 1 mira a la derecha */
function perfil(x, y, s, color, dir = 1, pelo = 'largo') {
  let g = '';
  g += `<path d="M${n(-0.44 * s)} 0Q${n(-0.52 * s)} ${n(-0.28 * s)} ${n(-0.12 * s)} ${n(-0.3 * s)}L${n(0.52 * s)} ${n(-0.24 * s)}Q${n(0.8 * s)} ${n(-0.14 * s)} ${n(0.62 * s)} 0Z"/>`;
  g += `<path d="M${n(-0.36 * s)} ${n(-0.16 * s)}Q${n(-0.42 * s)} ${n(-0.7 * s)} ${n(-0.2 * s)} ${n(-1.02 * s)}Q${n(-0.02 * s)} ${n(-1.13 * s)} ${n(0.15 * s)} ${n(-1.0 * s)}Q${n(0.25 * s)} ${n(-0.72 * s)} ${n(0.2 * s)} ${n(-0.18 * s)}Z"/>`;
  g += `<path d="M${n(0.04 * s)} ${n(-0.93 * s)}Q${n(0.32 * s)} ${n(-0.62 * s)} ${n(0.48 * s)} ${n(-0.3 * s)}" fill="none" stroke="${color}" stroke-width="${n(0.13 * s)}" stroke-linecap="round"/>`;
  g += `<rect x="${n(-0.07 * s)}" y="${n(-1.2 * s)}" width="${n(0.14 * s)}" height="${n(0.22 * s)}" rx="${n(0.05 * s)}"/>`;
  g += `<ellipse cx="${n(0.03 * s)}" cy="${n(-1.36 * s)}" rx="${n(0.2 * s)}" ry="${n(0.23 * s)}"/>`;
  if (pelo === 'largo') g += `<path d="M${n(-0.14 * s)} ${n(-1.5 * s)}Q${n(-0.32 * s)} ${n(-1.12 * s)} ${n(-0.27 * s)} ${n(-0.8 * s)}Q${n(-0.06 * s)} ${n(-0.88 * s)} ${n(0 * s)} ${n(-1.22 * s)}Z"/>`;
  if (pelo === 'rodete') g += `<circle cx="${n(-0.15 * s)}" cy="${n(-1.5 * s)}" r="${n(0.12 * s)}"/>`;
  return `<g fill="${color}" transform="translate(${n(x)} ${n(y)}) scale(${dir} 1)">${g}</g>`;
}

/* un aura detrás de una figura: la misma silueta, agrandada, en luz y desenfocada */
const aura = (svgFigura) => `<g filter="url(#b10)" opacity=".55">${svgFigura}</g>`;

/* ============ SESIÓN 1 A 1: dos mujeres frente a frente, al amanecer ============ */
function sesion(w = 1600, h = 900) {
  const r = mk(1010101);
  const cx = w / 2, suelo = h * 0.78;
  let body = `<defs>${DEFS_SUAVES}
  <linearGradient id="cieloS" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3D6250"/>
    <stop offset=".38" stop-color="#9DB59A"/>
    <stop offset=".62" stop-color="#E7D8B6"/>
    <stop offset=".72" stop-color="#F6E5C0"/>
  </linearGradient>
  <linearGradient id="pradoS" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#7EA073"/>
    <stop offset="1" stop-color="#3E6640"/>
  </linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#cieloS)"/>`;
  body += rayos(r, cx, h * 0.6, 16, w * 0.75, 190, 350, 'rayosS');
  body += `<circle cx="${n(cx)}" cy="${n(h * 0.6)}" r="${n(h * 0.34)}" fill="#FFF3D2" opacity=".55" filter="url(#b24)"/>`;
  body += `<circle cx="${n(cx)}" cy="${n(h * 0.6)}" r="${n(h * 0.075)}" fill="#FFF7E2"/>`;
  body += `<path d="${loma(r, w, h, h * 0.6, h * 0.05, 5)}" fill="#B9C6AA" opacity=".75"/>`;
  body += `<path d="${loma(r, w, h, h * 0.66, h * 0.04, 6)}" fill="#97B08C"/>`;
  body += `<path d="${loma(r, w, h, h * 0.72, h * 0.03, 7)}" fill="url(#pradoS)"/>`;

  /* entre las dos: un retoño y las ondas que salen de él */
  body += ondas(cx, suelo, 40, 520, 34, 0.16, '#FFF2CF', 0.6);
  body += `<circle cx="${n(cx)}" cy="${n(suelo - 30)}" r="70" fill="#FFF2CF" opacity=".6" filter="url(#b24)"/>`;
  body += `<path d="M${n(cx)} ${n(suelo)}Q${n(cx - 6)} ${n(suelo - 34)} ${n(cx + 2)} ${n(suelo - 66)}" fill="none" stroke="#5E8A57" stroke-width="4" stroke-linecap="round"/>`;
  body += hojaAncha(cx + 1, suelo - 50, 46, -150, 14, '#8DBA7E', 1, '#3E6640');
  body += hojaAncha(cx + 2, suelo - 62, 52, -30, 15, '#A9CC93', 1, '#3E6640');

  /* las dos mujeres, con su aura */
  const a = perfil(cx - 250, suelo + 6, h * 0.17, '#1B3526', 1, 'largo');
  const b = perfil(cx + 250, suelo + 6, h * 0.165, '#1B3526', -1, 'rodete');
  body += aura(perfil(cx - 250, suelo + 6, h * 0.18, '#FFF0C8', 1, 'largo')) + aura(perfil(cx + 250, suelo + 6, h * 0.175, '#FFF0C8', -1, 'rodete'));
  body += a + b;

  /* flores del prado y motas de luz */
  for (let i = 0; i < 46; i++) {
    const y = R(r, h * 0.8, h * 0.98);
    body += flor(R(r, 0, w), y, R(r, 2.5, 6) * (y / h), pick(r, ['#F6EEDC', '#E9D7A3', '#C9B8D6', '#F3D9C4']), '#E3B85C', R(r, 0.7, 1));
  }
  body += motas(r, w, h, 60, h * 0.05, h * 0.75);

  /* hojas que enmarcan, desenfocadas */
  body += ramo(r, -20, h + 20, h * 0.5, true, ['#1E3A27', '#284A31', '#16301F']);
  body += ramo(r, w + 20, h + 20, h * 0.5, false, ['#1E3A27', '#284A31', '#16301F']);
  return svg(w, h, body);
}

/* ============ CÍRCULO DE MUJERES: la ronda en la hora azul ============ */
function circulo(w = 1600, h = 900) {
  const r = mk(313131);
  const hz = h * 0.54;
  const fx = w / 2, fy = h * 0.76;
  let body = `<defs>${DEFS_SUAVES}
  <linearGradient id="horaAzul" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#11261D"/>
    <stop offset=".45" stop-color="#34524A"/>
    <stop offset=".8" stop-color="#8A869C"/>
    <stop offset="1" stop-color="#C8B6A6"/>
  </linearGradient>
  <linearGradient id="sueloC" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#2A4434"/>
    <stop offset="1" stop-color="#12231A"/>
  </linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#horaAzul)"/>`;
  for (let i = 0; i < 70; i++) {
    body += `<circle cx="${n(R(r, 0, w))}" cy="${n(R(r, 0, hz * 0.6))}" r="${n(R(r, 0.6, 1.8))}" fill="${C.bone}" opacity="${n(R(r, 0.15, 0.7))}"/>`;
  }
  const lx = w * 0.24, ly = h * 0.2;
  body += `<circle cx="${n(lx)}" cy="${n(ly)}" r="${n(h * 0.16)}" fill="#F8EFD8" opacity=".35" filter="url(#b24)"/>`;
  body += `<circle cx="${n(lx)}" cy="${n(ly)}" r="${n(h * 0.052)}" fill="#FCF4E1"/>`;

  /* lomas con bruma y el lobo */
  body += `<path d="${loma(r, w, h, hz - h * 0.05, h * 0.06, 5)}" fill="#6F7C80" opacity=".7"/>`;
  body += `<rect y="${n(hz - h * 0.06)}" width="${w}" height="${n(h * 0.06)}" fill="#D9CBBF" opacity=".18" filter="url(#b10)"/>`;
  body += `<path d="${loma(r, w, h, hz - h * 0.01, h * 0.04, 6)}" fill="#3E5A4C"/>`;
  const px = w * 0.8, py = hz - h * 0.02;
  body += `<path d="M${n(px - 150)} ${n(hz + 16)}Q${n(px - 70)} ${n(py - 4)} ${n(px)} ${n(py)}Q${n(px + 80)} ${n(py + 2)} ${n(px + 170)} ${n(hz + 16)}Z" fill="#22382C"/>`;
  body += lobo(px + 6, py + 3, 1.45, '#22382C');
  body += `<path d="${loma(r, w, h, hz + h * 0.03, h * 0.02, 8)}" fill="url(#sueloC)"/>`;

  /* la ronda */
  const N = 9, rx = w * 0.23, ry = h * 0.09;
  const ronda = [];
  for (let i = 0; i < N; i++) {
    const a = (i / N) * Math.PI * 2 + Math.PI / N, sn = Math.sin(a);
    ronda.push({ x: fx + Math.cos(a) * rx, y: fy + sn * ry + h * 0.02, sn, pelo: r() > 0.25 });
  }
  ronda.sort((p, q) => p.y - q.y);
  const s0 = h * 0.084;
  body += `<circle cx="${n(fx)}" cy="${n(fy - h * 0.04)}" r="${n(h * 0.34)}" fill="#FFB65C" opacity=".16" filter="url(#b24)"/>`;
  body += `<circle cx="${n(fx)}" cy="${n(fy - 26)}" r="${n(h * 0.22)}" fill="#FFD08A" opacity=".7" filter="url(#b24)"/>`;
  body += `<ellipse cx="${n(fx)}" cy="${n(fy + h * 0.02)}" rx="${n(w * 0.33)}" ry="${n(h * 0.15)}" fill="#F6C474" opacity=".42" filter="url(#b24)"/>`;
  /* las de atrás reciben el fuego de frente */
  ronda.filter((p) => p.sn < 0).forEach((p) => {
    body += sentada(p.x, p.y, s0 * (0.78 + 0.18 * (p.sn + 1)), '#4A3B28', 1, p.pelo);
  });

  /* el fuego: anillos de luz sobre la tierra, pétalos en ronda, llama y chispas */
  body += ondas(fx, fy + 4, 30, 360, 26, 0.3, '#FFD999', 0.85);
  for (let i = 0; i < 26; i++) {
    const a = (i / 26) * Math.PI * 2;
    body += flor(fx + Math.cos(a) * 90, fy + 6 + Math.sin(a) * 27, 4.5, pick(r, ['#F6EEDC', '#C9B8D6', '#F3D9C4']), '#E3B85C', 0.9);
  }
  body += `<circle cx="${n(fx)}" cy="${n(fy - 30)}" r="${n(h * 0.09)}" fill="#FFF1CC" opacity=".9" filter="url(#b10)"/>`;
  body += `<path d="M${n(fx - 46)} ${n(fy + 14)}L${n(fx + 46)} ${n(fy - 2)}M${n(fx - 42)} ${n(fy - 2)}L${n(fx + 44)} ${n(fy + 14)}" stroke="#2A1A10" stroke-width="11" stroke-linecap="round"/>`;
  const llama = (dx, alto, ancho, col, op = 1) => `<path d="M${n(fx + dx - ancho)} ${n(fy + 4)}Q${n(fx + dx - ancho * 1.05)} ${n(fy - alto * 0.5)} ${n(fx + dx)} ${n(fy - alto)}Q${n(fx + dx + ancho * 1.05)} ${n(fy - alto * 0.5)} ${n(fx + dx + ancho)} ${n(fy + 4)}Z" fill="${col}" opacity="${op}"/>`;
  body += `<g filter="url(#b4)">${llama(0, 120, 40, '#FFB14E', 0.8)}</g>`;
  body += llama(-18, 76, 22, '#E8893A') + llama(20, 64, 19, '#E8893A') + llama(-6, 98, 26, '#F2A548');
  body += llama(4, 84, 20, '#F7C66A') + llama(0, 58, 14, '#FFE3A0') + llama(1, 36, 8, '#FFF8E6');
  body += motas(r, w, h, 44, fy - h * 0.38, fy - h * 0.1, '#FFE2A8');

  ronda.filter((p) => p.sn >= 0).forEach((p) => {
    const sz = s0 * (0.98 + 0.22 * p.sn);
    const haciaFuego = Math.sign(fx - p.x) || 1;
    body += `<ellipse cx="${n(p.x - haciaFuego * sz * 0.35)}" cy="${n(p.y + sz * 0.12)}" rx="${n(sz * 1.05)}" ry="${n(sz * 0.2)}" fill="#050B07" opacity=".55"/>`;
    body += `<g filter="url(#b4)">${sentada(p.x + haciaFuego * 4, p.y - 3, sz * 1.03, '#FFC46E', 0.9, p.pelo)}</g>`;
    body += sentada(p.x, p.y, sz, '#0C1A12', 1, p.pelo);
  });

  body += ramo(r, -20, h + 20, h * 0.42, true, ['#0E1F15', '#152A1D', '#0A160E']);
  body += ramo(r, w + 20, h + 20, h * 0.42, false, ['#0E1F15', '#152A1D', '#0A160E']);
  return svg(w, h, body);
}

/* ============ VOLVER A VOS: una espiral de luz que vuelve al centro ============ */
function programas(w = 1600, h = 900) {
  const r = mk(5050505);
  const hz = h * 0.38;
  const cx = w * 0.5, cy = h * 0.71;
  let body = `<defs>${DEFS_SUAVES}
  <linearGradient id="albaV" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#3D6250"/>
    <stop offset=".5" stop-color="#B2C2A2"/>
    <stop offset=".85" stop-color="#F1DFB4"/>
    <stop offset="1" stop-color="#F8E9C6"/>
  </linearGradient>
  <linearGradient id="pradoV" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#86A779"/>
    <stop offset="1" stop-color="#46703F"/>
  </linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#albaV)"/>`;
  body += `<circle cx="${n(cx)}" cy="${n(hz)}" r="${n(h * 0.26)}" fill="#FFF3D2" opacity=".6" filter="url(#b24)"/>`;
  body += `<circle cx="${n(cx)}" cy="${n(hz)}" r="${n(h * 0.06)}" fill="#FFF7E2"/>`;
  body += `<path d="${loma(r, w, h, hz + h * 0.005, h * 0.05, 5)}" fill="#AFC0A6"/>`;
  body += `<path d="${loma(r, w, h, hz + h * 0.06, h * 0.04, 6)}" fill="#95AF8B"/>`;
  body += `<path d="${loma(r, w, h, hz + h * 0.13, h * 0.03, 7)}" fill="url(#pradoV)"/>`;

  /* la espiral: de afuera hacia adentro, cada vuelta más angosta */
  const vueltas = 3.1, tMax = vueltas * Math.PI * 2;
  const R0 = w * 0.36, rMin = 18, achat = 0.3;
  const punto = (t) => { const rr = rMin + (R0 - rMin) * (1 - t / tMax); const a = t + Math.PI * 0.15; return [cx + Math.cos(a) * rr, cy + Math.sin(a) * rr * achat]; };
  let espiral = '';
  for (let i = 0; i <= 420; i++) {
    const [x, y] = punto(tMax * i / 420);
    espiral += `${i ? 'L' : 'M'}${n(x)} ${n(y)}`;
  }
  body += `<path d="${espiral}" fill="none" stroke="#FFF2CF" stroke-width="30" stroke-linecap="round" stroke-linejoin="round" opacity=".55" filter="url(#b10)"/>`;
  body += `<path d="${espiral}" fill="none" stroke="#F4E6C2" stroke-width="11" stroke-linecap="round" stroke-linejoin="round"/>`;
  /* el centro: la luz a la que se vuelve */
  body += `<circle cx="${n(cx)}" cy="${n(cy)}" r="90" fill="#FFF2CF" opacity=".75" filter="url(#b24)"/>`;
  body += `<circle cx="${n(cx)}" cy="${n(cy)}" r="12" fill="#FFF8E6"/>`;
  body += ondas(cx, cy, 24, 120, 22, achat, '#FFF2CF', 0.5);

  /* cinco piedras con luz sobre la espiral, una por programa */
  [0.1, 0.27, 0.45, 0.63, 0.8].forEach((f) => {
    const [x, y] = punto(f * tMax);
    body += `<circle cx="${n(x)}" cy="${n(y - 10)}" r="34" fill="#FFF0C4" opacity=".55" filter="url(#b10)"/>`;
    body += `<ellipse cx="${n(x)}" cy="${n(y - 6)}" rx="16" ry="10" fill="#B9C4B1"/>`;
    body += `<ellipse cx="${n(x - 2)}" cy="${n(y - 16)}" rx="10" ry="7" fill="#D3DACB"/>`;
  });

  /* alguien caminando hacia adentro */
  const [wx, wy] = punto(0.36 * tMax);
  body += aura(caminante(wx, wy + 4, h * 0.13, '#FFF0C8', 1, false, 0.6));
  body += caminante(wx, wy + 4, h * 0.12, '#1B3526', 1, false, 0.6);

  for (let i = 0; i < 60; i++) {
    const y = R(r, hz + h * 0.16, h);
    body += flor(R(r, 0, w), y, R(r, 2.2, 6) * (y / h), pick(r, ['#F6EEDC', '#E9D7A3', '#C9B8D6', '#F3D9C4']), '#E3B85C', R(r, 0.65, 1));
  }
  body += motas(r, w, h, 50, h * 0.05, h * 0.7);
  body += ramo(r, -20, h + 20, h * 0.42, true, ['#1E3A27', '#284A31', '#16301F']);
  body += ramo(r, w + 20, h + 20, h * 0.42, false, ['#1E3A27', '#284A31', '#16301F']);
  return svg(w, h, body);
}

/* ============ MAR: meditar frente al agua al amanecer ============ */
function mar(w = 1400, h = 1000) {
  const r = mk(556611);
  const hz = h * 0.56, sx = w * 0.52;
  let body = `<defs>${DEFS_SUAVES}
  <linearGradient id="cieloM" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4C6C62"/>
    <stop offset=".35" stop-color="#A3B3A6"/>
    <stop offset=".62" stop-color="#CDBEC6"/>
    <stop offset=".86" stop-color="#F2D8B2"/>
    <stop offset="1" stop-color="#FBEACB"/>
  </linearGradient>
  <linearGradient id="aguaM" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#BFC3B0"/>
    <stop offset=".25" stop-color="#7E9C8C"/>
    <stop offset="1" stop-color="#2F5243"/>
  </linearGradient>
  <linearGradient id="duna" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#D9C79C"/>
    <stop offset="1" stop-color="#A88F60"/>
  </linearGradient>
</defs>
<rect width="${w}" height="${n(hz + 2)}" fill="url(#cieloM)"/>
<rect y="${n(hz)}" width="${w}" height="${n(h - hz)}" fill="url(#aguaM)"/>`;
  body += rayos(r, sx, hz - h * 0.04, 14, w * 0.8, 190, 350, 'rayosM');
  body += `<circle cx="${n(sx)}" cy="${n(hz - h * 0.04)}" r="${n(h * 0.2)}" fill="#FFF0CC" opacity=".6" filter="url(#b24)"/>`;
  body += `<circle cx="${n(sx)}" cy="${n(hz - h * 0.04)}" r="${n(h * 0.05)}" fill="#FFF7E2"/>`;
  for (let i = 0; i < 110; i++) {
    const t = r(), y = hz + 6 + t * t * (h - hz) * 0.8;
    const disp = 30 + t * w * 0.2, largo = R(r, 10, 110) * (0.3 + t);
    body += `<rect x="${n(R(r, sx - disp, sx + disp) - largo / 2)}" y="${n(y)}" width="${n(largo)}" height="${n(R(r, 1.4, 3 + t * 3))}" rx="2" fill="${pick(r, ['#FFF5DC', '#F3DDB0', '#E2D6E0'])}" opacity="${n(R(r, 0.2, 0.7) * (1 - t * 0.5))}"/>`;
  }
  for (let i = 0; i < 4; i++) {
    const bx = R(r, w * 0.25, w * 0.75), by = R(r, h * 0.16, h * 0.34), bs = R(r, 8, 15);
    body += `<path d="M${n(bx - bs)} ${n(by)}Q${n(bx - bs / 2)} ${n(by - bs * 0.5)} ${n(bx)} ${n(by)}Q${n(bx + bs / 2)} ${n(by - bs * 0.5)} ${n(bx + bs)} ${n(by)}" fill="none" stroke="#2E4A3E" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  body += `<path d="${loma(r, w, h, h * 0.86, h * 0.04, 5)}" fill="url(#duna)"/>`;
  for (let i = 0; i < 70; i++) {
    const x = r() > 0.5 ? R(r, -30, w * 0.36) : R(r, w * 0.64, w + 30);
    body += stem(r, x, h + 10, R(r, h * 0.1, h * 0.3), R(r, -40, 40), R(r, 1.4, 3), pick(r, ['#B7A473', '#8FA06A', '#6E8A55', '#C9B98A']), R(r, 0.7, 1));
  }
  const fig = (col, s) => sentada(w * 0.5, h * 0.9, s, col);
  body += aura(fig('#FFF0C8', h * 0.085)) + fig('#24382C', h * 0.078);
  body += motas(r, w, h, 30, h * 0.1, h * 0.6);
  return svg(w, h, body);
}

/* ============ MONTAÑA: de perfil sobre una roca, entre la bruma ============ */
function montana(w = 1400, h = 1000) {
  const r = mk(919283);
  const sx = w * 0.42, sy = h * 0.5;
  let body = `<defs>${DEFS_SUAVES}
  <linearGradient id="cieloT" x1="0" y1="0" x2="0" y2="1">
    <stop offset="0" stop-color="#4A6964"/>
    <stop offset=".4" stop-color="#A1AEAE"/>
    <stop offset=".62" stop-color="#C7BCCB"/>
    <stop offset=".85" stop-color="#EFDCBB"/>
  </linearGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#cieloT)"/>`;
  body += rayos(r, sx, sy, 16, w * 0.9, 180, 360, 'rayosT');
  body += `<circle cx="${n(sx)}" cy="${n(sy)}" r="${n(h * 0.2)}" fill="#FFF0CC" opacity=".55" filter="url(#b24)"/>`;
  body += `<circle cx="${n(sx)}" cy="${n(sy)}" r="${n(h * 0.048)}" fill="#FFF7E2"/>`;
  const capas = [
    { y: 0.52, amp: 0.1, col: '#B9B7C6', op: 0.8 },
    { y: 0.6, amp: 0.11, col: '#9FAAA9', op: 0.88 },
    { y: 0.68, amp: 0.12, col: '#7D9585', op: 0.93 },
    { y: 0.77, amp: 0.12, col: '#5A7A60', op: 0.97 },
    { y: 0.86, amp: 0.1, col: '#3B5C42', op: 1 },
  ];
  capas.forEach((c, i) => {
    let d = `M0 ${h} L0 ${n(h * c.y)}`;
    const pasos = 7 + i * 2;
    for (let k = 1; k <= pasos; k++) {
      const x = (w / pasos) * k, px = (w / pasos) * (k - 0.5);
      d += ` Q${n(px)} ${n(h * c.y - R(r, 0, h * c.amp) * (k % 2 ? 1 : 0.4))} ${n(x)} ${n(h * c.y + R(r, -h * c.amp * 0.3, h * c.amp * 0.3))}`;
    }
    body += `<path d="${d} L${w} ${h} Z" fill="${c.col}" opacity="${c.op}"/>`;
    if (i < 4) body += `<rect y="${n(h * c.y + h * 0.01)}" width="${w}" height="${n(h * 0.06)}" fill="#F3E6CF" opacity=".28" filter="url(#b10)"/>`;
  });
  for (let i = 0; i < 4; i++) {
    const bx = R(r, w * 0.3, w * 0.75), by = R(r, h * 0.14, h * 0.3), bs = R(r, 8, 14);
    body += `<path d="M${n(bx - bs)} ${n(by)}Q${n(bx - bs / 2)} ${n(by - bs * 0.5)} ${n(bx)} ${n(by)}Q${n(bx + bs / 2)} ${n(by - bs * 0.5)} ${n(bx + bs)} ${n(by)}" fill="none" stroke="#3B5248" stroke-width="2.2" stroke-linecap="round"/>`;
  }
  /* la roca y los pinos a los costados */
  body += `<path d="M${n(w * 0.38)} ${h}Q${n(w * 0.44)} ${n(h * 0.86)} ${n(w * 0.58)} ${n(h * 0.85)}Q${n(w * 0.7)} ${n(h * 0.86)} ${n(w * 0.78)} ${h}Z" fill="#2A4232"/>`;
  for (let i = 0; i < 26; i++) {
    const x = r() > 0.5 ? R(r, -20, w * 0.3) : R(r, w * 0.82, w + 20);
    const hh = R(r, 60, 150), yb = h + R(r, -10, 20);
    body += `<path d="M${n(x)} ${n(yb)} L${n(x - hh * 0.26)} ${n(yb)} Q${n(x - hh * 0.1)} ${n(yb - hh * 0.5)} ${n(x)} ${n(yb - hh)} Q${n(x + hh * 0.1)} ${n(yb - hh * 0.5)} ${n(x + hh * 0.26)} ${n(yb)} Z" fill="#1F3627" opacity="${n(R(r, 0.8, 1))}"/>`;
  }
  /* mira hacia el sol */
  const fx = w * 0.58, fy = h * 0.852;
  body += aura(perfil(fx, fy, h * 0.1, '#FFF0C8', -1, 'largo')) + perfil(fx, fy, h * 0.092, '#1B3326', -1, 'largo');
  body += motas(r, w, h, 26, h * 0.1, h * 0.6);
  return svg(w, h, body);
}

/* ============ FIGURAS: presencia humana en silueta ============
   Siempre de espaldas o de perfil, nunca posando, nunca con cara.          */

/* una mujer sentada: cuerpo en campana, cabeza y, a veces, pelo largo */
function sentada(x, y, s, color, op = 1, pelo = true) {
  let g = `<ellipse cx="${n(x)}" cy="${n(y - s * 0.08)}" rx="${n(s * 0.74)}" ry="${n(s * 0.2)}"/>`;
  g += `<path d="M${n(x - s * 0.56)} ${n(y - s * 0.04)}Q${n(x - s * 0.64)} ${n(y - s * 0.72)} ${n(x - s * 0.36)} ${n(y - s * 1.08)}Q${n(x)} ${n(y - s * 1.24)} ${n(x + s * 0.36)} ${n(y - s * 1.08)}Q${n(x + s * 0.64)} ${n(y - s * 0.72)} ${n(x + s * 0.56)} ${n(y - s * 0.04)}Q${n(x)} ${n(y + s * 0.1)} ${n(x - s * 0.56)} ${n(y - s * 0.04)}Z"/>`;
  if (pelo) g += `<ellipse cx="${n(x)}" cy="${n(y - s * 1.2)}" rx="${n(s * 0.31)}" ry="${n(s * 0.42)}"/>`;
  g += `<circle cx="${n(x)}" cy="${n(y - s * 1.45)}" r="${n(s * 0.27)}"/>`;
  return `<g fill="${color}" opacity="${n(op)}">${g}</g>`;
}

/* alguien de pie o caminando; y son los pies, h la altura */
function caminante(x, y, h, color, op = 1, mochila = false, paso = 1) {
  let g = `<circle cx="${n(x)}" cy="${n(y - h * 0.9)}" r="${n(h * 0.085)}"/>`;
  g += `<path d="M${n(x - h * 0.12)} ${n(y - h * 0.78)}Q${n(x)} ${n(y - h * 0.83)} ${n(x + h * 0.12)} ${n(y - h * 0.78)}L${n(x + h * 0.15)} ${n(y - h * 0.36)}L${n(x - h * 0.15)} ${n(y - h * 0.36)}Z"/>`;
  g += `<path d="M${n(x - h * 0.05)} ${n(y - h * 0.4)}L${n(x - h * 0.05 - h * 0.07 * paso)} ${n(y)}M${n(x + h * 0.05)} ${n(y - h * 0.4)}L${n(x + h * 0.05 + h * 0.05 * paso)} ${n(y)}" fill="none" stroke="${color}" stroke-width="${n(h * 0.075)}" stroke-linecap="round"/>`;
  if (mochila) g += `<rect x="${n(x - h * 0.2)}" y="${n(y - h * 0.76)}" width="${n(h * 0.13)}" height="${n(h * 0.28)}" rx="${n(h * 0.05)}"/>`;
  return `<g fill="${color}" opacity="${n(op)}">${g}</g>`;
}

/* una loma: borde ondulado arriba, relleno hasta abajo */
function loma(r, w, h, baseY, amp, pasos) {
  let d = `M0 ${h} L0 ${n(baseY)}`;
  for (let i = 1; i <= pasos; i++) {
    const x = (w / pasos) * i, px = (w / pasos) * (i - 0.5);
    d += ` Q${n(px)} ${n(baseY - R(r, amp * 0.2, amp))} ${n(x)} ${n(baseY + R(r, -amp * 0.3, amp * 0.25))}`;
  }
  return d + ` L${w} ${h} Z`;
}

/* un lobo sentado, aullando hacia arriba a la izquierda (dibujado en una caja de 100) */
function lobo(x, y, escala, color, op = 1) {
  const d = 'M30 100L30 96C31 86 32 76 31 66C29 58 27 52 26 46C24 42 22 39 19 36L10 22L6 12L12 13C16 15 20 17 24 18L27 7L31 17L35 9L37 21C42 30 46 38 52 46C60 54 68 60 72 70C77 79 78 90 74 97C82 98 92 96 98 90C99 96 92 101 80 101L30 101Z';
  return `<path d="${d}" fill="${color}" opacity="${n(op)}" transform="translate(${n(x - 50 * escala)} ${n(y - 100 * escala)}) scale(${n(escala)})"/>`;
}

/* ============ RETRATO: arco botánico (slot de foto) ============ */
function retrato(w = 900, h = 1200) {
  const r = mk(80808);
  let body = `
<defs>
  <linearGradient id="pg" x1=".2" y1="0" x2=".8" y2="1">
    <stop offset="0" stop-color="#3E7A4D"/>
    <stop offset=".5" stop-color="#1B3A26"/>
    <stop offset="1" stop-color="#0C1911"/>
  </linearGradient>
  <radialGradient id="pl" cx=".68" cy=".22" r=".7">
    <stop offset="0" stop-color="${C.sunPale}" stop-opacity=".5"/>
    <stop offset="1" stop-color="${C.sunPale}" stop-opacity="0"/>
  </radialGradient>
</defs>
<rect width="${w}" height="${h}" fill="url(#pg)"/>
<rect width="${w}" height="${h}" fill="url(#pl)"/>`;
  body += canopy(r, w, h * 0.5, h * 0.2, '#2C5C39', 0.11, 30);
  for (let i = 0; i < 170; i++) {
    body += stem(r, R(r, -30, w + 30), h + 20, R(r, h * 0.22, h * 0.86), R(r, -40, 40), R(r, .9, 2.8), pick(r, ['#4F8659', '#356344', '#6BA774', '#93C795', '#254A31']), R(r, 0.22, 0.62));
  }
  body += frond(r, -20, h * 1.02, w * 0.7, -48, 1.3, C.deep, 0.85);
  body += frond(r, w + 20, h * 1.0, w * 0.66, -132, 1.2, C.deep, 0.8);
  return svg(w, h, body);
}

const files = {
  'hero-sky.svg': heroSky(), 'hero-far.svg': heroFar(), 'hero-mid.svg': heroMid(), 'hero-near.svg': heroNear(),
  'mar.svg': mar(), 'montana.svg': montana(), 'circulo.svg': circulo(),
  'retrato.svg': retrato(), 'programas.svg': programas(), 'sesion.svg': sesion(),
};
let total = 0;
for (const [name, content] of Object.entries(files)) {
  writeFileSync(`${OUT}/${name}`, content);
  total += content.length;
  console.log(`${name.padEnd(16)} ${(content.length / 1024).toFixed(1)} kB`);
}
console.log(`\ntotal ${(total / 1024).toFixed(1)} kB en ${Object.keys(files).length} archivos`);
