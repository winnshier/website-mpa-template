export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const BREAKPOINTS = {
  mobile: 0,
  tablet: 768,
  desktop: 1024
};

export const DEVICE_QUERY = {
  mobile: `(max-width: ${BREAKPOINTS.tablet - 1}px)`,
  tablet: `(min-width: ${BREAKPOINTS.tablet}px) and (max-width: ${
    BREAKPOINTS.desktop - 1
  }px)`,
  desktop: `(min-width: ${BREAKPOINTS.desktop}px)`
};

export function detectDevice(width: number): DeviceType {
  if (width >= BREAKPOINTS.desktop) return 'desktop';
  if (width >= BREAKPOINTS.tablet) return 'tablet';
  return 'mobile';
}
