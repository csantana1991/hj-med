import { useState } from "react";

const clips = [
  {
    id: "dotatate",
    src: "/nm/dotatate.mp4",
    poster: "/nm/dotatate.jpg",
    title: "DOTATATE",
    caption:
      "Name the tracer first. Gallium-68 DOTATATE binds somatostatin receptors. Pituitary, liver, spleen, and kidneys are normal. A hot node outside that map is disease.",
    credit:
      "Radiopaedia Ga-68 DOTATATE MIP (Pir Abdul Ahad Aziz Qureshi), animated here. Not an Emory or Harvard recording.",
  },
  {
    id: "pyp",
    src: "/nm/pyp.mp4",
    poster: "/nm/pyp.jpg",
    title: "PYP",
    caption:
      "The heart is hotter than the opposite chest. This frame’s ratio is 1.86. Above 1.5 fits transthyretin amyloid, after a blood test excludes light-chain disease.",
    credit:
      "Radiopaedia Tc-99m PYP case (Sally Ayesa), animated here. Grade 3 on the full study. Not a hospital lecture.",
  },
  {
    id: "psma",
    src: "/nm/psma.mp4",
    poster: "/nm/psma.jpg",
    title: "PSMA",
    caption:
      "Kidneys and spleen on this slice are normal. The focal hotspot is the finding. Avid disease is what lutetium-177 PSMA can treat.",
    credit:
      "Radiopaedia F-18 PSMA PET-CT (Ammar Ashraf), animated here. Not an Emory or Harvard recording.",
  },
  {
    id: "fdg",
    src: "/nm/fdg.mp4",
    poster: "/nm/fdg.jpg",
    title: "FDG pitfall",
    caption:
      "This drawing is not a patient. Normal FDG sits in the brain, heart, liver, and bladder. Symmetric neck uptake can be brown fat. Warm the patient before you call cancer.",
    credit: "Original illustration. The fact is the pitfall. It is not a case file.",
  },
] as const;

export function LocalClips() {
  const [id, setId] = useState<(typeof clips)[number]["id"]>("dotatate");
  const clip = clips.find((item) => item.id === id) ?? clips[0];

  return (
    <section className="mt-8">
      <h2 className="font-serif text-2xl text-cream">Plays on this page</h2>
      <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
        If the YouTube lecture is slow, start here. These clips stay in the
        preview. They do not count toward the hour total. The public lecture and
        the outside links are still below.
      </p>
      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {clips.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setId(item.id)}
            className={
              item.id === clip.id
                ? "shrink-0 rounded-full bg-teal px-3 py-2 text-sm font-medium text-ink"
                : "shrink-0 rounded-full border border-line px-3 py-2 text-sm text-dim"
            }
          >
            {item.title}
          </button>
        ))}
      </div>
      <div className="mt-3 overflow-hidden rounded-lg border border-line bg-ink">
        <video
          key={clip.src}
          className="aspect-video w-full bg-black object-contain"
          controls
          playsInline
          preload="metadata"
          poster={clip.poster}
          src={clip.src}
        />
      </div>
      <p className="mt-3 text-sm leading-relaxed text-cream">{clip.caption}</p>
      <p className="mt-1 text-sm leading-relaxed text-muted">{clip.credit}</p>
    </section>
  );
}
