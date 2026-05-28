'use client';
import { useState, useEffect, useCallback, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import Logo from '@/components/Logo';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get('next') || '/';
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  // createBrowserClient() is called inside handlers (not at render time) to avoid SSR issues

  useEffect(() => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || document.getElementById('recaptcha-script')) return;
    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const getRecaptchaToken = useCallback(async () => {
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
    if (!siteKey || typeof window === 'undefined' || !window.grecaptcha) return null;
    return new Promise((resolve) => {
      window.grecaptcha.ready(async () => {
        try {
          const token = await window.grecaptcha.execute(siteKey, { action: 'login' });
          resolve(token);
        } catch { resolve(null); }
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const token = await getRecaptchaToken();
      if (token) {
        const captchaRes = await fetch('/api/captcha', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const captchaData = await captchaRes.json();
        if (!captchaData.success) {
          setError(captchaData.error || 'Security check failed. Please try again.');
          setLoading(false);
          return;
        }
      }

      const supabase = createBrowserClient();
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

      if (signInError) {
        setError(signInError.message === 'Invalid login credentials'
          ? 'Wrong email or password. Please try again.'
          : signInError.message);
      } else {
        router.push(next);
        router.refresh();
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!form.email) {
      setError('Enter your email address above first, then click Forgot password.');
      return;
    }
    setLoading(true);
    const supabase = createBrowserClient();
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(form.email, {
      redirectTo: `${window.location.origin}/auth/callback?next=/auth/reset-password`,
    });
    setLoading(false);
    if (resetError) {
      setError(resetError.message);
    } else {
      setResetSent(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-10">
      <div className="w-full max-w-sm mx-auto">
        <Link href="/" className="flex mb-8">
          <Logo size={32} />
        </Link>

        <h1 className="text-2xl font-black text-brand-950 mb-1">Welcome back</h1>
        <p className="text-sm text-slate-400 mb-6">Log in to view and manage your saved paths.</p>

        {resetSent && (
          <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-4">
            Password reset email sent! Check your inbox.
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
              Email address <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              placeholder="arjun@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              autoComplete="email"
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wide">
                Password <span className="text-red-400">*</span>
              </label>
              <button
                type="button"
                onClick={handleForgotPassword}
                className="text-xs text-indigo-500 font-semibold"
              >
                Forgot password?
              </button>
            </div>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Your password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                autoComplete="current-password"
                className="w-full border border-slate-200 rounded-xl px-4 py-3 pr-12 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm font-semibold"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gradient disabled:opacity-60 text-white font-black text-sm py-3.5 rounded-2xl active:opacity-80 transition-opacity"
          >
            {loading ? 'Logging in…' : 'Log in →'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-5">
          No account yet?{' '}
          <Link href="/auth/register" className="text-brand-600 font-bold">Create one free</Link>
        </p>
        <p className="text-center text-xs text-slate-300 mt-3">
          Protected by reCAPTCHA.
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-slate-50" />}>
      <LoginForm />
    </Suspense>
  );
}
