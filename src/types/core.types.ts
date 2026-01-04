export interface ApiResponse<T> {
  code?: number;
  message?: string;
  result?: T;
}

export interface ApiError {
  code: number;
  message: string;
}

export type RequestOptions = {
  headers?: Record<string, string>;
  withCredentials?: boolean;
  params?: Record<string, string>;
};

export interface PageResponse<T> {
  content: T[];
  page: number;
  size: number;
  totalElements: number;
  totalPages: number;
}

export interface ModalConfig {
  title: string;
  message: string;
  danger: boolean;
}

export const DEFAULT_MODAL_CONFIG: ModalConfig = {
  title: '',
  message: '',
  danger: false,
};

export interface BaseEntity {
  id: string | number;
  createdAt?: string;
  updatedAt?: string;
}

export interface NamedEntity extends BaseEntity {
  name: string;
}

export interface TitledEntity extends BaseEntity {
  title: string;
}

export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

export type RequiredBy<T, K extends keyof T> = Omit<T, K> & Required<Pick<T, K>>;

export type NonNullableFields<T> = {
  [P in keyof T]: NonNullable<T[P]>;
};

export type ValueOf<T> = T[keyof T];

export type ArrayElement<T> = T extends readonly (infer U)[] ? U : never;

export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type StatusVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface StatusConfig {
  label: string;
  variant: StatusVariant;
}

export type VoidCallback = () => void;
export type AsyncVoidCallback = () => Promise<void>;
export type IdCallback = (id: string | number) => void;
export type AsyncIdCallback = (id: string | number) => Promise<void>;

export type UserRole = 'USER' | 'INSTRUCTOR' | 'ADMIN';
export type UserStatus = 'ACTIVE' | 'INACTIVE' | 'BANNED';
export type LoginMethod = 'EMAIL_PASSWORD' | 'WALLET' | 'GOOGLE' | 'GITHUB';

export type SearchSuggestionType = 'course' | 'instructor' | 'tag' | 'history' | UserRole;

export interface SearchSuggestion {
  text: string;
  type?: SearchSuggestionType;
}
