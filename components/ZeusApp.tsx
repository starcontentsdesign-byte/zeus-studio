'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { useAuth } from '@/app/context/AuthContext';
import AboutSection from '@/components/AboutSection';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { HeroSection } from '@/components/HeroSection';
import MenuOverlay from '@/components/MenuOverlay';
import MyPageModal from '@/components/MyPageModal';
import ServicesSection from '@/components/ServicesSection';
import StudioSection from '@/components/StudioSection';
import { useToast } from '@/components/ui/Toasts/use-toast';
import { isAdminUserLike } from '@/utils/service-posts';

type AuthMode = 'login' | 'signup';

type StudioPostPreview = {
  id: string;
  title: string;
  content: string;
  image_url: string | null;
  created_at: string;
};

const getErrorMessage = (error: unknown, fallback: string) => {
  if (error instanceof Error && error.message.trim()) {
    return error.message;
  }

  return fallback;
};

const normalizeAuthErrorMessage = (error: unknown, fallback: string) => {
  const message = getErrorMessage(error, fallback);
  const normalized = message.toLowerCase();

  if (normalized.includes('email not confirmed')) {
    return '이메일 인증이 아직 안 됐다. 가입한 메일함에서 인증 링크부터 눌러라.';
  }

  if (normalized.includes('invalid login credentials')) {
    return '이메일이나 비밀번호가 틀렸다.';
  }

  return message;
};

export function ZeusApp() {
  const router = useRouter();
  const { toast } = useToast();
  const { user, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authDefaultTab, setAuthDefaultTab] = useState<AuthMode>('login');
  const [authPending, setAuthPending] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [menuOpaque, setMenuOpaque] = useState(false);
  const [showGoTop, setShowGoTop] = useState(false);
  const [studioPosts, setStudioPosts] = useState<StudioPostPreview[]>([]);
  const [studioLoading, setStudioLoading] = useState(true);
  const [studioError, setStudioError] = useState<string | null>(null);
  const [studioPostIdFromQuery, setStudioPostIdFromQuery] = useState<string | null>(null);
  const [isMyPageOpen, setIsMyPageOpen] = useState(false);
  const [myPageDefaultTab, setMyPageDefaultTab] = useState<'profile' | 'admin'>('profile');

  const isAuthenticated = Boolean(user);
  const isAdmin = isAdminUserLike(user);

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

  useEffect(() => {
    const search = new URLSearchParams(window.location.search);
    setStudioPostIdFromQuery(search.get('studioPost')?.trim() || null);
  }, []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();

    const loadStudioPosts = async () => {
      setStudioLoading(true);

      try {
        const response = await fetch('/api/posts?limit=6', {
          signal: controller.signal,
          cache: 'no-store',
        });
        const payload = (await response.json().catch(() => ({}))) as {
          posts?: StudioPostPreview[];
          message?: string;
        };

        if (!active) return;

        if (!response.ok) {
          throw new Error(payload.message || 'Studio 게시물을 불러오지 못했습니다.');
        }

        setStudioPosts(Array.isArray(payload.posts) ? payload.posts : []);
        setStudioError(null);
      } catch (error) {
        if (!active) return;
        if (error instanceof Error && error.name === 'AbortError') return;
        setStudioError(getErrorMessage(error, 'Studio 게시물을 불러오지 못했습니다.'));
      } finally {
        if (active) {
          setStudioLoading(false);
        }
      }
    };

    void loadStudioPosts();

    return () => {
      active = false;
      controller.abort();
    };
  }, []);

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

  const openAuthModal = (mode: AuthMode) => {
    setAuthDefaultTab(mode);
    setAuthError(null);
    setIsMenuOpen(false);
    setIsAuthOpen(true);
  };

  const handleLogin = async (email: string, password: string) => {
    setAuthPending(true);
    setAuthError(null);

    try {
      await signInWithEmail(email, password);
      setIsAuthOpen(false);
      router.refresh();
    } catch (error) {
      setAuthError(normalizeAuthErrorMessage(error, '로그인에 실패했습니다.'));
    } finally {
      setAuthPending(false);
    }
  };

  const handleSignup = async (name: string, email: string, password: string) => {
    setAuthPending(true);
    setAuthError(null);

    try {
      const result = await signUpWithEmail(name, email, password);
      setIsAuthOpen(false);
      toast({
        title: result.emailConfirmationRequired ? '인증 메일 보냈다' : '회원가입 완료',
        description: result.emailConfirmationRequired
          ? `${result.email} 로 인증 메일 보냈다. 메일함에서 인증 링크 누르고 다시 로그인해라.`
          : `${result.email} 계정 가입이 완료됐다. 이제 바로 로그인하면 된다.`
      });
      router.refresh();
    } catch (error) {
      setAuthError(normalizeAuthErrorMessage(error, '회원가입에 실패했습니다.'));
    } finally {
      setAuthPending(false);
    }
  };

  const handleLogout = async () => {
    setAuthError(null);

    try {
      await signOut();
      setIsMenuOpen(false);
      router.refresh();
    } catch (error) {
      setAuthError(getErrorMessage(error, '로그아웃에 실패했습니다.'));
      setIsAuthOpen(true);
    }
  };

  const handleGoogleLogin = async () => {
    setAuthPending(true);
    setAuthError(null);

    try {
      await signInWithGoogle();
      setAuthPending(false);
    } catch (error) {
      setAuthError(normalizeAuthErrorMessage(error, 'Google 로그인에 실패했습니다.'));
      setAuthPending(false);
      return;
    }
  };

  const handleCreatePost = () => {
    setIsMenuOpen(false);
    router.push('/posts/new');
  };

  const handleOpenAdminPage = () => {
    setAuthError(null);
    setMyPageDefaultTab('admin');
    setIsMenuOpen(false);
    setIsMyPageOpen(true);
  };

  return (
    <div className="zeus-app">
      <Header onMenuClick={() => setIsMenuOpen(true)} opaque={menuOpaque} />
      <MenuOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNavigate={handleNavigate}
        isAuthenticated={isAuthenticated}
        isAdmin={isAdmin}
        userEmail={user?.email ?? null}
        onLoginClick={() => openAuthModal('login')}
        onSignupClick={() => openAuthModal('signup')}
        onLogoutClick={handleLogout}
        onAdminPageClick={handleOpenAdminPage}
      />

      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <StudioSection
          posts={studioPosts}
          isLoading={studioLoading}
          error={studioError}
          isAdmin={isAdmin}
          onCreatePost={handleCreatePost}
          studioPostIdFromQuery={studioPostIdFromQuery}
        />
      </main>

      <Footer />

      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => {
          if (authPending) return;
          setIsAuthOpen(false);
        }}
        defaultTab={authDefaultTab}
        onLogin={handleLogin}
        onSignup={handleSignup}
        onGoogleLogin={handleGoogleLogin}
        loading={authPending}
        error={authError}
      />

      <MyPageModal
        open={isMyPageOpen}
        onOpenChange={setIsMyPageOpen}
        defaultTab={myPageDefaultTab}
      />

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
