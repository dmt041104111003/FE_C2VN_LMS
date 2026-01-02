import { useCallback, useMemo, useEffect, useRef, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { saveProgress } from '@/services/course';
import type { 
  LearningPageProps, 
  LessonProgress, 
  ProgressState,
  LessonWithChapter,
  UseLectureProgressParams,
  UseCompleteLessonParams,
} from '@/types/learning';
import {
  flattenChaptersToLessons,
  initializeLessonProgress,
  findFirstIncompleteLessonId,
  calculateCompletionRate,
  parseLessonId,
  createLessonProgress,
} from '@/components/learning/learning.utils';
import { LESSON_STATUS, LESSON_TYPE } from '@/components/learning/learning.constants';

export const useProgressState = (
  allLessons: LessonWithChapter[],
  initialProgress: LearningPageProps['progress']
) => {
  return useState<ProgressState>(() => {
    const lessonProgress = initializeLessonProgress(allLessons, initialProgress.lessonProgress);
    
    
    const urlLessonExists = initialProgress.currentLessonId && 
      allLessons.some(l => l.lesson.id === initialProgress.currentLessonId);
    
    
    const currentLessonId = urlLessonExists
      ? initialProgress.currentLessonId
      : findFirstIncompleteLessonId(allLessons, lessonProgress) || allLessons[0]?.lesson.id || '';

    return { ...initialProgress, currentLessonId, lessonProgress };
  });
};

export const useLessonNavigation = (
  allLessons: LessonWithChapter[],
  progress: ProgressState,
  setProgress: Dispatch<SetStateAction<ProgressState>>
) => {
  const currentLessonIndex = useMemo(
    () => allLessons.findIndex(l => l.lesson.id === progress.currentLessonId),
    [allLessons, progress.currentLessonId]
  );

  const handleSelectLesson = useCallback((lessonId: string) => {
    if (progress.lessonProgress[lessonId]?.status === LESSON_STATUS.LOCKED) return;
    setProgress(prev => ({ ...prev, currentLessonId: lessonId }));
  }, [progress.lessonProgress, setProgress]);

  const handlePrev = useCallback(() => {
    if (currentLessonIndex > 0) {
      handleSelectLesson(allLessons[currentLessonIndex - 1].lesson.id);
    }
  }, [currentLessonIndex, allLessons, handleSelectLesson]);

  const handleNext = useCallback(() => {
    const nextIndex = currentLessonIndex + 1;
    if (nextIndex < allLessons.length) {
      const nextLessonId = allLessons[nextIndex].lesson.id;
      if (progress.lessonProgress[nextLessonId]?.status !== LESSON_STATUS.LOCKED) {
        handleSelectLesson(nextLessonId);
      }
    }
  }, [currentLessonIndex, allLessons, progress.lessonProgress, handleSelectLesson]);

  const hasPrev = currentLessonIndex > 0;
  const nextLesson = allLessons[currentLessonIndex + 1];
  const hasNext = !!nextLesson && progress.lessonProgress[nextLesson.lesson.id]?.status !== LESSON_STATUS.LOCKED;

  return { currentLessonIndex, handleSelectLesson, handlePrev, handleNext, hasPrev, hasNext };
};

export const useLectureProgress = ({
  userId,
  courseId,
  currentLesson,
  isCompleted,
  isLocked,
  allLessons,
  setProgress,
}: UseLectureProgressParams) => {
  const hasMarkedRef = useRef<string | null>(null);

  const updateLessonProgress = useCallback((lessonId: string, updates: Partial<LessonProgress>) => {
    setProgress(prev => {
      const currentProgress = prev.lessonProgress[lessonId] || createLessonProgress(lessonId, LESSON_STATUS.AVAILABLE);
      const updatedProgress = { ...currentProgress, ...updates };
      
      const newLessonProgress = {
        ...prev.lessonProgress,
        [lessonId]: updatedProgress,
      };

      if (updatedProgress.status === LESSON_STATUS.COMPLETED) {
        const nextLessonId = allLessons[allLessons.findIndex(l => l.lesson.id === lessonId) + 1]?.lesson.id;
        if (nextLessonId && prev.lessonProgress[nextLessonId]?.status === LESSON_STATUS.LOCKED) {
          newLessonProgress[nextLessonId] = createLessonProgress(nextLessonId, LESSON_STATUS.AVAILABLE);
        }
      }

      return {
        ...prev,
        lessonProgress: newLessonProgress,
        completionRate: calculateCompletionRate(newLessonProgress, allLessons.length),
      };
    });
  }, [allLessons, setProgress]);

  useEffect(() => {
    if (!currentLesson || isCompleted || isLocked) return;
    if (hasMarkedRef.current === currentLesson.id) return;

    const { isLecture, numericId } = parseLessonId(currentLesson.id);
    if (!isLecture) return;

    hasMarkedRef.current = currentLesson.id;

    const markLectureComplete = async () => {
      try {
        await saveProgress(userId, courseId, {
          type: 'LECTURE',
          lectureId: numericId,
        });
        
        updateLessonProgress(currentLesson.id, { status: LESSON_STATUS.COMPLETED });
      } catch {
        hasMarkedRef.current = null;
      }
    };

    markLectureComplete();
  }, [currentLesson?.id, isCompleted, isLocked, userId, courseId, updateLessonProgress]);

  return { updateLessonProgress };
};

export const useCompleteLesson = ({
  userId,
  courseId,
  currentLesson,
  currentLessonIndex,
  allLessons,
  setProgress,
}: UseCompleteLessonParams) => {
  const handleCompleteLesson = useCallback(async (score?: number) => {
    if (!currentLesson) return;
    
    const { isLecture, numericId } = parseLessonId(currentLesson.id);
    const nextLessonId = allLessons[currentLessonIndex + 1]?.lesson.id;

    if (isLecture) return;

    try {
      await saveProgress(userId, courseId, {
        type: 'TEST',
        testId: numericId,
        score,
      });
    } catch {
      return;
    }

    setProgress(prev => {
      const updatedProgress = {
        ...prev.lessonProgress,
        [currentLesson.id]: createLessonProgress(
          currentLesson.id, 
          LESSON_STATUS.COMPLETED, 
          100, 
          new Date().toISOString()
        ),
      };

      if (nextLessonId && prev.lessonProgress[nextLessonId]?.status === LESSON_STATUS.LOCKED) {
        updatedProgress[nextLessonId] = createLessonProgress(nextLessonId, LESSON_STATUS.AVAILABLE);
      }

      return {
        ...prev,
        lessonProgress: updatedProgress,
        completionRate: calculateCompletionRate(updatedProgress, allLessons.length),
      };
    });
  }, [currentLesson, allLessons, currentLessonIndex, userId, courseId, setProgress]);

  return handleCompleteLesson;
};

export { flattenChaptersToLessons };
