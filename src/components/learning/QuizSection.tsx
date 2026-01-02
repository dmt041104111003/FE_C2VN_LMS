'use client';

import { memo, useCallback, useEffect, useState, useRef } from 'react';
import { Button, useToast } from '@/components/ui';
import { LEARNING_LABELS } from '@/constants/learning';
import { FACE_CONFIG, getFaceMessage } from '@/constants/face';
import type { QuizSectionProps, ServerQuizResult } from '@/types/learning';
import { useQuizState, useFullscreen } from '@/hooks';
import { QuizIntro, QuizProgress, QuizQuestion, QuestionList, QuizExplanation } from './components';
import { FaceProctor } from '@/components/face';
import { QUIZ } from './learning.styles';
import { getPreviousQuizResult } from '@/services/course';
import type { FaceVerifyResponse } from '@/services/face';
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

type FaceStatus = 'ok' | 'warning' | 'error';

function QuizSectionComponent({ 
  quiz, courseId, userId, isAlreadyPassed, onComplete, enrollmentId, enableFaceProctor = false,
}: QuizSectionProps) {
  const toast = useToast();
  const [previousResult, setPreviousResult] = useState<ServerQuizResult | null>(null);
  const [loadingPrevious, setLoadingPrevious] = useState(isAlreadyPassed || false);
  const [faceMismatchCount, setFaceMismatchCount] = useState(0);
  const [faceWarningCount, setFaceWarningCount] = useState(0);
  const [faceStatus, setFaceStatus] = useState<FaceStatus>('ok');
  const [faceMessage, setFaceMessage] = useState('');
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

  const { state, actions, computed } = useQuizState({ quiz, courseId, userId });
  const { currentQuestion, totalQuestions, isTimeWarning, correctAnswersMap, explanationsMap, isSubmitting } = computed;

  const isQuizActive = state.started && !state.showResults && !isAlreadyPassed;
  const currentQuestionNumber = state.currentIndex + 1;

  const forceExitQuiz = useCallback((message?: string) => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    toast.error(message || 'Bài kiểm tra bị hủy.');
    setTimeout(() => window.location.reload(), 500);
  }, [toast]);

  const handleFullscreenExit = useCallback(() => {
    forceExitQuiz('Bạn đã thoát chế độ toàn màn hình. Bài kiểm tra bị hủy.');
  }, [forceExitQuiz]);

  const { ref: quizRef } = useFullscreen<HTMLDivElement>({
    isActive: isQuizActive,
    onExit: handleFullscreenExit,
  });

  const incrementMismatch = useCallback(() => {
    setFaceMismatchCount(prev => {
      const newCount = prev + 1;
      if (newCount >= FACE_CONFIG.MAX_MISMATCH) {
        forceExitQuiz(`Phát hiện gương mặt không khớp quá ${FACE_CONFIG.MAX_MISMATCH} lần. Bài kiểm tra bị hủy.`);
      }
      return newCount;
    });
  }, [forceExitQuiz]);

  const handleFaceVerificationResult = useCallback((result: FaceVerifyResponse) => {
    if (result.success && result.isMatch) {
      setFaceStatus('ok');
      setFaceWarningCount(0);
      setFaceMessage('');
    } else {
      setFaceMessage(result.isMatch === false ? 'FACE_MISMATCH' : result.message);
    }
  }, []);

  const handleFaceWarning = useCallback(() => {
    setFaceStatus('warning');
    setFaceWarningCount(prev => {
      const newCount = prev + 1;
      if (newCount >= FACE_CONFIG.WARNING_THRESHOLD) {
        incrementMismatch();
        return 0;
      }
      return newCount;
    });
  }, [incrementMismatch]);

  const handleFaceMismatch = useCallback(() => {
    setFaceStatus('error');
    setFaceWarningCount(0);
    incrementMismatch();
  }, [incrementMismatch]);

  useEffect(() => {
    if (isQuizActive) {
      setFaceMismatchCount(0);
      setFaceWarningCount(0);
      setFaceStatus('ok');
      setFaceMessage('');
    }
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

  const handleSelectQuestion = useCallback((index: number) => actions.goTo(index), [actions]);
  const handleAnswer = useCallback(
    (value: string | string[]) => actions.answer(currentQuestion.id, value),
    [actions, currentQuestion.id]
  );

  if (loadingPrevious) return null;

  const showDamageEffect = enableFaceProctor && enrollmentId && isQuizActive && faceStatus !== 'ok';

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
          correctAnswerSet={isResultMode ? correctMap.get(question.id) : undefined}
          hideExplanation={isResultMode}
        />
        {isResultMode && explainMap.get(question.id) && (
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
            isResults: true, passed: attempt.passed, onRetry: actions.retry, onContinue: handleContinue
          })}
        </div>
      </div>
    );
  }

  return (
    <div ref={quizRef} className={QUIZ.FULLSCREEN}>
      {showDamageEffect && (
        <div 
          className="fixed inset-0 pointer-events-none z-50"
          style={{
            border: `4px solid var(--${faceStatus === 'error' ? 'incorrect' : 'warning'})`,
            boxShadow: faceStatus === 'error'
              ? 'inset 0 0 20px rgba(220, 38, 38, 0.3)'
              : 'inset 0 0 15px rgba(234, 179, 8, 0.2)',
          }}
        />
      )}
      <QuizProgress
        current={currentQuestionNumber}
        total={totalQuestions}
        label={`${LABELS.question} ${currentQuestionNumber} / ${totalQuestions}`}
        timer={quiz.timeLimit ? state.timeLeft : undefined}
        isWarning={isTimeWarning}
      />
      
      {enableFaceProctor && enrollmentId && (faceMessage || faceMismatchCount > 0) && (
        <div className={`px-4 py-2 text-center text-sm ${
          faceStatus === 'error' 
            ? 'bg-[var(--incorrect)]/10 text-[var(--incorrect)]'
            : 'bg-[var(--warning)]/10 text-[var(--warning)]'
        }`}>
          {faceMessage && getFaceMessage(faceMessage)}
          {faceMessage && faceMismatchCount > 0 && ' - '}
          {faceMismatchCount > 0 && `Vi phạm: ${faceMismatchCount}/${FACE_CONFIG.MAX_MISMATCH}`}
        </div>
      )}
      
      <div className={QUIZ.MAIN}>
        <div className={QUIZ.MAIN_INNER}>
          {renderQuizContent(state.answers, correctAnswersMap, explanationsMap, currentQuestion, false, {
            onSubmit: handleSubmit, isSubmitting
          })}
        </div>
      </div>
      
      {enableFaceProctor && enrollmentId && (
        <FaceProctor
          enrollmentId={enrollmentId}
          testId={Number(quiz.id)}
          intervalMs={FACE_CONFIG.VERIFY_INTERVAL_MS}
          enabled={isQuizActive}
          onVerificationResult={handleFaceVerificationResult}
          onNoFace={handleFaceWarning}
          onMultipleFaces={handleFaceWarning}
          onMismatch={handleFaceMismatch}
        />
      )}
    </div>
  );
}

export const QuizSection = memo(QuizSectionComponent);
