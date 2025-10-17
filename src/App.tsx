import { useState } from "react";
import "./index.css";
import { Dumbbell, ShieldCheck, Clock, Sparkles, CheckCircle, Instagram, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import imgUrl from './assets/meet-the-coach.webp';
import imgurl1 from './assets//boxing.webp';
import imgurl2 from './assets/finalBellLogoHorizontal.png';

// Brand colours
const gold = "#FFD700";

export default function TheFinalBellLanding() {
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
      <header className="relative overflow-hidden">
        <img
          src={imgurl1}
          alt="Boxer mid‑punch in the ring"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />
          <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-12 md:px-8 md:py-4">
            <span className="text-sm font-semibold tracking-wider text-secondary">
            Every Saturday — Chelmsford/Witham
            </span>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl md:text-4xl">
              <img src={imgurl2} alt="The Final Bell Logo" className="inline-block w-3xs" />
              <span className="block mt-2 text-secondary"> Boxing Fitness & Muay Thai Training</span>
            </h1>
            <p className="max-w-2xl text-lg text-neutral-200">
            High‑impact, technique‑led sessions with <span className="font-semibold">Andy Stevens</span> — PT & former fighter. 
            Burn fat, build strength, and learn authentic skills.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
              href="https://wa.me/447485041755?text=Hi%20Andy%2C%20I%27d%20like%20to%20book%20a%20Saturday%20session%20with%20The%20Final%20Bell."
              className="rounded-2xl px-5 py-3 text-base font-semibold shadow-lg ring-2 bg-secondary text-neutral-900 hover:opacity-95 hover:bg-primary-dark hover:text-amber-50"
              >
                Book a Session
              </a>
              <a
                href="#pricing"
                className="rounded-2xl px-5 py-3 text-base font-semibold ring-2 ring-neutral-700 hover:bg-secondary hover:text-neutral-900"
              >
                View Pricing
              </a>
            </div>
        </div>
      </header>

      {/* Trust / Value props */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-12 md:grid-cols-3 md:px-8" aria-label="Key training principles">
        <h2 id="principles-heading" className="sr-only">Key training principles</h2>
        <ValueCard icon={<ShieldCheck />} title="Safe & Technical" desc="Proper boxing/Muay Thai fundamentals with injury‑aware coaching." />
        <ValueCard icon={<Dumbbell />} title="Strength & Conditioning" desc="Programming that improves power, stamina, and mobility." />
        <ValueCard icon={<Clock />} title="Saturday‑Only Focus" desc="Peak‑efficiency sessions designed for busy schedules." />
      </section>

      {/* Services */}
      <section id="services" className="bg-neutral-900/60" aria-label="Training services">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <h2 className="text-3xl font-bold md:text-4xl text-secondary">What We Offer</h2>
          <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <ServiceCard
              title="1:1 Personal Training"
              points={["Technique‑led padwork", "Strength blocks", "Tailored to your goals"]}
            />
            <ServiceCard
              title="Small Group (2–4)"
              points={["Cost‑effective", "High‑energy circuits", "Bring a friend"]}
            />
            <ServiceCard
              title="Boxing & Muay Thai Fitness"
              points={["Footwork & defence", "Pad & bag work", "Conditioning finishers"]}
            />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16 md:px-8" aria-label="Session pricing and packages">
        <h2 className="text-3xl font-bold md:text-4xl text-secondary" >Pricing</h2>
        <p className="mt-2 text-neutral-300">Intro offer available for first‑time clients.</p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4 ">
          <PriceCard
            label="60 Minute 1:1 Session"
            price="£200"
            subtitle="for 5 sessions (over 5 weeks)"
            bullets={["Technique focus", "Strength & conditioning", "Progress tracking"]}
          />
          <PriceCard
            label="30 Minute 1:1 Session"
            price="£100"
            subtitle="for 5 sessions (over 5 weeks)"
            bullets={["Technique focus", "Strength & conditioning", "Progress tracking"]}
          />
          <PriceCard
            highlight
            label="Small Group (2–4)"
            price="£250"
            subtitle="for 5 sessions (over 5 weeks)"
            bullets={["Shared cost, same intensity", "Partner drills", "Great for friends/couples"]}
          />
          <PriceCard
            label="Intro Offer"
            price="50% OFF"
            subtitle="first session"
            bullets={["No obligation", "All levels welcome"]}
          />
        </div>
      </section>

      {/* Coach Bio */}
      <section className="bg-neutral-900/60" aria-label="Coach biography and qualifications">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl text-secondary">Meet Your Coach</h2>
            <p className="mt-4 text-neutral-300">
              I'm <span className="font-semibold">Andy</span> — former fighter and 
              specialist PT in boxing and Muay Thai conditioning. I combine practical ring craft with structured S&C so you build 
              skill, confidence, and real‑world fitness.
            </p>
            <ul className="mt-6 space-y-2 text-neutral-200">
              {[
                "Technique over ego — safe, scalable sessions",
                "Evidence‑based programming",
                "Supportive, motivating environment",
              ].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <CheckCircle className="mt-1 h-5 w-5 flex-none text-secondary" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-wrap gap-3">
              <a
              href="/about"
              className="rounded-2xl px-5 py-3 text-base font-semibold shadow-lg ring-2 bg-secondary text-neutral-900 hover:opacity-95 hover:bg-primary-dark hover:text-amber-50"
              >
                Meet Andy
              </a>
            </div>
          </div>
          <div className="relative">
            <img
              src={imgUrl}
              alt="Coach Andy in the ring"
              className="h-full w-full rounded-2xl object-cover shadow-2xl ring-1 ring-primary-dark opacity-200 md:opacity-50"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-secondary" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8" aria-label="Client feedback and results">
        <h2 className="text-3xl font-bold md:text-4xl text-secondary">Client Results</h2>
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
            <blockquote key={i} className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
              <Sparkles className="h-6 w-6 bg-ring-neutral-900" />
              <p className="mt-3 text-neutral-200">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-neutral-400">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="book-cta" className="relative overflow-hidden bg-neutral-900/80" aria-label="Call to action to book a session">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:px-8">
          <h3 className="text-3xl font-bold text-secondary">Ready to train before the final bell?</h3>
          <p className="max-w-2xl text-neutral-300">
            Secure your Saturday slot now. Limited spaces each week to keep coaching quality high.
          </p>
          <div className="flex gap-3">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-lg bg-secondary text-neutral-950 hover:bg-primary-dark hover:text-amber-50">
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

     {/* Booking Section (Pay first → redirect to members booking) */}
<section id="book" className="mx-auto max-w-6xl px-6 py-16 md:px-8" aria-label="Purchase session packs and booking information">
  <h2 className="text-3xl font-bold md:text-4xl text-secondary">Buy a Pack</h2>
  <p className="mt-2 text-neutral-300">
    Purchase a 5-session pack. After checkout you’ll be automatically redirected to the members booking page
    to schedule your Saturday sessions (<strong>08:00–10:00</strong> and <strong>11:00–15:00</strong>).
  </p>

  <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
    <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
      <h3 className="text-xl font-semibold text-secondary">5 × 30-Minute 1:1</h3>
      <p className="mt-2 text-neutral-300">Technique focus, fast and efficient.</p>
      <p className="mt-3 text-3xl font-extrabold">£100</p>
      <a
        href="https://buy.stripe.com/28EaEX0fD1o5aCv6ql8IU02"
        target="_blank" rel="noreferrer"
        className="mt-5 block rounded-2xl px-4 py-3 text-center font-semibold shadow-lg bg-secondary text-neutral-950 hover:bg-primary-dark hover:text-amber-50"
      >
        Buy 5 × 30-Minute Sessions
      </a>
    </div>

    <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
      <h3 className="text-xl font-semibold text-secondary">5 × 60-Minute 1:1</h3>
      <p className="mt-2 text-neutral-300">Deeper technical work + conditioning.</p>
      <p className="mt-3 text-3xl font-extrabold">£200</p>
      <a
        href="https://buy.stripe.com/3cI8wPfax5El25ZaGB8IU01"
        target="_blank" rel="noreferrer"
        className="mt-5 block rounded-2xl px-4 py-3 text-center font-semibold shadow-lg bg-secondary text-neutral-950 hover:bg-primary-dark hover:text-amber-50"
      >
        Buy 5 × 60-Minute Sessions
      </a>
    </div>

    <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
      <h3 className="text-xl font-semibold text-secondary">5 × Small Group (2–4)</h3>
      <p className="mt-2 text-neutral-300">Partner drills, high energy, shared cost.</p>
      <p className="mt-3 text-3xl font-extrabold">£250</p>
      <a
        href="https://buy.stripe.com/eVq14n6E1feV3a3aGB8IU03"
        target="_blank" rel="noreferrer"
        className="mt-5 block rounded-2xl px-4 py-3 text-center font-semibold ring-2 ring-neutral-700 hover:bg-secondary hover:text-neutral-900"
      >
        Buy 5 × Small Group Sessions
      </a>
    </div>
  </div>

  <p className="mt-4 text-xs text-neutral-400">
    Payments processed by Stripe. You’ll receive an email receipt. After payment you’ll be redirected to the members area to schedule your sessions.
  </p>
</section>


      {/* Contact */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3 md:px-8">
          <div>
            <h4 className="text-xl font-bold text-secondary" style={{ color: gold }}>The Final Bell</h4>
            <p className="mt-2 text-neutral-300">Boxing Fitness & Muay Thai Training — Chelmsford/Witham (Saturdays)</p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2"><Phone className="h-5 w-5 text-secondary" /><a href="tel:+447485041755"> +44 7485 041755</a></p>
            <p className="flex items-center gap-2"><Mail className="h-5 w-5 text-secondary" /> <a href="mailto:hello@finalbell.co.uk">hello@finalbell.co.uk</a></p>
            <p className="flex items-center gap-2"><Instagram className="h-5 w-5 text-secondary" /> <a href="https://instagram.com/finalbell2025">@finalbell2025</a></p>
            <p className="flex items-center gap-2"><MapPin className="h-5 w-5 text-secondary" /> Chelmsford, UK</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-neutral-400">FAQs</h5>
            <ul className="mt-2 space-y-2">
              {faqs.map((f, i) => (
                <li key={i} className="rounded-xl bg-neutral-900/60 p-3 ring-1 ring-secondary">
                  <button
                    className="flex w-full items-center justify-between text-left"
                    onClick={() => setOpenFAQ(openFAQ === i ? null : i)}
                  >
                    <span className="font-medium">{f.q}</span>
                    <ChevronRight className={`h-5 w-5 transition-transform ${openFAQ === i ? "rotate-90" : ""}`} />
                  </button>
                  {openFAQ === i && <p className="mt-2 text-sm text-neutral-300">{f.a}</p>}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-neutral-800 py-6 text-center text-sm text-neutral-500">
          &copy; 2025 The Final Bell. All rights reserved.
          <a href="/privacy-policy" className="ml-2 hover:underline">Privacy Policy</a>.
          <a href="/terms-of-service" className="ml-2 hover:underline">Terms of Service</a>.
        </div>
      </footer>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl text-secondary bg-neutral-900">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="mt-1 text-neutral-300">{desc}</p>
    </div>
  );
}

function ServiceCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
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

function PriceCard({ label, price, subtitle, bullets, highlight }: { label: string; price: string; subtitle: string; bullets: string[]; highlight?: boolean; }) {
  return (
    <div
      className={`rounded-2xl p-6 ring-2 ${highlight ? "bg-neutral-900/70" : "bg-neutral-900/60"} ring-secondary`}
    >
      <h3 className="text-lg font-semibold text-secondary">{label}</h3>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className="text-sm text-neutral-400">{subtitle}</span>
      </div>
      <ul className="mt-4 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-5 w-5 text-secondary" />
            <span className="text-neutral-300">{b}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://wa.me/447485041755?text=Hi%20Andy%2C%20I%27d%20like%20to%20book%20a%20Saturday%20session%20with%20The%20Final%20Bell."
        className="mt-6 inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold shadow-lg hover:opacity-95 bg-secondary text-neutral-950 hover:bg-primary-dark hover:text-amber-50"
      >
        Book Online
      </a>
    </div>
  );
}
