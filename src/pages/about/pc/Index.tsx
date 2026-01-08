import { isFeatureSupported } from '@/utils/compatibility';

const AboutPCPage = () => {
  return (
    <main className="min-h-screen bg-slate-100 px-6 py-12">
      <section className="mx-auto max-w-3xl space-y-6 rounded-3xl bg-white p-10 shadow-lg">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-400">About</p>
        <h1 className="text-4xl font-bold text-primary">关于本示例</h1>
        <p className="text-slate-600">
          该页面展示相同的 SEO 注入以及基础布局,后续可扩展为 SSG/SSR 内容来源。我们同时检测浏览器特性以决定是否加载兼容性 Polyfill。
        </p>
        <ul className="list-disc space-y-2 pl-5 text-slate-600">
          <li>多入口 Vite 配置,支持增量扩展页面。</li>
          <li>Tailwind + 全局主题,保证两端视觉统一。</li>
          <li>工程化工具链(ESLint、Prettier、Husky、lint-staged)。</li>
        </ul>
        <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6 text-sm text-slate-500">
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

export default AboutPCPage;
