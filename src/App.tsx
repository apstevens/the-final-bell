import { useState } from "react";
import "./index.css";
import { InlineWidget } from "react-calendly";
import { Dumbbell, ShieldCheck, Clock, Sparkles, CheckCircle, Instagram, Phone, Mail, MapPin, ChevronRight } from "lucide-react";
import imgUrl from './assets/meet-the-coach.jpg';
import imgurl1 from './assets//boxing.jpg';
import imgurl2 from './assets/finalBellLogoHorizontal.png';

// Brand colours
const burgundy = "#800020";
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
            Every Saturday — Chelmsford
          </span>
          <h1 className="text-4xl font-extrabold leading-tight sm:text-5xl md:text-6xl">
            <img src={imgurl2} alt="The Final Bell Logo" className="w-md" />
            <span className="block mt-2 text-secondary">Boxing Fitness & Muay Thai Training</span>
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
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-6 py-12 md:grid-cols-3 md:px-8">
        <ValueCard icon={<ShieldCheck />} title="Safe & Technical" desc="Proper boxing/Muay Thai fundamentals with injury‑aware coaching." />
        <ValueCard icon={<Dumbbell />} title="Strength & Conditioning" desc="Programming that improves power, stamina, and mobility." />
        <ValueCard icon={<Clock />} title="Saturday‑Only Focus" desc="Peak‑efficiency sessions designed for busy schedules." />
      </section>

      {/* Services */}
      <section id="services" className="bg-neutral-900/60">
        <div className="mx-auto max-w-6xl px-6 py-16 md:px-8">
          <h2 className="text-3xl font-bold md:text-4xl" style={{ color: gold }}>What We Offer</h2>
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
      <section id="pricing" className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <h2 className="text-3xl font-bold md:text-4xl" style={{ color: gold }}>Pricing</h2>
        <p className="mt-2 text-neutral-300">Intro offer available for first‑time clients.</p>
        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <PriceCard
            label="1:1 Session"
            price="£40"
            subtitle="per 60 mins"
            bullets={["Technique focus", "Strength & conditioning", "Progress tracking"]}
          />
          <PriceCard
            label="1:1 Session"
            price="£20"
            subtitle="per 30 mins"
            bullets={["Technique focus", "Strength & conditioning", "Progress tracking"]}
          />
          <PriceCard
            highlight
            label="Small Group (2–4)"
            price="£25"
            subtitle="per person / 60 mins"
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
      <section className="bg-neutral-900/60">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-10 px-6 py-16 md:grid-cols-2 md:px-8">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl" style={{ color: gold }}>Meet Your Coach</h2>
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
                  <CheckCircle style={{ color: gold }} className="mt-1 h-5 w-5 flex-none" />
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img
              src={imgUrl}
              alt="Coach Andy in the ring"
              className="h-full w-full rounded-2xl object-cover shadow-2xl ring-1 ring-neutral-800"
            />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2" style={{ borderColor: burgundy }} />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <h2 className="text-3xl font-bold md:text-4xl" style={{ color: gold }}>Client Results</h2>
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
            <blockquote key={i} className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-neutral-800">
              <Sparkles className="h-6 w-6" style={{ color: gold }} />
              <p className="mt-3 text-neutral-200">“{t.quote}”</p>
              <footer className="mt-4 text-sm text-neutral-400">— {t.name}</footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section id="book-cta" className="relative overflow-hidden bg-neutral-900/80">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-6 px-6 py-16 md:px-8">
          <h3 className="text-3xl font-bold text-secondary">Ready to train before the final bell?</h3>
          <p className="max-w-2xl text-neutral-300">
            Secure your Saturday slot now. Limited spaces each week to keep coaching quality high.
          </p>
          <div className="flex gap-3">
            <a
              href="#book"
              className="inline-flex items-center gap-2 rounded-2xl px-5 py-3 font-semibold shadow-lg"
              style={{ backgroundColor: gold, color: "#111" }}
            >
              Book Online <ChevronRight className="h-5 w-5" />
            </a>
            <a
              href="mailto:hello@thefinalbell.co.uk?subject=Booking%20enquiry"
              className="rounded-2xl px-5 py-3 font-semibold ring-2 ring-neutral-700 hover:bg-neutral-800"
            >
              Email Enquiry
            </a>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="mx-auto max-w-6xl px-6 py-16 md:px-8">
        <h2 className="text-3xl font-bold md:text-4xl" style={{ color: gold }}>Book & Pay</h2>
        <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <p className="text-neutral-300">Choose a Saturday slot below. Bookings are managed securely via Calendly.</p>
            <div className="mt-4 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
              <InlineWidget
                url="https://calendly.com/nakmuayandy/new-meeting"
                styles={{ height: 700 }}
              />
            </div>
          </div>
          <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-neutral-800">
            <h3 className="text-xl font-semibold" style={{ color: gold }}>Complete Payment</h3>
            <p className="mt-2 text-neutral-300">
              To confirm your booking, please complete payment after selecting your time.
            </p>
            <ul className="mt-4 space-y-2">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5" style={{ color: gold }} />
                <span className="text-neutral-300">30 minute 1:1 Session — <strong>£20</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5" style={{ color: gold }} />
                <span className="text-neutral-300">60 minute 1:1 Session — <strong>£40</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 h-5 w-5" style={{ color: gold }} />
                <span className="text-neutral-300">Small Group (2–4) — <strong>£25 pp</strong></span>
              </li>
            </ul>
            <a
              href="https://calendly.com/nakmuayandy/30min"
              className="mt-5 block rounded-2xl px-4 py-3 text-center font-semibold shadow-lg"
              style={{ backgroundColor: gold, color: "#111" }}
            >
              Pay for 30 minute 1:1 Session
            </a>
            <a
              href="https://calendly.com/nakmuayandy/60-minute-pt"
              className="mt-5 block rounded-2xl px-4 py-3 text-center font-semibold shadow-lg"
              style={{ backgroundColor: gold, color: "#111" }}
            >
              Pay for 60 minute 1:1 Session
            </a>
            <a
              href="https://calendly.com/nakmuayandy/new-meeting"
              className="mt-3 block rounded-2xl px-4 py-3 text-center font-semibold ring-2 ring-neutral-700 hover:bg-neutral-800"
            >
              Pay for Group Session
            </a>
            <p className="mt-3 text-xs text-neutral-400">Payments processed by Stripe. You’ll receive an email confirmation and receipt.</p>
          </div>
        </div>
      </section>

      {/* Contact */}
      <footer className="border-t border-neutral-800">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 py-12 md:grid-cols-3 md:px-8">
          <div>
            <h4 className="text-xl font-bold" style={{ color: gold }}>The Final Bell</h4>
            <p className="mt-2 text-neutral-300">Boxing Fitness & Muay Thai Training — Chelmsford (Saturdays)</p>
          </div>
          <div className="space-y-3">
            <p className="flex items-center gap-2"><Phone className="h-5 w-5" style={{ color: gold }} /> +44 7485 041755</p>
            <p className="flex items-center gap-2"><Mail className="h-5 w-5" style={{ color: gold }} /> hello@finalbell.co.uk</p>
            <p className="flex items-center gap-2"><Instagram className="h-5 w-5" style={{ color: gold }} /> @andy_p_stevens</p>
            <p className="flex items-center gap-2"><MapPin className="h-5 w-5" style={{ color: gold }} /> Chelmsford, UK</p>
          </div>
          <div>
            <h5 className="text-sm font-semibold text-neutral-400">FAQs</h5>
            <ul className="mt-2 space-y-2">
              {faqs.map((f, i) => (
                <li key={i} className="rounded-xl bg-neutral-900/60 p-3 ring-1 ring-neutral-800">
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
          © {new Date().getFullYear()} The Final Bell. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

function ValueCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-neutral-800">
      <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-xl" style={{ backgroundColor: "#1f1f1f", color: gold }}>
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-secondary">{title}</h3>
      <p className="mt-1 text-neutral-300">{desc}</p>
    </div>
  );
}

function ServiceCard({ title, points }: { title: string; points: string[] }) {
  return (
    <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-neutral-800">
      <h3 className="text-xl font-semibold" style={{ color: gold }}>{title}</h3>
      <ul className="mt-4 space-y-2">
        {points.map((p) => (
          <li key={p} className="flex items-start gap-2">
            <span className="mt-1 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: gold }} />
            <span className="text-neutral-300">{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function PriceCard({ label, price, subtitle, bullets, highlight }: { label: string; price: string; subtitle: string; bullets: string[]; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-6 ring-2 ${highlight ? "bg-neutral-900/70" : "bg-neutral-900/60"}`}
      style={{ borderColor: highlight ? gold : "#2a2a2a" }}
    >
      <h3 className="text-lg font-semibold" style={{ color: gold }}>{label}</h3>
      <div className="mt-3 flex items-end gap-2">
        <span className="text-4xl font-extrabold">{price}</span>
        <span className="text-sm text-neutral-400">{subtitle}</span>
      </div>
      <ul className="mt-4 space-y-2">
        {bullets.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <CheckCircle className="mt-0.5 h-5 w-5" style={{ color: gold }} />
            <span className="text-neutral-300">{b}</span>
          </li>
        ))}
      </ul>
      <a
        href="https://wa.me/447000000000?text=Hi%20Andy%2C%20I%27d%20like%20to%20book%20a%20Saturday%20session%20with%20The%20Final%20Bell."
        className="mt-6 inline-flex items-center justify-center rounded-2xl px-4 py-2 font-semibold shadow-lg hover:opacity-95"
        style={{ backgroundColor: gold, color: "#111" }}
      >
        Book Online
      </a>
    </div>
  );
}
