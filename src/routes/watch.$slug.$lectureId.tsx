import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { LocalClips } from "@/components/local-clips";
import { StudioDock } from "@/components/studio-dock";
import { TeachingFiles } from "@/components/teaching-files";
import { YoutubeSlot } from "@/components/youtube-slot";
import { Shell } from "@/components/shell";
import { coverage, formatDuration, lectureOf, programBySlug, schoolName } from "@/lib/atlas";
import { doneSet, useProgress } from "@/lib/progress";

export const Route = createFileRoute("/watch/$slug/$lectureId")({
  component: WatchPage,
});

function WatchPage() {
  const { slug, lectureId } = Route.useParams();
  const program = programBySlug(slug);
  const lecture = lectureOf(lectureId);
  const done = useProgress((s) => s.done);
  const toggle = useProgress((s) => s.toggle);
  const remember = useProgress((s) => s.remember);
  const seen = doneSet(done);

  useEffect(() => {
    if (program && lecture) remember({ slug: program.slug, lectureId: lecture.id });
  }, [program, lecture, remember]);

  useEffect(() => {
    if (!lecture || window.parent === window) return;
    const videoId = lecture.id;
    window.parent.postMessage(
      { source: "hj-caption", cc: true, videoId, text: lecture.title + ". " + lecture.channel },
      "*",
    );
    const onYt = (event: MessageEvent) => {
      if (String(event.origin || "").indexOf("youtube.com") < 0) return;
      let payload: { info?: { currentTime?: number } } | null = null;
      if (typeof event.data === "string") {
        try { payload = JSON.parse(event.data); } catch { return; }
      } else if (event.data && typeof event.data === "object") {
        payload = event.data as { info?: { currentTime?: number } };
      }
      const time = payload?.info?.currentTime;
      if (typeof time !== "number") return;
      window.parent.postMessage({ source: "hj-caption", cc: true, videoId, t: time }, "*");
    };
    window.addEventListener("message", onYt);
    const poll = window.setInterval(() => {
      const frame = document.getElementById("hj-yt") as HTMLIFrameElement | null;
      const win = frame?.contentWindow;
      if (!win) return;
      win.postMessage(JSON.stringify({ event: "listening", id: "hj-yt", channel: "widget" }), "*");
      win.postMessage(JSON.stringify({ event: "command", func: "getCurrentTime", args: [], id: "hj-yt", channel: "widget" }), "*");
    }, 1000);
    return () => {
      window.removeEventListener("message", onYt);
      window.clearInterval(poll);
    };
  }, [lecture]);

  if (!program || !lecture) {
    return (
      <Shell>
        <p className="font-serif text-2xl">That lecture is not on this track.</p>
        <Link to="/" className="mt-4 inline-block text-teal-2">
          Back to the atlas
        </Link>
      </Shell>
    );
  }

  const cov = coverage(program.track, seen);
  const index = cov.ids.indexOf(lecture.id);
  const onTrack = index >= 0;
  const prev = onTrack && index > 0 ? cov.ids[index - 1] : undefined;
  const next = onTrack && index < cov.ids.length - 1 ? cov.ids[index + 1] : undefined;
  const watched = seen.has(lecture.id);

  return (
    <Shell>
      <Link
        to="/programs/$slug"
        params={{ slug: program.slug }}
        className="text-sm text-teal-2"
      >
        {program.name}
      </Link>
      <p className="mt-3 text-xs tracking-widest text-salmon uppercase">
        {schoolName(program.school)} · {onTrack ? `Lecture ${index + 1} of ${cov.ids.length}` : "Off-track"}
      </p>
      <h1 className="mt-2 font-serif text-2xl leading-snug text-cream sm:text-3xl">
        {lecture.title}
      </h1>
      <p className="mt-2 text-sm text-dim">
        {lecture.channel} · {formatDuration(lecture.sec)} · public YouTube lecture
      </p>

      {program.track === "nm" ? <LocalClips /> : null}

      <div className="mt-4 grid items-start gap-3 lg:grid-cols-[minmax(0,1fr)_210px]">
        <div className="min-w-0">
          <div className="overflow-hidden rounded-lg border border-line bg-ink">
            <YoutubeSlot id={lecture.id} title={lecture.title} />
          </div>
          <p className="mt-2 text-sm text-muted">
            If the player is blocked,{" "}
            <a
              className="text-teal-2 underline"
              href={`https://www.youtube.com/watch?v=${lecture.id}`}
              target="_blank"
              rel="noreferrer"
            >
              open it on YouTube
            </a>
            . The lecture stays the creator’s, not HJ Med’s.
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => toggle(lecture.id)}
            className={
              watched
                ? "min-h-11 rounded-lg bg-cream px-4 text-sm font-semibold text-ink"
                : "min-h-11 rounded-lg bg-teal px-4 text-sm font-semibold text-ink"
            }
          >
            {watched ? "Watched — tap to undo" : "Mark as watched"}
          </button>
          {next ? (
            <Link
              to="/watch/$slug/$lectureId"
              params={{ slug: program.slug, lectureId: next }}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line px-4 text-sm text-cream"
            >
              Next lecture
            </Link>
          ) : null}
          {prev ? (
            <Link
              to="/watch/$slug/$lectureId"
              params={{ slug: program.slug, lectureId: prev }}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-line px-4 text-sm text-dim"
            >
              Previous
            </Link>
          ) : null}
        </div>
      </div>

      <StudioDock title={lecture.title} />

      <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted">
        Use the lecture for the blueprint heading it actually teaches. HJ Med does not
        rewrite it, score it, or turn it into a board result. Accredited training and
        the proctored exam still sit outside this player.
      </p>
      <TeachingFiles trackKey={program.track} />
    </Shell>
  );
}
