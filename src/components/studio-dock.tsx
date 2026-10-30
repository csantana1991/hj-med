import { useEffect, useState, type ReactNode } from "react";

const WIDGETS = [
  { id: "radreview", label: "RAD REVIEW" },
  { id: "radatlas", label: "Rad Atlas" },
  { id: "caseqa", label: "Q+A" },
  { id: "rrultimate", label: "RAD REVIEW Ultimate" },
  { id: "academy", label: "Academy" },
  { id: "nucleus", label: "Nucleus" },
] as const;

const HOST = "https://teaching-studios.vercel.app/studio/NucMed-Board-Studio.html";

export function StudioDock({ title, children }: { title: string; children?: ReactNode }) {
  const [open, setOpen] = useState<string>("radatlas");
  const framed = typeof window !== "undefined" && window.parent !== window;

  useEffect(() => {
    if (framed) {
      window.parent.postMessage({ type: "hj-widget", view: open, title }, "*");
      return;
    }
    const frame = document.getElementById("studioWidget") as HTMLIFrameElement | null;
    const send = () => {
      frame?.contentWindow?.postMessage({ type: "studio-query", q: title }, "*");
    };
    frame?.addEventListener("load", send);
    const timer = window.setTimeout(send, 900);
    return () => {
      frame?.removeEventListener("load", send);
      window.clearTimeout(timer);
    };
  }, [framed, open, title]);

  const buttons = (
    <div className={framed ? "mt-3 flex flex-wrap gap-2" : "flex flex-col gap-2 p-3"}>
      {WIDGETS.map((widget) => (
        <button
          key={widget.id}
          type="button"
          onClick={() => setOpen(widget.id)}
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
  );

  if (framed) {
    return (
      <div className="mt-4">
        {children}
        {buttons}
      </div>
    );
  }

  const src = `${HOST}?view=${open}&embed=1&q=${encodeURIComponent(title)}`;
  return (
    <div className="mt-4 grid items-start gap-3 lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)]">
      <section className="order-2 overflow-hidden rounded-lg border border-line bg-surface lg:order-1">
        {buttons}
        <iframe
          id="studioWidget"
          title={open}
          src={src}
          className="h-[70vh] w-full border-0 bg-ink"
          allow="autoplay"
        />
      </section>
      <div className="order-1 min-w-0 lg:order-2">{children}</div>
    </div>
  );
}
