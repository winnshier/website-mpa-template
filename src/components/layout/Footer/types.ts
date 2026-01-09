export type FooterVariant = 'desktop' | 'mobile';

export type FooterColumn = {
  title: string;
  links: { label: string; href: string }[];
};

export type SocialLink = {
  label: string;
  href: string;
  description?: string;
};
