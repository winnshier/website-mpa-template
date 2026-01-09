import type { FooterColumn, SocialLink } from './types';

type DesktopFooterProps = {
  columns: FooterColumn[];
  socials: SocialLink[];
};

const DesktopFooter = ({ columns, socials }: DesktopFooterProps) => (
  <footer className="border-t border-slate-200 bg-slate-950 text-white">
    <div className="mx-auto grid max-w-6xl grid-cols-[2fr,1fr,1fr,1fr] gap-10 px-10 py-16">
      <div className="space-y-4">
        <p className="text-lg font-semibold">React MPA Studio</p>
        <p className="text-sm text-white/70">
          React 18 + Vite 打造的多页面沉浸式官网模版，内建 SEO、动效与响应式组件。
        </p>
        <div className="flex gap-4 text-sm">
          {socials.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noreferrer"
              className="text-white/70 transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
              aria-label={`访问我们的${item.label}${item.description ? ` - ${item.description}` : ''}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>
      {columns.map((column) => (
        <div key={column.title}>
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-white/60">
            {column.title}
          </p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            {column.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="transition hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="border-t border-white/10 px-10 py-6 text-xs text-white/60">
      © {new Date().getFullYear()} React MPA Studio · Crafted with Tailwind CSS & Framer Motion
    </div>
  </footer>
);

export default DesktopFooter;
