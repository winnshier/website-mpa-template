import { useEffect } from 'react';
import Desktop from './Desktop';
import Mobile from './Mobile';
import { useResponsive } from '@/hooks/useResponsive';
import { applySeo, SEO_DATA } from '@/utils/seo';

const IndexApp = () => {
  const device = useResponsive();

  useEffect(() => {
    applySeo(SEO_DATA.index);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {device === 'desktop' ? <Desktop /> : <Mobile />}
    </div>
  );
};

export default IndexApp;
