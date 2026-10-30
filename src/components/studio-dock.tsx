import { useState } from "react";

const WIDGETS = [
  { id: "radreview", label: "RAD REVIEW" },
  { id: "radatlas", label: "Rad Atlas" },
  { id: "caseqa", label: "Q+A" },
  { id: "rrultimate", label: "RAD REVIEW Ultimate" },
  { id: "metaimage", label: "Meta Image" },
  { id: "academy", label: "Academy" },
  { id: "nucleus", label: "Nucleus" },
] as const;

const HOST = "https://teaching-studios.vercel.app/studio/NucMed-Board-Studio.html";

export function StudioDock({ title }: { title: string }) {
  const [open, setOpen] = useState<string | null>(null);
  const src = open ? `${HOST}?view=${open}&embed=1&q=${encodeURIComponent(title)}` : "";

  return (
    <section className="flex min-w-0 flex-col gap-2">
      {WIDGETS.map((widget) => (
        <button
          key={widget.id}
          type="button"
          onClick={() => setOpen((current) => (current === widget.id ? null : widget.id))}
          className={
            open === widget.id
              ? "min-h-11 rounded-full bg-teal px-4 text-left text-sm font-semibold text-ink"
              : "min-h-11 rounded-full border border-line px-4 text-left text-sm text-cream"
          }
        >
          {widget.label}
        </button>
      ))}
      {open ? (
        <iframe title={open} src={src} className="h-[70vh] w-full rounded-lg border border-line bg-ink" allow="autoplay" />
      ) : (
        <div className="grid h-36 place-items-center rounded-lg border border-line px-3 text-center text-sm text-dim">
          Open a widget and the live images show here.
        </div>
      )}
    </section>
  );
}
