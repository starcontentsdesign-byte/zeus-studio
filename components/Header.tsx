"use client";

import { Menu, User } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
  onAuthClick: () => void;
  onMyPageClick?: () => void;
  isAuthenticated?: boolean;
}

export default function Header({
  onMenuClick,
  onAuthClick,
  onMyPageClick,
  isAuthenticated = false
}: HeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-40 flex items-start justify-between px-8 py-6 text-white">
      <a href="#home" className="flex flex-col no-underline">
        <span className="text-xs tracking-[0.3em] opacity-60">STUDIO</span>
        <h1 className="mt-1 text-3xl tracking-[0.2em]">ZEUS</h1>
      </a>

      <div className="flex items-center gap-4">
        <button
          onClick={isAuthenticated && onMyPageClick ? onMyPageClick : onAuthClick}
          className="transition-opacity hover:opacity-70"
          aria-label={isAuthenticated ? "마이페이지 열기" : "로그인 열기"}
        >
          <User className="h-6 w-6" />
        </button>

        <button
          onClick={onMenuClick}
          className="transition-opacity hover:opacity-70"
          aria-label="메뉴 열기"
        >
          <Menu className="h-6 w-6" />
        </button>
      </div>
    </header>
  );
}
