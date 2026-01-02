export const TAG_LABELS = {
  title: 'Quản lý thẻ',
  pageTitle: 'Thẻ khóa học',
  addTag: 'Thêm thẻ',
  inputPlaceholder: 'Nhập tên thẻ mới...',
  empty: 'Chưa có thẻ nào. Hãy tạo thẻ mới.',
  delete: 'Xóa',
  courses: 'khóa học',
  toast: {
    createSuccess: 'Đã tạo thẻ mới',
    deleteSuccess: 'Đã xóa thẻ',
    createError: 'Không thể tạo thẻ',
    deleteError: 'Không thể xóa thẻ',
    loadError: 'Không thể tải danh sách thẻ',
    emptyName: 'Vui lòng nhập tên thẻ',
  },
  confirm: {
    deleteTitle: 'Xóa thẻ',
    deleteMessage: 'Bạn có chắc muốn xóa thẻ này? Thao tác không thể hoàn tác.',
  },
} as const;

export const TAG_STYLES = {
  PAGE: 'p-4 sm:p-6 space-y-6',
  HEADER: 'flex items-center justify-between gap-4',
  TITLE: 'text-xl sm:text-2xl font-bold text-[var(--text)]',
  INPUT_GROUP: 'flex gap-2',
  INPUT: 'flex-1 px-4 py-2.5 border border-[var(--border)] rounded-lg text-sm focus:outline-none focus:border-[var(--accent)] transition-colors disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-[var(--bg-alt)]',
  LIST: 'space-y-2',
  TAG_CARD: 'flex items-center justify-between p-4 bg-[var(--bg-alt)]/30 border border-[var(--border)] rounded-xl hover:border-[var(--accent)]/30 transition-colors',
  TAG_INFO: 'flex flex-col gap-1',
  TAG_NAME: 'font-medium text-[var(--text)]',
  TAG_META: 'text-xs text-[var(--text)]/50',
  DELETE_BTN: 'p-2 text-[var(--text)]/40 hover:text-[var(--incorrect)] hover:bg-[var(--incorrect)]/10 rounded-lg transition-colors',
  EMPTY: 'text-center py-12 text-[var(--text)]/50',
} as const;


