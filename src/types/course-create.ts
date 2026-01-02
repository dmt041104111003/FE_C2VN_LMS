
export type { QuizType, QuizQuestion, Quiz, QuizEditorProps, QuestionEditorProps, ChapterSelectProps } from './quiz.types';
import type { Quiz } from './quiz.types';

export interface Lecture {
  id: string;
  title: string;
  content: string;
  videoUrl: string;
  duration?: number;
  previewFree: boolean;
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
  videoUrl: string;
  price: number;
  status: CourseStatus;
  receiverAddress: string;
  discount?: number;
  discountEndTime?: string;
  chapters: Chapter[];
  quizzes: Quiz[];
}

export interface LectureEditorProps {
  lecture: Lecture;
  chapterIndex: number;
  lectureIndex: number;
  onUpdate: (chapterIndex: number, lectureIndex: number, lecture: Lecture) => void;
  onRemove: (chapterIndex: number, lectureIndex: number) => void;
  disabled?: boolean;
}

export interface ChapterEditorProps {
  chapter: Chapter;
  chapterIndex: number;
  onUpdate: (index: number, chapter: Chapter) => void;
  onRemove: (index: number) => void;
  onAddLecture: (chapterIndex: number) => void;
  onUpdateLecture: (chapterIndex: number, lectureIndex: number, lecture: Lecture) => void;
  onRemoveLecture: (chapterIndex: number, lectureIndex: number) => void;
  disabled?: boolean;
}

export interface CourseBasicInfoProps {
  title: string;
  price: number;
  description: string;
  videoUrl: string;
  status: CourseStatus;
  receiverAddress: string;
  discount?: number;
  discountEndTime?: string;
  onTitleChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onDescriptionChange: (value: string) => void;
  onVideoUrlChange: (value: string) => void;
  onStatusChange: (value: CourseStatus) => void;
  onReceiverAddressChange: (value: string) => void;
  onDiscountChange?: (value: number | undefined) => void;
  onDiscountEndTimeChange?: (value: string | undefined) => void;
  disabled?: boolean;
}

export interface EditorCardHeaderProps {
  title: string;
  onRemove: () => void;
  removeTitle: string;
  titleClassName?: string;
  disabled?: boolean;
}

export interface CourseCreatePageProps {
  courseId?: string;
}

export interface ImageUploaderProps {
  imageFile: File | null;
  existingImageUrl: string | null;
  onImageChange: (file: File) => void;
  required?: boolean;
  disabled?: boolean;
}

export interface TagSelectorProps {
  tags: { id: number; name: string }[];
  selectedIds: number[];
  onToggle: (id: number) => void;
  disabled?: boolean;
}

export interface JsonEditorProps {
  value: string;
  onChange: (value: string) => void;
  onParsed: (data: CourseFormData) => void;
  disabled?: boolean;
}

export type SetFormData = React.Dispatch<React.SetStateAction<CourseFormData>>;

