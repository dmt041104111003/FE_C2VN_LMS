export const COURSES_LABELS = {
  sectionTitle: 'Khóa học nổi bật',
  viewAll: 'Xem tất cả',
  instructorPrefix: 'Giảng viên:',
  viewDetail: 'Xem chi tiết',
} as const;

export const COURSES_IMAGES = [
  '/course/1.jpg',
  '/course/2.jpg',
  '/course/3.jpg',
] as const;

export const MOCK_COURSES = [
  {
    id: '1',
    title: 'React & Next.js Cơ Bản',
    instructor: 'Nguyễn Văn A',
    price: 599000,
    tag: 'Web',
  },
  {
    id: '2',
    title: 'Node.js Backend',
    instructor: 'Trần Văn B',
    price: 499000,
    tag: 'Backend',
  },
  {
    id: '3',
    title: 'Blockchain & Smart Contract',
    instructor: 'Lê Thị C',
    price: 799000,
    tag: 'Blockchain',
  },
] as const;

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};
