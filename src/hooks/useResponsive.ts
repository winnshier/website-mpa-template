import { useEffect, useState } from 'react';
import { detectDevice, DeviceType, DEVICE_QUERY } from '@/utils/device';

export function useResponsive(): DeviceType {
  const [device, setDevice] = useState<DeviceType>(() =>
    typeof window === 'undefined' ? 'desktop' : detectDevice(window.innerWidth)
  );

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQueries = Object.entries(DEVICE_QUERY).map(([key, query]) => {
      const media = window.matchMedia(query);
      const listener = () => {
        if (media.matches) {
          setDevice(key as DeviceType);
        }
      };

      // 兼容 Safari ≤13 和部分国产浏览器
      if (media.addEventListener) {
        media.addEventListener('change', listener);
      } else if (media.addListener) {
        // 降级到 addListener (deprecated but widely supported)
        media.addListener(listener);
      }

      if (media.matches) {
        setDevice(key as DeviceType);
      }

      return () => {
        if (media.removeEventListener) {
          media.removeEventListener('change', listener);
        } else if (media.removeListener) {
          media.removeListener(listener);
        }
      };
    });
    return () => {
      mediaQueries.forEach((dispose) => dispose());
    };
  }, []);

  return device;
}
