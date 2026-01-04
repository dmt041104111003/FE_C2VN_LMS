import { Review } from './review';

export interface ApiLecture {
  id?: number;
  title?: string;
  time?: number;
  previewFree?: boolean;
  orderIndex?: number;
  videoUrl?: string;
}

export interface ApiTest {
  id?: number;
  title?: string;
  durationMinutes?: number;
  passScore?: number;
  questions?: unknown[];
}

export interface ApiChapter {
  id?: number;
  title?: string;
  orderIndex?: number;
  lectures?: ApiLecture[];
  tests?: ApiTest[];
}

export interface CoursePaymentMethod {
  id: string;
  paymentMethod: {
    name: string;
  };
  receiverAddress: string;
}

export interface Course {
  id: string;
  slug?: string;
  title: string;
  description: string;
  thumbnail?: string;
  videoUrl?: string;
  price: number;
  currency: string;
  discount?: number;
  discountEndTime?: string;
  instructorId?: string;
  instructorName: string;
  instructorBio?: string;
  instructorEmail?: string;
  instructorWalletAddress?: string;
  instructorAvatar?: string;
  totalLessons: number;
  totalStudents: number;
  totalDuration?: number;
  rating?: number;
  reviewCount?: number;
  tags?: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
  updatedAt?: string;
  objectives?: string[];
  requirements?: string[];
  chapters?: Chapter[];
  courseTests?: CourseTest[];
  coursePaymentMethods?: CoursePaymentMethod[];
}

export interface CourseTest {
  id: number;
  title: string;
  durationMinutes?: number;
  passScore?: number;
  questionCount: number;
}

export interface Chapter {
  id: string;
  title: string;
  orderIndex: number;
  lectures: Lecture[];
  tests?: CourseTest[];
}

export interface Lecture {
  id: string;
  title: string;
  duration: number;
  isPreview: boolean;
  orderIndex: number;
  videoUrl?: string;
}

export interface Enrollment {
  id: string;
  courseId: string;
  userId: string;
  completionRate: number;
  paymentStatus: 'PENDING' | 'COMPLETED' | 'FAILED';
  enrolledAt: string;
}

export interface CourseCardProps {
  course: Course;
  featured?: boolean;
  tall?: boolean;
  wide?: boolean;
  className?: string;
}

import { ReviewStats } from './review';

export interface CourseDetailProps {
  course: Course;
  reviews?: Review[];
  reviewStats?: ReviewStats;
  isEnrolled?: boolean;
  progress?: number;
}

export type CardType = 'featured' | 'tall' | 'wide' | 'default';

export interface CardConfig {
  containerClass: string;
  imageClass: string;
  contentClass: string;
  titleClass: string;
  descClass: string;
  showDescription: boolean;
  showTags: boolean;
  maxTags: number;
  showFeatures: boolean;
  featureColumns: 1 | 2;
  featureSize: 'xs' | 'sm';
  userSize: 'xs' | 'sm' | 'md';
  ratingSize: 'xs' | 'sm' | 'md';
  priceSize: 'xs' | 'sm' | 'md' | 'lg';
  showInstructorLabel: boolean;
  showRatingCount: boolean;
  features: (course: Course) => string[];
}

export interface ImageSectionProps {
  course: Course;
  className: string;
  isFree: boolean;
}

export interface PreviewData {
  videoUrl: string;
  title: string;
  chapterTitle: string;
}

export interface ObjectivesSectionProps {
  objectives: string[];
}

export interface RequirementsSectionProps {
  requirements: string[];
}

export interface LectureItemProps {
  lecture: Lecture;
  onPreview: (id: string) => void;
}

export interface ChapterItemProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onPreview: (id: string) => void;
}

export interface CourseMetadataResponse {
  code: number;
  result?: {
    title?: string;
    description?: string;
    thumbnail?: string;
  };
}
