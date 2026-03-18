"use client";

import React, { useState } from "react";
import { AboutSection } from "./AboutSection";
import { AuthModal } from "./AuthModal";
import { CartItem, CartModal } from "./CartModal";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { HeroSection } from "./HeroSection";
import { MenuOverlay } from "./MenuOverlay";
import { ServicesSection } from "./ServicesSection";
import { ShopSection } from "./ShopSection";
import { StudioSection } from "./StudioSection";

export function ZeusApp() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: Omit<CartItem, "id" | "quantity">) => {
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

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        onMenuClick={() => setIsMenuOpen(true)}
        onCartClick={() => setIsCartOpen(true)}
        onAuthClick={() => setIsAuthOpen(true)}
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
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

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
