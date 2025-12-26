'use client';

import { memo, useCallback, useMemo } from 'react';
import { PlusIcon } from '@/components/ui';
import { TipTapEditor } from '@/components/editor/TipTapEditor';
import { ICON_SM } from '@/components/ui/ui.styles';
import {
  COURSE_CREATE_LABELS as LABELS,
  COURSE_CREATE_STYLES as S,
  QUIZ_TYPE_OPTIONS,
  createEmptyQuestion,
  getOptionLetter,
} from '@/constants/course-create';
import { updateAtIndex, removeAtIndex, appendItem } from '@/hooks/useListManager';
import type { QuizEditorProps, QuizType, QuizQuestion, QuestionEditorProps, ChapterSelectProps } from '@/types/course-create';
import { EditorCardHeader } from './EditorCardHeader';

const ChapterSelect = memo(function ChapterSelect({ value, chapters, onChange }: ChapterSelectProps) {
  return (
    <div className={S.FORM_GROUP}>
      <label className={S.LABEL}>{LABELS.quizzes.selectChapter}</label>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className={S.SELECT}
      >
        <option value="">{LABELS.quizzes.selectChapterPlaceholder}</option>
        {chapters.map((chapter, i) => (
          <option key={chapter.id} value={chapter.id}>
            {LABELS.chapters.prefix} {i + 1}: {chapter.title || LABELS.chapters.untitled}
          </option>
        ))}
      </select>
    </div>
  );
});

export const QuizEditor = memo(function QuizEditor({
  quiz,
  quizIndex,
  chapters,
  onUpdate,
  onRemove,
}: QuizEditorProps) {
  const handleChange = useCallback(<K extends keyof typeof quiz>(
    field: K,
    value: typeof quiz[K]
  ) => {
    onUpdate(quizIndex, { ...quiz, [field]: value });
  }, [quiz, quizIndex, onUpdate]);

  const handleTypeChange = useCallback((type: QuizType) => {
    onUpdate(quizIndex, {
      ...quiz,
      type,
      chapterId: type === 'chapter' ? chapters[0]?.id : undefined,
      lectureId: undefined,
    });
  }, [quiz, quizIndex, chapters, onUpdate]);

  const handleChapterChange = useCallback((chapterId: string) => {
    onUpdate(quizIndex, { ...quiz, chapterId, lectureId: undefined });
  }, [quiz, quizIndex, onUpdate]);

  const handleLectureChange = useCallback((lectureId: string) => {
    onUpdate(quizIndex, { ...quiz, lectureId });
  }, [quiz, quizIndex, onUpdate]);

  const handleAddQuestion = useCallback(() => {
    onUpdate(quizIndex, {
      ...quiz,
      questions: appendItem(quiz.questions, createEmptyQuestion()),
    });
  }, [quiz, quizIndex, onUpdate]);

  const handleUpdateQuestion = useCallback((questionIndex: number, question: QuizQuestion) => {
    onUpdate(quizIndex, {
      ...quiz,
      questions: updateAtIndex(quiz.questions, questionIndex, question),
    });
  }, [quiz, quizIndex, onUpdate]);

  const handleRemoveQuestion = useCallback((questionIndex: number) => {
    onUpdate(quizIndex, {
      ...quiz,
      questions: removeAtIndex(quiz.questions, questionIndex),
    });
  }, [quiz, quizIndex, onUpdate]);

  const handleRemove = useCallback(() => {
    onRemove(quizIndex);
  }, [quizIndex, onRemove]);

  const selectedChapter = useMemo(() => 
    chapters.find(c => c.id === quiz.chapterId),
    [chapters, quiz.chapterId]
  );

  const isLectureType = quiz.type === 'lecture';
  const isChapterType = quiz.type === 'chapter';

  return (
    <div className={S.QUIZ_CARD}>
      <EditorCardHeader
        title={`${LABELS.quizzes.prefix} ${quizIndex + 1}`}
        onRemove={handleRemove}
        removeTitle={LABELS.quizzes.removeQuiz}
      />

      <div className={S.GRID_2}>
        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{LABELS.quizzes.quizTitle}</label>
          <input
            type="text"
            value={quiz.title}
            onChange={e => handleChange('title', e.target.value)}
            placeholder={LABELS.quizzes.quizPlaceholder}
            className={S.INPUT}
          />
        </div>

        <div className={S.FORM_GROUP}>
          <label className={S.LABEL}>{LABELS.quizzes.quizType}</label>
          <select
            value={quiz.type}
            onChange={e => handleTypeChange(e.target.value as QuizType)}
            className={S.SELECT}
          >
            {QUIZ_TYPE_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>
      </div>

      {isChapterType && (
        <ChapterSelect
          value={quiz.chapterId || ''}
          chapters={chapters}
          onChange={handleChapterChange}
        />
      )}

      {isLectureType && (
        <div className={S.GRID_2}>
          <ChapterSelect
            value={quiz.chapterId || ''}
            chapters={chapters}
            onChange={handleChapterChange}
          />

          <div className={S.FORM_GROUP}>
            <label className={S.LABEL}>{LABELS.quizzes.selectLecture}</label>
            <select
              value={quiz.lectureId || ''}
              onChange={e => handleLectureChange(e.target.value)}
              className={S.SELECT}
              disabled={!quiz.chapterId}
            >
              <option value="">{LABELS.quizzes.selectLecturePlaceholder}</option>
              {selectedChapter?.lectures.map((lecture, i) => (
                <option key={lecture.id} value={lecture.id}>
                  {LABELS.lectures.prefix} {i + 1}: {lecture.title || LABELS.chapters.untitled}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div className={S.LIST_GAP_SM}>
        <div className={S.SECTION_HEADER}>
          <span className={S.SECTION_SUBTITLE}>{LABELS.quizzes.questions}</span>
          <button type="button" onClick={handleAddQuestion} className={S.ADD_BTN}>
            <PlusIcon className={ICON_SM} />
            {LABELS.quizzes.addQuestion}
          </button>
        </div>

        {quiz.questions.map((question, questionIndex) => (
          <QuestionEditor
            key={question.id}
            question={question}
            questionIndex={questionIndex}
            onUpdate={handleUpdateQuestion}
            onRemove={handleRemoveQuestion}
          />
        ))}
      </div>
    </div>
  );
});

const QuestionEditor = memo(function QuestionEditor({
  question,
  questionIndex,
  onUpdate,
  onRemove,
}: QuestionEditorProps) {
  const handleQuestionChange = useCallback((value: string) => {
    onUpdate(questionIndex, { ...question, question: value });
  }, [question, questionIndex, onUpdate]);

  const handleOptionChange = useCallback((optionIndex: number, value: string) => {
    onUpdate(questionIndex, {
      ...question,
      options: updateAtIndex(question.options, optionIndex, value),
    });
  }, [question, questionIndex, onUpdate]);

  const toggleCorrectIndex = useCallback((optionIndex: number, isChecked: boolean) => {
    const newCorrectIndexes = isChecked
      ? [...question.correctIndexes, optionIndex].sort((a, b) => a - b)
      : question.correctIndexes.filter(i => i !== optionIndex);
    onUpdate(questionIndex, { ...question, correctIndexes: newCorrectIndexes });
  }, [question, questionIndex, onUpdate]);

  const handleExplanationChange = useCallback((value: string) => {
    onUpdate(questionIndex, { ...question, explanation: value });
  }, [question, questionIndex, onUpdate]);

  const handleRemove = useCallback(() => {
    onRemove(questionIndex);
  }, [questionIndex, onRemove]);

  const isCorrectOption = useCallback((optionIndex: number) => 
    question.correctIndexes.includes(optionIndex),
    [question.correctIndexes]
  );

  return (
    <div className={S.QUESTION_CARD}>
      <EditorCardHeader
        title={`${LABELS.quizzes.questionPrefix} ${questionIndex + 1}`}
        onRemove={handleRemove}
        removeTitle={LABELS.quizzes.removeQuestion}
        titleClassName={S.CARD_TITLE_SM}
      />

      <div className={S.FORM_GROUP}>
        <label className={S.LABEL_SM}>{LABELS.quizzes.questionContent}</label>
        <TipTapEditor
          content={question.question}
          onChange={handleQuestionChange}
          placeholder={LABELS.quizzes.questionPlaceholder}
          minHeight="80px"
        />
      </div>

      <div className={S.LIST_GAP_SM}>
        <label className={S.LABEL_SM}>{LABELS.quizzes.optionLabel}</label>
        {question.options.map((option, optionIndex) => (
          <div key={optionIndex} className={S.OPTION_ROW}>
            <input
              type="checkbox"
              checked={isCorrectOption(optionIndex)}
              onChange={e => toggleCorrectIndex(optionIndex, e.target.checked)}
              className={S.CHECKBOX}
              title={LABELS.quizzes.correctAnswer}
            />
            <div className={S.OPTION_CONTENT}>
              <div className={S.OPTION_LABEL}>
                {getOptionLetter(optionIndex)}
              </div>
              <TipTapEditor
                content={option}
                onChange={value => handleOptionChange(optionIndex, value)}
                placeholder={LABELS.quizzes.optionPlaceholder}
                minHeight="60px"
              />
            </div>
          </div>
        ))}
      </div>

      <div className={S.FORM_GROUP}>
        <label className={S.LABEL_SM}>{LABELS.quizzes.explanation}</label>
        <TipTapEditor
          content={question.explanation}
          onChange={handleExplanationChange}
          placeholder={LABELS.quizzes.explanationPlaceholder}
          minHeight="80px"
        />
      </div>
    </div>
  );
});
