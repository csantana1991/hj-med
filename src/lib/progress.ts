import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { BoardScore, LiveSitting } from "@/lib/board";

type Last = { slug: string; lectureId: string };

type ProgressState = {
  done: string[];
  last: Last | null;
  live: Record<string, LiveSitting>;
  results: Record<string, BoardScore>;
  toggle: (id: string) => void;
  mark: (id: string, last?: Last) => void;
  remember: (last: Last) => void;
  startSitting: (track: string, order: string[], minutes: number) => void;
  pickChoice: (track: string, itemId: string, choice: number) => void;
  moveCursor: (track: string, cursor: number) => void;
  submitSitting: (track: string, score: BoardScore) => void;
};

export const useProgress = create<ProgressState>()(
  persist(
    (set, get) => ({
      done: [],
      last: null,
      live: {},
      results: {},
      toggle: (id) => {
        const done = get().done;
        set({
          done: done.includes(id) ? done.filter((x) => x !== id) : [...done, id],
        });
      },
      mark: (id, last) => {
        const done = get().done;
        set({
          done: done.includes(id) ? done : [...done, id],
          last: last ?? get().last,
        });
      },
      remember: (last) => set({ last }),
      startSitting: (track, order, minutes) => {
        set({
          live: {
            ...(get().live ?? {}),
            [track]: {
              order,
              picks: {},
              cursor: 0,
              endsAt: Date.now() + minutes * 60 * 1000,
            },
          },
        });
      },
      pickChoice: (track, itemId, choice) => {
        const sitting = get().live?.[track];
        if (!sitting) return;
        set({
          live: {
            ...get().live,
            [track]: { ...sitting, picks: { ...sitting.picks, [itemId]: choice } },
          },
        });
      },
      moveCursor: (track, cursor) => {
        const sitting = get().live?.[track];
        if (!sitting) return;
        set({
          live: {
            ...get().live,
            [track]: { ...sitting, cursor },
          },
        });
      },
      submitSitting: (track, score) => {
        const live = { ...(get().live ?? {}) };
        delete live[track];
        set({
          live,
          results: { ...(get().results ?? {}), [track]: score },
        });
      },
    }),
    { name: "hj-med-progress", skipHydration: true },
  ),
);

export function doneSet(done: string[]) {
  return new Set(done);
}
