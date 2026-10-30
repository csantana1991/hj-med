import { useEffect, useState } from "react";

type Shot = { src: string; title: string };

async function shotsFor(query: string): Promise<Shot[]> {
  const q = query.replace(/\s+/g, " ").trim().slice(0, 80);
  if (q.length < 3) return [];
  const wiki =
    "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
    encodeURIComponent(q) +
    "&gsrlimit=6&prop=pageimages&piprop=thumbnail&pithumbsize=480&format=json&origin=*";
  const data = await fetch(wiki).then((res) => res.json());
  const pages = Object.values((data.query && data.query.pages) || {}) as {
    title?: string;
    thumbnail?: { source?: string };
  }[];
  return pages
    .filter((page) => page.thumbnail?.source)
    .slice(0, 6)
    .map((page) => ({ src: page.thumbnail!.source!, title: page.title || q }));
}

export function CaptionSearch({ title }: { title: string }) {
  const [q, setQ] = useState(title);
  const [shots, setShots] = useState<Shot[]>([]);

  useEffect(() => {
    const onMsg = (event: MessageEvent) => {
      const text = event.data && event.data.source === "caption-line" ? String(event.data.text || "") : "";
      if (text.trim().length > 2) setQ(text.trim());
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, []);

  useEffect(() => {
    let stop = false;
    shotsFor(q)
      .then((rows) => {
        if (!stop && rows.length) setShots(rows);
      })
      .catch(() => {});
    return () => {
      stop = true;
    };
  }, [q]);

  return (
    <section className="mt-4 rounded-lg border border-line bg-ink p-3">
      <label className="block text-xs font-semibold tracking-widest text-teal-2 uppercase" htmlFor="caption-live">
        Live search from captions
      </label>
      <input
        id="caption-live"
        value={q}
        readOnly
        className="mt-2 h-11 w-full rounded-full border border-line bg-surface px-4 text-sm text-cream"
      />
      <div className="mt-3 flex gap-3 overflow-x-auto">
        {shots.map((shot) => (
          <figure key={shot.src} className="w-40 shrink-0">
            <img src={shot.src} alt={shot.title} className="h-24 w-40 rounded-md object-cover" referrerPolicy="no-referrer" />
            <figcaption className="mt-1 line-clamp-2 text-xs text-dim">{shot.title}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
