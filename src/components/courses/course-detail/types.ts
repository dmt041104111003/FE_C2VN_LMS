import { Course, Lecture, Chapter, CourseTest } from '@/types/course';
import { Review, ReviewStats, ReviewFormData } from '@/types/review';

export interface CourseDetailProps {
  course: Course;
  reviews?: Review[];
  reviewStats?: ReviewStats;
  isEnrolled?: boolean;
  progress?: number;
  canReview?: boolean;
  currentUserId?: string;
  instructorId?: string;
  onSubmitReview?: (data: ReviewFormData) => void;
  onReply?: (reviewId: string, content: string) => void;
  onVote?: (reviewId: string, vote: 'up' | 'down') => void;
  onDelete?: (feedbackId: string) => void;
  isSubmittingReview?: boolean;
}

export interface CourseHeaderProps {
  course: Course;
}

export interface CourseSidebarProps {
  course: Course;
  isEnrolled: boolean;
  progress: number;
  totalLectures: number;
  totalDuration: number;
}

export interface ChaptersSectionProps {
  chapters: Chapter[];
  onPreview: (lectureId: string) => void;
}

export interface ChapterItemProps {
  chapter: Chapter;
  isExpanded: boolean;
  onToggle: () => void;
  onPreview: (lectureId: string) => void;
}

export interface LectureItemProps {
  lecture: Lecture;
  onPreview: (id: string) => void;
}

export interface ObjectivesSectionProps {
  objectives: string[];
}

export interface RequirementsSectionProps {
  requirements: string[];
}

export interface CourseTestsSectionProps {
  tests: CourseTest[];
}

export interface PreviewData {
  videoUrl: string;
  title: string;
  chapterTitle: string;
}

export interface LectureWithChapter extends Lecture {
  chapterTitle: string;
}

export interface CourseStats {
  totalLectures: number;
  totalDuration: number;
}

export interface UseCourseDetailReturn {
  previewData: PreviewData | null;
  videoDuration: number | null;
  lectureMap: Map<string, LectureWithChapter>;
  stats: CourseStats;
  openPreview: (lectureId: string) => void;
  closePreview: () => void;
  setVideoDuration: (duration: number | null) => void;
}

export interface PriceSectionProps {
  price: number;
  discountedPrice: number;
  discount?: number;
  discountEndTime?: string;
  currency: string;
}

export interface ProgressBarProps {
  progress: number;
}

export interface FeatureProps {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}

export interface EnrollmentState {
  isDialogOpen: boolean;
  isWalletModalOpen: boolean;
  isProcessing: boolean;
  pendingWallet: { key: string; name: string } | null;
}

export interface UseEnrollmentReturn {
  state: EnrollmentState;
  wallets: { key: string; name: string; icon?: string }[];
  handleEnrollClick: () => void;
  handleConfirmEnroll: () => Promise<void>;
  handleWalletSelect: (wallet: { key: string; name: string; icon?: string }) => Promise<void>;
  closeDialog: () => void;
  closeWalletModal: () => void;
}
