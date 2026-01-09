import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { EXPERIENCE_STATS, FEATURE_CARDS, HERO_SLIDES, PRODUCT_STREAM } from '../content';

const Mobile = () => {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="space-y-8 bg-white px-4 py-8">
      {/* Hero 区域 */}
      <section className="overflow-hidden rounded-3xl bg-slate-900 text-white">
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          slidesPerView={1}
          loop={!prefersReducedMotion}
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div
                className="min-h-[60vh] w-full bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
                role="img"
                aria-label={slide.alt}
              ></div>
            </SwiperSlide>
          ))}
        </Swiper>
        <motion.div
          initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3 px-6 py-6"
        >
          <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">
            {HERO_SLIDES[0].tag}
          </p>
          <h1 className="text-3xl font-semibold leading-tight">多端沉浸体验</h1>
          <p className="text-sm text-white/70">
            组件级切换 PC / Mobile, Swiper 轮播与 CTA 统一收敛至移动端可触控的交互。
          </p>
        </motion.div>
      </section>

      {/* 特性卡片区域 */}
      <section className="space-y-4">
        {FEATURE_CARDS.map((card, index) => (
          <motion.article
            key={card.title}
            className="rounded-2xl border border-slate-100 p-5 shadow-sm"
            initial={prefersReducedMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: prefersReducedMotion ? 0 : index * 0.1 }}
          >
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>{card.detail}</span>
              <span className="text-lg font-semibold text-primary">{card.metric}</span>
            </div>
            <h3 className="mt-3 text-xl font-semibold text-primary">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{card.description}</p>
          </motion.article>
        ))}
      </section>

      {/* 产品模块区域 */}
      <section className="space-y-4 rounded-3xl border border-slate-100 p-5">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-primary">产品模块</h3>
          <a
            href="/tech.html"
            className="text-sm text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            技术详情
          </a>
        </div>
        {PRODUCT_STREAM.map((module) => (
          <div key={module.title} className="rounded-2xl bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.4em]" style={{ color: module.accent }}>
              PLAYBOOK
            </p>
            <h4 className="mt-2 text-lg font-semibold text-slate-900">{module.title}</h4>
            <p className="mt-2 text-sm text-slate-600">{module.copy}</p>
            <ul className="mt-3 list-disc space-y-1 pl-4 text-xs text-slate-500">
              {module.bullets.slice(0, 2).map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 体验指标区域 */}
      <section className="grid grid-cols-2 gap-3">
        {EXPERIENCE_STATS.map((stat) => (
          <div key={stat.label} className="rounded-2xl border border-slate-100 p-4 text-center">
            <p className="text-xs text-slate-500">{stat.label}</p>
            <p className="mt-2 text-xl font-semibold text-primary">{stat.value}</p>
            <p className="text-[11px] text-slate-400">{stat.detail}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <a
        href="/about.html"
        className="block rounded-full bg-primary py-3 text-center text-sm font-semibold text-white transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        进一步了解团队
      </a>
    </div>
  );
};

export default Mobile;
