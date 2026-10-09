import {
  lectureById,
  programs,
  trackLectureIds,
  tracks,
  type Program,
} from "@/data/registry";
import { plates, trackFilms, type Plate } from "@/data/plates";
import { extraById, extraByTrack, extraLectures, flagshipId } from "@/data/sittings";

export function programBySlug(slug: string) {
  return programs.find((p) => p.slug === slug);
}

export function lectureOf(id: string) {
  return lectureById[id] ?? extraById[id];
}

export function trackIds(trackKey: string): string[] {
  const ids = trackLectureIds(trackKey);
  const extra = extraByTrack[trackKey];
  if (extra && !ids.includes(extra)) return [...ids, extra];
  return ids;
}

export function flagship(trackKey: string) {
  const id = flagshipId[trackKey];
  return id ? lectureOf(id) : undefined;
}

export function platesFor(trackKey: string): { plates: Plate[]; note: string } {
  const row = trackFilms[trackKey];
  if (!row) return { plates: [], note: "" };
  return {
    plates: row.plateIds.map((id) => plates[id]).filter((plate): plate is Plate => Boolean(plate)),
    note: row.note,
  };
}

export function secondsOf(ids: string[]) {
  return ids.reduce((sum, id) => sum + (lectureOf(id)?.sec ?? 0), 0);
}

export function coverage(trackKey: string, done: Set<string>) {
  const ids = trackIds(trackKey);
  let watched = 0;
  let n = 0;
  for (const id of ids) {
    if (!done.has(id)) continue;
    n += 1;
    watched += lectureOf(id)?.sec ?? 0;
  }
  return {
    ids,
    total: secondsOf(ids),
    watched,
    doneCount: n,
    count: ids.length,
  };
}

export function formatDuration(sec: number) {
  if (sec <= 0) return "0m";
  const h = Math.floor(sec / 3600);
  const m = Math.round((sec % 3600) / 60);
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function formatHours(sec: number) {
  if (sec <= 0) return "0m";
  const h = sec / 3600;
  if (h < 1) return `${Math.max(1, Math.round(sec / 60))}m`;
  if (h >= 10) return `${Math.round(h)}h`;
  return `${h.toFixed(1)}h`;
}

export function catalogSentence(program: Program) {
  const track = tracks[program.track];
  const ids = trackIds(program.track);
  const sec = secondsOf(ids);
  const hours = sec / 3600;
  if (!track) return "";
  if (sec === 0) {
    return "No verified public lecture is attached to this track yet. The headings below are the study map — not a video course, and not a board score.";
  }
  const catalog = formatDuration(sec);
  const added = extraByTrack[program.track];
  const addedNote = added
    ? " One public sitting was added because the generated catalog was empty or only a short mnemonic."
    : "";
  if (hours + 0.05 >= track.boardHours) {
    return `Open catalog: ${catalog} across ${ids.length} lectures. A typical commercial review for this exam is about ${track.boardHours} hours, so this path meets that length with public tapes.${addedNote}`;
  }
  return `Open catalog: ${catalog} across ${ids.length} lectures. A typical commercial review for this exam is about ${track.boardHours} hours. The shortfall is listed, not filled with repeated clips.${addedNote}`;
}

export function schoolName(school: Program["school"]) {
  if (school === "harvard") return "Harvard system";
  if (school === "emory") return "Emory";
  return "Johns Hopkins";
}

export function librarySeconds() {
  return (
    Object.values(lectureById).reduce((sum, lecture) => sum + lecture.sec, 0) +
    extraLectures.reduce((sum, lecture) => sum + lecture.sec, 0)
  );
}
