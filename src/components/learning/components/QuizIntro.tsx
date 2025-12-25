'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { LEARNING_LABELS } from '@/constants/learning';
import { QuestionIcon, TimerIcon, TargetIcon } from '@/components/ui/icons';
import type { QuizIntroProps } from '@/types/learning';
import { QUIZ } from '../learning.styles';

function QuizIntroComponent({ quiz, onStart }: QuizIntroProps) {
  return (
    <div className={QUIZ.CONTAINER}>
      <div className={QUIZ.INTRO}>
        <Image
          src="/background.png"
          alt=""
          width={120}
          height={120}
          className="mb-6 rounded-lg"
        />
        <h1 className={QUIZ.INTRO_TITLE}>{quiz.title}</h1>
        
        {quiz.description && (
          <p className={QUIZ.INTRO_DESC}>{quiz.description}</p>
        )}

        <div className={QUIZ.INTRO_META}>
          <span className={QUIZ.INTRO_META_ITEM}>
            <QuestionIcon className="w-4 h-4" />
            {quiz.questions.length} câu hỏi
          </span>

          {quiz.timeLimit && (
            <span className={QUIZ.INTRO_META_ITEM}>
              <TimerIcon className="w-4 h-4" />
              {quiz.timeLimit} phút
            </span>
          )}

          <span className={QUIZ.INTRO_META_ITEM}>
            <TargetIcon className="w-4 h-4" />
            {LEARNING_LABELS.quiz.passingScore}: {quiz.passingScore}%
          </span>
        </div>

        <Button size="lg" onClick={onStart} className="mt-8 px-10 py-4 text-base">
          {LEARNING_LABELS.quiz.start}
        </Button>
      </div>
    </div>
  );
}

export const QuizIntro = memo(QuizIntroComponent);
