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

  function choose(id: string) {
    setOpen((current) => (current === id ? null : id));
    const panel = document.getElementById("panel-" + id);
    if (panel) panel.scrollIntoView({ block: "nearest", behavior: "smooth" });
  }

  return (
    <div className="grid items-start gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
      <nav className="flex flex-col gap-2">
        {WIDGETS.map((widget) => (
          <button
            key={widget.id}
            type="button"
            onClick={() => choose(widget.id)}
            className={
              open === widget.id
                ? "min-h-11 rounded-full bg-teal px-4 text-left text-sm font-semibold text-ink"
                : "min-h-11 rounded-full border border-line px-4 text-left text-sm text-cream"
            }
          >
            {widget.label}
          </button>
        ))}
      </nav>
      <div className="min-w-0">
        {children}
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {WIDGETS.map((widget) => {
            const on = open === widget.id;
            const src = `${HOST}?view=${widget.id}&embed=1&q=${encodeURIComponent(title)}`;
            return (
              <section id={"panel-" + widget.id} key={widget.id} className="min-w-0 overflow-hidden rounded-lg border border-line bg-ink">
                <button
                  type="button"
                  onClick={() => choose(widget.id)}
                  className={on ? "min-h-11 w-full bg-teal px-4 text-sm font-semibold text-ink" : "min-h-11 w-full bg-teal/80 px-4 text-sm font-semibold text-ink"}
                >
                  {widget.label}
                </button>
                {on ? (
                  <iframe title={widget.label} src={src} className="h-[420px] w-full border-0 bg-ink" allow="autoplay" />
                ) : null}
              </section>
            );
          })}
        </div>
      </div>
    </div>
  );
}
