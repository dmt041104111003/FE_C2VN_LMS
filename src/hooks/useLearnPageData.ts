import { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'next/navigation';
import { getLearningContent, getCourseProgress, checkCourseUpgrade, upgradeCourseSnapshot } from '@/services/course';
import type { LearningChapter, CourseProgress, CourseUpgradeInfo } from '@/types/learning';
import type { ApiChapter, ApiTest, CompletedItem } from '@/types/learn-page';
import { INITIAL_PROGRESS } from '@/constants/learn-page';
import { LESSON_PREFIX } from '@/components/learning/learning.constants';
import {
  mapChapter,
  mapFinalTestsChapter,
  buildCompletedLessonMap,
  findFirstIncompleteLessonId,
  calculateCompletionRate,
  isCourseCompleted,
  convertMapToRecord,
} from '@/utils/learn-page-mapper';

interface UseLearnPageDataParams {
  slug: string | undefined;
  userId: string | undefined;
}

interface UseLearnPageDataReturn {
  courseId: string;
  chapters: LearningChapter[];
  progress: CourseProgress;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  upgradeInfo: CourseUpgradeInfo | null;
  isUpgrading: boolean;
  handleUpgrade: () => Promise<void>;
}

const mapCourseChapters = (apiChapters: ApiChapter[]): LearningChapter[] => {
  return apiChapters.map(mapChapter);
};

const appendFinalTestsIfPresent = (
  chapters: LearningChapter[],
  courseTests: ApiTest[]
): LearningChapter[] => {
  if (courseTests.length === 0) return chapters;
  return [...chapters, mapFinalTestsChapter(courseTests, chapters.length)];
};

const buildCourseProgress = (
  courseId: string,
  chapters: LearningChapter[],
  completedItems: CompletedItem[],
  urlLessonId?: string | null
): CourseProgress => {
  const completedMap = buildCompletedLessonMap(completedItems);
  const completionRate = calculateCompletionRate(chapters, completedMap);
  const isCompleted = isCourseCompleted(chapters, completedMap);
  
  
  let currentLessonId = urlLessonId 
    ? `${LESSON_PREFIX.LECTURE}${urlLessonId}` 
    : findFirstIncompleteLessonId(chapters, completedMap);

  return {
    courseId,
    currentLessonId,
    completionRate,
    isCompleted,
    lastAccessedAt: new Date().toISOString(),
    lessonProgress: convertMapToRecord(completedMap),
  };
};

export function useLearnPageData({ slug, userId }: UseLearnPageDataParams): UseLearnPageDataReturn {
  const searchParams = useSearchParams();
  const urlLessonId = searchParams.get('lessonId');
  
  const [courseId, setCourseId] = useState('');
  const [chapters, setChapters] = useState<LearningChapter[]>([]);
  const [progress, setProgress] = useState<CourseProgress>(INITIAL_PROGRESS);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [upgradeInfo, setUpgradeInfo] = useState<CourseUpgradeInfo | null>(null);
  const [isUpgrading, setIsUpgrading] = useState(false);

  const fetchLearningData = useCallback(async () => {
    if (!slug || !userId) return;

    setIsLoading(true);
    setError(null);

    try {
      const courseResponse = await getLearningContent(slug);
      const id = String(courseResponse.id || '');
      setCourseId(id);

      const apiChapters = (courseResponse.chapters || []) as ApiChapter[];
      const courseTests = (courseResponse.courseTests || []) as ApiTest[];

      const mappedChapters = mapCourseChapters(apiChapters);
      const allChapters = appendFinalTestsIfPresent(mappedChapters, courseTests);
      setChapters(allChapters);

      const progressData = await getCourseProgress(userId, id);
      const completedItems = (progressData?.testAndLectureCompleted || []) as CompletedItem[];
      const courseProgress = buildCourseProgress(id, allChapters, completedItems, urlLessonId);
      setProgress(courseProgress);

      
      const upgrade = await checkCourseUpgrade(id);
      setUpgradeInfo(upgrade);

    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to fetch learning data'));
    } finally {
      setIsLoading(false);
    }
  }, [slug, userId, urlLessonId]);

  const handleUpgrade = useCallback(async () => {
    if (!courseId) return;
    
    setIsUpgrading(true);
    try {
      const result = await upgradeCourseSnapshot(courseId);
      if (result) {
        setUpgradeInfo(result);
        
        await fetchLearningData();
      }
    } catch (err) {
      throw err;
    } finally {
      setIsUpgrading(false);
    }
  }, [courseId, fetchLearningData]);

  useEffect(() => {
    fetchLearningData();
  }, [fetchLearningData]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible' && slug && userId) {
        fetchLearningData();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [fetchLearningData, slug, userId]);

  return { 
    courseId, 
    chapters, 
    progress, 
    isLoading, 
    error, 
    refetch: fetchLearningData,
    upgradeInfo,
    isUpgrading,
    handleUpgrade,
  };
}

