import type { Exam, ExamItem } from "@/data/exams/types";

export type BoardScore = {
  correct: number;
  total: number;
  percent: number;
  passed: boolean;
  at: number;
  order: string[];
  picks: Record<string, number>;
};

export type LiveSitting = {
  order: string[];
  picks: Record<string, number>;
  cursor: number;
  endsAt: number;
};

export function shuffleIds(items: ExamItem[]) {
  const ids = items.map((item) => item.id);
  for (let i = ids.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    const swap = ids[i];
    ids[i] = ids[j];
    ids[j] = swap;
  }
  return ids;
}

export function grade(
  exam: Exam,
  order: string[],
  picks: Record<string, number>,
): BoardScore {
  const byId = new Map(exam.items.map((item) => [item.id, item]));
  let correct = 0;
  for (const id of order) {
    const item = byId.get(id);
    if (item && picks[id] === item.answer) correct += 1;
  }
  const total = order.length;
  const percent = total ? Math.round((100 * correct) / total) : 0;
  return {
    correct,
    total,
    percent,
    passed: percent >= exam.pass,
    at: Date.now(),
    order,
    picks,
  };
}

export function itemMap(exam: Exam) {
  return new Map(exam.items.map((item) => [item.id, item]));
}

export function breakdown(exam: Exam, score: BoardScore) {
  const byId = itemMap(exam);
  const rows = new Map<string, { correct: number; total: number }>();
  for (const id of score.order) {
    const item = byId.get(id);
    if (!item) continue;
    const row = rows.get(item.blueprint) ?? { correct: 0, total: 0 };
    row.total += 1;
    if (score.picks[id] === item.answer) row.correct += 1;
    rows.set(item.blueprint, row);
  }
  return [...rows.entries()].map(([name, row]) => ({ name, ...row }));
}

export function formatClock(ms: number) {
  const sec = Math.max(0, Math.ceil(ms / 1000));
  const m = Math.floor(sec / 60);
  const s = sec % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}
