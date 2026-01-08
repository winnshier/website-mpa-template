# 项目目录结构说明

## 📁 整体结构

```
website/
├── public/
│   └── templates/               # 📄 HTML 模板统一管理
│       ├── index.html          # 首页 HTML
│       └── about.html          # 关于页 HTML
│
├── src/
│   ├── pages/                   # 📱 页面目录
│   │   ├── index/              # 首页
│   │   │   ├── main.tsx        # 页面入口
│   │   │   ├── App.tsx         # 根组件 (负责 PC/Mobile 切换)
│   │   │   ├── pc/             # 💻 PC 端组件
│   │   │   │   └── Index.tsx   # PC 端首页
│   │   │   └── mobile/         # 📱 移动端组件
│   │   │       └── Index.tsx   # 移动端首页
│   │   │
│   │   └── about/              # 关于页
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

### 1. HTML 模板集中管理
所有 HTML 模板放在 `public/templates/` 目录，便于：
- 📝 快速查找和编辑页面文案
- 🔍 SEO 兜底内容管理
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

### 1. 创建 HTML 模板
```bash
# 在 public/templates/ 创建新的 HTML 文件
touch public/templates/products.html
```

### 2. 创建页面目录
```bash
mkdir -p src/pages/products/pc src/pages/products/mobile
```

### 3. 创建组件文件
```
src/pages/products/
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
  index: page('public/templates/index.html'),
  about: page('public/templates/about.html'),
  products: page('public/templates/products.html'), // 新增
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
| HTML 模板/文案 | `public/templates/*.html` |
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

1. **查看/修改 HTML 模板**：`public/templates/`
2. **开发 PC 端**：编辑 `src/pages/*/pc/Index.tsx`
3. **开发移动端**：编辑 `src/pages/*/mobile/Index.tsx`
4. **测试切换**：调整浏览器窗口宽度，观察组件切换
5. **SEO 配置**：在 `src/utils/seo.ts` 中配置

## 📊 与旧结构对比

### 旧结构（混乱）
```
❌ index.html (根目录)
❌ about.html (根目录)
❌ src/pages/index/Desktop.tsx (PC/Mobile 混在一起)
❌ src/pages/index/Mobile.tsx
```

### 新结构（清晰）
```
✅ public/templates/index.html (集中管理)
✅ public/templates/about.html
✅ src/pages/index/pc/Index.tsx (明确分离)
✅ src/pages/index/mobile/Index.tsx
```

## 🎓 总结

这个目录结构的优势：
1. ✅ **清晰**：PC/Mobile 一目了然
2. ✅ **易维护**：HTML 模板集中管理
3. ✅ **可扩展**：新增页面有明确模式
4. ✅ **易协作**：文案/开发职责分明
