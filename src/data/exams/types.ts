export type ExamItem = {
  id: string;
  blueprint: string;
  stem: string;
  choices: string[];
  answer: 0 | 1 | 2 | 3 | 4;
  explain: string;
};

export type Exam = {
  board: string;
  pass: number;
  minutes: number;
  items: ExamItem[];
};
