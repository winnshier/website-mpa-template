import DesktopHeader from './DesktopHeader';
import MobileHeader from './MobileHeader';
import type { HeaderLink, HeaderVariant } from './types';

const NAV_LINKS: HeaderLink[] = [
  { label: '首页', href: '/index.html', slug: 'index' },
  { label: '关于我们', href: '/about.html', slug: 'about' },
  { label: '技术亮点', href: '/tech.html', slug: 'tech', badge: 'New' }
];

export type HeaderProps = {
  variant: HeaderVariant;
  active?: HeaderLink['slug'];
  links?: HeaderLink[];
};

export const Header = ({ variant, active, links = NAV_LINKS }: HeaderProps) => {
  if (variant === 'desktop') {
    return <DesktopHeader links={links} active={active} />;
  }
  return <MobileHeader links={links} active={active} />;
};

export const headerLinks = NAV_LINKS;
export default Header;
