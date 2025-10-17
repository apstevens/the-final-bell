// About.tsx

import imgUrl from '../assets/victory_vintage.webp';

export default function About() {
  return (
    <main className="items-center min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 md:px-8">
      <div className='w-full flex flex-col items-center'>
            <h1 className="text-3xl font-bold text-secondary">Meet Your Coach: Andy</h1>
        <p className="mt-2 text-neutral-300">
            Specialist trainer in: <strong>Boxing</strong>, <strong>Muay Thai</strong>, and <strong>K1</strong>.
        </p>

        <div className="w-full max-w-md overflow-hidden rounded-2xl ring-1 shadow-xl mt-4 flex flex-wrap gap-3 ring-neutral-800">
            <img
            src={imgUrl}
            alt="Andy, your boxing and Muay Thai fitness coach" 
            className="w-2xl rounded-1xl ring-1 ring-neutral-800"
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
                <section className="mt-10">
                <h2 className="text-2xl font-bold text-secondary mb-4">Qualifications</h2>

                <table className="w-full table-auto border-collapse overflow-hidden rounded-2xl border-2 border-secondary/40 bg-neutral-950 text-neutral-200 shadow-xl">
                    <thead className="bg-primary/20">
                    <tr className="text-left text-sm uppercase tracking-wide">
                        <th className="px-4 py-3 font-semibold text-secondary">Qualification</th>
                        <th className="px-4 py-3 font-semibold">Awarding Body</th>
                        <th className="px-4 py-3 font-semibold">Level</th>
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800/70">
                    <tr className="hover:bg-neutral-900/60 transition-colors">
                        <td className="px-4 py-3 font-medium">Personal Training</td>
                        <td className="px-4 py-3">City &amp; Guilds</td>
                        <td className="px-4 py-3 text-secondary">Level 3</td>
                    </tr>
                    <tr className="hover:bg-neutral-900/60 transition-colors">
                        <td className="px-4 py-3 font-medium">Nutrition for Sport &amp; Exercise</td>
                        <td className="px-4 py-3">City &amp; Guilds</td>
                        <td className="px-4 py-3 text-secondary">Level 3</td>
                    </tr>
                    <tr className="hover:bg-neutral-900/60 transition-colors">
                        <td className="px-4 py-3 font-medium">Nutrition &amp; Weight Management</td>
                        <td className="px-4 py-3">City &amp; Guilds</td>
                        <td className="px-4 py-3 text-secondary">Level 3</td>
                    </tr>
                    </tbody>
                    <tfoot>
                    <tr>
                        <td colSpan={3} className="h-1 bg-gradient-to-r from-secondary via-secondary/60 to-secondary/0"></td>
                    </tr>
                    </tfoot>
                </table>
                </section>
            </div>

            <div>
                <section className="mt-10">
                    <h2 className="mt-10 text-2xl font-semibold text-secondary">Competition Record</h2>
                    <table className="w-full table-auto overflow-hidden rounded-2xl border-2 border-secondary/40 bg-neutral-950 text-neutral-200 shadow-xl">
                        <caption className="sr-only">Competition record by discipline</caption>

                        {/* Header row */}
                        <thead className="bg-primary/20">
                            <tr className="text-left text-sm uppercase tracking-wide">
                            <th className="px-4 py-3 font-semibold text-secondary">Discipline</th>
                            <th className="px-4 py-3 font-semibold">Fights</th>
                            <th className="px-4 py-3 font-semibold">Wins</th>
                            <th className="px-4 py-3 font-semibold">Losses</th>
                            <th className="px-4 py-3 font-semibold">KOs</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-neutral-800/70">
                            <tr className="hover:bg-neutral-900/60 transition-colors">
                            <td className="px-4 py-3 font-medium">Boxing</td>
                            <td className="px-4 py-3">8</td>
                            <td className="px-4 py-3 text-green-400">6</td>
                            <td className="px-4 py-3 text-red-400">2</td>
                            <td className="px-4 py-3 text-secondary">2</td>
                            </tr>
                            <tr className="hover:bg-neutral-900/60 transition-colors">
                            <td className="px-4 py-3 font-medium">K1</td>
                            <td className="px-4 py-3">4</td>
                            <td className="px-4 py-3 text-green-400">4</td>
                            <td className="px-4 py-3 text-red-400/70">0</td>
                            <td className="px-4 py-3 text-secondary/80">0</td>
                            </tr>
                            <tr className="hover:bg-neutral-900/60 transition-colors">
                            <td className="px-4 py-3 font-medium">Muay Thai</td>
                            <td className="px-4 py-3">2</td>
                            <td className="px-4 py-3 text-green-400/70">0</td>
                            <td className="px-4 py-3 text-red-400">2</td>
                            <td className="px-4 py-3 text-secondary/80">0</td>
                            </tr>
                        </tbody>

                        {/* Bottom accent bar */}
                        <tfoot>
                            <tr>
                            <td colSpan={5} className="h-1 bg-gradient-to-r from-secondary via-secondary/60 to-secondary/0"></td>
                            </tr>
                        </tfoot>
                        </table>
                    <p className="mt-2 text-neutral-400 italic">
                        Every bout, win or lose, has been a lesson — shaping the fighter, coach, and mindset behind The Final Bell.
                    </p>
                </section>
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
      </div>
    </main>
  );
}

