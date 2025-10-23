import { useEffect, useMemo, useState } from "react";
import ExerciseCard from "../pages/ExerciseCard.tsx";
import * as DB from "../lib/db";
import EXERCISES from "../lib/Exercises.ts";
import TODAY from "../lib/Assignment.ts";

export default function MembersApp() {
  const [logs, setLogs] = useState<DB.IDBLog[]>([]);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    DB.recentLogs(20)
      .then(setLogs)
      .catch(() => setLogs([]));
  }, []);
  const total = useMemo(
    () => logs.filter((l) => l.assignmentId === TODAY.id).length,
    [logs]
  );

  async function add(exId: string, payload: Partial<DB.IDBLog>) {
    const entry: DB.IDBLog = {
      id: crypto.randomUUID(),
      assignmentId: TODAY.id,
      exerciseId: exId,
      ts: new Date().toISOString(),
      synced: 0,
      ...payload,
    };
    await DB.addLog(entry);
    setLogs((prev) => [entry, ...prev]);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 bg-neutral-900">
      <h1 className="mb-1 text-3xl font-bold text-yellow-400">
        Final Bell — Today&apos;s Session
      </h1>
      <p className="mb-6 text-sm text-zinc-300">
        {TODAY.date} · Entries: {total}
      </p>

      <section className="grid gap-4 md:grid-cols-2 items-start">
        {TODAY.exercises.map((e) => {
          const ex = EXERCISES.find((x) => x.id === e.exerciseId)!;
          return (
            <div
              key={e.exerciseId}
              className="space-y-3 rounded-2xl border border-zinc-800 bg-zinc-950 p-4"
            >
              <ExerciseCard exercise={ex} />
              <form
                onSubmit={async (ev) => {
                  ev.preventDefault();
                  const f = ev.currentTarget as HTMLFormElement & {
                    reps?: HTMLInputElement;
                    load?: HTMLInputElement;
                    secs?: HTMLInputElement;
                    rpe?: HTMLInputElement;
                  };
                  const reps = f.reps?.value ? Number(f.reps.value) : undefined;
                  const loadKg = f.load?.value
                    ? Number(f.load.value)
                    : undefined;
                  const seconds = f.secs?.value
                    ? Number(f.secs.value)
                    : undefined;
                  const rpe = f.rpe?.value ? Number(f.rpe.value) : undefined;
                  await add(ex.id, { reps, loadKg, seconds, rpe, notes });
                  setNotes("");
                  f.reset();
                }}
                className="grid grid-cols-2 gap-2 md:grid-cols-4"
              >
                <input
                  name="reps"
                  inputMode="numeric"
                  placeholder="Reps"
                  className="rounded-lg border-2 border-secondary bg-amber-50 px-3 py-2 text-sm"
                />
                <input
                  name="load"
                  inputMode="numeric"
                  placeholder="Kg"
                  className="rounded-lg border-2 border-secondary bg-amber-50 px-3 py-2 text-sm"
                />
                <input
                  name="secs"
                  inputMode="numeric"
                  placeholder="Seconds"
                  className="rounded-lg border-2 border-secondary bg-amber-50 px-3 py-2 text-sm"
                />
                <input
                  name="rpe"
                  inputMode="numeric"
                  placeholder="RPE"
                  className="rounded-lg border-2 border-secondary bg-amber-50 px-3 py-2 text-sm"
                />
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Notes / cues"
                  className="col-span-2 mt-1 rounded-lg border-2 border-secondary bg-amber-50 px-3 py-2 text-sm md:col-span-4"
                />
                <button
                  type="submit"
                  className="col-span-2 rounded-xl bg-yellow-400 px-4 py-2 font-semibold text-zinc-950 hover:opacity-90 md:col-span-4"
                >
                  Log Set
                </button>
              </form>
            </div>
          );
        })}
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold text-yellow-400">Recent Logs</h2>
        <ul className="mt-3 space-y-2">
          {logs.slice(0, 10).map((l) => {
            const ex = EXERCISES.find((x) => x.id === l.exerciseId);
            return (
              <li
                key={l.id}
                className="rounded-xl border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-200"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-yellow-400">
                    {ex?.name}
                  </span>
                  <span>· {new Date(l.ts).toLocaleTimeString()}</span>
                  {l.reps ? <span>· {l.reps} reps</span> : null}
                  {l.loadKg ? <span>· {l.loadKg} kg</span> : null}
                  {l.seconds ? <span>· {l.seconds}s</span> : null}
                  {l.rpe ? <span>· RPE {l.rpe}</span> : null}
                  {l.notes ? <span>· “{l.notes}”</span> : null}
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </main>
  );
}
