export type TechStageMetric = { label: string; value: string; detail: string };

export type TechStage = {
  title: string;
  subtitle: string;
  description: string;
  accent: string;
  mediaLabel: string;
  highlights: string[];
  metrics: TechStageMetric[];
};

export const TECH_STAGES: TechStage[] = [
  {
    title: '滚动叙事引擎',
    subtitle: 'Pinned Scroll Narrative',
    description: 'useScroll + Sticky Section 构建 Apple 式整页翻页，滚动即剧情。',
    accent: '#38bdf8',
    mediaLabel: 'Scroll Sync Canvas',
    highlights: ['Sticky Section 控制显隐', 'MotionValue 控制透明与缩放', 'Snap 点还原翻页感'],
    metrics: [
      { label: '滚动范围', value: '480vh', detail: '四阶段' },
      { label: '动效延迟', value: '120ms', detail: '自然衔接' }
    ]
  },
  {
    title: '视差产品卡',
    subtitle: 'Layered Product Story',
    description: '多层 Parallax 组件，让产品图与文案随进度漂移，强调关键节点。',
    accent: '#f472b6',
    mediaLabel: 'Layered Parallax',
    highlights: ['多段 useTransform 组合', 'Tailwind token 控制颜色', '线性补间避免眩晕'],
    metrics: [
      { label: '深度', value: '3 层', detail: '多层视差' },
      { label: '渲染', value: 'GPU', detail: 'translate3d' }
    ]
  },
  {
    title: '模块化动效',
    subtitle: 'Reusable Motion System',
    description: '所有动画参数整理成 Motion config，可跨页面共用并快速降级。',
    accent: '#facc15',
    mediaLabel: 'Motion Tokens',
    highlights: ['统一 easing/时长', '触控端降级', '可扩展 hooks'],
    metrics: [
      { label: '动效片段', value: '12', detail: '共享' },
      { label: '降级覆盖', value: '100%', detail: '移动端' }
    ]
  },
  {
    title: '数据驱动',
    subtitle: 'CMS Friendly',
    description: '内容层通过 JSON 配置，保障与 CMS/营销后台接入的弹性与复用。',
    accent: '#34d399',
    mediaLabel: 'Data Orchestration',
    highlights: ['内容 / 表现解耦', '支持多语言', 'MPA 独立 SEO'],
    metrics: [
      { label: '复用率', value: '80%', detail: '模块' },
      { label: '上线周期', value: '48h', detail: '从需求到投放' }
    ]
  }
];
