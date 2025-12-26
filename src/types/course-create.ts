export type QuizType = 'final' | 'chapter' | 'lecture';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndexes: number[];
  explanation: string;
}

export interface Quiz {
  id: string;
  title: string;
  type: QuizType;
  chapterId?: string;
  lectureId?: string;
  questions: QuizQuestion[];
}

export interface Lecture {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  duration?: number;
}

export interface Chapter {
  id: string;
  title: string;
  lectures: Lecture[];
}

export type CourseStatus = 'draft' | 'published';

export interface CourseFormData {
  title: string;
  description: string;
  price: number;
  status: CourseStatus;
  chapters: Chapter[];
  quizzes: Quiz[];
}

export interface LectureEditorProps {
  lecture: Lecture;
  chapterIndex: number;
  lectureIndex: number;
  onUpdate: (chapterIndex: number, lectureIndex: number, lecture: Lecture) => void;
  onRemove: (chapterIndex: number, lectureIndex: number) => void;
}

export interface ChapterEditorProps {
  chapter: Chapter;
  chapterIndex: number;
  onUpdate: (index: number, chapter: Chapter) => void;
  onRemove: (index: number) => void;
  onAddLecture: (chapterIndex: number) => void;
  onUpdateLecture: (chapterIndex: number, lectureIndex: number, lecture: Lecture) => void;
  onRemoveLecture: (chapterIndex: number, lectureIndex: number) => void;
}

export interface QuizEditorProps {
  quiz: Quiz;
  quizIndex: number;
  chapters: Chapter[];
  onUpdate: (index: number, quiz: Quiz) => void;
  onRemove: (index: number) => void;
}

export interface CourseBasicInfoProps {
  title: string;
  price: number;
  description: string;
  status: CourseStatus;
  onTitleChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onDescriptionChange: (value: string) => void;
  onStatusChange: (value: CourseStatus) => void;
}

export interface QuestionEditorProps {
  question: QuizQuestion;
  questionIndex: number;
  onUpdate: (index: number, question: QuizQuestion) => void;
  onRemove: (index: number) => void;
}

export interface ChapterSelectProps {
  value: string;
  chapters: Chapter[];
  onChange: (chapterId: string) => void;
}

export interface EditorCardHeaderProps {
  title: string;
  onRemove: () => void;
  removeTitle: string;
  titleClassName?: string;
}


