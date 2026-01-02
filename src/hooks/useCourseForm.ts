import { useCallback } from 'react';
import { updateAtIndex, removeAtIndex, appendItem } from '@/hooks/useListManager';
import { createEmptyChapter, createEmptyQuiz, createEmptyLecture } from '@/constants/course-create';
import type { CourseFormData, Chapter, Lecture, Quiz, SetFormData } from '@/types/course-create';

export function useCourseForm(setFormData: SetFormData) {
  const updateField = useCallback(<K extends keyof CourseFormData>(
    field: K,
    value: CourseFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, [setFormData]);

  const addChapter = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      chapters: appendItem(prev.chapters, createEmptyChapter()),
    }));
  }, [setFormData]);

  const updateChapter = useCallback((index: number, chapter: Chapter) => {
    setFormData(prev => ({
      ...prev,
      chapters: updateAtIndex(prev.chapters, index, chapter),
    }));
  }, [setFormData]);

  const removeChapter = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      chapters: removeAtIndex(prev.chapters, index),
    }));
  }, [setFormData]);

  const addLecture = useCallback((chapterIndex: number) => {
    setFormData(prev => ({
      ...prev,
      chapters: updateAtIndex(
        prev.chapters,
        chapterIndex,
        {
          ...prev.chapters[chapterIndex],
          lectures: appendItem(prev.chapters[chapterIndex].lectures, createEmptyLecture()),
        }
      ),
    }));
  }, [setFormData]);

  const updateLecture = useCallback((chapterIndex: number, lectureIndex: number, lecture: Lecture) => {
    setFormData(prev => ({
      ...prev,
      chapters: updateAtIndex(
        prev.chapters,
        chapterIndex,
        {
          ...prev.chapters[chapterIndex],
          lectures: updateAtIndex(prev.chapters[chapterIndex].lectures, lectureIndex, lecture),
        }
      ),
    }));
  }, [setFormData]);

  const removeLecture = useCallback((chapterIndex: number, lectureIndex: number) => {
    setFormData(prev => ({
      ...prev,
      chapters: updateAtIndex(
        prev.chapters,
        chapterIndex,
        {
          ...prev.chapters[chapterIndex],
          lectures: removeAtIndex(prev.chapters[chapterIndex].lectures, lectureIndex),
        }
      ),
    }));
  }, [setFormData]);

  const addQuiz = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      quizzes: appendItem(prev.quizzes, createEmptyQuiz()),
    }));
  }, [setFormData]);

  const updateQuiz = useCallback((index: number, quiz: Quiz) => {
    setFormData(prev => ({
      ...prev,
      quizzes: updateAtIndex(prev.quizzes, index, quiz),
    }));
  }, [setFormData]);

  const removeQuiz = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      quizzes: removeAtIndex(prev.quizzes, index),
    }));
  }, [setFormData]);

  return {
    updateField,
    chapter: { add: addChapter, update: updateChapter, remove: removeChapter },
    lecture: { add: addLecture, update: updateLecture, remove: removeLecture },
    quiz: { add: addQuiz, update: updateQuiz, remove: removeQuiz },
  };
}
