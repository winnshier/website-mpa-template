import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { SEO_DATA } from '../src/utils/seo.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

interface PageConfig {
  htmlFile: string;
  seoKey: string;
}

const pages: PageConfig[] = [
  { htmlFile: 'index.html', seoKey: 'index' },
  { htmlFile: 'about.html', seoKey: 'about' }
];

/**
 * 将 SEO 配置注入到 HTML 文件中
 */
function injectSeoToHtml(htmlPath: string, seoKey: string): void {
  if (!fs.existsSync(htmlPath)) {
    console.warn(`⚠️  HTML file not found: ${htmlPath}`);
    return;
  }

  const seoConfig = SEO_DATA[seoKey];
  if (!seoConfig) {
    console.warn(`⚠️  SEO config not found for: ${seoKey}`);
    return;
  }

  let html = fs.readFileSync(htmlPath, 'utf-8');

  // 注入 title
  html = html.replace(
    /<title>.*?<\/title>/,
    `<title>${seoConfig.title}</title>`
  );

  // 注入 description
  if (seoConfig.description) {
    const descriptionTag = `<meta name="description" content="${seoConfig.description}">`;
    if (html.includes('<meta name="description"')) {
      html = html.replace(
        /<meta name="description"[^>]*>/,
        descriptionTag
      );
    } else {
      html = html.replace(
        '</head>',
        `  ${descriptionTag}\n  </head>`
      );
    }
  }

  // 注入 keywords
  if (seoConfig.keywords && seoConfig.keywords.length > 0) {
    const keywordsTag = `<meta name="keywords" content="${seoConfig.keywords.join(', ')}">`;
    if (html.includes('<meta name="keywords"')) {
      html = html.replace(
        /<meta name="keywords"[^>]*>/,
        keywordsTag
      );
    } else {
      html = html.replace(
        '</head>',
        `  ${keywordsTag}\n  </head>`
      );
    }
  }

  // 注入 canonical URL
  if (seoConfig.canonicalUrl) {
    const canonicalTag = `<link rel="canonical" href="${seoConfig.canonicalUrl}">`;
    if (html.includes('<link rel="canonical"')) {
      html = html.replace(
        /<link rel="canonical"[^>]*>/,
        canonicalTag
      );
    } else {
      html = html.replace(
        '</head>',
        `  ${canonicalTag}\n  </head>`
      );
    }
  }

  // 注入 JSON-LD 结构化数据
  if (seoConfig.jsonLd) {
    const jsonLdScript = `<script type="application/ld+json">\n${JSON.stringify(seoConfig.jsonLd, null, 2)}\n  </script>`;
    html = html.replace(
      '</head>',
      `  ${jsonLdScript}\n  </head>`
    );
  }

  // 写回文件
  fs.writeFileSync(htmlPath, html, 'utf-8');
  console.log(`✅ Prerendered SEO for: ${path.basename(htmlPath)}`);
}

/**
 * 主函数
 */
function main(): void {
  console.log('🚀 Starting SEO prerender...\n');

  if (!fs.existsSync(distDir)) {
    console.error(`❌ Dist directory not found: ${distDir}`);
    console.error('Please run "npm run build" first.');
    process.exit(1);
  }

  pages.forEach(({ htmlFile, seoKey }) => {
    const htmlPath = path.join(distDir, htmlFile);
    injectSeoToHtml(htmlPath, seoKey);
  });

  console.log('\n✨ SEO prerender completed!');
}

main();
