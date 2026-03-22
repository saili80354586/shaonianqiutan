const wait = (ms = 200) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ApiResponse<T> {
  code: number;
  message: string;
  data: T;
}

const mockUser = {
  id: 1,
  email: 'admin@example.com',
  phone: '13800000000',
  status: 1,
  profile: {
    id: 1,
    user_id: 1,
    avatar: '',
    nickname: '管理员',
    graduation: 2015,
    school: '示例大学',
    department: '计算机学院',
    major: '软件工程',
    company: '校友会',
    position: '平台管理员',
    city: '上海',
    intro: '负责校友平台的日常运营。',
    wechat: 'alumni_admin',
    is_public: true,
  },
};

const mockNews = [
  {
    id: 1,
    title: '校友会年度大会即将举行',
    summary: '欢迎各地校友报名参加年度大会，围绕连接、职业与未来展开深度交流。',
    content: '本次大会将围绕校友交流与职业发展展开。',
    category: '活动公告',
    view_count: 128,
    created_at: '2026-03-20T10:00:00+08:00',
    author: { email: 'editor@example.com', profile: { nickname: '编辑部' } },
  },
  {
    id: 2,
    title: '优秀校友创业项目获奖',
    summary: '多位校友项目在创新创业大赛中获奖，覆盖 AI、教育和医疗等多个领域。',
    content: '获奖项目覆盖 AI、教育、医疗多个领域。',
    category: '校友成就',
    view_count: 86,
    created_at: '2026-03-18T12:00:00+08:00',
    author: { email: 'media@example.com', profile: { nickname: '校友媒体' } },
  },
];

const mockActivities = [
  {
    id: 1,
    title: '2026 校友春季交流会',
    description: '线下交流 + 行业分享 + 自由社交，让不同城市与行业的校友重新建立连接。',
    location: '上海张江',
    organizer: { email: 'admin@example.com', profile: { nickname: '管理员' } },
    start_time: '2026-03-25T08:05:00+08:00',
    end_time: '2026-03-25T12:05:00+08:00',
    max_capacity: 100,
    current_num: 13,
    status: 1,
    type: '校友聚会',
  },
  {
    id: 2,
    title: '联调创建活动2',
    description: '测试活动 2，验证活动模块从创建到展示的完整链路。',
    location: '上海',
    organizer: { email: 'admin@example.com', profile: { nickname: '管理员' } },
    start_time: '2026-03-31T10:00:00+08:00',
    end_time: '2026-03-31T12:00:00+08:00',
    max_capacity: 50,
    current_num: 0,
    status: 1,
    type: '校友聚会',
  },
];

const mockAlumni = [
  { id: 1, nickname: '张三', graduation: 2020, major: '计算机科学', company: '字节跳动', position: '后端工程师', city: '北京', avatar: '' },
  { id: 2, nickname: '李四', graduation: 2019, major: '软件工程', company: '腾讯', position: '前端工程师', city: '深圳', avatar: '' },
  { id: 3, nickname: '王五', graduation: 2021, major: '人工智能', company: '阿里云', position: '算法工程师', city: '杭州', avatar: '' },
];

const mockJobs = [
  {
    id: 1,
    title: '后端开发工程师',
    company: '字节跳动',
    position: 'Golang 开发',
    city: '北京',
    salary_min: 25000,
    salary_max: 45000,
    type: '全职',
    description: '负责平台后端服务开发。',
    requirements: 'Golang, MySQL, Redis',
    publisher: { email: 'hr@bytedance.example.com', profile: { nickname: '字节 HR' } },
    created_at: '2026-03-20T09:00:00+08:00',
  },
  {
    id: 2,
    title: '前端开发工程师',
    company: '腾讯',
    position: 'React 开发',
    city: '深圳',
    salary_min: 22000,
    salary_max: 40000,
    type: '全职',
    description: '负责 Web 前端应用建设。',
    requirements: 'React, TypeScript',
    publisher: { email: 'hr@tencent.example.com', profile: { nickname: '腾讯 HR' } },
    created_at: '2026-03-19T14:00:00+08:00',
  },
];

const mockPosts = [
  {
    id: 1,
    title: '大家最近都在用什么 AI 开发工具？',
    content: '欢迎分享你们最近的使用体验和踩坑记录。',
    category: '交流讨论',
    author: { email: 'admin@example.com', profile: { nickname: '管理员' } },
    created_at: '2026-03-20T11:00:00+08:00',
    view_count: 36,
    comment_count: 5,
    is_top: false,
    is_locked: false,
  },
  {
    id: 2,
    title: '联调测试帖5',
    content: '第五条测试帖子，当前用于展示论坛风格与联调结果。',
    category: '交流讨论',
    author: { email: 'admin@example.com', profile: { nickname: '管理员' } },
    created_at: '2026-03-22T10:43:00+08:00',
    view_count: 12,
    comment_count: 1,
    is_top: false,
    is_locked: false,
  },
];

const mockDonationProjects = [
  {
    id: 1,
    title: '奖学金专项基金',
    description: '用于支持优秀学生与困难学生。',
    target_amount: 5000000,
    raised_amount: 1258000,
    start_date: '2026-02-20T08:05:35+08:00',
    end_date: '2026-05-21T08:05:35+08:00',
    status: 1,
    category: '奖学金',
  },
];

export const authAPI = {
  login: async (data: { email: string; password: string }) => {
    await wait();
    if (!data.email || !data.password) throw new Error('请输入账号密码');
    return { code: 0, message: 'Login successful', data: { user_id: 1, email: data.email, token: 'mock-token' } } as ApiResponse<{ user_id: number; email: string; token: string }>;
  },
  register: async (data: { email: string; password: string; phone?: string }) => {
    await wait();
    return { code: 0, message: 'Registration successful', data: { user_id: 2, email: data.email, token: 'mock-token' } };
  },
  refreshToken: async () => {
    await wait();
    return { code: 0, message: 'Token refreshed', data: { token: 'mock-token' } };
  },
};

export const profileAPI = {
  getProfile: async () => {
    await wait();
    return { code: 0, message: 'Success', data: mockUser };
  },
  updateProfile: async (data: any) => {
    await wait();
    Object.assign(mockUser.profile, data);
    return { code: 0, message: 'Profile updated', data: mockUser };
  },
  uploadAvatar: async (_file: File) => {
    await wait();
    return { code: 0, message: 'Avatar uploaded', data: { avatar: '' } };
  },
};

export const alumniAPI = {
  getList: async () => {
    await wait();
    return { code: 0, message: 'Success', data: { list: mockAlumni, total: mockAlumni.length, page: 1, page_size: 50 } };
  },
  getDetail: async (id: number) => {
    await wait();
    return { code: 0, message: 'Success', data: mockAlumni.find((item) => item.id === id) };
  },
};

export const newsAPI = {
  getList: async (page = 1, pageSize = 10) => {
    await wait();
    return { code: 0, message: 'Success', data: { list: mockNews.slice((page - 1) * pageSize, page * pageSize), total: mockNews.length, page, page_size: pageSize } };
  },
  getDetail: async (id: number) => {
    await wait();
    return { code: 0, message: 'Success', data: mockNews.find((item) => item.id === id) };
  },
  create: async (data: any) => {
    await wait();
    return { code: 0, message: 'News created', data };
  },
};

export const activityAPI = {
  getList: async (params?: { page?: number; pageSize?: number }) => {
    await wait();
    const page = params?.page || 1;
    const pageSize = params?.pageSize || 20;
    return { code: 0, message: 'Success', data: { list: mockActivities.slice((page - 1) * pageSize, page * pageSize), total: mockActivities.length, page, page_size: pageSize } };
  },
  getDetail: async (eventId: number) => {
    await wait();
    return { code: 0, message: 'Success', data: mockActivities.find((item) => item.id === eventId) };
  },
  register: async (_eventId: number) => {
    await wait();
    return { code: 0, message: 'Registration successful', data: { id: 1 } };
  },
  create: async (data: any) => {
    await wait();
    return { code: 0, message: 'Event created', data };
  },
};

export const recruitmentAPI = {
  getList: async () => {
    await wait();
    return { code: 0, message: 'Success', data: { list: mockJobs, total: mockJobs.length, page: 1, page_size: 20 } };
  },
  getDetail: async (id: number) => {
    await wait();
    return { code: 0, message: 'Success', data: mockJobs.find((item) => item.id === id) };
  },
  create: async (data: any) => {
    await wait();
    return { code: 0, message: 'Job posted', data };
  },
};

export const forumAPI = {
  getTopics: async (page = 1, pageSize = 20) => {
    await wait();
    return { code: 0, message: 'Success', data: { list: mockPosts.slice((page - 1) * pageSize, page * pageSize), total: mockPosts.length, page, page_size: pageSize } };
  },
  getDetail: async (id: number) => {
    await wait();
    return { code: 0, message: 'Success', data: mockPosts.find((item) => item.id === id) };
  },
  createTopic: async (data: any) => {
    await wait();
    return { code: 0, message: 'Post created', data: { ...data, id: 999, author_id: 1, author: mockUser } };
  },
  addComment: async (_postId: number, data: { content: string; parentId?: number }) => {
    await wait();
    return { code: 0, message: 'Comment added', data: { ...data, id: 999, author_id: 1, author: mockUser } };
  },
};

export const donationAPI = {
  getProjects: async () => {
    await wait();
    return { code: 0, message: 'Success', data: mockDonationProjects };
  },
  create: async (data: any) => {
    await wait();
    return {
      code: 0,
      message: 'Donation created, pending payment',
      data: {
        donation: { id: 1, project_id: 1, user_id: 1, user: mockUser, project: mockDonationProjects[0], ...data },
        payment_url: '/pay/mock',
        payment_methods: ['wechat', 'alipay'],
      },
    };
  },
};
