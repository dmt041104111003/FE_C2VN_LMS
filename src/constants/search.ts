export const SEARCH_PLACEHOLDER = 'Bạn muốn học gì?';

export const SEARCH_LABELS = {
  popularTitle: 'Các chuyên ngành phổ biến nhất',
  trendingTitle: 'Đang phổ biến hiện nay',
  footerText: 'Không chắc chắn bắt đầu từ đâu?',
  footerLink: 'Khám phá tất cả khóa học →',
} as const;

export const POPULAR_COURSES = [
  {
    title: 'Blockchain Fundamentals',
    provider: 'C2VN',
    image: '/loading.png',
  },
  {
    title: 'Smart Contract Development',
    provider: 'C2VN',
    image: '/loading.png',
  },
  {
    title: 'DApp với Cardano',
    provider: 'C2VN',
    image: '/loading.png',
  },
] as const;

export const TRENDING_SEARCHES = [
  'blockchain',
  'smart contract',
  'cardano',
  'nft',
  'defi',
] as const;

