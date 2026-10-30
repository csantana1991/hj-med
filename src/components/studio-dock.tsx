import { useState, type ReactNode } from "react";

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

export function StudioDock({ title, children }: { title: string; children?: ReactNode }) {
  const [open, setOpen] = useState<string | null>(null);
  const chosen = WIDGETS.find((widget) => widget.id === open);
  const rest = WIDGETS.filter((widget) => widget.id !== open);

  return (
    <div className="min-w-0">
      <div className="mb-3 flex flex-wrap gap-2">
        {WIDGETS.map((widget) => (
          <button
            key={widget.id}
            type="button"
            onClick={() => setOpen((current) => (current === widget.id ? null : widget.id))}
            className={
              open === widget.id
                ? "min-h-11 rounded-full bg-teal px-4 text-sm font-semibold text-ink"
                : "min-h-11 rounded-full border border-line px-4 text-sm text-cream"
            }
          >
            {widget.label}
          </button>
        ))}
      </div>
      {children}
      {chosen ? (
        <section className="mt-3 w-full overflow-hidden rounded-lg border border-line bg-ink">
          <div className="min-h-11 bg-teal px-4 py-3 text-sm font-semibold text-ink">{chosen.label}</div>
          <iframe
            title={chosen.label}
            src={`${HOST}?view=${chosen.id}&embed=1&q=${encodeURIComponent(title)}`}
            className="h-[70vh] w-full border-0 bg-ink"
            allow="autoplay"
          />
        </section>
      ) : null}
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {rest.map((widget) => (
          <button
            key={widget.id}
            type="button"
            onClick={() => setOpen(widget.id)}
            className="min-h-11 rounded-lg bg-teal px-4 text-left text-sm font-semibold text-ink"
          >
            {widget.label}
          </button>
        ))}
      </div>
    </div>
  );
}
