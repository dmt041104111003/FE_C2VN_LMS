import type { LearningChapter, LearningLesson, Question, Quiz, LessonProgress } from '@/types/learning';
import type { 
  ApiChapter, 
  ApiLecture, 
  ApiTest, 
  ApiQuestion, 
  ApiAnswer,
  CompletedItem,
  CompletedLessonMap,
} from '@/types/learn-page';
import { LEARN_PAGE } from '@/constants/learn-page';

const { ID_PREFIX, DEFAULTS, LESSON_TYPE, STATUS } = LEARN_PAGE;

const createLessonId = (type: 'lecture' | 'test', id: string | number | undefined): string => {
  const prefix = type === 'lecture' ? ID_PREFIX.LECTURE : ID_PREFIX.TEST;
  return `${prefix}${id || ''}`;
};

const mapAnswer = (answer: ApiAnswer, index: number) => ({
  id: String(answer.id ?? index),
  content: String(answer.content || answer.text || ''),
  selected: Boolean(answer.selected),
  correct: Boolean(answer.correct),
});


const extractCorrectAnswerIds = (answers: ApiAnswer[]): string[] => {
  return answers
    .filter(a => Boolean(a.correct))
    .map(a => String(a.id || ''));
};

const mapQuestion = (question: ApiQuestion, index: number): Question => {
  const answers = (question.answers || []) as ApiAnswer[];
  const correctIds = extractCorrectAnswerIds(answers);
  
  
  const isMultipleChoice = correctIds.length > 1;
  
  return {
    id: String(question.id ?? index),
    content: String(question.content || question.question || ''),
    type: isMultipleChoice ? 'multiple' : 'single',
    points: DEFAULTS.POINTS_PER_QUESTION,
    options: answers.map(mapAnswer),
    
    correctAnswer: isMultipleChoice ? correctIds : correctIds[0],
    explanation: String(question.explanation || ''),
  };
};

const mapTestToQuiz = (test: ApiTest): Quiz => ({
  id: String(test.id || ''),
  title: String(test.title || ''),
  description: '',
  passingScore: Number(test.passScore ?? DEFAULTS.PASSING_SCORE),
  timeLimit: Number(test.durationMinutes ?? 0),
  questions: ((test.questions || []) as ApiQuestion[]).map(mapQuestion),
});

const mapLecture = (lecture: ApiLecture, chapterId: string, index: number): LearningLesson => ({
  id: createLessonId('lecture', lecture.id),
  chapterId,
  title: String(lecture.title || ''),
  type: LESSON_TYPE.VIDEO,
  duration: Number(lecture.time || lecture.duration || 0),
  orderIndex: Number(lecture.orderIndex ?? index),
  videoUrl: String(lecture.videoUrl || lecture.resourceUrl || ''),
  content: String(lecture.description || lecture.content || ''),
});

const mapTest = (test: ApiTest, chapterId: string, baseOrder: number, index: number): LearningLesson => ({
  id: createLessonId('test', test.id),
  chapterId,
  title: String(test.title || ''),
  type: LESSON_TYPE.QUIZ,
  duration: Number(test.durationMinutes ?? 0),
  orderIndex: baseOrder + index,
  quiz: mapTestToQuiz(test),
});

export const mapChapter = (chapter: ApiChapter, index: number): LearningChapter => {
  const chapterId = String(chapter.id ?? index);
  const lectures = (chapter.lectures || []) as ApiLecture[];
  const tests = (chapter.tests || []) as ApiTest[];

  const lectureLessons = lectures.map((lec, i) => mapLecture(lec, chapterId, i));
  const testLessons = tests.map((test, i) => mapTest(test, chapterId, lectures.length, i));

  return {
    id: chapterId,
    title: String(chapter.title || ''),
    orderIndex: Number(chapter.orderIndex ?? index),
    lessons: [...lectureLessons, ...testLessons],
  };
};

export const mapFinalTestsChapter = (
  courseTests: ApiTest[], 
  orderIndex: number
): LearningChapter => ({
  id: LEARN_PAGE.FINAL_CHAPTER.ID,
  title: LEARN_PAGE.FINAL_CHAPTER.TITLE,
  orderIndex,
  lessons: courseTests.map((test, i) => mapTest(test, LEARN_PAGE.FINAL_CHAPTER.ID, 0, i)),
});

const getLessonIdFromItem = (item: CompletedItem): string | null => {
  const type = item.type?.toLowerCase();
  const id = item.contentId ?? item.lectureId ?? item.testId;
  
  if (type === 'lecture' && id) return createLessonId('lecture', id);
  if (type === 'test' && id) return createLessonId('test', id);
  if (item.lectureId) return createLessonId('lecture', item.lectureId);
  if (item.testId) return createLessonId('test', item.testId);
  if (item.contentId && !type) return createLessonId('lecture', item.contentId);
  return null;
};

export const buildCompletedLessonMap = (completedItems: CompletedItem[]): CompletedLessonMap => {
  const map = new Map<string, LessonProgress>();
  const now = new Date().toISOString();

  for (const item of completedItems) {
    const lessonId = getLessonIdFromItem(item);
    if (!lessonId) continue;

    const isCompleted = item.completed === true;

    map.set(lessonId, {
      lessonId,
      status: isCompleted ? STATUS.COMPLETED : STATUS.AVAILABLE,
      progress: isCompleted ? DEFAULTS.COMPLETION_PERCENT : 0,
      score: item.score,
      attempts: item.attempts,
      completedAt: isCompleted ? now : undefined,
    });
  }

  return map;
};

export const findFirstIncompleteLessonId = (
  chapters: LearningChapter[], 
  completedMap: CompletedLessonMap
): string => {
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      if (!completedMap.has(lesson.id)) {
        return lesson.id;
      }
    }
  }
  return chapters[0]?.lessons[0]?.id || '';
};

export const calculateCompletionRate = (
  chapters: LearningChapter[],
  progressMap: CompletedLessonMap
): number => {
  let totalLectures = 0;
  let completedLectures = 0;
  let totalQuizzes = 0;
  let completedQuizzes = 0;
  
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      const isQuiz = lesson.type === LESSON_TYPE.QUIZ;
      const isCompleted = progressMap.get(lesson.id)?.status === STATUS.COMPLETED;
      
      if (isQuiz) {
        totalQuizzes++;
        if (isCompleted) completedQuizzes++;
      } else {
        totalLectures++;
        if (isCompleted) completedLectures++;
      }
    }
  }
  
  const lecturePercent = totalLectures > 0 ? (completedLectures / totalLectures) * 50 : 50;
  const quizPercent = totalQuizzes > 0 ? (completedQuizzes / totalQuizzes) * 50 : 50;
  
  if (totalLectures === 0 && totalQuizzes === 0) return 0;
  if (totalLectures === 0) return Math.round((completedQuizzes / totalQuizzes) * 100);
  if (totalQuizzes === 0) return Math.round((completedLectures / totalLectures) * 100);
  
  return Math.round(lecturePercent + quizPercent);
};

export const isCourseCompleted = (
  chapters: LearningChapter[],
  progressMap: CompletedLessonMap
): boolean => {
  for (const chapter of chapters) {
    for (const lesson of chapter.lessons) {
      if (progressMap.get(lesson.id)?.status !== STATUS.COMPLETED) {
        return false;
      }
    }
  }
  return true;
};

export const convertMapToRecord = (map: CompletedLessonMap): Record<string, LessonProgress> => {
  return Object.fromEntries(map);
};
