/**
 * API 请求基础配置
 */
const API_BASE_URL = 'http://localhost:8080/api';

/**
 * 获取认证 token
 */
export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

/**
 * 设置认证 token
 */
export const setToken = (token: string): void => {
  localStorage.setItem('token', token);
};

/**
 * 移除认证 token
 */
export const removeToken = (): void => {
  localStorage.removeItem('token');
};

/**
 * 获取当前用户信息
 */
export const getCurrentUser = (): any | null => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    return JSON.parse(userStr);
  }
  return null;
};

/**
 * 设置当前用户信息
 */
export const setCurrentUser = (user: any): void => {
  localStorage.setItem('user', JSON.stringify(user));
};

/**
 * 检查用户是否已登录
 */
export const isAuthenticated = (): boolean => {
  return !!getToken();
};

/**
 * 通用 API 请求方法
 */
export const apiRequest = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<any> => {
  const token = getToken();
  
  const headers = new Headers(options.headers || undefined);
  if (!headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: '请求失败' }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }

  return response.json();
};

/**
 * GET 请求
 */
export const get = (endpoint: string, params?: Record<string, any>): Promise<any> => {
  const queryString = params 
    ? '?' + new URLSearchParams(params).toString()
    : '';
  return apiRequest(endpoint + queryString, { method: 'GET' });
};

/**
 * POST 请求
 */
export const post = (endpoint: string, data?: any): Promise<any> => {
  return apiRequest(endpoint, {
    method: 'POST',
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * PUT 请求
 */
export const put = (endpoint: string, data?: any): Promise<any> => {
  return apiRequest(endpoint, {
    method: 'PUT',
    body: data ? JSON.stringify(data) : undefined,
  });
};

/**
 * DELETE 请求
 */
export const del = (endpoint: string): Promise<any> => {
  return apiRequest(endpoint, { method: 'DELETE' });
};
