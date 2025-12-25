import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { Quiz, QuizAttempt, QuizState } from '@/types/learning';
import { calculateQuizScore, createCorrectAnswersMap, QUIZ_CONSTANTS } from '@/constants/learning';

const { SECONDS_PER_MINUTE, TIMER_INTERVAL_MS, WARNING_THRESHOLD_SECONDS } = QUIZ_CONSTANTS;

const createInitialState = (timeLimit?: number): QuizState => ({
  started: false,
  currentIndex: 0,
  answers: new Map(),
  showResults: false,
  attempt: undefined,
  timeLeft: timeLimit ? timeLimit * SECONDS_PER_MINUTE : 0,
});

const getTimeLimitInSeconds = (timeLimit?: number) => 
  timeLimit ? timeLimit * SECONDS_PER_MINUTE : 0;

export function useQuizState(quiz: Quiz, onSubmit: (answers: Record<string, string | string[]>) => void) {
  const [state, setState] = useState<QuizState>(() => createInitialState(quiz.timeLimit));
  const timerRef = useRef<NodeJS.Timeout>();

  const correctAnswersMap = useMemo(
    () => createCorrectAnswersMap(quiz.questions),
    [quiz.questions]
  );

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[state.currentIndex];
  const progress = ((state.currentIndex + 1) / totalQuestions) * 100;
  const isTimeWarning = state.timeLeft > 0 && state.timeLeft < WARNING_THRESHOLD_SECONDS;
  const isQuizInProgress = state.started && !state.showResults;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const start = useCallback(() => {
    setState(prev => ({
      ...prev,
      started: true,
      timeLeft: getTimeLimitInSeconds(quiz.timeLimit),
    }));
  }, [quiz.timeLimit]);

  const answer = useCallback((questionId: string, value: string | string[]) => {
    setState(prev => {
      const newAnswers = new Map(prev.answers);
      newAnswers.set(questionId, value);
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const goTo = useCallback((index: number) => {
    const isValidIndex = index >= 0 && index < totalQuestions;
    if (isValidIndex) {
      setState(prev => ({ ...prev, currentIndex: index }));
    }
  }, [totalQuestions]);

  const submit = useCallback(() => {
    clearTimer();
    
    const score = calculateQuizScore(quiz.questions, state.answers);
    const isPassed = score >= quiz.passingScore;
    const answersObject = Object.fromEntries(state.answers);
    const now = new Date().toISOString();

    const newAttempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId: quiz.id,
      answers: answersObject,
      score,
      passed: isPassed,
      startedAt: now,
      completedAt: now,
    };

    setState(prev => ({
      ...prev,
      currentIndex: 0,
      showResults: true,
      attempt: newAttempt,
    }));
    
    onSubmit(answersObject);
  }, [quiz, state.answers, onSubmit, clearTimer]);

  const retry = useCallback(() => {
    setState({
      ...createInitialState(quiz.timeLimit),
      started: true,
    });
  }, [quiz.timeLimit]);

  const getAttempt = useCallback(() => state.attempt, [state.attempt]);

  useEffect(() => {
    const shouldRunTimer = isQuizInProgress && quiz.timeLimit;
    if (!shouldRunTimer) return;
    
    timerRef.current = setInterval(() => {
      setState(prev => {
        const isTimeUp = prev.timeLeft <= 1;
        if (isTimeUp) {
          clearTimer();
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, TIMER_INTERVAL_MS);

    return clearTimer;
  }, [isQuizInProgress, quiz.timeLimit, clearTimer]);

  useEffect(() => {
    const shouldAutoSubmit = state.timeLeft === 0 && isQuizInProgress && quiz.timeLimit;
    if (shouldAutoSubmit) {
      submit();
    }
  }, [state.timeLeft, isQuizInProgress, quiz.timeLimit, submit]);

  return {
    state,
    actions: { start, answer, goTo, submit, retry, getAttempt },
    computed: { currentQuestion, totalQuestions, progress, isTimeWarning, correctAnswersMap },
  };
}
