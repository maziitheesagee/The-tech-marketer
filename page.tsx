import ScrollEngine from "@/components/ScrollEngine";
import Samples from "@/components/Samples";
import Quiz from "@/components/Quiz";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/config";

const MARQUEE = Array(4).fill("THE TECH MARKETER · PENNED BY JB ·").join(" ");

export default function Home() {
  return (
    <main>
      <ScrollEngine />

      <nav>
        <b>{site.name}</b>
        <a className="pill" href={site.xUrl} target="_blank" rel="noopener noreferrer">
          Let&apos;s talk
        </a>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="big" data-dir="1">Clarity</div>
        <div className="txt">
          {site.available && (
            <div className="badge">
              <i />
              Open for new projects
            </div>
          )}
          <div className="eyebrow">Tech startup marketer · Web3 fluent</div>
          <h1 style={{ marginTop: 14 }}>
            Complex tech.
            <br />
            Simple words.
            <br />
            Real customers.
          </h1>
          <p className="lead">
            I write the messaging, pages and content that make founders understood, trusted and chosen.
          </p>
          <div className="row">
            <a className="pill" href="#contact">Start a conversation</a>
            <a className="pill o" href="#services">What I do</a>
          </div>
        </div>
      </section>

      {/* PROBLEM */}
      <section>
        <div className="big front" data-dir="-1">Convert</div>
        <div className="txt" style={{ textAlign: "right", marginRight: 0 }}>
          <div className="eyebrow">The problem</div>
          <h2 style={{ marginTop: 14, marginLeft: "auto", maxWidth: 760 }}>Great products lose to clearer ones.</h2>
          <p className="lead" style={{ marginLeft: "auto" }}>
            If a visitor can&apos;t say what you do in five seconds, they&apos;re gone. I fix that first.
          </p>
        </div>
      </section>

      {/* WHO */}
      <section>
        <div className="big" data-dir="1">Founders</div>
        <div className="txt">
          <div className="eyebrow">Who I work with</div>
          <h2 style={{ marginTop: 14 }}>Built for teams with real tech and a message that&apos;s lagging behind it.</h2>
          <div className="chips">
            <span className="chip">Web3 &amp; crypto protocols</span>
            <span className="chip">AI &amp; SaaS startups</span>
            <span className="chip">Pre-launch founders</span>
            <span className="chip">Product-led teams</span>
          </div>
          <p className="lead">
            Not a fit: brands that want volume over clarity, or copy by committee. Best fit: founders who want a sharp
            point of view and can move fast.
          </p>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services">
        <div className="big" data-dir="1">Craft</div>
        <div className="txt">
          <div className="eyebrow">What I do</div>
          <h2 style={{ marginTop: 14 }}>Four ways in.</h2>
        </div>
        <div className="rail">
          <div className="card"><span className="no">01</span><div><h3>Positioning &amp; Messaging</h3><p>One sharp promise, one audience, one story your whole team repeats.</p></div></div>
          <div className="card"><span className="no">02</span><div><h3>Landing Page Copy</h3><p>Launch and product pages written to move people to act.</p></div></div>
          <div className="card"><span className="no">03</span><div><h3>Content Engine</h3><p>Threads, posts and newsletters that turn ideas into inbound.</p></div></div>
          <div className="card"><span className="no">04</span><div><h3>Founder-Led Brand</h3><p>Your voice, systemised, so you show up daily without the grind.</p></div></div>
        </div>
      </section>

      {/* TEARDOWN */}
      <section>
        <div className="big" data-dir="-1">Rewrite</div>
        <div className="txt">
          <div className="eyebrow">Sample teardown</div>
          <h2 style={{ marginTop: 14 }}>Same product. Different first impression.</h2>
          <div className="ba">
            <div><small>Before</small><p>“A decentralized, modular, cross-chain liquidity protocol powered by next-gen infrastructure.”</p></div>
            <div className="after"><small>After</small><p>“Move money across chains in one click. No bridges to learn, no fees to guess.”</p></div>
          </div>
          <p className="lead" style={{ fontSize: ".95rem" }}>Illustrative example of how I work.</p>
        </div>
      </section>

      {/* SAMPLES */}
      <section id="samples">
        <div className="big" data-dir="1">Proof</div>
        <div className="txt">
          <div className="eyebrow">Writing samples · spec work</div>
          <h2 style={{ marginTop: 14 }}>See how I write before you hire me.</h2>
          <Samples />
          <p className="lead" style={{ fontSize: ".9rem" }}>
            Fictional brands, written to show my thinking. Real client work will appear here.
          </p>
        </div>
      </section>

      {/* QUIZ */}
      <section id="check">
        <div className="big" data-dir="-1">Test</div>
        <div className="txt">
          <div className="eyebrow">Free · 30 seconds</div>
          <h2 style={{ marginTop: 14 }}>Is your message costing you customers?</h2>
          <Quiz />
        </div>
      </section>

      {/* PROCESS */}
      <section>
        <div className="big" data-dir="1">Ship</div>
        <div className="txt">
          <div className="eyebrow">Process</div>
          <div className="steps">
            <div className="step"><b>01</b><span><em>Discover</em>A short call to learn your product, buyer and goal.</span></div>
            <div className="step"><b>02</b><span><em>Draft</em>First messaging and copy in days, not weeks.</span></div>
            <div className="step"><b>03</b><span><em>Refine</em>We tune it until it sounds exactly like you.</span></div>
            <div className="step"><b>04</b><span><em>Launch</em>Publish-ready assets and a guide to use them.</span></div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section>
        <div className="big" data-dir="1">Why</div>
        <div className="txt">
          <div className="eyebrow">About</div>
          <h2 style={{ marginTop: 14 }}>I saw brilliant tech lose to clearer competitors.</h2>
          <p className="lead">
            I spent weeks publishing web3 explainers. It proved one thing: people buy what they understand. So I moved
            into tech startup marketing, and I&apos;m documenting every step in public.
          </p>
          <div className="chips">
            <span className="chip">Clarity over clever</span>
            <span className="chip">Outcomes over output</span>
            <span className="chip">Learn and ship in public</span>
          </div>
          <div className="row">
            <a className="pill o" href={site.xUrl} target="_blank" rel="noopener noreferrer">Follow the journey</a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq">
        <div className="txt">
          <div className="eyebrow">FAQ</div>
          <h2 style={{ marginTop: 14 }}>Before you reach out.</h2>
          <div className="faq">
            <details><summary>Do you understand technical and web3 products?</summary><p>Yes. I write web3 explainers publicly and turn technical ideas into language buyers act on.</p></details>
            <details><summary>How do you charge?</summary><p>Every project is scoped to your goal. After a short call you get a clear proposal, with no surprises.</p></details>
            <details><summary>How fast can we start?</summary><p>Most projects kick off within days of the first conversation.</p></details>
            <details><summary>What do you need from me?</summary><p>Access to your product, any existing docs, and a short call so I can capture your voice.</p></details>
            <details><summary>What if I don&apos;t love the first draft?</summary><p>We align on direction before I write, and revisions are part of every project.</p></details>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" style={{ textAlign: "center" }}>
        <span id="contact" style={{ position: "absolute", top: 0 }} />
        <div className="big" data-dir="-1" style={{ opacity: 0.14 }}>Hello</div>
        <div className="txt">
          <h2 style={{ fontSize: "clamp(2.4rem,8vw,6.5rem)" }}>Let&apos;s make your message impossible to ignore.</h2>
          <p className="lead" style={{ margin: "20px auto 0" }}>
            Tell me about your project. I&apos;ll reply with a free, honest messaging teardown.
          </p>
          {site.bookingUrl && (
            <div className="row" style={{ justifyContent: "center" }}>
              <a className="pill o" href={site.bookingUrl} target="_blank" rel="noopener noreferrer">Or book a call</a>
            </div>
          )}
          <ContactForm />
        </div>
        <div className="mq">{MARQUEE}</div>
      </section>
    </main>
  );
}
