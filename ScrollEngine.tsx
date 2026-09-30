"use client";
import { useEffect, useRef } from "react";

// [progress, x(vw), y(vh), rotation(deg), scale, opacity]
const K: number[][] = [
  [0, 0, 0, 14, 1, 1],
  [0.09, 24, 0, -12, 0.85, 1],
  [0.19, -24, -4, 38, 0.95, 1],
  [0.3, 0, 0, 10, 0.5, 0.12],
  [0.5, 0, 0, 0, 0.5, 0.1],
  [0.58, 22, 2, -28, 0.9, 0.9],
  [0.68, -20, 0, 20, 0.8, 0.4],
  [0.8, 0, 0, 0, 0.5, 0.1],
  [0.92, 0, 0, 90, 0.6, 0.1],
  [1, 0, 6, 180, 1.1, 0.16],
];
// [progress, background]
const S: [number, string][] = [
  [0, "#f3f1ec"],
  [0.12, "#f4d8d0"],
  [0.26, "#a8cdf0"],
  [0.4, "#efe8da"],
  [0.55, "#f0d9e6"],
  [0.7, "#cfe3c8"],
  [0.82, "#efe8da"],
  [0.92, "#1a1a22"],
  [1, "#0d0d0f"],
];

const hex = (c: string) => [1, 3, 5].map((i) => parseInt(c.slice(i, i + 2), 16));
const smooth = (t: number) => t * t * (3 - 2 * t);
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
function seg(stops: number[], p: number): [number, number] {
  for (let i = 0; i < stops.length - 1; i++) {
    if (p <= stops[i + 1]) return [i, smooth(Math.max(0, (p - stops[i]) / (stops[i + 1] - stops[i])))];
  }
  return [stops.length - 2, 1];
}
const KS = K.map((k) => k[0]);
const SS = S.map((s) => s[0]);

export default function ScrollEngine() {
  const nibRef = useRef<SVGSVGElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const stickRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const root = document.documentElement;
    const nib = nibRef.current!;
    const bar = barRef.current!;
    const stick = stickRef.current!;
    const bigs = Array.from(document.querySelectorAll<HTMLElement>(".big"));
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let cur = 0;
    let raf = 0;

    const frame = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const max = root.scrollHeight - vh;
      const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      cur = reduce ? t : cur + (t - cur) * 0.09;
      const p = cur;

      const [ki, kf] = seg(KS, p);
      const a = K[ki];
      const b = K[ki + 1];
      const k = Math.min(1, vw / 900) * 0.75 + 0.25;
      nib.style.transform = `translate(-50%,-50%) translate(${mix(a[1], b[1], kf) * (vw / 100) * k}px,${
        mix(a[2], b[2], kf) * (vh / 100)
      }px) rotate(${mix(a[3], b[3], kf)}deg) scale(${mix(a[4], b[4], kf)})`;
      nib.style.opacity = String(mix(a[5], b[5], kf));

      const [ci, cf] = seg(SS, p);
      const c1 = hex(S[ci][1]);
      const c2 = hex(S[ci + 1][1]);
      const m = [0, 1, 2].map((i) => Math.round(mix(c1[i], c2[i], cf)));
      root.style.setProperty("--bg", `rgb(${m.join(",")})`);
      const lum = (0.299 * m[0] + 0.587 * m[1] + 0.114 * m[2]) / 255;
      if (lum < 0.45) {
        root.style.setProperty("--fg", "#f3f1ec");
        root.style.setProperty("--mute", "rgba(243,241,236,.65)");
        root.style.setProperty("--card", "rgba(255,255,255,.08)");
      } else {
        root.style.setProperty("--fg", "#0d0d0f");
        root.style.setProperty("--mute", "rgba(13,13,15,.62)");
        root.style.setProperty("--card", "rgba(255,255,255,.55)");
      }

      bigs.forEach((e) => {
        const parent = e.parentElement;
        if (!parent) return;
        const r = parent.getBoundingClientRect();
        const q = (vh - r.top) / (vh + r.height);
        const dir = Number(e.dataset.dir || 1);
        e.style.transform = `translate(-50%,-50%) translateX(${(q - 0.5) * -dir * 70}vw)`;
      });

      bar.style.width = `${max > 0 ? (window.scrollY / max) * 100 : 0}%`;
      stick.classList.toggle("on", window.scrollY > vh * 0.8 && window.scrollY < max - vh * 0.9);
      raf = requestAnimationFrame(frame);
    };
    frame();
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div id="bar" ref={barRef} />
      <svg id="nib" ref={nibRef} viewBox="0 0 200 330" aria-hidden="true">
        <defs>
          <linearGradient id="m" x1="0" x2="1">
            <stop offset="0" stopColor="#8d939f" />
            <stop offset=".28" stopColor="#ffffff" />
            <stop offset=".55" stopColor="#c9ced8" />
            <stop offset=".8" stopColor="#f4f6fa" />
            <stop offset="1" stopColor="#7b818e" />
          </linearGradient>
          <linearGradient id="k" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1c1c20" />
            <stop offset="1" stopColor="#050506" />
          </linearGradient>
        </defs>
        <path d="M78 0h44l6 86H72z" fill="url(#k)" />
        <path d="M72 86h56C160 150 178 215 158 262L100 326 42 262C22 215 40 150 72 86z" fill="url(#m)" />
        <path d="M100 150v150" stroke="#1a1a1e" strokeWidth="3" strokeLinecap="round" />
        <circle cx="100" cy="146" r="10" fill="#1a1a1e" />
        <path d="M62 120C48 170 46 215 58 250" stroke="#fff" strokeWidth="5" fill="none" opacity=".8" strokeLinecap="round" />
        <text x="100" y="226" fontFamily="Inter Tight, Arial" fontWeight="800" fontSize="20" textAnchor="middle" fill="#2a2a30" opacity=".55">
          JB
        </text>
      </svg>
      <a className="pill stick" id="stick" ref={stickRef} href="#contact">
        Get a free teardown
      </a>
    </>
  );
}
