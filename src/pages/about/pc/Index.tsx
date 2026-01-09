import { motion } from 'framer-motion';
import { isFeatureSupported } from '@/utils/compatibility';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { COMPANY_VALUES, SHARE_COPY, TEAM_MEMBERS } from '../content';
import { SHARE_CHANNELS, shareAbout } from '../share';

const AboutPCPage = () => {
  const compatibility = isFeatureSupported('intersectionObserver');
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="bg-slate-50 py-16 text-slate-900">
      <div className="mx-auto flex max-w-6xl flex-col gap-16 px-12">
        {/* 公司介绍 */}
        <motion.section
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-12 shadow-xl"
        >
          <p className="text-sm uppercase tracking-[0.4em] text-primary/70">About us</p>
          <h1 className="mt-4 text-5xl font-semibold">用系统化思维打造沉浸式官网</h1>
          <p className="mt-6 max-w-3xl text-slate-600">
            我们是一支融合 UX、动效与工程的团队。以 MPA 架构+组件复用为底座，把市场活动、产品发布、
            招商合伙等场景统一在同一份代码中。
          </p>
          <div className="mt-8 flex gap-4 text-sm text-slate-500">
            <span>· 多入口 Vite 架构</span>
            <span>· Motion System</span>
            <span>· SEO 工程化</span>
          </div>
        </motion.section>

        {/* 公司价值观和兼容性 */}
        <section className="grid grid-cols-4 gap-6">
          {COMPANY_VALUES.map((value) => (
            <div key={value.title} className="rounded-3xl bg-white p-8 shadow">
              <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Value</p>
              <h3 className="mt-3 text-2xl font-semibold text-primary">{value.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{value.description}</p>
              <p className="mt-6 text-4xl font-semibold text-accent">{value.metric}</p>
              <p className="text-xs text-slate-500">{value.helper}</p>
            </div>
          ))}
          <div className="rounded-3xl border border-dashed border-primary/40 bg-primary/5 p-8 text-sm text-primary">
            <p>兼容性检测</p>
            <p className="mt-4 text-3xl font-semibold">{compatibility ? 'READY' : 'POLYFILL'}</p>
            <p className="text-xs text-primary/70">IntersectionObserver</p>
          </div>
        </section>

        {/* 团队成员 */}
        <section className="rounded-3xl bg-white p-12 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Team</p>
              <h2 className="mt-3 text-4xl font-semibold">团队成员</h2>
            </div>
            <a
              href="/tech.html"
              className="text-sm font-semibold text-primary transition hover:text-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              查看技术页 →
            </a>
          </div>
          <div className="mt-10 grid grid-cols-4 gap-6">
            {TEAM_MEMBERS.map((member) => (
              <article key={member.name} className="rounded-2xl border border-slate-100 p-6">
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-sm text-slate-500">{member.role}</p>
                <p className="mt-4 text-sm text-slate-600">{member.focus}</p>
                <p className="mt-4 text-xs text-slate-400">&ldquo;{member.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </section>

        {/* 社交分享 */}
        <section className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 shadow-xl">
          <div className="grid grid-cols-[1.5fr,1fr] gap-10">
            <div>
              <p className="text-xs uppercase tracking-[0.4em] text-primary/70">Share it</p>
              <h3 className="mt-3 text-3xl font-semibold">{SHARE_COPY.title}</h3>
              <p className="mt-4 text-sm text-slate-600">{SHARE_COPY.description}</p>
              <div className="mt-6 space-y-3">
                {SHARE_CHANNELS.map((channel) => (
                  <button
                    key={channel.label}
                    type="button"
                    onClick={() => shareAbout(channel.target)}
                    className="flex w-full items-center justify-between rounded-2xl border border-slate-200 px-4 py-3 text-left transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                  >
                    <span className="font-semibold">{channel.label}</span>
                    <span className="text-xs text-slate-400">{channel.helper}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-slate-900 p-8 text-white">
              <p className="text-xs uppercase tracking-[0.4em] text-white/60">渠道策略</p>
              <h4 className="mt-3 text-2xl font-semibold">Global Launch</h4>
              <p className="mt-4 text-sm text-white/70">
                Twitter / LinkedIn 覆盖海外市场，微博 & B 站面向国内社群，数据回传打通 CRM。
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/60">
                <li>· 多语言静态资源</li>
                <li>· SEO JSON-LD 注入</li>
                <li>· 自动化分享海报</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};

export default AboutPCPage;
