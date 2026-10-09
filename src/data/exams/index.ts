import type { Exam } from "./types";
import { medicineExams } from "./a-medicine";
import { medicineRestExams } from "./a-medicine-rest";
import { peopleExams } from "./b-people";
import { peopleRestExams } from "./b-people-rest";
import { acuteExams } from "./c-acute";
import { acuteRestExams } from "./c-acute-rest";
import { nuclearExam } from "./e-nuclear";
import { specialtyExams } from "./d-specialty";

export const exams: Record<string, Exam> = {
  ...medicineExams,
  ...medicineRestExams,
  ...peopleExams,
  ...peopleRestExams,
  ...acuteExams,
  ...acuteRestExams,
  ...specialtyExams,
  nm: nuclearExam,
};

export function examFor(track: string) {
  return exams[track];
}
