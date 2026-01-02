export { useFullscreen } from './useFullscreen';
export { useQuizState } from './useQuizState';
export { useModalState, useSelection, useTooltipState } from './useTooltip';
export { useFormDraft } from './useFormDraft';
export { useInfiniteScroll } from './useInfiniteScroll';
export { useAuth } from './useAuth';
export { useCourseForm } from './useCourseForm';
export { useEnrollment } from './useEnrollment';
export { useLearnPageData } from './useLearnPageData';
export { useCamera } from './useCamera';
export { 
  useProgressState, 
  useLessonNavigation, 
  useLectureProgress, 
  useCompleteLesson,
  flattenChaptersToLessons,
} from './useLearningProgress';

export type {
  UseFullscreenOptions,
  UseFullscreenReturn,
  UseQuizStateReturn,
  QuizComputed,
  LockedRange,
  UseModalStateReturn,
  UseTooltipStateReturn,
  UseFormDraftOptions,
  UseFormDraftReturn,
  UseInfiniteScrollOptions,
  UseInfiniteScrollResult,
} from '@/types/hooks';

