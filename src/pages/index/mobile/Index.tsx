import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Mobile = () => (
  <div className="space-y-10 bg-white p-6">
    <motion.section
      className="rounded-2xl bg-primary p-8 text-white"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      <p className="text-xs uppercase tracking-widest text-white/70">多端体验</p>
      <h1 className="mt-3 text-3xl font-semibold">移动端演示</h1>
      <p className="mt-4 text-white/80">
        Hook 会根据设备宽度切换组件,移动端布局更紧凑,交互基于触控体验。
      </p>
    </motion.section>

    <section className="space-y-4">
      {['SEO 预渲染', 'Swiper 动画', 'Husky 工程化'].map((item, index) => (
        <motion.div
          key={item}
          className="rounded-2xl border border-slate-100 p-5 shadow-sm"
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <h3 className="text-xl font-semibold text-primary">{item}</h3>
          <p className="mt-2 text-sm text-slate-600">
            在移动端同样具备完整功能,方便快速浏览核心卖点。
          </p>
        </motion.div>
      ))}
    </section>

    <section className="rounded-2xl border border-slate-100 p-4 shadow-sm">
      <h3 className="text-lg font-semibold text-primary">亮点轮播</h3>
      <Swiper slidesPerView={1.2} spaceBetween={12} className="mt-4">
        {['快速启动', '自动化规范', '可扩展架构'].map((label) => (
          <SwiperSlide key={label}>
            <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-600">
              {label}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  </div>
);

export default Mobile;
