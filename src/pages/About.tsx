// About.tsx
import imgUrl from '../assets/victory_vintage.webp';

export default function About() {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100 px-6 py-12 md:px-8">
      <h1 className="text-3xl font-bold text-secondary">Meet your Coach: Andy</h1>
      <p className="mt-2 text-neutral-300">
        Saturday availability: <strong>08:00–10:00</strong> and <strong>11:00–15:00</strong>.
      </p>
      <div className="mt-6 overflow-hidden rounded-2xl ring-1 ring-neutral-800">
        <img src={imgUrl} alt="Andy, your boxing and Muay Thai fitness coach" className="w-full"/>
      </div>
    </main>
  );
}
