import type { LearningChapter, CourseProgress, Quiz, LessonStatus, Question, AnswerCheckResult, QuestionDisplayStatus, QuestionItemState } from '@/types/learning';
import type { IconProps } from '@/components/ui/icons';
import { PlayIcon, BookIcon, CheckCircleIcon, LockIcon, QuizIcon } from '@/components/ui/icons';

export const checkAnswer = (
  question: Question, 
  answer?: string | string[],
  correctAnswersMap?: Map<string, Set<string>>
): AnswerCheckResult => {
  const correctSet = correctAnswersMap?.get(question.id);
  
  if (correctSet) {
    if (question.type === 'multiple') {
      const answerSet = new Set((answer as string[]) || []);
      const isCorrect = correctSet.size === answerSet.size && 
        [...correctSet].every(a => answerSet.has(a));
      return { isCorrect, correctAnswerSet: correctSet };
    }
    
    if (question.type === 'text') {
      const isCorrect = correctSet.has((answer as string)?.toLowerCase().trim() || '');
      return { isCorrect, correctAnswerSet: correctSet };
    }
    
    return { 
      isCorrect: correctSet.has(answer as string), 
      correctAnswerSet: correctSet 
    };
  }
  
  const correctAnswer = question.correctAnswer;
  
  if (question.type === 'multiple') {
    const newCorrectSet = new Set(correctAnswer as string[]);
    const answerSet = new Set((answer as string[]) || []);
    const isCorrect = newCorrectSet.size === answerSet.size && 
      [...newCorrectSet].every(a => answerSet.has(a));
    return { isCorrect, correctAnswerSet: newCorrectSet };
  }
  
  if (question.type === 'text') {
    const isCorrect = (answer as string)?.toLowerCase().trim() === 
      (correctAnswer as string)?.toLowerCase().trim();
    return { isCorrect, correctAnswerSet: new Set([correctAnswer as string]) };
  }
  
  return { 
    isCorrect: answer === correctAnswer, 
    correctAnswerSet: new Set([correctAnswer as string]) 
  };
};

export const calculateQuizScore = (
  questions: Question[], 
  answers: Map<string, string | string[]>
): number => {
  let correct = 0;
  let total = 0;
  
  questions.forEach(q => {
    total += q.points;
    const { isCorrect } = checkAnswer(q, answers.get(q.id));
    if (isCorrect) correct += q.points;
  });
  
  return total > 0 ? Math.round((correct / total) * 100) : 0;
};

export const createCorrectAnswersMap = (questions: Question[]): Map<string, Set<string>> => {
  const map = new Map<string, Set<string>>();
  questions.forEach(q => {
    if (q.type === 'multiple') {
      map.set(q.id, new Set(q.correctAnswer as string[]));
    } else {
      map.set(q.id, new Set([q.correctAnswer as string]));
    }
  });
  return map;
};

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
  const hasAnswer = answer !== undefined && 
    (Array.isArray(answer) ? answer.length > 0 : answer !== '');
  return hasAnswer ? 'answered' : 'unanswered';
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

export const MOCK_QUIZ: Quiz = {
  id: 'quiz-1',
  title: 'Kiểm tra kiến thức Blockchain cơ bản',
  description: 'Bài kiểm tra gồm 5 câu hỏi về kiến thức blockchain cơ bản.',
  passingScore: 60,
  timeLimit: 10,
  maxAttempts: 3,
  questions: [
    {
      id: 'q1',
      type: 'single',
      content: 'Blockchain là gì?',
      options: [
        { id: 'a', content: 'Một loại tiền điện tử' },
        { id: 'b', content: 'Một cơ sở dữ liệu phân tán' },
        { id: 'c', content: 'Một ngôn ngữ lập trình' },
        { id: 'd', content: 'Một công ty công nghệ' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Blockchain</strong> là một cơ sở dữ liệu phân tán, lưu trữ dữ liệu trong các khối được liên kết với nhau bằng mã hóa.</p><p>Các đặc điểm chính:</p><ul><li>Phi tập trung - không có máy chủ trung tâm</li><li>Bất biến - dữ liệu không thể thay đổi</li><li>Minh bạch - mọi người đều có thể xem</li></ul>',
      points: 20,
    },
    {
      id: 'q2',
      type: 'single',
      content: 'Thuật toán đồng thuận nào được Bitcoin sử dụng?',
      options: [
        { id: 'a', content: 'Proof of Stake (PoS)' },
        { id: 'b', content: 'Proof of Work (PoW)' },
        { id: 'c', content: 'Delegated Proof of Stake (DPoS)' },
        { id: 'd', content: 'Proof of Authority (PoA)' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Bitcoin</strong> sử dụng thuật toán <em>Proof of Work (PoW)</em>, yêu cầu các node giải quyết các bài toán tính toán phức tạp.</p><p>Quá trình này gọi là <strong>mining</strong> (đào coin).</p><pre><code>hash(block_data + nonce) < target</code></pre>',
      points: 20,
    },
    {
      id: 'q3',
      type: 'multiple',
      content: 'Những đặc điểm nào sau đây là của blockchain? (Chọn nhiều đáp án)',
      options: [
        { id: 'a', content: 'Phi tập trung' },
        { id: 'b', content: 'Bất biến' },
        { id: 'c', content: 'Minh bạch' },
        { id: 'd', content: 'Tập trung' },
      ],
      correctAnswer: ['a', 'b', 'c'],
      explanation: '<p>Blockchain có <strong>3 đặc điểm chính</strong>:</p><ol><li><strong>Phi tập trung</strong> - Không có cơ quan kiểm soát trung tâm</li><li><strong>Bất biến</strong> - Dữ liệu đã ghi không thể sửa đổi</li><li><strong>Minh bạch</strong> - Mọi giao dịch đều công khai</li></ol><p>⚠️ <em>Blockchain KHÔNG phải là hệ thống tập trung.</em></p>',
      points: 20,
    },
    {
      id: 'q4',
      type: 'single',
      content: 'Smart Contract là gì?',
      options: [
        { id: 'a', content: 'Hợp đồng giấy được số hóa' },
        { id: 'b', content: 'Chương trình tự động thực thi trên blockchain' },
        { id: 'c', content: 'Hợp đồng giữa các sàn giao dịch' },
        { id: 'd', content: 'Ứng dụng di động' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Smart Contract</strong> là các chương trình được lưu trữ trên blockchain và <em>tự động thực thi</em> khi các điều kiện được đáp ứng.</p><p>Ví dụ code Solidity:</p><pre><code>function transfer(address to, uint amount) public {\n  require(balance[msg.sender] >= amount);\n  balance[msg.sender] -= amount;\n  balance[to] += amount;\n}</code></pre>',
      points: 20,
    },
    {
      id: 'q5',
      type: 'single',
      content: 'Cardano sử dụng thuật toán đồng thuận nào?',
      options: [
        { id: 'a', content: 'Proof of Work' },
        { id: 'b', content: 'Ouroboros (Proof of Stake)' },
        { id: 'c', content: 'Tendermint' },
        { id: 'd', content: 'PBFT' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Cardano</strong> sử dụng <em>Ouroboros</em>, một giao thức <strong>Proof of Stake</strong> được chứng minh an toàn về mặt toán học.</p><p>Ưu điểm của PoS so với PoW:</p><ul><li>✅ Tiết kiệm năng lượng</li><li>✅ Nhanh hơn</li><li>✅ Phí thấp hơn</li></ul>',
      points: 20,
    },
  ],
};

export const MOCK_LEARNING_CHAPTERS: LearningChapter[] = [
  {
    id: 'ch1',
    title: 'Giới thiệu Blockchain',
    orderIndex: 1,
    lessons: [
      {
        id: 'l1',
        chapterId: 'ch1',
        title: 'Blockchain là gì?',
        type: 'video',
        duration: 15,
        orderIndex: 1,
        videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
        content: '<h2>Tổng quan về Blockchain</h2><p>Trong bài học này, bạn sẽ tìm hiểu về <strong>Blockchain</strong> - một công nghệ đang thay đổi thế giới.</p><h3>Nội dung chính:</h3><ul><li>Blockchain là gì?</li><li>Tại sao Blockchain quan trọng?</li><li>Các ứng dụng của Blockchain</li></ul><blockquote><p>"Blockchain sẽ làm với giao dịch những gì Internet đã làm với thông tin." - Don Tapscott</p></blockquote>',
      },
      {
        id: 'l2',
        chapterId: 'ch1',
        title: 'Lịch sử phát triển Blockchain',
        type: 'video',
        duration: 12,
        orderIndex: 2,
        videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
        content: '<h2>Lịch sử Blockchain</h2><p>Blockchain được phát minh bởi <em>Satoshi Nakamoto</em> vào năm <strong>2008</strong>.</p><h3>Các mốc quan trọng:</h3><ol><li><strong>2008</strong> - Whitepaper Bitcoin được công bố</li><li><strong>2009</strong> - Block đầu tiên được đào</li><li><strong>2015</strong> - Ethereum ra mắt với Smart Contract</li><li><strong>2017</strong> - Cardano được phát triển</li></ol>',
      },
      {
        id: 'l3',
        chapterId: 'ch1',
        title: 'Kiểm tra chương 1',
        type: 'quiz',
        duration: 10,
        orderIndex: 3,
        quiz: MOCK_QUIZ,
      },
    ],
  },
  {
    id: 'ch2',
    title: 'Cơ chế hoạt động',
    orderIndex: 2,
    lessons: [
      {
        id: 'l4',
        chapterId: 'ch2',
        title: 'Cấu trúc của một Block',
        type: 'video',
        duration: 18,
        orderIndex: 1,
        videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
      },
      {
        id: 'l5',
        chapterId: 'ch2',
        title: 'Proof of Work vs Proof of Stake',
        type: 'video',
        duration: 20,
        orderIndex: 2,
        videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
      },
      {
        id: 'l6',
        chapterId: 'ch2',
        title: 'Tìm hiểu về Hash Function',
        type: 'reading',
        duration: 8,
        orderIndex: 3,
        content: '<h2>Hash Function là gì?</h2><p>Hash function là một hàm toán học chuyển đổi dữ liệu đầu vào có kích thước bất kỳ thành một chuỗi có độ dài cố định...</p>',
      },
    ],
  },
  {
    id: 'ch3',
    title: 'Smart Contracts',
    orderIndex: 3,
    lessons: [
      {
        id: 'l7',
        chapterId: 'ch3',
        title: 'Giới thiệu Smart Contract',
        type: 'video',
        duration: 15,
        orderIndex: 1,
        videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
      },
      {
        id: 'l8',
        chapterId: 'ch3',
        title: 'Viết Smart Contract đầu tiên',
        type: 'video',
        duration: 25,
        orderIndex: 2,
        videoUrl: 'https://www.youtube.com/watch?v=SSo_EIwHSd4',
      },
    ],
  },
];

export const MOCK_COURSE_PROGRESS: CourseProgress = {
  courseId: 'course-1',
  currentLessonId: 'l3',
  completionRate: 25,
  lastAccessedAt: new Date().toISOString(),
  lessonProgress: {
    l1: { lessonId: 'l1', status: 'completed', progress: 100, completedAt: '2024-01-15T10:00:00Z' },
    l2: { lessonId: 'l2', status: 'completed', progress: 100, completedAt: '2024-01-15T11:00:00Z' },
    l3: { lessonId: 'l3', status: 'in_progress', progress: 0 },
    l4: { lessonId: 'l4', status: 'available', progress: 0 },
    l5: { lessonId: 'l5', status: 'locked', progress: 0 },
    l6: { lessonId: 'l6', status: 'locked', progress: 0 },
    l7: { lessonId: 'l7', status: 'locked', progress: 0 },
    l8: { lessonId: 'l8', status: 'locked', progress: 0 },
  },
};

