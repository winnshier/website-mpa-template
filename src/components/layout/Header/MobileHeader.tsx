import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { HeaderLink } from './types';

type MobileHeaderProps = {
  links: HeaderLink[];
  active?: string;
};

const MobileHeader = ({ links, active }: MobileHeaderProps) => {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
      <div className="flex items-center justify-between px-4 py-4">
        <div className="flex flex-col">
          <span className="text-base font-semibold text-slate-900">React MPA</span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-slate-500">
            SEO-first
          </span>
        </div>
        <button
          type="button"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-300 bg-white shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          aria-label="切换主导航"
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
        >
          <span className="sr-only">菜单</span>
          <div className="space-y-1.5">
            <span
              className={`block h-0.5 w-6 rounded-full bg-slate-900 transition ${
                open ? 'translate-y-2 rotate-45' : ''
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 rounded-full bg-slate-900 transition ${
                open ? 'opacity-0' : ''
              }`}
            ></span>
            <span
              className={`block h-0.5 w-6 rounded-full bg-slate-900 transition ${
                open ? '-translate-y-2 -rotate-45' : ''
              }`}
            ></span>
          </div>
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-slate-100 bg-white px-4 pb-6"
          >
            <ul className="space-y-2 pt-4 text-sm font-medium text-slate-700">
              {links.map((link) => (
                <li key={link.slug}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-2xl px-4 py-3 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      active === link.slug
                        ? 'bg-slate-900 text-white'
                        : 'bg-slate-100 hover:bg-slate-200'
                    }`}
                  >
                    <span>{link.label}</span>
                    {link.badge && (
                      <span className="rounded-full bg-slate-900/10 px-2 py-0.5 text-[10px] uppercase tracking-widest text-slate-500">
                        {link.badge}
                      </span>
                    )}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default MobileHeader;
