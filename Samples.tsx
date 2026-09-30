"use client";
import { useState } from "react";

const TABS = ["X thread", "Landing hero", "Launch email"];

export default function Samples() {
  const [i, setI] = useState(0);
  return (
    <>
      <div className="tabs" role="tablist">
        {TABS.map((t, n) => (
          <button key={t} className="tab" role="tab" aria-selected={i === n} onClick={() => setI(n)}>
            {t}
          </button>
        ))}
      </div>
      {i === 0 && (
        <div className="panel">
          <small>Thread · what is account abstraction?</small>
          <p className="h">Your crypto wallet shouldn&apos;t feel like defusing a bomb.</p>
          <p>
            1/ Today, one wrong copy-paste can cost you everything.
            <br />
            2/ Account abstraction makes wallets behave like apps you already use.
            <br />
            3/ Recover access without a 12-word panic. Pay fees in the token you hold.
            <br />
            4/ Same security. A tenth of the anxiety. That&apos;s why it matters.
          </p>
        </div>
      )}
      {i === 1 && (
        <div className="panel">
          <small>Landing hero · fictional wallet</small>
          <p className="h">A wallet as easy as your banking app. Safer than a vault.</p>
          <p>
            Send, save and recover in seconds. No seed phrase stress, no hidden fees.
            <br />
            <b>Create your wallet →</b>
          </p>
        </div>
      )}
      {i === 2 && (
        <div className="panel">
          <small>Launch email · fictional SaaS</small>
          <p className="h">Subject: Your reports just got 10x faster</p>
          <p>
            Hi Sam, you told us reporting eats your Fridays. Today we&apos;re launching one-click reports that finish in
            seconds. Try it on your next dashboard, and get your Friday back.
          </p>
        </div>
      )}
    </>
  );
}
