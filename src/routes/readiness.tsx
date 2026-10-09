import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { examFor } from "@/data/exams";
import { programs, tracks } from "@/data/registry";
import { schoolName } from "@/lib/atlas";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/readiness")({
  component: ResultsPage,
});

function ResultsPage() {
  const results = useProgress((s) => s.results);
  const [kind, setKind] = useState<"residency" | "fellowship">("residency");

  const residencyTracks = useMemo(
    () => new Set(programs.filter((p) => p.kind === "residency").map((p) => p.track)),
    [],
  );
  const allTracks = useMemo(() => new Set(programs.map((p) => p.track)), []);

  let passed = 0;
  for (const key of allTracks) {
    if (results?.[key]?.passed) passed += 1;
  }
  let residencyPassed = 0;
  for (const key of residencyTracks) {
    if (results?.[key]?.passed) residencyPassed += 1;
  }

  const rows = useMemo(() => {
    return programs
      .filter((p) => p.kind === kind)
      .map((p) => ({ program: p, result: results?.[p.track] }))
      .sort((a, b) => {
        const rank = (passedFlag: boolean | undefined, sat: boolean) =>
          passedFlag ? 2 : sat ? 1 : 0;
        const ar = rank(a.result?.passed, Boolean(a.result));
        const br = rank(b.result?.passed, Boolean(b.result));
        if (br !== ar) return br - ar;
        return a.program.name.localeCompare(b.program.name);
      });
  }, [kind, results]);

  return (
    <Shell>
      <p className="text-xs font-semibold tracking-widest text-salmon uppercase">
        All-boards index
      </p>
      <h1 className="mt-2 font-serif text-4xl leading-tight text-cream">Board results</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-dim">
        {passed} of {allTracks.size} tracks are passed. {residencyPassed} of{" "}
        {residencyTracks.size} residency tracks. A pass is {examCut()}% or better on that
        track’s sitting. Programs that share a track share the result. The specialty
        boards do not issue these scores.
      </p>

      <div className="mt-5 grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => setKind("residency")}
          className={
            kind === "residency"
              ? "min-h-11 rounded-lg bg-cream text-sm font-semibold text-ink"
              : "min-h-11 rounded-lg border border-line text-sm text-dim"
          }
        >
          Residencies
        </button>
        <button
          type="button"
          onClick={() => setKind("fellowship")}
          className={
            kind === "fellowship"
              ? "min-h-11 rounded-lg bg-cream text-sm font-semibold text-ink"
              : "min-h-11 rounded-lg border border-line text-sm text-dim"
          }
        >
          Fellowships
        </button>
      </div>

      <ul className="mt-4 divide-y divide-line">
        {rows.map(({ program, result }) => {
          const exam = examFor(program.track);
          return (
            <li key={program.slug} className="py-4">
              <Link to="/boards/$slug" params={{ slug: program.slug }} className="block">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="font-serif text-lg leading-snug text-cream">
                    {program.name}
                  </span>
                  <span
                    className={
                      result?.passed
                        ? "shrink-0 text-sm text-teal-2"
                        : result
                          ? "shrink-0 text-sm text-salmon"
                          : "shrink-0 text-sm text-muted"
                    }
                  >
                    {result ? (result.passed ? `Passed ${result.percent}%` : `Not passed ${result.percent}%`) : "Not sat"}
                  </span>
                </span>
                <span className="mt-1 block text-sm text-muted">
                  {schoolName(program.school)} · {exam?.board ?? program.board}
                </span>
                <span className="mt-2 block h-1 overflow-hidden rounded-full bg-surface">
                  <span
                    className={result?.passed ? "block h-full bg-teal" : "block h-full bg-salmon"}
                    style={{ width: `${result?.percent ?? 0}%` }}
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
      <p className="mt-6 text-xs text-muted">
        {Object.keys(tracks).length} sittings. Lectures stay on the program page.
      </p>
    </Shell>
  );
}

function examCut() {
  return 70;
}
