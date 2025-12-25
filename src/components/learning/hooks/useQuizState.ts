import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { Quiz, QuizAttempt, QuizState } from '@/types/learning';
import { calculateQuizScore, createCorrectAnswersMap } from '@/constants/learning';

export function useQuizState(quiz: Quiz, onSubmit: (answers: Record<string, string | string[]>) => void) {
  const [state, setState] = useState<QuizState>(() => ({
    started: false,
    currentIndex: 0,
    answers: new Map(),
    showResults: false,
    attempt: undefined,
    timeLeft: quiz.timeLimit ? quiz.timeLimit * 60 : 0,
  }));

  const timerRef = useRef<NodeJS.Timeout>();

  const correctAnswersMap = useMemo(
    () => createCorrectAnswersMap(quiz.questions),
    [quiz.questions]
  );

  const totalQuestions = quiz.questions.length;
  const currentQuestion = quiz.questions[state.currentIndex];
  const progress = ((state.currentIndex + 1) / totalQuestions) * 100;
  const isTimeWarning = state.timeLeft > 0 && state.timeLeft < 60;

  const start = useCallback(() => {
    setState(prev => ({
      ...prev,
      started: true,
      timeLeft: quiz.timeLimit ? quiz.timeLimit * 60 : 0,
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
    if (index >= 0 && index < totalQuestions) {
      setState(prev => ({ ...prev, currentIndex: index }));
    }
  }, [totalQuestions]);

  const submit = useCallback(() => {
    clearInterval(timerRef.current);
    const score = calculateQuizScore(quiz.questions, state.answers);
    const passed = score >= quiz.passingScore;
    
    const answersObject = Object.fromEntries(state.answers);
    
    const newAttempt: QuizAttempt = {
      id: Date.now().toString(),
      quizId: quiz.id,
      answers: answersObject,
      score,
      passed,
      startedAt: new Date().toISOString(),
      completedAt: new Date().toISOString(),
    };

    setState(prev => ({
      ...prev,
      currentIndex: 0,
      showResults: true,
      attempt: newAttempt,
    }));
    
    onSubmit(answersObject);
  }, [quiz, state.answers, onSubmit]);

  const retry = useCallback(() => {
    setState({
      started: true,
      currentIndex: 0,
      answers: new Map(),
      showResults: false,
      attempt: undefined,
      timeLeft: quiz.timeLimit ? quiz.timeLimit * 60 : 0,
    });
  }, [quiz.timeLimit]);

  const getAttempt = useCallback(() => state.attempt, [state.attempt]);

  useEffect(() => {
    if (!state.started || !quiz.timeLimit || state.showResults) return;
    
    timerRef.current = setInterval(() => {
      setState(prev => {
        if (prev.timeLeft <= 1) {
          clearInterval(timerRef.current);
          return prev;
        }
        return { ...prev, timeLeft: prev.timeLeft - 1 };
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [state.started, state.showResults, quiz.timeLimit]);

  useEffect(() => {
    if (state.timeLeft === 0 && state.started && !state.showResults && quiz.timeLimit) {
      submit();
    }
  }, [state.timeLeft, state.started, state.showResults, quiz.timeLimit, submit]);

  return {
    state,
    actions: { start, answer, goTo, submit, retry, getAttempt },
    computed: { currentQuestion, totalQuestions, progress, isTimeWarning, correctAnswersMap },
  };
}
