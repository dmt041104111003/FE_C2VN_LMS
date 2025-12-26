import type { ReactNode } from 'react';

export type CourseStatus = 'draft' | 'published' | 'archived';

export interface InstructorCourse {
  id: string;
  title: string;
  students: number;
  revenue: number;
  status: CourseStatus;
  createdAt: string;
  updatedAt: string;
}

export interface InstructorLayoutProps {
  children: ReactNode;
  activeId: string;
  title?: string;
}

export interface CourseRowProps {
  index: number;
  course: InstructorCourse;
  onEdit: (courseId: string) => void;
  onDelete: (courseId: string) => void;
  onToggleStatus: (courseId: string, isPublished: boolean) => void;
  onAddStudent: (courseId: string, courseTitle: string) => void;
  onViewStudents: (courseId: string) => void;
}

export type InstructorModalType = 'delete' | 'publish' | 'unpublish' | 'edit' | null;

export interface InstructorModalState {
  type: InstructorModalType;
  courseId: string | null;
}

export interface CourseEditData {
  title: string;
}

export interface SearchSuggestion {
  text: string;
  type?: 'course' | 'instructor' | 'tag';
}

export interface CourseFiltersProps {
  keyword: string;
  statusFilter: CourseStatus | '';
  searchSuggestions?: SearchSuggestion[];
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: CourseStatus | '') => void;
}

export interface CourseEditPageProps {
  params: { id: string };
}

export interface AddStudentModalState {
  isOpen: boolean;
  courseId: string | null;
  courseTitle: string;
}

export interface AddStudentFormData {
  fullName: string;
  contactType: string;
  contactValue: string;
}
