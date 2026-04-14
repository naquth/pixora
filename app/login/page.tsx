"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    window.location.href = "/feed";
  };

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-10">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-xl shadow-sky-200 dark:shadow-sky-900/40 mb-4">
            <span className="text-white font-bold text-xl">Px</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--text)]">Pixora</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Share your world, beautifully.</p>
        </div>

        {/* Form */}
        <div className="space-y-3 mb-4">
          <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-subtle)] focus-within:border-sky-400 focus-within:bg-[var(--bg)] transition-all">
            <label className="block px-4 pt-3 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">Email or username</label>
            <input
              type="text"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 pb-3 bg-transparent text-sm text-[var(--text)] outline-none"
            />
          </div>
          <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-subtle)] focus-within:border-sky-400 focus-within:bg-[var(--bg)] transition-all relative">
            <label className="block px-4 pt-3 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">Password</label>
            <input
              type={showPw ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 pb-3 pr-12 bg-transparent text-sm text-[var(--text)] outline-none"
            />
            <button
              onClick={() => setShowPw(v => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text)]"
            >
              {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="flex justify-end mb-6">
          <Link href="#" className="text-xs text-sky-500 hover:text-sky-600 font-medium">Forgot password?</Link>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading || !email || !password}
          className="w-full py-3.5 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-sky-200 dark:shadow-sky-900/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : "Log in"}
        </button>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-[var(--border)]" />
          <span className="text-xs text-[var(--text-muted)] font-medium">OR</span>
          <div className="flex-1 h-px bg-[var(--border)]" />
        </div>

        {/* OAuth */}
        <button className="w-full py-3 border border-[var(--border)] rounded-xl text-sm font-semibold text-[var(--text)] hover:bg-[var(--bg-subtle)] transition-colors flex items-center justify-center gap-2 mb-3">
          <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
          Continue with Google
        </button>

        {/* Register link */}
        <p className="text-center text-sm text-[var(--text-muted)] mt-6">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-sky-500 hover:text-sky-600 font-semibold">Sign up</Link>
        </p>
      </div>
    </div>
  );
}
