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

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(price);
};
