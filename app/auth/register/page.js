'use client';
import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { createBrowserClient } from '@/lib/supabase';
import Logo from '@/components/Logo';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ fullName: '', email: '', phone: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  // createBrowserClient() called inside handlers to avoid SSR issues

  // Load reCAPTCHA v3 script
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
          const token = await window.grecaptcha.execute(siteKey, { action: 'register' });
          resolve(token);
        } catch { resolve(null); }
      });
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }
    if (form.password.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }

    setLoading(true);

    try {
      // Verify captcha
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

      // Sign up with Supabase
      const supabase = createBrowserClient();
      const { error: signUpError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: {
            full_name: form.fullName,
            phone: form.phone,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (signUpError) {
        setError(signUpError.message);
      } else {
        setSuccess(true);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="w-full max-w-sm text-center">
          <div className="text-6xl mb-4">📬</div>
          <h1 className="text-2xl font-black text-brand-950 mb-2">Check your email!</h1>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            We sent a confirmation link to <strong>{form.email}</strong>. Click it to activate your account, then log in.
          </p>
          <Link href="/auth/login" className="inline-block bg-brand-gradient text-white font-bold px-6 py-3 rounded-2xl text-sm active:opacity-80 transition-opacity">
            Go to Login →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center px-4 py-10">
      <div className="w-full max-w-sm mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-brand-600 transition-colors mb-6"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Back
        </Link>

        <Link href="/" className="flex mb-8">
          <Logo size={32} />
        </Link>

        <h1 className="text-2xl font-black text-brand-950 mb-1">Create account</h1>
        <p className="text-sm text-slate-400 mb-6">Save paths and share with parents from any device.</p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <Field label="Full name" required>
            <input
              type="text"
              placeholder="Arjun Sharma"
              value={form.fullName}
              onChange={(e) => setForm({ ...form, fullName: e.target.value })}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
            />
          </Field>

          <Field label="Email address" required>
            <input
              type="email"
              placeholder="arjun@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
            />
          </Field>

          <Field label="Phone number (optional)" hint="For parent sharing only">
            <input
              type="tel"
              placeholder="+91 98765 43210"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
            />
          </Field>

          <Field label="Password" required hint="Minimum 8 characters">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a strong password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                minLength={8}
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
          </Field>

          <Field label="Confirm password" required>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Repeat password"
              value={form.confirm}
              onChange={(e) => setForm({ ...form, confirm: e.target.value })}
              required
              className="w-full border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-800 bg-white focus:outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100 transition"
            />
          </Field>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-brand-gradient disabled:opacity-60 text-white font-black text-sm py-3.5 rounded-2xl active:opacity-80 transition-opacity"
          >
            {loading ? 'Creating account…' : 'Create account →'}
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-5">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-brand-600 font-bold">Log in</Link>
        </p>
        <p className="text-center text-xs text-slate-300 mt-3 leading-relaxed">
          Protected by reCAPTCHA. Your data is stored securely and never shared.
        </p>
      </div>
    </div>
  );
}

function Field({ label, children, required, hint }) {
  return (
    <div>
      <label className="block text-xs font-bold text-slate-500 uppercase tracking-wide mb-1.5">
        {label} {required && <span className="text-red-400">*</span>}
        {hint && <span className="ml-1 normal-case text-slate-400 font-normal">· {hint}</span>}
      </label>
      {children}
    </div>
  );
}
