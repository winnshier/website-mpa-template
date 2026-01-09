import { useEffect } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useResponsive } from '@/hooks/useResponsive';
import { applySeo, SEO_DATA } from '@/utils/seo';
import PCPage from './pc/Index';
import MobilePage from './mobile/Index';

const TechApp = () => {
  const device = useResponsive();
  const variant = device === 'desktop' ? 'desktop' : 'mobile';

  useEffect(() => {
    applySeo(SEO_DATA.tech);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900">
      <Header variant={variant} active="tech" />
      <main className="flex-1">
        {device === 'desktop' ? <PCPage /> : <MobilePage />}
      </main>
      <Footer variant={variant} />
    </div>
  );
};

export default TechApp;
