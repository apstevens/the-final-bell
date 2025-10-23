import { useState } from "react";
import YouTubeEmbed from "../components/YouTubeEmbed";

type Exercise = {
  id: string;
  name: string;
  category: string;
  youtube?: string;
  cues?: string[];
};

export default function ExerciseCard({ exercise }: { exercise: Exercise }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-secondary bg-primary p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-bold text-secondary">{exercise.name}</h3>
          <p className="text-sm text-secondary">{exercise.category}</p>
        </div>
        <button
          onClick={() => setOpen((s) => !s)}
          className="rounded-xl border border-secondary text-amber-50 px-3 py-1 text-sm hover:bg-primary/70"
        >
          {open ? "Hide Demo" : "View Demo"}
        </button>
      </div>
      {open && exercise.youtube && (
        <div className="mt-3 overflow-hidden rounded-xl">
          <YouTubeEmbed video={exercise.youtube} />
        </div>
      )}
      {exercise.cues?.length ? (
        <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-secondary">
          {exercise.cues.map((cue, index) => (
            <li key={index}>{cue}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
