'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import { 
  COURSE_DETAIL_LABELS, 
  COURSE_DETAIL_STYLES,
  ACTIVITY_TYPE_LABELS,
  ACTIVITY_ITEMS_PER_PAGE,
  PERIOD_FILTER_OPTIONS,
} from '@/constants/course-detail';
import { FILTER_COL, FILTER_LABEL, FILTER_SELECT } from '@/components/ui/ui.styles';
import type { CourseActivity, ActivityPeriod, ActivityItemProps, ActivityHistoryProps } from '@/types/course-detail';

const LABELS = COURSE_DETAIL_LABELS;
const S = COURSE_DETAIL_STYLES;

const filterByPeriod = (activities: CourseActivity[], period: ActivityPeriod): CourseActivity[] => {
  if (period === 'all') return activities;
  
  const now = new Date();
  const startDate = new Date();
  
  switch (period) {
    case 'week':
      startDate.setDate(now.getDate() - 7);
      break;
    case 'month':
      startDate.setMonth(now.getMonth() - 1);
      break;
    case 'quarter':
      startDate.setMonth(now.getMonth() - 3);
      break;
    case 'year':
      startDate.setFullYear(now.getFullYear() - 1);
      break;
  }
  
  return activities.filter(a => new Date(a.timestamp) >= startDate);
};

const groupByDate = (activities: CourseActivity[]): Map<string, CourseActivity[]> => {
  const groups = new Map<string, CourseActivity[]>();
  
  activities.forEach(activity => {
    const date = new Date(activity.timestamp).toLocaleDateString('vi-VN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    
    const existing = groups.get(date) || [];
    groups.set(date, [...existing, activity]);
  });
  
  return groups;
};

const formatTime = (timestamp: string): string => {
  return new Date(timestamp).toLocaleTimeString('vi-VN', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export function ActivityHistory({ activities }: ActivityHistoryProps) {
  const [period, setPeriod] = useState<ActivityPeriod>('all');
  const [visibleCount, setVisibleCount] = useState(ACTIVITY_ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const filteredActivities = useMemo(
    () => filterByPeriod(activities, period),
    [activities, period]
  );

  const visibleActivities = useMemo(
    () => filteredActivities.slice(0, visibleCount),
    [filteredActivities, visibleCount]
  );

  const groupedActivities = useMemo(
    () => groupByDate(visibleActivities),
    [visibleActivities]
  );

  const hasMore = visibleCount < filteredActivities.length;

  useEffect(() => {
    setVisibleCount(ACTIVITY_ITEMS_PER_PAGE);
  }, [period]);

  useEffect(() => {
    const loader = loaderRef.current;
    if (!loader || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoading) {
          setIsLoading(true);
          setTimeout(() => {
            setVisibleCount(prev => prev + ACTIVITY_ITEMS_PER_PAGE);
            setIsLoading(false);
          }, 300);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loader);
    return () => observer.disconnect();
  }, [hasMore, isLoading]);

  if (activities.length === 0) {
    return (
      <div className={S.empty}>
        <p>{LABELS.activity.empty}</p>
      </div>
    );
  }

  return (
    <div className={S.activity.container}>
      <div className={FILTER_COL}>
        <label className={FILTER_LABEL}>{LABELS.periodFilter}</label>
        <select
          value={period}
          onChange={e => setPeriod(e.target.value as ActivityPeriod)}
          className={FILTER_SELECT}
        >
          {PERIOD_FILTER_OPTIONS.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      {filteredActivities.length === 0 ? (
        <div className={S.empty}>
          <p>{LABELS.activity.empty}</p>
        </div>
      ) : (
        <>
          {Array.from(groupedActivities.entries()).map(([date, items]) => (
            <div key={date} className={S.activity.group}>
              <div className={S.activity.groupDate}>{date}</div>
              <div className={S.activity.list}>
                {items.map(activity => (
                  <ActivityItem key={activity.id} activity={activity} />
                ))}
              </div>
            </div>
          ))}

          {hasMore && (
            <div ref={loaderRef} className={S.activity.loader}>
              {isLoading && (
                <div className="animate-spin w-5 h-5 border-2 border-[var(--accent)] border-t-transparent rounded-full" />
              )}
            </div>
          )}

          {!hasMore && filteredActivities.length > ACTIVITY_ITEMS_PER_PAGE && (
            <p className={S.activity.loadMore}>{LABELS.activity.noMore}</p>
          )}
        </>
      )}
    </div>
  );
}

function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className={S.activity.item}>
      <div className={S.activity.content}>
        <p className={S.activity.description}>
          <strong>{ACTIVITY_TYPE_LABELS[activity.type]}</strong> · {activity.description}
        </p>
        <p className={S.activity.meta}>{LABELS.activity.by} {activity.user}</p>
      </div>
      <span className={S.activity.time}>{formatTime(activity.timestamp)}</span>
    </div>
  );
}

