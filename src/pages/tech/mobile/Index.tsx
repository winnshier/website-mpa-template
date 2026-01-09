import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TECH_STAGES } from '../content';

const TechMobilePage = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <main className="space-y-6 bg-slate-950 px-4 py-10 text-white">
      <header className="space-y-3">
        <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">Tech Story</p>
        <h1 className="text-3xl font-semibold leading-tight">整页滚动的魔力</h1>
        <p className="text-sm text-white/60">
          移动端改为顺序阅读，但保留关键动效与指标，保证性能与信息密度的平衡。
        </p>
      </header>
      {TECH_STAGES.map((stage, index) => (
        <motion.section
          key={stage.title}
          className="space-y-3 rounded-3xl bg-white/5 p-5"
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
        >
          <p className="text-[10px] uppercase tracking-[0.4em]" style={{ color: stage.accent }}>
            {stage.subtitle}
          </p>
          <h3 className="text-2xl font-semibold">{stage.title}</h3>
          <p className="text-sm text-white/70">{stage.description}</p>
          <ul className="space-y-1 text-xs text-white/60">
            {stage.highlights.slice(0, 3).map((highlight) => (
              <li key={highlight}>· {highlight}</li>
            ))}
          </ul>
          <div className="flex gap-3 text-xs text-white/70">
            {stage.metrics.map((metric) => (
              <div
                key={metric.label}
                className="flex-1 rounded-2xl border border-white/10 p-3 text-center"
              >
                <p className="text-white/50">{metric.label}</p>
                <p className="text-lg font-semibold text-white">{metric.value}</p>
                <p className="text-[10px] text-white/50">{metric.detail}</p>
              </div>
            ))}
          </div>
        </motion.section>
      ))}

      <a
        href="/about.html"
        className="block rounded-full bg-accent py-3 text-center text-sm text-slate-900 transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        认识打造者
      </a>
    </main>
  );
};

export default TechMobilePage;
