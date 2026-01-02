export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'default' | 'accent';
export type LogoLayout = 'inline' | 'stacked';
export type LogoSize = 'sm' | 'md' | 'lg';

export type TabsVariant = 'default' | 'pills' | 'underline';
export type TabsSize = 'sm' | 'md' | 'lg';

export interface TabItem {
  key: string;
  label: string;
  disabled?: boolean;
  badge?: string | number;
}

export interface TabsProps {
  items: TabItem[];
  activeKey: string;
  onChange: (key: string) => void;
  variant?: TabsVariant;
  size?: TabsSize;
  fullWidth?: boolean;
  className?: string;
}

export interface TabPanelProps {
  children: React.ReactNode;
  isActive: boolean;
  className?: string;
}

export interface TabButtonProps {
  item: TabItem;
  isActive: boolean;
  variant: TabsVariant;
  size: TabsSize;
  onClick: () => void;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}


export interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export interface LogoProps {
  className?: string;
  compact?: boolean;
  showText?: boolean;
  layout?: LogoLayout;
  size?: LogoSize;
  href?: string;
}

export interface LinkGroupProps {
  title: string;
  links: readonly { label: string; href: string }[];
}

export interface LightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export type CardVariant = 'default' | 'horizontal' | 'compact' | 'list';
export type CardSize = 'sm' | 'md' | 'lg';

export interface CardProps {
  title: string;
  subtitle?: string;
  image?: string;
  variant?: CardVariant;
  size?: CardSize;
  href?: string;
  onClick?: () => void;
  className?: string;
}

export interface CardModalItem {
  image?: string;
  tag?: string;
  title: string;
  subtitle?: string;
  price?: number;
  currency?: string;
  discount?: number;
  discountEndTime?: string;
  buttonText?: string;
  buttonHref?: string;
}

export interface CardModalProps {
  items: CardModalItem[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onGoTo: (index: number) => void;
}

export type FormFieldType = 'text' | 'email' | 'select' | 'textarea';

export interface FormFieldOption {
  value: string;
  label: string;
}

export interface FormFieldConfig {
  name: string;
  label: string;
  type: FormFieldType;
  placeholder?: string;
  options?: FormFieldOption[];
  required?: boolean;
  autoFocus?: boolean;
}

export interface FormModalLabels {
  title: string;
  tag?: string;
  subtitle?: string;
  submit: string;
  cancel: string;
  clearForm: string;
  resumeDialog: {
    title: string;
    message: string;
    continueText: string;
    newText: string;
  };
}

export interface FormModalProps<T extends Record<string, unknown>> {
  isOpen: boolean;
  labels: FormModalLabels;
  fields: FormFieldConfig[];
  storageKey: string;
  initialData: T;
  isEmpty: (data: T) => boolean;
  isValid: (data: T) => boolean;
  onClose: () => void;
  onSubmit: (data: T) => void;
  disabled?: boolean;
}

export type InputVariant = 'default' | 'search' | 'rounded' | 'minimal';
export type InputSize = 'sm' | 'md' | 'lg';

export interface InputProps {
  type?: 'text' | 'email' | 'tel' | 'password' | 'search';
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
  autoFocus?: boolean;
  required?: boolean;
  disabled?: boolean;
}

export interface TextareaProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  variant?: InputVariant;
  size?: InputSize;
  className?: string;
  rows?: number;
  required?: boolean;
  disabled?: boolean;
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel';
  placeholder: string;
  label?: string;
  minLength?: number;
}

export interface FormProps {
  fields: FormField[];
  textareaPlaceholder?: string;
  submitText: string;
  minContentLength?: number;
  layout?: 'row' | 'column';
  showSubmitAlways?: boolean;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
  footer?: React.ReactNode;
  disabled?: boolean;
}

export interface WalletItem {
  key: string;
  name: string;
  icon?: string;
}

export interface WalletModalProps {
  isOpen: boolean;
  wallets: WalletItem[];
  emptyText: string;
  onClose: () => void;
  onSelect: (wallet: WalletItem) => void;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export type RatingFilterType = 0 | 4 | 4.5;

export interface PriceRange {
  min: number;
  max: number;
}

export interface FilterOption<T = string> {
  value: T;
  label: string;
}

export interface SearchSuggestionItem {
  text: string;
  type?: 'course' | 'instructor' | 'tag' | 'history' | 'USER' | 'INSTRUCTOR' | 'ADMIN';
}

export interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect?: (suggestion: SearchSuggestionItem) => void;
  suggestions?: SearchSuggestionItem[];
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  showIcon?: boolean;
}

export type RatingSize = 'xs' | 'sm' | 'md';
export type RatingVariant = 'default' | 'light';

export interface RatingProps {
  value: number;
  count?: number;
  showValue?: boolean;
  showCount?: boolean;
  size?: RatingSize;
  variant?: RatingVariant;
  className?: string;
}

export type UserAvatarSize = 'xs' | 'sm' | 'md' | 'lg';

export interface UserProps {
  name: string;
  avatar?: string;
  label?: string;
  description?: string;
  maxDescriptionLength?: number;
  size?: UserAvatarSize;
  className?: string;
}

export interface TagsProps {
  tags: string[];
  max?: number;
  className?: string;
}

export interface PriceDisplayProps {
  price: number;
  currency?: string;
  discount?: number;
  discountEndTime?: string;
  freeText?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export interface FeatureItemProps {
  text: string;
  size?: 'xs' | 'sm';
}

export interface FeatureListProps {
  features: string[];
  size?: 'xs' | 'sm';
  columns?: 1 | 2;
  className?: string;
}

export interface FilterProps {
  search: string;
  onSearchChange: (value: string) => void;
  searchPlaceholder?: string;
  searchSuggestions?: SearchSuggestionItem[];
  priceRange: PriceRange;
  onPriceRangeChange: (range: PriceRange) => void;
  maxPrice: number;
  currency?: string;
  tagFilter: string;
  onTagFilterChange: (value: string) => void;
  tagOptions: FilterOption<string>[];
  ratingFilter: RatingFilterType;
  onRatingFilterChange: (value: RatingFilterType) => void;
  ratingOptions: FilterOption<RatingFilterType>[];
  className?: string;
}

export interface VideoPlayerProps {
  url: string;
  className?: string;
  startTime?: number;
  onDurationChange?: (minutes: number) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export interface YTPlayer {
  destroy: () => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  seekTo: (seconds: number, allowSeekAhead?: boolean) => void;
  playVideo: () => void;
  pauseVideo: () => void;
  getPlayerState: () => number;
}

export interface YTPlayerConfig {
  videoId: string;
  playerVars?: Record<string, number | undefined>;
  events?: {
    onReady?: (event: { target: YTPlayer }) => void;
    onStateChange?: (event: { data: number; target: YTPlayer }) => void;
  };
}

export interface YouTubePlayerProps {
  videoId: string;
  className: string;
  startTime?: number;
  onDurationChange?: (duration: number) => void;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
  onComplete?: () => void;
  onPlay?: () => void;
  onPause?: () => void;
}

export interface VideoModalProps {
  isOpen: boolean;
  videoUrl: string;
  title?: string;
  subtitle?: string;
  onClose: () => void;
  onDurationChange?: (minutes: number) => void;
}

export interface SearchModalProps {
  onClose: () => void;
}

export interface PrevNextProps {
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  prevLabel?: string;
  nextLabel?: string;
  className?: string;
}

export type ProgressBarSize = 'xs' | 'sm' | 'md';

export interface ProgressBarProps {
  value: number;
  max?: number;
  size?: ProgressBarSize;
  showLabel?: boolean;
  className?: string;
}

export interface RadioProps {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  className?: string;
}

export interface CheckboxProps {
  checked?: boolean;
  onChange?: () => void;
  disabled?: boolean;
  className?: string;
}

export type StatusBadgeVariant = 'default' | 'success' | 'danger' | 'warning' | 'info';

export interface StatusBadgeProps {
  children: React.ReactNode;
  variant?: StatusBadgeVariant;
  className?: string;
}

export interface PageLayoutProps {
  children: React.ReactNode;
}

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export interface PanelProps {
  title?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  action?: React.ReactNode;
}

export interface StatCardProps {
  value: string | number;
  label: string;
  icon?: React.ReactNode;
}

export interface DataTableProps {
  headers: string[];
  children: React.ReactNode;
  emptyMessage?: string;
  isEmpty?: boolean;
}

export interface TableRowProps {
  children: React.ReactNode;
  mobileTitle?: string;
}

export interface TableCellProps {
  children: React.ReactNode;
  label?: string;
  className?: string;
  hideOnMobile?: boolean;
  isActions?: boolean;
}

export interface ActionButtonProps {
  icon: React.ReactNode;
  onClick: () => void;
  title?: string;
  danger?: boolean;
}

export interface DropdownItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
}

export interface ActionDropdownProps {
  items: DropdownItem[];
  label?: string;
}

export interface DropdownPosition {
  top: number;
  left: number;
}

export interface UserCellProps {
  name: string;
  email: string;
  avatar?: string;
  showAvatar?: boolean;
  copyable?: boolean;
  copySuccessMessage?: string;
}

export interface CopyableTextProps {
  text: string;
  maxLength?: number;
  className?: string;
  successMessage?: string;
}

export interface SearchFilterProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onSearch?: () => void;
}

export interface SelectFilterProps {
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

export interface SidebarItem {
  id: string;
  title: string;
  icon?: React.FC<{ className?: string }>;
  meta?: string;
  badge?: number;
  disabled?: boolean;
  href?: string;
}

export interface SidebarSection {
  id: string;
  title: string;
  items: SidebarItem[];
  defaultOpen?: boolean;
}

export interface SidebarProps {
  sections?: SidebarSection[];
  items?: SidebarItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  header?: React.ReactNode;
  footer?: React.ReactNode;
  backLink?: { href: string; label: string };
  collapsible?: boolean;
}

export interface SidebarLayoutHeaderProps {
  title?: string;
  subtitle?: string;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  rightContent?: React.ReactNode;
}

export interface SidebarLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
  header?: SidebarLayoutHeaderProps;
  sidebarWidth?: string;
}

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastItem {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

export interface ToastContextValue {
  toasts: ToastItem[];
  addToast: (type: ToastType, message: string, duration?: number) => void;
  removeToast: (id: string) => void;
}

export interface ToastItemProps {
  toast: ToastItem;
  onClose: () => void;
}

export interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  title?: string;
  message?: string;
  primaryText?: string;
  secondaryText?: string;
  danger?: boolean;
  onPrimary?: () => void;
  onSecondary?: () => void;
}
