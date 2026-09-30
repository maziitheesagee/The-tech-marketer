"use client";
import { useEffect, useState } from "react";
import { site } from "@/lib/config";

type Status = "idle" | "sending" | "sent" | "fallback";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [brief, setBrief] = useState("");
  const [score, setScore] = useState("");

  useEffect(() => {
    const h = (e: Event) => setScore((e as CustomEvent<string>).detail);
    window.addEventListener("quiz-score", h);
    return () => window.removeEventListener("quiz-score", h);
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const data = Object.fromEntries(f.entries()) as Record<string, string>;
    const text =
      `Hi, I found your portfolio.\nName: ${data.name}\nContact: ${data.contact}\nProduct: ${data.url || "n/a"}\n` +
      `${data.stage}\n${data.need}\n${data.timeline}\nGoal: ${data.goal || "n/a"}` +
      (score ? `\nClarity score: ${score}` : "");
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, score }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setStatus("sent");
    } catch {
      // Fallback when email isn't configured: copy the brief and open X.
      setBrief(text);
      try {
        await navigator.clipboard.writeText(text);
      } catch {}
      window.open(site.xUrl, "_blank", "noopener");
      setStatus("fallback");
    }
  }

  if (status === "sent") {
    return (
      <div className="res" style={{ marginTop: 32 }}>
        Got it. I&apos;ll be in touch soon.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit}>
      <input className="hp" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="two">
        <input name="name" placeholder="Your name" required maxLength={120} />
        <input name="contact" placeholder="Email or X handle" required maxLength={160} />
      </div>
      <input name="url" placeholder="Product link (optional)" maxLength={300} />
      <div className="two">
        <select name="stage" defaultValue="Stage: Idea">
          <option>Stage: Idea</option>
          <option>Stage: Pre-launch</option>
          <option>Stage: Live, growing</option>
          <option>Stage: Scaling</option>
        </select>
        <select name="need" defaultValue="Need: Messaging">
          <option>Need: Messaging</option>
          <option>Need: Landing page</option>
          <option>Need: Content</option>
          <option>Need: Founder brand</option>
          <option>Need: Not sure yet</option>
        </select>
      </div>
      <select name="timeline" defaultValue="Timeline: ASAP">
        <option>Timeline: ASAP</option>
        <option>Timeline: within 30 days</option>
        <option>Timeline: 1 to 3 months</option>
      </select>
      <textarea name="goal" placeholder="What's the goal? What's not working?" maxLength={1500} />
      <button className="pill" type="submit" style={{ padding: 16 }} disabled={status === "sending"}>
        {status === "sending" ? "Sending..." : "Send my brief"}
      </button>
      {status === "fallback" && (
        <div id="sent" style={{ display: "block" }}>
          Email isn&apos;t connected yet, so I copied your brief and opened X. Paste it in a DM.
          <textarea id="brief" readOnly value={brief} />
        </div>
      )}
    </form>
  );
}
