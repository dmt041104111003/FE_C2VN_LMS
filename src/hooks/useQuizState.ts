'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { Quiz, QuizAttempt, QuizState } from '@/types/learning';
import type { UseQuizStateReturn } from '@/types/hooks';
import { 
  calculateQuizScore, 
  createCorrectAnswersMap, 
  createInitialQuizState,
  toSeconds,
  QUIZ_CONSTANTS 
} from '@/constants/learning';

const { TIMER_INTERVAL_MS, WARNING_THRESHOLD_SECONDS } = QUIZ_CONSTANTS;

export function useQuizState(
  quiz: Quiz, 
  onSubmit: (answers: Record<string, string | string[]>) => void
): UseQuizStateReturn {
  const [state, setState] = useState<QuizState>(() => createInitialQuizState(quiz.timeLimit));
  const timerRef = useRef<NodeJS.Timeout>();

  const correctAnswersMap = useMemo(
    () => createCorrectAnswersMap(quiz.questions),
    [quiz.questions]
  );

  const { questions, passingScore, timeLimit, id: quizId } = quiz;
  const { currentIndex, started, showResults, timeLeft, answers, attempt } = state;
  
  const totalQuestions = questions.length;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isTimeWarning = timeLeft > 0 && timeLeft < WARNING_THRESHOLD_SECONDS;
  const isQuizInProgress = started && !showResults;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = undefined;
    }
  }, []);

  const start = useCallback(() => {
    setState(prev => ({ ...prev, started: true, timeLeft: toSeconds(timeLimit) }));
  }, [timeLimit]);

  const answer = useCallback((questionId: string, value: string | string[]) => {
    setState(prev => {
      const newAnswers = new Map(prev.answers);
      newAnswers.set(questionId, value);
      return { ...prev, answers: newAnswers };
    });
  }, []);

  const goTo = useCallback((index: number) => {
    if (index >= 0 && index < totalQuestions) {
      setState(prev => ({ ...prev, currentIndex: index }));
    }
  }, [totalQuestions]);

  const submit = useCallback(() => {
    clearTimer();
    
    const score = calculateQuizScore(questions, answers);
    const answersObject = Object.fromEntries(answers);
    const now = new Date().toISOString();

    const newAttempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId,
      answers: answersObject,
      score,
      passed: score >= passingScore,
      startedAt: now,
      completedAt: now,
    };

    setState(prev => ({ ...prev, currentIndex: 0, showResults: true, attempt: newAttempt }));
    onSubmit(answersObject);
  }, [questions, answers, quizId, passingScore, onSubmit, clearTimer]);

  const retry = useCallback(() => {
    setState({ ...createInitialQuizState(timeLimit), started: true });
  }, [timeLimit]);

  const getAttempt = useCallback(() => attempt, [attempt]);

  useEffect(() => {
    if (!isQuizInProgress || !timeLimit) return;
    
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          clearTimer();
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, TIMER_INTERVAL_MS);

    return clearTimer;
  }, [isQuizInProgress, timeLimit, clearTimer]);

  useEffect(() => {
    if (timeLeft === 0 && isQuizInProgress && timeLimit) submit();
  }, [timeLeft, isQuizInProgress, timeLimit, submit]);

  return {
    state,
    actions: { start, answer, goTo, submit, retry, getAttempt },
    computed: { currentQuestion, totalQuestions, progress, isTimeWarning, correctAnswersMap },
  };
}
