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
    <section className="border-b border-[#57d6c4] bg-[#042f2e] px-4 py-2">
      <div className="flex items-center gap-3">
        <label className="shrink-0 rounded-full bg-[#57d6c4] px-3 py-1 text-xs font-bold tracking-widest text-[#082027]" htmlFor="caption-live">
          LIVE SEARCH
        </label>
        <input
          id="caption-live"
          value={q}
          readOnly
          className="h-10 min-w-0 flex-1 rounded-full border border-line bg-white px-4 text-sm text-ink"
        />
      </div>
      {shots.length ? (
        <div className="mt-2 flex gap-2 overflow-x-auto">
          {shots.map((shot) => (
            <figure key={shot.src} className="w-28 shrink-0">
              <img src={shot.src} alt={shot.title} className="h-16 w-28 rounded object-cover" referrerPolicy="no-referrer" />
              <figcaption className="mt-1 line-clamp-2 text-[11px] text-cream">{shot.title}</figcaption>
            </figure>
          ))}
        </div>
      ) : null}
    </section>
  );
}
