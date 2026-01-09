export type CompanyValue = {
  title: string;
  description: string;
  metric: string;
  helper: string;
};

export type TeamMember = {
  name: string;
  role: string;
  focus: string;
  quote: string;
};

export type ShareCopy = {
  title: string;
  description: string;
  url: string;
};

export const COMPANY_VALUES: CompanyValue[] = [
  {
    title: '体验驱动',
    description: '设计到开发全链路一体化, 将 Apple 式体验复制到企业官网。',
    metric: '1.3s',
    helper: 'LCP'
  },
  {
    title: '全栈可控',
    description: 'MPA 结构 + SEO 脚本可视化, 方便运营与开发协同。',
    metric: '12',
    helper: '复用模块'
  },
  {
    title: '交付保障',
    description: '流水线式代码规范 + 测试脚本, 保证 24h 内交付迭代。',
    metric: '24h',
    helper: '更新效率'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Winn',
    role: 'UX Engineer',
    focus: '动效叙事 / 体验策略',
    quote: '把品牌故事转换成交互语言。'
  },
  {
    name: 'Nova',
    role: 'Frontend Lead',
    focus: '工程架构 / MPA 扩展',
    quote: '保证多端一致的工程体验。'
  },
  {
    name: 'Lynn',
    role: 'Motion Designer',
    focus: 'Motion System',
    quote: '每个滚动节点都是剧情。'
  },
  {
    name: 'Chen',
    role: 'Ops Strategist',
    focus: '内容 / SEO',
    quote: '让技术价值传达到每个渠道。'
  }
];

export const SHARE_COPY: ShareCopy = {
  title: 'React MPA Studio',
  description: '打造具备 SEO 能力的沉浸式多页面站点。',
  url: 'https://example.com/about'
};
