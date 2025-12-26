import type { ReactNode } from 'react';
import type { Chapter, Quiz, Lecture, QuizQuestion } from './course-create';

export interface CourseDetailPageProps {
  courseId: string;
}

export interface CourseStats {
  chapters: number;
  lectures: number;
  quizzes: number;
  questions: number;
}

export interface SectionProps {
  title: string;
  children: ReactNode;
}

export interface InfoCardProps {
  label: string;
  value?: string;
  children?: ReactNode;
}

export interface EmptyStateProps {
  message: string;
}

export interface ItemNavigatorProps<T> {
  items: T[];
  currentIndex: number;
  onSelect: (index: number) => void;
  title: string;
  renderItem: (item: T, index: number) => ReactNode;
  emptyMessage: string;
}

export interface ChapterCardProps {
  chapter: Chapter;
  index: number;
}

export interface QuizCardProps {
  quiz: Quiz;
  chapters: Chapter[];
}

export interface LectureItemProps {
  lecture: Lecture;
  index: number;
}

export interface QuestionItemProps {
  question: QuizQuestion;
  index: number;
}

export type ActivityType = 
  | 'course_created' 
  | 'course_updated' 
  | 'course_published' 
  | 'course_unpublished'
  | 'student_added' 
  | 'student_removed'
  | 'certificate_issued'
  | 'chapter_added'
  | 'lecture_added'
  | 'quiz_added';

export interface CourseActivity {
  id: string;
  type: ActivityType;
  description: string;
  user: string;
  timestamp: string;
}

export interface ActivityItemProps {
  activity: CourseActivity;
}

export type ActivityPeriod = 'week' | 'month' | 'quarter' | 'year' | 'all';

export interface ActivityHistoryProps {
  activities: CourseActivity[];
}

export interface ActivityGroupProps {
  date: string;
  activities: CourseActivity[];
}

export interface HeaderProps {
  onBack: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

export interface CourseContentProps {
  course: {
    description?: string;
    chapters: Chapter[];
    quizzes: Quiz[];
  };
}

export interface NavigatorGridProps {
  items: number;
  currentIndex: number;
  onSelect: (index: number) => void;
  title: string;
}
