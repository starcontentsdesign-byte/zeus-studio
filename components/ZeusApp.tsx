'use client';

import { useState } from 'react';
import Link from 'next/link';

import { useAuth } from '@/app/context/AuthContext';
import AboutSection from '@/components/AboutSection';
import AuthModal from '@/components/AuthModal';
import CommunityLandingSection from '@/components/CommunityLandingSection';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import MenuOverlay from '@/components/MenuOverlay';
import MyPageModal from '@/components/MyPageModal';
import StudioLandingSection from '@/components/StudioLandingSection';

type StudioLandingPost = {
  id: string;
  title: string;
  content: string;
  imageUrl: string | null;
  createdAt: string | null;
};

type CommunityLandingPost = {
  id: string;
  title: string;
  content: string;
  createdAt: string | null;
  isNotice: boolean;
};

type ZeusAppProps = {
  initialStudioPosts: StudioLandingPost[];
  initialCommunityPosts: CommunityLandingPost[];
};

export function ZeusApp({
  initialStudioPosts,
  initialCommunityPosts
}: ZeusAppProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [myPageOpen, setMyPageOpen] = useState(false);
  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle } = useAuth();

  const isAuthenticated = Boolean(user);

  const openLogin = () => {
    setAuthMode('login');
    setAuthError(null);
    setAuthOpen(true);
  };

  const openSignup = () => {
    setAuthMode('signup');
    setAuthError(null);
    setAuthOpen(true);
  };

  const openAccount = () => {
    setMyPageOpen(true);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        onMenuClick={() => setIsMenuOpen(true)}
        onAuthClick={openLogin}
        onMyPageClick={openAccount}
        isAuthenticated={isAuthenticated}
      />

      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        isAuthenticated={isAuthenticated}
        onAuthClick={openLogin}
        onSignupClick={openSignup}
        onMyPageClick={openAccount}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <StudioLandingSection posts={initialStudioPosts} isAuthenticated={isAuthenticated} />
        <CommunityLandingSection
          posts={initialCommunityPosts}
          isAuthenticated={isAuthenticated}
        />

        <section className="border-t border-white/10 bg-black px-8 py-16">
          <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.3em] text-white/50">Control</p>
              <h2 className="text-4xl tracking-[0.14em] md:text-5xl">ADMIN ACCESS</h2>
              <p className="max-w-2xl text-sm leading-relaxed text-white/70">
                관리자 로그인 이후 게시물 추가, 수정, 삭제와 커뮤니티 관리 기능은 그대로 살아있다.
                랜딩 디자인만 원래 ZEUS 톤으로 되돌리고, 운영은 별도 화면으로 빼놨다.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/posts"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm tracking-[0.14em] transition hover:bg-white hover:text-black"
              >
                OPEN POSTS
              </Link>
              <Link
                href="/community"
                className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm tracking-[0.14em] transition hover:bg-white hover:text-black"
              >
                OPEN BOARD
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {authOpen ? (
        <AuthModal
          open={authOpen}
          mode={authMode}
          onClose={() => setAuthOpen(false)}
          onSwitchMode={(mode) => {
            setAuthMode(mode);
            setAuthError(null);
          }}
          loading={authLoading}
          error={authError}
          onLogin={async (email, password) => {
            try {
              setAuthLoading(true);
              setAuthError(null);
              await signInWithEmail(email, password);
              setAuthOpen(false);
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
              setAuthOpen(false);
            } catch (error: any) {
              setAuthError(error?.message ?? '회원가입 실패');
            } finally {
              setAuthLoading(false);
            }
          }}
          onGoogle={() => {
            setAuthError(null);
            setAuthLoading(true);
            signInWithGoogle().catch((error: any) => {
              setAuthError(error?.message ?? 'Google 로그인 실패');
              setAuthLoading(false);
            });
          }}
        />
      ) : null}

      {myPageOpen ? (
        <MyPageModal open={myPageOpen} onOpenChange={setMyPageOpen} />
      ) : null}
    </div>
  );
}
