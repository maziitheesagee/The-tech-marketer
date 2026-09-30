import { NextResponse } from "next/server";

export const runtime = "nodejs";

// Naive in-memory rate limit (per server instance). Fine for a portfolio.
const hits = new Map<string, { n: number; t: number }>();
const WINDOW = 60 * 60 * 1000;
const LIMIT = 5;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string));

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anon";
  const now = Date.now();
  const rec = hits.get(ip);
  if (rec && now - rec.t < WINDOW) {
    if (rec.n >= LIMIT) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
    rec.n++;
  } else {
    hits.set(ip, { n: 1, t: now });
  }

  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  const f = (k: string, max = 500) => String(body[k] ?? "").trim().slice(0, max);

  if (f("company")) return NextResponse.json({ ok: true }); // honeypot: bots fill this in

  const name = f("name", 120);
  const contact = f("contact", 160);
  if (!name || !contact) return NextResponse.json({ error: "missing_fields" }, { status: 400 });

  const key = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!key || !to) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const rows: [string, string][] = [
    ["Name", name],
    ["Contact", contact],
    ["Product", f("url", 300) || "n/a"],
    ["Stage", f("stage", 60)],
    ["Need", f("need", 60)],
    ["Timeline", f("timeline", 60)],
    ["Clarity score", f("score", 10) || "n/a"],
    ["Goal", f("goal", 1500) || "n/a"],
  ];
  const html = rows.map(([k, v]) => `<p><b>${esc(k)}:</b> ${esc(v).replace(/\n/g, "<br>")}</p>`).join("");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.CONTACT_FROM || "Portfolio <onboarding@resend.dev>",
      to: [to],
      subject: `New lead: ${name}`,
      html,
      ...(contact.includes("@") ? { reply_to: contact } : {}),
    }),
  });

  if (!res.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
