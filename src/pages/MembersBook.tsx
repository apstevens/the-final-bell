// MembersBook.tsx
import { Bell, FileText } from "lucide-react";
import { InlineWidget } from "react-calendly";
import imgurl2 from "../assets/finalBellLogo.png";

export default function MembersBook() {
  return (
    <main className="flex flex-col min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 md:px-8">
      <div className="mb-8 flex flex-col items-center">
        <img
          src={imgurl2}
          alt="The Final Bell Logo"
          className="inline-block w-md"
        />
        <h1 className="text-3xl font-bold text-secondary">
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

      <div className="w-full flex flex-col items-center group transition-colors">
        <a href="/" className="flex flex-col items-center">
          <Bell className="h-8 w-8 text-secondary mt-8 mb-2 transition-colors group-hover:text-primary" />
          <p className="text-neutral-400 transition-colors group-hover:text-primary">
            Return to Home
          </p>
        </a>
      </div>
    </main>
  );
}
