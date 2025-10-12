// MembersBook.tsx
import { InlineWidget } from "react-calendly";

export default function MembersBook() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 md:px-8">
      <h1 className="text-3xl font-bold text-secondary">Members: Book Your Sessions</h1>
      <p className="mt-2 text-neutral-300">
        Saturday availability: <strong>08:00–10:00</strong> and <strong>11:00–15:00</strong>.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
        <InlineWidget
          // Use a Calendly event/link that is NOT listed publicly
          url="https://calendly.com/thefinalbell/60-minute-pt"
          styles={{ height: 720 }}
        />
      </div>
    </main>
  );
}
