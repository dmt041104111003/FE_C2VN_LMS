'use client';

import { ReviewSection } from './ReviewSection';
import { VideoModal } from '@/components/ui';
import { useCourseDetail } from '@/hooks/useCourseDetail';
import {
  CourseHeader,
  CourseSidebar,
  ObjectivesSection,
  RequirementsSection,
  ChaptersSection,
  CourseTestsSection,
  InstructorSection,
  IntroVideoSection,
  CourseDetailProps,
} from './course-detail';
import * as S from './courses.styles';

export function CourseDetail({
  course,
  reviews = [],
  reviewStats,
  isEnrolled = false,
  progress = 0,
  canReview = false,
  currentUserId,
  instructorId,
  onSubmitReview,
  onReply,
  onVote,
  onDelete,
  isSubmittingReview = false,
}: CourseDetailProps) {
  const {
    previewData,
    videoDuration,
    stats,
    openPreview,
    closePreview,
    setVideoDuration,
  } = useCourseDetail(course);

  const hasIntroVideo = Boolean(course.videoUrl);
  const hasObjectives = Boolean(course.objectives?.length);
  const hasRequirements = Boolean(course.requirements?.length);
  const hasChapters = Boolean(course.chapters?.length);
  const hasCourseTests = Boolean(course.courseTests?.length);
  const hasReviews = Boolean(reviewStats);

  return (
    <div className={S.COURSE_DETAIL_PAGE}>
      <CourseHeader course={course} />

      <div className={S.COURSE_DETAIL_BODY}>
        <div className={S.COURSE_DETAIL_GRID}>
          <div className={S.COURSE_DETAIL_MAIN}>
            {hasIntroVideo && <IntroVideoSection videoUrl={course.videoUrl!} />}
            {hasObjectives && <ObjectivesSection objectives={course.objectives!} />}
            {hasRequirements && <RequirementsSection requirements={course.requirements!} />}
            {hasChapters && <ChaptersSection chapters={course.chapters!} onPreview={openPreview} />}
            {hasCourseTests && <CourseTestsSection tests={course.courseTests!} />}

            <InstructorSection
              name={course.instructorName}
              avatar={course.instructorAvatar}
              bio={course.instructorBio}
            />

            {hasReviews && (
              <ReviewSection
                stats={reviewStats!}
                reviews={reviews}
                canReview={canReview}
                currentUserId={currentUserId}
                instructorId={instructorId}
                onSubmitReview={onSubmitReview}
                onReply={onReply}
                onVote={onVote}
                onDelete={onDelete}
                isSubmitting={isSubmittingReview}
              />
            )}
          </div>

          <CourseSidebar
            course={course}
            isEnrolled={isEnrolled}
            progress={progress}
            totalLectures={stats.totalLectures}
            totalDuration={stats.totalDuration}
          />
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
}
