# React MPA SEO Project

<div align="center">

**企业级 React 多页面应用脚手架**

基于 React 18 + Vite 5 + TypeScript，实现 SEO 优化、响应式设计、工程化规范的现代化 MPA 解决方案

[![React](https://img.shields.io/badge/React-18.x-blue)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF)](https://vitejs.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-38B2AC)](https://tailwindcss.com/)

</div>

---

## 📋 目录

- [项目概述](#项目概述)
- [核心特性](#核心特性)
- [技术栈](#技术栈)
- [目录结构](#目录结构)
- [快速开始](#快速开始)
- [开发指南](#开发指南)
- [构建优化](#构建优化)
- [浏览器兼容](#浏览器兼容)
- [常见问题](#常见问题)
- [参考文档](#参考文档)

---

## 🎯 项目概述

这是一个**企业级 React 多页面应用（MPA）脚手架**，专为官网、营销页面等场景设计。相比传统 SPA，MPA 架构具有以下优势：

- ✅ **SEO 友好**：每个页面独立 HTML，搜索引擎可完整抓取
- ✅ **首屏加载快**：按需加载，避免单页应用的 bundle 体积问题
- ✅ **缓存策略灵活**：每个页面独立缓存，更新影响面小
- ✅ **部署简单**：纯静态文件，CDN 部署即可

### 🎁 项目亮点

1. **📱 响应式架构清晰**
   - PC/移动端组件完全分离（`pc/` + `mobile/` 子目录）
   - 组件级别切换，避免 CSS 隐藏造成的资源浪费
   - 一目了然的项目结构，易于团队协作

2. **🔍 SEO 双保险**
   - **构建时预渲染**：通过脚本注入 SEO 信息到 HTML
   - **运行时动态更新**：支持 A/B 测试、紧急修正
   - 支持结构化数据（JSON-LD）、Open Graph 等

3. **⚡ 性能优化**
   - 代码分包（vendor + interactive chunks）
   - 懒加载动画库（Framer Motion、Swiper）
   - 自动 Gzip/Brotli 压缩
   - Legacy 浏览器按需加载 Polyfill

4. **🛠️ 工程化完善**
   - ESLint + Prettier 代码规范
   - Husky + lint-staged Git 钩子
   - TypeScript 类型安全
   - 兼容老旧浏览器（Safari ≤13、国产浏览器）

---

## ✨ 核心特性

### 1. 多页面架构（MPA）

- 使用 Vite `rollupOptions.input` 配置多入口
- 每个页面独立打包，支持独立部署
- HTML 模板与页面组件高内聚（`src/pages/*/index.html`）

### 2. SEO 优化

| 功能 | 实现方式 | 说明 |
|------|---------|------|
| 构建时 SEO | `scripts/prerender-seo.ts` | 构建时从 API 拉取并注入 SEO 信息 |
| 运行时 SEO | `utils/seo.ts` | 挂载前动态更新 meta 标签 |
| 结构化数据 | JSON-LD | 支持 Schema.org 企业信息、面包屑等 |
| Sitemap | 自动生成 | 提交给搜索引擎 |

### 3. 响应式设计

```typescript
// 组件级别切换，而非 CSS 隐藏
const App = () => {
  const device = useResponsive(); // 检测设备类型
  return device === 'desktop' ? <PCPage /> : <MobilePage />;
};
```

**优势**：
- 🚀 移动端不加载 PC 代码，减少 bundle 体积
- 🎨 PC/Mobile UI 完全独立，设计自由度高
- 🔧 维护简单，修改一端不影响另一端

### 4. 动画效果

| 库 | 用途 | Bundle 大小 |
|----|------|------------|
| Framer Motion | 页面过渡、滚动动画 | ~80KB (gzipped) |
| Swiper | 轮播组件 | ~45KB (gzipped) |

**优化策略**：
- ✅ 按需加载，避免每个页面都引入
- ✅ 代码分包，独立 chunk
- ✅ 低端设备降级（禁用复杂动画）

### 5. 浏览器兼容

- **现代浏览器**：Chrome/Edge/Safari/Firefox（最近 2 个版本）
- **老旧浏览器**：通过 `@vitejs/plugin-legacy` 自动注入 Polyfill
- **国产浏览器**：360、QQ、UC 浏览器兼容
- **兼容性检测**：运行时检测并降级处理

---

## 🛠️ 技术栈

### 核心技术

| 类别 | 技术 | 版本 | 说明 |
|------|------|------|------|
| **框架** | React | 18.x | 并发特性、自动批处理 |
| **类型系统** | TypeScript | 5.x | 类型安全、智能提示 |
| **构建工具** | Vite | 5.x | 极速 HMR、原生 ESM |
| **样式方案** | Tailwind CSS | 3.x | 原子化 CSS、响应式友好 |
| **状态管理** | Zustand | 4.x | 轻量级状态管理（可选） |
| **HTTP 客户端** | Fetch API | - | 原生支持，轻量封装 |

### 动画与交互

| 库 | 版本 | 用途 |
|----|------|------|
| Framer Motion | 11.x | 页面过渡、Layout 动画 |
| Swiper | 11.x | 轮播组件 |

### 工程化工具

| 工具 | 用途 |
|------|------|
| ESLint | 代码检查 |
| Prettier | 代码格式化 |
| Husky | Git Hooks |
| lint-staged | 提交前检查 |

---

## 📁 目录结构

```
website/
├── public/                      # 静态资源目录
│   └── favicon.svg
│
├── src/
│   ├── pages/                   # 📱 页面目录
│   │   ├── index/              # 首页
│   │   │   ├── index.html      # 📄 首页 HTML 模板
│   │   │   ├── main.tsx        # 页面入口
│   │   │   ├── App.tsx         # 根组件（设备切换）
│   │   │   ├── pc/             # 💻 PC 端组件
│   │   │   │   └── Index.tsx
│   │   │   └── mobile/         # 📱 移动端组件
│   │   │       └── Index.tsx
│   │   │
│   │   └── about/              # 关于页（同上结构）
│   │       ├── index.html
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── pc/Index.tsx
│   │       └── mobile/Index.tsx
│   │
│   ├── hooks/                   # 🎣 自定义 Hooks
│   │   └── useResponsive.ts    # 响应式检测
│   │
│   ├── utils/                   # 🛠️ 工具函数
│   │   ├── seo.ts              # SEO 工具
│   │   ├── device.ts           # 设备检测
│   │   ├── compatibility.ts    # 兼容性检测
│   │   └── ...
│   │
│   ├── api/                     # 🌐 API 封装
│   │   └── client.ts
│   │
│   └── styles/                  # 🎨 全局样式
│       ├── global.css
│       └── tailwind.css
│
├── scripts/                     # 📜 构建脚本
│   └── prerender-seo.ts        # SEO 预渲染
│
└── 配置文件
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.js
    ├── .eslintrc.cjs
    ├── .prettierrc.js
    └── ...
```

> 📖 **详细说明**：查看 [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) 了解目录设计理念和最佳实践

---

## 🚀 快速开始

### 1. 安装依赖

```bash
# 使用 npm
npm install

# 或使用 pnpm（推荐）
pnpm install
```

### 2. 初始化 Git Hooks

```bash
npm run prepare
```

### 3. 启动开发服务器

```bash
npm run dev
```

访问：
- 首页：http://localhost:5173/index.html
- 关于页：http://localhost:5173/about.html

### 4. 构建生产版本

```bash
npm run build
```

构建产物在 `dist/` 目录，包含：
- 压缩后的 HTML、JS、CSS
- SEO 信息已注入到 HTML
- 自动生成 Gzip/Brotli 压缩文件

### 5. 预览构建结果

```bash
npm run preview
```

---

## 📖 开发指南

### 添加新页面

#### 步骤 1：创建页面目录

```bash
mkdir -p src/pages/products/pc src/pages/products/mobile
```

#### 步骤 2：创建 HTML 模板

在页面目录下创建 `index.html`：

```html
<!-- src/pages/products/index.html -->
<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <title>Products - React MPA SEO</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/pages/products/main.tsx"></script>
  </body>
</html>
```

#### 步骤 3：创建页面组件

```bash
# 创建文件
touch src/pages/products/main.tsx
touch src/pages/products/App.tsx
touch src/pages/products/pc/Index.tsx
touch src/pages/products/mobile/Index.tsx
```

**main.tsx**（入口文件）：

```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import '@/styles/tailwind.css';
import '@/styles/global.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

**App.tsx**（设备切换）：

```typescript
import { useEffect } from 'react';
import PCPage from './pc/Index';
import MobilePage from './mobile/Index';
import { useResponsive } from '@/hooks/useResponsive';
import { applySeo, SEO_DATA } from '@/utils/seo';

const ProductsApp = () => {
  const device = useResponsive();

  useEffect(() => {
    applySeo(SEO_DATA.products);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {device === 'desktop' ? <PCPage /> : <MobilePage />}
    </div>
  );
};

export default ProductsApp;
```

#### 步骤 4：更新 Vite 配置

在 `vite.config.ts` 中添加新入口：

```typescript
rollupOptions: {
  input: {
    index: page('index'),
    about: page('about'),
    products: page('products'), // 新增
  }
}
```

#### 步骤 5：添加 SEO 配置

在 `src/utils/seo.ts` 中添加：

```typescript
export const SEO_DATA: Record<string, SEODescriptor> = {
  // ... 现有配置
  products: {
    title: 'React MPA · 产品',
    description: '产品页面描述',
    keywords: ['产品', 'react', 'mpa'],
    canonicalUrl: 'https://example.com/products'
  }
};
```

#### 步骤 6：开发页面内容

在 `pc/Index.tsx` 和 `mobile/Index.tsx` 中实现具体 UI。

---

### 代码规范

#### 代码检查

```bash
npm run lint        # 检查代码问题
npm run lint:fix    # 自动修复
```

#### 代码格式化

```bash
npm run format      # 格式化所有文件
```

#### Git 提交

项目配置了 Husky + lint-staged，提交时会自动：
1. 检查代码规范（ESLint）
2. 格式化代码（Prettier）
3. 检查类型（TypeScript）

如果检查失败，提交会被阻止。

---

## ⚡ 构建优化

### 代码分包策略

```typescript
// vite.config.ts
manualChunks(id) {
  if (id.includes('node_modules')) {
    if (id.includes('swiper') || id.includes('framer-motion')) {
      return 'interactive';  // 动画库单独分包
    }
    return 'vendor';         // 其他第三方库
  }
}
```

**效果**：
- `vendor.js` - React、Zustand 等核心库
- `interactive.js` - Framer Motion、Swiper（按需加载）
- `[page].js` - 页面专属代码

### 构建产物

```
dist/
├── index.html              # 首页（SEO 已注入）
├── about.html              # 关于页
├── js/
│   ├── index-[hash].js     # 首页 JS
│   ├── about-[hash].js     # 关于页 JS
│   ├── vendor-[hash].js    # 第三方库
│   └── interactive-[hash].js  # 动画库（按需）
├── css/
│   ├── index-[hash].css
│   └── about-[hash].css
└── assets/                 # 图片、字体等
```

### 性能预算

| 指标 | 目标值 | 说明 |
|------|--------|------|
| JS Bundle | ≤150KB (gzipped) | 单页面 |
| CSS Bundle | ≤50KB (gzipped) | 单页面 |
| LCP | <2.5s | Largest Contentful Paint |
| FID | <100ms | First Input Delay |
| CLS | <0.1 | Cumulative Layout Shift |

---

## 🌐 浏览器兼容

### 支持的浏览器

| 浏览器 | 版本 | 市场份额 |
|--------|------|----------|
| Chrome | 最近 2 个版本 | ~65% |
| Edge | 最近 2 个版本 | ~10% |
| Safari | 最近 2 个版本 | ~15% |
| Firefox | 最近 2 个版本 | ~5% |
| 360 安全浏览器 | 最新版 | ~5% (中国) |
| QQ 浏览器 | 最新版 | ~3% (中国) |

### 兼容性策略

1. **现代浏览器**：加载 ESM 版本（无 Polyfill）
2. **老旧浏览器**：自动加载 Legacy 版本（含 Polyfill）
3. **特性检测**：运行时检测并降级
4. **降级方案**：
   - MediaQueryList 降级到 `addListener`
   - 低端设备禁用复杂动画
   - 不支持的浏览器显示提示

---

## ❓ 常见问题

### Q1: 为什么选择 MPA 而不是 SPA？

**A**: MPA 更适合官网、营销页等场景：
- ✅ SEO 天然友好（每个页面独立 HTML）
- ✅ 首屏加载快（按需加载）
- ✅ 缓存策略灵活
- ✅ 部署简单（纯静态）

**SPA 更适合**：管理后台、Web App 等交互密集的应用。

### Q2: 如何在页面间共享状态？

**A**: 两种方式：
1. **URL 参数**：`window.location.search`
2. **LocalStorage/SessionStorage**：持久化存储

不推荐使用全局状态管理（Redux、Zustand），因为页面跳转会重新加载。

### Q3: 如何添加全局组件（Header/Footer）？

**A**: 在 `src/components/layout/` 创建组件，然后在各页面中引入：

```typescript
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const PCPage = () => (
  <>
    <Header />
    <main>{/* 页面内容 */}</main>
    <Footer />
  </>
);
```

### Q4: 开发服务器为什么这么快？

**A**: Vite 使用原生 ESM：
- 不需要打包，直接加载源文件
- HMR 极速（毫秒级）
- 按需编译，只编译当前访问的页面

### Q5: 构建时如何注入环境变量？

**A**: 在 `.env.*` 文件中定义（以 `VITE_` 开头）：

```bash
# .env.production
VITE_API_BASE=https://api.example.com
```

在代码中使用：

```typescript
const apiBase = import.meta.env.VITE_API_BASE;
```

---

## 📚 参考文档

### 官方文档

- [React 官方文档](https://react.dev/)
- [Vite 官方文档](https://vitejs.dev/)
- [Tailwind CSS 文档](https://tailwindcss.com/)
- [Framer Motion 文档](https://www.framer.com/motion/)
- [TypeScript 官方文档](https://www.typescriptlang.org/)

### 最佳实践

- [Google Web Vitals](https://web.dev/vitals/)
- [React 性能优化指南](https://react.dev/learn/render-and-commit)
- [SEO 最佳实践](https://developers.google.com/search/docs)
- [Web Accessibility (WCAG)](https://www.w3.org/WAI/WCAG21/quickref/)

### 项目文档

- [目录结构说明](./PROJECT_STRUCTURE.md)
- [技术方案文档](./REACT_MPA_SEO_SOLUTION.md)

---

## 📝 开发脚本

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器 |
| `npm run build` | 构建生产版本（含 SEO 预渲染） |
| `npm run build:only` | 仅构建（不执行 SEO 预渲染） |
| `npm run prerender:seo` | 单独执行 SEO 预渲染 |
| `npm run preview` | 预览构建结果 |
| `npm run lint` | 检查代码规范 |
| `npm run format` | 格式化代码 |

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📄 License

MIT License

---

<div align="center">

**⭐ 如果这个项目对你有帮助，欢迎 Star！**

</div>
