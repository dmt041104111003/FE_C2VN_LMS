export type StudentStatus = 'active' | 'completed';
export type StudentContactType = 'email' | 'wallet';
export type StudentModalType = 'remove' | null;
export type SearchSuggestionType = 'course' | 'instructor' | 'tag';

export interface CourseStudent {
  id: string;
  fullName: string;
  email: string;
  walletAddress?: string;
  enrolledAt: string;
  status: StudentStatus;
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

export interface EditStudentModalState {
  isOpen: boolean;
  studentId: string | null;
  initialData: StudentFormData;
}

export interface SearchSuggestion {
  text: string;
  type: SearchSuggestionType;
}

export interface StudentRowProps {
  index: number;
  student: CourseStudent;
  onEdit: (studentId: string) => void;
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
  onEdit: (studentId: string) => void;
  onRemove: (studentId: string) => void;
  onBack: () => void;
}

