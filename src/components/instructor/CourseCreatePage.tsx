'use client';

import { useCallback, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Button, PlusIcon, useToast, Dialog, ChevronLeftIcon, Tabs, TabPanel, StatusBadge, PageLoading, ButtonSpinner } from '@/components/ui';
import { ICON_SM, PAGE } from '@/components/ui/ui.styles';
import { COURSE_DETAIL_STYLES as DS } from '@/constants/course-detail';
import { COURSE_STATUS_LABELS, COURSE_STATUS_VARIANT } from '@/constants/instructor';
import { COURSE_CREATE_LABELS as L, INITIAL_COURSE_FORM, COURSE_DRAFT_KEY, COURSE_EDIT_DRAFT_KEY_PREFIX } from '@/constants/course-create';
import { formatCurrency } from '@/constants/config';
import { useFormDraft, useCourseForm } from '@/hooks';
import { validateCourseForm } from '@/utils/course-validation';
import { isFormEmpty, mapFormToApiRequest, formDataToJson } from '@/utils/course-form';
import type { CourseFormData, CourseCreatePageProps } from '@/types/course-create';
import { InstructorLayout } from './InstructorLayout';
import { CourseBasicInfo, ChapterEditor, ImageUploader, TagSelector, JsonEditor } from './course-create';
import { NavigatorGrid } from './course-detail/NavigatorGrid';
import { QuizEditor } from './quiz-editor';
import { courseService, mapApiToCourseData } from '@/services/course';
import { tagService, type TagResponse } from '@/services/tag';
import { translateError } from '@/constants/auth';

const TABS = [
  { key: 'info', label: 'Thông tin' },
  { key: 'chapters', label: 'Nội dung' },
  { key: 'quizzes', label: 'Kiểm tra' },
  { key: 'json', label: 'JSON' },
];

export function CourseCreatePage({ courseId }: CourseCreatePageProps) {
  const router = useRouter();
  const toast = useToast();
  const isEditMode = Boolean(courseId);
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(isEditMode);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('info');
  const [jsonInput, setJsonInput] = useState('');
  const [originalData, setOriginalData] = useState<CourseFormData>(INITIAL_COURSE_FORM);
  const [tags, setTags] = useState<TagResponse[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [selectedChapter, setSelectedChapter] = useState(0);
  const [selectedQuiz, setSelectedQuiz] = useState(0);

  const storageKey = isEditMode ? `${COURSE_EDIT_DRAFT_KEY_PREFIX}${courseId}` : COURSE_DRAFT_KEY;
  const { formData, setFormData, hasFormData, clearForm, showResumeDialog, handleContinueEditing, handleCreateNew, clearDraftStorage } = useFormDraft({ storageKey, initialData: originalData, isEmpty: isFormEmpty, enabled: !isLoading });
  const { updateField, chapter, lecture, quiz } = useCourseForm(setFormData);

  useEffect(() => {
    if (!courseId) return;
    (async () => {
      setIsLoading(true);
      try {
        const data = await courseService.getCourseById(courseId);
        const courseData = mapApiToCourseData(data as Record<string, unknown>);
        if (courseData) {
          const raw = data as Record<string, unknown>;
          const form: CourseFormData = {
            title: courseData.title, description: courseData.description || '', videoUrl: courseData.videoUrl || '',
            price: courseData.price, status: courseData.status,
            receiverAddress: ((raw.coursePaymentMethods as Array<{ receiverAddress?: string }> | undefined)?.[0]?.receiverAddress || '').replace(/^N\/A$/i, ''),
            discount: raw.discount ? Number(raw.discount) : undefined,
            discountEndTime: raw.discountEndTime ? String(raw.discountEndTime).slice(0, 16) : undefined,
            chapters: courseData.chapters.map(c => ({ ...c, lectures: c.lectures.map(l => ({ ...l, previewFree: l.previewFree ?? false })) })),
            quizzes: courseData.quizzes,
          };
          setOriginalData(form); setFormData(form);
          if (raw.imageUrl) setExistingImageUrl(String(raw.imageUrl));
          if (Array.isArray(raw.courseTags)) setSelectedTagIds((raw.courseTags as { id?: number }[]).map(t => t.id).filter((id): id is number => id !== undefined));
        }
      } catch (e) { toast.error(e instanceof Error ? translateError(e.message) : 'Lỗi'); }
      finally { setIsLoading(false); }
    })();
  }, [courseId, setFormData, toast]);

  useEffect(() => { tagService.getAll().then(setTags).catch(() => {}); }, []);
  useEffect(() => { if (!isLoading && formData) setJsonInput(formDataToJson(formData)); }, [formData, isLoading]);

  const handleSubmit = useCallback(async () => {
    const err = validateCourseForm(formData);
    if (err) return toast.error(err);
    if (!isEditMode && !imageFile) return toast.error('Vui lòng chọn ảnh');
    setIsSubmitting(true);
    try {
      const req = mapFormToApiRequest(formData, selectedTagIds, isEditMode);
      isEditMode && courseId ? await courseService.updateCourse(courseId, req, imageFile || undefined) : await courseService.createCourse(req, imageFile || undefined);
      toast.success(isEditMode ? L.toast.updateSuccess : L.toast.createSuccess);
      clearDraftStorage(); if (!isEditMode) clearForm();
      router.push(isEditMode ? `/instructor/courses/${courseId}` : '/instructor');
    } catch (e) { toast.error(e instanceof Error ? translateError(e.message) : 'Lỗi'); }
    finally { setIsSubmitting(false); }
  }, [formData, router, clearForm, clearDraftStorage, toast, isEditMode, courseId, imageFile, selectedTagIds]);

  const stats = useMemo(() => `${formData.chapters.length} chương · ${formData.chapters.reduce((s, c) => s + c.lectures.length, 0)} bài · ${formData.quizzes.length} quiz`, [formData]);
  const backPath = isEditMode ? `/instructor/courses/${courseId}` : '/instructor';

  if (isLoading) {
    return (
      <InstructorLayout activeId="courses" title={isEditMode ? L.editPageTitle : L.pageTitle}>
        <PageLoading text="Đang tải khóa học..." />
      </InstructorLayout>
    );
  }

  return (
    <InstructorLayout activeId="courses" title={isEditMode ? L.editPageTitle : L.pageTitle}>
      <Dialog isOpen={showResumeDialog} title={isEditMode ? L.editResumeDialog.title : L.resumeDialog.title} message={isEditMode ? L.editResumeDialog.message : L.resumeDialog.message} primaryText={isEditMode ? L.actions.continueEditingEdit : L.actions.continueEditing} secondaryText={isEditMode ? L.actions.restoreOriginal : L.actions.createNew} onPrimary={handleContinueEditing} onSecondary={handleCreateNew} />

      <div className={PAGE.CONTAINER}>
        <div className={DS.header}>
          <Button variant="ghost" size="sm" onClick={() => router.push(backPath)} className="gap-1.5"><ChevronLeftIcon className={ICON_SM} />{L.back}</Button>
          <div className="flex gap-2">
            {hasFormData && <Button variant="ghost" size="sm" onClick={() => { clearDraftStorage(); clearForm(); setSelectedTagIds([]); }} disabled={isSubmitting}>{L.actions.clearForm}</Button>}
            <Button variant="primary" size="sm" onClick={handleSubmit} disabled={isSubmitting || isLoading}>
              {isSubmitting ? <ButtonSpinner size="xs" /> : isEditMode ? L.actions.save : L.actions.create}
            </Button>
          </div>
        </div>

        <div className={DS.infoGrid}>
          <Card label="Tên" value={formData.title || '(Chưa đặt)'} />
          <Card label="Giá" value={formatCurrency(formData.price)} />
          <Card label="Trạng thái"><StatusBadge variant={COURSE_STATUS_VARIANT[formData.status]}>{COURSE_STATUS_LABELS[formData.status]}</StatusBadge></Card>
          <Card label="Nội dung" value={stats} />
        </div>

        <div className="mt-6"><Tabs items={TABS} activeKey={activeTab} onChange={setActiveTab} variant="underline" /></div>

        <TabPanel isActive={activeTab === 'info'}>
          <div className="space-y-6 mt-6">
            <ImageUploader imageFile={imageFile} existingImageUrl={existingImageUrl} onImageChange={setImageFile} required={!isEditMode} disabled={isSubmitting} />
            <CourseBasicInfo {...formData} onTitleChange={v => updateField('title', v)} onPriceChange={v => updateField('price', v)} onDescriptionChange={v => updateField('description', v)} onVideoUrlChange={v => updateField('videoUrl', v)} onStatusChange={v => updateField('status', v)} onReceiverAddressChange={v => updateField('receiverAddress', v)} onDiscountChange={v => updateField('discount', v)} onDiscountEndTimeChange={v => updateField('discountEndTime', v)} disabled={isSubmitting} />
            <TagSelector tags={tags} selectedIds={selectedTagIds} onToggle={id => setSelectedTagIds(p => p.includes(id) ? p.filter(i => i !== id) : [...p, id])} disabled={isSubmitting} />
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'chapters'}>
          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <h3 className={DS.section.title}>Chương ({formData.chapters.length})</h3>
              <Button size="sm" onClick={chapter.add} disabled={isSubmitting}><PlusIcon className={ICON_SM} />Thêm</Button>
            </div>
            {formData.chapters.length === 0 ? <div className={DS.empty}>Chưa có chương</div> : (
              <div className={`${DS.card.base} ${DS.navigator.wrapper}`}>
                <div className={DS.navigator.grid}>
                  <div className={DS.navigator.sidebar}>
                    <NavigatorGrid items={formData.chapters.length} currentIndex={selectedChapter} onSelect={setSelectedChapter} title="Chương" />
                  </div>
                  <div className={DS.navigator.main}>
                    {formData.chapters[selectedChapter] && (
                      <ChapterEditor chapter={formData.chapters[selectedChapter]} chapterIndex={selectedChapter} onUpdate={chapter.update} onRemove={chapter.remove} onAddLecture={lecture.add} onUpdateLecture={lecture.update} onRemoveLecture={lecture.remove} disabled={isSubmitting} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'quizzes'}>
          <div className="mt-6">
            <div className="flex justify-between mb-4">
              <h3 className={DS.section.title}>Quiz ({formData.quizzes.length})</h3>
              <Button size="sm" onClick={quiz.add} disabled={isSubmitting}><PlusIcon className={ICON_SM} />Thêm</Button>
            </div>
            {formData.quizzes.length === 0 ? <div className={DS.empty}>Chưa có quiz</div> : (
              <div className={`${DS.card.base} ${DS.navigator.wrapper}`}>
                <div className={DS.navigator.grid}>
                  <div className={DS.navigator.sidebar}>
                    <NavigatorGrid items={formData.quizzes.length} currentIndex={selectedQuiz} onSelect={setSelectedQuiz} title="Quiz" />
                  </div>
                  <div className={DS.navigator.main}>
                    {formData.quizzes[selectedQuiz] && (
                      <QuizEditor quiz={formData.quizzes[selectedQuiz]} quizIndex={selectedQuiz} chapters={formData.chapters} onUpdate={quiz.update} onRemove={quiz.remove} disabled={isSubmitting} />
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </TabPanel>

        <TabPanel isActive={activeTab === 'json'}>
          <div className="mt-6"><JsonEditor value={jsonInput} onChange={setJsonInput} onParsed={d => { setFormData(d); setActiveTab('info'); }} disabled={isSubmitting} /></div>
        </TabPanel>
      </div>
    </InstructorLayout>
  );
}
const Card = ({ label, value, children }: { label: string; value?: string; children?: React.ReactNode }) => (
  <div className={`${DS.card.base} ${DS.card.padding}`}>
    <p className={DS.infoCard.label}>{label}</p>
    {children || <p className={DS.infoCard.value}>{value}</p>}
  </div>
);

