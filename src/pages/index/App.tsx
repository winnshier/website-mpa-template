import { useEffect } from 'react';
import PCPage from './pc/Index';
import MobilePage from './mobile/Index';
import { useResponsive } from '@/hooks/useResponsive';
import { applySeo, SEO_DATA } from '@/utils/seo';

const IndexApp = () => {
  const device = useResponsive();

  useEffect(() => {
    applySeo(SEO_DATA.index);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {device === 'desktop' ? <PCPage /> : <MobilePage />}
    </div>
  );
};

export default IndexApp;
