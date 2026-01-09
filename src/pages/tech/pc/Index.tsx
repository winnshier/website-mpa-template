import { useRef } from 'react';
import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { TECH_STAGES, type TechStage } from '../content';

type TechStageProps = {
  stage: TechStage;
  index: number;
  total: number;
  progress: MotionValue<number>;
  prefersReducedMotion: boolean;
};

const Stage = ({ stage, index, total, progress, prefersReducedMotion }: TechStageProps) => {
  const start = index / total;
  const end = (index + 0.9) / total;

  const opacity = useTransform(progress, [start, end], [0.2, 1]);
  const scale = useTransform(progress, [start, end], [0.95, 1]);
  const y = useTransform(progress, [start, end], [120, 0]);
  const mediaY = useTransform(progress, [start, end], [80, -40]);

  // 如果用户偏好减少动画，使用固定值
  const finalOpacity = prefersReducedMotion ? 1 : opacity;
  const finalScale = prefersReducedMotion ? 1 : scale;
  const finalY = prefersReducedMotion ? 0 : y;
  const finalMediaY = prefersReducedMotion ? 0 : mediaY;

  return (
    <motion.section
      style={{
        opacity: finalOpacity,
        scale: finalScale,
        y: finalY,
        boxShadow: `0 40px 120px ${stage.accent}22`,
        willChange: prefersReducedMotion ? 'auto' : 'transform, opacity'
      }}
      className="sticky top-24 mb-32 rounded-3xl border border-white/10 bg-white/5 p-12 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-xs uppercase tracking-[0.4em]" style={{ color: stage.accent }}>
            {stage.subtitle}
          </p>
          <h2 className="mt-3 text-4xl font-semibold">{stage.title}</h2>
          <p className="mt-4 max-w-2xl text-white/70">{stage.description}</p>
        </div>
        <span className="text-sm text-white/60">0{index + 1}</span>
      </div>
      <div className="mt-10 grid grid-cols-[2fr,1fr] gap-8">
        <motion.div
          style={{ y: finalMediaY }}
          className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-8"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-white/50">{stage.mediaLabel}</p>
          <div className="mt-6 space-y-3 text-sm text-white/70">
            {stage.highlights.map((highlight) => (
              <p key={highlight}>· {highlight}</p>
            ))}
          </div>
        </motion.div>
        <div className="grid gap-4">
          {stage.metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl border border-white/10 p-4 text-sm">
              <p className="text-white/50">{metric.label}</p>
              <p className="text-2xl font-semibold text-white">{metric.value}</p>
              <p className="text-xs text-white/50">{metric.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

const TechPCPage = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  const timelineHeight = `${TECH_STAGES.length * 130}vh`;

  return (
    <div
      ref={containerRef}
      className="bg-gradient-to-b from-slate-950 via-slate-900 to-black py-20 text-white"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-24 px-12">
        <header className="space-y-4 text-center">
          <p className="text-xs uppercase tracking-[0.5em] text-white/60">Tech Story</p>
          <h1 className="text-5xl font-semibold">整页滚动的沉浸式技术栈</h1>
          <p className="mx-auto max-w-3xl text-sm text-white/60">
            Framer Motion 的 useScroll + Sticky Section 提供 Apple 式叙事，iOS/Android
            端自动降级到顺序阅读。
          </p>
        </header>

        <div className="relative" style={{ height: prefersReducedMotion ? 'auto' : timelineHeight }}>
          {TECH_STAGES.map((stage, index) => (
            <Stage
              key={stage.title}
              stage={stage}
              index={index}
              total={TECH_STAGES.length}
              progress={scrollYProgress}
              prefersReducedMotion={prefersReducedMotion}
            />
          ))}
        </div>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-10 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-white/60">CTA</p>
          <h2 className="mt-4 text-3xl font-semibold">准备好体验了吗？</h2>
          <p className="mt-2 text-sm text-white/60">延伸阅读我们的团队与 SEO 流程。</p>
          <div className="mt-6 flex justify-center gap-4 text-sm">
            <a
              href="/index.html"
              className="rounded-full bg-accent px-6 py-2 text-slate-900 transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              返回首页
            </a>
            <a
              href="/about.html"
              className="rounded-full border border-white/40 px-6 py-2 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              团队故事
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default TechPCPage;
