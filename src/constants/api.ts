export const API_BASE_URL = process.env.SERVER_URL || 'http://localhost:8080';

export const API_ENDPOINTS = {
  AUTH: {
    TOKEN: '/api/auth/token',
    REGISTER: '/api/auth/register',
    VERIFY_EMAIL: '/api/auth/verify-email',
    RESEND_CODE: '/api/auth/resend-code',
    FORGOT_PASSWORD: '/api/auth/forgot-password',
    RESET_PASSWORD: '/api/auth/reset-password',
    LOGOUT: '/api/auth/logout',
    INTROSPECT: '/api/auth/introspect',
    REFRESH: '/api/auth/refresh',
  },
  NONCE: '/api/nonce',
  USERS: {
    BASE: '/api/users',
    MY_INFO: '/api/users/my-info',
    CHANGE_PASSWORD: '/api/users/me/password',
    BY_EMAIL: '/api/users/by-email',
    BY_ID: (userId: string) => `/api/users/${userId}`,
    BAN: (userId: string) => `/api/users/${userId}/ban`,
    UNBAN: (userId: string) => `/api/users/${userId}/unban`,
    UPDATE_ROLE: (userId: string) => `/api/users/updateRole/${userId}`,
    DELETE: (userId: string) => `/api/users/${userId}`,
  },
  OAUTH: {
    GOOGLE: '/oauth2/authorization/google',
    GITHUB: '/oauth2/authorization/github',
  },
} as const;

export const API_ERROR_MESSAGES = {
  CONNECTION_ERROR: 'Không thể kết nối đến server',
  DEFAULT_ERROR: 'Đã có lỗi xảy ra',
} as const;


