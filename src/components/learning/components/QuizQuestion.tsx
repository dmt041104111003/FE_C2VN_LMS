'use client';

import { memo, useCallback, useMemo } from 'react';
import { LEARNING_LABELS } from '@/constants/learning';
import { CheckIcon } from '@/components/ui/icons';
import { TipTapPreview } from '@/components/editor';
import type { QuizQuestionProps } from '@/types/learning';
import { QUESTION } from '../learning.styles';

const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;
const LABELS = LEARNING_LABELS.quiz;

type OptionState = {
  isSelected: boolean;
  isCorrect: boolean;
  isShowingResult: boolean;
};

const getOptionStyles = ({ isSelected, isCorrect, isShowingResult }: OptionState) => {
  const base = QUESTION.OPTION;
  if (!isShowingResult) {
    return isSelected ? `${base} ${QUESTION.OPTION_SELECTED}` : base;
  }
  const disabled = QUESTION.OPTION_DISABLED;
  if (isCorrect) return `${base} ${disabled} ${QUESTION.OPTION_CORRECT}`;
  if (isSelected) return `${base} ${disabled} ${QUESTION.OPTION_INCORRECT}`;
  return `${base} ${disabled}`;
};

const getIndicatorStyles = (type: 'radio' | 'checkbox', { isSelected, isCorrect, isShowingResult }: OptionState) => {
  const styles = type === 'radio' ? QUESTION : QUESTION;
  const BASE = type === 'radio' ? QUESTION.RADIO : QUESTION.CHECKBOX;
  const SELECTED = type === 'radio' ? QUESTION.RADIO_SELECTED : QUESTION.CHECKBOX_SELECTED;
  const CORRECT = type === 'radio' ? QUESTION.RADIO_CORRECT : QUESTION.CHECKBOX_CORRECT;
  const INCORRECT = type === 'radio' ? QUESTION.RADIO_INCORRECT : QUESTION.CHECKBOX_INCORRECT;

  if (!isShowingResult) {
    return isSelected ? `${BASE} ${SELECTED}` : BASE;
  }
  if (isCorrect) return `${BASE} ${CORRECT}`;
  if (isSelected) return `${BASE} ${INCORRECT}`;
  return BASE;
};

const getRadioDotStyles = ({ isSelected, isCorrect, isShowingResult }: OptionState) => {
  if (!isSelected) return '';
  const base = QUESTION.RADIO_DOT;
  if (!isShowingResult) return base;
  if (isCorrect) return `${base} ${QUESTION.RADIO_DOT_CORRECT}`;
  return `${base} ${QUESTION.RADIO_DOT_INCORRECT}`;
};

interface OptionItemProps {
  option: { id: string; content: string };
  label: string;
  isMultiple: boolean;
  state: OptionState;
  onClick: () => void;
}

const OptionItem = memo(function OptionItem({ option, label, isMultiple, state, onClick }: OptionItemProps) {
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  }, [onClick]);

  return (
    <div
      className={getOptionStyles(state)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <span className={QUESTION.OPTION_LABEL}>{label}</span>
      {isMultiple ? (
        <div className={getIndicatorStyles('checkbox', state)}>
          {state.isSelected && <CheckIcon className={QUESTION.CHECKBOX_CHECK} />}
        </div>
      ) : (
        <div className={getIndicatorStyles('radio', state)}>
          {state.isSelected && <div className={getRadioDotStyles(state)} />}
        </div>
      )}
      <span className={QUESTION.OPTION_TEXT}>
        <TipTapPreview content={option.content} compact />
      </span>
    </div>
  );
});

interface QuestionHeaderProps {
  questionNumber: number;
  isMultiple: boolean;
}

const QuestionHeader = memo(function QuestionHeader({ questionNumber, isMultiple }: QuestionHeaderProps) {
  return (
    <div className={QUESTION.NUMBER}>
      {LABELS.question} {questionNumber}
      {isMultiple && (
        <span className="ml-2 text-[var(--text)]/30">({LABELS.selectMultiple})</span>
      )}
    </div>
  );
});

function QuizQuestionComponent({
  question,
  questionNumber,
  selectedAnswer,
  onAnswer,
  showResult = false,
  correctAnswerSet,
}: QuizQuestionProps) {
  const isMultiple = question.type === 'multiple';
  const isText = question.type === 'text';

  const selectedSet = useMemo(() => {
    if (!selectedAnswer) return new Set<string>();
    if (isMultiple) return new Set(selectedAnswer as string[]);
    return new Set([selectedAnswer as string]);
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
    if (!showResult) onAnswer(e.target.value);
  }, [onAnswer, showResult]);

  const getOptionState = useCallback((optionId: string): OptionState => ({
    isSelected: selectedSet.has(optionId),
    isCorrect: correctAnswerSet?.has(optionId) ?? false,
    isShowingResult: !!showResult,
  }), [selectedSet, correctAnswerSet, showResult]);

  if (isText) {
    return (
      <div className={QUESTION.CONTAINER}>
        <QuestionHeader questionNumber={questionNumber} isMultiple={false} />
        <div className={QUESTION.CONTENT}>
          <TipTapPreview content={question.content} compact />
        </div>
        <input
          type="text"
          className={QUESTION.TEXT_INPUT}
          placeholder={LABELS.enterAnswer}
          value={(selectedAnswer as string) || ''}
          onChange={handleTextChange}
          disabled={showResult}
        />
      </div>
    );
  }

  return (
    <div className={QUESTION.CONTAINER}>
      <QuestionHeader questionNumber={questionNumber} isMultiple={isMultiple} />
      <div className={QUESTION.CONTENT}>
        <TipTapPreview content={question.content} compact />
      </div>
      <div className={QUESTION.OPTIONS}>
        {question.options?.map((option, idx) => (
          <OptionItem
            key={option.id}
            option={option}
            label={OPTION_LABELS[idx]}
            isMultiple={isMultiple}
            state={getOptionState(option.id)}
            onClick={() => handleOptionClick(option.id)}
          />
        ))}
      </div>
    </div>
  );
}

export const QuizQuestion = memo(QuizQuestionComponent);
