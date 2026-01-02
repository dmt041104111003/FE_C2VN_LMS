'use client';

import { CourseTest } from '@/types/course';
import { QuizIcon, LockIcon } from '@/components/ui/icons';
import * as S from '../courses.styles';

interface CourseTestsSectionProps {
  tests: CourseTest[];
}

export function CourseTestsSection({ tests }: CourseTestsSectionProps) {
  if (!tests.length) return null;

  return (
    <section className={S.COURSE_DETAIL_SECTION}>
      <h2 className={S.COURSE_DETAIL_SECTION_TITLE}>Bài kiểm tra tổng kết</h2>
      <div className={S.COURSE_DETAIL_CHAPTERS}>
        {tests.map(test => (
          <div key={test.id} className={`${S.COURSE_DETAIL_CHAPTER} !py-3`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <QuizIcon className="w-5 h-5 text-[var(--warning)]" />
                <div>
                  <h3 className="font-medium">{test.title}</h3>
                  <p className="text-sm text-[var(--text)]/50">
                    {test.questionCount} câu hỏi
                    {test.passScore != null && test.passScore > 0 && ` • Điểm đạt: ${test.passScore}%`}
                    {test.durationMinutes != null && test.durationMinutes > 0 && ` • ${test.durationMinutes} phút`}
                  </p>
                </div>
              </div>
              <LockIcon className="w-4 h-4 text-[var(--text)]/40" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

