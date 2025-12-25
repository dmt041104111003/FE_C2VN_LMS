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
  description: 'Bài kiểm tra gồm 12 câu hỏi về kiến thức blockchain và cryptography. Đạt tối thiểu 60% để qua.',
  passingScore: 60,
  timeLimit: 15,
  maxAttempts: 3,
  questions: [
    {
      id: 'q1',
      type: 'single',
      content: '<p><strong>Blockchain</strong> là gì?</p><p><em>Chọn định nghĩa chính xác nhất.</em></p>',
      options: [
        { id: 'a', content: '<p>Một loại <em>tiền điện tử</em></p>' },
        { id: 'b', content: '<p>Một <strong>cơ sở dữ liệu phân tán</strong></p>' },
        { id: 'c', content: '<p>Một ngôn ngữ lập trình</p>' },
        { id: 'd', content: '<p>Một công ty công nghệ</p>' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Blockchain</strong> là một cơ sở dữ liệu phân tán, lưu trữ dữ liệu trong các khối được liên kết với nhau bằng mã hóa.</p><p>Các đặc điểm chính:</p><ul><li>Phi tập trung - không có máy chủ trung tâm</li><li>Bất biến - dữ liệu không thể thay đổi</li><li>Minh bạch - mọi người đều có thể xem</li></ul>',
      points: 20,
    },
    {
      id: 'q2',
      type: 'single',
      content: '<p>Thuật toán đồng thuận nào được <strong>Bitcoin</strong> sử dụng?</p>',
      options: [
        { id: 'a', content: '<p>Proof of Stake (<code>PoS</code>)</p>' },
        { id: 'b', content: '<p>Proof of Work (<code>PoW</code>)</p>' },
        { id: 'c', content: '<p>Delegated Proof of Stake (<code>DPoS</code>)</p>' },
        { id: 'd', content: '<p>Proof of Authority (<code>PoA</code>)</p>' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Bitcoin</strong> sử dụng thuật toán <em>Proof of Work (PoW)</em>, yêu cầu các node giải quyết các bài toán tính toán phức tạp.</p><p>Quá trình này gọi là <strong>mining</strong> (đào coin).</p><pre><code>hash(block_data + nonce) < target</code></pre>',
      points: 20,
    },
    {
      id: 'q3',
      type: 'multiple',
      content: '<p>Những <strong>đặc điểm</strong> nào sau đây là của blockchain?</p><p><em>(Chọn nhiều đáp án)</em></p>',
      options: [
        { id: 'a', content: '<p><strong>Phi tập trung</strong> (Decentralized)</p>' },
        { id: 'b', content: '<p><strong>Bất biến</strong> (Immutable)</p>' },
        { id: 'c', content: '<p><strong>Minh bạch</strong> (Transparent)</p>' },
        { id: 'd', content: '<p>Tập trung (Centralized)</p>' },
      ],
      correctAnswer: ['a', 'b', 'c'],
      explanation: '<p>Blockchain có <strong>3 đặc điểm chính</strong>:</p><ol><li><strong>Phi tập trung</strong> - Không có cơ quan kiểm soát trung tâm</li><li><strong>Bất biến</strong> - Dữ liệu đã ghi không thể sửa đổi</li><li><strong>Minh bạch</strong> - Mọi giao dịch đều công khai</li></ol><p><em>Lưu ý: Blockchain KHÔNG phải là hệ thống tập trung.</em></p>',
      points: 20,
    },
    {
      id: 'q4',
      type: 'single',
      content: '<p><strong>Smart Contract</strong> là gì?</p><p>Xem ví dụ code bên dưới:</p><pre><code>contract Token {\n  mapping(address => uint) balance;\n}</code></pre>',
      options: [
        { id: 'a', content: '<p>Hợp đồng giấy được số hóa</p>' },
        { id: 'b', content: '<p>Chương trình <strong>tự động thực thi</strong> trên blockchain</p>' },
        { id: 'c', content: '<p>Hợp đồng giữa các sàn giao dịch</p>' },
        { id: 'd', content: '<p>Ứng dụng di động</p>' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Smart Contract</strong> là các chương trình được lưu trữ trên blockchain và <em>tự động thực thi</em> khi các điều kiện được đáp ứng.</p><p>Ví dụ code Solidity:</p><pre><code>function transfer(address to, uint amount) public {\n  require(balance[msg.sender] >= amount);\n  balance[msg.sender] -= amount;\n  balance[to] += amount;\n}</code></pre>',
      points: 20,
    },
    {
      id: 'q5',
      type: 'single',
      content: '<p><strong>Cardano</strong> sử dụng thuật toán đồng thuận nào?</p><p><em>Gợi ý: Đây là thuật toán tiết kiệm năng lượng.</em></p>',
      options: [
        { id: 'a', content: '<p>Proof of Work</p>' },
        { id: 'b', content: '<p><strong>Ouroboros</strong> (Proof of Stake)</p>' },
        { id: 'c', content: '<p>Tendermint</p>' },
        { id: 'd', content: '<p>PBFT</p>' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Cardano</strong> sử dụng <em>Ouroboros</em>, một giao thức <strong>Proof of Stake</strong> được chứng minh an toàn về mặt toán học.</p><p>Ưu điểm của PoS so với PoW:</p><ul><li>Tiết kiệm năng lượng</li><li>Nhanh hơn</li><li>Phí thấp hơn</li></ul>',
      points: 20,
    },
    {
      id: 'q6',
      type: 'single',
      content: '<p>Trong thuật toán <strong>SHA-256</strong>, độ dài output là bao nhiêu?</p><p>Công thức: $2^8 = 256$ bits</p>',
      options: [
        { id: 'a', content: '<p>128 bits</p>' },
        { id: 'b', content: '<p>256 bits</p>' },
        { id: 'c', content: '<p>512 bits</p>' },
        { id: 'd', content: '<p>1024 bits</p>' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>SHA-256</strong> tạo ra hash có độ dài <strong>256 bits</strong> (32 bytes).</p><p>Công thức:</p><ul><li>Output: $2^8 = 256$ bits</li><li>Hex characters: $\\frac{256}{4} = 64$ ký tự</li></ul><p>Ví dụ hash:</p><pre><code>e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855</code></pre>',
      points: 20,
    },
    {
      id: 'q7',
      type: 'single',
      content: '<p>Tính xác suất để một miner tìm được block hợp lệ nếu <strong>difficulty target</strong> là:</p><p>$$P = \\frac{target}{2^{256}}$$</p><p>Với $target = 2^{240}$, xác suất P là bao nhiêu?</p>',
      options: [
        { id: 'a', content: '<p>$P = \\frac{1}{2^8} = \\frac{1}{256}$</p>' },
        { id: 'b', content: '<p>$P = \\frac{1}{2^{16}} = \\frac{1}{65536}$</p>' },
        { id: 'c', content: '<p>$P = \\frac{1}{2^{32}}$</p>' },
        { id: 'd', content: '<p>$P = \\frac{1}{2^{64}}$</p>' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Giải:</strong></p><p>$$P = \\frac{target}{2^{256}} = \\frac{2^{240}}{2^{256}} = 2^{240-256} = 2^{-16} = \\frac{1}{65536}$$</p><p>Nghĩa là trung bình cần thử <strong>65,536 lần</strong> hash để tìm được block hợp lệ.</p>',
      points: 20,
    },
    {
      id: 'q8',
      type: 'multiple',
      content: '<p>Cho hàm hash $H(x)$, những tính chất nào sau đây là <em>bắt buộc</em> cho một hàm hash mật mã?</p><p>Định nghĩa:</p><ul><li><strong>Pre-image resistance:</strong> Cho $y$, khó tìm $x$ sao cho $H(x) = y$</li><li><strong>Collision resistance:</strong> Khó tìm $x_1 \\neq x_2$ sao cho $H(x_1) = H(x_2)$</li></ul>',
      options: [
        { id: 'a', content: '<p><strong>Pre-image resistance</strong> - Khó đảo ngược</p>' },
        { id: 'b', content: '<p><strong>Second pre-image resistance</strong> - Khó tìm $x_2$ từ $x_1$</p>' },
        { id: 'c', content: '<p><strong>Collision resistance</strong> - Khó tìm 2 input trùng hash</p>' },
        { id: 'd', content: '<p>Output phải có độ dài cố định</p>' },
      ],
      correctAnswer: ['a', 'b', 'c', 'd'],
      explanation: '<p>Một hàm hash mật mã <strong>an toàn</strong> cần có <em>tất cả</em> các tính chất:</p><ol><li><strong>Pre-image:</strong> $H(x) = y \\Rightarrow$ không thể tìm $x$</li><li><strong>Second pre-image:</strong> Cho $x_1$, không thể tìm $x_2 \\neq x_1$ có $H(x_1) = H(x_2)$</li><li><strong>Collision:</strong> Không thể tìm bất kỳ cặp $(x_1, x_2)$ nào trùng hash</li><li><strong>Fixed output:</strong> Mọi input → output cùng độ dài</li></ol><p>Độ khó tấn công collision: $O(2^{n/2})$ với birthday attack</p>',
      points: 20,
    },
    {
      id: 'q9',
      type: 'single',
      content: '<p>Trong mật mã học elliptic curve, cho điểm $G$ trên đường cong và số nguyên $k$, tính:</p><p>$$P = k \\times G$$</p><p>Nếu $k = 3$ và $G = (2, 5)$ trên đường cong $y^2 = x^3 + 7 \\pmod{11}$, thì phép tính nào đúng?</p>',
      options: [
        { id: 'a', content: '<p>$P = G + G + G$ (cộng điểm 3 lần)</p>' },
        { id: 'b', content: '<p>$P = 3 \\times (x, y) = (3x, 3y)$</p>' },
        { id: 'c', content: '<p>$P = G^3$</p>' },
        { id: 'd', content: '<p>$P = \\frac{G}{3}$</p>' },
      ],
      correctAnswer: 'a',
      explanation: '<p>Trong <strong>Elliptic Curve Cryptography</strong>:</p><ul><li>$k \\times G$ nghĩa là cộng điểm $G$ với chính nó $k$ lần</li><li>$3 \\times G = G + G + G$ (phép cộng điểm trên đường cong)</li></ul><p>Công thức cộng điểm:</p><p>$$\\lambda = \\frac{y_2 - y_1}{x_2 - x_1} \\pmod{p}$$</p><p>$$x_3 = \\lambda^2 - x_1 - x_2 \\pmod{p}$$</p><p>$$y_3 = \\lambda(x_1 - x_3) - y_1 \\pmod{p}$$</p><p>Đây là nền tảng của <strong>ECDSA</strong> trong Bitcoin và Ethereum.</p>',
      points: 20,
    },
    {
      id: 'q10',
      type: 'single',
      content: '<p>Tính <strong>gas fee</strong> cho giao dịch Ethereum:</p><p>$$\\text{Gas Fee} = \\text{Gas Used} \\times \\text{Gas Price}$$</p><p>Nếu:</p><ul><li>Gas Used = 21,000 (transfer cơ bản)</li><li>Gas Price = 50 Gwei = $50 \\times 10^{-9}$ ETH</li></ul><p>Gas Fee là bao nhiêu ETH?</p>',
      options: [
        { id: 'a', content: '<p>$0.00105 \\text{ ETH} = 21000 \\times 50 \\times 10^{-9}$</p>' },
        { id: 'b', content: '<p>0.0105 ETH</p>' },
        { id: 'c', content: '<p>1.05 ETH</p>' },
        { id: 'd', content: '<p>0.000105 ETH</p>' },
      ],
      correctAnswer: 'a',
      explanation: '<p><strong>Tính toán:</strong></p><p>$$\\text{Gas Fee} = 21000 \\times 50 \\times 10^{-9} = 1.05 \\times 10^{-3} = 0.00105 \\text{ ETH}$$</p><p>Đơn vị Ethereum:</p><ul><li>$1 \\text{ ETH} = 10^{18} \\text{ Wei}$</li><li>$1 \\text{ Gwei} = 10^{9} \\text{ Wei} = 10^{-9} \\text{ ETH}$</li></ul>',
      points: 20,
    },
    {
      id: 'q11',
      type: 'single',
      content: '<p>Trong <strong>Merkle Tree</strong>, nếu có <strong>n</strong> giao dịch, chiều cao của cây là:</p><p>$$h = \\lceil \\log_2(n) \\rceil$$</p><p>Với 1000 giao dịch, cần bao nhiêu hash để verify một giao dịch (Merkle Proof)?</p>',
      options: [
        { id: 'a', content: '<p>1000 hash</p>' },
        { id: 'b', content: '<p>$\\lceil \\log_2(1000) \\rceil = 10$ hash</p>' },
        { id: 'c', content: '<p>500 hash</p>' },
        { id: 'd', content: '<p>$\\lceil \\sqrt{1000} \\rceil \\approx 32$ hash</p>' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Merkle Proof</strong> chỉ cần $\\log_2(n)$ hash:</p><p>$$\\log_2(1000) \\approx 9.97 \\Rightarrow \\lceil 9.97 \\rceil = 10 \\text{ hash}$$</p><p>Cấu trúc Merkle Tree:</p><pre><code>       Root\n      /    \\\n    H₁₂    H₃₄\n   /  \\   /  \\\n  H₁  H₂ H₃  H₄\n  |   |   |   |\n TX₁ TX₂ TX₃ TX₄</code></pre><p>Độ phức tạp: $O(\\log n)$ thay vì $O(n)$</p>',
      points: 20,
    },
    {
      id: 'q12',
      type: 'single',
      content: '<p>Tính <strong>Annual Percentage Yield (APY)</strong> trong DeFi staking:</p><p>$$APY = \\left(1 + \\frac{r}{n}\\right)^n - 1$$</p><p>Với:</p><ul><li>$r = 12\\%$ (lãi suất năm)</li><li>$n = 12$ (compound hàng tháng)</li></ul><p>APY gần bằng bao nhiêu?</p>',
      options: [
        { id: 'a', content: '<p>12.00%</p>' },
        { id: 'b', content: '<p>$12.68\\% \\approx \\left(1 + \\frac{0.12}{12}\\right)^{12} - 1$</p>' },
        { id: 'c', content: '<p>14.40%</p>' },
        { id: 'd', content: '<p>11.39%</p>' },
      ],
      correctAnswer: 'b',
      explanation: '<p><strong>Tính APY:</strong></p><p>$$APY = \\left(1 + \\frac{0.12}{12}\\right)^{12} - 1 = (1.01)^{12} - 1 = 1.1268 - 1 = 12.68\\%$$</p><p>APY > APR do hiệu ứng <em>compound interest</em> (lãi kép).</p>',
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

