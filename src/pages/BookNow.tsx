import "../index.css";
import imgurl2 from "../assets/finalBellLogo.png";
import NavBar from "./NavBar";
import { useMeta } from "../lib/UseMeta";

export default function BookNow() {
  useMeta({
    title: "Book Now | The Final Bell",
    description:
      "Purchase session packs and book your Muay Thai training sessions with The Final Bell.",
    canonical: "https://www.finalbell.co.uk/book",
  });

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <NavBar logoSrc={imgurl2} />

      {/* Booking Section (Pay first → redirect to members booking) */}
      <section
        id="book"
        className="mx-auto max-w-6xl px-6 py-16 md:px-8"
        aria-label="Purchase session packs and booking information"
      >
        <h2 className="text-3xl font-bold md:text-4xl text-secondary">
          Buy a Pack
        </h2>
        <p className="mt-2 text-neutral-300">
          Purchase a 5-session pack. After checkout you’ll be automatically
          redirected to the members booking page to schedule your Saturday
          sessions (<strong>08:00–10:00</strong> and{" "}
          <strong>11:00–15:00</strong>).
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
            <h3 className="text-xl font-semibold text-secondary">
              5 × 30-Minute 1:1
            </h3>
            <p className="mt-2 text-neutral-300">
              Technique focus, fast and efficient.
            </p>
            <p className="mt-3 text-3xl font-extrabold">£100</p>
            <a
              href="https://buy.stripe.com/28EaEX0fD1o5aCv6ql8IU02"
              target="_blank"
              rel="noreferrer"
              className="mt-5 block rounded-2xl px-4 py-3 text-center font-semibold shadow-lg border-2 bg-secondary text-neutral-950 hover:bg-primary-dark hover:text-amber-50 hover:border-secondary"
            >
              Buy 5 × 30-Minute Sessions
            </a>
          </div>

          <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
            <h3 className="text-xl font-semibold text-secondary">
              5 × 60-Minute 1:1
            </h3>
            <p className="mt-2 text-neutral-300">
              Deeper technical work + conditioning.
            </p>
            <p className="mt-3 text-3xl font-extrabold">£200</p>
            <a
              href="https://buy.stripe.com/3cI8wPfax5El25ZaGB8IU01"
              target="_blank"
              rel="noreferrer"
              className="mt-5 block rounded-2xl px-4 py-3 text-center font-semibold shadow-lg border-2 bg-secondary text-neutral-950 hover:bg-primary-dark hover:text-amber-50 hover:border-secondary"
            >
              Buy 5 × 60-Minute Sessions
            </a>
          </div>

          <div className="rounded-2xl bg-neutral-900/60 p-6 ring-1 ring-secondary">
            <h3 className="text-xl font-semibold text-secondary">
              5 × Small Group (2–4)
            </h3>
            <p className="mt-2 text-neutral-300">
              Partner drills, high energy, shared cost.
            </p>
            <p className="mt-3 text-3xl font-extrabold">£250</p>
            <a
              href="https://buy.stripe.com/eVq14n6E1feV3a3aGB8IU03"
              target="_blank"
              rel="noreferrer"
              className="mt-5 block rounded-2xl px-4 py-3 text-center font-semibold ring-2 ring-neutral-700 hover:bg-secondary hover:text-neutral-900 hover:ring-primary-dark"
            >
              Buy 5 × Small Group Sessions
            </a>
          </div>
        </div>

        <p className="mt-4 text-xs text-neutral-400">
          Payments processed by Stripe. You’ll receive an email receipt. After
          payment you’ll be redirected to the members area to schedule your
          sessions.
        </p>
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
