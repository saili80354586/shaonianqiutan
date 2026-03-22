/**
 * 用户相关类型定义
 */
export interface User {
  id: number;
  username: string;
  email: string;
  name?: string;
  avatar?: string;
  createdAt: string;
}

export interface UserProfile extends User {
  graduationYear?: number;
  major?: string;
  company?: string;
  position?: string;
  location?: string;
  phone?: string;
  wechat?: string;
  bio?: string;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

/**
 * 校友相关类型定义
 */
export interface Alumni {
  id: number;
  name: string;
  graduationYear: number;
  major: string;
  company?: string;
  position?: string;
  location?: string;
  avatar?: string;
}

export interface AlumniFilter {
  page?: number;
  pageSize?: number;
  graduationYear?: number;
  major?: string;
  location?: string;
  keyword?: string;
}

/**
 * 新闻相关类型定义
 */
export interface News {
  id: number;
  title: string;
  summary: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  category: string;
  viewCount: number;
  coverImage?: string;
}

/**
 * 活动相关类型定义
 */
export interface Activity {
  id: number;
  title: string;
  description: string;
  location: string;
  organizer: string;
  startTime: string;
  endTime: string;
  maxParticipants: number;
  currentParticipants: number;
  status: 'upcoming' | 'ongoing' | 'ended';
  createdAt: string;
}

/**
 * 招聘相关类型定义
 */
export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  salary: string;
  type: string;
  description: string;
  requirements: string[];
  postedBy: string;
  createdAt: string;
  status: 'active' | 'closed';
}

/**
 * 论坛相关类型定义
 */
export interface ForumTopic {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
  viewCount: number;
  replyCount: number;
  lastReplyAt?: string;
  category: string;
  isPinned: boolean;
  isLocked: boolean;
}

export interface ForumReply {
  id: number;
  topicId: number;
  content: string;
  author: string;
  createdAt: string;
  updatedAt: string;
}

/**
 * 捐赠相关类型定义
 */
export interface Donation {
  id: number;
  amount: number;
  donorName: string;
  donorEmail: string;
  donorPhone?: string;
  message?: string;
  isAnonymous: boolean;
  createdAt: string;
  status: 'pending' | 'completed' | 'failed';
}

/**
 * 通用分页响应
 */
export interface PageResponse<T> {
  list: T[];
  total: number;
  page: number;
  pageSize: number;
}
