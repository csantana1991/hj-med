import { useEffect, useState } from "react";

/** Published apps live on grok.me. Everywhere else is the temporary preview. */
export function previewHoldsExternalLinks(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname.toLowerCase();
  if (host === "grok.me" || host.endsWith(".grok.me")) return false;
  return true;
}

export function StayInPreview() {
  const [href, setHref] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onClick = (event: MouseEvent) => {
      if (!previewHoldsExternalLinks()) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const anchor = target.closest("a");
      if (!anchor) return;
      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin === window.location.origin) return;
      if (url.protocol !== "http:" && url.protocol !== "https:") return;
      event.preventDefault();
      event.stopPropagation();
      setCopied(false);
      setHref(url.href);
    };
    document.addEventListener("click", onClick, true);
    document.addEventListener("auxclick", onClick, true);
    return () => {
      document.removeEventListener("click", onClick, true);
      document.removeEventListener("auxclick", onClick, true);
    };
  }, []);

  if (!href) return null;

  return (
    <div
      role="status"
      className="fixed inset-x-3 bottom-3 z-[80] rounded-lg border border-line bg-ink p-4"
    >
      <p className="font-serif text-lg text-cream">Staying on this page</p>
      <p className="mt-1 text-sm leading-relaxed text-dim">
        Opening that site here is what turns the preview black. The address is
        below if you want it later. The course stays open.
      </p>
      <p className="mt-2 break-all text-sm text-teal-2">{href}</p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          className="min-h-11 rounded-lg bg-teal px-4 text-sm font-semibold text-ink"
          onClick={() => {
            void navigator.clipboard.writeText(href).then(
              () => setCopied(true),
              () => setCopied(false),
            );
          }}
        >
          {copied ? "Copied" : "Copy link"}
        </button>
        <button
          type="button"
          className="min-h-11 rounded-lg border border-line px-4 text-sm text-cream"
          onClick={() => setHref(null)}
        >
          Close
        </button>
      </div>
    </div>
  );
}
