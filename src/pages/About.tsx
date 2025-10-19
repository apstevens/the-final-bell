// About.tsx

import imgUrl from "../assets/victory_vintage.webp";
import imgUrl1 from "../assets/finalBellLogo.png";
import NavBar from "./NavBar";

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 flex flex-col items-center text-center">
      <NavBar logoSrc={imgUrl1} />
      <div className="w-full max-w-3xl flex flex-col items-center">
        <h1 className="mt-8 text-3xl font-bold text-secondary">
          Meet Your Coach: Andy
        </h1>
        <p className="mt-2 text-neutral-300">
          Specialist trainer in: <strong>Boxing</strong>,{" "}
          <strong>Muay Thai</strong>, and <strong>K1</strong>.
        </p>

        {/* Centered image */}
        <div className="mt-6 w-full max-w-sm overflow-hidden rounded-2xl ring-1 ring-neutral-800 shadow-xl">
          <img
            src={imgUrl}
            alt="Andy, your boxing and Muay Thai fitness coach"
            className="w-full h-auto object-cover"
          />
        </div>

        {/* Content sections */}
        <section className="mt-8 w-full space-y-10 text-center">
          {/* About */}
          <div>
            <h2 className="text-2xl font-semibold text-secondary">
              About Andy
            </h2>
            <p className="mt-2 text-neutral-300 leading-relaxed">
              Andy is a dedicated Boxing and Muay Thai coach with years of
              experience both competing and training others to reach their
              physical and mental potential. His approach blends technical
              precision, discipline, and conditioning to create well-rounded,
              confident athletes at every level.
            </p>
          </div>

          {/* Qualifications */}
          <div>
            <h2 className="text-2xl font-bold text-secondary mb-4">
              Qualifications
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto border-collapse overflow-hidden rounded-2xl border-2 border-secondary/40 bg-neutral-950 text-neutral-200 shadow-xl mx-auto">
                <thead className="bg-[#800020] text-secondary">
                  <tr className="text-left text-sm uppercase tracking-wide">
                    <th className="px-4 py-3 font-semibold text-secondary">
                      Qualification
                    </th>
                    <th className="px-4 py-3 font-semibold">Awarding Body</th>
                    <th className="px-4 py-3 font-semibold">Level</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/70">
                  <tr className="hover:bg-primary-light transition-colors">
                    <td className="px-4 py-3 font-medium text-secondary">
                      Personal Training
                    </td>
                    <td className="px-4 py-3">City &amp; Guilds</td>
                    <td className="px-4 py-3 text-green-400">Level 3</td>
                  </tr>
                  <tr className="hover:bg-primary-light transition-colors">
                    <td className="px-4 py-3 font-medium text-secondary">
                      Nutrition for Sport &amp; Exercise
                    </td>
                    <td className="px-4 py-3">City &amp; Guilds</td>
                    <td className="px-4 py-3 text-green-400">Level 3</td>
                  </tr>
                  <tr className="hover:bg-primary-light transition-colors">
                    <td className="px-4 py-3 font-medium text-secondary">
                      Nutrition &amp; Weight Management
                    </td>
                    <td className="px-4 py-3">City &amp; Guilds</td>
                    <td className="px-4 py-3 text-green-400">Level 3</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Competition Record */}
          <div className="-mx-4 md:mx-0 w-[calc(100%+2rem)] md:w-full overflow-x-auto">
            <h2 className="text-2xl font-semibold text-secondary mb-4">
              Competition Record
            </h2>
            <table className="w-full table-auto overflow-hidden rounded-2xl border-2 border-secondary/40 bg-neutral-950 text-neutral-200 shadow-lg mx-auto">
              <thead className="bg-[#800020] text-secondary">
                <tr className="text-left text-sm uppercase tracking-wide">
                  <th className="px-4 py-3 font-semibold">Discipline</th>
                  <th className="px-4 py-3 font-semibold">Fights</th>
                  <th className="px-4 py-3 font-semibold">Wins</th>
                  <th className="px-4 py-3 font-semibold">Losses</th>
                  <th className="px-4 py-3 font-semibold">KOs</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-neutral-800/70">
                <tr className="hover:bg-primary-light transition-colors">
                  <td className="px-4 py-3 font-medium text-secondary">
                    Boxing
                  </td>
                  <td className="px-4 py-3">8</td>
                  <td className="px-4 py-3 text-green-400">6</td>
                  <td className="px-4 py-3 text-red-400">2</td>
                  <td className="px-4 py-3 text-secondary">2</td>
                </tr>
                <tr className="hover:bg-primary-light  transition-colors">
                  <td className="px-4 py-3 font-medium text-secondary">K1</td>
                  <td className="px-4 py-3">4</td>
                  <td className="px-4 py-3 text-green-400">4</td>
                  <td className="px-4 py-3 text-red-400/70">0</td>
                  <td className="px-4 py-3 text-secondary/80">0</td>
                </tr>
                <tr className="hover:bg-primary-light  transition-colors">
                  <td className="px-4 py-3 font-medium text-secondary">
                    Muay Thai
                  </td>
                  <td className="px-4 py-3">3</td>
                  <td className="px-4 py-3 text-green-400/70">1</td>
                  <td className="px-4 py-3 text-red-400">2</td>
                  <td className="px-4 py-3 text-secondary/80">0</td>
                </tr>
              </tbody>

              <tfoot>
                <tr>
                  <td
                    colSpan={5}
                    className="h-1 bg-gradient-to-r from-[#FFD700] via-[#FFD700]/70 to-transparent"
                  ></td>
                </tr>
              </tfoot>
            </table>

            <p className="mt-2 text-neutral-400 italic">
              Every bout, win or lose, has been a lesson — shaping the fighter,
              coach, and mindset behind The Final Bell.
            </p>
          </div>
        </section>
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
    </main>
  );
}
