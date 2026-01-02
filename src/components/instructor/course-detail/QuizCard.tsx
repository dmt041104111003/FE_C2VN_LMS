'use client';

import { useState, useMemo } from 'react';
import { StatusBadge } from '@/components/ui';
import { TipTapPreview } from '@/components/editor/TipTapPreview';
import { COURSE_DETAIL_LABELS, COURSE_DETAIL_STYLES, OPTION_LABELS, QUIZ_TYPE_VARIANT } from '@/constants/course-detail';
import { NavigatorGrid } from './NavigatorGrid';
import type { QuizCardProps, QuestionItemProps } from '@/types/course-detail';

const LABELS = COURSE_DETAIL_LABELS;
const S = COURSE_DETAIL_STYLES;

export function QuizCard({ quiz, chapters }: QuizCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentQuestion = quiz.questions[currentIndex];
  const hasQuestions = quiz.questions.length > 0;

  const linkedChapterTitle = useMemo(() => {
    if (!quiz.chapterId) return null;
    return chapters.find(c => c.id === quiz.chapterId)?.title;
  }, [quiz.chapterId, chapters]);

  return (
    <div className={`${S.card.base} overflow-hidden`}>
      <div className={S.quiz.header}>
        <div>
          <h4 className={S.quiz.title}>{quiz.title}</h4>
          {linkedChapterTitle && (
            <p className={S.quiz.count}>Thuộc chương: {linkedChapterTitle}</p>
          )}
          <p className="text-xs text-[var(--text)]/60 mt-1">
            Điểm đạt: <span className="font-medium text-[var(--accent)]">{quiz.passScore ?? 0}%</span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={S.quiz.count}>{quiz.questions.length} {LABELS.fields.questions}</span>
          <StatusBadge variant={QUIZ_TYPE_VARIANT[quiz.type]}>
            {LABELS.quizType[quiz.type]}
          </StatusBadge>
        </div>
      </div>
      {hasQuestions ? (
        <div className={S.navigator.wrapper}>
          <div className={S.navigator.grid}>
            <div className={S.navigator.sidebar}>
              <NavigatorGrid
                items={quiz.questions.length}
                currentIndex={currentIndex}
                onSelect={setCurrentIndex}
                title={LABELS.questionList}
              />
            </div>
            <div className={S.navigator.main}>
              {currentQuestion && <QuestionItem question={currentQuestion} index={currentIndex} />}
            </div>
          </div>
        </div>
      ) : (
        <div className={S.navigator.wrapper}>
          <p className="text-sm text-[var(--text)]/50 italic">{LABELS.empty.questions}</p>
        </div>
      )}
    </div>
  );
}

function QuestionItem({ question, index }: QuestionItemProps) {
  return (
    <div className={S.card.item}>
      <div className={S.quiz.questionHeader}>
        <span className={S.quiz.questionIndex}>{index + 1}</span>
        <div className={S.quiz.questionText}>
          {question.question ? (
            <TipTapPreview content={question.question} compact />
          ) : (
            <span className="text-[var(--text)]/50 italic">Chưa có nội dung câu hỏi</span>
          )}
        </div>
      </div>

      <div className={S.quiz.options}>
        {question.options.map((option, oIdx) => {
          const isCorrect = question.correctIndexes.includes(oIdx);
          return (
            <div 
              key={oIdx} 
              className={`${S.quiz.option} ${isCorrect ? 'bg-[var(--correct)]/10 border border-[var(--correct)]/40 rounded-lg -mx-2 px-2' : ''}`}
            >
              <span className={isCorrect ? S.quiz.optionCorrect : S.quiz.optionIndex}>
                {OPTION_LABELS[oIdx]}
              </span>
              <span className={`${S.quiz.optionText} ${isCorrect ? 'font-medium text-[var(--correct)]' : ''}`}>
                {option || <span className="text-[var(--text)]/40 italic">Chưa có nội dung</span>}
              </span>
            </div>
          );
        })}
      </div>

      {question.explanation && (
        <div className={S.quiz.explanation}>
          <p className={S.quiz.explanationLabel}>{LABELS.fields.explanation}</p>
          <div className={S.quiz.explanationText}>
            <TipTapPreview content={question.explanation} compact />
          </div>
        </div>
      )}
    </div>
  );
}

