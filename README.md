# React MPA SEO Project

## 项目概述

基于 React 18 + Vite + TypeScript 的多页面应用(MPA)项目,实现了 SEO 优化、响应式设计、基础动画效果和工程化配置。

## 技术栈

- **框架**: React 18 + TypeScript
- **构建工具**: Vite 5
- **样式方案**: Tailwind CSS + CSS Modules
- **动画库**: Framer Motion + Swiper
- **工程化**: ESLint + Prettier + Husky + lint-staged

## 目录结构

```
.
├── src/
│   ├── api/              # API 封装
│   ├── hooks/            # 自定义 Hooks
│   ├── pages/            # 页面目录
│   │   ├── index/        # 首页
│   │   └── about/        # 关于页
│   ├── styles/           # 全局样式
│   └── utils/            # 工具函数
├── index.html            # 首页 HTML 模板
├── about.html            # 关于页 HTML 模板
└── package.json
```

## 快速开始

### 安装依赖

```bash
npm install
# or
pnpm install
```

### 启动开发服务器

```bash
npm run dev
```

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 核心功能

### 1. 多页面架构

- 使用 Vite 的 `build.rollupOptions.input` 配置多入口
- 每个页面独立打包,支持独立部署和缓存策略

### 2. SEO 优化

- 构建时 SEO 注入
- 运行时动态更新 meta 标签
- 支持结构化数据(JSON-LD)

### 3. 响应式设计

- 组件级别的响应式切换(PC/移动端)
- 使用 `useResponsive` Hook 检测设备类型
- 避免 CSS 隐藏,按需加载对应组件

### 4. 动画效果

- Framer Motion: 页面过渡、滚动动画
- Swiper: 轮播组件
- 性能优化的动画实现

### 5. 浏览器兼容

- 使用 `@vitejs/plugin-legacy` 支持老旧浏览器
- 自动 Polyfill 注入
- 特性检测和降级策略

## 开发规范

### 代码检查

```bash
npm run lint
```

### 代码格式化

```bash
npm run format
```

### Git Hooks

项目配置了 Husky + lint-staged,在提交前自动进行代码检查和格式化。

## 环境变量

- `.env.development`: 开发环境配置
- `.env.production`: 生产环境配置

## 浏览器支持

- Chrome (最近 2 个版本)
- Edge (最近 2 个版本)
- Safari (最近 2 个版本)
- Firefox (最近 2 个版本)

## License

MIT
