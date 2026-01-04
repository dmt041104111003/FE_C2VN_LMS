import { CoursesPage } from '@/components/courses';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khóa học',
  description: 'Khám phá các khóa học Blockchain, Cardano, Smart Contract chất lượng cao.',
};

export default function Courses() {
  return <CoursesPage />;
}

