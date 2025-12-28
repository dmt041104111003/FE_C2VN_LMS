import type { ApiResponse, RequestOptions } from '@/types/api';
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

export { API_BASE_URL };
