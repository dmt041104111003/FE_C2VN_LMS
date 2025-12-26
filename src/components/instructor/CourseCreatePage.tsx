'use client';

import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button, PlusIcon, useToast, Dialog } from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import {
  COURSE_CREATE_LABELS as LABELS,
  COURSE_CREATE_STYLES as S,
  createEmptyChapter,
  createEmptyQuiz,
  createEmptyLecture,
} from '@/constants/course-create';
import { updateAtIndex, removeAtIndex, appendItem } from '@/hooks/useListManager';
import { useCourseDraft } from '@/hooks/useCourseDraft';
import { validateCourseForm } from '@/utils/course-validation';
import type { CourseFormData, Chapter, Lecture, Quiz } from '@/types/course-create';
import { InstructorLayout } from './InstructorLayout';
import { CourseBasicInfo, ChapterEditor, QuizEditor } from './course-create';

export function CourseCreatePage() {
  const router = useRouter();
  const toast = useToast();
  const {
    formData,
    setFormData,
    hasFormData,
    clearForm,
    showResumeDialog,
    handleContinueEditing,
    handleCreateNew,
  } = useCourseDraft();

  const updateField = useCallback(<K extends keyof CourseFormData>(
    field: K,
    value: CourseFormData[K]
  ) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleAddChapter = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      chapters: appendItem(prev.chapters, createEmptyChapter()),
    }));
  }, []);

  const handleUpdateChapter = useCallback((index: number, chapter: Chapter) => {
    setFormData(prev => ({
      ...prev,
      chapters: updateAtIndex(prev.chapters, index, chapter),
    }));
  }, []);

  const handleRemoveChapter = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      chapters: removeAtIndex(prev.chapters, index),
    }));
  }, []);

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
  }, []);

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
  }, []);

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
  }, []);

  const handleAddQuiz = useCallback(() => {
    setFormData(prev => ({
      ...prev,
      quizzes: appendItem(prev.quizzes, createEmptyQuiz()),
    }));
  }, []);

  const handleUpdateQuiz = useCallback((index: number, quiz: Quiz) => {
    setFormData(prev => ({
      ...prev,
      quizzes: updateAtIndex(prev.quizzes, index, quiz),
    }));
  }, []);

  const handleRemoveQuiz = useCallback((index: number) => {
    setFormData(prev => ({
      ...prev,
      quizzes: removeAtIndex(prev.quizzes, index),
    }));
  }, []);

  const handleSubmit = useCallback(() => {
    const error = validateCourseForm(formData);
    if (error) {
      toast.error(error);
      return;
    }
    toast.success('Tạo khóa học thành công!');
    clearForm();
    router.push('/instructor');
  }, [formData, router, clearForm, toast]);

  const navigateBack = useCallback(() => {
    router.push('/instructor');
  }, [router]);

  return (
    <InstructorLayout activeId="courses" title={LABELS.pageTitle}>
      <Dialog
        isOpen={showResumeDialog}
        title={LABELS.resumeDialog.title}
        message={LABELS.resumeDialog.message}
        primaryText={LABELS.actions.continueEditing}
        secondaryText={LABELS.actions.createNew}
        onPrimary={handleContinueEditing}
        onSecondary={handleCreateNew}
      />

      <div className={S.CONTAINER}>
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
            <Button variant="ghost" onClick={clearForm} className="mr-auto text-[var(--incorrect)]">
              {LABELS.actions.clearForm}
            </Button>
          )}
          <Button variant="ghost" onClick={navigateBack}>
            {LABELS.actions.cancel}
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            {LABELS.actions.create}
          </Button>
        </div>
      </div>
    </InstructorLayout>
  );
}

