import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EXPERIENCE_STATS, FEATURE_CARDS, HERO_SLIDES, PRODUCT_STREAM } from '../content';

const Desktop = () => {
  const prefersReducedMotion = useReducedMotion();

  // 如果用户偏好减少动画，则禁用自动播放和特效
  const swiperConfig = prefersReducedMotion
    ? {
        modules: [Pagination],
        pagination: { clickable: true },
        effect: 'slide' as const
      }
    : {
        modules: [Autoplay, EffectFade, Pagination],
        effect: 'fade' as const,
        loop: true,
        autoplay: { delay: 4500, disableOnInteraction: false },
        pagination: { clickable: true }
      };

  return (
    <div className="flex flex-col gap-24 bg-slate-950 pb-24 text-white">
      {/* Hero 轮播区域 */}
      <section className="relative min-h-[80vh] overflow-hidden">
        <Swiper {...swiperConfig} slidesPerView={1} className="h-[80vh]">
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                role="img"
                aria-label={slide.alt}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/20 via-slate-950/80 to-slate-950"></div>
        <div className="absolute inset-0 flex items-center">
          <motion.div
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: prefersReducedMotion ? 0 : 0.8 }}
            className="mx-auto max-w-5xl space-y-6 px-12"
          >
            <p className="text-sm uppercase tracking-[0.5em] text-white/60">MPA + IMMERSIVE</p>
            <h1 className="text-6xl font-semibold leading-tight">沉浸式 React 多页面体验</h1>
            <p className="max-w-3xl text-lg text-white/70">
              利用 Swiper、Framer Motion 和 Tailwind Token，将产品故事拆分为可复用模块，既保留 SEO
              能力又能追求 Apple 式视觉表现。
            </p>
            <div className="flex gap-4">
              <a
                href="/tech.html"
                className="rounded-full bg-accent px-8 py-3 text-base font-semibold text-slate-900 transition hover:bg-accent/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                查看技术亮点
              </a>
              <a
                href="/about.html"
                className="rounded-full border border-white/40 px-8 py-3 text-base font-semibold text-white transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              >
                认识团队
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 特性卡片区域 */}
      <section className="-mt-28 grid grid-cols-3 gap-6 px-12">
        {FEATURE_CARDS.map((card, index) => (
          <motion.article
            key={card.title}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.4em] text-white/60">{card.detail}</p>
            <h3 className="mt-4 text-2xl font-semibold">{card.title}</h3>
            <p className="mt-4 text-sm text-white/70">{card.description}</p>
            <p className="mt-8 text-4xl font-semibold text-accent">{card.metric}</p>
          </motion.article>
        ))}
      </section>

      {/* 产品模块区域 */}
      <section className="mx-auto max-w-6xl space-y-12 px-12">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/50">PRODUCT STORY</p>
            <h2 className="mt-3 text-4xl font-semibold">模块化产品介绍</h2>
          </div>
          <span className="text-sm text-white/60">数据驱动 · CMS 友好</span>
        </div>
        <div className="grid grid-cols-3 gap-8">
          {PRODUCT_STREAM.map((module) => (
            <motion.article
              key={module.title}
              className="rounded-3xl border border-white/10 bg-white/5 p-8"
              initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs uppercase tracking-[0.4em]" style={{ color: module.accent }}>
                PLAYBOOK
              </span>
              <h3 className="mt-4 text-2xl font-semibold">{module.title}</h3>
              <p className="mt-4 text-sm text-white/70">{module.copy}</p>
              <ul className="mt-6 space-y-2 text-sm text-white/60">
                {module.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-start gap-2">
                    <span
                      className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full"
                      style={{ background: module.accent }}
                    ></span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </section>

      {/* 体验指标区域 */}
      <section className="mx-auto max-w-6xl space-y-8 px-12">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-semibold">体验指标</h3>
          <p className="text-sm text-white/60">实时监控 · 自动回传</p>
        </div>
        <div className="grid grid-cols-3 gap-6">
          {EXPERIENCE_STATS.map((stat) => (
            <div key={stat.label} className="rounded-3xl border border-white/10 bg-white/5 p-8">
              <p className="text-sm text-white/50">{stat.label}</p>
              <p className="mt-4 text-3xl font-semibold">{stat.value}</p>
              <p className="text-sm text-white/60">{stat.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Desktop;
