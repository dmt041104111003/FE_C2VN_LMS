export interface CourseShortInfo {
  id: string;
  slug?: string;
  title: string;
  imageUrl?: string;
  draft: boolean;
  price?: number;
  discount?: number;
  enrollmentCount?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface ChapterRequest {
  id?: string;
  title: string;
  lectures?: LectureRequest[];
  tests?: TestRequest[];
}

export interface LectureRequest {
  id?: string;
  title: string;
  description?: string;
  videoUrl?: string;
  duration?: number;
  previewFree?: boolean;
  tests?: TestRequest[];
}

export interface TestRequest {
  id?: string;
  title: string;
  durationMinutes?: number;
  passScore?: number;
  questions?: QuestionRequest[];
}

export interface QuestionRequest {
  id?: string;
  content: string;
  score?: number;
  orderIndex?: number;
  imageUrl?: string;
  explanation?: string;
  answers?: AnswerRequest[];
}

export interface AnswerRequest {
  id?: string;
  content: string;
  correct?: boolean;
}

export interface PaymentOptionRequest {
  paymentMethodId: string;
  receiverAddress?: string;
}

export interface CourseCreationRequest {
  title: string;
  description?: string;
  shortDescription?: string;
  requirement?: string;
  videoUrl?: string;
  draft: boolean;
  discount?: number;
  price?: number;
  currency?: string;
  courseType?: string;
  discountEndTime?: string;
  chapters?: ChapterRequest[];
  paymentMethods?: PaymentOptionRequest[];
  courseTests?: TestRequest[];
  tagIds?: number[];
}

export interface CourseCreationResponse {
  id: string;
  slug: string;
  title: string;
  description?: string;
  imageUrl?: string;
  draft: boolean;
  price?: number;
  createdAt?: string;
}

export interface InstructorProfileResponse {
  id: number;
  name?: string;
  avatar?: string;
  bio?: string;
  expertise?: string;
  userId?: string;
}

export interface CourseActivityResponse {
  id: number;
  type: string;
  description: string;
  userName: string;
  timestamp: string;
}

export interface MyEnrollmentResponse {
  enrollmentId: number;
  courseId: string;
  courseSlug: string;
  courseTitle: string;
  courseImage?: string;
  instructorName?: string;
  enrolledAt: string;
  progressPercent: number;
  completed: boolean;
  completedLectures: number;
  walletAddress?: string;
  hasFaceEnrolled?: boolean;
}

export interface EnrollCourseRequest {
  userId: string;
  courseId: string;
  senderAddress?: string;
  coursePaymentMethodId?: string;
  priceAda?: number;
  txHash?: string;
  faceEmbedding?: string;
}

export interface EnrollmentResponse {
  id: number;
  courseId: string;
  userId: string;
  enrolledAt: string;
}

export interface EnrolledStudentResponse {
  enrolledId: number;
  userId: string;
  userName: string;
  email?: string;
  walletAddress?: string;
  enrollAt: string;
  totalLectures: number;
  totalTests: number;
  lecturesCompleted: number;
  testsCompleted: number;
  lectureProgressPercent: number;
  allLecturesCompleted: boolean;
  allTestsCompleted: boolean;
  courseCompleted: boolean;
}

export interface CourseEnrolledResponse {
  courseId: string;
  courseName: string;
  imageUrl?: string;
  instructorName: string;
  numsOfStudents: number;
  enrolled: EnrolledStudentResponse[];
}

export interface AddStudentRequest {
  contactType: 'email' | 'wallet';
  contactValue: string;
}

export interface ProgressLectureResponse {
  id: number;
  title: string;
  orderIndex: number;
  resourceUrl?: string;
  duration?: number;
}

export interface ProgressTestResponse {
  id: number;
  title: string;
  orderIndex: number;
}

export interface ProgressChapterResponse {
  id: number;
  title: string;
  orderIndex: number;
  lectures: ProgressLectureResponse[];
  tests: ProgressTestResponse[];
}

export interface TestAndLectureCompletedResponse {
  id?: number;
  type?: string;
  contentId?: number;
  completed?: boolean;
  score?: number;
  attempts?: number;
  completedAt?: string;
}

export interface CourseProgressResponse {
  id: string;
  title: string;
  imageUrl?: string;
  completed: boolean;
  instructorName?: string;
  fullName?: string;
  avatar?: string;
  certificateId?: number;
  chapters: ProgressChapterResponse[];
  courseTests: ProgressTestResponse[];
  testAndLectureCompleted: TestAndLectureCompletedResponse[];
}

export interface SaveProgressRequest {
  type: 'LECTURE' | 'TEST';
  lectureId?: number;
  testId?: number;
  score?: number;
}

export interface ProgressResult {
  id: number;
  completedLectureIds: string;
  completedTestsJson: string;
  courseCompleted: boolean;
}

export interface QuizAnswerSubmission {
  questionId: number;
  answerId: number[];
}

export interface QuizSubmissionRequest {
  userId: string;
  answers: QuizAnswerSubmission[];
}

export interface QuestionResult {
  questionId: number;
  correctAnswerIds: number[];
  selectedAnswerIds: number[];
  isCorrect: boolean;
  explanation?: string;
}

export interface QuizSubmissionResult {
  testId: number;
  courseId: string;
  userId: string;
  totalQuestions: number;
  correctAnswers: number;
  passScore: number;
  maxScore: number;
  score: number;
  passed: boolean;
  questionResults: QuestionResult[];
}

export interface UpdateDiscountRequest {
  discountPercent?: number;
  discountEndTime?: string;
}

export interface FeedbackResponse {
  id: number;
  rate: number;
  content: string;
  updatedAt?: string;
  createdAt: string;
  userId: string;
  fullName: string;
  userEmail?: string;
  userWalletAddress?: string;
  status: string;
  parentId?: number;
  replies?: FeedbackResponse[];
  likeCount: number;
  dislikeCount: number;
  userReaction?: string;
}

export interface FeedbackRequest {
  rate?: number;
  content: string;
  parentId?: number;
}

export type ReactionType = 'LIKE' | 'DISLIKE';

