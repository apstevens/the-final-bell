

function toId(input: string) {
  const m = input.match(/(?:youtu\.be\/|v=|embed\/)([A-Za-z0-9_-]{11})/);
  return m ? m[1] : input;
}

export default function YouTubeEmbed({
  video,
  start = 0,
  title = "Exercise demo",
}: {
  video: string;
  start?: number;
  title?: string;
}) {
  const id = toId(video);
  const src = `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&playsinline=1&start=${start}`;

  return (
    <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
      <iframe
        src={src}
        title={title}
        loading="lazy"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="absolute left-0 top-0 h-full w-full rounded-xl border border-zinc-800"
      />
    </div>
  );
}
