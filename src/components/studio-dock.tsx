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
  const [open, setOpen] = useState<Record<string, boolean>>({});

  return (
    <div className="mt-4 grid gap-3 md:grid-cols-2">
      {WIDGETS.map((widget) => {
        const on = !!open[widget.id];
        const src = `${HOST}?view=${widget.id}&embed=1&q=${encodeURIComponent(title)}`;
        return (
          <section
            key={widget.id}
            className="flex min-h-[340px] flex-col overflow-hidden rounded-lg border border-line bg-ink"
          >
            <button
              type="button"
              onClick={() => setOpen((prev) => ({ ...prev, [widget.id]: !prev[widget.id] }))}
              className={
                on
                  ? "min-h-11 bg-teal px-4 text-sm font-semibold text-ink"
                  : "min-h-11 border-b border-line px-4 text-sm text-cream"
              }
            >
              {widget.label}
            </button>
            {on ? (
              <iframe title={widget.label} src={src} className="min-h-[300px] w-full flex-1 border-0 bg-ink" allow="autoplay" />
            ) : (
              <div className="grid min-h-[300px] flex-1 place-items-center px-4 text-center text-sm text-dim">
                Blank until you open {widget.label}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
