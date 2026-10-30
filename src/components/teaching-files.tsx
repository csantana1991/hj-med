import { useEffect, useState } from "react";

type Shot = { src: string; title: string; href: string };

async function atlasShots(query: string): Promise<Shot[]> {
  const q = query.replace(/\s+/g, " ").trim().slice(0, 80);
  if (q.length < 3) return [];
  const shots: Shot[] = [];
  const seen = new Set<string>();
  const push = (src: string, title: string, href: string) => {
    if (!src || seen.has(src)) return;
    seen.add(src);
    shots.push({ src, title, href });
  };
  try {
    const wiki =
      "https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch=" +
      encodeURIComponent(q) +
      "&gsrlimit=4&prop=pageimages|info&inprop=url&pithumbsize=900&format=json&origin=*";
    const data = await fetch(wiki).then((res) => res.json());
    const pages = Object.values((data.query && data.query.pages) || {}) as {
      title?: string;
      fullurl?: string;
      thumbnail?: { source?: string };
    }[];
    pages.forEach((page) => {
      if (page.thumbnail?.source) push(page.thumbnail.source, page.title || q, page.fullurl || "");
    });
  } catch {
    /* the studio search below still runs */
  }
  try {
    const res = await fetch(
      "https://teaching-studios.vercel.app/api/pmc/match?source=live&q=" + encodeURIComponent(q) + "&n=4",
    );
    const data = await res.json();
    (data.results || []).forEach((row: { url?: string; caption?: string }) => {
      if (row.url) push(row.url, row.caption || q, row.url);
    });
  } catch {
    /* Wikipedia alone is enough to fill the frame */
  }
  return shots.slice(0, 2);
}

export function TeachingFiles({ trackKey, query }: { trackKey: string; query?: string }) {
  const [shots, setShots] = useState<Shot[]>([]);
  const term = (query || trackKey || "").trim();

  useEffect(() => {
    let stop = false;
    atlasShots(term).then((rows) => {
      if (!stop && rows.length) setShots(rows);
    });
    const onMsg = (event: MessageEvent) => {
      const data = event.data;
      if (!data || data.source !== "atlas-figures" || !Array.isArray(data.items)) return;
      const rows = data.items
        .filter((item: { src?: string }) => item && item.src)
        .slice(0, 2)
        .map((item: { src: string; title?: string; href?: string }) => ({
          src: item.src,
          title: item.title || term,
          href: item.href || "",
        }));
      if (rows.length) setShots(rows);
    };
    window.addEventListener("message", onMsg);
    return () => {
      stop = true;
      window.removeEventListener("message", onMsg);
    };
  }, [term]);

  if (!shots.length) return null;

  return (
    <section className="mt-8">
      <h2 className="font-serif text-2xl text-cream">Atlas</h2>
      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        {shots.map((shot) => (
          <figure key={shot.src} className="overflow-hidden rounded-lg border border-line bg-black">
            <img src={shot.src} alt={shot.title} className="aspect-[4/3] w-full object-contain" referrerPolicy="no-referrer" />
            <figcaption className="px-3 py-3 text-sm leading-relaxed text-dim">
              <span className="block text-cream">{shot.title}</span>
              <span className="mt-1 block">Atlas image matched to this lecture. Not a Radiopaedia plate.</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
