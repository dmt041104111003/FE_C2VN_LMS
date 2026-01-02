import type { LessonProgress, LessonWithChapter, LearningPageProps } from '@/types/learning';
import { LESSON_PREFIX, LESSON_STATUS } from './learning.constants';

export type { LessonWithChapter };

export const parseLessonId = (lessonId: string): { isLecture: boolean; isTest: boolean; numericId: number } => {
  const isLecture = lessonId.startsWith(LESSON_PREFIX.LECTURE);
  const isTest = lessonId.startsWith(LESSON_PREFIX.TEST);
  const numericId = parseInt(lessonId.split('-')[1], 10);
  return { isLecture, isTest, numericId };
};

export const flattenChaptersToLessons = (chapters: LearningPageProps['chapters']): LessonWithChapter[] => {
  return chapters.flatMap(ch => 
    ch.lessons.map(lesson => ({ lesson, chapterTitle: ch.title }))
  );
};

export const createLessonProgress = (
  lessonId: string, 
  status: LessonProgress['status'], 
  progress = 0,
  completedAt?: string,
  score?: number,
  attempts?: number
): LessonProgress => ({
  lessonId,
  status,
  progress,
  ...(completedAt && { completedAt }),
  ...(score !== undefined && { score }),
  ...(attempts !== undefined && { attempts }),
});

export const initializeLessonProgress = (
  allLessons: LessonWithChapter[], 
  existingProgress: Record<string, LessonProgress>
): Record<string, LessonProgress> => {
  const progressMap: Record<string, LessonProgress> = {};
  
  allLessons.forEach((item, index) => {
    const { id: lessonId } = item.lesson;
    const existing = existingProgress[lessonId];
    
    if (existing) {
      const prevLessonId = index > 0 ? allLessons[index - 1].lesson.id : null;
      const isPrevCompleted = prevLessonId 
        ? existingProgress[prevLessonId]?.status === LESSON_STATUS.COMPLETED
        : true;
      
      const shouldBeAvailable = index === 0 || isPrevCompleted || existing.status === LESSON_STATUS.COMPLETED;
      
      progressMap[lessonId] = {
        ...existing,
        status: existing.status === LESSON_STATUS.COMPLETED 
          ? LESSON_STATUS.COMPLETED 
          : (shouldBeAvailable ? LESSON_STATUS.AVAILABLE : LESSON_STATUS.LOCKED),
      };
      return;
    }
    
    if (index === 0) {
      progressMap[lessonId] = createLessonProgress(lessonId, LESSON_STATUS.AVAILABLE);
      return;
    }
    
    const prevLessonId = allLessons[index - 1].lesson.id;
    const isPrevCompleted = existingProgress[prevLessonId]?.status === LESSON_STATUS.COMPLETED;
    const status = isPrevCompleted ? LESSON_STATUS.AVAILABLE : LESSON_STATUS.LOCKED;
    progressMap[lessonId] = createLessonProgress(lessonId, status);
  });
  
  return progressMap;
};

export const findFirstIncompleteLessonId = (
  allLessons: LessonWithChapter[], 
  lessonProgress: Record<string, LessonProgress>
): string | undefined => {
  return allLessons.find(item => 
    lessonProgress[item.lesson.id]?.status !== LESSON_STATUS.COMPLETED
  )?.lesson.id;
};

export const calculateCompletionRate = (
  lessonProgress: Record<string, LessonProgress>, 
  totalLessons: number
): number => {
  let totalLectures = 0;
  let completedLectures = 0;
  let totalQuizzes = 0;
  let completedQuizzes = 0;
  
  for (const [lessonId, progress] of Object.entries(lessonProgress)) {
    const isQuiz = lessonId.startsWith(LESSON_PREFIX.TEST);
    const isCompleted = progress.status === LESSON_STATUS.COMPLETED;
    
    if (isQuiz) {
      totalQuizzes++;
      if (isCompleted) completedQuizzes++;
    } else {
      totalLectures++;
      if (isCompleted) completedLectures++;
    }
  }
  
  if (totalLectures === 0 && totalQuizzes === 0) return 0;
  if (totalLectures === 0) return Math.round((completedQuizzes / totalQuizzes) * 100);
  if (totalQuizzes === 0) return Math.round((completedLectures / totalLectures) * 100);
  
  const lecturePercent = (completedLectures / totalLectures) * 50;
  const quizPercent = (completedQuizzes / totalQuizzes) * 50;
  
  return Math.round(lecturePercent + quizPercent);
};

