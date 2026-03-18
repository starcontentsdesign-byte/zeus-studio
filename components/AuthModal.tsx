import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<'login' | 'signup'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`로그인: ${email}`);
    onClose();
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    alert(`회원가입 완료: ${name} (${email})`);
    onClose();
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${
        isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative bg-zinc-900 rounded-2xl w-full max-w-md">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8">
          {/* Tabs */}
          <div className="flex gap-4 mb-8 border-b border-white/10">
            <button
              onClick={() => setActiveTab('login')}
              className={`pb-4 px-2 text-lg transition-all ${
                activeTab === 'login'
                  ? 'border-b-2 border-white opacity-100'
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              로그인
            </button>
            <button
              onClick={() => setActiveTab('signup')}
              className={`pb-4 px-2 text-lg transition-all ${
                activeTab === 'signup'
                  ? 'border-b-2 border-white opacity-100'
                  : 'opacity-60 hover:opacity-80'
              }`}
            >
              회원가입
            </button>
          </div>

          {/* Login Form */}
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
                  className="w-full px-4 py-3 bg-zinc-800 rounded-lg border border-white/10 focus:border-white/30 outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-zinc-800 rounded-lg border border-white/10 focus:border-white/30 outline-none transition-colors"
                  placeholder="비밀번호를 입력하세요"
                />
              </div>

              <div className="flex items-center justify-between text-xs opacity-60">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4" />
                  <span>로그인 상태 유지</span>
                </label>
                <button type="button" className="hover:opacity-100 transition-opacity">
                  비밀번호 찾기
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-full transition-colors font-medium mt-6"
              >
                로그인
              </button>
            </form>
          )}

          {/* Signup Form */}
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
                  className="w-full px-4 py-3 bg-zinc-800 rounded-lg border border-white/10 focus:border-white/30 outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-zinc-800 rounded-lg border border-white/10 focus:border-white/30 outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-zinc-800 rounded-lg border border-white/10 focus:border-white/30 outline-none transition-colors"
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
                  className="w-full px-4 py-3 bg-zinc-800 rounded-lg border border-white/10 focus:border-white/30 outline-none transition-colors"
                  placeholder="비밀번호를 다시 입력하세요"
                />
              </div>

              <div className="flex items-start gap-2 text-xs opacity-60">
                <input type="checkbox" className="w-4 h-4 mt-0.5" required />
                <span>이용약관 및 개인정보 처리방침에 동의합니다.</span>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-white text-black hover:bg-gray-200 rounded-full transition-colors font-medium mt-6"
              >
                회원가입
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
