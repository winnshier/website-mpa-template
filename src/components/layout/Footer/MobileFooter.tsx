import type { FooterColumn, SocialLink } from './types';

type MobileFooterProps = {
  columns: FooterColumn[];
  socials: SocialLink[];
};

const MobileFooter = ({ columns, socials }: MobileFooterProps) => (
  <footer className="space-y-6 border-t border-slate-200 bg-white px-4 py-10 text-sm text-slate-600">
    <div>
      <p className="text-base font-semibold text-slate-900">React MPA Studio</p>
      <p className="mt-2 text-xs text-slate-500">
        多页面站点的最佳实践模版，拆分出可复用的导航、页脚与内容模块。
      </p>
    </div>
    <div className="grid grid-cols-2 gap-4">
      {columns.map((column) => (
        <div key={column.title}>
          <p className="text-[10px] uppercase tracking-[0.3em] text-slate-400">
            {column.title}
          </p>
          <ul className="mt-2 space-y-1.5">
            {column.links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="text-slate-600 transition hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <div className="flex flex-wrap gap-3 text-xs">
      {socials.map((item) => (
        <a
          key={item.label}
          href={item.href}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-slate-200 px-3 py-1 text-slate-500 transition hover:border-primary hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          aria-label={`访问我们的${item.label}${item.description ? ` - ${item.description}` : ''}`}
        >
          {item.label}
        </a>
      ))}
    </div>
    <p className="text-[11px] text-slate-400">
      © {new Date().getFullYear()} React MPA Studio. All rights reserved.
    </p>
  </footer>
);

export default MobileFooter;
