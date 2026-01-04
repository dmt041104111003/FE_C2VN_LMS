import { api, API_BASE_URL } from './api';
import type { Chapter, Quiz } from '@/types/course-create';
import type { CourseData } from '@/types/course-detail';
import type { PageResponse } from '@/types/core.types';
import type {
  CourseShortInfo,
  CourseCreationRequest,
  CourseCreationResponse,
  InstructorProfileResponse,
  CourseActivityResponse,
  MyEnrollmentResponse,
  EnrollCourseRequest,
  EnrollmentResponse,
  CourseEnrolledResponse,
  AddStudentRequest,
  CourseProgressResponse,
  SaveProgressRequest,
  ProgressResult,
  QuizSubmissionRequest,
  QuizSubmissionResult,
  UpdateDiscountRequest,
  FeedbackResponse,
  FeedbackRequest,
  ReactionType,
} from '@/types/course-service.types';
import type { CourseUpgradeInfo } from '@/types/learning';

export type {
  CourseShortInfo,
  CourseCreationRequest,
  CourseCreationResponse,
  InstructorProfileResponse,
  CourseActivityResponse,
  MyEnrollmentResponse,
  EnrollCourseRequest,
  EnrollmentResponse,
  CourseEnrolledResponse,
  AddStudentRequest,
  CourseProgressResponse,
  SaveProgressRequest,
  ProgressResult,
  QuizSubmissionRequest,
  QuizSubmissionResult,
  UpdateDiscountRequest,
  FeedbackResponse,
  FeedbackRequest,
  ReactionType,
};

const createFormDataRequest = async (
  url: string, 
  method: 'POST' | 'PUT', 
  data: unknown, 
  imageFile?: File
): Promise<Response> => {
  const formData = new FormData();
  formData.append('data', JSON.stringify(data));
  if (imageFile) formData.append('image', imageFile);
  
  return fetch(url, { method, body: formData, credentials: 'include' });
};

const parseResponse = async <T>(response: Response, errorMessage: string): Promise<T> => {
  const text = await response.text();
  const json = text ? JSON.parse(text) : {};
  if (!response.ok) throw new Error(json.message || errorMessage);
  return json.result;
};

export const courseService = {
  getMyCourses: (page = 0, size = 10): Promise<PageResponse<CourseShortInfo>> =>
    api.get<PageResponse<CourseShortInfo>>('/api/course/profile/me/all', {
      params: { page: String(page), size: String(size) },
    }),

  getMyPublicCourses: (): Promise<CourseShortInfo[]> =>
    api.get<CourseShortInfo[]>('/api/course/profile/me/public'),

  createCourse: async (data: CourseCreationRequest, imageFile?: File): Promise<CourseCreationResponse> => {
    const response = await createFormDataRequest(`${API_BASE_URL}/api/course`, 'POST', data, imageFile);
    return parseResponse<CourseCreationResponse>(response, 'Tạo khóa học thất bại');
  },

  updateCourse: async (courseId: string, data: CourseCreationRequest, imageFile?: File): Promise<void> => {
    const response = await createFormDataRequest(`${API_BASE_URL}/api/course/${courseId}`, 'PUT', data, imageFile);
    await parseResponse<void>(response, 'Cập nhật khóa học thất bại');
  },

  publishCourse: (courseId: string): Promise<void> =>
    api.put(`/api/course/publish/${courseId}`),

  unpublishCourse: (courseId: string): Promise<void> =>
    api.put(`/api/course/unpublish/${courseId}`),

  deleteCourse: (courseId: string): Promise<void> =>
    api.delete(`/api/course/${courseId}`),

  getCourseById: (courseId: string, userId?: string, instructorId?: number) => {
    const params: Record<string, string> = {};
    if (userId) params.userId = userId;
    if (instructorId) params.instructorId = String(instructorId);
    return api.get(`/api/course/${courseId}`, { params });
  },

  getCourseBySlug: (slug: string, userId?: string, instructorId?: number) => {
    const params: Record<string, string> = {};
    if (userId) params.userId = userId;
    if (instructorId) params.instructorId = String(instructorId);
    return api.get(`/api/course/slug/${slug}`, { params });
  },

  getCourseActivities: (courseId: string): Promise<CourseActivityResponse[]> =>
    api.get<CourseActivityResponse[]>(`/api/course/${courseId}/activities`),

  getPublishedCourses: (): Promise<unknown[]> =>
    api.get<unknown[]>('/api/course'),

  searchCourses: (params?: {
    keyword?: string;
    courseType?: string;
    minPrice?: number;
    maxPrice?: number;
    tagId?: string;
    sort?: string;
    page?: number;
    size?: number;
  }): Promise<unknown> => {
    const queryParams: Record<string, string> = {};
    if (params?.keyword) queryParams.keyword = params.keyword;
    if (params?.courseType) queryParams.courseType = params.courseType;
    if (params?.minPrice !== undefined) queryParams.minPrice = String(params.minPrice);
    if (params?.maxPrice !== undefined) queryParams.maxPrice = String(params.maxPrice);
    if (params?.tagId) queryParams.tagId = params.tagId;
    if (params?.sort) queryParams.sort = params.sort;
    if (params?.page !== undefined) queryParams.page = String(params.page);
    if (params?.size !== undefined) queryParams.size = String(params.size);
    return api.get('/api/course/search', { params: queryParams });
  },
};

export const getMyEnrollments = (): Promise<MyEnrollmentResponse[]> =>
  api.get<MyEnrollmentResponse[]>('/api/enrollment/me');

export const enrollCourse = (request: EnrollCourseRequest): Promise<EnrollmentResponse> =>
  api.post<EnrollmentResponse>('/api/enrollment', request);

export const deleteEnrollment = (enrollmentId: number): Promise<void> =>
  api.delete<void>(`/api/enrollment/${enrollmentId}`);

export const getEnrolledStudents = (courseId: string): Promise<CourseEnrolledResponse> =>
  api.get<CourseEnrolledResponse>(`/api/enrollment/course/${courseId}/enrolled`);

export const addStudentToCourse = (courseId: string, request: AddStudentRequest) =>
  api.post(`/api/enrollment/course/${courseId}/add-student`, request);

export const instructorProfileService = {
  getMyProfile: (userId: string): Promise<InstructorProfileResponse> =>
    api.get<InstructorProfileResponse>(`/api/instructor-profiles/user/${userId}`),

  getProfileById: (id: number): Promise<InstructorProfileResponse> =>
    api.get<InstructorProfileResponse>(`/api/instructor-profiles/${id}`),
};

const mapTestToQuiz = (test: Record<string, unknown>, type: 'final' | 'chapter', chapterId?: string): Quiz => ({
  id: String(test.id || ''),
  title: String(test.title || ''),
  type,
  chapterId,
  passScore: Number(test.passScore) || 0,
  timeLimit: Number(test.durationMinutes) || 30,
  questions: Array.isArray(test.questions)
    ? test.questions.map((q: Record<string, unknown>, qidx: number) => ({
        id: String(q.id || qidx),
        question: String(q.content || q.question || ''),
        options: Array.isArray(q.answers) 
          ? q.answers.map((a: Record<string, unknown>) => String(a.content || a.text || ''))
          : [],
        correctIndexes: Array.isArray(q.answers)
          ? q.answers
              .map((a: Record<string, unknown>, aidx: number) => a.correct ? aidx : -1)
              .filter((i: number) => i >= 0)
          : [],
        explanation: String(q.explanation || ''),
      }))
    : [],
});

export const getUserProgress = (userId: string): Promise<CourseProgressResponse[]> =>
  api.get<CourseProgressResponse[]>(`/api/progress/user/${userId}`);

export const getCourseProgress = async (userId: string, courseId: string): Promise<CourseProgressResponse | null> => {
  const allProgress = await getUserProgress(userId);
  const normalizedId = String(courseId).trim().toLowerCase();
  return allProgress.find(p => String(p.id).trim().toLowerCase() === normalizedId) || null;
};

export const getLearningContent = (slug: string): Promise<Record<string, unknown>> =>
  api.get<Record<string, unknown>>(`/api/course/learn/${slug}`);

export const saveProgress = (
  userId: string, 
  courseId: string, 
  request: SaveProgressRequest
): Promise<ProgressResult> =>
  api.post<ProgressResult>(`/api/progress/user/${userId}/course/${courseId}`, request);

export const submitQuiz = (
  courseId: string,
  testId: number,
  submission: QuizSubmissionRequest
): Promise<QuizSubmissionResult> =>
  api.post<QuizSubmissionResult>(`/api/course/${courseId}/tests/submit/${testId}`, submission);

export const getPreviousQuizResult = async (
  courseId: string,
  testId: number,
  userId: string
): Promise<QuizSubmissionResult | null> => {
  try {
    return await api.get<QuizSubmissionResult>(
      `/api/course/${courseId}/tests/${testId}/result`,
      { params: { userId } }
    );
  } catch {
    return null;
  }
};

export const mapApiToCourseData = (apiData: Record<string, unknown>): CourseData | null => {
  if (!apiData) return null;
  
  const chapters: Chapter[] = Array.isArray(apiData.chapters) 
    ? apiData.chapters.map((ch: Record<string, unknown>, idx: number) => ({
        id: String(ch.id || idx),
        title: String(ch.title || ''),
        lectures: Array.isArray(ch.lectures) 
          ? ch.lectures.map((lec: Record<string, unknown>, lidx: number) => ({
              id: String(lec.id || lidx),
              title: String(lec.title || ''),
              content: String(lec.content || lec.description || ''),
              videoUrl: String(lec.videoUrl || ''),
              duration: Number(lec.time) || 0,
              previewFree: Boolean(lec.previewFree),
            }))
          : [],
      }))
    : [];

  const quizzes: Quiz[] = [];
  
  if (Array.isArray(apiData.courseTests)) {
    for (const test of apiData.courseTests as Record<string, unknown>[]) {
      quizzes.push(mapTestToQuiz(test, 'final'));
    }
  }
  
  if (Array.isArray(apiData.chapters)) {
    for (const ch of apiData.chapters as Record<string, unknown>[]) {
      const chapterId = String(ch.id || '');
      if (Array.isArray(ch.tests)) {
        for (const test of ch.tests as Record<string, unknown>[]) {
          quizzes.push(mapTestToQuiz(test, 'chapter', chapterId));
        }
      }
    }
  }

  const courseTags = Array.isArray(apiData.courseTags)
    ? apiData.courseTags.map((tag: Record<string, unknown>) => ({
        id: Number(tag.id),
        name: String(tag.name || ''),
        slug: String(tag.slug || ''),
      }))
    : [];

  const coursePaymentMethods = Array.isArray(apiData.coursePaymentMethods)
    ? apiData.coursePaymentMethods.map((pm: Record<string, unknown>) => {
        const addr = String(pm.receiverAddress || '');
        return {
          id: Number(pm.id),
          paymentMethod: pm.paymentMethod as { name: string; currency: string; description?: string },
          receiverAddress: addr === 'N/A' ? '' : addr,
        };
      })
    : [];

  return {
    id: String(apiData.id || ''),
    title: String(apiData.title || ''),
    description: apiData.description ? String(apiData.description) : undefined,
    videoUrl: apiData.videoUrl ? String(apiData.videoUrl) : undefined,
    price: Number(apiData.price) || 0,
    status: apiData.draft === true ? 'draft' : 'published',
    chapters,
    quizzes,
    courseTags,
    coursePaymentMethods,
    discount: apiData.discount ? Number(apiData.discount) : undefined,
    discountEndTime: apiData.discountEndTime ? String(apiData.discountEndTime) : undefined,
  };
};

export const updateCourseDiscount = (
  courseId: string,
  request: UpdateDiscountRequest
): Promise<Record<string, unknown>> =>
  api.put<Record<string, unknown>>(`/api/course/${courseId}/discount`, request);

export const updateTestPassScore = (
  courseId: string,
  testId: number,
  passScore: number
): Promise<void> =>
  api.put(`/api/course/${courseId}/tests/${testId}/pass-score`, { passScore });

const FEEDBACK_ENDPOINTS = {
  list: (courseId: string) => `/api/feedbacks/course/${courseId}`,
  add: (courseId: string) => `/api/feedbacks/course/${courseId}`,
  update: (id: number) => `/api/feedbacks/${id}`,
  delete: (id: number) => `/api/feedbacks/${id}`,
  hide: (id: number) => `/api/feedbacks/${id}/hide`,
  unhide: (id: number) => `/api/feedbacks/${id}/unhide`,
  react: (id: number) => `/api/feedbacks/${id}/react`,
} as const;

export const getFeedbacks = async (courseId: string): Promise<FeedbackResponse[]> =>
  (await api.get<FeedbackResponse[]>(FEEDBACK_ENDPOINTS.list(courseId))) || [];

export const addFeedback = (courseId: string, request: FeedbackRequest): Promise<FeedbackResponse> =>
  api.post<FeedbackResponse>(FEEDBACK_ENDPOINTS.add(courseId), request);

export const addReply = (courseId: string, parentId: number, content: string): Promise<FeedbackResponse> =>
  addFeedback(courseId, { content, parentId });

export const updateFeedback = (feedbackId: number, request: FeedbackRequest): Promise<FeedbackResponse> =>
  api.put<FeedbackResponse>(FEEDBACK_ENDPOINTS.update(feedbackId), request);

export const deleteFeedback = (feedbackId: number): Promise<void> =>
  api.delete(FEEDBACK_ENDPOINTS.delete(feedbackId));

export const hideFeedback = (feedbackId: number): Promise<void> =>
  api.put(FEEDBACK_ENDPOINTS.hide(feedbackId));

export const unhideFeedback = (feedbackId: number): Promise<void> =>
  api.put(FEEDBACK_ENDPOINTS.unhide(feedbackId));

export const reactToFeedback = (feedbackId: number, type: ReactionType): Promise<FeedbackResponse> =>
  api.post<FeedbackResponse>(FEEDBACK_ENDPOINTS.react(feedbackId), null, { params: { type } });

export const checkCourseUpgrade = async (courseId: string): Promise<CourseUpgradeInfo | null> => {
  try {
    return await api.get<CourseUpgradeInfo>(`/api/enrollment/course/${courseId}/upgrade-info`);
  } catch {
    return null;
  }
};

export const upgradeCourseSnapshot = (courseId: string): Promise<CourseUpgradeInfo | null> =>
  api.post<CourseUpgradeInfo>(`/api/enrollment/course/${courseId}/upgrade`);
