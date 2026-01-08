import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

const heroVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0 }
};

const Desktop = () => (
  <div className="mx-auto flex max-w-6xl flex-col gap-16 p-12">
    <motion.section
      className="rounded-3xl bg-gradient-to-br from-primary to-slate-900 p-16 text-white shadow-xl"
      initial="hidden"
      animate="visible"
      variants={heroVariants}
      transition={{ duration: 0.8 }}
    >
      <p className="text-sm uppercase tracking-[0.3em] text-slate-200">MPA + SEO</p>
      <h1 className="mt-6 text-5xl font-semibold">React 多页面体验</h1>
      <p className="mt-8 max-w-2xl text-lg text-slate-100">
        示例展示了多入口 Vite 架构、构建时 SEO 注入、响应式组件切换以及基础交互动画。
      </p>
      <div className="mt-12 flex gap-4">
        <button className="rounded-full bg-accent px-8 py-3 font-semibold text-slate-900">
          立即体验
        </button>
        <button className="rounded-full border border-white/30 px-8 py-3 font-semibold text-white">
          查看关于页
        </button>
      </div>
    </motion.section>

    <section className="grid grid-cols-2 gap-8">
      <motion.div
        className="rounded-2xl border border-slate-200 bg-white p-10 shadow-lg"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-primary">预渲染 SEO</h2>
        <p className="mt-4 text-slate-600">
          通过脚本注入 title/meta/json-ld,离线环境也保留兜底 HTML,保证爬虫可见性。
        </p>
      </motion.div>
      <motion.div
        className="rounded-2xl border border-slate-200 bg-white p-10 shadow-lg"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        viewport={{ once: true }}
      >
        <h2 className="text-2xl font-semibold text-primary">响应式组件</h2>
        <p className="mt-4 text-slate-600">
          通过自定义 Hook 监听断点,在组件级别渲染桌面/移动体验,而不是仅靠 CSS。
        </p>
      </motion.div>
    </section>

    <section className="rounded-2xl border border-slate-200 bg-white p-10 shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">INTERACTIVE DEMO</p>
          <h3 className="mt-2 text-3xl font-semibold text-primary">Swiper + Motion</h3>
        </div>
      </div>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        slidesPerView={3}
        spaceBetween={24}
        className="mt-8"
      >
        {['SEO', 'Performance', 'Animation', 'Responsive', 'Compatibility'].map((tag) => (
          <SwiperSlide key={tag}>
            <motion.div
              className="rounded-2xl border border-slate-100 bg-slate-50 p-6 text-center"
              whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(15,23,42,0.15)' }}
            >
              <p className="text-sm text-slate-500">Capability</p>
              <h4 className="mt-4 text-2xl font-semibold text-primary">{tag}</h4>
            </motion.div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  </div>
);

export default Desktop;
