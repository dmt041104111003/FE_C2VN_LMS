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
  totalLessons: number;
  totalStudents: number;
  rating?: number;
  tags?: string[];
  status: 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';
  createdAt: string;
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

