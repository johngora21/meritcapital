"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

export default function EntrepreneurSignupPage() {
  const router = useRouter();
  const [full_name, setFullName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const API_BASE = '';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/v1/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, full_name, role: 'entrepreneur' }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.message || 'Signup failed');
      }
      router.replace('/login');
    } catch (err: any) {
      setError(err.message || 'Signup failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mc-login">
      <form className="mc-login__card" onSubmit={onSubmit}>
        <h1 className="mc-login__title">Create Entrepreneur Account</h1>
        {error && <div className="mc-alert mc-alert--error">{error}</div>}
        <label className="mc-field">
          <span>Full name</span>
          <input value={full_name} onChange={(e) => setFullName(e.target.value)} required />
        </label>
        <label className="mc-field">
          <span>Email</span>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <label className="mc-field">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button type="submit" className="mc-btn mc-w-full" disabled={submitting}>
          {submitting ? 'Creating...' : 'Create account'}
        </button>
        <div className="mc-login__links">
          <a href="/login">Back to Login</a>
        </div>
      </form>
      <style jsx>{`
        .mc-login { display: grid; place-items: center; min-height: 100vh; padding: 24px; background: linear-gradient(120deg, #0ea5e9 0%, #2563eb 100%); }
        .mc-login__card { width: 100%; max-width: 420px; background: #0b1220; color: #e5e7eb; border-radius: 16px; padding: 28px; box-shadow: 0 10px 30px rgba(0,0,0,0.25); border: 1px solid rgba(255,255,255,0.08); }
        .mc-login__title { margin: 0 0 16px; font-size: 22px; font-weight: 600; }
        .mc-field { display: flex; flex-direction: column; gap: 8px; margin-bottom: 14px; }
        .mc-field span { font-size: 13px; color: #9ca3af; }
        .mc-field input { height: 44px; background: #0f172a; color: #e5e7eb; border: 1px solid #1f2937; border-radius: 10px; padding: 0 12px; }
        .mc-btn { height: 44px; border-radius: 10px; background: #10b981; color: #fff; border: none; cursor: pointer; font-weight: 600; }
        .mc-w-full { width: 100%; }
        .mc-alert { margin: 8px 0 12px; padding: 12px; border-radius: 10px; font-size: 14px; }
        .mc-alert--error { background: rgba(239,68,68,.15); color: #fecaca; border: 1px solid rgba(239,68,68,.25); }
        .mc-login__links { display: grid; gap: 6px; margin-top: 14px; }
        .mc-login__links a { color: #93c5fd; text-decoration: none; font-size: 14px; }
      `}</style>
    </div>
  );
}


