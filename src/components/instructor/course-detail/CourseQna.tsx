'use client';

import { ShowMore } from '@/components/ui';
import { LectureComments } from '@/components/learning/LectureComments';

interface Chapter {
  id: string;
  title: string;
  lectures: Array<{
    id: string;
    title: string;
  }>;
}

interface CourseQnaProps {
  courseTitle?: string;
  chapters: Chapter[];
}

const LABELS = {
  EMPTY: 'Chưa có bài giảng nào',
  QNA_TITLE: 'Hỏi đáp',
  SHOW_MORE: 'Xem thêm bài giảng',
  SHOW_LESS: 'Thu gọn',
};

export function CourseQna({ courseTitle, chapters = [] }: CourseQnaProps) {
  
  const seen = new Set<string>();
  const lectures = (chapters || []).flatMap((chapter) =>
    chapter.lectures
      .filter((lecture) => {
        if (seen.has(lecture.id)) return false;
        seen.add(lecture.id);
        return true;
      })
      .map((lecture) => ({
        id: lecture.id,
        title: lecture.title,
        chapterTitle: chapter.title,
      }))
  );

  if (lectures.length === 0) {
    return <div className="py-8 text-center text-[var(--text)]/50">{LABELS.EMPTY}</div>;
  }

  return (
    <div className="space-y-6 mt-4">
      {courseTitle && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-[var(--text)]">
            {LABELS.QNA_TITLE} - {courseTitle}
          </h2>
        </div>
      )}

      <ShowMore
        initialCount={10}
        incrementCount={5}
        showText={LABELS.SHOW_MORE}
        hideText={LABELS.SHOW_LESS}
      >
        {lectures.map((lecture) => (
          <div key={lecture.id} className="border border-[var(--border)] rounded-lg overflow-hidden mb-4">
            <div className="bg-[var(--bg-alt)] px-4 py-3 border-b border-[var(--border)]">
              <h3 className="font-medium text-[var(--text)]">{lecture.title}</h3>
              <p className="text-xs text-[var(--text)]/50">{lecture.chapterTitle}</p>
            </div>

            <div className="p-4">
              <LectureComments lectureId={lecture.id} isInstructor />
            </div>
          </div>
        ))}
      </ShowMore>
    </div>
  );
}
