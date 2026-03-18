'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  isAuthenticated: boolean;
  onAuthClick: () => void;
  onSignupClick: () => void;
  onMyPageClick: () => void;
}

const sectionItems = [
  { label: 'Home', sectionId: 'home' },
  { label: 'About', sectionId: 'about' },
  { label: 'Studio', sectionId: 'studio' },
  { label: 'Community', href: '/community' },
  { label: 'Posts', href: '/posts' }
];

export default function MenuOverlay({
  isOpen,
  onClose,
  isAuthenticated,
  onAuthClick,
  onSignupClick,
  onMyPageClick
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

  const handleAccountClick = () => {
    onClose();
    setTimeout(() => {
      if (isAuthenticated) {
        onMyPageClick();
      } else {
        onAuthClick();
      }
    }, 250);
  };

  const handleSignupOpen = () => {
    onClose();
    setTimeout(() => {
      onSignupClick();
    }, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="absolute inset-0 bg-black/95 backdrop-blur-md" onClick={onClose} />

      <div
        className={`absolute right-0 top-0 h-full w-80 bg-black/80 backdrop-blur-lg transition-transform duration-500 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-white/10 px-8 py-6">
            <h2 className="text-2xl tracking-[0.3em] text-white">ZEUS</h2>
            <button onClick={onClose} className="transition-opacity hover:opacity-70">
              <X className="h-6 w-6 text-white" />
            </button>
          </div>

          <nav className="flex flex-1 flex-col justify-center px-8">
            <div className="space-y-6">
              {sectionItems.map((item) => {
                if (item.href) {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={onClose}
                      className="block py-2 text-left text-xl tracking-wide text-white transition-opacity hover:opacity-70"
                    >
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.sectionId!)}
                    className="block py-2 text-left text-xl tracking-wide text-white transition-opacity hover:opacity-70"
                  >
                    {item.label}
                  </button>
                );
              })}
            </div>
          </nav>

          <div className="border-t border-white/10 px-8 py-6">
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAccountClick}
                className="py-2 text-left text-xl tracking-wide text-white transition-opacity hover:opacity-70"
              >
                {isAuthenticated ? 'MY PAGE' : 'LOGIN'}
              </button>
              {!isAuthenticated ? (
                <button
                  onClick={handleSignupOpen}
                  className="py-2 text-left text-xl tracking-wide text-white transition-opacity hover:opacity-70"
                >
                  SIGN UP
                </button>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
