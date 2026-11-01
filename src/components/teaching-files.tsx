import { platesFor } from "@/lib/atlas";

export function TeachingFiles({ trackKey }: { trackKey: string }) {
  const { plates, note } = platesFor(trackKey);
  if (plates.length === 0) return null;

  return (
    <section className="mt-8">
      <h2 className="font-serif text-2xl text-cream">Radiopaedia teaching files</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">{note}</p>
      <div className={plates.length > 1 ? "mt-4 grid gap-4 sm:grid-cols-2" : "mt-4 grid gap-4"}>
        {plates.map((plate) => (
          <figure key={plate.id} className="overflow-hidden rounded-lg border border-line bg-ink">
            <img
              src={plate.src}
              alt={plate.alt}
              className="aspect-[4/3] w-full bg-black object-contain"
            />
            <figcaption className="px-3 py-3 text-sm leading-relaxed text-dim">
              <span className="block text-cream">{plate.diagnosis}</span>
              <span className="mt-1 block">
                {plate.modality}. “{plate.caseTitle}” by {plate.contributor}.{" "}
                <a
                  className="text-teal-2 underline"
                  href={plate.caseUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Radiopaedia case
                </a>
                .{" "}
                <a
                  className="text-teal-2 underline"
                  href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
                  target="_blank"
                  rel="noreferrer"
                >
                  CC BY-NC-SA 4.0
                </a>
                . Not an HJ Med image, and not a frame from the lecture.
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
