"use client";

import { Menu, ShoppingCart, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onCartClick: () => void;
  onAuthClick: () => void;
  cartItemCount: number;
}

export default function Header({
  onMenuClick,
  onCartClick,
  onAuthClick,
  cartItemCount,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 px-8 py-6 flex items-start justify-between">
      <div className="flex flex-col">
        <span className="text-xs tracking-[0.3em] opacity-60">STUDIO</span>
        <h1 className="text-3xl tracking-[0.2em] mt-1">ZEUS</h1>
      </div>
      
      <div className="flex items-center gap-4">
        <button
          onClick={onAuthClick}
          className="hover:opacity-70 transition-opacity"
        >
          <User className="w-6 h-6" />
        </button>
        
        <button
          onClick={onCartClick}
          className="relative flex items-center gap-3 hover:opacity-70 transition-opacity"
        >
          <ShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 rounded-full flex items-center justify-center text-xs">
              {cartItemCount}
            </span>
          )}
        </button>
        
        <button
          onClick={onMenuClick}
          className="hover:opacity-70 transition-opacity"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>
    </header>
  );
}
