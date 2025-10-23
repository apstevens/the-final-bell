import "../index.css";
import imgUrl1 from "../assets/finalBellLogo.png";
import NavBar from "./NavBar";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { useMeta } from "../lib/UseMeta";

export default function About() {
  useMeta({
    title: "Contact | The Final Bell",
    description:
      "Get in touch with The Final Bell for boxing fitness and Muay Thai sessions in Chelmsford and Witham.",
    canonical: "https://www.finalbell.co.uk/contact",
  });

  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <NavBar logoSrc={imgUrl1} />
      <section
        className="mx-auto max-w-6xl px-6 py-12 md:px-8"
        aria-label="Contact information"
      >
        {/* Heading */}
        <header className="mb-6">
          <p className="mt-2 text-secondary text-3xl font-bold md:text-4xl">
            Boxing Fitness &amp; Muay Thai — Chelmsford / Witham (Saturdays)
          </p>
        </header>

        {/* Card */}
        <div className="rounded-2xl border border-secondary/40 bg-neutral-900/60">
          <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2 md:p-8">
            {/* Left: contact items */}
            <ul className="space-y-4 divide-y divide-secondary/20">
              <li className="flex items-center gap-3 pt-0">
                <Phone className="h-5 w-5 text-secondary" />
                <a
                  className="hover:text-secondary"
                  href="tel:+447485041755"
                  aria-label="Call Final Bell"
                >
                  +44 7485 041755
                </a>
              </li>
              <li className="flex items-center gap-3 pt-4">
                <Mail className="h-5 w-5 text-secondary" />
                <a
                  className="hover:text-secondary"
                  href="mailto:hello@finalbell.co.uk"
                >
                  hello@finalbell.co.uk
                </a>
              </li>
              <li className="flex items-center gap-3 pt-4">
                <Instagram className="h-5 w-5 text-secondary" />
                <a
                  className="hover:text-secondary"
                  href="https://instagram.com/finalbell2025"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @finalbell2025
                </a>
              </li>
              <li className="flex items-center gap-3 pt-4">
                <MapPin className="h-5 w-5 text-secondary" />
                <span>Chelmsford, UK</span>
              </li>
            </ul>

            {/* Right: CTAs */}
            <div className="flex flex-col items-start justify-center gap-3">
              <a
                href="https://wa.me/447485041755?text=Hi%20Andy%2C%20I%27d%20like%20to%20book%20a%20session%20with%20The%20Final%20Bell."
                className="inline-flex items-center rounded-2xl bg-secondary px-5 py-3 font-semibold text-neutral-900 hover:opacity-95"
              >
                Message on WhatsApp
              </a>
              <a
                href="/book"
                className="inline-flex items-center rounded-2xl px-5 py-3 font-semibold ring-2 ring-secondary hover:bg-secondary hover:text-neutral-900"
              >
                Book a Session
              </a>
            </div>
          </div>
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
