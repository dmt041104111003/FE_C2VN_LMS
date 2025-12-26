import type { CourseFormData, Chapter, Quiz, QuizQuestion } from '@/types/course-create';
import { COURSE_CREATE_LABELS } from '@/constants/course-create';

const LABELS = COURSE_CREATE_LABELS.validation;

type ValidationResult = string | null;

const hasEmptyTitle = (item: { title: string }): boolean => !item.title.trim();

const validateBasicInfo = (form: CourseFormData): ValidationResult => {
  if (!form.title.trim()) return LABELS.titleRequired;
  if (form.price < 0 || isNaN(form.price)) return LABELS.priceInvalid;
  return null;
};

const validateChapter = (chapter: Chapter): ValidationResult => {
  if (hasEmptyTitle(chapter)) return LABELS.chapterTitleRequired;
  if (chapter.lectures.length === 0) return LABELS.lectureRequired;
  
  const hasEmptyLectureTitle = chapter.lectures.some(hasEmptyTitle);
  if (hasEmptyLectureTitle) return LABELS.lectureTitleRequired;
  
  return null;
};

const validateChapters = (chapters: Chapter[]): ValidationResult => {
  if (chapters.length === 0) return LABELS.chapterRequired;
  
  for (const chapter of chapters) {
    const error = validateChapter(chapter);
    if (error) return error;
  }
  
  return null;
};

const hasNoCorrectAnswer = (question: QuizQuestion): boolean => 
  question.correctIndexes.length === 0;

const validateQuiz = (quiz: Quiz): ValidationResult => {
  if (quiz.questions.length === 0) return LABELS.quizQuestionRequired;
  
  const hasInvalidQuestion = quiz.questions.some(hasNoCorrectAnswer);
  if (hasInvalidQuestion) return LABELS.quizAnswerRequired;
  
  return null;
};

const validateQuizzes = (quizzes: Quiz[]): ValidationResult => {
  for (const quiz of quizzes) {
    const error = validateQuiz(quiz);
    if (error) return error;
  }
  return null;
};

export const validateCourseForm = (form: CourseFormData): ValidationResult => {
  return (
    validateBasicInfo(form) ||
    validateChapters(form.chapters) ||
    validateQuizzes(form.quizzes)
  );
};

