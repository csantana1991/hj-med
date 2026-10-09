import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Shell } from "@/components/shell";
import { examFor } from "@/data/exams";
import { breakdown, formatClock, grade, itemMap, shuffleIds } from "@/lib/board";
import { programBySlug, schoolName } from "@/lib/atlas";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/boards/$slug")({
  component: BoardPage,
});

function BoardPage() {
  const { slug } = Route.useParams();
  const program = programBySlug(slug);
  const exam = program ? examFor(program.track) : undefined;
  const live = useProgress((s) => (program ? s.live?.[program.track] : undefined));
  const result = useProgress((s) => (program ? s.results?.[program.track] : undefined));
  const startSitting = useProgress((s) => s.startSitting);
  const pickChoice = useProgress((s) => s.pickChoice);
  const moveCursor = useProgress((s) => s.moveCursor);
  const submitSitting = useProgress((s) => s.submitSitting);
  const [ready, setReady] = useState(useProgress.persist.hasHydrated());
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    if (useProgress.persist.hasHydrated()) setReady(true);
    return useProgress.persist.onFinishHydration(() => setReady(true));
  }, []);

  useEffect(() => {
    if (!live) return;
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, [live]);

  useEffect(() => {
    if (!program || !exam || !live) return;
    if (now < live.endsAt) return;
    submitSitting(program.track, grade(exam, live.order, live.picks));
  }, [program, exam, live, now, submitSitting]);

  if (!program) {
    return (
      <Shell>
        <p className="font-serif text-2xl">That program is not in the atlas.</p>
        <Link to="/" className="mt-4 inline-block text-teal-2">
          Back to the atlas
        </Link>
      </Shell>
    );
  }

  if (!exam) {
    return (
      <Shell>
        <p className="font-serif text-2xl">This track has no sitting yet.</p>
        <Link to="/programs/$slug" params={{ slug }} className="mt-4 inline-block text-teal-2">
          Back to the program
        </Link>
      </Shell>
    );
  }

  if (!ready) {
    return (
      <Shell>
        <p className="text-dim">Opening the sitting.</p>
      </Shell>
    );
  }

  const begin = () => startSitting(program.track, shuffleIds(exam.items), exam.minutes);

  if (live) {
    const items = itemMap(exam);
    const itemId = live.order[live.cursor];
    const item = itemId ? items.get(itemId) : undefined;
    const remaining = live.endsAt - now;
    const answered = live.order.filter((id) => live.picks[id] !== undefined).length;
    if (!item) {
      return (
        <Shell>
          <p className="text-dim">That item is missing. Start the sitting again.</p>
          <button type="button" onClick={begin} className="mt-4 min-h-11 rounded-lg bg-cream px-4 text-sm font-semibold text-ink">
            Start again
          </button>
        </Shell>
      );
    }
    const finish = () => submitSitting(program.track, grade(exam, live.order, live.picks));
    return (
      <Shell>
        <div className="flex items-baseline justify-between gap-3">
          <p className="text-xs font-semibold tracking-widest text-salmon uppercase">
            {exam.board}
          </p>
          <p className={remaining < 60_000 ? "font-serif text-2xl text-salmon" : "font-serif text-2xl text-cream"}>
            {formatClock(remaining)}
          </p>
        </div>
        <p className="mt-2 text-sm text-muted">
          Item {live.cursor + 1} of {live.order.length} · {answered} answered · pass at {exam.pass}%
        </p>
        <h1 className="mt-4 font-serif text-2xl leading-snug text-cream">{item.stem}</h1>
        <div className="mt-4 flex flex-col gap-2">
          {item.choices.map((choice, index) => {
            const on = live.picks[item.id] === index;
            return (
              <button
                key={choice}
                type="button"
                onClick={() => pickChoice(program.track, item.id, index)}
                className={
                  on
                    ? "min-h-11 rounded-lg border border-teal bg-surface px-3 py-3 text-left text-sm text-cream"
                    : "min-h-11 rounded-lg border border-line px-3 py-3 text-left text-sm text-dim"
                }
              >
                <span className="mr-2 text-salmon">{String.fromCharCode(65 + index)}</span>
                {choice}
              </button>
            );
          })}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            disabled={live.cursor === 0}
            onClick={() => moveCursor(program.track, live.cursor - 1)}
            className="min-h-11 rounded-lg border border-line px-4 text-sm text-dim disabled:opacity-40"
          >
            Previous
          </button>
          {live.cursor < live.order.length - 1 ? (
            <button
              type="button"
              onClick={() => moveCursor(program.track, live.cursor + 1)}
              className="min-h-11 rounded-lg bg-teal px-4 text-sm font-semibold text-ink"
            >
              Next
            </button>
          ) : (
            <button
              type="button"
              onClick={finish}
              className="min-h-11 rounded-lg bg-cream px-4 text-sm font-semibold text-ink"
            >
              Submit the sitting
            </button>
          )}
          {live.cursor < live.order.length - 1 ? (
            <button type="button" onClick={finish} className="min-h-11 px-2 text-sm text-muted">
              Submit now
            </button>
          ) : null}
        </div>
      </Shell>
    );
  }

  if (result) {
    const items = itemMap(exam);
    const sections = breakdown(exam, result);
    return (
      <Shell>
        <Link to="/programs/$slug" params={{ slug }} className="text-sm text-teal-2">
          {program.name}
        </Link>
        <p className="mt-4 text-xs font-semibold tracking-widest text-salmon uppercase">
          Board result · {schoolName(program.school)}
        </p>
        <h1
          className={
            result.passed
              ? "mt-2 font-serif text-5xl text-teal-2"
              : "mt-2 font-serif text-5xl text-salmon"
          }
        >
          {result.passed ? "Passed" : "Not passed"}
        </h1>
        <p className="mt-3 font-serif text-3xl text-cream">{result.percent}%</p>
        <p className="mt-1 text-sm text-dim">
          {result.correct} of {result.total} correct. Cut is {exam.pass}%. {exam.board}.
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
          This is the result of the HJ Med sitting. Programs that share the track share
          it. It is not a diploma from the specialty board.
        </p>
        <ul className="mt-6 flex flex-col gap-3">
          {sections.map((section) => {
            const pct = section.total ? Math.round((100 * section.correct) / section.total) : 0;
            return (
              <li key={section.name}>
                <span className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="text-cream">{section.name}</span>
                  <span className="text-muted">
                    {section.correct}/{section.total}
                  </span>
                </span>
                <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-surface">
                  <span className="block h-full bg-teal" style={{ width: `${pct}%` }} />
                </span>
              </li>
            );
          })}
        </ul>
        <h2 className="mt-8 font-serif text-2xl text-cream">What the sitting marked</h2>
        <ol className="mt-3 flex flex-col gap-4">
          {result.order.map((id, index) => {
            const item = items.get(id);
            if (!item) return null;
            const pick = result.picks[id];
            const right = pick === item.answer;
            return (
              <li key={id} className="rounded-lg border border-line bg-bg-2 p-4">
                <p className="text-xs tracking-widest text-muted uppercase">
                  {index + 1} · {item.blueprint} · {right ? "Correct" : "Missed"}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-cream">{item.stem}</p>
                <p className="mt-2 text-sm text-dim">
                  Your answer: {pick === undefined ? "blank" : item.choices[pick]}
                </p>
                {!right ? (
                  <p className="mt-1 text-sm text-teal-2">Answer: {item.choices[item.answer]}</p>
                ) : null}
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.explain}</p>
              </li>
            );
          })}
        </ol>
        <button
          type="button"
          onClick={begin}
          className="mt-6 min-h-11 rounded-lg border border-line px-4 text-sm text-cream"
        >
          Sit it again
        </button>
      </Shell>
    );
  }

  return (
    <Shell>
      <Link to="/programs/$slug" params={{ slug }} className="text-sm text-teal-2">
        {program.name}
      </Link>
      <p className="mt-4 text-xs font-semibold tracking-widest text-salmon uppercase">
        {schoolName(program.school)}
      </p>
      <h1 className="mt-2 font-serif text-4xl leading-tight text-cream">{exam.board}</h1>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-dim">
        {exam.items.length} original items, {exam.minutes} minutes, one best answer. Unanswered
        items are wrong. The clock submits the sitting when it hits zero. Pass is {exam.pass}%.
      </p>
      <button
        type="button"
        onClick={begin}
        className="mt-6 min-h-11 rounded-lg bg-cream px-4 text-sm font-semibold text-ink"
      >
        Begin the sitting
      </button>
    </Shell>
  );
}
