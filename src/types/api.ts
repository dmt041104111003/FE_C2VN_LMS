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
