import "../index.css";
import imgurl from "../assets/finalBellLogo.png";
import { CheckCircle } from "lucide-react"; // <-- import icon
import NavBar from "./NavBar";

export default function Pricing() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <NavBar logoSrc={imgurl} />

      {/* Pricing */}
      <section
        id="pricing"
        className="mx-auto max-w-6xl px-6 py-16 md:px-8"
        aria-label="Session pricing and packages"
      >
        <h2 className="text-3xl font-bold md:text-4xl text-secondary">
          Pricing
        </h2>
        <p className="mt-2 text-neutral-300">
          Intro offer available for first-time clients.
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-4">
          <PriceCard
            label="60 Minute 1:1 Session"
            price="£200"
            subtitle="for 5 sessions (over 5 weeks)"
            bullets={[
              "Technique focus",
              "Strength & conditioning",
              "Progress tracking",
            ]}
          />
          <PriceCard
            label="30 Minute 1:1 Session"
            price="£100"
            subtitle="for 5 sessions (over 5 weeks)"
            bullets={[
              "Technique focus",
              "Strength & conditioning",
              "Progress tracking",
            ]}
          />
          <PriceCard
            highlight
            label="Small Group (2–4)"
            price="£250"
            subtitle="for 5 sessions (over 5 weeks)"
            bullets={[
              "Shared cost, same intensity",
              "Partner drills",
              "Great for friends/couples",
            ]}
          />
          <PriceCard
            label="Intro Offer"
            price="50% OFF"
            subtitle="first session"
            bullets={[
              "No obligation",
              "All levels welcome",
              "Promo code: FINAL50",
            ]}
          />
        </div>
      </section>
      <footer className="mx-auto max-w-6xl px-6 py-4 text-center text-sm text-neutral-500 md:px-8">
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

function PriceCard({
  label,
  price,
  subtitle,
  bullets,
  highlight,
}: {
  label: string;
  price: string;
  subtitle: string;
  bullets: string[];
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl p-6 ring-2 ${
        highlight ? "bg-neutral-900/70" : "bg-neutral-900/60"
      } ring-secondary`}
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
    </div>
  );
}
