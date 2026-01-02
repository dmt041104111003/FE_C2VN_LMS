'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button, StatusBadge, ChevronLeftIcon, Dialog, useToast, Tabs, TabPanel, VideoPlayer, ShowMore } from '@/components/ui';
import { ICON_SM, PAGE } from '@/components/ui/ui.styles';
import { TipTapPreview } from '@/components/editor/TipTapPreview';
import { formatCurrency } from '@/constants/config';
import { 
  COURSE_DETAIL_LABELS, 
  COURSE_DETAIL_STYLES, 
  COURSE_DETAIL_TABS,
} from '@/constants/course-detail';
import { COURSE_STATUS_LABELS, COURSE_STATUS_VARIANT } from '@/constants/instructor';
import { ActivityHistory, ChapterCard, QuizCard, CourseQna } from './course-detail';
import type { CourseDetailPageProps, CourseStats, SectionProps, InfoCardProps, EmptyStateProps, HeaderProps, CourseContentProps, CourseActivity, CourseData } from '@/types/course-detail';
import { InstructorLayout } from './InstructorLayout';
import { courseService, mapApiToCourseData, type CourseActivityResponse } from '@/services/course';
import { translateError } from '@/constants/auth';
import { useAuth } from '@/hooks';

const LABELS = COURSE_DETAIL_LABELS;
const S = COURSE_DETAIL_STYLES;

const mapActivityResponse = (data: CourseActivityResponse): CourseActivity => ({
  id: String(data.id),
  type: data.type as CourseActivity['type'],
  description: data.description,
  user: data.userName,
  timestamp: data.timestamp,
});

export function CourseDetailPage({ courseId }: CourseDetailPageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const toast = useToast();
  const { user } = useAuth();
  const [course, setCourse] = useState<CourseData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activities, setActivities] = useState<CourseActivity[]>([]);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [activeTab, setActiveTab] = useState(() => searchParams.get('tab') || 'content');

  useEffect(() => {
    const fetchCourse = async () => {
      setError(null);
      try {
        const data = await courseService.getCourseById(courseId, user?.id);
        const mapped = mapApiToCourseData(data as Record<string, unknown>);
        setCourse(mapped);
      } catch (err) {
        const msg = err instanceof Error ? translateError(err.message) : LABELS.notFound;
        setError(msg);
      }
    };

    if (courseId) {
      fetchCourse();
    }
  }, [courseId, user?.id]);

  useEffect(() => {
    const fetchActivities = async () => {
      if (!course?.id) return;
      try {
        const data = await courseService.getCourseActivities(course.id);
        setActivities(data.map(mapActivityResponse));
      } catch {
        
      }
    };

    fetchActivities();
  }, [course?.id]);

  const handleBack = useCallback(() => router.push('/instructor'), [router]);
  const handleEdit = useCallback(() => router.push(`/instructor/courses/edit/${courseId}`), [router, courseId]);
  const openDeleteDialog = useCallback(() => setShowDeleteDialog(true), []);
  const closeDeleteDialog = useCallback(() => setShowDeleteDialog(false), []);
  
  const handleConfirmDelete = useCallback(async () => {
    try {
      await courseService.deleteCourse(courseId);
      toast.success(LABELS.toast.deleteSuccess);
      router.push('/instructor');
    } catch (err) {
      const msg = err instanceof Error ? translateError(err.message) : 'Xóa khóa học thất bại';
      toast.error(msg);
    }
    closeDeleteDialog();
  }, [courseId, toast, router, closeDeleteDialog]);

  const stats = useMemo((): CourseStats | null => {
    if (!course) return null;
    return {
      chapters: course.chapters.length,
      lectures: course.chapters.reduce((sum, ch) => sum + ch.lectures.length, 0),
      quizzes: course.quizzes.length,
      questions: course.quizzes.reduce((sum, q) => sum + q.questions.length, 0),
    };
  }, [course]);

  if (error || !course) {
    return (
      <InstructorLayout activeId="courses" title={LABELS.title}>
        <div className={PAGE.CONTAINER}>
          <div className="mb-6">
            <Button variant="ghost" size="sm" onClick={handleBack} className="gap-1.5">
              <ChevronLeftIcon className={ICON_SM} />
              {LABELS.back}
            </Button>
          </div>
          <p className="text-center text-[var(--text)]/50">{error || LABELS.notFound}</p>
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
            <InfoCard label={LABELS.fields.price}>
              {course.discount && course.discount > 0 && course.discountEndTime && new Date() < new Date(course.discountEndTime) ? (
                <p>
                  <span className="font-bold text-[var(--accent)]">{formatCurrency(course.price * (1 - course.discount / 100))}</span>
                  <span className="text-sm text-[var(--text)]/50 line-through ml-2">{formatCurrency(course.price)}</span>
                </p>
              ) : (
                <p className="font-bold">{formatCurrency(course.price)}</p>
              )}
            </InfoCard>
            <InfoCard label={LABELS.fields.status}>
              <StatusBadge variant={COURSE_STATUS_VARIANT[course.status]}>
                {COURSE_STATUS_LABELS[course.status]}
              </StatusBadge>
            </InfoCard>
            <InfoCard label={LABELS.stats} value={statsText} />
            {course.price > 0 && course.discount && course.discount > 0 && (
              <InfoCard label="Giảm giá">
                <p className="font-bold">
                  <span className="text-[var(--accent)]">-{course.discount}%</span>
                  {course.discountEndTime ? (
                    new Date() < new Date(course.discountEndTime) ? (
                      <span className="text-xs text-[var(--correct)] ml-2">
                        (đến {new Date(course.discountEndTime).toLocaleString('vi-VN')})
                      </span>
                    ) : (
                      <span className="text-xs text-[var(--incorrect)] ml-2">
                        (đã hết hạn)
                      </span>
                    )
                  ) : (
                    <span className="text-xs text-[var(--incorrect)] ml-2">
                      (chưa đặt thời hạn)
                    </span>
                  )}
                </p>
              </InfoCard>
            )}
            {course.price > 0 && course.coursePaymentMethods?.[0]?.receiverAddress && course.coursePaymentMethods[0].receiverAddress !== 'N/A' && (
              <WalletAddressCard 
                address={course.coursePaymentMethods[0].receiverAddress} 
                onCopy={() => toast.success('Đã sao chép địa chỉ ví')}
              />
            )}
          </div>
          {course.courseTags && course.courseTags.length > 0 && (
            <div className="mt-4">
              <p className="text-sm text-[var(--text)]/70 mb-2">Thẻ:</p>
              <div className="flex flex-wrap gap-2">
                {course.courseTags.map(tag => (
                  <span
                    key={tag.id}
                    className="px-3 py-1 rounded-full text-xs bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20"
                  >
                    {tag.name}
                  </span>
                ))}
              </div>
            </div>
          )}
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

        <TabPanel isActive={activeTab === 'qna'}>
          <CourseQna courseTitle={course.title} chapters={course.chapters} />
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

function WalletAddressCard({ address, onCopy }: { address: string; onCopy: () => void }) {
  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(address);
      onCopy();
    } catch {
      const textarea = document.createElement('textarea');
      textarea.value = address;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      onCopy();
    }
  }, [address, onCopy]);

  return (
    <div 
      className={`${S.card.base} ${S.card.padding} md:col-span-2 cursor-pointer hover:border-[var(--accent)] transition-colors group`}
      onClick={handleCopy}
      title="Click để sao chép"
    >
      <p className={S.infoCard.label}>Địa chỉ ví nhận thanh toán</p>
      <p className={`${S.infoCard.value} font-mono text-sm break-all group-hover:text-[var(--accent)]`}>
        {address}
      </p>
    </div>
  );
}

function CourseContent({ course }: CourseContentProps) {
  return (
    <div className={S.content}>
      {course.videoUrl && (
        <Section title="Video giới thiệu">
          <div className={`${S.card.base} ${S.card.padding}`}>
            <VideoPlayer url={course.videoUrl} />
          </div>
        </Section>
      )}

      <Section title={LABELS.sections.description}>
        {course.description ? (
          <div className={`${S.card.base} ${S.card.padding}`}>
            <TipTapPreview content={course.description} compact />
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
