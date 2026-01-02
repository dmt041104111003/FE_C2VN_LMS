import type { LearningChapter, CourseProgress, LessonProgress } from './learning';

export interface ApiChapter {
  id?: string | number;
  title?: string;
  orderIndex?: number;
  lectures?: ApiLecture[];
  tests?: ApiTest[];
}

export interface ApiLecture {
  id?: string | number;
  title?: string;
  time?: number;
  duration?: number;
  orderIndex?: number;
  videoUrl?: string;
  resourceUrl?: string;
  description?: string;
  content?: string;
}

export interface ApiTest {
  id?: string | number;
  title?: string;
  passScore?: number;
  durationMinutes?: number;
  questions?: ApiQuestion[];
}

export interface ApiQuestion {
  id?: string | number;
  content?: string;
  question?: string;
  explanation?: string;
  answers?: ApiAnswer[];
}

export interface ApiAnswer {
  id?: string | number;
  content?: string;
  text?: string;
  correct?: boolean;
  selected?: boolean;
}

export interface ApiCourseResponse {
  id?: string;
  chapters?: ApiChapter[];
  courseTests?: ApiTest[];
}

export interface CompletedItem {
  lectureId?: number;
  testId?: number;
  type?: string;
  contentId?: number;
  completed?: boolean;
  score?: number;
  attempts?: number;
}

export interface LearnPageState {
  courseId: string;
  chapters: LearningChapter[];
  progress: CourseProgress;
  isLoading: boolean;
  error: string | null;
}

export interface LearnPageData {
  courseId: string;
  userId: string;
  chapters: LearningChapter[];
  progress: CourseProgress;
}

export type CompletedLessonMap = Map<string, LessonProgress>;

