import type { LessonStatus, Question, AnswerCheckResult, QuestionDisplayStatus, QuestionItemState } from '@/types/learning';
import type { IconProps } from '@/components/ui/icons';
import { PlayIcon, BookIcon, CheckCircleIcon, LockIcon, QuizIcon } from '@/components/ui/icons';

const areSetsEqual = <T>(a: Set<T>, b: Set<T>): boolean =>
  a.size === b.size && [...a].every(item => b.has(item));

const normalizeTextAnswer = (text?: string): string =>
  (text ?? '').toLowerCase().trim();

const getCorrectAnswerSet = (question: Question, cachedSet?: Set<string>): Set<string> => {
  if (cachedSet) return cachedSet;
  const { correctAnswer, type } = question;
  return type === 'multiple'
    ? new Set(correctAnswer as string[])
    : new Set([correctAnswer as string]);
};

const checkMultipleAnswer = (answer: string[] | undefined, correctSet: Set<string>): boolean =>
  areSetsEqual(new Set(answer ?? []), correctSet);

const checkTextAnswer = (answer: string | undefined, correctSet: Set<string>): boolean =>
  correctSet.has(normalizeTextAnswer(answer));

const checkSingleAnswer = (answer: string | undefined, correctSet: Set<string>): boolean =>
  correctSet.has(answer as string);

export const checkAnswer = (
  question: Question, 
  answer?: string | string[],
  correctAnswersMap?: Map<string, Set<string>>
): AnswerCheckResult => {
  const correctAnswerSet = getCorrectAnswerSet(question, correctAnswersMap?.get(question.id));
  
  let isCorrect: boolean;
  switch (question.type) {
    case 'multiple':
      isCorrect = checkMultipleAnswer(answer as string[], correctAnswerSet);
      break;
    case 'text':
      isCorrect = checkTextAnswer(answer as string, correctAnswerSet);
      break;
    default:
      isCorrect = checkSingleAnswer(answer as string, correctAnswerSet);
  }

  return { isCorrect, correctAnswerSet };
};

export const calculateQuizScore = (
  questions: Question[], 
  answers: Map<string, string | string[]>
): number => {
  const { correct, total } = questions.reduce(
    (acc, q) => {
      const { isCorrect } = checkAnswer(q, answers.get(q.id));
      return {
        correct: acc.correct + (isCorrect ? q.points : 0),
        total: acc.total + q.points,
      };
    },
    { correct: 0, total: 0 }
  );
  
  return total > 0 ? Math.round((correct / total) * 100) : 0;
};

export const createCorrectAnswersMap = (questions: Question[]): Map<string, Set<string>> =>
  new Map(questions.map(q => [q.id, getCorrectAnswerSet(q)]));

const hasValidAnswer = (answer: string | string[] | undefined): boolean =>
  answer !== undefined && (Array.isArray(answer) ? answer.length > 0 : answer !== '');

export const getQuestionDisplayStatus = (
  question: Question,
  answer: string | string[] | undefined,
  showResults: boolean,
  correctAnswers?: Map<string, Set<string>>
): QuestionDisplayStatus => {
  if (showResults && correctAnswers) {
    const { isCorrect } = checkAnswer(question, answer, correctAnswers);
    return isCorrect ? 'correct' : 'incorrect';
  }
  return hasValidAnswer(answer) ? 'answered' : 'unanswered';
};

export const computeQuestionItems = (
  questions: Question[],
  currentIndex: number,
  answers: Map<string, string | string[]>,
  showResults: boolean,
  correctAnswers?: Map<string, Set<string>>
): QuestionItemState[] => {
  return questions.map((q, i) => ({
    index: i,
    isCurrent: i === currentIndex,
    status: getQuestionDisplayStatus(q, answers.get(q.id), showResults, correctAnswers),
  }));
};

export const LESSON_TYPE_ICONS: Record<string, React.FC<IconProps>> = {
  video: PlayIcon,
  quiz: QuizIcon,
  reading: BookIcon,
};

export const LESSON_STATUS_ICONS: Record<LessonStatus, React.FC<IconProps> | null> = {
  completed: CheckCircleIcon,
  locked: LockIcon,
  available: null,
  in_progress: null,
};

export const LEARNING_LABELS = {
  pageTitle: 'Học tập',
  sidebar: {
    title: 'Nội dung khóa học',
    progress: 'Tiến độ',
    completed: 'Đã hoàn thành',
    inProgress: 'Đang học',
    locked: 'Chưa mở khóa',
  },
  lesson: {
    video: 'Video',
    quiz: 'Bài kiểm tra',
    reading: 'Bài đọc',
    complete: 'Hoàn thành bài học',
    next: 'Bài tiếp theo',
    prev: 'Bài trước',
    backToCourse: 'Quay lại khóa học',
  },
  quiz: {
    title: 'Bài kiểm tra',
    start: 'Bắt đầu làm bài',
    submit: 'Nộp bài',
    retry: 'Làm lại',
    continue: 'Tiếp tục',
    question: 'Câu hỏi',
    of: 'của',
    score: 'Điểm số',
    passed: 'Đạt',
    failed: 'Chưa đạt',
    passingScore: 'Điểm đạt',
    yourScore: 'Điểm của bạn',
    correct: 'Đúng',
    incorrect: 'Sai',
    timeLeft: 'Thời gian còn lại',
    timeUp: 'Hết thời gian',
    selectAnswer: 'Chọn đáp án',
    selectMultiple: 'Chọn nhiều đáp án',
    enterAnswer: 'Nhập câu trả lời',
    explanation: 'Giải thích',
    congratulations: 'Chúc mừng!',
    tryAgain: 'Hãy thử lại!',
    passedMessage: 'Bạn đã vượt qua bài kiểm tra.',
    failedMessage: 'Bạn chưa đạt điểm yêu cầu.',
    attempts: 'Số lần thử',
    remaining: 'còn lại',
    questionList: 'Danh sách câu hỏi',
  },
  progress: {
    courseProgress: 'Tiến độ khóa học',
    lessonsCompleted: 'bài học đã hoàn thành',
    certificate: 'Nhận chứng chỉ',
    certificateMessage: 'Hoàn thành khóa học để nhận chứng chỉ NFT',
  },
} as const;

export const LEARNING_CONFIG = {
  autoPlayNext: true,
  showProgressBar: true,
  minVideoProgress: 90,
  defaultQuizTimeLimit: 30,
} as const;

export const QUIZ_CONSTANTS = {
  SECONDS_PER_MINUTE: 60,
  TIMER_INTERVAL_MS: 1000,
  WARNING_THRESHOLD_SECONDS: 60,
  DANGER_THRESHOLD_SECONDS: 30,
} as const;

export const toSeconds = (minutes?: number): number => 
  minutes ? minutes * QUIZ_CONSTANTS.SECONDS_PER_MINUTE : 0;

export const createInitialQuizState = (timeLimit?: number): import('@/types/learning').QuizState => ({
  started: false,
  currentIndex: 0,
  answers: new Map(),
  showResults: false,
  attempt: undefined,
  timeLeft: toSeconds(timeLimit),
});
