'use client';

import { memo, useCallback, useEffect, useState, useRef } from 'react';
import { Button, useToast, Loading } from '@/components/ui';
import { LEARNING_LABELS } from '@/constants/learning';
import type { QuizSectionProps, ServerQuizResult } from '@/types/learning';
import { useQuizState, useFullscreen } from '@/hooks';
import { QuizIntro, QuizProgress, QuizQuestion, QuestionList, QuizExplanation } from './components';
import { QUIZ } from './learning.styles';
import { getPreviousQuizResult } from '@/services/course';
import { 
  buildAnswerMapsFromResult, 
  buildAnswerMapsFromQuestions, 
  calculateScore 
} from '@/utils/quiz.utils';

const LABELS = LEARNING_LABELS.quiz;

interface ActionButtonsProps {
  onRetry?: () => void;
  onContinue?: () => void;
  onSubmit?: () => void;
  passed?: boolean;
  isResults?: boolean;
  isSubmitting?: boolean;
  isAlreadyPassed?: boolean;
}

const ActionButtons = memo(function ActionButtons({ 
  onRetry, onContinue, onSubmit, passed, isResults, isSubmitting, isAlreadyPassed,
}: ActionButtonsProps) {
  if (isResults) {
    return passed || isAlreadyPassed ? (
      <Button className="w-full" onClick={onContinue}>Hoàn thành</Button>
    ) : (
      <Button className="w-full" onClick={onRetry}>{LABELS.retry}</Button>
    );
  }
  return (
    <Button className="w-full" onClick={onSubmit} disabled={isSubmitting}>
      {isSubmitting ? 'Đang nộp bài...' : LABELS.submit}
    </Button>
  );
});

function QuizSectionComponent({ 
  quiz, courseId, userId, isAlreadyPassed, onComplete,
}: QuizSectionProps) {
  const toast = useToast();
  const [previousResult, setPreviousResult] = useState<ServerQuizResult | null>(null);
  const [loadingPrevious, setLoadingPrevious] = useState(isAlreadyPassed || false);
  const [isPaused, setIsPaused] = useState(false);
  const isSubmittingRef = useRef(false);

  useEffect(() => {
    if (!isAlreadyPassed) return;
    
    (async () => {
      setLoadingPrevious(true);
      const result = await getPreviousQuizResult(courseId, Number(quiz.id), userId);
      if (result) setPreviousResult(result as unknown as ServerQuizResult);
      setLoadingPrevious(false);
    })();
  }, [isAlreadyPassed, courseId, quiz.id, userId]);

  const { state, actions, computed } = useQuizState({ quiz, courseId, userId, paused: isPaused });
  const { currentQuestion, totalQuestions, isTimeWarning, correctAnswersMap, explanationsMap, isSubmitting } = computed;

  const isQuizActive = state.started && !state.showResults && !isAlreadyPassed;
  const currentQuestionNumber = state.currentIndex + 1;

  const forceExitQuiz = useCallback((message?: string) => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    toast.error(message || 'Bài kiểm tra bị hủy.');
    setTimeout(() => window.location.reload(), 500);
  }, [toast]);

  const handleFullscreenExit = useCallback(() => {
    if (isSubmittingRef.current) {
      isSubmittingRef.current = false;
      actions.submit();
      return;
    }
    forceExitQuiz('Bạn đã thoát chế độ toàn màn hình. Bài kiểm tra bị hủy.');
  }, [forceExitQuiz, actions]);

  const { ref: quizRef } = useFullscreen<HTMLDivElement>({
    isActive: isQuizActive,
    onExit: handleFullscreenExit,
  });

  useEffect(() => {
    if (isQuizActive) setIsPaused(false);
  }, [isQuizActive]);

  useEffect(() => {
    if (!isQuizActive) return;

    const handleVisibilityChange = () => setIsPaused(document.hidden);
    const handleBlur = () => setIsPaused(true);
    const handleFocus = () => setIsPaused(false);

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
    };
  }, [isQuizActive]);

  const handleSubmit = useCallback(() => {
    if (document.fullscreenElement) {
      isSubmittingRef.current = true;
      document.exitFullscreen().catch(() => {});
    } else {
      actions.submit();
    }
  }, [actions]);

  const handleContinue = useCallback(() => {
    if (isAlreadyPassed) {
      onComplete(true, previousResult ? calculateScore(previousResult) : 100);
      return;
    }
    const attempt = actions.getAttempt();
    if (attempt) onComplete(attempt.passed, Math.round(attempt.score));
  }, [actions, onComplete, isAlreadyPassed, previousResult]);

  const handleRetry = useCallback(() => {
    actions.retry();
  }, [actions]);

  const handleSelectQuestion = useCallback((index: number) => actions.goTo(index), [actions]);
  const handleAnswer = useCallback(
    (value: string | string[]) => {
      if (currentQuestion?.id) actions.answer(currentQuestion.id, value);
    },
    [actions, currentQuestion?.id]
  );

  if (loadingPrevious) return <Loading size="lg" text="Đang tải kết quả..." className="py-16" />;
  if (!currentQuestion || totalQuestions === 0) return null;

  const renderQuizContent = (
    answers: Map<string, string | string[]>,
    correctMap: Map<string, Set<string>>,
    explainMap: Map<string, string>,
    question: typeof currentQuestion,
    isResultMode: boolean,
    actionProps: ActionButtonsProps
  ) => (
    <div className={QUIZ.GRID}>
      <div className={QUIZ.GRID_SIDEBAR}>
        <QuestionList
          questions={quiz.questions}
          currentIndex={state.currentIndex}
          answers={answers}
          onSelect={handleSelectQuestion}
          showResults={isResultMode}
          correctAnswers={isResultMode ? correctMap : undefined}
        />
        <div className="hidden lg:block mt-4">
          <ActionButtons {...actionProps} />
        </div>
      </div>
      <div className={QUIZ.GRID_QUESTION}>
        <QuizQuestion
          question={question}
          questionNumber={currentQuestionNumber}
          selectedAnswer={answers.get(question?.id || '')}
          onAnswer={isResultMode ? () => {} : handleAnswer}
          showResult={isResultMode}
          correctAnswerSet={isResultMode ? correctMap.get(question?.id || '') : undefined}
          hideExplanation={isResultMode}
        />
        {isResultMode && question?.id && explainMap.get(question.id) && (
          <div className="mt-4">
            <QuizExplanation explanation={explainMap.get(question.id)} />
          </div>
        )}
        <div className="lg:hidden mt-6 flex flex-col gap-2">
          <ActionButtons {...actionProps} />
        </div>
      </div>
    </div>
  );

  if (isAlreadyPassed) {
    const { correctMap, explainMap, selectedMap } = previousResult 
      ? buildAnswerMapsFromResult(previousResult)
      : buildAnswerMapsFromQuestions(quiz.questions);
    
    const scoreDisplay = previousResult ? calculateScore(previousResult) : 100;
    const currentQ = quiz.questions[state.currentIndex];

    return (
      <div>
        <QuizProgress current={currentQuestionNumber} total={totalQuestions} label={`${scoreDisplay}% · ${LABELS.passed}`} />
        <div className={QUIZ.MAIN_INNER}>
          {renderQuizContent(selectedMap, correctMap, explainMap, currentQ, true, { 
            isResults: true, passed: true, isAlreadyPassed: true, onContinue: handleContinue 
          })}
        </div>
      </div>
    );
  }

  if (!state.started) return <QuizIntro quiz={quiz} onStart={actions.start} />;

  const { attempt } = state;

  if (state.showResults && attempt) {
    const scoreDisplay = Math.round(attempt.score);
    
    return (
      <div>
        <QuizProgress current={currentQuestionNumber} total={totalQuestions} label={`${scoreDisplay}% · ${attempt.passed ? LABELS.passed : LABELS.failed}`} />
        <div className={QUIZ.MAIN_INNER}>
          {renderQuizContent(state.answers, correctAnswersMap, explanationsMap, currentQuestion, true, {
            isResults: true, passed: attempt.passed, onRetry: handleRetry, onContinue: handleContinue
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={quizRef} className={QUIZ.FULLSCREEN}>
      <QuizProgress
        current={currentQuestionNumber}
        total={totalQuestions}
        label={`${LABELS.question} ${currentQuestionNumber} / ${totalQuestions}`}
        timer={quiz.timeLimit ? state.timeLeft : undefined}
        isWarning={isTimeWarning}
      />
      
      <div className={QUIZ.MAIN}>
        <div className={QUIZ.MAIN_INNER}>
          {renderQuizContent(state.answers, correctAnswersMap, explanationsMap, currentQuestion, false, {
            onSubmit: handleSubmit, isSubmitting
          })}
        </div>
      </div>

      {isPaused && (
        <div className={QUIZ.PAUSED_OVERLAY}>
          <div className={QUIZ.PAUSED_BOX}>
            <p className={QUIZ.PAUSED_TEXT}>{LABELS.paused}</p>
            <p className={QUIZ.PAUSED_HINT}>{LABELS.returnToResume}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export const QuizSection = memo(QuizSectionComponent);
