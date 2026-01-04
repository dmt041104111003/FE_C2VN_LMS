import type { ApiResponse, RequestOptions } from '@/types/core.types';
import { API_BASE_URL, API_ERROR_MESSAGES } from '@/constants/api';

export class ApiException extends Error {
  code: number;
  
  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.name = 'ApiException';
  }
}

async function request<T>(
  method: string,
  endpoint: string,
  data?: unknown,
  options: RequestOptions = {}
): Promise<T> {
  let url = `${API_BASE_URL}${endpoint}`;
  
  if (options.params) {
    const searchParams = new URLSearchParams(options.params);
    url += `?${searchParams.toString()}`;
  }
  
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  const config: RequestInit = {
    method,
    headers,
    credentials: options.withCredentials !== false ? 'include' : 'omit',
    cache: 'no-store',
  };

  if (data && method !== 'GET') {
    config.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url, config);
    const text = await response.text();
    const json: ApiResponse<T> = text ? JSON.parse(text) : {};

    if (!response.ok) {
      throw new ApiException(
        json.code || response.status,
        json.message || API_ERROR_MESSAGES.DEFAULT_ERROR
      );
    }

    return json.result as T;
  } catch (error) {
    if (error instanceof ApiException) {
      throw error;
    }
    throw new ApiException(500, API_ERROR_MESSAGES.CONNECTION_ERROR);
  }
}

export const api = {
  get: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>('GET', endpoint, undefined, options),
    
  post: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => 
    request<T>('POST', endpoint, data, options),
    
  put: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => 
    request<T>('PUT', endpoint, data, options),
    
  patch: <T>(endpoint: string, data?: unknown, options?: RequestOptions) => 
    request<T>('PATCH', endpoint, data, options),
    
  delete: <T>(endpoint: string, options?: RequestOptions) => 
    request<T>('DELETE', endpoint, undefined, options),
};

export interface VideoUploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  duration?: number;
}

const VIDEO_UPLOAD_ERRORS = {
  FILE_TOO_LARGE: 'File quá lớn. Tối đa 100MB',
  SERVER_DOWN: 'Không thể kết nối server. Vui lòng kiểm tra server đang chạy.',
  UPLOAD_FAILED: 'Tải video thất bại',
} as const;

const MAX_VIDEO_SIZE_MB = 60;

export const uploadVideo = async (file: File): Promise<VideoUploadResult> => {
  const fileSizeMB = file.size / (1024 * 1024);
  if (fileSizeMB > MAX_VIDEO_SIZE_MB) {
    throw new Error(VIDEO_UPLOAD_ERRORS.FILE_TOO_LARGE);
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch(`${API_BASE_URL}/api/media/upload-video`, {
      method: 'POST',
      body: formData,
      credentials: 'include',
    });

    const text = await response.text();
    const json = text ? JSON.parse(text) : {};
    
    if (!response.ok) {
      const isFileTooLarge = json.message?.toLowerCase().includes('size') || response.status === 413;
      throw new Error(isFileTooLarge ? VIDEO_UPLOAD_ERRORS.FILE_TOO_LARGE : (json.message || VIDEO_UPLOAD_ERRORS.UPLOAD_FAILED));
    }

    return json.result;
  } catch (err) {
    if (err instanceof TypeError && err.message === 'Failed to fetch') {
      throw new Error(VIDEO_UPLOAD_ERRORS.SERVER_DOWN);
    }
    throw err;
  }
};

export { API_BASE_URL };
