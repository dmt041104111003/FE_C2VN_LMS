'use client';

import { memo, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui';
import { LEARNING_LABELS, createCorrectAnswersMap } from '@/constants/learning';
import type { QuizSectionProps } from '@/types/learning';
import { useQuizState, useFullscreen } from './hooks';
import { QuizIntro, QuizProgress, QuizQuestion, QuestionList, QuizExplanation } from './components';
import { QUIZ } from './learning.styles';

const LABELS = LEARNING_LABELS.quiz;

interface ActionButtonsProps {
  onRetry?: () => void;
  onContinue?: () => void;
  onSubmit?: () => void;
  showRetry?: boolean;
  isResults?: boolean;
}

const ActionButtons = memo(function ActionButtons({ 
  onRetry, 
  onContinue, 
  onSubmit,
  showRetry,
  isResults 
}: ActionButtonsProps) {
  if (isResults) {
    return (
      <>
        {showRetry && (
          <Button variant="secondary" className="w-full mb-2 lg:mb-2" onClick={onRetry}>
            {LABELS.retry}
          </Button>
        )}
        <Button className="w-full" onClick={onContinue}>
          {LABELS.continue}
        </Button>
      </>
    );
  }
  
  return (
    <Button className="w-full" onClick={onSubmit}>
      {LABELS.submit}
    </Button>
  );
});

function QuizSectionComponent({ quiz, onSubmit, onComplete }: QuizSectionProps) {
  const { state, actions, computed } = useQuizState(quiz, onSubmit);
  const { currentQuestion, totalQuestions, isTimeWarning, correctAnswersMap } = computed;

  const isQuizActive = state.started && !state.showResults;
  const currentQuestionNumber = state.currentIndex + 1;

  const { ref: quizRef } = useFullscreen<HTMLDivElement>({
    isActive: isQuizActive,
    onExit: actions.submit,
  });

  const correctAnswersForList = useMemo(
    () => createCorrectAnswersMap(quiz.questions),
    [quiz.questions]
  );

  const handleSubmit = useCallback(() => {
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else {
      actions.submit();
    }
  }, [actions]);

  const handleContinue = useCallback(() => {
    const attempt = actions.getAttempt();
    if (attempt) onComplete(attempt.passed, attempt.score);
  }, [actions, onComplete]);

  const handleSelectQuestion = useCallback(
    (index: number) => actions.goTo(index),
    [actions]
  );

  const handleAnswer = useCallback(
    (value: string | string[]) => actions.answer(currentQuestion.id, value),
    [actions, currentQuestion.id]
  );

  if (!state.started) {
    return <QuizIntro quiz={quiz} onStart={actions.start} />;
  }

  const currentAnswer = state.answers.get(currentQuestion?.id || '');
  const { attempt } = state;

  if (state.showResults && attempt) {
    const resultLabel = `${attempt.score}% · ${attempt.passed ? LABELS.passed : LABELS.failed}`;
    
    return (
      <div className={QUIZ.CONTAINER_FULL}>
        <QuizProgress current={currentQuestionNumber} total={totalQuestions} label={resultLabel} />
        <div className={QUIZ.MAIN}>
          <div className={QUIZ.MAIN_INNER}>
            <div className={QUIZ.GRID}>
              <div className={QUIZ.GRID_SIDEBAR}>
                <QuestionList
                  questions={quiz.questions}
                  currentIndex={state.currentIndex}
                  answers={state.answers}
                  onSelect={handleSelectQuestion}
                  showResults
                  correctAnswers={correctAnswersForList}
                />
                <div className="hidden lg:block mt-4">
                  <ActionButtons isResults showRetry={!attempt.passed} onRetry={actions.retry} onContinue={handleContinue} />
                </div>
              </div>
              <div className={QUIZ.GRID_QUESTION}>
                <QuizQuestion
                  question={currentQuestion}
                  questionNumber={currentQuestionNumber}
                  selectedAnswer={currentAnswer}
                  onAnswer={() => {}}
                  showResult
                  correctAnswerSet={correctAnswersMap.get(currentQuestion.id)}
                  hideExplanation
                />
                {currentQuestion.explanation && (
                  <div className="mt-4">
                    <QuizExplanation explanation={currentQuestion.explanation} />
                  </div>
                )}
                <div className="lg:hidden mt-6 flex flex-col gap-2">
                  <ActionButtons isResults showRetry={!attempt.passed} onRetry={actions.retry} onContinue={handleContinue} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const progressLabel = `${LABELS.question} ${currentQuestionNumber} / ${totalQuestions}`;

  return (
    <div ref={quizRef} className={QUIZ.FULLSCREEN}>
      <QuizProgress
        current={currentQuestionNumber}
        total={totalQuestions}
        label={progressLabel}
        timer={quiz.timeLimit ? state.timeLeft : undefined}
        isWarning={isTimeWarning}
      />
      <div className={QUIZ.MAIN}>
        <div className={QUIZ.MAIN_INNER}>
          <div className={QUIZ.GRID}>
            <div className={QUIZ.GRID_SIDEBAR}>
              <QuestionList
                questions={quiz.questions}
                currentIndex={state.currentIndex}
                answers={state.answers}
                onSelect={handleSelectQuestion}
              />
              <div className="hidden lg:block mt-4">
                <ActionButtons onSubmit={handleSubmit} />
              </div>
            </div>
            <div className={QUIZ.GRID_QUESTION}>
              <QuizQuestion
                question={currentQuestion}
                questionNumber={currentQuestionNumber}
                selectedAnswer={currentAnswer}
                onAnswer={handleAnswer}
              />
              <div className="lg:hidden mt-6">
                <ActionButtons onSubmit={handleSubmit} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const QuizSection = memo(QuizSectionComponent);
