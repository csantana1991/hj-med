import { useEffect, useRef, useState, type ReactNode } from "react";

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
  const [open, setOpen] = useState<string | null>("radatlas");
  const chosen = WIDGETS.find((widget) => widget.id === open);

  const frameRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (window.parent === window) return;
    window.parent.postMessage({ source: "hj-layout", mode: "fit" }, "*");
  }, [open]);

  useEffect(() => {
    const send = (q: string) => {
      const frame = frameRef.current;
      if (!frame || !q || q.length < 3 || /meta image/i.test(q)) return;
      try { frame.contentWindow?.postMessage({ type: "studio-query", q }, "*"); } catch { /* widget not ready */ }
    };
    if (title) {
      send(title);
      window.setTimeout(() => send(title), 800);
    }
    const onMsg = (event: MessageEvent) => {
      const data = event.data as { type?: string; q?: string } | null;
      if (!data || data.type !== "studio-query" || !data.q) return;
      send(data.q);
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [open, title]);

  return (
    <div className="flex min-w-0 flex-col" style={{ height: "calc(100vh - 150px)", minHeight: "360px" }}>
      <div className="mb-2 flex flex-wrap gap-2">
        {WIDGETS.map((widget) => (
          <button
            key={widget.id}
            type="button"
            onClick={() => setOpen(widget.id)}
            className={
              open === widget.id
                ? "min-h-10 rounded-full bg-teal px-4 text-sm font-semibold text-ink"
                : "min-h-10 rounded-full border border-line px-4 text-sm text-cream"
            }
          >
            {widget.label}
          </button>
        ))}
      </div>
      <div className="grid min-h-0 flex-1 items-stretch gap-3 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div className="h-full min-h-0">{children}</div>
        <section className="flex h-full min-h-0 flex-col overflow-hidden rounded-lg border border-line bg-ink">
          <div className="flex min-h-10 shrink-0 items-center bg-teal px-4 text-sm font-semibold text-ink">
            {chosen ? chosen.label : "Rad Atlas"}
          </div>
          <iframe
            ref={frameRef}
            title={chosen ? chosen.label : "Rad Atlas"}
            src={`${HOST}?view=${chosen ? chosen.id : "radatlas"}&embed=1&q=${encodeURIComponent(title)}`}
            className="min-h-0 w-full flex-1 border-0 bg-ink"
            allow="autoplay"
          />
        </section>
      </div>
    </div>
  );
}
