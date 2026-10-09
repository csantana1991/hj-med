import { Link } from "@tanstack/react-router";
import { examFor } from "@/data/exams";
import { useProgress } from "@/lib/progress";
import type { Program } from "@/data/catalog";

export function BoardCard({ program }: { program: Program }) {
  const exam = examFor(program.track);
  const result = useProgress((s) => s.results?.[program.track]);
  const live = useProgress((s) => s.live?.[program.track]);
  if (!exam) return null;

  return (
    <section className="mt-5 rounded-lg border border-line bg-bg-2 p-4">
      <p className="text-xs font-semibold tracking-widest text-salmon uppercase">
        Board result
      </p>
      {result ? (
        <>
          <p
            className={
              result.passed
                ? "mt-2 font-serif text-4xl text-teal-2"
                : "mt-2 font-serif text-4xl text-salmon"
            }
          >
            {result.passed ? "Passed" : "Not passed"}
          </p>
          <p className="mt-1 text-sm text-dim">
            {result.percent}% · {result.correct} of {result.total} · cut {exam.pass}%
          </p>
        </>
      ) : (
        <>
          <p className="mt-2 font-serif text-2xl text-cream">Not sat</p>
          <p className="mt-1 text-sm leading-relaxed text-dim">
            {exam.items.length} items · {exam.minutes} minutes · pass at {exam.pass}%. One
            best answer. The score is the result.
          </p>
        </>
      )}
      <p className="mt-2 text-sm text-muted">{exam.board}</p>
      <Link
        to="/boards/$slug"
        params={{ slug: program.slug }}
        className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-cream px-4 text-sm font-semibold text-ink"
      >
        {live ? "Resume the sitting" : result ? "Open the result" : "Sit the board"}
      </Link>
    </section>
  );
}
