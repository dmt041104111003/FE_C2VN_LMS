'use client';

import { memo, useMemo, useCallback } from 'react';
import type { QuestionListProps, QuestionDisplayStatus } from '@/types/learning';
import { LEARNING_LABELS, computeQuestionItems } from '@/constants/learning';
import { QUIZ, QUESTION_LIST_STATUS } from '../learning.styles';

const getItemClass = (isCurrent: boolean, status: QuestionDisplayStatus): string => {
  if (isCurrent) return `${QUIZ.QUESTION_LIST_ITEM} ${QUIZ.QUESTION_LIST_CURRENT}`;
  return `${QUIZ.QUESTION_LIST_ITEM} ${QUESTION_LIST_STATUS[status]}`;
};

const isAnsweredStatus = (status: QuestionDisplayStatus): boolean => {
  return status === 'answered' || status === 'correct' || status === 'incorrect';
};

function QuestionListComponent({
  questions,
  currentIndex,
  answers,
  onSelect,
  showResults,
  correctAnswers,
}: QuestionListProps) {
  const items = useMemo(
    () => computeQuestionItems(questions, currentIndex, answers, !!showResults, correctAnswers),
    [questions, currentIndex, answers, showResults, correctAnswers]
  );

  const answeredCount = useMemo(
    () => items.filter(item => isAnsweredStatus(item.status)).length,
    [items]
  );

  const handleClick = useCallback(
    (index: number) => () => onSelect(index),
    [onSelect]
  );

  return (
    <div className={QUIZ.QUESTION_LIST}>
      <div className={QUIZ.QUESTION_LIST_TITLE}>
        {LEARNING_LABELS.quiz.questionList}
      </div>
      
      <div className={QUIZ.QUESTION_LIST_GRID}>
        {items.map(({ index, isCurrent, status }) => {
          const isAnswered = isAnsweredStatus(status);
          
          return (
            <button
              key={index}
              type="button"
              onClick={handleClick(index)}
              className={`${getItemClass(isCurrent, status)} relative`}
              aria-label={`Câu ${index + 1}`}
              aria-current={isCurrent ? 'step' : undefined}
            >
              {index + 1}
              {isCurrent && isAnswered && !showResults && (
                <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-white rounded-full border-2 border-[var(--current)]" />
              )}
            </button>
          );
        })}
      </div>

      {!showResults && (
        <div className={QUIZ.NAV_PROGRESS}>
          <div className={QUIZ.NAV_PROGRESS_TEXT}>
            {answeredCount} / {questions.length} đã trả lời
          </div>
          <div className={QUIZ.NAV_PROGRESS_BAR}>
            <div 
              className={QUIZ.NAV_PROGRESS_FILL} 
              style={{ width: `${(answeredCount / questions.length) * 100}%` }} 
            />
          </div>
        </div>
      )}
    </div>
  );
}

export const QuestionList = memo(QuestionListComponent);
