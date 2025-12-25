'use client';

import { memo, useCallback, useMemo } from 'react';
import { LEARNING_LABELS } from '@/constants/learning';
import { CheckIcon } from '@/components/ui/icons';
import type { QuizQuestionProps } from '@/types/learning';
import { QUESTION } from '../learning.styles';

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];

function QuizQuestionComponent({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
  showResult,
  correctAnswerSet,
}: QuizQuestionProps) {
  const isMultiple = question.type === 'multiple';
  const isText = question.type === 'text';

  const selectedSet = useMemo(() => {
    if (isMultiple) return new Set((selectedAnswer as string[]) || []);
    return new Set(selectedAnswer ? [selectedAnswer as string] : []);
  }, [isMultiple, selectedAnswer]);

  const handleOptionClick = useCallback((optionId: string) => {
    if (showResult) return;
    if (isMultiple) {
      const current = (selectedAnswer as string[]) || [];
      const updated = current.includes(optionId)
        ? current.filter(id => id !== optionId)
        : [...current, optionId];
      onAnswer(updated);
    } else {
      onAnswer(optionId);
    }
  }, [isMultiple, selectedAnswer, onAnswer, showResult]);

  const handleTextChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (showResult) return;
    onAnswer(e.target.value);
  }, [onAnswer, showResult]);

  const getOptionClass = (optionId: string) => {
    const selected = selectedSet.has(optionId);
    const correct = correctAnswerSet?.has(optionId) ?? false;
    
    let cls = QUESTION.OPTION;
    if (showResult) {
      cls += ` ${QUESTION.OPTION_DISABLED}`;
      if (correct) cls += ` ${QUESTION.OPTION_CORRECT}`;
      else if (selected) cls += ` ${QUESTION.OPTION_INCORRECT}`;
    } else if (selected) {
      cls += ` ${QUESTION.OPTION_SELECTED}`;
    }
    return cls;
  };

  const getRadioClass = (optionId: string) => {
    const selected = selectedSet.has(optionId);
    const correct = correctAnswerSet?.has(optionId) ?? false;
    
    let cls = QUESTION.RADIO;
    if (showResult) {
      if (correct) cls += ` ${QUESTION.RADIO_CORRECT}`;
      else if (selected) cls += ` ${QUESTION.RADIO_INCORRECT}`;
    } else if (selected) {
      cls += ` ${QUESTION.RADIO_SELECTED}`;
    }
    return cls;
  };

  const getCheckboxClass = (optionId: string) => {
    const selected = selectedSet.has(optionId);
    const correct = correctAnswerSet?.has(optionId) ?? false;
    
    let cls = QUESTION.CHECKBOX;
    if (showResult) {
      if (correct) cls += ` ${QUESTION.CHECKBOX_CORRECT}`;
      else if (selected) cls += ` ${QUESTION.CHECKBOX_INCORRECT}`;
    } else if (selected) {
      cls += ` ${QUESTION.CHECKBOX_SELECTED}`;
    }
    return cls;
  };

  if (isText) {
    return (
      <div className={QUESTION.CONTAINER}>
        <div className={QUESTION.NUMBER}>
          {LEARNING_LABELS.quiz.question} {questionNumber}
        </div>
        <div className={QUESTION.CONTENT}>{question.content}</div>
        <input
          type="text"
          className={QUESTION.TEXT_INPUT}
          placeholder={LEARNING_LABELS.quiz.enterAnswer}
          value={(selectedAnswer as string) || ''}
          onChange={handleTextChange}
          disabled={showResult}
        />
      </div>
    );
  }

  return (
    <div className={QUESTION.CONTAINER}>
      <div className={QUESTION.NUMBER}>
        {LEARNING_LABELS.quiz.question} {questionNumber}
        {isMultiple && (
          <span className="ml-2 text-[var(--text)]/30">
            ({LEARNING_LABELS.quiz.selectMultiple})
          </span>
        )}
      </div>
      <div className={QUESTION.CONTENT}>{question.content}</div>

      <div className={QUESTION.OPTIONS}>
        {question.options?.map((option, idx) => {
          const selected = selectedSet.has(option.id);
          const correct = correctAnswerSet?.has(option.id) ?? false;
          
          return (
            <div
              key={option.id}
              className={getOptionClass(option.id)}
              onClick={() => handleOptionClick(option.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleOptionClick(option.id)}
            >
              <span className={QUESTION.OPTION_LABEL}>
                {OPTION_LABELS[idx]}
              </span>

              {isMultiple ? (
                <div className={getCheckboxClass(option.id)}>
                  {selected && <CheckIcon className={QUESTION.CHECKBOX_CHECK} />}
                </div>
              ) : (
                <div className={getRadioClass(option.id)}>
                  {selected && (
                    <div className={`${QUESTION.RADIO_DOT} ${showResult && correct ? QUESTION.RADIO_DOT_CORRECT : ''} ${showResult && selected && !correct ? QUESTION.RADIO_DOT_INCORRECT : ''}`} />
                  )}
                </div>
              )}

              <span className={QUESTION.OPTION_TEXT}>{option.content}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const QuizQuestion = memo(QuizQuestionComponent);
