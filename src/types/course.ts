export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  price: number;
  currency: string;
  discount?: number;
  instructorName: string;
  instructorAvatar?: string;
  instructorBio?: string;
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
}

export interface Chapter {
  id: string;
  title: string;
  orderIndex: number;
  lectures: Lecture[];
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

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  content: string;
  createdAt: string;
  helpful?: number;
}

export interface CourseCardProps {
  course: Course;
  featured?: boolean;
  tall?: boolean;
  wide?: boolean;
  className?: string;
}

export interface CourseDetailProps {
  course: Course;
  reviews?: Review[];
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

export interface ReviewItemProps {
  review: Review;
}
