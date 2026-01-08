import { isFeatureSupported } from '@/utils/compatibility';

const AboutMobilePage = () => {
  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8">
      <section className="space-y-5 rounded-2xl bg-white p-6 shadow-lg">
        <p className="text-xs uppercase tracking-widest text-slate-400">About</p>
        <h1 className="text-3xl font-bold text-primary">关于本示例</h1>
        <p className="text-sm text-slate-600">
          该页面展示相同的 SEO 注入以及基础布局,后续可扩展为 SSG/SSR 内容来源。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
          <li>多入口 Vite 配置,支持增量扩展页面。</li>
          <li>Tailwind + 全局主题,保证两端视觉统一。</li>
          <li>工程化工具链(ESLint、Prettier、Husky、lint-staged)。</li>
        </ul>
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-xs text-slate-500">
          <p>
            IntersectionObserver 支持:
            <strong className="ml-2 text-primary">
              {isFeatureSupported('intersectionObserver') ? '是' : '否'}
            </strong>
          </p>
        </div>
      </section>
    </main>
  );
};

export default AboutMobilePage;
