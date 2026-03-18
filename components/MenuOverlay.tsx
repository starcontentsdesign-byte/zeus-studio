'use client';

import { useEffect } from 'react';
import { X } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuOverlay({
  isOpen,
  onClose
}: MenuOverlayProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    onClose();
    setTimeout(() => {
      if (sectionId === 'home') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div
        className={`absolute top-0 right-0 h-full w-80 bg-black/80 backdrop-blur-lg transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
            <h2 className="text-2xl tracking-[0.3em] text-white">ZEUS</h2>
            <button
              onClick={onClose}
              className="hover:opacity-70 transition-opacity"
            >
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <nav className="flex-1 flex flex-col justify-center px-8 space-y-6">
            <button
              onClick={() => scrollToSection('home')}
              className="text-left text-xl tracking-wide hover:opacity-70 transition-opacity py-2"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('about')}
              className="text-left text-xl tracking-wide hover:opacity-70 transition-opacity py-2"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-left text-xl tracking-wide hover:opacity-70 transition-opacity py-2"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('studio')}
              className="text-left text-xl tracking-wide hover:opacity-70 transition-opacity py-2"
            >
              Studio
            </button>
            <button
              onClick={() => scrollToSection('shop')}
              className="text-left text-xl tracking-wide hover:opacity-70 transition-opacity py-2"
            >
              Shop
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
