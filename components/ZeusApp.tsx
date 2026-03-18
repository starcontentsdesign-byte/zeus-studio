'use client';

import { useState } from 'react';

import { useAuth } from '@/app/context/AuthContext';
import AboutSection from '@/components/AboutSection';
import AuthModal from '@/components/AuthModal';
import CartModal, { type CartItem } from '@/components/CartModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import MenuOverlay from '@/components/MenuOverlay';
import MyPageModal from '@/components/MyPageModal';
import ServicesSection from '@/components/ServicesSection';
import ShopSection from '@/components/ShopSection';
import StudioSection from '@/components/StudioSection';

export function ZeusApp() {
  const { user, signInWithEmail, signUpWithEmail } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<'login' | 'signup'>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, 'id' | 'quantity'>) => {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (entry) =>
          entry.productId === item.productId &&
          entry.size === item.size &&
          entry.color === item.color
      );

      if (existingItem) {
        return prev.map((entry) =>
          entry.id === existingItem.id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry
        );
      }

      return [...prev, { ...item, id: Date.now(), quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const openAuth = (tab: 'login' | 'signup' = 'login') => {
    setAuthDefaultTab(tab);
    setAuthError(null);
    setIsAuthOpen(true);
  };

  const handleAuthClick = () => {
    if (user) {
      setIsMyPageOpen(true);
      return;
    }

    openAuth('login');
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={handleAuthClick}
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
      />

      <MenuOverlay isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <CartModal
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemoveItem={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        defaultTab={authDefaultTab}
        loading={authLoading}
        error={authError}
        onLogin={async (email, password) => {
          try {
            setAuthLoading(true);
            setAuthError(null);
            await signInWithEmail(email, password);
            setIsAuthOpen(false);
          } catch (error: any) {
            setAuthError(error?.message ?? '로그인 실패');
          } finally {
            setAuthLoading(false);
          }
        }}
        onSignup={async (name, email, password) => {
          try {
            setAuthLoading(true);
            setAuthError(null);
            await signUpWithEmail(name, email, password);
            setIsAuthOpen(false);
          } catch (error: any) {
            setAuthError(error?.message ?? '회원가입 실패');
          } finally {
            setAuthLoading(false);
          }
        }}
      />

      {isMyPageOpen ? (
        <MyPageModal open={isMyPageOpen} onOpenChange={setIsMyPageOpen} />
      ) : null}

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StudioSection />
        <ShopSection onAddToCart={addToCart} />
      </main>

      <Footer />
    </div>
  );
}
