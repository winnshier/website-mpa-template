import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PCPage from './pc/Index';
import MobilePage from './mobile/Index';
import { useResponsive } from '@/hooks/useResponsive';
import { applySeo, SEO_DATA } from '@/utils/seo';

const IndexApp = () => {
  const device = useResponsive();
  const variant = device === 'desktop' ? 'desktop' : 'mobile';

  useEffect(() => {
    applySeo(SEO_DATA.index);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header variant={variant} active="index" />
      <main className="flex-1 overflow-hidden">
        {device === 'desktop' ? <PCPage /> : <MobilePage />}
      </main>
      <Footer variant={variant} />
    </div>
  );
};

export default IndexApp;
