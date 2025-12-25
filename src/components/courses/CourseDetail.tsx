'use client';

import { useState, useMemo, useCallback, memo } from 'react';
import Link from 'next/link';
import {
  CourseDetailProps,
  Lecture,
  PreviewData,
  ObjectivesSectionProps,
  RequirementsSectionProps,
  LectureItemProps,
  ChapterItemProps,
} from '@/types/course';
import { ReviewSection } from './ReviewSection';
import { COURSE_DETAIL, COURSE_PAGE } from '@/constants/course';
import { ROUTES } from '@/constants/navigation';
import { formatCurrency, formatDuration, formatDate } from '@/constants/config';
import { Rating, PriceDisplay, Tags, VideoModal, User } from '@/components/ui';
import {
  CheckCircleIcon,
  ChevronDownIcon,
  PlayIcon,
  ClockIcon,
  UsersIcon,
  BookIcon,
  CalendarIcon,
} from '@/components/ui/icons';
import * as S from './courses.styles';

const ObjectivesSection = memo(function ObjectivesSection({ objectives }: ObjectivesSectionProps) {
  return (
    <section className={S.COURSE_DETAIL_SECTION}>
      <h2 className={S.COURSE_DETAIL_SECTION_TITLE}>{COURSE_DETAIL.objectivesTitle}</h2>
      <div className={S.COURSE_DETAIL_OBJECTIVES}>
        {objectives.map((objective, i) => (
          <div key={i} className={S.COURSE_DETAIL_OBJECTIVE}>
            <CheckCircleIcon className={S.COURSE_DETAIL_OBJECTIVE_ICON} />
            <span>{objective}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

const RequirementsSection = memo(function RequirementsSection({ requirements }: RequirementsSectionProps) {
  return (
    <section className={S.COURSE_DETAIL_SECTION}>
      <h2 className={S.COURSE_DETAIL_SECTION_TITLE}>{COURSE_DETAIL.requirementsTitle}</h2>
      <div className={S.COURSE_DETAIL_REQUIREMENTS}>
        {requirements.map((req, i) => (
          <div key={i} className={S.COURSE_DETAIL_REQUIREMENT}>
            <div className={S.COURSE_DETAIL_REQUIREMENT_BULLET} />
            <span>{req}</span>
          </div>
        ))}
      </div>
    </section>
  );
});

const LectureItem = memo(function LectureItem({ lecture, onPreview }: LectureItemProps) {
  const handlePreview = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onPreview(lecture.id);
  }, [lecture.id, onPreview]);

  return (
    <div className={S.COURSE_DETAIL_LECTURE}>
      <div className={S.COURSE_DETAIL_LECTURE_TITLE}>
        <PlayIcon className="w-3 h-3" />
        <span>{lecture.title}</span>
        {lecture.isPreview && (
          <button
            className={`${S.COURSE_DETAIL_LECTURE_PREVIEW} cursor-pointer hover:underline`}
            onClick={handlePreview}
          >
            {COURSE_DETAIL.previewText}
          </button>
        )}
      </div>
      <span className={S.COURSE_DETAIL_LECTURE_DURATION}>{formatDuration(lecture.duration)}</span>
    </div>
  );
});

const ChapterItem = memo(function ChapterItem({ chapter, isExpanded, onToggle, onPreview }: ChapterItemProps) {
  const duration = useMemo(
    () => chapter.lectures.reduce((acc, l) => acc + l.duration, 0),
    [chapter.lectures]
  );

  return (
    <div className={S.COURSE_DETAIL_CHAPTER}>
      <button className={S.COURSE_DETAIL_CHAPTER_HEADER} onClick={onToggle}>
        <div>
          <h3 className={S.COURSE_DETAIL_CHAPTER_TITLE}>{chapter.title}</h3>
          <p className={S.COURSE_DETAIL_CHAPTER_META}>
            {chapter.lectures.length} {COURSE_DETAIL.lecturesText} • {formatDuration(duration)}
          </p>
        </div>
        <ChevronDownIcon
          className={`${S.COURSE_DETAIL_CHAPTER_ICON} ${isExpanded ? S.COURSE_DETAIL_CHAPTER_ICON_OPEN : ''}`}
        />
      </button>
      {isExpanded && (
        <div className={S.COURSE_DETAIL_LECTURES}>
          {chapter.lectures.map(lecture => (
            <LectureItem key={lecture.id} lecture={lecture} onPreview={onPreview} />
          ))}
        </div>
      )}
    </div>
  );
});

export const CourseDetail = ({ course, reviews = [], reviewStats, isEnrolled = false, progress = 0 }: CourseDetailProps) => {
  const [expandedChapters, setExpandedChapters] = useState<Set<string>>(new Set());
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const lectureMap = useMemo(() => {
    const map = new Map<string, Lecture & { chapterTitle: string }>();
    course.chapters?.forEach(ch => {
      ch.lectures.forEach(l => map.set(l.id, { ...l, chapterTitle: ch.title }));
    });
    return map;
  }, [course.chapters]);

  const { totalLectures, totalDuration } = useMemo(() => ({
    totalLectures: course.chapters?.reduce((acc, ch) => acc + ch.lectures.length, 0) || 0,
    totalDuration: course.chapters?.reduce(
      (acc, ch) => acc + ch.lectures.reduce((a, l) => a + l.duration, 0), 0
    ) || course.totalDuration || 0,
  }), [course.chapters, course.totalDuration]);

  const discountedPrice = useMemo(
    () => course.discount ? course.price * (1 - course.discount / 100) : course.price,
    [course.price, course.discount]
  );

  const openPreview = useCallback((lectureId: string) => {
    const lecture = lectureMap.get(lectureId);
    if (lecture?.videoUrl) {
      setVideoDuration(null);
      setPreviewData({
        videoUrl: lecture.videoUrl,
        title: lecture.title,
        chapterTitle: lecture.chapterTitle,
      });
    }
  }, [lectureMap]);

  const closePreview = useCallback(() => {
    setPreviewData(null);
    setVideoDuration(null);
  }, []);

  const toggleChapter = useCallback((chapterId: string) => {
    setExpandedChapters(prev => {
      const next = new Set(prev);
      next.has(chapterId) ? next.delete(chapterId) : next.add(chapterId);
      return next;
    });
  }, []);

  const toggleAll = useCallback(() => {
    setExpandedChapters(prev => 
      prev.size === (course.chapters?.length ?? 0)
        ? new Set()
        : new Set(course.chapters?.map(ch => ch.id) ?? [])
    );
  }, [course.chapters]);

  const allExpanded = expandedChapters.size === (course.chapters?.length ?? 0);
  const buttonText = progress === 0 ? COURSE_DETAIL.startButton
    : progress === 100 ? COURSE_DETAIL.completedText
    : COURSE_DETAIL.continueButton;

  return (
    <div className={S.COURSE_DETAIL_PAGE}>
      <div className={S.COURSE_DETAIL_HEADER}>
        <div className={S.COURSE_DETAIL_HEADER_OVERLAY} />
        <div className={`${S.COURSE_DETAIL_HEADER_CONTAINER} relative z-10`}>
          <h1 className={S.COURSE_DETAIL_TITLE}>{course.title}</h1>
          <p className={S.COURSE_DETAIL_SUBTITLE}>{course.description}</p>

          <div className={S.COURSE_DETAIL_META}>
            {course.rating && (
              <div className={S.COURSE_DETAIL_META_ITEM}>
                <Rating value={course.rating} size="sm" showValue showCount={false} />
                {course.reviewCount && <span>({course.reviewCount} đánh giá)</span>}
              </div>
            )}
            <div className={S.COURSE_DETAIL_META_ITEM}>
              <UsersIcon className="w-4 h-4" />
              <span>{course.totalStudents.toLocaleString()} {COURSE_DETAIL.studentsText}</span>
            </div>
            {course.updatedAt && (
              <div className={S.COURSE_DETAIL_META_ITEM}>
                <CalendarIcon className="w-4 h-4" />
                <span>{COURSE_DETAIL.lastUpdatedText}: {formatDate(course.updatedAt)}</span>
              </div>
            )}
          </div>

          {course.tags?.length && <Tags tags={course.tags} max={5} className="mt-4" />}
        </div>
      </div>

      <div className={S.COURSE_DETAIL_BODY}>
        <div className={S.COURSE_DETAIL_GRID}>
          <div className={S.COURSE_DETAIL_MAIN}>
            {course.objectives?.length && <ObjectivesSection objectives={course.objectives} />}
            {course.requirements?.length && <RequirementsSection requirements={course.requirements} />}

            {course.chapters?.length && (
              <section className={S.COURSE_DETAIL_SECTION}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className={`${S.COURSE_DETAIL_SECTION_TITLE} !mb-0`}>{COURSE_DETAIL.chaptersTitle}</h2>
                  <div className="flex items-center gap-4 text-sm">
                    <span className="text-[var(--text)]/50">
                      {course.chapters.length} chương • {totalLectures} {COURSE_DETAIL.lecturesText} • {formatDuration(totalDuration)}
                    </span>
                    <button onClick={toggleAll} className="text-[var(--accent)] hover:underline">
                      {allExpanded ? COURSE_DETAIL.collapseAll : COURSE_DETAIL.expandAll}
                    </button>
                  </div>
                </div>
                <div className={S.COURSE_DETAIL_CHAPTERS}>
                  {course.chapters.map(chapter => (
                    <ChapterItem
                      key={chapter.id}
                      chapter={chapter}
                      isExpanded={expandedChapters.has(chapter.id)}
                      onToggle={() => toggleChapter(chapter.id)}
                      onPreview={openPreview}
                    />
                  ))}
                </div>
              </section>
            )}

            <section className={S.COURSE_DETAIL_SECTION}>
              <h2 className={S.COURSE_DETAIL_SECTION_TITLE}>{COURSE_DETAIL.instructorTitle}</h2>
              <User
                name={course.instructorName}
                avatar={course.instructorAvatar}
                description={course.instructorBio}
                size="lg"
              />
            </section>

            {reviewStats && (
              <ReviewSection
                stats={reviewStats}
                reviews={reviews}
                canReview
                onSubmitReview={(data) => console.log('Submit review:', data)}
                onVote={(id, vote) => console.log('Vote:', id, vote)}
                onReport={(id) => console.log('Report:', id)}
              />
            )}
          </div>

          <div className={S.COURSE_DETAIL_SIDEBAR}>
            <div className={S.COURSE_DETAIL_CARD}>
              <div className={S.COURSE_DETAIL_CARD_IMAGE_WRAPPER}>
                {course.thumbnail ? (
                  <img src={course.thumbnail} alt={course.title} className={S.COURSE_DETAIL_CARD_IMAGE} />
                ) : (
                  <div className={S.COURSE_DETAIL_CARD_IMAGE_PLACEHOLDER}>
                    <img src="/loading.png" alt="" className="w-16 h-16 opacity-30" />
                  </div>
                )}
              </div>
              <div className={S.COURSE_DETAIL_CARD_BODY}>
                <div className={S.COURSE_DETAIL_CARD_PRICE}>
                  {course.price === 0 ? (
                    <span className={S.COURSE_DETAIL_CARD_PRICE_FREE}>{COURSE_PAGE.freeText}</span>
                  ) : (
                    <>
                      <span className={S.COURSE_DETAIL_CARD_PRICE_CURRENT}>
                        {formatCurrency(discountedPrice, course.currency)}
                      </span>
                      {course.discount && (
                        <>
                          <span className={S.COURSE_DETAIL_CARD_PRICE_ORIGINAL}>
                            {formatCurrency(course.price, course.currency)}
                          </span>
                          <span className={S.COURSE_DETAIL_CARD_DISCOUNT}>-{course.discount}%</span>
                        </>
                      )}
                    </>
                  )}
                </div>

                {isEnrolled ? (
                  <>
                    {progress > 0 && progress < 100 && (
                      <div className={S.COURSE_DETAIL_PROGRESS}>
                        <div className={S.COURSE_DETAIL_PROGRESS_HEADER}>
                          <span className={S.COURSE_DETAIL_PROGRESS_LABEL}>{COURSE_DETAIL.progressText}</span>
                          <span className={S.COURSE_DETAIL_PROGRESS_VALUE}>{progress}%</span>
                        </div>
                        <div className={S.COURSE_DETAIL_PROGRESS_BAR}>
                          <div className={S.COURSE_DETAIL_PROGRESS_FILL} style={{ width: `${progress}%` }} />
                        </div>
                      </div>
                    )}
                    <Link href={`${ROUTES.COURSES}/${course.id}/learn`} className={S.COURSE_DETAIL_CARD_BUTTON}>
                      {buttonText}
                    </Link>
                  </>
                ) : (
                  <Link href={`${ROUTES.COURSES}/${course.id}/enroll`} className={S.COURSE_DETAIL_CARD_BUTTON}>
                    {course.price === 0 ? COURSE_DETAIL.enrollFreeButton : COURSE_DETAIL.enrollButton}
                  </Link>
                )}

                <div className={S.COURSE_DETAIL_CARD_FEATURES}>
                  <div className={S.COURSE_DETAIL_CARD_FEATURE}>
                    <BookIcon className={S.COURSE_DETAIL_CARD_FEATURE_ICON} />
                    <span>{totalLectures || course.totalLessons} {COURSE_DETAIL.lessonsText}</span>
                  </div>
                  <div className={S.COURSE_DETAIL_CARD_FEATURE}>
                    <ClockIcon className={S.COURSE_DETAIL_CARD_FEATURE_ICON} />
                    <span>{formatDuration(totalDuration)} {COURSE_DETAIL.totalText.toLowerCase()}</span>
                  </div>
                  <div className={S.COURSE_DETAIL_CARD_FEATURE}>
                    <UsersIcon className={S.COURSE_DETAIL_CARD_FEATURE_ICON} />
                    <span>{course.totalStudents.toLocaleString()} {COURSE_DETAIL.studentsText}</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      {previewData && (
        <VideoModal
          isOpen
          videoUrl={previewData.videoUrl}
          title={previewData.title}
          subtitle={`${previewData.chapterTitle}${videoDuration ? ` • ${videoDuration} phút` : ''}`}
          onClose={closePreview}
          onDurationChange={setVideoDuration}
        />
      )}
    </div>
  );
};
