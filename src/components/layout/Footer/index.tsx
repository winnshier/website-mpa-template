import DesktopFooter from './DesktopFooter';
import MobileFooter from './MobileFooter';
import type { FooterColumn, FooterVariant, SocialLink } from './types';

const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: '导航',
    links: [
      { label: '首页', href: '/index.html' },
      { label: '关于我们', href: '/about.html' },
      { label: '技术亮点', href: '/tech.html' }
    ]
  },
  {
    title: '技术栈',
    links: [
      { label: 'React 18', href: 'https://react.dev/' },
      { label: 'Vite', href: 'https://vitejs.dev/' },
      { label: 'Tailwind CSS', href: 'https://tailwindcss.com/' }
    ]
  },
  {
    title: '体验',
    links: [
      { label: 'Framer Motion', href: 'https://www.framer.com/motion/' },
      { label: 'Swiper', href: 'https://swiperjs.com/' },
      { label: 'Responsive Hook', href: 'https://example.com/docs/responsive' }
    ]
  }
];

const SOCIAL_LINKS: SocialLink[] = [
  { label: 'GitHub', href: 'https://github.com/example/react-mpa', description: '源码' },
  { label: 'Twitter', href: 'https://twitter.com/', description: '海外社交' },
  { label: 'Weibo', href: 'https://weibo.com/', description: '中文社交' }
];

export type FooterProps = {
  variant: FooterVariant;
  columns?: FooterColumn[];
  socials?: SocialLink[];
};

export const Footer = ({
  variant,
  columns = FOOTER_COLUMNS,
  socials = SOCIAL_LINKS
}: FooterProps) => {
  if (variant === 'desktop') {
    return <DesktopFooter columns={columns} socials={socials} />;
  }
  return <MobileFooter columns={columns} socials={socials} />;
};

export const footerColumns = FOOTER_COLUMNS;
export const footerSocials = SOCIAL_LINKS;
export default Footer;
