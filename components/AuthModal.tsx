'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { createClient } from '@/utils/supabase/client';

type Mode = 'login' | 'signup';

type Props = {
  open: boolean;
  mode: Mode;
  onClose: () => void;
  onSwitchMode: (mode: Mode) => void;
  onGoogle?: () => void;
  onLogin?: (email: string, password: string) => Promise<void> | void;
  onSignup?: (name: string, email: string, password: string) => Promise<void> | void;
  loading?: boolean;
  error?: string | null;
};

export default function AuthModal({
  open,
  mode,
  onClose,
  onSwitchMode,
  onGoogle,
  onLogin,
  onSignup,
  loading = false,
  error = null,
}: Props) {
  const supabase = createClient();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [resetLoading, setResetLoading] = useState(false);
  const [resetError, setResetError] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const isValidEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    // 모달 열릴 때 초기화(원하면 제거)
    setPassword('');
    setResetError(null);
    setResetMessage(null);
  }, [open, mode]);

  if (!open) return null;

  const submit = async () => {
    setResetError(null);
    setResetMessage(null);
    if (mode === 'login') {
      await onLogin?.(email.trim(), password);
    } else {
      await onSignup?.(name.trim(), email.trim(), password);
    }
  };

  const handleForgotPassword = async () => {
    const normalizedEmail = email.trim();
    setResetError(null);
    setResetMessage(null);

    if (!isValidEmail(normalizedEmail)) {
      setResetError('올바른 이메일 주소를 입력해 주세요.');
      return;
    }

    const configuredSiteUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();
    const origin = configuredSiteUrl
      ? configuredSiteUrl.replace(/\/+$/, '')
      : window.location.origin;
    const redirectTo = `${origin}/auth/reset_password`;

    setResetLoading(true);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(normalizedEmail, {
        redirectTo
      });

      if (error) {
        throw error;
      }

      setResetMessage('비밀번호 재설정 이메일을 보냈습니다. 메일함을 확인해 주세요.');
    } catch (error) {
      setResetError(
        error instanceof Error ? error.message : '재설정 이메일 전송에 실패했습니다.'
      );
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative z-10 w-full max-w-md rounded-2xl bg-zinc-950 text-white shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-6 top-6 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-white/20"
          aria-label="닫기"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8">
          <div className="mb-8 flex gap-4 border-b border-white/10">
            <button
              type="button"
              onClick={() => onSwitchMode('login')}
              className={`pb-4 px-2 text-lg transition-all ${
                mode === 'login'
                  ? 'border-b-2 border-white opacity-100'
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              로그인
            </button>
            <button
              type="button"
              onClick={() => onSwitchMode('signup')}
              className={`pb-4 px-2 text-lg transition-all ${
                mode === 'signup'
                  ? 'border-b-2 border-white opacity-100'
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              회원가입
            </button>
          </div>

          <div className="space-y-4">
            {mode === 'signup' ? (
              <div className="space-y-2">
                <label className="text-sm opacity-80">이름</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition-colors focus:border-white/30"
                  placeholder="홍길동"
                />
              </div>
            ) : null}

            <div className="space-y-2">
              <label className="text-sm opacity-80">이메일</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition-colors focus:border-white/30"
                placeholder="you@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm opacity-80">비밀번호</label>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="w-full rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white outline-none transition-colors focus:border-white/30"
                placeholder="••••••••"
              />
            </div>

            {error ? <div className="text-sm text-red-300">{error}</div> : null}
            {mode === 'login' && resetError ? (
              <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                {resetError}
              </div>
            ) : null}
            {mode === 'login' && resetMessage ? (
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/80">
                {resetMessage}
              </div>
            ) : null}

            {mode === 'login' ? (
              <div className="flex items-center justify-end text-xs text-white/60">
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  disabled={loading || resetLoading}
                  className="transition-opacity hover:opacity-100 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {resetLoading ? '전송 중…' : '비밀번호 찾기'}
                </button>
              </div>
            ) : null}

            <button
              type="button"
              onClick={submit}
              disabled={loading || resetLoading}
              className="mt-6 w-full rounded-full bg-white py-3 font-medium text-black transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? '처리중…' : mode === 'login' ? '로그인' : '회원가입'}
            </button>

            <button
              type="button"
              onClick={() => onGoogle?.()}
              disabled={loading || resetLoading}
              className="w-full rounded-full border border-white/20 py-3 font-medium text-white transition-colors hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              Google로 계속
            </button>

            <p className="text-xs leading-relaxed text-white/50">
              계속 진행하면 서비스 약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
