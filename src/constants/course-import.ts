import type { CourseFormData } from '@/types/course-create';

export const COURSE_IMPORT_LABELS = {
  title: 'Nhập khóa học từ JSON',
  tabs: {
    json: 'Dán JSON',
    preview: 'Xem trước',
  },
  jsonTab: {
    placeholder: `{
  "title": "Tên khóa học",
  "description": "Mô tả khóa học",
  "videoUrl": "https://youtube.com/watch?v=... (video giới thiệu)",
  "price": 0,
  "status": "draft",
  "chapters": [
    {
      "title": "Chương 1",
      "lectures": [
        {
          "title": "Bài 1",
          "content": "Nội dung bài học",
          "videoUrl": "https://youtube.com/watch?v=...",
          "previewFree": true
        }
      ]
    }
  ],
  "quizzes": [
    {
      "title": "Bài kiểm tra cuối khóa",
      "type": "final",
      "questions": [
        {
          "question": "Câu hỏi 1?",
          "options": ["A", "B", "C", "D"],
          "correctIndexes": [0],
          "explanation": "Giải thích"
        }
      ]
    }
  ]
}`,
    parseButton: 'Parse JSON',
    clearButton: 'Xóa',
    copyTemplate: 'Copy mẫu',
    importButton: 'Áp dụng vào Form',
  },
  preview: {
    empty: 'Chưa có dữ liệu. Vui lòng paste JSON và nhấn Parse.',
    basicInfo: 'Thông tin cơ bản',
    chapters: 'Chương học',
    quizzes: 'Bài kiểm tra',
    lecture: 'bài học',
    question: 'câu hỏi',
    free: 'Miễn phí',
  },
  toast: {
    parseSuccess: 'Parse JSON thành công!',
    parseError: 'JSON không hợp lệ',
    copySuccess: 'Đã copy mẫu JSON',
    importSuccess: 'Đã áp dụng vào form!',
  },
  validation: {
    missingTitle: 'Thiếu trường title',
    invalidChapters: 'chapters phải là mảng',
    invalidQuizzes: 'quizzes phải là mảng',
  },
};

export const JSON_TEMPLATE: CourseFormData = {
  title: 'Tên khóa học',
  description: 'Mô tả chi tiết khóa học của bạn',
  videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  price: 0,
  status: 'draft',
  receiverAddress: '',
  chapters: [
    {
      id: '1',
      title: 'Chương 1: Giới thiệu',
      lectures: [
        {
          id: '1-1',
          title: 'Bài 1: Tổng quan',
          content: 'Nội dung bài học đầu tiên',
          videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          duration: 10,
          previewFree: true,
        },
      ],
    },
  ],
  quizzes: [
    {
      id: 'q1',
      title: 'Bài kiểm tra cuối khóa',
      type: 'final',
      questions: [
        {
          id: 'q1-1',
          question: 'Câu hỏi mẫu?',
          options: ['Đáp án A', 'Đáp án B', 'Đáp án C', 'Đáp án D'],
          correctIndexes: [0],
          explanation: 'Giải thích tại sao đáp án A đúng',
        },
      ],
    },
  ],
};
