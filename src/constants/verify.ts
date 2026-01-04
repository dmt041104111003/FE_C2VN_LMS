export const VERIFY_LABELS = {
  title: 'Xác minh chứng chỉ',
  subtitle: 'Kiểm tra tính xác thực của chứng chỉ NFT trên blockchain Cardano',
  walletAddress: 'Địa chỉ ví',
  walletPlaceholder: 'addr...',
  courseTitle: 'Tên khóa học',
  coursePlaceholder: 'Nhập tên khóa học...',
  verify: 'Xác minh',
  valid: 'Chứng chỉ hợp lệ',
  invalid: 'Không tìm thấy',
  course: 'Khóa học',
  student: 'Học viên',
  issuedAt: 'Ngày cấp',
  txHash: 'Chi tiết',
  viewOnChain: 'Xem trên Cardanoscan',
  notFoundDesc: 'Vui lòng kiểm tra lại thông tin đã nhập',
  required: 'Vui lòng nhập đầy đủ thông tin',
  emptyState: 'Nhập thông tin để xác minh chứng chỉ',
  tabInfo: 'Thông tin',
  tabImage: 'Chứng chỉ',
} as const;

export const VERIFY_PAGE = {
  WRAPPER: 'min-h-screen flex flex-col bg-[var(--bg)]',
  MAIN: 'flex-1 py-8 px-4',
  CONTAINER: 'max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-start',
  LEFT: 'w-full max-w-md',
  RIGHT: 'w-full',
  HEADER: 'mb-6',
  TITLE: 'text-2xl sm:text-3xl font-light text-[var(--text)] tracking-wide',
  SUBTITLE: 'text-sm text-[var(--text)]/50 mt-2',
  LABELS: VERIFY_LABELS,
} as const;

export const VERIFY_FORM = {
  WRAPPER: 'space-y-4',
  LABEL: 'block text-xs text-[var(--text)]/50 mb-1.5',
} as const;

export const VERIFY_RESULT = {
  CARD: 'rounded-xl overflow-hidden',
  VALID_HEADER: 'bg-[var(--correct)]/5 border-b border-[var(--correct)]/10 p-4 flex items-center gap-3 text-[var(--correct)]',
  INVALID_HEADER: 'bg-[var(--incorrect)]/5 border-b border-[var(--incorrect)]/10 p-4 flex items-center gap-3 text-[var(--incorrect)]',
  EMPTY: 'p-8 text-center',
  ICON: 'w-5 h-5',
  TITLE: 'font-medium',
  BODY: 'p-4',
  IMAGE: 'w-full rounded-lg',
  ROW: 'flex justify-between items-center py-3 border-b border-[var(--text)]/5 last:border-0',
  ROW_LABEL: 'text-sm text-[var(--text)]/50',
  ROW_VALUE: 'text-sm text-[var(--text)] text-right break-all',
  LINK: 'text-sm text-[var(--accent)] hover:underline flex items-center gap-1',
} as const;

const CARDANO_SCAN_URLS = {
  mainnet: 'https://cardanoscan.io/transaction/',
  preprod: 'https://preprod.cardanoscan.io/transaction/',
  preview: 'https://preview.cardanoscan.io/transaction/',
} as const;

export const getCardanoScanUrl = (walletAddress?: string): string => {
  if (!walletAddress) return CARDANO_SCAN_URLS.preprod;
  if (walletAddress.startsWith('addr1')) return CARDANO_SCAN_URLS.mainnet;
  return CARDANO_SCAN_URLS.preprod;
};
