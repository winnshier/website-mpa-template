export type HeroSlide = {
  id: number;
  tag: string;
  title: string;
  description: string;
  image: string;
  metric: string;
  alt: string;
};

export type FeatureCard = {
  title: string;
  description: string;
  metric: string;
  detail: string;
};

export type ProductModule = {
  title: string;
  copy: string;
  bullets: string[];
  accent: string;
};

export type ExperienceStat = {
  label: string;
  value: string;
  detail: string;
};

export const HERO_SLIDES: HeroSlide[] = [
  {
    id: 1,
    tag: 'Immersive',
    title: '沉浸式首屏',
    description: '全屏媒体与渐变遮罩结合 Scroll 动画, 把品牌情绪推到极致。',
    image: 'https://images.unsplash.com/photo-1472289065668-ce650ac443d2?auto=format&fit=crop&w=2000&q=80',
    metric: '0.7s 首屏',
    alt: '沉浸式首屏展示 - 自然风光'
  },
  {
    id: 2,
    tag: 'Architecture',
    title: '多页面架构',
    description: 'Vite + React MPA 入口, 每个页面独立 SEO 配置, 运营侧可定制。',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=2000&q=80',
    metric: '98 Lighthouse',
    alt: '多页面架构展示 - 现代建筑'
  },
  {
    id: 3,
    tag: 'Automation',
    title: '自动化体验',
    description: '脚本注入 metadata / JSON-LD, 结合 Swiper 与 Motion 讲述产品故事。',
    image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=2000&q=80',
    metric: '3x 复用',
    alt: '自动化体验展示 - 科技感'
  }
];

export const FEATURE_CARDS: FeatureCard[] = [
  {
    title: '预渲染 SEO',
    description: '构建时注入 meta、sitemap 以及 JSON-LD, 离线也能保障爬虫可见性。',
    metric: '0.7s',
    detail: '首屏渲染'
  },
  {
    title: '响应式组件',
    description: 'Hook 控制 PC/Mobile 组件树, 不再通过 CSS 单纯隐藏, 保证性能。',
    metric: '3 套',
    detail: '断点策略'
  },
  {
    title: '交互动效',
    description: 'Framer Motion 统一管理 hover / scroll / in-view 动画语义, 平滑自然。',
    metric: '8+',
    detail: '共享动效'
  }
];

export const PRODUCT_STREAM: ProductModule[] = [
  {
    title: '模块化内容架构',
    copy: '以数据驱动 Hero / Feature / Story, UI 组件只关注展示, 随时与 CMS 接入。',
    bullets: ['Swiper + Motion 组合大背景轮播', 'Tailwind Token 保证品牌一致性', '多段 CTA 复用'],
    accent: '#45d1c4'
  },
  {
    title: '产品故事线',
    copy: '三段式产品叙事, 结合图文对比和指标, 强调价值落地而非堆砌功能点。',
    bullets: ['强调场景 → 方案 → 结果', '支持扩展更多行业模块', '滚动视差凸显节点'],
    accent: '#1f3b73'
  },
  {
    title: '沉浸交互系统',
    copy: '利用 Motion Value + Tailwind snap 创建 Apple 式滚动体验, 支持降级方案。',
    bullets: ['Sticky Section 控制', '用 useScroll 同步进度', '移动端自动降级'],
    accent: '#f4c152'
  }
];

export const EXPERIENCE_STATS: ExperienceStat[] = [
  { label: '访问路径', value: 'MPA + 预渲染', detail: '页面独立入口' },
  { label: '交互耗时', value: '< 16ms', detail: '动画帧率稳定' },
  { label: '组件复用', value: '12', detail: '跨页模块' }
];
