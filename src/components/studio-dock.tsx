import { useEffect, useState } from "react";

const WIDGETS = [
  { id: "radreview", label: "RAD REVIEW" },
  { id: "radatlas", label: "Rad Atlas" },
  { id: "caseqa", label: "Q+A" },
  { id: "rrultimate", label: "RAD REVIEW Ultimate" },
  { id: "academy", label: "Academy" },
  { id: "nucleus", label: "Nucleus" },
] as const;

const HOST = "https://teaching-studios.vercel.app/studio/NucMed-Board-Studio.html";

export function StudioDock({ title }: { title: string }) {
  const [open, setOpen] = useState<string>("radatlas");

  useEffect(() => {
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
  }, [open, title]);

  const src = `${HOST}?view=${open}&embed=1&q=${encodeURIComponent(title)}`;

  return (
    <section className="mt-4 rounded-lg border border-line bg-surface">
      <div className="flex flex-wrap gap-2 p-3">
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
      <iframe
        id="studioWidget"
        title={open}
        src={src}
        className="h-[68vh] w-full border-0 bg-ink"
        allow="autoplay"
      />
    </section>
  );
}
