'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button, PlusIcon, useToast, Dialog, ChevronLeftIcon } from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import {
  COURSE_CREATE_LABELS as LABELS,
  COURSE_CREATE_STYLES as S,
  createEmptyChapter,
  createEmptyQuiz,
  createEmptyLecture,
  INITIAL_COURSE_FORM,
  COURSE_DRAFT_KEY,
  COURSE_EDIT_DRAFT_KEY_PREFIX,
} from '@/constants/course-create';
import { updateAtIndex, removeAtIndex, appendItem } from '@/hooks/useListManager';
import { useFormDraft } from '@/hooks';
import { validateCourseForm } from '@/utils/course-validation';
import type { CourseFormData, Chapter, Lecture, Quiz } from '@/types/course-create';
import { InstructorLayout } from './InstructorLayout';
import { CourseBasicInfo, ChapterEditor, QuizEditor } from './course-create';

interface CourseCreatePageProps {
  courseId?: string;
}

const convertCourseToFormData = (courseId: string): CourseFormData | null => {
  return null;
};

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

export function CourseCreatePage({ courseId }: CourseCreatePageProps) {
  const router = useRouter();
  const toast = useToast();
  const isEditMode = Boolean(courseId);

  const originalData = useMemo(() => {
    if (!courseId) return INITIAL_COURSE_FORM;
    return convertCourseToFormData(courseId) || INITIAL_COURSE_FORM;
  }, [courseId]);

  const storageKey = isEditMode 
    ? `${COURSE_EDIT_DRAFT_KEY_PREFIX}${courseId}` 
    : COURSE_DRAFT_KEY;

  const {
    formData,
    setFormData,
    hasFormData,
    clearForm,
    showResumeDialog,
    handleContinueEditing,
    handleCreateNew,
    clearDraftStorage,
  } = useFormDraft({
    storageKey,
    initialData: originalData,
    isEmpty: isFormEmpty,
    enabled: true,
  });

  const updateField = useCallback(<K extends keyof CourseFormData>(
    field: K,
    value: CourseFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, [setFormData]);

  const handleAddChapter = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      chapters: appendItem(prev.chapters, createEmptyChapter()),
    }));
  }, [setFormData]);

  const handleUpdateChapter = useCallback((index: number, chapter: Chapter) => {
    setFormData(prev => ({
      ...prev,
      chapters: updateAtIndex(prev.chapters, index, chapter),
    }));
  }, [setFormData]);

  const handleRemoveChapter = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      chapters: removeAtIndex(prev.chapters, index),
    }));
  }, [setFormData]);

  const handleAddLecture = useCallback((chapterIndex: number) => {
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

  const handleUpdateLecture = useCallback((chapterIndex: number, lectureIndex: number, lecture: Lecture) => {
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

  const handleRemoveLecture = useCallback((chapterIndex: number, lectureIndex: number) => {
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

  const handleAddQuiz = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      quizzes: appendItem(prev.quizzes, createEmptyQuiz()),
    }));
  }, [setFormData]);

  const handleUpdateQuiz = useCallback((index: number, quiz: Quiz) => {
    setFormData(prev => ({
      ...prev,
      quizzes: updateAtIndex(prev.quizzes, index, quiz),
    }));
  }, [setFormData]);

  const handleRemoveQuiz = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      quizzes: removeAtIndex(prev.quizzes, index),
    }));
  }, [setFormData]);

  const handleSubmit = useCallback(() => {
    const error = validateCourseForm(formData);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success(isEditMode ? LABELS.toast.updateSuccess : LABELS.toast.createSuccess);
    clearDraftStorage();
    if (!isEditMode) clearForm();
    const redirectPath = isEditMode ? `/instructor/courses/${courseId}` : '/instructor';
    router.push(redirectPath);
  }, [formData, router, clearForm, clearDraftStorage, toast, isEditMode, courseId]);

  const backPath = isEditMode ? `/instructor/courses/${courseId}` : '/instructor';

  const navigateBack = useCallback(() => {
    router.push(backPath);
  }, [router, backPath]);

  const handleCancel = useCallback(() => {
    clearDraftStorage();
    clearForm();
    router.push(backPath);
  }, [clearDraftStorage, clearForm, router, backPath]);

  const handleClearForm = useCallback(() => {
    clearDraftStorage();
    clearForm();
  }, [clearDraftStorage, clearForm]);

  const pageTitle = isEditMode ? LABELS.editPageTitle : LABELS.pageTitle;
  const submitLabel = isEditMode ? LABELS.actions.save : LABELS.actions.create;

  const dialogConfig = isEditMode
    ? {
        title: LABELS.editResumeDialog.title,
        message: LABELS.editResumeDialog.message,
        primaryText: LABELS.actions.continueEditingEdit,
        secondaryText: LABELS.actions.restoreOriginal,
      }
    : {
        title: LABELS.resumeDialog.title,
        message: LABELS.resumeDialog.message,
        primaryText: LABELS.actions.continueEditing,
        secondaryText: LABELS.actions.createNew,
      };

  return (
    <InstructorLayout activeId="courses" title={pageTitle}>
      <Dialog
        isOpen={showResumeDialog}
        title={dialogConfig.title}
        message={dialogConfig.message}
        primaryText={dialogConfig.primaryText}
        secondaryText={dialogConfig.secondaryText}
        onPrimary={handleContinueEditing}
        onSecondary={handleCreateNew}
      />

      <div className={S.CONTAINER}>
        <div className="mb-6">
          <Button variant="ghost" size="sm" onClick={navigateBack} className="gap-1.5">
            <ChevronLeftIcon className={ICON_SM} />
            {LABELS.back}
          </Button>
        </div>

        <CourseBasicInfo
          title={formData.title}
          price={formData.price}
          description={formData.description}
          status={formData.status}
          onTitleChange={v => updateField('title', v)}
          onPriceChange={v => updateField('price', v)}
          onDescriptionChange={v => updateField('description', v)}
          onStatusChange={v => updateField('status', v)}
        />

        <section className={S.SECTION}>
          <div className={S.SECTION_HEADER_WRAPPER}>
            <h2 className={S.SECTION_TITLE}>{LABELS.chapters.title}</h2>
            <button type="button" onClick={handleAddChapter} className={S.ADD_BTN}>
              <PlusIcon className={ICON_SM} />
              {LABELS.chapters.addChapter}
            </button>
          </div>

          <div className={S.LIST_GAP_LG}>
            {formData.chapters.map((chapter, index) => (
              <ChapterEditor
                key={chapter.id}
                chapter={chapter}
                chapterIndex={index}
                onUpdate={handleUpdateChapter}
                onRemove={handleRemoveChapter}
                onAddLecture={handleAddLecture}
                onUpdateLecture={handleUpdateLecture}
                onRemoveLecture={handleRemoveLecture}
              />
            ))}
          </div>
        </section>

        <section className={S.SECTION}>
          <div className={S.SECTION_HEADER_WRAPPER}>
            <h2 className={S.SECTION_TITLE}>{LABELS.quizzes.title}</h2>
            <button type="button" onClick={handleAddQuiz} className={S.ADD_BTN}>
              <PlusIcon className={ICON_SM} />
              {LABELS.quizzes.addQuiz}
            </button>
          </div>

          <div className={S.LIST_GAP_LG}>
            {formData.quizzes.length === 0 ? (
              <p className={S.EMPTY_STATE}>{LABELS.quizzes.noQuizMessage}</p>
            ) : (
              formData.quizzes.map((quiz, index) => (
                <QuizEditor
                  key={quiz.id}
                  quiz={quiz}
                  quizIndex={index}
                  chapters={formData.chapters}
                  onUpdate={handleUpdateQuiz}
                  onRemove={handleRemoveQuiz}
                />
              ))
            )}
          </div>
        </section>

        <div className={S.ACTIONS}>
          {hasFormData && (
            <Button variant="ghost" onClick={handleClearForm} className="mr-auto text-[var(--incorrect)]">
              {LABELS.actions.clearForm}
            </Button>
          )}
          <Button variant="ghost" onClick={handleCancel}>
            {LABELS.actions.cancel}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {submitLabel}
          </Button>
        </div>
      </div>
    </InstructorLayout>
  );
}
