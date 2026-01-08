type FeatureFlag =
  | 'intersectionObserver'
  | 'flexGap'
  | 'cssScrollBehavior'
  | 'prefersReducedMotion';

const featureChecks: Record<FeatureFlag, () => boolean> = {
  intersectionObserver: () => 'IntersectionObserver' in window,
  flexGap: () => {
    const flex = document.createElement('div');
    flex.style.display = 'flex';
    flex.style.flexDirection = 'column';
    flex.style.rowGap = '1px';

    flex.appendChild(document.createElement('div'));
    flex.appendChild(document.createElement('div'));
    document.body.appendChild(flex);
    const isSupported = flex.scrollHeight === 1;
    document.body.removeChild(flex);
    return isSupported;
  },
  cssScrollBehavior: () => 'scrollBehavior' in document.documentElement.style,
  prefersReducedMotion: () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
};

export function isFeatureSupported(flag: FeatureFlag): boolean {
  if (typeof window === 'undefined') return false;
  try {
    return featureChecks[flag]();
  } catch {
    return false;
  }
}

export function needsLegacyPolyfills(): boolean {
  return !(
    isFeatureSupported('intersectionObserver') &&
    isFeatureSupported('cssScrollBehavior') &&
    isFeatureSupported('flexGap')
  );
}
