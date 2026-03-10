export interface Question {
  No: number;
  Topik: string;
  Pertanyaan: string;
  Pilihan: string[];
  Jawaban: string;
  Pembahasan: string;
}

export type QuizState = 'welcome' | 'playing' | 'results';

export interface QuizSession {
  score: number;
  currentQuestionIndex: number;
  answers: {
    questionNo: number;
    selectedOption: string;
    isCorrect: boolean;
  }[];
}
