import {
  lectureById as catalogLectureById,
  programs as catalogPrograms,
  tracks as catalogTracks,
  type Lecture,
  type Program,
  type Track,
} from "@/data/catalog";
import { nmLectures, nmPrograms, nmTrack, programPatches } from "@/data/nuclear";

export type { Lecture, Program, Track };
export { primers, schools } from "@/data/catalog";

export const lectureById: Record<string, Lecture> = {
  ...catalogLectureById,
  ...Object.fromEntries(nmLectures.map((lecture) => [lecture.id, lecture])),
};

export const tracks: Record<string, Track> = {
  ...catalogTracks,
  nm: nmTrack,
};

export const programs: Program[] = [
  ...catalogPrograms.map((program) => {
    const patch = programPatches[program.slug];
    return patch ? { ...program, ...patch } : program;
  }),
  ...nmPrograms,
];

export function trackLectureIds(trackKey: string): string[] {
  const track = tracks[trackKey];
  if (!track) return [];
  const seen = new Set<string>();
  const ids: string[] = [];
  for (const mod of track.modules) {
    for (const id of mod.lectureIds) {
      if (seen.has(id)) continue;
      seen.add(id);
      ids.push(id);
    }
  }
  return ids;
}
