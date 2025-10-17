// About.tsx

import imgUrl from '../assets/victory_vintage.webp';

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 md:px-8">
      <h1 className="text-3xl font-bold text-secondary">Meet Your Coach: Andy</h1>
      <p className="mt-2 text-neutral-300">
        Saturday availability: <strong>08:00–10:00</strong> and <strong>11:00–15:00</strong>.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
        <img
          src={imgUrl}
          alt="Andy, your Boxing and Muay Thai fitness coach"
          className="w-full"
        />
      </div>

      <section className="mt-8 space-y-6">
        <div>
          <h2 className="text-2xl font-semibold text-secondary">About Andy</h2>
          <p className="mt-2 text-neutral-300">
            Andy is a dedicated Boxing and Muay Thai coach with years of experience both competing and
            training others to reach their physical and mental potential. His approach blends technical
            precision, discipline, and conditioning to create well-rounded, confident athletes at every level.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-secondary">Qualifications</h2>
          <ul className="mt-2 list-disc list-inside text-neutral-300">
            <li>Level 3 Personal Training</li>
            <li>Level 3 City & Guilds Personal Training</li>
            <li>Level 3 Nutrition for Sport and Exercise</li>
            <li>Level 3 Nutrition & Weight Management</li>
          </ul>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-secondary">Competition Record</h2>
          <ul className="mt-2 list-disc list-inside text-neutral-300">
            <li><strong>Boxing:</strong> 8 fights — 6 wins, 2 losses, 2 KOs</li>
            <li><strong>K1:</strong> 4 fights — 4 wins, 0 losses</li>
            <li><strong>Muay Thai:</strong> 2 fights — 0 wins, 2 losses</li>
          </ul>
          <p className="mt-2 text-neutral-400 italic">
            Every bout, win or lose, has been a lesson — shaping the fighter, coach, and mindset behind The Final Bell.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-secondary">Philosophy</h2>
          <p className="mt-2 text-neutral-300">
            Andy believes that success in combat sports — and fitness — is built on resilience, discipline,
            and intelligent training. His sessions are designed to push limits while maintaining focus on
            technique, recovery, and progression.
          </p>
        </div>
      </section>
    </main>
  );
}

