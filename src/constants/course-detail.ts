import type { CourseFormData, QuizType } from '@/types/course-create';

import type { CourseActivity, ActivityType } from '@/types/course-detail';
import type { TabItem } from '@/components/ui/ui.types';

export const OPTION_LABELS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'] as const;

export const QUIZ_TYPE_VARIANT: Record<QuizType, 'warning' | 'info'> = {
  final: 'warning',
  chapter: 'info',
  lecture: 'info',
};

export const COURSE_DETAIL_TABS: TabItem[] = [
  { key: 'content', label: 'Nội dung khóa học' },
  { key: 'history', label: 'Lịch sử hoạt động' },
];

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  course_created: 'Tạo khóa học',
  course_updated: 'Cập nhật khóa học',
  course_published: 'Xuất bản khóa học',
  course_unpublished: 'Ẩn khóa học',
  student_added: 'Thêm học viên',
  student_removed: 'Xóa học viên',
  certificate_issued: 'Cấp chứng chỉ',
  chapter_added: 'Thêm chương',
  lecture_added: 'Thêm bài giảng',
  quiz_added: 'Thêm bài kiểm tra',
};


export const ACTIVITY_ITEMS_PER_PAGE = 10;

export const PERIOD_FILTER_OPTIONS = [
  { value: 'all', label: 'Tất cả' },
  { value: 'week', label: 'Tuần này' },
  { value: 'month', label: 'Tháng này' },
  { value: 'quarter', label: 'Quý này' },
  { value: 'year', label: 'Năm nay' },
];

export const MOCK_COURSE_ACTIVITIES: Record<string, CourseActivity[]> = {
  '1': [
    { id: 'a1', type: 'certificate_issued', description: 'Cấp chứng chỉ cho Nguyễn Văn A', user: 'Admin', timestamp: '2024-12-27T10:30:00' },
    { id: 'a2', type: 'student_added', description: 'Thêm học viên Trần Thị B vào khóa học', user: 'Admin', timestamp: '2024-12-27T09:20:00' },
    { id: 'a3', type: 'course_updated', description: 'Cập nhật mô tả khóa học', user: 'Instructor', timestamp: '2024-12-26T15:15:00' },
    { id: 'a4', type: 'lecture_added', description: 'Thêm bài giảng "SSR vs SSG" vào Chương 3', user: 'Instructor', timestamp: '2024-12-26T14:45:00' },
    { id: 'a5', type: 'quiz_added', description: 'Thêm bài kiểm tra cuối khóa', user: 'Instructor', timestamp: '2024-12-26T11:00:00' },
    { id: 'a6', type: 'chapter_added', description: 'Thêm Chương 3: Next.js Fundamentals', user: 'Instructor', timestamp: '2024-12-25T15:30:00' },
    { id: 'a7', type: 'student_added', description: 'Thêm học viên Lê Văn C vào khóa học', user: 'Admin', timestamp: '2024-12-25T10:00:00' },
    { id: 'a8', type: 'certificate_issued', description: 'Cấp chứng chỉ cho Hoàng Văn D', user: 'Admin', timestamp: '2024-12-24T16:00:00' },
    { id: 'a9', type: 'student_added', description: 'Thêm học viên Phạm Thị E vào khóa học', user: 'Admin', timestamp: '2024-12-24T14:30:00' },
    { id: 'a10', type: 'lecture_added', description: 'Thêm bài giảng "Custom Hooks"', user: 'Instructor', timestamp: '2024-12-24T09:00:00' },
    { id: 'a11', type: 'course_updated', description: 'Cập nhật giá khóa học từ 40,000,000 đ lên 45,000,000 đ', user: 'Admin', timestamp: '2024-12-23T14:30:00' },
    { id: 'a12', type: 'student_added', description: 'Thêm học viên Vũ Văn F vào khóa học', user: 'Admin', timestamp: '2024-12-23T10:00:00' },
    { id: 'a13', type: 'quiz_added', description: 'Thêm bài kiểm tra React Hooks', user: 'Instructor', timestamp: '2024-12-22T16:00:00' },
    { id: 'a14', type: 'lecture_added', description: 'Thêm bài giảng "useCallback và useMemo"', user: 'Instructor', timestamp: '2024-12-22T11:00:00' },
    { id: 'a15', type: 'chapter_added', description: 'Thêm Chương 2: React Hooks', user: 'Instructor', timestamp: '2024-12-21T15:00:00' },
    { id: 'a16', type: 'student_added', description: 'Thêm học viên Đặng Thị G vào khóa học', user: 'Admin', timestamp: '2024-12-21T09:00:00' },
    { id: 'a17', type: 'course_published', description: 'Xuất bản khóa học', user: 'Instructor', timestamp: '2024-12-20T08:00:00' },
    { id: 'a18', type: 'lecture_added', description: 'Thêm bài giảng "JSX và Components"', user: 'Instructor', timestamp: '2024-12-19T14:00:00' },
    { id: 'a19', type: 'lecture_added', description: 'Thêm bài giảng "React là gì?"', user: 'Instructor', timestamp: '2024-12-19T10:00:00' },
    { id: 'a20', type: 'chapter_added', description: 'Thêm Chương 1: Giới thiệu React', user: 'Instructor', timestamp: '2024-12-18T15:00:00' },
    { id: 'a21', type: 'course_updated', description: 'Cập nhật mô tả khóa học', user: 'Instructor', timestamp: '2024-12-18T10:00:00' },
    { id: 'a22', type: 'course_created', description: 'Tạo khóa học "Lập trình Web với React & Next.js"', user: 'Instructor', timestamp: '2024-12-15T09:00:00' },
    { id: 'a23', type: 'student_added', description: 'Thêm học viên Bùi Văn H vào khóa học', user: 'Admin', timestamp: '2024-11-28T10:00:00' },
    { id: 'a24', type: 'certificate_issued', description: 'Cấp chứng chỉ cho Trịnh Văn I', user: 'Admin', timestamp: '2024-11-25T14:00:00' },
    { id: 'a25', type: 'student_added', description: 'Thêm học viên Lý Thị K vào khóa học', user: 'Admin', timestamp: '2024-11-20T09:00:00' },
    { id: 'a26', type: 'course_updated', description: 'Cập nhật thumbnail khóa học', user: 'Instructor', timestamp: '2024-10-15T11:00:00' },
    { id: 'a27', type: 'student_added', description: 'Thêm học viên Ngô Văn L vào khóa học', user: 'Admin', timestamp: '2024-10-10T10:00:00' },
    { id: 'a28', type: 'lecture_added', description: 'Thêm bài giảng bonus "Tips & Tricks"', user: 'Instructor', timestamp: '2024-09-20T15:00:00' },
  ],
  '2': [
    { id: 'b1', type: 'certificate_issued', description: 'Cấp chứng chỉ cho Phạm Văn D', user: 'Admin', timestamp: '2024-12-26T11:00:00' },
    { id: 'b2', type: 'student_removed', description: 'Xóa học viên Hoàng Thị E khỏi khóa học', user: 'Admin', timestamp: '2024-12-25T16:00:00' },
    { id: 'b3', type: 'course_published', description: 'Xuất bản khóa học', user: 'Instructor', timestamp: '2024-12-20T10:00:00' },
    { id: 'b4', type: 'course_created', description: 'Tạo khóa học "NodeJS Backend Development"', user: 'Instructor', timestamp: '2024-12-18T09:00:00' },
  ],
  '3': [
    { id: 'c1', type: 'course_unpublished', description: 'Tạm ẩn khóa học để cập nhật nội dung', user: 'Instructor', timestamp: '2024-12-27T08:00:00' },
    { id: 'c2', type: 'lecture_added', description: 'Thêm bài giảng "Phân phối xác suất"', user: 'Instructor', timestamp: '2024-12-26T15:00:00' },
    { id: 'c3', type: 'course_published', description: 'Xuất bản khóa học', user: 'Instructor', timestamp: '2024-12-22T10:00:00' },
    { id: 'c4', type: 'course_created', description: 'Tạo khóa học "Toán cao cấp cho Machine Learning"', user: 'Instructor', timestamp: '2024-12-20T09:00:00' },
  ],
};

export const COURSE_DETAIL_LABELS = {
  title: 'Chi tiết khóa học',
  back: 'Quay lại',
  edit: 'Chỉnh sửa',
  delete: 'Xóa',
  notFound: 'Không tìm thấy khóa học',
  stats: 'Thống kê',
  chapterPrefix: 'Chương',
  lecturePrefix: 'Bài',
  questionPrefix: 'Câu',
  questionList: 'Danh sách câu hỏi',
  lectureList: 'Danh sách bài giảng',
  quizType: {
    final: 'Cuối khóa',
    chapter: 'Chương',
    lecture: 'Bài giảng',
  },
  sections: {
    info: 'Thông tin cơ bản',
    description: 'Mô tả khóa học',
    chapters: 'Nội dung khóa học',
    quizzes: 'Bài kiểm tra',
  },
  fields: {
    title: 'Tên khóa học',
    price: 'Giá',
    status: 'Trạng thái',
    chapters: 'chương',
    lectures: 'bài giảng',
    quizzes: 'bài kiểm tra',
    questions: 'câu hỏi',
    explanation: 'Giải thích',
    noExplanation: 'Chưa có giải thích',
  },
  empty: {
    description: 'Chưa có mô tả',
    chapters: 'Chưa có nội dung',
    quizzes: 'Chưa có bài kiểm tra',
    lectures: 'Chưa có bài giảng',
    questions: 'Chưa có câu hỏi',
  },
  deleteModal: {
    title: 'Xóa khóa học',
    message: 'Bạn có chắc muốn xóa khóa học này? Hành động không thể hoàn tác.',
  },
  toast: {
    deleteSuccess: 'Đã xóa khóa học thành công',
  },
  activity: {
    empty: 'Chưa có hoạt động nào',
    by: 'bởi',
    loadMore: 'Đang tải thêm...',
    noMore: 'Đã hiển thị tất cả hoạt động',
  },
  periodFilter: 'Thời gian',
} as const;

export const COURSE_DETAIL_STYLES = {
  header: 'flex items-center justify-between mb-6',
  content: 'space-y-8',
  infoGrid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4',
  section: {
    title: 'text-lg font-semibold text-[var(--text)] mb-4',
  },
  card: {
    base: 'bg-[var(--bg)] rounded-xl border border-[var(--border)]',
    padding: 'p-4',
    paddingLg: 'p-5',
    paddingXl: 'p-6',
    item: 'bg-[var(--bg)] border border-[var(--border)] rounded-lg p-5',
  },
  navigator: {
    wrapper: 'p-5',
    grid: 'flex flex-col lg:flex-row gap-6',
    sidebar: 'lg:w-56 flex-shrink-0',
    main: 'flex-1 min-w-0',
  },
  activity: {
    container: '',
    group: '',
    groupDate: 'py-3 text-xs font-medium text-[var(--text)]/50 uppercase tracking-wider border-b border-[var(--border)]',
    list: 'divide-y divide-[var(--border)] pl-6',
    item: 'py-3 flex items-start gap-4',
    content: 'flex-1 min-w-0',
    description: 'text-sm text-[var(--text)]',
    meta: 'mt-0.5 text-xs text-[var(--text)]/50',
    time: 'flex-shrink-0 text-xs text-[var(--text)]/40 mt-0.5',
    loadMore: 'py-4 text-center text-sm text-[var(--text)]/40',
    loader: 'flex justify-center py-4',
  },
  infoCard: {
    label: 'text-xs text-[var(--text)]/50 mb-1',
    value: 'font-medium text-[var(--text)] truncate',
  },
  chapter: {
    container: 'space-y-4',
    header: 'px-5 py-4 bg-[var(--bg-alt)]/50 border-b border-[var(--border)]',
    title: 'font-semibold text-[var(--text)]',
    subtitle: 'text-sm text-[var(--text)]/50 mt-1',
    list: 'divide-y divide-[var(--border)]',
    item: 'p-5',
    itemHeader: 'flex items-center gap-3',
    index: 'w-7 h-7 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium flex items-center justify-center flex-shrink-0',
    lectureTitle: 'font-medium text-[var(--text)]',
    lectureContent: 'mt-4 pl-10 text-sm',
    lectureVideo: 'mt-4 pl-10',
  },
  quiz: {
    container: 'space-y-4',
    header: 'px-5 py-4 bg-[var(--bg-alt)]/50 border-b border-[var(--border)] flex items-center justify-between',
    title: 'font-semibold text-[var(--text)]',
    count: 'text-sm text-[var(--text)]/50',
    questions: 'divide-y divide-[var(--border)]',
    question: 'p-5',
    questionHeader: 'flex items-start gap-3',
    questionIndex: 'w-7 h-7 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] text-sm font-medium flex items-center justify-center flex-shrink-0',
    questionText: 'font-medium text-[var(--text)] flex-1',
    options: 'space-y-2 pl-10 mt-3',
    option: 'flex items-center gap-2 text-sm',
    optionIndex: 'w-5 h-5 rounded-full border border-[var(--border)] text-xs flex items-center justify-center flex-shrink-0',
    optionCorrect: 'w-5 h-5 rounded-full bg-[var(--correct)] text-white text-xs flex items-center justify-center flex-shrink-0',
    optionText: 'text-[var(--text)]',
    explanation: 'pl-10 mt-3 p-3 bg-[var(--bg-alt)]/50 rounded-lg',
    explanationLabel: 'text-xs text-[var(--text)]/50 mb-1',
    explanationText: 'text-sm text-[var(--text)]',
  },
  empty: 'bg-[var(--bg-alt)]/30 rounded-xl p-8 text-center text-[var(--text)]/50',
} as const;

export const MOCK_COURSE_DETAILS: Record<string, CourseFormData> = {
  '1': {
    title: 'Lập trình Web với React & Next.js',
    description: `<h2>Giới thiệu khóa học</h2>
<p>Khóa học này sẽ giúp bạn làm chủ <strong>React</strong> và <strong>Next.js</strong> từ cơ bản đến nâng cao. Bạn sẽ học cách xây dựng các ứng dụng web hiện đại, tối ưu hiệu suất và SEO.</p>

<h3>Bạn sẽ học được gì?</h3>
<ul>
<li>Hiểu sâu về React Hooks, Context API, và State Management</li>
<li>Server-Side Rendering (SSR) và Static Site Generation (SSG) với Next.js</li>
<li>API Routes và Backend Integration</li>
<li>Authentication và Authorization</li>
<li>Deployment và CI/CD</li>
</ul>

<h3>Yêu cầu</h3>
<p>Kiến thức cơ bản về HTML, CSS, JavaScript. Có kinh nghiệm với TypeScript là một lợi thế.</p>

<blockquote>
<p>"Khóa học rất chi tiết và dễ hiểu. Tôi đã có thể xây dựng portfolio của mình sau khi hoàn thành!" - Học viên</p>
</blockquote>`,
    price: 45000000,
    status: 'published',
    chapters: [
      {
        id: 'ch1',
        title: 'Giới thiệu React',
        lectures: [
          { 
            id: 'l1', 
            title: 'React là gì?', 
            content: `<h3>Tổng quan về React</h3>
<p>React là một <strong>thư viện JavaScript</strong> để xây dựng giao diện người dùng (UI). Được phát triển bởi Facebook, React giúp tạo các ứng dụng web nhanh và hiệu quả.</p>
<h4>Đặc điểm chính:</h4>
<ul>
<li><strong>Component-based</strong>: Chia UI thành các thành phần nhỏ, có thể tái sử dụng</li>
<li><strong>Virtual DOM</strong>: Tối ưu hiệu suất render</li>
<li><strong>Declarative</strong>: Code dễ đọc và dễ debug</li>
</ul>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l2', 
            title: 'JSX và Components', 
            content: `<h3>JSX là gì?</h3>
<p>JSX (JavaScript XML) là cú pháp mở rộng cho JavaScript, cho phép viết HTML trong JavaScript.</p>
<pre><code>const element = &lt;h1&gt;Hello, world!&lt;/h1&gt;;</code></pre>
<h4>Tạo Component</h4>
<p>Component là khối xây dựng cơ bản của React. Có 2 loại:</p>
<ul>
<li><strong>Function Component</strong>: Sử dụng function</li>
<li><strong>Class Component</strong>: Sử dụng class (ít dùng)</li>
</ul>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
      {
        id: 'ch2',
        title: 'React Hooks',
        lectures: [
          { 
            id: 'l3', 
            title: 'useState và useEffect', 
            content: `<h3>useState Hook</h3>
<p>useState cho phép bạn thêm state vào function component:</p>
<pre><code>const [count, setCount] = useState(0);</code></pre>

<h3>useEffect Hook</h3>
<p>useEffect xử lý side effects như API calls, subscriptions:</p>
<pre><code>useEffect(() => {
  document.title = \`Count: \${count}\`;
}, [count]);</code></pre>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l4', 
            title: 'useCallback và useMemo', 
            content: `<h3>Tối ưu Performance</h3>
<p><strong>useCallback</strong>: Memoize function để tránh tạo lại không cần thiết</p>
<p><strong>useMemo</strong>: Memoize giá trị computed để tránh tính toán lại</p>
<h4>Khi nào sử dụng?</h4>
<ul>
<li>Component con nhận props là function/object</li>
<li>Tính toán phức tạp, tốn thời gian</li>
</ul>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l5', 
            title: 'Custom Hooks', 
            content: `<h3>Tạo Custom Hook</h3>
<p>Custom Hook cho phép tái sử dụng logic giữa các component. Quy tắc:</p>
<ul>
<li>Tên bắt đầu bằng <code>use</code></li>
<li>Có thể gọi các Hook khác bên trong</li>
</ul>
<h4>Ví dụ: useLocalStorage</h4>
<pre><code>function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });
  // ...
}</code></pre>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
      {
        id: 'ch3',
        title: 'Next.js Fundamentals',
        lectures: [
          { 
            id: 'l6', 
            title: 'Pages và Routing', 
            content: `<h3>File-based Routing</h3>
<p>Next.js sử dụng hệ thống routing dựa trên file system:</p>
<ul>
<li><code>pages/index.js</code> → <code>/</code></li>
<li><code>pages/about.js</code> → <code>/about</code></li>
<li><code>pages/blog/[slug].js</code> → <code>/blog/:slug</code></li>
</ul>
<h4>App Router (Next.js 13+)</h4>
<p>Sử dụng thư mục <code>app/</code> với layout, loading, error handling tích hợp.</p>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l7', 
            title: 'SSR vs SSG', 
            content: `<h3>Server-Side Rendering (SSR)</h3>
<p>HTML được tạo trên server cho mỗi request. Phù hợp cho nội dung động.</p>

<h3>Static Site Generation (SSG)</h3>
<p>HTML được tạo tại build time. Phù hợp cho nội dung tĩnh, tối ưu hiệu suất.</p>

<h4>So sánh</h4>
<table>
<tr><th>SSR</th><th>SSG</th></tr>
<tr><td>Render mỗi request</td><td>Render tại build time</td></tr>
<tr><td>Data luôn mới nhất</td><td>Cần rebuild để update</td></tr>
<tr><td>Chậm hơn (TTFB)</td><td>Nhanh hơn</td></tr>
</table>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q1',
        title: 'Kiểm tra React cơ bản',
        type: 'chapter',
        chapterId: 'ch1',
        questions: [
          { 
            id: 'qs1', 
            question: '<p>React được phát triển bởi công ty nào?</p>', 
            options: ['Google', 'Facebook (Meta)', 'Microsoft', 'Amazon'], 
            correctIndexes: [1], 
            explanation: '<p>React được phát triển và duy trì bởi <strong>Facebook</strong> (nay là Meta) từ năm 2013. Jordan Walke là người tạo ra React.</p>' 
          },
          { 
            id: 'qs2', 
            question: '<p>JSX là viết tắt của từ gì?</p>', 
            options: ['JavaScript XML', 'Java Syntax Extension', 'JSON XML', 'JavaScript Extension'], 
            correctIndexes: [0], 
            explanation: '<p><strong>JSX = JavaScript XML</strong>. Đây là cú pháp mở rộng cho JavaScript, cho phép viết cấu trúc giống HTML trong code JavaScript.</p>' 
          },
          { 
            id: 'qs3', 
            question: '<p>Những đặc điểm nào là của React? (Chọn nhiều đáp án)</p>', 
            options: ['Component-based', 'Two-way data binding', 'Virtual DOM', 'Declarative'], 
            correctIndexes: [0, 2, 3], 
            explanation: '<p>React có 3 đặc điểm chính: <strong>Component-based</strong>, <strong>Virtual DOM</strong>, và <strong>Declarative</strong>. Two-way data binding là đặc điểm của Angular, không phải React.</p>' 
          },
        ],
      },
      {
        id: 'q2',
        title: 'Kiểm tra React Hooks',
        type: 'chapter',
        chapterId: 'ch2',
        questions: [
          { 
            id: 'qs4', 
            question: '<p>Hook nào dùng để quản lý <strong>side effects</strong> trong React?</p>', 
            options: ['useState', 'useEffect', 'useContext', 'useReducer'], 
            correctIndexes: [1], 
            explanation: '<p><strong>useEffect</strong> được sử dụng để xử lý side effects như: gọi API, thao tác DOM, subscriptions, timers...</p>' 
          },
          { 
            id: 'qs5', 
            question: '<p>Khi nào nên sử dụng <code>useMemo</code>?</p>', 
            options: [
              'Khi cần lưu trữ state', 
              'Khi có tính toán phức tạp cần cache', 
              'Khi gọi API', 
              'Khi cần navigate giữa các trang'
            ], 
            correctIndexes: [1], 
            explanation: '<p><strong>useMemo</strong> dùng để memoize kết quả tính toán phức tạp, tránh tính toán lại không cần thiết khi component re-render.</p>' 
          },
        ],
      },
      {
        id: 'q3',
        title: 'Bài kiểm tra cuối khóa',
        type: 'final',
        questions: [
          { 
            id: 'qs6', 
            question: '<p>Next.js sử dụng phương pháp routing nào?</p>', 
            options: ['Config-based routing', 'File-based routing', 'Hash routing', 'Memory routing'], 
            correctIndexes: [1], 
            explanation: '<p>Next.js sử dụng <strong>File-based routing</strong>: cấu trúc thư mục <code>pages/</code> hoặc <code>app/</code> quyết định routes của ứng dụng.</p>' 
          },
          { 
            id: 'qs7', 
            question: '<p>SSG (Static Site Generation) phù hợp với loại nội dung nào?</p>', 
            options: [
              'Nội dung thay đổi theo user', 
              'Nội dung realtime', 
              'Nội dung tĩnh, ít thay đổi', 
              'Dashboard với dữ liệu live'
            ], 
            correctIndexes: [2], 
            explanation: '<p><strong>SSG</strong> phù hợp với nội dung tĩnh như: blog, documentation, landing page... vì HTML được tạo sẵn tại build time, tải nhanh và SEO tốt.</p>' 
          },
          { 
            id: 'qs8', 
            question: '<p>Các lợi ích của việc sử dụng Custom Hook là gì? (Chọn nhiều đáp án)</p>', 
            options: [
              'Tái sử dụng logic giữa các component', 
              'Tăng tốc độ render', 
              'Code dễ đọc và maintain', 
              'Giảm kích thước bundle'
            ], 
            correctIndexes: [0, 2], 
            explanation: '<p>Custom Hook giúp <strong>tái sử dụng logic</strong> và làm <strong>code dễ đọc</strong> hơn. Nó không ảnh hưởng trực tiếp đến tốc độ render hay bundle size.</p>' 
          },
        ],
      },
    ],
  },
  '2': {
    title: 'NodeJS Backend Development',
    description: `<h2>Xây dựng Backend chuyên nghiệp với Node.js</h2>
<p>Học cách xây dựng <strong>REST API</strong>, <strong>GraphQL</strong>, và <strong>microservices</strong> với Node.js và Express.</p>

<h3>Nội dung khóa học</h3>
<ul>
<li>Cài đặt và cấu hình môi trường Node.js</li>
<li>Express.js framework</li>
<li>RESTful API design patterns</li>
<li>Database integration (MongoDB, PostgreSQL)</li>
<li>Authentication với JWT</li>
<li>Testing và Deployment</li>
</ul>

<h3>Đối tượng phù hợp</h3>
<p>Lập trình viên Frontend muốn học Backend, hoặc người mới bắt đầu với JavaScript.</p>`,
    price: 28500000,
    status: 'published',
    chapters: [
      {
        id: 'ch1',
        title: 'Node.js Fundamentals',
        lectures: [
          { 
            id: 'l1', 
            title: 'Giới thiệu Node.js', 
            content: `<h3>Node.js là gì?</h3>
<p>Node.js là một <strong>runtime environment</strong> cho phép chạy JavaScript trên server. Được xây dựng trên V8 JavaScript engine của Chrome.</p>
<h4>Event Loop</h4>
<p>Node.js sử dụng mô hình <strong>event-driven, non-blocking I/O</strong> giúp xử lý nhiều request đồng thời hiệu quả.</p>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l2', 
            title: 'NPM và Package Management', 
            content: `<h3>NPM - Node Package Manager</h3>
<p>NPM là công cụ quản lý packages của Node.js:</p>
<ul>
<li><code>npm init</code> - Khởi tạo project</li>
<li><code>npm install</code> - Cài đặt dependencies</li>
<li><code>npm run</code> - Chạy scripts</li>
</ul>
<h4>package.json</h4>
<p>File cấu hình project, chứa thông tin dependencies, scripts, metadata.</p>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l3', 
            title: 'Modules trong Node.js', 
            content: `<h3>CommonJS vs ES Modules</h3>
<h4>CommonJS (cũ)</h4>
<pre><code>const express = require('express');
module.exports = myFunction;</code></pre>
<h4>ES Modules (mới)</h4>
<pre><code>import express from 'express';
export default myFunction;</code></pre>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
      {
        id: 'ch2',
        title: 'Express.js Framework',
        lectures: [
          { 
            id: 'l4', 
            title: 'Cài đặt Express', 
            content: `<h3>Setup Express Project</h3>
<pre><code>npm init -y
npm install express
</code></pre>
<h4>Hello World</h4>
<pre><code>const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(3000);</code></pre>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l5', 
            title: 'Routing và Middleware', 
            content: `<h3>Routing trong Express</h3>
<p>Định nghĩa các endpoints xử lý HTTP requests:</p>
<pre><code>app.get('/users', getUsers);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);</code></pre>

<h3>Middleware</h3>
<p>Functions xử lý request trước khi đến route handler:</p>
<pre><code>app.use(express.json()); // Parse JSON body
app.use(cors()); // Enable CORS
app.use(authMiddleware); // Custom middleware</code></pre>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l6', 
            title: 'Error Handling', 
            content: `<h3>Xử lý lỗi trong Express</h3>
<p>Sử dụng error handling middleware:</p>
<pre><code>app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!' 
  });
});</code></pre>
<h4>Best Practices</h4>
<ul>
<li>Luôn wrap async code trong try-catch</li>
<li>Sử dụng custom error classes</li>
<li>Log errors đầy đủ</li>
</ul>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
      {
        id: 'ch3',
        title: 'Database Integration',
        lectures: [
          { 
            id: 'l7', 
            title: 'MongoDB với Mongoose', 
            content: `<h3>MongoDB - NoSQL Database</h3>
<p>MongoDB lưu trữ dữ liệu dưới dạng documents (JSON-like).</p>
<h4>Mongoose ODM</h4>
<pre><code>const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);</code></pre>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l8', 
            title: 'PostgreSQL với Prisma', 
            content: `<h3>PostgreSQL - Relational Database</h3>
<p>PostgreSQL là hệ quản trị cơ sở dữ liệu quan hệ mạnh mẽ.</p>
<h4>Prisma ORM</h4>
<pre><code>// schema.prisma
model User {
  id    Int     @id @default(autoincrement())
  email String  @unique
  name  String?
  posts Post[]
}

// Usage
const users = await prisma.user.findMany();</code></pre>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q1',
        title: 'Kiểm tra Node.js cơ bản',
        type: 'chapter',
        chapterId: 'ch1',
        questions: [
          { 
            id: 'qs1', 
            question: '<p>Node.js sử dụng JavaScript engine nào?</p>', 
            options: ['SpiderMonkey', 'V8', 'Chakra', 'JavaScriptCore'], 
            correctIndexes: [1], 
            explanation: '<p><strong>V8</strong> là JavaScript engine của Google Chrome, được Node.js sử dụng để compile và execute JavaScript code.</p>' 
          },
          { 
            id: 'qs2', 
            question: '<p>Đặc điểm nào là của Node.js? (Chọn nhiều đáp án)</p>', 
            options: ['Event-driven', 'Multi-threaded', 'Non-blocking I/O', 'Single-threaded'], 
            correctIndexes: [0, 2, 3], 
            explanation: '<p>Node.js là <strong>single-threaded</strong>, sử dụng mô hình <strong>event-driven</strong> và <strong>non-blocking I/O</strong>. Nó không phải multi-threaded (nhưng có thể sử dụng worker threads).</p>' 
          },
        ],
      },
      {
        id: 'q2',
        title: 'Bài kiểm tra cuối khóa',
        type: 'final',
        questions: [
          { 
            id: 'qs3', 
            question: '<p>Middleware trong Express có chức năng gì?</p>', 
            options: ['Kết nối database', 'Xử lý request trước khi đến route handler', 'Render template', 'Serve static files'], 
            correctIndexes: [1], 
            explanation: '<p><strong>Middleware</strong> là functions có quyền truy cập vào request (req), response (res), và next middleware trong chu trình request-response.</p>' 
          },
          { 
            id: 'qs4', 
            question: '<p>HTTP method nào dùng để cập nhật toàn bộ resource?</p>', 
            options: ['GET', 'POST', 'PUT', 'PATCH'], 
            correctIndexes: [2], 
            explanation: '<p><strong>PUT</strong> dùng để cập nhật toàn bộ resource, còn <strong>PATCH</strong> dùng để cập nhật một phần resource.</p>' 
          },
          { 
            id: 'qs5', 
            question: '<p>So sánh MongoDB và PostgreSQL đúng là:</p>', 
            options: [
              'MongoDB là SQL, PostgreSQL là NoSQL', 
              'MongoDB là NoSQL, PostgreSQL là SQL', 
              'Cả hai đều là NoSQL', 
              'Cả hai đều là SQL'
            ], 
            correctIndexes: [1], 
            explanation: '<p><strong>MongoDB</strong> là NoSQL database (document-based), còn <strong>PostgreSQL</strong> là SQL database (relational).</p>' 
          },
        ],
      },
    ],
  },
  '3': {
    title: 'Toán cao cấp cho Machine Learning',
    description: `<h2>Nền tảng Toán học cho AI/ML</h2>
<p>Khóa học cung cấp kiến thức toán học cần thiết cho Machine Learning và Deep Learning.</p>

<h3>Các công thức quan trọng</h3>
<p>Gradient Descent: $\\theta_{new} = \\theta_{old} - \\alpha \\nabla J(\\theta)$</p>
<p>Mean Squared Error: $MSE = \\frac{1}{n} \\sum_{i=1}^{n} (y_i - \\hat{y}_i)^2$</p>

<h3>Bạn sẽ học được</h3>
<ul>
<li>Đại số tuyến tính: Ma trận, Vector, Eigenvalues</li>
<li>Giải tích: Đạo hàm, Tích phân, Gradient</li>
<li>Xác suất thống kê: Distributions, Bayes' theorem</li>
</ul>

<blockquote>
<p>Công thức Bayes: $P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$</p>
</blockquote>`,
    price: 55000000,
    status: 'published',
    chapters: [
      {
        id: 'ch1',
        title: 'Đại số tuyến tính',
        lectures: [
          { 
            id: 'l1', 
            title: 'Vector và Ma trận', 
            content: `<h3>Vector</h3>
<p>Vector là một mảng các số. Ví dụ vector 3 chiều:</p>
<p>$$\\vec{v} = \\begin{bmatrix} v_1 \\\\ v_2 \\\\ v_3 \\end{bmatrix}$$</p>

<h3>Phép nhân ma trận</h3>
<p>Cho ma trận $A_{m \\times n}$ và $B_{n \\times p}$, tích $C = AB$ có kích thước $m \\times p$:</p>
<p>$$C_{ij} = \\sum_{k=1}^{n} A_{ik} B_{kj}$$</p>

<h3>Định thức</h3>
<p>Định thức ma trận 2x2: $\\det(A) = ad - bc$</p>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l2', 
            title: 'Eigenvalues và Eigenvectors', 
            content: `<h3>Định nghĩa</h3>
<p>Cho ma trận vuông $A$, vector $\\vec{v} \\neq 0$ là eigenvector nếu:</p>
<p>$$A\\vec{v} = \\lambda\\vec{v}$$</p>
<p>trong đó $\\lambda$ là eigenvalue tương ứng.</p>

<h3>Phương trình đặc trưng</h3>
<p>$$\\det(A - \\lambda I) = 0$$</p>

<h3>Ứng dụng trong ML</h3>
<ul>
<li>PCA (Principal Component Analysis)</li>
<li>SVD (Singular Value Decomposition)</li>
<li>Google PageRank</li>
</ul>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
      {
        id: 'ch2',
        title: 'Giải tích',
        lectures: [
          { 
            id: 'l3', 
            title: 'Đạo hàm và Gradient', 
            content: `<h3>Đạo hàm</h3>
<p>Đạo hàm của hàm số $f(x)$ tại điểm $x$:</p>
<p>$$f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$$</p>

<h3>Quy tắc chuỗi (Chain Rule)</h3>
<p>$$\\frac{d}{dx}[f(g(x))] = f'(g(x)) \\cdot g'(x)$$</p>

<h3>Gradient</h3>
<p>Gradient của hàm nhiều biến $f(x_1, x_2, ..., x_n)$:</p>
<p>$$\\nabla f = \\begin{bmatrix} \\frac{\\partial f}{\\partial x_1} \\\\ \\frac{\\partial f}{\\partial x_2} \\\\ \\vdots \\\\ \\frac{\\partial f}{\\partial x_n} \\end{bmatrix}$$</p>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
          { 
            id: 'l4', 
            title: 'Tích phân', 
            content: `<h3>Tích phân xác định</h3>
<p>$$\\int_a^b f(x)dx = F(b) - F(a)$$</p>

<h3>Công thức tích phân phổ biến</h3>
<ul>
<li>$\\int x^n dx = \\frac{x^{n+1}}{n+1} + C$ (với $n \\neq -1$)</li>
<li>$\\int e^x dx = e^x + C$</li>
<li>$\\int \\frac{1}{x} dx = \\ln|x| + C$</li>
</ul>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
      {
        id: 'ch3',
        title: 'Xác suất thống kê',
        lectures: [
          { 
            id: 'l5', 
            title: 'Phân phối xác suất', 
            content: `<h3>Phân phối chuẩn (Normal Distribution)</h3>
<p>Hàm mật độ xác suất:</p>
<p>$$f(x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-\\frac{(x-\\mu)^2}{2\\sigma^2}}$$</p>
<p>trong đó $\\mu$ là kỳ vọng, $\\sigma$ là độ lệch chuẩn.</p>

<h3>Phân phối Bernoulli</h3>
<p>$P(X=k) = p^k(1-p)^{1-k}$ với $k \\in \\{0, 1\\}$</p>`, 
            videoUrl: 'https://www.youtube.com/watch?v=a_iQqN1Hp74' 
          },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q1',
        title: 'Kiểm tra Đại số tuyến tính',
        type: 'chapter',
        chapterId: 'ch1',
        questions: [
          { 
            id: 'qs1', 
            question: '<p>Định thức của ma trận $A = \\begin{bmatrix} 3 & 2 \\\\ 1 & 4 \\end{bmatrix}$ là bao nhiêu?</p>', 
            options: [
              '$10$', 
              '$14$', 
              '$11$', 
              '$5$'
            ], 
            correctIndexes: [0], 
            explanation: '<p>Áp dụng công thức: $\\det(A) = ad - bc = 3 \\times 4 - 2 \\times 1 = 12 - 2 = 10$</p>' 
          },
          { 
            id: 'qs2', 
            question: '<p>Nếu $A\\vec{v} = 5\\vec{v}$ với $\\vec{v} \\neq 0$, thì:</p>', 
            options: [
              '$\\vec{v}$ là eigenvector với eigenvalue $\\lambda = 5$', 
              '$\\vec{v}$ là ma trận nghịch đảo của A', 
              '$A$ là ma trận đơn vị', 
              '$\\vec{v} = 5A$'
            ], 
            correctIndexes: [0], 
            explanation: '<p>Theo định nghĩa, nếu $A\\vec{v} = \\lambda\\vec{v}$ với $\\vec{v} \\neq 0$, thì $\\vec{v}$ là <strong>eigenvector</strong> và $\\lambda$ là <strong>eigenvalue</strong> tương ứng.</p>' 
          },
        ],
      },
      {
        id: 'q2',
        title: 'Kiểm tra Giải tích',
        type: 'chapter',
        chapterId: 'ch2',
        questions: [
          { 
            id: 'qs3', 
            question: '<p>Đạo hàm của hàm số $f(x) = x^3 + 2x^2 - 5x + 1$ là:</p>', 
            options: [
              "$f'(x) = 3x^2 + 4x - 5$", 
              "$f'(x) = 3x^2 + 2x - 5$", 
              "$f'(x) = x^2 + 4x - 5$", 
              "$f'(x) = 3x^3 + 4x^2 - 5x$"
            ], 
            correctIndexes: [0], 
            explanation: "<p>Áp dụng quy tắc đạo hàm: $(x^n)' = nx^{n-1}$</p><p>$f'(x) = 3x^2 + 4x - 5$</p>" 
          },
          { 
            id: 'qs4', 
            question: '<p>Tính tích phân: $\\int_0^1 2x \\, dx$</p>', 
            options: [
              '$0$', 
              '$1$', 
              '$2$', 
              '$\\frac{1}{2}$'
            ], 
            correctIndexes: [1], 
            explanation: '<p>$\\int_0^1 2x \\, dx = [x^2]_0^1 = 1^2 - 0^2 = 1$</p>' 
          },
        ],
      },
      {
        id: 'q3',
        title: 'Bài kiểm tra cuối khóa',
        type: 'final',
        questions: [
          { 
            id: 'qs5', 
            question: '<p>Công thức Gradient Descent là:</p>', 
            options: [
              '$\\theta = \\theta + \\alpha \\nabla J(\\theta)$', 
              '$\\theta = \\theta - \\alpha \\nabla J(\\theta)$', 
              '$\\theta = \\alpha \\nabla J(\\theta)$', 
              '$\\theta = \\theta \\cdot \\alpha \\nabla J(\\theta)$'
            ], 
            correctIndexes: [1], 
            explanation: '<p>Gradient Descent cập nhật tham số theo hướng <strong>ngược</strong> với gradient (để giảm loss):</p><p>$$\\theta_{new} = \\theta_{old} - \\alpha \\nabla J(\\theta)$$</p><p>trong đó $\\alpha$ là learning rate.</p>' 
          },
          { 
            id: 'qs6', 
            question: '<p>Theo định lý Bayes, $P(A|B)$ được tính bằng:</p>', 
            options: [
              '$\\frac{P(A) \\cdot P(B)}{P(B|A)}$', 
              '$\\frac{P(B|A) \\cdot P(A)}{P(B)}$', 
              '$P(A) + P(B) - P(A \\cap B)$', 
              '$\\frac{P(A \\cap B)}{P(A)}$'
            ], 
            correctIndexes: [1], 
            explanation: '<p><strong>Định lý Bayes:</strong></p><p>$$P(A|B) = \\frac{P(B|A) \\cdot P(A)}{P(B)}$$</p><p>Đây là nền tảng cho Naive Bayes classifier và nhiều thuật toán ML khác.</p>' 
          },
        ],
      },
    ],
  },
  '5': {
    title: 'Python cho Data Science',
    description: `<h2>Phân tích dữ liệu với Python</h2>
<p>Khóa học toàn diện về <strong>Data Science</strong> sử dụng Python, từ cơ bản đến Machine Learning.</p>

<h3>Công cụ và thư viện</h3>
<ul>
<li><strong>NumPy</strong> - Xử lý mảng và tính toán số học</li>
<li><strong>Pandas</strong> - Phân tích và xử lý dữ liệu</li>
<li><strong>Matplotlib & Seaborn</strong> - Trực quan hóa dữ liệu</li>
<li><strong>Scikit-learn</strong> - Machine Learning</li>
</ul>

<h3>Dự án thực tế</h3>
<p>Bạn sẽ thực hiện 5 dự án thực tế bao gồm phân tích dữ liệu bán hàng, dự đoán giá nhà, và phân loại email spam.</p>

<blockquote>
<p>"Khóa học giúp tôi chuyển từ Excel sang Python một cách tự tin!" - Học viên</p>
</blockquote>`,
    price: 68000000,
    status: 'published',
    chapters: [
      {
        id: 'ch1',
        title: 'Python cơ bản cho Data Science',
        lectures: [
          { id: 'l1', title: 'Cài đặt môi trường', content: '<p>Anaconda và Jupyter Notebook</p>', videoUrl: '' },
          { id: 'l2', title: 'Kiểu dữ liệu trong Python', content: '<p>Lists, Tuples, Dictionaries</p>', videoUrl: '' },
          { id: 'l3', title: 'Functions và Control Flow', content: '<p>Hàm và điều kiện</p>', videoUrl: '' },
        ],
      },
      {
        id: 'ch2',
        title: 'NumPy',
        lectures: [
          { id: 'l4', title: 'NumPy Arrays', content: '<p>Tạo và thao tác với arrays</p>', videoUrl: '' },
          { id: 'l5', title: 'Array Operations', content: '<p>Tính toán với arrays</p>', videoUrl: '' },
        ],
      },
      {
        id: 'ch3',
        title: 'Pandas',
        lectures: [
          { id: 'l6', title: 'DataFrame và Series', content: '<p>Cấu trúc dữ liệu chính</p>', videoUrl: '' },
          { id: 'l7', title: 'Data Cleaning', content: '<p>Làm sạch dữ liệu</p>', videoUrl: '' },
          { id: 'l8', title: 'Data Analysis', content: '<p>Phân tích và tổng hợp</p>', videoUrl: '' },
        ],
      },
      {
        id: 'ch4',
        title: 'Data Visualization',
        lectures: [
          { id: 'l9', title: 'Matplotlib cơ bản', content: '<p>Line, Bar, Scatter plots</p>', videoUrl: '' },
          { id: 'l10', title: 'Seaborn', content: '<p>Statistical visualizations</p>', videoUrl: '' },
        ],
      },
      {
        id: 'ch5',
        title: 'Machine Learning với Scikit-learn',
        lectures: [
          { id: 'l11', title: 'Giới thiệu ML', content: '<p>Các loại Machine Learning</p>', videoUrl: '' },
          { id: 'l12', title: 'Linear Regression', content: '<p>Hồi quy tuyến tính</p>', videoUrl: '' },
          { id: 'l13', title: 'Classification', content: '<p>Phân loại dữ liệu</p>', videoUrl: '' },
        ],
      },
    ],
    quizzes: [
      {
        id: 'q1',
        title: 'Kiểm tra Python cơ bản',
        type: 'chapter',
        chapterId: 'ch1',
        questions: [
          { id: 'qs1', question: 'Kiểu dữ liệu nào có thể thay đổi giá trị?', options: ['Tuple', 'String', 'List', 'Integer'], correctIndexes: [2], explanation: 'List là mutable, có thể thay đổi sau khi tạo.' },
        ],
      },
      {
        id: 'q2',
        title: 'Kiểm tra Pandas',
        type: 'chapter',
        chapterId: 'ch3',
        questions: [
          { id: 'qs2', question: 'Hàm nào dùng để đọc file CSV?', options: ['pd.load_csv()', 'pd.read_csv()', 'pd.open_csv()', 'pd.import_csv()'], correctIndexes: [1], explanation: 'pd.read_csv() là hàm chuẩn để đọc CSV.' },
        ],
      },
      {
        id: 'q3',
        title: 'Bài kiểm tra cuối khóa',
        type: 'final',
        questions: [
          { id: 'qs3', question: 'Supervised Learning là gì?', options: ['Học không có nhãn', 'Học có nhãn', 'Học tăng cường', 'Học sâu'], correctIndexes: [1], explanation: 'Supervised Learning sử dụng dữ liệu có nhãn để huấn luyện.' },
          { id: 'qs4', question: 'Thư viện nào dùng cho visualization?', options: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn'], correctIndexes: [2], explanation: 'Matplotlib là thư viện chính cho data visualization.' },
        ],
      },
    ],
  },
};

