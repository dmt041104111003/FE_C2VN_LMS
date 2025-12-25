export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'inverse';
export type ButtonSize = 'sm' | 'md' | 'lg';
export type BadgeVariant = 'default' | 'accent';
export type LogoLayout = 'inline' | 'stacked';
export type LogoSize = 'sm' | 'md' | 'lg';

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
  price?: string;
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
}

export interface FormField {
  name: string;
  type: 'text' | 'email' | 'tel';
  placeholder: string;
  label?: string;
}

export interface FormProps {
  fields: FormField[];
  textareaPlaceholder?: string;
  submitText: string;
  minContentLength?: number;
  onSubmit?: (data: Record<string, string>) => void;
  className?: string;
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
  type?: 'course' | 'instructor' | 'tag' | 'history';
}

export type RatingSize = 'xs' | 'sm' | 'md';

export interface RatingProps {
  value: number;
  count?: number;
  showValue?: boolean;
  showCount?: boolean;
  size?: RatingSize;
  className?: string;
}

export type InstructorSize = 'xs' | 'sm' | 'md';

export interface InstructorProps {
  name: string;
  avatar?: string;
  label?: string;
  size?: InstructorSize;
  className?: string;
}

export interface TagsProps {
  tags: string[];
  max?: number;
  className?: string;
}

export interface PriceDisplayProps {
  price: number;
  currency: string;
  discount?: number;
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
