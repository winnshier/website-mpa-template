# 项目目录结构说明

## 📁 整体结构

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
│   │   │   ├── App.tsx         # 根组件 (负责 PC/Mobile 切换)
│   │   │   ├── pc/             # 💻 PC 端组件
│   │   │   │   └── Index.tsx   # PC 端首页
│   │   │   └── mobile/         # 📱 移动端组件
│   │   │       └── Index.tsx   # 移动端首页
│   │   │
│   │   └── about/              # 关于页
│   │       ├── index.html      # 📄 关于页 HTML 模板
│   │       ├── main.tsx
│   │       ├── App.tsx
│   │       ├── pc/
│   │       │   └── Index.tsx
│   │       └── mobile/
│   │           └── Index.tsx
│   │
│   ├── hooks/                   # 🎣 自定义 Hooks
│   │   └── useResponsive.ts
│   │
│   ├── utils/                   # 🛠️ 工具函数
│   │   ├── seo.ts
│   │   ├── device.ts
│   │   ├── compatibility.ts
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
│   └── prerender-seo.ts
│
└── 配置文件
    ├── vite.config.ts
    ├── tsconfig.json
    ├── tailwind.config.js
    └── ...
```

## 🎯 设计理念

### 1. HTML 模板与页面组件同目录管理
所有页面的 HTML 模板放在对应页面目录下（`src/pages/[pagename]/index.html`），便于：
- 📝 页面相关文件高内聚，易于维护
- 🔍 快速定位页面入口和配置
- 📋 运营/文案人员协作

### 2. PC/Mobile 组件明确分离
每个页面下都有 `pc/` 和 `mobile/` 子目录：
- 💻 `pc/Index.tsx` - PC 端实现
- 📱 `mobile/Index.tsx` - 移动端实现
- 🔄 `App.tsx` - 负责根据设备类型切换

### 3. 单一入口，智能切换
- 每个页面只有一个 `App.tsx` 入口
- 使用 `useResponsive` Hook 检测设备类型
- 自动加载对应的 PC 或 Mobile 组件

## 📝 添加新页面

### 1. 创建页面目录
```bash
mkdir -p src/pages/products/pc src/pages/products/mobile
```

### 2. 创建 HTML 模板
在页面目录下创建 `index.html`：

```bash
# 创建 src/pages/products/index.html
cat > src/pages/products/index.html << 'EOF'
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
EOF
```

### 3. 创建组件文件
```
src/pages/products/
├── index.html         # HTML 模板
├── main.tsx          # 复制其他页面的 main.tsx
├── App.tsx           # 复制其他页面的 App.tsx
├── pc/
│   └── Index.tsx     # PC 端实现
└── mobile/
    └── Index.tsx     # 移动端实现
```

### 4. 更新 Vite 配置
```typescript
// vite.config.ts
input: {
  index: page('index'),
  about: page('about'),
  products: page('products'), // 新增
}
```

### 5. 添加 SEO 配置
```typescript
// src/utils/seo.ts
export const SEO_DATA: Record<string, SEODescriptor> = {
  // ...
  products: {
    title: 'React MPA · 产品',
    description: '产品页面描述',
    canonicalUrl: 'https://example.com/products'
  }
}
```

## 🔍 快速定位文件

| 要找什么 | 去哪里找 |
|---------|---------|
| HTML 模板/文案 | `src/pages/*/index.html` |
| PC 端页面 | `src/pages/*/pc/Index.tsx` |
| 移动端页面 | `src/pages/*/mobile/Index.tsx` |
| 响应式逻辑 | `src/pages/*/App.tsx` |
| SEO 配置 | `src/utils/seo.ts` |
| 设备检测逻辑 | `src/hooks/useResponsive.ts` |

## 💡 最佳实践

### 页面组件命名
- ✅ PC 端：`src/pages/xxx/pc/Index.tsx`
- ✅ 移动端：`src/pages/xxx/mobile/Index.tsx`
- ✅ 入口：`src/pages/xxx/App.tsx`

### 页面专属组件
如果页面有专属组件，可以创建子目录：
```
src/pages/index/
├── pc/
│   ├── Index.tsx
│   └── components/      # PC 端专属组件
│       ├── Hero.tsx
│       └── Features.tsx
└── mobile/
    ├── Index.tsx
    └── components/      # 移动端专属组件
        ├── Hero.tsx
        └── Features.tsx
```

### 跨页面共享组件
放在 `src/components/` 目录：
```
src/components/
├── layout/
│   ├── Header/
│   ├── Footer/
│   ├── MobileHeader/
│   └── MobileFooter/
└── common/
    ├── Button/
    ├── Modal/
    └── ...
```

## 🚀 开发流程

1. **创建/修改 HTML 模板**：编辑 `src/pages/*/index.html`
2. **开发 PC 端**：编辑 `src/pages/*/pc/Index.tsx`
3. **开发移动端**：编辑 `src/pages/*/mobile/Index.tsx`
4. **测试切换**：调整浏览器窗口宽度，观察组件切换
5. **SEO 配置**：在 `src/utils/seo.ts` 中配置

## 📊 新旧结构对比

### 优化前（问题）
```
❌ public/templates/index.html (构建后会被复制到 dist/templates/)
❌ public/templates/about.html (造成冗余文件)
```

### 优化后（解决方案）
```
✅ src/pages/index/index.html (与页面组件高内聚)
✅ src/pages/about/index.html (构建时输出到 dist/index.html)
```

**优势**：
- ✅ 页面相关文件集中在一个目录，高内聚
- ✅ 构建后不会产生多余的 templates 目录
- ✅ 通过自定义 Vite 插件，HTML 文件输出到 dist 根目录

## 🎓 总结

这个目录结构的优势：
1. ✅ **清晰**：PC/Mobile 一目了然
2. ✅ **易维护**：HTML 模板集中管理
3. ✅ **可扩展**：新增页面有明确模式
4. ✅ **易协作**：文案/开发职责分明
