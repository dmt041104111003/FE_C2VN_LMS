'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import type { QuizAttempt, QuizState, ServerQuizResult } from '@/types/learning';
import type { UseQuizStateReturn, UseQuizStateParams } from '@/types/hooks';
import { createInitialQuizState, toSeconds, QUIZ_CONSTANTS } from '@/constants/learning';
import { submitQuiz } from '@/services/course';

const { TIMER_INTERVAL_MS, WARNING_THRESHOLD_SECONDS } = QUIZ_CONSTANTS;

type AnswerMaps = {
  correctAnswersMap: Map<string, Set<string>>;
  explanationsMap: Map<string, string>;
};

const EMPTY_MAPS: AnswerMaps = {
  correctAnswersMap: new Map(),
  explanationsMap: new Map(),
};

const buildAnswerMaps = (result: ServerQuizResult | null): AnswerMaps => {
  if (!result?.questionResults) return EMPTY_MAPS;
  
  const correctMap = new Map<string, Set<string>>();
  const explainMap = new Map<string, string>();
  
  for (const { questionId, correctAnswerIds, explanation } of result.questionResults) {
    const id = String(questionId);
    correctMap.set(id, new Set(correctAnswerIds.map(String)));
    if (explanation) explainMap.set(id, explanation);
  }
  
  return { correctAnswersMap: correctMap, explanationsMap: explainMap };
};

const formatAnswersForSubmission = (answers: Map<string, string | string[]>) =>
  Array.from(answers.entries()).map(([questionId, value]) => ({
    questionId: Number(questionId),
    answerId: Array.isArray(value) ? value.map(Number) : value ? [Number(value)] : [],
  }));

const createAttempt = (quizId: string, answers: Map<string, string | string[]>, result: ServerQuizResult): QuizAttempt => ({
  id: Date.now().toString(),
  quizId,
  answers: Object.fromEntries(answers),
  score: result.score,
  passed: result.passed,
  startedAt: new Date().toISOString(),
  completedAt: new Date().toISOString(),
});

export function useQuizState({ quiz, courseId, userId }: UseQuizStateParams): UseQuizStateReturn {
  const { questions, timeLimit, id: quizId } = quiz;
  const totalQuestions = questions.length;

  const [state, setState] = useState<QuizState>(() => createInitialQuizState(timeLimit));
  const [serverResult, setServerResult] = useState<ServerQuizResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();

  const { correctAnswersMap, explanationsMap } = useMemo(
    () => buildAnswerMaps(serverResult),
    [serverResult]
  );

  const { currentIndex, started, timeLeft, answers, attempt } = state;
  const hasResults = state.showResults && correctAnswersMap.size > 0;
  const isQuizInProgress = started && !state.showResults;
  const currentQuestion = questions[currentIndex];
  const progress = ((currentIndex + 1) / totalQuestions) * 100;
  const isTimeWarning = timeLeft > 0 && timeLeft < WARNING_THRESHOLD_SECONDS;

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

  const submit = useCallback(async () => {
    if (isSubmitting) return;
    
    clearTimer();
    setIsSubmitting(true);

    try {
      const result = await submitQuiz(courseId, Number(quizId), {
        userId,
        answers: formatAnswersForSubmission(answers),
      });

      if (!result || typeof result.score === 'undefined') {
        return;
      }

      setServerResult(result);
      setState(prev => ({
        ...prev,
        currentIndex: 0,
        showResults: true,
        attempt: createAttempt(quizId, answers, result),
      }));
    } catch {
    } finally {
      setIsSubmitting(false);
    }
  }, [answers, courseId, quizId, userId, clearTimer, isSubmitting]);

  const retry = useCallback(() => {
    setServerResult(null);
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
    state: { ...state, showResults: hasResults },
    actions: { start, answer, goTo, submit, retry, getAttempt },
    computed: { currentQuestion, totalQuestions, progress, isTimeWarning, correctAnswersMap, explanationsMap, isSubmitting },
  };
}
