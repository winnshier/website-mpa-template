export type SEODescriptor = {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  meta?: Record<string, string>;
  jsonLd?: Record<string, unknown>;
};

export const DEFAULT_SEO: SEODescriptor = {
  title: 'React MPA SEO Base',
  description: 'Multi-page React experience with SEO-first mindset.',
  keywords: ['react', 'vite', 'seo', 'mpa']
};

export const SEO_DATA: Record<string, SEODescriptor> = {
  index: {
    ...DEFAULT_SEO,
    title: 'React MPA · 首页',
    description: '示例首页,展示桌面与移动端组件切换与交互体验。',
    canonicalUrl: 'https://example.com'
  },
  about: {
    ...DEFAULT_SEO,
    title: 'React MPA · 关于我们',
    description: '了解团队愿景与技术选型,验证多页面 SEO 能力。',
    canonicalUrl: 'https://example.com/about'
  },
  tech: {
    ...DEFAULT_SEO,
    title: 'React MPA · 技术亮点',
    description: '沉浸式滚动、视差与模块化动画方案的演示, 类似苹果官网展示方式。',
    canonicalUrl: 'https://example.com/tech',
    keywords: ['react', 'framer-motion', 'scrollytelling', 'parallax', 'apple-style'],
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: 'React MPA 技术亮点',
      about: ['Framer Motion', 'Fullpage Scroll', 'Responsive Architecture'],
      author: {
        '@type': 'Organization',
        name: 'React MPA Studio'
      },
      datePublished: '2024-01-01',
      description: '沉浸式滚动、视差与模块化动画方案的演示'
    }
  }
};

const META_TAGS = ['description', 'keywords'];

export function createMetaElement(name: string, content: string, doc = document) {
  const meta = doc.createElement('meta');
  meta.setAttribute('name', name);
  meta.setAttribute('content', content);
  return meta;
}

export function applySeo(seo: SEODescriptor, doc = document) {
  if (typeof window === 'undefined') return;
  const head = doc.head;
  head.querySelectorAll('meta[data-dynamic="true"]').forEach((el) => el.remove());

  doc.title = seo.title;

  META_TAGS.forEach((tag) => {
    const value = tag === 'keywords'
      ? seo.keywords?.join(', ')
      : seo[tag as keyof Pick<SEODescriptor, 'description'>];
    if (!value) return;
    const meta = createMetaElement(tag, value, doc);
    meta.dataset.dynamic = 'true';
    head.appendChild(meta);
  });

  if (seo.canonicalUrl) {
    let link = head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!link) {
      link = doc.createElement('link');
      link.rel = 'canonical';
      head.appendChild(link);
    }
    link.href = seo.canonicalUrl;
  }

  if (seo.jsonLd) {
    const script = doc.createElement('script');
    script.setAttribute('type', 'application/ld+json');
    script.dataset.dynamic = 'true';
    script.textContent = JSON.stringify(seo.jsonLd);
    head.appendChild(script);
  }
}

export function renderSeoTags(seo: SEODescriptor): string {
  const tags: string[] = [`<title>${seo.title}</title>`];
  if (seo.description) {
    tags.push(`<meta name="description" content="${seo.description}">`);
  }
  if (seo.keywords?.length) {
    tags.push(`<meta name="keywords" content="${seo.keywords.join(', ')}">`);
  }
  if (seo.canonicalUrl) {
    tags.push(`<link rel="canonical" href="${seo.canonicalUrl}">`);
  }
  if (seo.jsonLd) {
    tags.push(`<script type="application/ld+json">${JSON.stringify(seo.jsonLd)}</script>`);
  }
  return tags.join('\n');
}
