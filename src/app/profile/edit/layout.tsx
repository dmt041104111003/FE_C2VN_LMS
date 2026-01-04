import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Chỉnh sửa hồ sơ',
  description: 'Cập nhật thông tin cá nhân của bạn trên C2VN.',
};

export default function EditProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}

