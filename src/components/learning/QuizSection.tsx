'use client';

import { memo, useCallback, useMemo } from 'react';
import { Button } from '@/components/ui';
import { LEARNING_LABELS, createCorrectAnswersMap } from '@/constants/learning';
import type { QuizSectionProps } from '@/types/learning';
import { useQuizState } from './hooks';
import { QuizIntro, QuizProgress, QuizQuestion, QuestionList, QuizExplanation } from './components';
import { QUIZ } from './learning.styles';

function QuizSectionComponent({ quiz, onSubmit, onComplete }: QuizSectionProps) {
  const { state, actions, computed } = useQuizState(quiz, onSubmit);
  const { currentQuestion, totalQuestions, isTimeWarning, correctAnswersMap } = computed;

  const handleContinue = useCallback(() => {
    const attempt = actions.getAttempt();
    if (attempt) onComplete(attempt.passed, attempt.score);
  }, [actions, onComplete]);

  const handleSelectQuestion = useCallback(
    (index: number) => actions.goTo(index),
    [actions]
  );

  const correctAnswersForList = useMemo(
    () => createCorrectAnswersMap(quiz.questions),
    [quiz.questions]
  );

  if (!state.started) {
    return <QuizIntro quiz={quiz} onStart={actions.start} />;
  }

  const labels = LEARNING_LABELS.quiz;
  const currentAnswer = state.answers.get(currentQuestion?.id || '');

  if (state.showResults && state.attempt) {
    return (
      <div className={QUIZ.CONTAINER_FULL}>
        <QuizProgress
          current={state.currentIndex + 1}
          total={totalQuestions}
          label={`${state.attempt.score}% · ${state.attempt.passed ? labels.passed : labels.failed}`}
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
                  showResults
                  correctAnswers={correctAnswersForList}
                />

                <div className="hidden lg:block mt-4">
                  {!state.attempt.passed && (
                    <Button variant="outline" className="w-full mb-2" onClick={actions.retry}>
                      {labels.retry}
                    </Button>
                  )}
                  <Button className="w-full" onClick={handleContinue}>
                    {labels.continue}
                  </Button>
                </div>
              </div>

              <div className={QUIZ.GRID_QUESTION}>
                <QuizQuestion
                  question={currentQuestion}
                  questionNumber={state.currentIndex + 1}
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
                  {!state.attempt.passed && (
                    <Button variant="outline" className="w-full" onClick={actions.retry}>
                      {labels.retry}
                    </Button>
                  )}
                  <Button className="w-full" onClick={handleContinue}>
                    {labels.continue}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={QUIZ.CONTAINER_FULL}>
      <QuizProgress
        current={state.currentIndex + 1}
        total={totalQuestions}
        label={`${labels.question} ${state.currentIndex + 1} / ${totalQuestions}`}
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
                <Button className="w-full" onClick={actions.submit}>
                  {labels.submit}
                </Button>
              </div>
            </div>

            <div className={QUIZ.GRID_QUESTION}>
              <QuizQuestion
                question={currentQuestion}
                questionNumber={state.currentIndex + 1}
                selectedAnswer={currentAnswer}
                onAnswer={(value) => actions.answer(currentQuestion.id, value)}
              />

              <div className="lg:hidden mt-6">
                <Button className="w-full" onClick={actions.submit}>
                  {labels.submit}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const QuizSection = memo(QuizSectionComponent);
