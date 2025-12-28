'use client';

import { useState, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Button, StatusBadge, ChevronLeftIcon, Dialog, useToast, Tabs, TabPanel } from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { TipTapPreview } from '@/components/editor/TipTapPreview';
import { PAGE } from '@/components/ui/ui.styles';
import { formatCurrency } from '@/constants/config';
import { 
  COURSE_DETAIL_LABELS, 
  COURSE_DETAIL_STYLES, 
  COURSE_DETAIL_TABS,
} from '@/constants/course-detail';
import { COURSE_STATUS_LABELS, COURSE_STATUS_VARIANT } from '@/constants/instructor';
import { ActivityHistory, ChapterCard, QuizCard } from './course-detail';
import type { CourseDetailPageProps, CourseStats, SectionProps, InfoCardProps, EmptyStateProps, HeaderProps, CourseContentProps } from '@/types/course-detail';
import { InstructorLayout } from './InstructorLayout';

const LABELS = COURSE_DETAIL_LABELS;
const S = COURSE_DETAIL_STYLES;

export function CourseDetailPage({ courseId }: CourseDetailPageProps) {
  const router = useRouter();
  const toast = useToast();
  const course = useMemo(() => null, [courseId]);
  const activities = useMemo(() => [], [courseId]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('content');

  const handleBack = useCallback(() => router.push('/instructor'), [router]);
  const handleEdit = useCallback(() => router.push(`/instructor/courses/edit/${courseId}`), [router, courseId]);
  const openDeleteDialog = useCallback(() => setShowDeleteDialog(true), []);
  const closeDeleteDialog = useCallback(() => setShowDeleteDialog(false), []);
  
  const handleConfirmDelete = useCallback(() => {
    toast.success(LABELS.toast.deleteSuccess);
    router.push('/instructor');
  }, [toast, router]);

  const stats = useMemo((): CourseStats | null => {
    if (!course) return null;
    return {
      chapters: course.chapters.length,
      lectures: course.chapters.reduce((sum, ch) => sum + ch.lectures.length, 0),
      quizzes: course.quizzes.length,
      questions: course.quizzes.reduce((sum, q) => sum + q.questions.length, 0),
    };
  }, [course]);

  if (!course) {
    return (
      <InstructorLayout activeId="courses" title={LABELS.title}>
        <div className={PAGE.CONTAINER}>
          <p className="text-center text-[var(--text)]/50">{LABELS.notFound}</p>
        </div>
      </InstructorLayout>
    );
  }

  const statsText = `${stats?.chapters} ${LABELS.fields.chapters} · ${stats?.lectures} ${LABELS.fields.lectures} · ${stats?.quizzes} ${LABELS.fields.quizzes} · ${stats?.questions} ${LABELS.fields.questions}`;

  return (
    <InstructorLayout activeId="courses" title={`${LABELS.title} - ${course.title}`}>
      <Dialog
        isOpen={showDeleteDialog}
        title={LABELS.deleteModal.title}
        message={LABELS.deleteModal.message}
        danger
        onPrimary={handleConfirmDelete}
        onSecondary={closeDeleteDialog}
      />
      <div className={PAGE.CONTAINER}>
        <Header onBack={handleBack} onEdit={handleEdit} onDelete={openDeleteDialog} />

        <Section title={LABELS.sections.info}>
          <div className={S.infoGrid}>
            <InfoCard label={LABELS.fields.title} value={course.title} />
            <InfoCard label={LABELS.fields.price} value={formatCurrency(course.price)} />
            <InfoCard label={LABELS.fields.status}>
              <StatusBadge variant={COURSE_STATUS_VARIANT[course.status]}>
                {COURSE_STATUS_LABELS[course.status]}
              </StatusBadge>
            </InfoCard>
            <InfoCard label={LABELS.stats} value={statsText} />
          </div>
        </Section>

        <div className="mt-6">
          <Tabs 
            items={COURSE_DETAIL_TABS} 
            activeKey={activeTab} 
            onChange={setActiveTab}
            variant="underline"
          />
        </div>

        <TabPanel isActive={activeTab === 'content'}>
          <CourseContent course={course} />
        </TabPanel>

        <TabPanel isActive={activeTab === 'history'}>
          <ActivityHistory activities={activities} />
        </TabPanel>
      </div>
    </InstructorLayout>
  );
}

function Header({ onBack, onEdit, onDelete }: HeaderProps) {
  return (
    <div className={S.header}>
      <Button variant="ghost" size="sm" onClick={onBack} className="gap-1.5">
        <ChevronLeftIcon className={ICON_SM} />
        {LABELS.back}
      </Button>
      <div className="flex gap-2">
        <Button size="sm" onClick={onEdit}>{LABELS.edit}</Button>
        <Button variant="danger" size="sm" onClick={onDelete}>{LABELS.delete}</Button>
      </div>
    </div>
  );
}

function Section({ title, children }: SectionProps) {
  return (
    <div>
      <h3 className={S.section.title}>{title}</h3>
      {children}
    </div>
  );
}

function InfoCard({ label, value, children }: InfoCardProps) {
  return (
    <div className={`${S.card.base} ${S.card.padding}`}>
      <p className={S.infoCard.label}>{label}</p>
      {children || <p className={S.infoCard.value}>{value}</p>}
    </div>
  );
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className={S.empty}>
      <p>{message}</p>
    </div>
  );
}

function CourseContent({ course }: CourseContentProps) {
  return (
    <div className={S.content}>
      <Section title={LABELS.sections.description}>
        {course.description ? (
          <div className={`${S.card.base} ${S.card.paddingXl}`}>
            <TipTapPreview content={course.description} />
          </div>
        ) : (
          <EmptyState message={LABELS.empty.description} />
        )}
      </Section>

      <Section title={LABELS.sections.chapters}>
        {course.chapters.length > 0 ? (
          <div className={S.chapter.container}>
            {course.chapters.map((chapter, idx) => (
              <ChapterCard key={chapter.id} chapter={chapter} index={idx} />
            ))}
          </div>
        ) : (
          <EmptyState message={LABELS.empty.chapters} />
        )}
      </Section>

      <Section title={LABELS.sections.quizzes}>
        {course.quizzes.length > 0 ? (
          <div className={S.quiz.container}>
            {course.quizzes.map((quiz) => (
              <QuizCard key={quiz.id} quiz={quiz} chapters={course.chapters} />
            ))}
          </div>
        ) : (
          <EmptyState message={LABELS.empty.quizzes} />
        )}
      </Section>
    </div>
  );
}
