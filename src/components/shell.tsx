import { Link } from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";
import { useProgress } from "@/lib/progress";

export function Shell({ children, wide, live }: { children: ReactNode; wide?: boolean; live?: string }) {
  useEffect(() => {
    void useProgress.persist.rehydrate();
  }, []);

  const frame = wide ? "px-4" : "mx-auto max-w-6xl px-4";

  return (
    <div className="min-h-screen bg-bg text-cream">
      <header className="sticky top-0 z-20 border-b border-line bg-bg/95 backdrop-blur-sm">
        <div className={`flex items-center justify-between gap-3 py-3 ${frame}`}>
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-serif text-xl leading-none text-cream">HJ</span>
            <span className="text-xs font-semibold tracking-widest text-teal-2 uppercase">
              Med
            </span>
          </Link>
          <nav className="flex items-center gap-1 text-sm">
            <Link
              to="/"
              className="rounded-lg px-3 py-2 text-dim hover:bg-surface hover:text-cream"
              activeOptions={{ exact: true }}
              activeProps={{ className: "rounded-lg px-3 py-2 bg-surface text-cream" }}
            >
              Atlas
            </Link>
            <Link
              to="/readiness"
              className="rounded-lg px-3 py-2 text-dim hover:bg-surface hover:text-cream"
              activeProps={{ className: "rounded-lg px-3 py-2 bg-surface text-cream" }}
            >
              Results
            </Link>
          </nav>
        </div>
      </header>
      {live ? null : (
        <div className="border-b border-line bg-bg-2">
          <p className={`py-2 text-sm leading-relaxed text-dim ${frame}`}>
            Independent board sittings for Harvard-affiliate, Johns Hopkins, and Emory
            radiology and nuclear medicine programs. The result is the score. Not a diploma
            from the specialty board, and not issued by any of the universities.
          </p>
        </div>
      )}
      <main className={`py-4 ${frame}`}>{children}</main>
    </div>
  );
}
