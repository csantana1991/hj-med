import { useEffect, useState, type ReactNode } from "react";

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
  const tall = open === "rrultimate";

  useEffect(() => {
    if (window.parent === window) return;
    if (!tall) {
      window.parent.postMessage({ source: "hj-layout", mode: "fit" }, "*");
      return;
    }
    const send = () => {
      window.parent.postMessage(
        { source: "hj-layout", mode: "down", height: Math.max(document.documentElement.scrollHeight, 1700) },
        "*",
      );
    };
    send();
    const timer = window.setInterval(send, 1000);
    return () => window.clearInterval(timer);
  }, [tall]);

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
      <div className="grid items-start gap-3 lg:grid-cols-2">
        <div className="min-w-0">{children}</div>
        <section className="min-h-[46vh] overflow-hidden rounded-lg border border-line bg-ink">
          <div className="min-h-11 bg-teal px-4 py-3 text-sm font-semibold text-ink">
            {chosen ? chosen.label : "Widgets"}
          </div>
          {chosen ? (
            <iframe
              title={chosen.label}
              src={`${HOST}?view=${chosen.id}&embed=1&q=${encodeURIComponent(title)}`}
              className="w-full border-0 bg-ink"
              style={tall ? { height: "920px", minHeight: "920px" } : { height: "46vh", minHeight: "320px" }}
              allow="autoplay"
            />
          ) : (
            <div className="grid gap-2 p-3 sm:grid-cols-2">
              {WIDGETS.map((widget) => (
                <button
                  key={widget.id}
                  type="button"
                  onClick={() => setOpen(widget.id)}
                  className="min-h-16 rounded-lg border border-line px-3 text-left text-sm font-semibold text-cream"
                >
                  {widget.label}
                </button>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
