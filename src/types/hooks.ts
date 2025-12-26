import type { RefObject } from 'react';
import type { Question, QuizAttempt, QuizState, QuizActions } from './learning';
import type { SelectionInfo } from './editor';
import type { InboxMessage, InboxFilter } from './inbox';

export interface UseFullscreenOptions {
  isActive: boolean;
  onExit?: () => void;
}

export interface UseFullscreenReturn<T extends HTMLElement> {
  ref: RefObject<T>;
  enter: () => Promise<void>;
  exit: () => Promise<void>;
}

export interface UseInfiniteScrollOptions {
  itemsPerPage: number;
  totalItems: number;
}

export interface UseInfiniteScrollResult {
  visibleCount: number;
  isLoading: boolean;
  hasMore: boolean;
  loaderRef: RefObject<HTMLDivElement>;
  resetVisibleCount: () => void;
}

export interface UseMessagesResult {
  messages: InboxMessage[];
  messagesMap: Map<string, InboxMessage>;
  unreadCount: number;
  filteredMessages: InboxMessage[];
  markAsRead: (id: string) => void;
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

export interface UseFormDraftOptions<T> {
  storageKey: string;
  initialData: T;
  isEmpty: (data: T) => boolean;
  enabled?: boolean;
}

export interface UseFormDraftReturn<T> {
  formData: T;
  setFormData: React.Dispatch<React.SetStateAction<T>>;
  hasFormData: boolean;
  clearForm: () => void;
  showResumeDialog: boolean;
  handleContinueEditing: () => void;
  handleCreateNew: () => void;
  resetWithData: (data: T) => void;
  clearDraftStorage: () => void;
}

