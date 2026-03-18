'use client';

import { useEffect, useState } from 'react';

import AboutSection from '@/components/AboutSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import MenuOverlay from '@/components/MenuOverlay';
import ServicesSection from '@/components/ServicesSection';
import StudioSection from '@/components/StudioSection';

export function ZeusApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [menuOpaque, setMenuOpaque] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      setMenuOpaque(scrollY > 150);
      setShowGoTop(scrollY >= 300);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  const handleNavigate = (sectionId: string) => {
    setIsMenuOpen(false);

    window.setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 120);
  };

  return (
    <div className="zeus-app">
      <Header onMenuClick={() => setIsMenuOpen(true)} opaque={menuOpaque} />
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StudioSection />
      </main>

      <Footer />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`zeus-go-top${showGoTop ? ' is-visible' : ''}`}
        aria-label="Back to top"
      >
        <span>↑</span>
      </button>
    </div>
  );
}
