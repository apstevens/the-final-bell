import { useState } from "react";
import "./index.css";
import {
  Sparkles,
  CheckCircle,
  ChevronRight,
  Shield,
  Dumbbell,
  Target,
} from "lucide-react";
import NavBar from "./pages/NavBar.tsx";
import imgUrl from "./assets/meet-the-coach.webp";
import imgurl2 from "./assets/finalBellLogo.png";
import { useMeta } from "./lib/UseMeta.ts";

export default function TheFinalBellLanding() {

  useMeta({
    title: "The Final Bell | Boxing & Muay Thai Personal Training in Chelmsford",
    description: "The Final Bell provides professional Boxing & Muay Thai personal training focused on skill, strength, and mindset. Train with us in Chelmsford.",
    canonical: "https://www.finalbell.co.uk",
  });
  const [openFAQ, setOpenFAQ] = useState<number | null>(0);

  const faqs = [
    {
      q: "Who are the sessions for?",
      a: "Adults of all levels. Beginners welcome. Sessions are scaled to your fitness and experience.",
    },
    {
      q: "Where and when do you train?",
      a: "Chelmsford — Saturdays only. Exact location confirmed on booking (studio/park depending on weather).",
    },
    {
      q: "Do I need experience or equipment?",
      a: "No experience required. Gloves and pads provided; bring water and trainers.",
    },
    {
      q: "Do you run small groups?",
      a: "Yes — 2–4 people. It is a cost‑effective, high‑energy option and great for friends or couples.",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      {/* Hero */}
      <NavBar logoSrc={imgurl2} />

      {/* Trust / Value props */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        {/* Headline Tagline */}
        <div className="mb-8 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-secondary">
            Forge the Fighter Within
          </h2>
          <p className="mt-3 text-lg text-neutral-300">
            Strength, skill, and mindset — built through discipline and real
            combat training.
          </p>
        </div>

        {/* Section Heading */}
        <h3 className="text-2xl font-bold text-secondary mb-4">
          Why Train with Final Bell
        </h3>

        <p className="text-neutral-300 leading-relaxed mb-6">
          At <span className="font-semibold text-secondary">Final Bell</span>,
          training isn’t about trends — it’s about transformation. Each session
          combines authentic{" "}
          <span className="text-secondary">
            Boxing and Muay Thai technique{" "}
          </span>
          with proven{" "}
          <span className="text-secondary">
            strength and conditioning principles
          </span>{" "}
          to develop precision, power, and resilience.
        </p>

        <p className="text-neutral-300 leading-relaxed mb-10">
          Led by{" "}
          <span className="font-semibold text-secondary">Andy Stevens</span> —
          coach, former fighter, and performance specialist — Final Bell
          delivers{" "}
          <span className="text-secondary">real-world combat training</span>{" "}
          designed to challenge your body and sharpen your mind. Whether your
          goal is fitness, confidence, or performance, this is where
          <span className="text-secondary font-semibold">
            {" "}
            discipline meets progress
          </span>
          .
        </p>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-secondary/40 p-6 bg-neutral-900/50 hover:bg-primary-light transition">
            <h4 className="text-lg font-semibold text-secondary mb-2">
              <Shield className="inline-block mr-2 h-5 w-5 text-secondary" />
              Safe & Technical
            </h4>
            <p className="text-neutral-300 text-sm">
              Master proper boxing and Muay Thai fundamentals with an
              injury-aware approach that prioritises longevity.
            </p>
          </div>

          <div className="rounded-2xl border border-secondary/40 p-6 bg-neutral-900/50 hover:bg-primary-light transition">
            <h4 className="text-lg font-semibold text-secondary mb-2">
              <Dumbbell className="inline-block mr-2 h-5 w-5 text-secondary" />
              Strength & Conditioning
            </h4>
            <p className="text-neutral-300 text-sm">
              Targeted programming that enhances strength, stamina, and athletic
              performance for every fitness level.
            </p>
          </div>

          <div className="rounded-2xl border border-secondary/40 p-6 bg-neutral-900/50 hover:bg-primary-light transition">
            <h4 className="text-lg font-semibold text-secondary mb-2">
              <Target className="inline-block mr-2 h-5 w-5 text-secondary" />
              Saturday-Only Focus
            </h4>
            <p className="text-neutral-300 text-sm">
              Peak-efficiency sessions crafted for busy schedules — maximum
              output, minimum time.
            </p>
          </div>
        </div>
      </section>

      {/* Services */}
      <section
        id="services"
        className="bg-neutral-900/60"
        aria-label="Training services"
      >
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <h2 className="text-3xl font-bold md:text-4xl text-secondary">
            What We Offer
          </h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <ServiceCard
              title="1:1 Personal Training"
              points={[
                "Technique‑led padwork",
                "Strength blocks",
                "Tailored to your goals",
              ]}
            />
            <ServiceCard
              title="Small Group (2–4)"
              points={[
                "Cost‑effective",
                "High‑energy circuits",
                "Bring a friend",
              ]}
            />
            <ServiceCard
              title="Boxing & Muay Thai Fitness"
              points={[
                "Footwork & defence",
                "Pad & bag work",
                "Conditioning finishers",
              ]}
            />
          </div>
        </div>
      </section>

      {/* Coach Bio */}
      <section
        className="bg-neutral-900/80"
        aria-label="Coach introduction and credentials"
      >
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-8">
          {/* Text content */}
          <div>
            <h2 className="text-3xl font-bold md:text-4xl text-secondary">
              Train with Experience
            </h2>
            <p className="mt-4 text-neutral-300 leading-relaxed">
              Led by{" "}
              <span className="font-semibold text-secondary">Andy Stevens</span>{" "}
              — former fighter and specialist strength & conditioning coach —
              every Final Bell session blends authentic boxing and Muay Thai
              technique with structured performance training to build lasting
              skill, confidence, and conditioning.
            </p>

            <ul className="mt-6 space-y-2 text-neutral-200">
              {[
                "Technique-focused, results-driven coaching",
                "Strength & conditioning principles applied to combat sport",
                "Supportive environment built on discipline and respect",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 flex-none text-secondary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="mt-6">
              <a
                href="/about"
                className="inline-block rounded-2xl px-6 py-3 text-base font-semibold bg-secondary text-neutral-900 shadow-lg ring-2 ring-secondary hover:bg-primary-light/90 hover:text-amber-50 transition"
              >
                Learn More About Andy
              </a>
              <p className="mt-2 text-sm text-neutral-400">
                Discover Andy’s qualifications, competition record, and training
                philosophy.
              </p>
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <img
              src={imgUrl}
              alt="Coach Andy training in the ring"
              className="h-full w-full rounded-2xl object-cover shadow-2xl ring-1 ring-secondary/40"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-secondary/60" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className="mx-auto max-w-6xl px-6 py-16 md:px-8"
        aria-label="Client feedback and results"
      >
        <h2 className="text-3xl font-bold md:text-4xl text-secondary">
          Client Results
        </h2>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {[
            {
              quote:
                "I dropped 6kg in 8 weeks and finally learned real boxing technique. Sessions fly by.",
              name: "Sam, Chelmsford",
            },
            {
              quote:
                "Perfect Saturday reset. Hard work, smart coaching, and zero ego.",
              name: "Laura, Great Baddow",
            },
            {
              quote:
                "Small‑group option is brilliant — motivating and affordable.",
              name: "James, Springfield",
            },
          ].map((t, i) => (
            <blockquote
              key={i}
              className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary hover:bg-primary-light transition"
            >
              <Sparkles className="h-6 w-6 bg-ring-neutral-900 text-secondary" />
              <p className="mt-3 text-neutral-200">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-neutral-400">
                — {t.name}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section
        id="book-cta"
        className="relative overflow-hidden bg-neutral-900/80"
        aria-label="Call to action to book a session"
      >
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:px-8">
          <h3 className="text-3xl font-bold text-secondary">
            Ready to train before the final bell?
          </h3>
          <p className="max-w-2xl text-neutral-300">
            Secure your Saturday slot now. Limited spaces each week to keep
            coaching quality high.
          </p>
          <div className="flex gap-3">
            <a
              href="/book"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-lg bg-secondary ring-2 ring-secondary text-neutral-950 hover:bg-primary-light hover:text-amber-50"
            >
              Book Online <ChevronRight className="h-5 w-5" />
            </a>
            <a
              href="mailto:hello@finalbell.co.uk?subject=Booking%20enquiry"
              className="rounded-2xl px-5 py-3 font-semibold ring-2 ring-neutral-700 hover:bg-secondary hover:text-neutral-900"
            >
              Email Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-8">
          <div>
            <h5 className="text-sm font-semibold text-neutral-400">FAQs</h5>
            <ul className="mt-2 space-y-2">
              {faqs.map((f, i) => (
                <li
                  key={i}
                  className="rounded-xl bg-neutral-900/60 p-3 ring-1 ring-secondary"
                >
                  <button
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  >
                    <span className="font-medium">{f.q}</span>
                    <ChevronRight
                      className={`h-5 w-5 transition-transform ${
                        openFAQ === i ? "rotate-90" : ""
                      }`}
                    />
                  </button>
                  {openFAQ === i && (
                    <p className="mt-2 text-sm text-neutral-300">{f.a}</p>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
          <p>&copy; 2025 The Final Bell Ltd. All rights reserved.</p>
          <p>Registered in England &amp; Wales · Company No. 16790962</p>
          <a href="/privacy-policy" className="ml-2 hover:underline">
            Privacy Policy
          </a>
          .
          <a href="/terms-of-service" className="ml-2 hover:underline">
            Terms of Service
          </a>
          .
        </div>
      </footer>
    </div>
  );
}

function ServiceCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary hover:bg-primary-light transition">
      <h3 className="text-xl font-semibold text-secondary">{title}</h3>
      <ul className="mt-4 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full bg-secondary" />
            <span className="text-neutral-300">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
