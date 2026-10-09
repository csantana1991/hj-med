import { createFileRoute, Link } from "@tanstack/react-router";
import { LocalClips } from "@/components/local-clips";
import { TeachingFiles } from "@/components/teaching-files";
import { NuclearCourse } from "@/components/nuclear-course";
import { BoardCard } from "@/components/board-card";
import { YoutubeSlot } from "@/components/youtube-slot";
import { Shell } from "@/components/shell";
import { primers, tracks, trackLectureIds } from "@/data/registry";
import { extraByTrack } from "@/data/sittings";
import {
  catalogSentence,
  coverage,
  flagship,
  formatDuration,
  lectureOf,
  programBySlug,
  schoolName,
} from "@/lib/atlas";
import { doneSet, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/programs/$slug")({
  component: ProgramPage,
});

function ProgramPage() {
  const { slug } = Route.useParams();
  const program = programBySlug(slug);
  const done = useProgress((s) => s.done);
  const seen = doneSet(done);
  const toggle = useProgress((s) => s.toggle);

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

  const track = tracks[program.track];
  const cov = coverage(program.track, seen);
  const pct = cov.total ? Math.round((cov.watched / cov.total) * 100) : 0;
  const firstId = cov.ids.find((id) => !seen.has(id)) ?? cov.ids[0];
  const feature = flagship(program.track);
  const catalogIds = trackLectureIds(program.track);
  const extraId = extraByTrack[program.track];
  const extra = extraId ? lectureOf(extraId) : undefined;
  const featureWatched = feature ? seen.has(feature.id) : false;

  return (
    <Shell>
      <Link to="/" className="text-sm text-teal-2">
        Atlas
      </Link>
      <p className="mt-4 text-xs font-semibold tracking-widest text-salmon uppercase">
        {schoolName(program.school)} · {program.kind}
      </p>
      <h1 className="mt-2 font-serif text-3xl leading-tight text-cream sm:text-4xl">
        {program.name}
      </h1>
      <p className="mt-3 text-sm leading-relaxed text-dim">
        {program.site}. {program.years}-year {program.kind}. Board: {program.board}.
      </p>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-dim">
        {catalogIds.length === 0
          ? "A public sitting is now attached. The headings further down are still the study map. One lecture is not the fellowship, and it is not a board."
          : track?.scope}
      </p>
      <p className="mt-3 max-w-3xl text-sm leading-relaxed text-muted">
        {catalogSentence(program)}
      </p>

      <BoardCard program={program} />

      <div className="mt-5 rounded-lg border border-line bg-bg-2 p-4">
        <div className="flex items-end justify-between gap-3">
          <p className="font-serif text-3xl text-cream">{pct}%</p>
          <p className="text-sm text-dim">
            {formatDuration(cov.watched)} of {formatDuration(cov.total)}
          </p>
        </div>
        <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-surface">
          <div className="h-full bg-teal" style={{ width: `${pct}%` }} />
        </div>
        <p className="mt-3 text-sm text-muted">
          {cov.doneCount} of {cov.count} lectures marked watched.
          {cov.count > 0 && cov.doneCount === cov.count
            ? " Catalog complete for this track. That is the finish line here — not a board certificate."
            : " Mark a lecture only after you have actually watched it."}
        </p>
        {firstId ? (
          <Link
            to="/watch/$slug/$lectureId"
            params={{ slug: program.slug, lectureId: firstId }}
            className="mt-4 inline-flex min-h-11 items-center rounded-lg bg-teal px-4 text-sm font-semibold text-ink"
          >
            {cov.doneCount ? "Continue" : "Start the first lecture"}
          </Link>
        ) : null}
      </div>

      <NuclearCourse slug={program.slug} />

      {program.track === "nm" ? <LocalClips /> : null}

      {feature ? (
        <section className="mt-8">
          <h2 className="font-serif text-2xl text-cream">Full-length lecture</h2>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
            {catalogIds.length === 0
              ? "Nothing in the generated catalog was a real lecture. This public sitting is the one that counts. It is not a fellowship and not a board."
              : extra && extra.id === feature.id
                ? "A longer public lecture, added because the catalog tape was only a short mnemonic. It counts. It is still not a board course."
                : "Featured public lecture for this track. Programs that share the track share this sitting. It is not a recording from Emory, Harvard, or Johns Hopkins."}
          </p>
          <p className="mt-3 text-sm text-cream">{feature.title}</p>
          <p className="mt-1 text-sm text-muted">
            {feature.channel} · {formatDuration(feature.sec)} · YouTube
          </p>
          <div className="mt-3 overflow-hidden rounded-lg border border-line bg-ink">
            <YoutubeSlot id={feature.id} title={feature.title} />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => toggle(feature.id)}
              className={
                featureWatched
                  ? "min-h-11 rounded-lg bg-cream px-4 text-sm font-semibold text-ink"
                  : "min-h-11 rounded-lg bg-teal px-4 text-sm font-semibold text-ink"
              }
            >
              {featureWatched ? "Watched — tap to undo" : "Mark as watched"}
            </button>
            <Link
              to="/watch/$slug/$lectureId"
              params={{ slug: program.slug, lectureId: feature.id }}
              className="inline-flex min-h-11 items-center rounded-lg border border-line px-4 text-sm text-cream"
            >
              Open the lecture page
            </Link>
            <a
              className="inline-flex min-h-11 items-center text-sm text-teal-2 underline"
              href={`https://www.youtube.com/watch?v=${feature.id}`}
              target="_blank"
              rel="noreferrer"
            >
              Open on YouTube
            </a>
          </div>
        </section>
      ) : null}

      <TeachingFiles trackKey={program.track} />

      <section className="mt-8">
        <h2 className="font-serif text-2xl text-cream">Studio primers</h2>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-dim">
          Original 10-second HJ Med clips. They open the room. They are not lectures,
          they are not faculty from either university, and they do not count toward
          the hour total.
        </p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {primers.map((clip) => (
            <figure key={clip.src} className="overflow-hidden rounded-lg border border-line bg-ink">
              <video
                className="aspect-video w-full bg-ink"
                controls
                playsInline
                preload="none"
                src={clip.src}
              />
              <figcaption className="px-3 py-2 text-sm text-dim">
                {clip.title}. {clip.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="mt-8">
        <h2 className="font-serif text-2xl text-cream">Lectures</h2>
        {track && track.modules.length === 0 && !extra ? (
          <p className="mt-3 text-sm text-dim">No video lectures on this track.</p>
        ) : null}
        <div className="mt-3 flex flex-col gap-3">
          {track?.modules.map((mod, index) => (
            <details
              key={mod.title}
              open={index === 0}
              className="rounded-lg border border-line bg-bg-2"
            >
              <summary className="cursor-pointer list-none px-4 py-3 font-serif text-lg text-cream">
                <span className="text-salmon">{String(index + 1).padStart(2, "0")}</span>
                <span className="ml-2">{mod.title}</span>
                <span className="ml-2 text-sm font-sans text-muted">
                  {mod.lectureIds.length}
                </span>
              </summary>
              <ul className="divide-y divide-line border-t border-line">
                {mod.lectureIds.map((id) => (
                  <LectureRow
                    key={id}
                    id={id}
                    slug={program.slug}
                    on={seen.has(id)}
                    onToggle={() => toggle(id)}
                  />
                ))}
              </ul>
            </details>
          ))}
          {extra && !catalogIds.includes(extra.id) ? (
            <details open className="rounded-lg border border-line bg-bg-2">
              <summary className="cursor-pointer list-none px-4 py-3 font-serif text-lg text-cream">
                <span className="text-salmon">+</span>
                <span className="ml-2">Added public sitting</span>
                <span className="ml-2 text-sm font-sans text-muted">1</span>
              </summary>
              <ul className="divide-y divide-line border-t border-line">
                <LectureRow
                  id={extra.id}
                  slug={program.slug}
                  on={seen.has(extra.id)}
                  onToggle={() => toggle(extra.id)}
                />
              </ul>
            </details>
          ) : null}
        </div>
      </section>

      {track && track.gaps.length > 0 ? (
        <section className="mt-8 border-t border-line pt-6">
          <h2 className="font-serif text-2xl text-cream">Still outside the tapes</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-dim">
            {track.gaps.map((gap) => (
              <li key={gap}>{gap}</li>
            ))}
          </ul>
        </section>
      ) : null}
    </Shell>
  );
}

function LectureRow({
  id,
  slug,
  on,
  onToggle,
}: {
  id: string;
  slug: string;
  on: boolean;
  onToggle: () => void;
}) {
  const lec = lectureOf(id);
  if (!lec) return null;
  return (
    <li className="flex items-stretch">
      <button
        type="button"
        aria-pressed={on}
        onClick={onToggle}
        className={
          on
            ? "w-14 shrink-0 border-r border-line bg-teal text-sm font-semibold text-ink"
            : "w-14 shrink-0 border-r border-line text-sm text-muted"
        }
      >
        {on ? "Done" : "Mark"}
      </button>
      <Link
        to="/watch/$slug/$lectureId"
        params={{ slug, lectureId: id }}
        className="min-w-0 flex-1 px-3 py-3"
      >
        <span className="block text-sm leading-snug text-cream">{lec.title}</span>
        <span className="mt-1 block text-xs text-muted">
          {lec.channel} · {formatDuration(lec.sec)}
        </span>
      </Link>
    </li>
  );
}
