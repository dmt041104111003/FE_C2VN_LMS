import { useState, useCallback, useMemo, useEffect } from 'react';
import type { CourseFormData } from '@/types/course-create';
import { INITIAL_COURSE_FORM, COURSE_DRAFT_KEY } from '@/constants/course-create';

const isFormEmpty = (form: CourseFormData): boolean => {
  const hasTitle = form.title.trim() !== '';
  const hasDescription = form.description.trim() !== '';
  const hasPrice = form.price > 0;
  
  const hasChapterContent = form.chapters.some(chapter => 
    chapter.title.trim() !== '' || 
    chapter.lectures.some(lecture => 
      lecture.title.trim() !== '' || 
      lecture.content.trim() !== '' || 
      lecture.videoUrl.trim() !== ''
    )
  );
  
  const hasQuizContent = form.quizzes.some(quiz => 
    quiz.title.trim() !== '' ||
    quiz.questions.some(q => q.question.trim() !== '')
  );

  return !hasTitle && !hasDescription && !hasPrice && !hasChapterContent && !hasQuizContent;
};

const loadDraft = (): CourseFormData | null => {
  if (typeof window === 'undefined') return null;
  try {
    const stored = localStorage.getItem(COURSE_DRAFT_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

const saveDraft = (form: CourseFormData): void => {
  if (typeof window === 'undefined') return;
  if (isFormEmpty(form)) {
    localStorage.removeItem(COURSE_DRAFT_KEY);
    return;
  }
  localStorage.setItem(COURSE_DRAFT_KEY, JSON.stringify(form));
};

const clearDraftStorage = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(COURSE_DRAFT_KEY);
};

export function useCourseDraft() {
  const [formData, setFormData] = useState<CourseFormData>(INITIAL_COURSE_FORM);
  const [showResumeDialog, setShowResumeDialog] = useState(false);
  const [pendingDraft, setPendingDraft] = useState<CourseFormData | null>(null);

  useEffect(() => {
    const draft = loadDraft();
    if (draft && !isFormEmpty(draft)) {
      setPendingDraft(draft);
      setShowResumeDialog(true);
    }
  }, []);

  useEffect(() => {
    if (!showResumeDialog) {
      saveDraft(formData);
    }
  }, [formData, showResumeDialog]);

  const hasFormData = useMemo(() => !isFormEmpty(formData), [formData]);

  const clearForm = useCallback(() => {
    setFormData(INITIAL_COURSE_FORM);
    clearDraftStorage();
  }, []);

  const handleContinueEditing = useCallback(() => {
    if (pendingDraft) {
      setFormData(pendingDraft);
    }
    setPendingDraft(null);
    setShowResumeDialog(false);
  }, [pendingDraft]);

  const handleCreateNew = useCallback(() => {
    setFormData(INITIAL_COURSE_FORM);
    clearDraftStorage();
    setPendingDraft(null);
    setShowResumeDialog(false);
  }, []);

  return {
    formData,
    setFormData,
    hasFormData,
    clearForm,
    showResumeDialog,
    handleContinueEditing,
    handleCreateNew,
  };
}
