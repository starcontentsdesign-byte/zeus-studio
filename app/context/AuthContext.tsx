'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';

type AuthUser = {
  id: string;
  name: string;
  email: string;
  role?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ email: string; emailConfirmationRequired: boolean }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const mapUser = (user: User | null): AuthUser | null => {
  if (!user) return null;
  const metadata = user.user_metadata ?? {};
  const fallbackName = user.email?.split('@')[0] ?? 'User';
  const name = (metadata.full_name as string | undefined)
    ?? (metadata.name as string | undefined)
    ?? fallbackName;

  return {
    id: user.id,
    name,
    email: user.email ?? '',
    role:
      (user.app_metadata?.role as string | undefined) ??
      (user.user_metadata?.role as string | undefined)
  };
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchUser = async () => {
      const { data, error: userError } = await supabase.auth.getUser();
      if (!active) return;
      if (userError) {
        setError(userError.message);
      }
      setUser(mapUser(data?.user ?? null));
      setLoading(false);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(mapUser(session?.user ?? null));
      setLoading(false);
    });

    return () => {
      active = false;
      subscription.unsubscribe();
    };
  }, [supabase]);

  const signInWithEmail = useCallback(
    async (email: string, password: string) => {
      setError(null);
      const { error: signInError } = await supabase.auth.signInWithPassword({ email, password });
      if (signInError) {
        setError(signInError.message);
        throw signInError;
      }
    },
    [supabase]
  );

  const signUpWithEmail = useCallback(
    async (name: string, email: string, password: string) => {
      setError(null);
      const emailRedirectTo =
        typeof window !== 'undefined'
          ? `${window.location.origin}/auth/callback`
          : undefined;

      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          ...(name ? { data: { full_name: name } } : {}),
          ...(emailRedirectTo ? { emailRedirectTo } : {})
        }
      });
      if (signUpError) {
        setError(signUpError.message);
        throw signUpError;
      }

      return {
        email,
        emailConfirmationRequired: !data.session
      };
    },
    [supabase]
  );

  const signInWithGoogle = useCallback(async () => {
    setError(null);
    const redirectTo = `${window.location.origin}/auth/callback`;

    try {
      const { data, error: oauthError } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo, skipBrowserRedirect: true },
      });

      if (oauthError) {
        setError(oauthError.message);
        throw oauthError;
      }

      if (data?.url) {
        window.location.assign(data.url);
        return;
      }

      throw new Error('Google 로그인 URL을 받지 못했습니다.');
    } catch (oauthError) {
      const message =
        oauthError instanceof Error ? oauthError.message : 'Google OAuth login failed';
      setError(message);
      throw oauthError;
    }
  }, [supabase]);

  const signOut = useCallback(async () => {
    setError(null);
    const { error: signOutError } = await supabase.auth.signOut();
    if (signOutError) {
      setError(signOutError.message);
      throw signOutError;
    }
  }, [supabase]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated: !!user,
      loading,
      error,
      signInWithEmail,
      signUpWithEmail,
      signInWithGoogle,
      signOut,
    }),
    [user, loading, error, signInWithEmail, signUpWithEmail, signInWithGoogle, signOut]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
