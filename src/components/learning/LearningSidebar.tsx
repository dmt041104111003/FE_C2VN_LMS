'use client';

import { memo, useMemo, useState } from 'react';
import { Sidebar, ProgressBar, Dialog, Button } from '@/components/ui';
import { LEARNING_LABELS, LESSON_TYPE_ICONS, LESSON_STATUS_ICONS } from '@/constants/learning';
import type { LearningSidebarProps, LessonStatus } from '@/types/learning';
import type { SidebarSection, SidebarItem } from '@/components/ui';
import { PlayIcon } from '@/components/ui/icons';

const DEFAULT_LESSON_ICON = PlayIcon;

function UpgradeButton({ 
  hasNewVersion, 
  onUpgrade, 
  isUpgrading 
}: { 
  hasNewVersion: boolean; 
  onUpgrade: () => void; 
  isUpgrading: boolean;
}) {
  const [showConfirm, setShowConfirm] = useState(false);

  if (!hasNewVersion) return null;

  return (
    <>
      <Button
        variant="primary"
        onClick={() => setShowConfirm(true)}
        className="w-full mt-4"
      >
        Có phiên bản mới
      </Button>

      <Dialog
        isOpen={showConfirm}
        onSecondary={() => setShowConfirm(false)}
        title="Nâng cấp khóa học"
        message="Giảng viên đã cập nhật nội dung khóa học. Bạn có muốn nâng cấp lên phiên bản mới không? Lưu ý: Tiến độ học tập hiện tại sẽ bị đặt lại về 0%."
        primaryText={isUpgrading ? "Đang nâng cấp..." : "Nâng cấp"}
        secondaryText="Để sau"
        danger
        onPrimary={() => {
          onUpgrade();
          setShowConfirm(false);
        }}
      />
    </>
  );
}

function LearningSidebarComponent({ 
  chapters, 
  currentLessonId, 
  progress, 
  onSelectLesson,
  upgradeInfo,
  onUpgrade,
  isUpgrading = false
}: LearningSidebarProps) {
  const { completed, total, progressPercent, sections } = useMemo(() => {
    let completed = 0;
    let total = 0;
    
    const sections: SidebarSection[] = chapters.map(chapter => {
      const hasCurrentLesson = chapter.lessons.some(l => l.id === currentLessonId);
      
      const items: SidebarItem[] = chapter.lessons.map(lesson => {
        total++;
        const status: LessonStatus = progress[lesson.id]?.status || 'locked';
        if (status === 'completed') completed++;
        
        const Icon = LESSON_STATUS_ICONS[status] || LESSON_TYPE_ICONS[lesson.type] || DEFAULT_LESSON_ICON;
        
        return {
          id: lesson.id,
          title: lesson.title,
          meta: `${lesson.duration} phút`,
          icon: Icon,
          disabled: status === 'locked',
        };
      });

      return {
        id: chapter.id,
        title: chapter.title,
        items,
        defaultOpen: hasCurrentLesson,
      };
    });

    const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { completed, total, progressPercent, sections };
  }, [chapters, currentLessonId, progress]);

  return (
    <Sidebar
      sections={sections}
      activeId={currentLessonId}
      onSelect={onSelectLesson}
      backLink={{ href: '/', label: 'Về trang chủ' }}
      header={
        <>
          <div className="text-xs uppercase tracking-[0.2em] text-[var(--text)]/40 mb-4">
            {LEARNING_LABELS.sidebar.title}
          </div>
          <ProgressBar value={completed} max={total} size="xs" />
          <div className="text-xs text-[var(--text)]/30 mt-2">
            {completed}/{total} · {progressPercent}%
          </div>
          
          {upgradeInfo?.hasNewVersion && onUpgrade && (
            <UpgradeButton 
              hasNewVersion={upgradeInfo.hasNewVersion} 
              onUpgrade={onUpgrade}
              isUpgrading={isUpgrading}
            />
          )}
        </>
      }
    />
  );
}

export const LearningSidebar = memo(LearningSidebarComponent);
