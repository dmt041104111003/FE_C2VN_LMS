'use client';

import { memo, useCallback, useMemo } from 'react';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import { QUIZ_LABELS as L } from '@/constants/quiz.constants';
import { updateAtIndex } from '@/hooks/useListManager';
import { EditorCardHeader } from '../course-create/EditorCardHeader';
import { QuizOptionRow } from './QuizOptionRow';
import type { QuestionEditorProps, QuizQuestion } from '@/types/quiz.types';

export const QuizQuestionEditor = memo(function QuizQuestionEditor({
  question, questionIndex, onUpdate, onRemove, disabled
}: QuestionEditorProps) {
  const correctSet = useMemo(() => new Set(question.correctIndexes), [question.correctIndexes]);

  const update = useCallback(<K extends keyof QuizQuestion>(field: K, value: QuizQuestion[K]) => {
    onUpdate(questionIndex, { ...question, [field]: value });
  }, [question, questionIndex, onUpdate]);

  const handleOptionChange = useCallback((i: number, v: string) => {
    onUpdate(questionIndex, { ...question, options: updateAtIndex(question.options, i, v) });
  }, [question, questionIndex, onUpdate]);

  const toggleCorrect = useCallback((i: number, checked: boolean) => {
    const s = new Set(question.correctIndexes);
    checked ? s.add(i) : s.delete(i);
    onUpdate(questionIndex, { ...question, correctIndexes: Array.from(s).sort((a, b) => a - b) });
  }, [question, questionIndex, onUpdate]);

  return (
    <div className={S.QUESTION_CARD}>
      <EditorCardHeader title={`${L.questionPrefix} ${questionIndex + 1}`} onRemove={() => onRemove(questionIndex)} removeTitle={L.removeQuestion} titleClassName={S.CARD_TITLE_SM} disabled={disabled} />
      <div className={S.FORM_GROUP}>
        <label className={S.LABEL_SM}>{L.questionContent}</label>
        <TipTapEditor content={question.question} onChange={v => update('question', v)} placeholder={L.questionPlaceholder} minHeight="80px" disabled={disabled} />
      </div>
      <div className={S.LIST_GAP_SM}>
        <label className={S.LABEL_SM}>{L.optionLabel}</label>
        {question.options.map((o, i) => (
          <QuizOptionRow key={i} optionIndex={i} value={o} isCorrect={correctSet.has(i)} onValueChange={handleOptionChange} onCorrectToggle={toggleCorrect} disabled={disabled} />
        ))}
      </div>
      <div className={S.FORM_GROUP}>
        <label className={S.LABEL_SM}>{L.explanation}</label>
        <TipTapEditor content={question.explanation} onChange={v => update('explanation', v)} placeholder={L.explanationPlaceholder} minHeight="80px" disabled={disabled} />
      </div>
    </div>
  );
});

