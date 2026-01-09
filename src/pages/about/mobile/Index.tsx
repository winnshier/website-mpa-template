import { motion } from 'framer-motion';
import { isFeatureSupported } from '@/utils/compatibility';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { COMPANY_VALUES, SHARE_COPY, TEAM_MEMBERS } from '../content';
import { SHARE_CHANNELS, shareAbout } from '../share';

const AboutMobilePage = () => {
  const compatibility = isFeatureSupported('intersectionObserver');
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="space-y-6 bg-slate-50 px-4 py-8">
      {/* 公司介绍 */}
      <motion.section
        className="space-y-4 rounded-3xl bg-white p-6 shadow"
        initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-[10px] uppercase tracking-[0.4em] text-primary/60">About</p>
        <h1 className="text-3xl font-semibold text-primary">React MPA Studio</h1>
        <p className="text-sm text-slate-600">
          小团队也能拥有 Apple 式官网的原因：模块化动效 + SEO 体系 + 工程自动化。
        </p>
      </motion.section>

      {/* 公司价值观 */}
      <section className="space-y-3">
        {COMPANY_VALUES.map((value) => (
          <div key={value.title} className="rounded-2xl bg-white p-5 shadow-sm">
            <div className="flex justify-between text-xs text-slate-500">
              <span>{value.title}</span>
              <span className="text-lg font-semibold text-primary">{value.metric}</span>
            </div>
            <p className="mt-2 text-sm text-slate-600">{value.description}</p>
          </div>
        ))}
        <div className="rounded-2xl border border-dashed border-primary/40 bg-white p-5 text-sm text-primary">
          <p>IntersectionObserver 支持：{compatibility ? '是' : '否'}</p>
        </div>
      </section>

      {/* 团队成员 */}
      <section className="rounded-3xl bg-white p-6 shadow">
        <h2 className="text-lg font-semibold text-primary">团队</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          {TEAM_MEMBERS.map((member) => (
            <div key={member.name} className="rounded-2xl border border-slate-100 p-4">
              <p className="font-semibold text-slate-900">{member.name}</p>
              <p className="text-xs text-slate-500">{member.role}</p>
              <p className="mt-2 text-xs text-slate-500">&ldquo;{member.quote}&rdquo;</p>
            </div>
          ))}
        </div>
      </section>

      {/* 社交分享 */}
      <section className="rounded-3xl bg-white p-6 shadow">
        <h3 className="text-lg font-semibold text-primary">分享页面</h3>
        <p className="mt-2 text-sm text-slate-600">{SHARE_COPY.description}</p>
        <div className="mt-4 space-y-2">
          {SHARE_CHANNELS.map((channel) => (
            <button
              key={channel.label}
              type="button"
              onClick={() => shareAbout(channel.target)}
              className="w-full rounded-full border border-slate-200 px-4 py-2 text-sm text-primary transition hover:border-primary hover:bg-primary/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              {channel.label}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
};

export default AboutMobilePage;
