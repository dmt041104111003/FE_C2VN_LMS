export const ROUTES = {
  HOME: '/',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses',
  LOGIN: '/auth/login',
  REGISTER: '/auth/register',
  VERIFY_EMAIL: '/auth/verify-email',
  FORGOT_PASSWORD: '/auth/forgot-password',
  RESET_PASSWORD: '/auth/reset-password',
  CHANGE_PASSWORD: '/auth/change-password',
  ABOUT: '/about',
  PROJECT: '/project',
  CATALYST: '/catalyst',
  PRIVACY: '/privacy',
  TERMS: '/terms',
  DOCS: '/docs',
  BLOG: '/blog',
  FAQ: '/faq',
  FORUM: '/forum',
} as const;

export const NAV_ITEMS = [
  {
    label: 'Trang chủ',
    href: ROUTES.HOME,
  },
  {
    label: 'Khóa học',
    href: ROUTES.COURSES,
    children: [
      { label: 'Tất cả khóa học', href: ROUTES.COURSES },
      { label: 'Khóa học miễn phí', href: `${ROUTES.COURSES}?price=free` },
      { label: 'Khóa học trả phí', href: `${ROUTES.COURSES}?price=paid` },
    ],
  },
  {
    label: 'Tài nguyên',
    href: ROUTES.DOCS,
    children: [
      { label: 'Tài liệu', href: ROUTES.DOCS },
      { label: 'Bài viết', href: ROUTES.BLOG },
      { label: 'Video', href: '/videos' },
    ],
  },
  {
    label: 'Cộng đồng',
    href: ROUTES.FORUM,
    children: [
      { label: 'Diễn đàn', href: ROUTES.FORUM },
      { label: 'Sự kiện', href: '/events' },
      { label: 'Dự án Catalyst', href: ROUTES.CATALYST },
    ],
  },
  {
    label: 'Về chúng tôi',
    href: 'https://cardano2vn.io',
  },
] as const;

export const FOOTER_RESOURCES = [
  {
    label: 'Tài liệu',
    href: ROUTES.DOCS,
  },
  {
    label: 'GitHub',
    href: 'https://github.com/cardano2vn',
  },
  {
    label: 'Bài viết',
    href: ROUTES.BLOG,
  },
] as const;

export const FOOTER_SUPPORT = [
  {
    label: 'Cộng đồng',
    href: 'https://t.me/cardano2vn',
  },
  {
    label: 'Câu hỏi thường gặp',
    href: ROUTES.FAQ,
  },
] as const;

export const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/cardano2vn',
    icon: 'github',
  },
  {
    label: 'YouTube',
    href: 'https://youtube.com/@cardano2vn',
    icon: 'youtube',
  },
  {
    label: 'X',
    href: 'https://x.com/cardano2vn',
    icon: 'x',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/cardano2vn',
    icon: 'telegram',
  },
] as const;

export const AUTH_TEXT = {
  login: 'Đăng nhập',
} as const;

export const APP_DOWNLOAD = {
  label: 'Tải app C2VN',
  appStore: 'App Store',
  android: 'Android',
} as const;

export const FOOTER_LABELS = {
  title: 'Theo dõi hành trình',
  description: 'Tham gia cộng đồng C2VN để cập nhật tin tức, chia sẻ kiến thức và kết nối với những người cùng đam mê blockchain.',
  resourcesTitle: 'Tài nguyên',
  supportTitle: 'Hỗ trợ',
  copyright: '© 2025 C2VN.',
  terms: 'Điều khoản',
  privacy: 'Chính sách',
} as const;
