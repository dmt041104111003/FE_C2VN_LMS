import { useState, useMemo, useCallback } from 'react';
import { Course } from '@/types/course';
import {
  PreviewData,
  LectureWithChapter,
  CourseStats,
  UseCourseDetailReturn,
} from '@/components/courses/course-detail/types';

export function useCourseDetail(course: Course): UseCourseDetailReturn {
  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [videoDuration, setVideoDuration] = useState<number | null>(null);

  const lectureMap = useMemo(() => {
    const map = new Map<string, LectureWithChapter>();
    
    course.chapters?.forEach((chapter) => {
      chapter.lectures.forEach((lecture) => {
        map.set(lecture.id, {
          ...lecture,
          chapterTitle: chapter.title,
        });
      });
    });
    
    return map;
  }, [course.chapters]);

  const stats = useMemo<CourseStats>(() => {
    if (!course.chapters?.length) {
      return {
        totalLectures: 0,
        totalDuration: course.totalDuration || 0,
      };
    }

    let totalLectures = 0;
    let totalDuration = 0;

    for (const chapter of course.chapters) {
      totalLectures += chapter.lectures.length;
      for (const lecture of chapter.lectures) {
        totalDuration += lecture.duration;
      }
    }

    return { totalLectures, totalDuration };
  }, [course.chapters, course.totalDuration]);

  const openPreview = useCallback((lectureId: string) => {
    const lecture = lectureMap.get(lectureId);
    
    if (!lecture?.videoUrl) return;
    
    setVideoDuration(null);
    setPreviewData({
      videoUrl: lecture.videoUrl,
      title: lecture.title,
      chapterTitle: lecture.chapterTitle,
    });
  }, [lectureMap]);

  const closePreview = useCallback(() => {
    setPreviewData(null);
    setVideoDuration(null);
  }, []);

  return {
    previewData,
    videoDuration,
    lectureMap,
    stats,
    openPreview,
    closePreview,
    setVideoDuration,
  };
}
