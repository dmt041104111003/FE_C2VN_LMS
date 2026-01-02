import type { ServerQuizResult } from '@/types/learning';

interface QuestionOption {
  id: string;
  selected?: boolean;
  correct?: boolean;
}

interface Question {
  id: string;
  explanation?: string;
  options?: QuestionOption[];
}

interface AnswerMaps {
  correctMap: Map<string, Set<string>>;
  explainMap: Map<string, string>;
  selectedMap: Map<string, string | string[]>;
}

export const buildAnswerMapsFromResult = (result: ServerQuizResult | null): AnswerMaps => {
  const correctMap = new Map<string, Set<string>>();
  const explainMap = new Map<string, string>();
  const selectedMap = new Map<string, string | string[]>();
  
  if (!result?.questionResults) return { correctMap, explainMap, selectedMap };
  
  for (const { questionId, correctAnswerIds, selectedAnswerIds, explanation } of result.questionResults) {
    const id = String(questionId);
    correctMap.set(id, new Set(correctAnswerIds.map(String)));
    if (explanation) explainMap.set(id, explanation);
    if (selectedAnswerIds?.length > 0) {
      selectedMap.set(id, selectedAnswerIds.map(String));
    }
  }
  
  return { correctMap, explainMap, selectedMap };
};

export const buildAnswerMapsFromQuestions = (questions: Question[]): AnswerMaps => {
  const selectedMap = new Map<string, string | string[]>();
  const correctMap = new Map<string, Set<string>>();
  const explainMap = new Map<string, string>();
  
  for (const q of questions) {
    const selected = q.options?.filter(o => o.selected).map(o => o.id) || [];
    if (selected.length > 0) selectedMap.set(q.id, selected);
    
    const correct = q.options?.filter(o => o.correct).map(o => o.id) || [];
    if (correct.length > 0) correctMap.set(q.id, new Set(correct));
    
    if (q.explanation) explainMap.set(q.id, q.explanation);
  }
  
  return { selectedMap, correctMap, explainMap };
};

export const calculateScore = (result: ServerQuizResult | null): number => {
  if (!result?.questionResults?.length) return result?.score ?? 100;
  
  let correctCount = 0;
  const total = result.questionResults.length;
  
  for (const qr of result.questionResults) {
    const selected = new Set(qr.selectedAnswerIds?.map(String) || []);
    const correct = new Set(qr.correctAnswerIds?.map(String) || []);
    
    if (selected.size === correct.size && [...selected].every(id => correct.has(id))) {
      correctCount++;
    }
  }
  
  return Math.round((correctCount / total) * 100);
};

