import type { RefObject } from 'react';
import type { Question, QuizAttempt, QuizState, QuizActions } from './learning';
import type { SelectionInfo } from './editor';

export interface UseFullscreenOptions {
  isActive: boolean;
  onExit?: () => void;
}

export interface UseFullscreenReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
}

export interface QuizComputed {
  currentQuestion: Question;
  totalQuestions: number;
  progress: number;
  isTimeWarning: boolean;
  correctAnswersMap: Map<string, Set<string>>;
}

export interface UseQuizStateReturn {
  state: QuizState;
  actions: QuizActions;
  computed: QuizComputed;
}

export interface LockedRange {
  text: string;
  from: number;
  to: number;
}

export interface UseModalStateReturn {
  isOpen: boolean;
  url: string;
  setUrl: (url: string) => void;
  open: () => void;
  close: () => void;
  submit: () => void;
}

export interface UseTooltipStateReturn {
  isOpen: boolean;
  tooltipText: string;
  setTooltipText: (text: string) => void;
  count: number;
  lockedCount: number;
  selection: SelectionInfo;
  hasTooltip: boolean;
  isDisabled: boolean;
  addTooltip: (content: string) => void;
  removeTooltip: () => void;
  toggle: () => void;
  close: () => void;
}

