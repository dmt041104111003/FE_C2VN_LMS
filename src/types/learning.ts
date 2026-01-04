import type { Dispatch, SetStateAction } from 'react';

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
  selected?: boolean;
  correct?: boolean;
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
  score?: number;
  attempts?: number;
  completedAt?: string;
  quizAttempts?: QuizAttempt[];
}

export interface CourseProgress {
  courseId: string;
  lessonProgress: Record<string, LessonProgress>;
  currentLessonId: string;
  completionRate: number;
  isCompleted: boolean;
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

export interface CourseUpgradeInfo {
  courseId: string;
  hasNewVersion: boolean;
  currentSnapshotVersion: number;
  snapshotCreatedAt: string | null;
  courseUpdatedAt: string | null;
  message?: string;
}

export interface LearningSidebarProps {
  chapters: LearningChapter[];
  currentLessonId: string;
  progress: Record<string, LessonProgress>;
  onSelectLesson: (lessonId: string) => void;
  courseId?: string;
  upgradeInfo?: CourseUpgradeInfo;
  onUpgrade?: () => void;
  isUpgrading?: boolean;
}

export interface ServerQuestionResult {
  questionId: number;
  correctAnswerIds: number[];
  selectedAnswerIds: number[];
  isCorrect: boolean;
  explanation?: string;
}

export interface ServerQuizResult {
  testId: number;
  score: number;
  passed: boolean;
  questionResults: ServerQuestionResult[];
}

export interface QuizSectionProps {
  quiz: Quiz;
  courseId: string;
  userId: string;
  isAlreadyPassed?: boolean;
  onComplete: (passed: boolean, score: number) => void;
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
  userId: string;
  chapters: LearningChapter[];
  progress: CourseProgress;
  upgradeInfo?: CourseUpgradeInfo | null;
  isUpgrading?: boolean;
  onUpgrade?: () => Promise<void>;
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

export type ProgressState = CourseProgress & {
  currentLessonId: string;
  lessonProgress: Record<string, LessonProgress>;
};

export interface LessonWithChapter {
  lesson: LearningLesson;
  chapterTitle: string;
}

export interface UseLectureProgressParams {
  userId: string;
  courseId: string;
  currentLesson: LearningLesson | undefined;
  isCompleted: boolean;
  isLocked: boolean;
  allLessons: LessonWithChapter[];
  setProgress: Dispatch<SetStateAction<ProgressState>>;
}

export interface UseCompleteLessonParams {
  userId: string;
  courseId: string;
  currentLesson: LearningLesson | undefined;
  currentLessonIndex: number;
  allLessons: LessonWithChapter[];
  setProgress: Dispatch<SetStateAction<ProgressState>>;
}

export interface LessonContentProps {
  lesson: LearningLesson;
  isCompleted: boolean;
  onComplete: () => void;
  onNext: () => void;
  hasNext: boolean;
}


export interface LectureQnaReply {
  id: number;
  content: string;
  createdAt: string;
  userId: string;
  userName: string;
  userEmail?: string;
  userWalletAddress?: string;
  likeCount?: number;
  dislikeCount?: number;
  userVote?: 'LIKE' | 'DISLIKE' | null;
  visible?: boolean;
  replies?: LectureQnaReply[];
}

export interface LectureQna {
  id: number;
  content: string;
  createdAt: string;
  userId: string;
  userName: string;
  userEmail?: string;
  userWalletAddress?: string;
  likeCount: number;
  dislikeCount: number;
  userVote?: 'LIKE' | 'DISLIKE' | null;
  visible: boolean;
  replies: LectureQnaReply[];
}

export interface LectureCommentsProps {
  lectureId: string;
  isInstructor?: boolean; 
}
