export type QuizType = 'final' | 'chapter' | 'lecture';
export type QuizSourceType = 'manual' | 'external';

export interface QuizQuestion {
  readonly id: string;
  question: string;
  options: string[];
  correctIndexes: number[];
  explanation: string;
}

export interface Quiz {
  readonly id: string;
  title: string;
  type: QuizType;
  chapterId?: string;
  questions: QuizQuestion[];
  passScore?: number;
  timeLimit?: number;
}

export interface QuizEditorProps {
  readonly quiz: Quiz;
  readonly quizIndex: number;
  readonly chapters: ReadonlyArray<ChapterRef>;
  onUpdate: (index: number, quiz: Quiz) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export interface QuestionEditorProps {
  readonly question: QuizQuestion;
  readonly questionIndex: number;
  onUpdate: (index: number, question: QuizQuestion) => void;
  onRemove: (index: number) => void;
  disabled?: boolean;
}

export interface ChapterSelectProps {
  readonly value: string;
  readonly chapters: ReadonlyArray<ChapterRef>;
  onChange: (chapterId: string) => void;
  disabled?: boolean;
}

export interface LectureRef {
  readonly id: string;
  readonly title: string;
}

export interface ChapterRef {
  readonly id: string;
  readonly title: string;
  readonly lectures: ReadonlyArray<LectureRef>;
}

export type ChapterMap = Map<string, ChapterRef>;
export type CorrectIndexSet = Set<number>;
