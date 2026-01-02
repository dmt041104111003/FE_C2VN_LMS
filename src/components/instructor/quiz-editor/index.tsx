'use client';

import { memo, useCallback, useMemo } from 'react';
import { PlusIcon } from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import { QUIZ_LABELS as L, QUIZ_TYPE_OPTIONS, QUIZ_CONFIG, createEmptyQuestion, isChapterRequired } from '@/constants/quiz.constants';
import { updateAtIndex, removeAtIndex, appendItem } from '@/hooks/useListManager';
import { EditorCardHeader } from '../course-create/EditorCardHeader';
import { QuizChapterSelect } from './QuizChapterSelect';
import { QuizPassScoreInput } from './QuizPassScoreInput';
import { QuizQuestionEditor } from './QuizQuestionEditor';
import type { QuizEditorProps, QuizType, QuizQuestion } from '@/types/quiz.types';

export const QuizEditor = memo(function QuizEditor({
  quiz, quizIndex, chapters, onUpdate, onRemove, disabled
}: QuizEditorProps) {
  const showChapter = isChapterRequired(quiz.type);

  const updateField = useCallback(<K extends keyof typeof quiz>(field: K, value: typeof quiz[K]) => {
    onUpdate(quizIndex, { ...quiz, [field]: value });
  }, [quiz, quizIndex, onUpdate]);

  const handleTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as QuizType;
    onUpdate(quizIndex, { ...quiz, type, chapterId: isChapterRequired(type) ? chapters[0]?.id : undefined });
  }, [quiz, quizIndex, chapters, onUpdate]);

  const handleChapterChange = useCallback((id: string) => {
    onUpdate(quizIndex, { ...quiz, chapterId: id });
  }, [quiz, quizIndex, onUpdate]);

  const question = useMemo(() => ({
    add: () => onUpdate(quizIndex, { ...quiz, questions: appendItem(quiz.questions, createEmptyQuestion()) }),
    update: (i: number, q: QuizQuestion) => onUpdate(quizIndex, { ...quiz, questions: updateAtIndex(quiz.questions, i, q) }),
    remove: (i: number) => onUpdate(quizIndex, { ...quiz, questions: removeAtIndex(quiz.questions, i) }),
  }), [quiz, quizIndex, onUpdate]);

  return (
    <div className={S.QUIZ_CARD}>
      <EditorCardHeader title={`${L.prefix} ${quizIndex + 1}`} onRemove={() => onRemove(quizIndex)} removeTitle={L.removeQuiz} disabled={disabled} />
      <div className={S.GRID_3}>
        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{L.quizTitle}</label>
          <input type="text" value={quiz.title} onChange={e => updateField('title', e.target.value)} placeholder={L.quizPlaceholder} className={S.INPUT} disabled={disabled} />
        </div>
        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{L.quizType}</label>
          <select value={quiz.type} onChange={handleTypeChange} className={S.SELECT} disabled={disabled}>
            {QUIZ_TYPE_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
          </select>
        </div>
        <QuizPassScoreInput value={quiz.passScore ?? QUIZ_CONFIG.PASS_SCORE.DEFAULT} onChange={v => updateField('passScore', v)} disabled={disabled} />
      </div>
      {showChapter && <QuizChapterSelect value={quiz.chapterId || ''} chapters={chapters} onChange={handleChapterChange} disabled={disabled} />}
      <div className={S.LIST_GAP_SM}>
        <div className={S.SECTION_HEADER}>
          <span className={S.SECTION_SUBTITLE}>{L.questions}</span>
          <button type="button" onClick={question.add} className={S.ADD_BTN} disabled={disabled}>
            <PlusIcon className={ICON_SM} />{L.addQuestion}
          </button>
        </div>
        {quiz.questions.map((q, i) => (
          <QuizQuestionEditor key={q.id} question={q} questionIndex={i} onUpdate={question.update} onRemove={question.remove} disabled={disabled} />
        ))}
      </div>
    </div>
  );
});

