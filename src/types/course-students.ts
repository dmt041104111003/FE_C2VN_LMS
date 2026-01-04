import type { SearchSuggestion } from './core.types';
export type { SearchSuggestion } from './core.types';

export type StudentStatus = 'active' | 'completed';
export type StudentContactType = 'email' | 'wallet';
export type CertificateStatus = 'pending' | 'issued';
export type StudentModalType = 'remove' | null;

export interface CourseStudent {
  id: string;
  fullName: string;
  email: string;
  walletAddress?: string;
  enrolledAt: string;
  status: StudentStatus;
  certificateStatus?: CertificateStatus;
  progress?: number;
  lecturesCompleted?: number;
  totalLectures?: number;
  testsCompleted?: number;
  totalTests?: number;
  allLecturesCompleted?: boolean;
  allTestsCompleted?: boolean;
}

export interface StudentFormData {
  fullName: string;
  contactType: string;
  contactValue: string;
  [key: string]: unknown;
}

export interface StudentModalState {
  type: StudentModalType;
  studentId: string | null;
}

export interface StudentRowProps {
  index: number;
  student: CourseStudent;
  onRemove: (studentId: string) => void;
}

export interface CourseStudentsPageProps {
  courseId: string;
}

export interface StudentFiltersProps {
  keyword: string;
  statusFilter: StudentStatus | '';
  searchSuggestions?: SearchSuggestion[];
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: StudentStatus | '') => void;
  onAddStudent: () => void;
}

export interface StudentTableProps {
  students: CourseStudent[];
  totalCount: number;
  currentPage: number;
  totalPages: number;
  startIndex: number;
  keyword: string;
  statusFilter: StudentStatus | '';
  searchSuggestions?: SearchSuggestion[];
  courseTitle: string;
  onKeywordChange: (value: string) => void;
  onStatusChange: (value: StudentStatus | '') => void;
  onPageChange: (page: number) => void;
  onRemove: (studentId: string) => void;
  onAddStudent: () => void;
  onBack: () => void;
}

