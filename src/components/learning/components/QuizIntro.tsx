'use client';

import { memo } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui';
import { LEARNING_LABELS } from '@/constants/learning';
import { QuestionIcon, TimerIcon, TargetIcon } from '@/components/ui/icons';
import type { QuizIntroProps } from '@/types/learning';
import { QUIZ } from '../learning.styles';

const LABELS = LEARNING_LABELS.quiz;
const ICON_SIZE = 'w-4 h-4';

interface MetaItemProps {
  icon: React.ReactNode;
  children: React.ReactNode;
}

const MetaItem = memo(function MetaItem({ icon, children }: MetaItemProps) {
  return (
    <span className={QUIZ.INTRO_META_ITEM}>
      {icon}
      {children}
    </span>
  );
});

function QuizIntroComponent({ quiz, onStart }: QuizIntroProps) {
  const questionCount = quiz.questions.length;
  const hasTimeLimit = !!quiz.timeLimit;

  return (
    <div className={QUIZ.CONTAINER}>
      <div className={QUIZ.INTRO}>
        <Image
          src="/background.png"
          alt=""
          width={120}
          height={120}
          className="mb-6 rounded-lg pointer-events-none select-none"
          priority
          onContextMenu={(e) => e.preventDefault()}
          draggable={false}
        />
        <h1 className={QUIZ.INTRO_TITLE}>{quiz.title}</h1>
        
        {quiz.description && (
          <p className={QUIZ.INTRO_DESC}>{quiz.description}</p>
        )}

        <div className={QUIZ.INTRO_META}>
          <MetaItem icon={<QuestionIcon className={ICON_SIZE} />}>
            {questionCount} câu hỏi
          </MetaItem>

          {hasTimeLimit && (
            <MetaItem icon={<TimerIcon className={ICON_SIZE} />}>
              {quiz.timeLimit} phút
            </MetaItem>
          )}

          <MetaItem icon={<TargetIcon className={ICON_SIZE} />}>
            {LABELS.passingScore}: {quiz.passingScore}%
          </MetaItem>
        </div>

        <Button size="lg" onClick={onStart} className="mt-8 px-10 py-4 text-base">
          {LABELS.start}
        </Button>
      </div>
    </div>
  );
}

export const QuizIntro = memo(QuizIntroComponent);
