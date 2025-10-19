// MembersBook.tsx
import { FileText } from "lucide-react";
import { InlineWidget } from "react-calendly";
import imgurl2 from "../assets/finalBellLogo.png";
import NavBar from "./NavBar";

export default function MembersBook() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <div className="mb-8 flex flex-col items-center">
        <NavBar logoSrc={imgurl2} />
        <h1 className="mt-8 text-3xl font-bold text-secondary">
          Members: Book Your Sessions and complete your Client Health Form.
        </h1>
      </div>

      <p className="mt-2 text-neutral-300">
        Saturday availability: <strong>08:00–10:00</strong> and{" "}
        <strong>11:00–15:00</strong>.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
        <InlineWidget
          // Use a Calendly event/link that is NOT listed publicly
          url="https://calendly.com/thefinalbell/60-minute-pt"
          styles={{ height: 720 }}
        />
      </div>
      <div className="my-10 flex flex-col items-center text-center">
        <h3 className="text-2xl font-semibold text-secondary mb-3">
          Client Health & Fitness Readiness Form 2025
        </h3>
        <p className="max-w-xl text-neutral-300 mb-6">
          Before taking part in any Final Bell training session, you must
          complete and return the Client Health & Fitness Readiness Form. Please
          download the form below, fill it in fully, and email it to{" "}
          <a
            href="mailto:hello@finalbell.co.uk"
            className="text-gold underline hover:text-secondary"
          >
            hello@finalbell.co.uk
          </a>{" "}
          prior to your first session.
        </p>

        <a
          href="/public/Final Bell - PARQ.docx"
          download
          className="flex flex-col items-center text-secondary transition-transform hover:scale-105 hover:text-gold focus:outline-none focus:ring-2 focus:ring-gold focus:ring-offset-2"
          aria-label="Download Client Health and Fitness Readiness Form 2025"
        >
          <FileText className="h-12 w-12 mb-2" />
          <span className="text-sm font-medium uppercase tracking-wide">
            Download Form
          </span>
        </a>

        <p className="mt-4 text-sm text-neutral-400 italic">
          *Training cannot commence until the completed form has been received.*
        </p>
      </div>
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
