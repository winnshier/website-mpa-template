import type { HeaderLink } from './types';

type DesktopHeaderProps = {
  links: HeaderLink[];
  active?: string;
};

const DesktopHeader = ({ links, active }: DesktopHeaderProps) => (
  <header className="sticky top-0 z-40 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-10 py-6 text-white">
      <div className="flex flex-col">
        <span className="text-lg font-semibold tracking-tight">React MPA Studio</span>
        <span className="text-xs uppercase tracking-[0.3em] text-white/60">
          Vite · Tailwind · Motion
        </span>
      </div>
      <nav className="flex items-center gap-8 text-sm font-medium">
        {links.map((link) => (
          <a
            key={link.slug}
            href={link.href}
            className={`relative transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 ${
              active === link.slug ? 'text-accent' : 'text-white/80'
            }`}
          >
            {link.label}
            {link.badge && (
              <span className="ml-2 rounded-full bg-accent/20 px-2 py-0.5 text-[10px] uppercase tracking-widest text-accent">
                {link.badge}
              </span>
            )}
            {active === link.slug && (
              <span className="absolute -bottom-3 left-0 right-0 h-0.5 rounded-full bg-accent"></span>
            )}
          </a>
        ))}
      </nav>
      <a
        href="https://github.com/example/react-mpa"
        target="_blank"
        rel="noreferrer"
        className="rounded-full border border-white/40 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        GitHub
      </a>
    </div>
  </header>
);

export default DesktopHeader;
