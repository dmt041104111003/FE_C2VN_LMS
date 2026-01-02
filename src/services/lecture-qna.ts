import { api } from './api';
import type { LectureQna, LectureQnaReply } from '@/types/learning';

const ENDPOINTS = {
  QNA: (lectureId: string) => `/api/lectures/${lectureId}/qna`,
  COURSE_QNA: (courseId: string) => `/api/lectures/course/${courseId}/qna`,
  REPLY: (commentId: number) => `/api/lectures/comments/${commentId}/reply`,
  UPDATE: (commentId: number) => `/api/lectures/comments/${commentId}`,
  DELETE: (commentId: number) => `/api/lectures/comments/${commentId}`,
  LIKE: (commentId: number) => `/api/lectures/comments/${commentId}/like`,
  DISLIKE: (commentId: number) => `/api/lectures/comments/${commentId}/dislike`,
  REMOVE_REACTION: (commentId: number) => `/api/lectures/comments/${commentId}/reaction`,
  HIDE: (commentId: number) => `/api/lectures/comments/${commentId}/hide`,
  UNHIDE: (commentId: number) => `/api/lectures/comments/${commentId}/unhide`,
} as const;

export const getLectureQna = (lectureId: string): Promise<LectureQna[]> =>
  api.get<LectureQna[]>(ENDPOINTS.QNA(lectureId));


export const getCourseQna = (courseId: string): Promise<LectureQna[]> =>
  api.get<LectureQna[]>(ENDPOINTS.COURSE_QNA(courseId));

export const createLectureQuestion = (lectureId: string, content: string): Promise<LectureQna> =>
  api.post<LectureQna>(ENDPOINTS.QNA(lectureId), { content });

export const replyToComment = (commentId: number, content: string): Promise<LectureQnaReply> =>
  api.post<LectureQnaReply>(ENDPOINTS.REPLY(commentId), { content });

export const updateComment = (commentId: number, content: string): Promise<LectureQna> =>
  api.put<LectureQna>(ENDPOINTS.UPDATE(commentId), { content });

export const deleteComment = (commentId: number): Promise<void> =>
  api.delete<void>(ENDPOINTS.DELETE(commentId));

export const likeComment = (commentId: number): Promise<LectureQna> =>
  api.post<LectureQna>(ENDPOINTS.LIKE(commentId));

export const dislikeComment = (commentId: number): Promise<LectureQna> =>
  api.post<LectureQna>(ENDPOINTS.DISLIKE(commentId));

export const removeCommentReaction = (commentId: number): Promise<LectureQna> =>
  api.delete<LectureQna>(ENDPOINTS.REMOVE_REACTION(commentId));

export const hideComment = (commentId: number): Promise<LectureQna> =>
  api.put<LectureQna>(ENDPOINTS.HIDE(commentId));

export const unhideComment = (commentId: number): Promise<LectureQna> =>
  api.put<LectureQna>(ENDPOINTS.UNHIDE(commentId));

