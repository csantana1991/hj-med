import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Shell } from "@/components/shell";
import { programs, schools, tracks } from "@/data/registry";
import { coverage, formatHours, librarySeconds, schoolName } from "@/lib/atlas";
import { doneSet, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/")({ component: Home });

const groups = [
  "All",
  "Medicine",
  "Children",
  "Surgery",
  "Brain",
  "Eyes",
  "Imaging",
  "Acute",
  "Other",
] as const;

function Home() {
  const [school, setSchool] = useState<"all" | "harvard" | "hopkins" | "emory">("all");
  const [kind, setKind] = useState<"all" | "residency" | "fellowship">("residency");
  const [group, setGroup] = useState<(typeof groups)[number]>("All");
  const [q, setQ] = useState("");
  const done = useProgress((s) => s.done);
  const results = useProgress((s) => s.results);
  const last = useProgress((s) => s.last);
  const seen = useMemo(() => doneSet(done), [done]);

  const librarySec = useMemo(() => librarySeconds(), []);
  const passedBoards = useMemo(() => {
    const keys = new Set(programs.map((p) => p.track));
    let n = 0;
    for (const key of keys) {
      if (results?.[key]?.passed) n += 1;
    }
    return n;
  }, [results]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return programs.filter((p) => {
      if (school !== "all" && p.school !== school) return false;
      if (kind !== "all" && p.kind !== kind) return false;
      if (group !== "All" && p.group !== group) return false;
      if (!query) return true;
      const blob = `${p.name} ${p.site} ${p.board} ${p.group} ${schoolName(p.school)}`.toLowerCase();
      return blob.includes(query);
    });
  }, [school, kind, group, q]);

  const lastProgram = last ? programs.find((p) => p.slug === last.slug) : undefined;

  return (
    <Shell>
      <section className="border-b border-line pb-8">
        <p className="text-xs font-semibold tracking-widest text-salmon uppercase">
          Open lecture atlas
        </p>
        <h1 className="mt-3 max-w-3xl font-serif text-4xl leading-tight text-cream sm:text-5xl">
          Harvard <span className="text-muted">:</span> Johns
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-dim">
          Every residency and fellowship from the Harvard Medical School affiliates and
          from Johns Hopkins, plus Emory radiology and nuclear medicine. Each program has
          a scored sitting. Pass is 70%. The result is saved on the program.
        </p>
        <dl className="mt-6 grid grid-cols-3 gap-3">
          <Stat k="Programs" v={String(programs.length)} />
          <Stat k="Boards passed" v={`${passedBoards}/${Object.keys(tracks).length}`} />
          <Stat k="Open lectures" v={formatHours(librarySec)} />
        </dl>
        {last && lastProgram ? (
          <Link
            to="/watch/$slug/$lectureId"
            params={{ slug: last.slug, lectureId: last.lectureId }}
            className="mt-5 flex items-center justify-between gap-3 rounded-lg border border-line bg-surface px-4 py-3"
          >
            <span>
              <span className="block text-xs tracking-widest text-teal-2 uppercase">
                Continue
              </span>
              <span className="mt-1 block font-serif text-lg text-cream">
                {lastProgram.name}
              </span>
            </span>
            <span className="text-sm text-dim">Play</span>
          </Link>
        ) : null}
      </section>

      <section className="py-6">
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-4 gap-2">
            <Seg on={school === "all"} label="All" onClick={() => setSchool("all")} />
            <Seg on={school === "harvard"} label="Harvard" onClick={() => setSchool("harvard")} />
            <Seg on={school === "hopkins"} label="Hopkins" onClick={() => setSchool("hopkins")} />
            <Seg on={school === "emory"} label="Emory" onClick={() => setSchool("emory")} />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <Seg on={kind === "residency"} label="Residency" onClick={() => setKind("residency")} />
            <Seg
              on={kind === "fellowship"}
              label="Fellowship"
              onClick={() => setKind("fellowship")}
            />
            <Seg on={kind === "all"} label="All" onClick={() => setKind("all")} />
          </div>
          <label className="block">
            <span className="sr-only">Search programs</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search nuclear medicine, Emory, Osler, Wilmer…"
              className="w-full rounded-lg border border-line bg-bg-2 px-3 py-3 text-base text-cream outline-none placeholder:text-muted focus:border-teal"
            />
          </label>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {groups.map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGroup(g)}
                className={
                  group === g
                    ? "shrink-0 rounded-full bg-teal px-3 py-2 text-sm font-medium text-ink"
                    : "shrink-0 rounded-full border border-line px-3 py-2 text-sm text-dim"
                }
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        {school !== "all" ? (
          <p className="mt-4 text-sm leading-relaxed text-dim">{schools[school].line}</p>
        ) : (
          <p className="mt-4 text-sm leading-relaxed text-dim">
            {schools.harvard.line} {schools.hopkins.line} {schools.emory.line}
          </p>
        )}

        <p className="mt-4 text-sm text-muted">
          {filtered.length} {filtered.length === 1 ? "program" : "programs"}
        </p>

        <ul className="mt-2 divide-y divide-line">
          {filtered.map((p) => {
            const result = results?.[p.track];
            const cov = coverage(p.track, seen);
            return (
              <li key={p.slug}>
                <Link
                  to="/programs/$slug"
                  params={{ slug: p.slug }}
                  className="flex items-start justify-between gap-3 py-4"
                >
                  <span className="min-w-0">
                    <span className="block font-serif text-lg leading-snug text-cream">
                      {p.name}
                    </span>
                    <span className="mt-1 block text-sm text-dim">
                      {schoolName(p.school)} · {p.site}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {p.kind === "residency" ? "Residency" : "Fellowship"} · {p.years} yr ·{" "}
                      {p.board}
                    </span>
                  </span>
                  <span className="shrink-0 text-right">
                    <span
                      className={
                        result?.passed
                          ? "block font-serif text-lg text-teal-2"
                          : result
                            ? "block font-serif text-lg text-salmon"
                            : "block font-serif text-lg text-muted"
                      }
                    >
                      {result ? (result.passed ? "Passed" : "Not passed") : "Not sat"}
                    </span>
                    <span className="mt-1 block text-sm text-muted">
                      {result ? `${result.percent}%` : formatHours(cov.total)}
                    </span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
        {filtered.length === 0 ? (
          <p className="py-10 text-center text-dim">Nothing in the atlas matches that.</p>
        ) : null}
      </section>
      <p className="border-t border-line pt-4 text-xs leading-relaxed text-muted">
        {Object.keys(tracks).length} board tracks. Lecture time is the runtime of the
        public videos assigned to that track. Commercial-course hour marks are a
        yardstick, not a promise that a video equals a certificate.
      </p>
    </Shell>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div className="rounded-lg border border-line bg-bg-2 px-3 py-3">
      <dt className="text-xs tracking-widest text-muted uppercase">{k}</dt>
      <dd className="mt-1 font-serif text-2xl text-cream">{v}</dd>
    </div>
  );
}

function Seg({ on, label, onClick }: { on: boolean; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        on
          ? "min-h-11 rounded-lg bg-cream px-2 py-2 text-sm font-semibold text-ink"
          : "min-h-11 rounded-lg border border-line px-2 py-2 text-sm text-dim"
      }
    >
      {label}
    </button>
  );
}
