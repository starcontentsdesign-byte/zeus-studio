'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

type AuthMode = 'login' | 'signup';

type AuthModalProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: AuthMode;
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onSignup?: (name: string, email: string, password: string) => Promise<void> | void;
  onGoogleLogin?: () => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
};

export default function AuthModal({
  isOpen,
  onClose,
  defaultTab = 'login',
  onLogin,
  onSignup,
  onGoogleLogin,
  loading = false,
  error = null
}: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthMode>(defaultTab);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab(defaultTab);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [defaultTab, isOpen]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    await onLogin?.(email.trim(), password);
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return;
    }

    await onSignup?.(name.trim(), email.trim(), password);
  };

  const handleGoogleLogin = async () => {
    await onGoogleLogin?.();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative w-full max-w-md rounded-2xl bg-zinc-900">
        <button
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="닫기"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="mb-8 flex gap-4 border-b border-white/10">
            <button
              onClick={() => setActiveTab('login')}
              className={`px-2 pb-4 text-lg transition-all ${
                activeTab === 'login'
                  ? 'border-b-2 border-white opacity-100'
                  : 'opacity-60 hover:opacity-80'
              }`}
              type="button"
            >
              로그인
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`px-2 pb-4 text-lg transition-all ${
                activeTab === 'signup'
                  ? 'border-b-2 border-white opacity-100'
                  : 'opacity-60 hover:opacity-80'
              }`}
              type="button"
            >
              회원가입
            </button>
          </div>

          {activeTab === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="login-email" className="text-sm opacity-80">
                  이메일
                </label>
                <input
                  id="login-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 outline-none transition-colors focus:border-white/30"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="login-password" className="text-sm opacity-80">
                  비밀번호
                </label>
                <input
                  id="login-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 outline-none transition-colors focus:border-white/30"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>

              <div className="flex items-center justify-between text-xs opacity-60">
                <label className="flex cursor-pointer items-center gap-2">
                  <input type="checkbox" className="h-4 w-4" />
                  <span>로그인 상태 유지</span>
                </label>
                <button type="button" className="transition-opacity hover:opacity-100">
                  비밀번호 찾기
                </button>
              </div>

              {error ? <p className="text-sm text-red-300">{error}</p> : null}

              <button
                type="submit"
                disabled={loading}
                className="mt-6 w-full rounded-full bg-white py-3 font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? '처리 중...' : '로그인'}
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full rounded-full border border-white/15 bg-transparent py-3 font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Google로 계속하기
                </button>
              </div>
            </form>
          )}

          {activeTab === 'signup' && (
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="signup-name" className="text-sm opacity-80">
                  이름
                </label>
                <input
                  id="signup-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 outline-none transition-colors focus:border-white/30"
                  placeholder="이름을 입력하세요"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="signup-email" className="text-sm opacity-80">
                  이메일
                </label>
                <input
                  id="signup-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 outline-none transition-colors focus:border-white/30"
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="signup-password" className="text-sm opacity-80">
                  비밀번호
                </label>
                <input
                  id="signup-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 outline-none transition-colors focus:border-white/30"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="signup-confirm" className="text-sm opacity-80">
                  비밀번호 확인
                </label>
                <input
                  id="signup-confirm"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 outline-none transition-colors focus:border-white/30"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>

              <div className="flex items-start gap-2 text-xs opacity-60">
                <input type="checkbox" className="mt-0.5 h-4 w-4" required />
                <span>이용약관 및 개인정보 처리방침에 동의합니다.</span>
              </div>

              {password && confirmPassword && password !== confirmPassword ? (
                <p className="text-sm text-red-300">비밀번호가 일치하지 않습니다.</p>
              ) : null}
              {error ? <p className="text-sm text-red-300">{error}</p> : null}

              <button
                type="submit"
                disabled={loading || password !== confirmPassword}
                className="mt-6 w-full rounded-full bg-white py-3 font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? '처리 중...' : '회원가입'}
              </button>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                  className="w-full rounded-full border border-white/15 bg-transparent py-3 font-medium text-white transition-colors hover:border-white/30 hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Google로 시작하기
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
