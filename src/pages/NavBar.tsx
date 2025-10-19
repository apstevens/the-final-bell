// components/NavBar.tsx
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

type Item = { label: string; href: string; external?: boolean };

export default function NavBar({ logoSrc }: { logoSrc: string }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const nav: Item[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Pricing", href: "/pricing" },
    { label: "Book Now!", href: "/book" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-secondary bg-neutral-950/80 backdrop-blur">
      <nav
        className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4 md:px-8"
        aria-label="Primary"
      >
        {/* Brand */}
        <a href="/" className="flex items-center gap-4">
          <img
            src={logoSrc}
            alt="The Final Bell"
            className="h-20 w-auto md:h-60"
          />
          <span className="hidden sm:block text-sm md:text-base font-bold text-secondary">
            Boxing Fitness &amp; Muay Thai
          </span>
        </a>

        {/* Desktop */}
        <ul className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <li key={n.label}>
              <a
                href={n.href}
                {...(n.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="text-base font-semibold text-neutral-200 hover:text-secondary"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center rounded-xl p-2 ring-1 ring-secondary text-secondary"
        >
          <span className="sr-only">Toggle menu</span>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {/* Mobile panel */}
      <div
        id="mobile-menu"
        className={`${
          open ? "block" : "hidden"
        } md:hidden border-t border-secondary bg-primary-dark/95 backdrop-blur`}
      >
        <ul className="mx-4 my-2 space-y-1 divide-y divide-secondary">
          {nav.map((n) => (
            <li key={n.label}>
              <a
                href={n.href}
                {...(n.external
                  ? { target: "_blank", rel: "noopener noreferrer" }
                  : {})}
                className="block rounded-lg px-4 py-3  text-secondary hover:bg-neutral-900 hover:text-secondary"
                onClick={() => setOpen(false)}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
