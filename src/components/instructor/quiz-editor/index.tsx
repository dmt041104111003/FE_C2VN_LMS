'use client';

import { memo, useCallback, useMemo, useState } from 'react';
import { PlusIcon, Tabs, Button, useToast } from '@/components/ui';
import { ICON_SM } from '@/components/ui/ui.styles';
import { COURSE_CREATE_STYLES as S } from '@/constants/course-create';
import { QUIZ_LABELS as L, QUIZ_TYPE_OPTIONS, QUIZ_CONFIG, QUIZ_SOURCE_TABS, createEmptyQuestion, isChapterRequired } from '@/constants/quiz.constants';
import { updateAtIndex, removeAtIndex, appendItem } from '@/hooks/useListManager';
import { EditorCardHeader } from '../course-create/EditorCardHeader';
import { QuizChapterSelect } from './QuizChapterSelect';
import { QuizPassScoreInput } from './QuizPassScoreInput';
import { QuizTimeLimitInput } from './QuizTimeLimitInput';
import { QuizQuestionEditor } from './QuizQuestionEditor';
import type { QuizEditorProps, QuizType, QuizQuestion, QuizSourceType } from '@/types/quiz.types';

interface ExternalQuestion {
  id: number;
  question: string;
  answers: { A: string; B: string; C: string; D: string };
  correct: string;
  explanation: string;
}

const transformExternalToQuizQuestions = (data: ExternalQuestion[]): QuizQuestion[] =>
  data.map((q, idx) => {
    const options = [q.answers.A, q.answers.B, q.answers.C, q.answers.D];
    const correctIndex = ['A', 'B', 'C', 'D'].indexOf(q.correct);
    return {
      id: `q-${Date.now()}-${idx}`,
      question: q.question,
      options,
      correctIndexes: correctIndex >= 0 ? [correctIndex] : [],
      explanation: q.explanation || '',
    };
  });

interface ImportUrlInputProps {
  onImport: (questions: QuizQuestion[]) => void;
  disabled?: boolean;
}

const ImportUrlInput = memo(function ImportUrlInput({ onImport, disabled }: ImportUrlInputProps) {
  const toast = useToast();
  const [apiUrl, setApiUrl] = useState('');
  const [fromQuestion, setFromQuestion] = useState(1);
  const [toQuestion, setToQuestion] = useState(10);
  const [loading, setLoading] = useState(false);

  const handleImport = useCallback(async () => {
    if (!apiUrl.trim()) {
      toast.error('Vui lòng nhập URL');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`${apiUrl}?from=${fromQuestion}&to=${toQuestion}`);
      if (!res.ok) throw new Error('Fetch failed');
      const data: ExternalQuestion[] = await res.json();
      
      if (!Array.isArray(data) || data.length === 0) {
        toast.error('Không tìm thấy câu hỏi nào');
        return;
      }

      const questions = transformExternalToQuizQuestions(data);
      onImport(questions);
      toast.success(`Đã nhập ${questions.length} câu hỏi`);
      setApiUrl('');
    } catch {
      toast.error('Không thể tải câu hỏi từ URL');
    } finally {
      setLoading(false);
    }
  }, [apiUrl, fromQuestion, toQuestion, onImport, toast]);

  return (
    <div className="space-y-3">
      <div className={S.FORM_GROUP}>
        <label className={S.LABEL}>{L.external.apiUrl}</label>
        <input
          type="url"
          value={apiUrl}
          onChange={e => setApiUrl(e.target.value)}
          placeholder={L.external.apiUrlPlaceholder}
          className={S.INPUT}
          disabled={disabled || loading}
        />
      </div>
      <div className={S.GRID_2}>
        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{L.external.fromQuestion}</label>
          <input
            type="number"
            min={1}
            value={fromQuestion}
            onChange={e => setFromQuestion(parseInt(e.target.value) || 1)}
            className={S.INPUT}
            disabled={disabled || loading}
          />
        </div>
        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{L.external.toQuestion}</label>
          <input
            type="number"
            min={1}
            value={toQuestion}
            onChange={e => setToQuestion(parseInt(e.target.value) || 10)}
            className={S.INPUT}
            disabled={disabled || loading}
          />
        </div>
      </div>
      <Button onClick={handleImport} disabled={disabled || loading || !apiUrl.trim()}>
        {loading ? 'Đang tải...' : 'Nhập câu hỏi'}
      </Button>
    </div>
  );
});

export const QuizEditor = memo(function QuizEditor({
  quiz, quizIndex, chapters, onUpdate, onRemove, disabled
}: QuizEditorProps) {
  const showChapter = isChapterRequired(quiz.type);
  const [activeTab, setActiveTab] = useState<QuizSourceType>('manual');

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

  const handleImportQuestions = useCallback((importedQuestions: QuizQuestion[]) => {
    onUpdate(quizIndex, { ...quiz, questions: [...quiz.questions, ...importedQuestions] });
    setActiveTab('manual');
  }, [quiz, quizIndex, onUpdate]);

  const question = useMemo(() => ({
    add: () => onUpdate(quizIndex, { ...quiz, questions: appendItem(quiz.questions, createEmptyQuestion()) }),
    update: (i: number, q: QuizQuestion) => onUpdate(quizIndex, { ...quiz, questions: updateAtIndex(quiz.questions, i, q) }),
    remove: (i: number) => onUpdate(quizIndex, { ...quiz, questions: removeAtIndex(quiz.questions, i) }),
  }), [quiz, quizIndex, onUpdate]);

  return (
    <div className={S.QUIZ_CARD}>
      <EditorCardHeader title={`${L.prefix} ${quizIndex + 1}`} onRemove={() => onRemove(quizIndex)} removeTitle={L.removeQuiz} disabled={disabled} />
      <div className={S.GRID_2}>
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
      </div>
      <div className={S.GRID_2}>
        <QuizPassScoreInput value={quiz.passScore ?? QUIZ_CONFIG.PASS_SCORE.DEFAULT} onChange={v => updateField('passScore', v)} disabled={disabled} />
        <QuizTimeLimitInput value={quiz.timeLimit ?? QUIZ_CONFIG.TIME_LIMIT.DEFAULT} onChange={v => updateField('timeLimit', v)} disabled={disabled} />
      </div>
      {showChapter && <QuizChapterSelect value={quiz.chapterId || ''} chapters={chapters} onChange={handleChapterChange} disabled={disabled} />}

      <div className="mt-4">
        <label className={S.LABEL}>{L.questions}</label>
        <Tabs
          items={[...QUIZ_SOURCE_TABS]}
          activeKey={activeTab}
          onChange={key => setActiveTab(key as QuizSourceType)}
          variant="underline"
          size="sm"
        />
      </div>

      {activeTab === 'external' ? (
        <div className="mt-4">
          <ImportUrlInput onImport={handleImportQuestions} disabled={disabled} />
        </div>
      ) : (
        <div className={`${S.LIST_GAP_SM} mt-4`}>
          <div className={S.SECTION_HEADER}>
            <span className={S.SECTION_SUBTITLE}>{L.questions} ({quiz.questions.length})</span>
            <button type="button" onClick={question.add} className={S.ADD_BTN} disabled={disabled}>
              <PlusIcon className={ICON_SM} />{L.addQuestion}
            </button>
          </div>
          {quiz.questions.map((q, i) => (
            <QuizQuestionEditor key={q.id} question={q} questionIndex={i} onUpdate={question.update} onRemove={question.remove} disabled={disabled} />
          ))}
        </div>
      )}
    </div>
  );
});

