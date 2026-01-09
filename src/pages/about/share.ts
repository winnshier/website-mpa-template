import { SHARE_COPY } from './content';

export type ShareTarget = 'native' | 'weibo' | 'twitter';

export type ShareChannel = {
  label: string;
  helper: string;
  target: ShareTarget;
};

export const SHARE_CHANNELS: ShareChannel[] = [
  { label: '原生分享', helper: '调用系统分享', target: 'native' },
  { label: '微博', helper: '适合中文社媒', target: 'weibo' },
  { label: 'Twitter', helper: '面向海外用户', target: 'twitter' }
];

/**
 * 社交分享功能
 * 支持原生分享API和第三方社交平台
 */
export function shareAbout(target: ShareTarget): void {
  if (typeof window === 'undefined') return;

  const { title, description, url } = SHARE_COPY;
  const text = `${title} · ${description}`;

  // 原生分享API
  if (target === 'native' && typeof navigator !== 'undefined' && 'share' in navigator) {
    const navigatorWithShare = navigator as Navigator & {
      share?: (data: { title: string; text: string; url: string }) => Promise<void>;
    };

    navigatorWithShare
      .share?.({ title, text, url })
      .then(() => {
        console.log('Share successful');
      })
      .catch((err) => {
        // AbortError 表示用户取消分享，不算错误
        if (err.name !== 'AbortError') {
          console.error('Share failed:', err);
          // 降级：直接打开链接
          window.open(url, '_blank', 'noopener,noreferrer');
        }
      });
    return;
  }

  // 第三方社交平台分享
  const encodedText = encodeURIComponent(text);
  const encodedUrl = encodeURIComponent(url);

  const shareUrl =
    target === 'weibo'
      ? `https://service.weibo.com/share/share.php?title=${encodedText}&url=${encodedUrl}`
      : `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;

  window.open(shareUrl, '_blank', 'noopener,noreferrer');
}
