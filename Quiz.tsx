"use client";
import { useState } from "react";

const Q = [
  "Can a stranger say what you do within 5 seconds?",
  "Does your headline name exactly who it is for?",
  "Do you lead with a benefit, not a feature list?",
  "Is there one clear call to action above the fold?",
  "Do you post consistently about the problem you solve?",
];

export default function Quiz() {
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);

  const answer = (yes: boolean) => {
    const next = score + (yes ? 1 : 0);
    setScore(next);
    if (i + 1 >= Q.length) {
      window.dispatchEvent(new CustomEvent("quiz-score", { detail: `${next}/5` }));
    }
    setI(i + 1);
  };

  if (i >= Q.length) {
    const r =
      score <= 1
        ? "Your message is leaking customers."
        : score <= 3
        ? "Good bones. Conversions are leaking."
        : "Strong base. Let's sharpen and scale it.";
    return (
      <div className="q">
        <div className="prog">Your score: {score} / 5</div>
        <div className="res" style={{ margin: "12px 0 18px" }}>
          {r}
        </div>
        <a className="pill" href="#contact">
          Get my free teardown
        </a>
      </div>
    );
  }

  return (
    <div className="q">
      <div className="prog">
        Question {i + 1} of {Q.length}
      </div>
      <div className="qt">{Q[i]}</div>
      <div className="ans">
        <button className="pill" onClick={() => answer(true)}>
          Yes
        </button>
        <button className="pill o" onClick={() => answer(false)}>
          Not really
        </button>
      </div>
    </div>
  );
}
