export type QuestionType = 'single' | 'multiple' | 'text';
export type LessonType = 'video' | 'quiz' | 'reading';
export type LessonStatus = 'locked' | 'available' | 'in_progress' | 'completed';

export interface Question {
  id: string;
  type: QuestionType;
  content: string;
  options?: QuestionOption[];
  correctAnswer?: string | string[];
  explanation?: string;
  points: number;
}

export interface QuestionOption {
  id: string;
  content: string;
}

export interface Quiz {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  passingScore: number;
  timeLimit?: number;
  maxAttempts?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  answers: Record<string, string | string[]>;
  score: number;
  passed: boolean;
  startedAt: string;
  completedAt?: string;
}

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  progress: number;
  completedAt?: string;
  quizAttempts?: QuizAttempt[];
}

export interface CourseProgress {
  courseId: string;
  lessonProgress: Record<string, LessonProgress>;
  currentLessonId: string;
  completionRate: number;
  lastAccessedAt: string;
}

export interface LearningLesson {
  id: string;
  chapterId: string;
  title: string;
  type: LessonType;
  duration: number;
  orderIndex: number;
  videoUrl?: string;
  content?: string;
  quiz?: Quiz;
}

export interface LearningChapter {
  id: string;
  title: string;
  orderIndex: number;
  lessons: LearningLesson[];
}

export interface LearningSidebarProps {
  chapters: LearningChapter[];
  currentLessonId: string;
  progress: Record<string, LessonProgress>;
  onSelectLesson: (lessonId: string) => void;
}

export interface VideoLessonProps {
  lesson: LearningLesson;
  onComplete: () => void;
  onProgress: (progress: number) => void;
}

export interface QuizSectionProps {
  quiz: Quiz;
  onSubmit: (answers: Record<string, string | string[]>) => void;
  onComplete: (passed: boolean, score: number) => void;
  attempt?: QuizAttempt;
}

export interface QuizQuestionProps {
  question: Question;
  questionNumber: number;
  selectedAnswer?: string | string[];
  onAnswer: (answer: string | string[]) => void;
  showResult?: boolean;
  correctAnswerSet?: Set<string>;
  hideExplanation?: boolean;
}

export interface QuizResultProps {
  quiz: Quiz;
  attempt: QuizAttempt;
  onRetry: () => void;
  onContinue: () => void;
}

export interface LearningPageProps {
  courseId: string;
  chapters: LearningChapter[];
  progress: CourseProgress;
}

export interface LessonHeaderProps {
  chapterTitle: string;
  lessonTitle: string;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
  onToggleSidebar: () => void;
}

export interface VideoLessonContentProps {
  lesson: LearningLesson;
  isCompleted: boolean;
  onComplete: () => void;
  onNext: () => void;
  hasNext: boolean;
}

export interface ReadingLessonContentProps {
  lesson: LearningLesson;
  isCompleted: boolean;
  onComplete: () => void;
  onNext: () => void;
  hasNext: boolean;
}

export interface LearningChapterItemProps {
  chapter: LearningChapter;
  currentLessonId: string;
  progress: Record<string, LessonProgress>;
  onSelectLesson: (id: string) => void;
}

export interface LessonItemProps {
  lesson: LearningLesson;
  isCurrent: boolean;
  status: LessonStatus;
  onSelect: (id: string) => void;
}

export interface QuizIntroProps {
  quiz: Quiz;
  onStart: () => void;
}

export interface QuizProgressProps {
  current: number;
  total: number;
  label?: string;
  timer?: number;
  isWarning?: boolean;
}

export interface QuizState {
  started: boolean;
  currentIndex: number;
  answers: Map<string, string | string[]>;
  showResults: boolean;
  attempt?: QuizAttempt;
  timeLeft: number;
}

export interface QuizActions {
  start: () => void;
  answer: (questionId: string, value: string | string[]) => void;
  goTo: (index: number) => void;
  submit: () => void;
  retry: () => void;
  getAttempt: () => QuizAttempt | undefined;
}

export interface AnswerCheckResult {
  isCorrect: boolean;
  correctAnswerSet: Set<string>;
}

export interface QuestionListProps {
  questions: Question[];
  currentIndex: number;
  answers: Map<string, string | string[]>;
  onSelect: (index: number) => void;
  showResults?: boolean;
  correctAnswers?: Map<string, Set<string>>;
}

export type QuestionItemStatus = 'current' | 'answered' | 'unanswered' | 'correct' | 'incorrect';
export type QuestionDisplayStatus = Exclude<QuestionItemStatus, 'current'>;

export interface QuestionItemState {
  index: number;
  isCurrent: boolean;
  status: QuestionDisplayStatus;
}

export interface QuizExplanationProps {
  explanation?: string;
}

