"use client";
import { useState } from "react";
import Link from "next/link";
import { Eye, EyeOff, Loader2, Check } from "lucide-react";

export default function RegisterPage() {
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", username: "", email: "", password: "" });

  const update = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleNext = () => {
    if (step === 1) setStep(2);
    else handleSubmit();
  };

  const handleSubmit = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    window.location.href = "/feed";
  };

  const pwStrength = form.password.length === 0 ? 0 : form.password.length < 6 ? 1 : form.password.length < 10 ? 2 : 3;
  const strengthColors = ["", "bg-red-400", "bg-yellow-400", "bg-green-400"];
  const strengthLabels = ["", "Weak", "Good", "Strong"];

  return (
    <div className="min-h-screen bg-[var(--bg)] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center shadow-xl shadow-sky-200 dark:shadow-sky-900/40 mb-4">
            <span className="text-white font-bold text-xl">Px</span>
          </div>
          <h1 className="font-display text-3xl font-bold text-[var(--text)]">Join Pixora</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">Sign up to see photos from your friends.</p>
        </div>

        {/* Progress */}
        <div className="flex gap-1.5 mb-8">
          {[1, 2].map(s => (
            <div key={s} className={`flex-1 h-1 rounded-full transition-all duration-300 ${s <= step ? "bg-sky-500" : "bg-[var(--bg-muted)]"}`} />
          ))}
        </div>

        {step === 1 && (
          <div className="space-y-3">
            {[
              { key: "email", label: "Email address", type: "email" },
              { key: "name", label: "Full name", type: "text" },
            ].map(f => (
              <div key={f.key} className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-subtle)] focus-within:border-sky-400 focus-within:bg-[var(--bg)] transition-all">
                <label className="block px-4 pt-3 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">{f.label}</label>
                <input
                  type={f.type}
                  value={form[f.key as keyof typeof form]}
                  onChange={e => update(f.key, e.target.value)}
                  className="w-full px-4 pb-3 bg-transparent text-sm text-[var(--text)] outline-none"
                />
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div className="space-y-3">
            <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-subtle)] focus-within:border-sky-400 focus-within:bg-[var(--bg)] transition-all">
              <label className="block px-4 pt-3 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">Username</label>
              <div className="flex items-center">
                <span className="pl-4 pb-3 pt-0 text-sm text-[var(--text-muted)]">@</span>
                <input
                  type="text"
                  value={form.username}
                  onChange={e => update("username", e.target.value.toLowerCase().replace(/\s/g, ""))}
                  className="flex-1 px-1 pb-3 bg-transparent text-sm text-[var(--text)] outline-none"
                />
              </div>
            </div>
            <div className="border border-[var(--border)] rounded-xl overflow-hidden bg-[var(--bg-subtle)] focus-within:border-sky-400 focus-within:bg-[var(--bg)] transition-all relative">
              <label className="block px-4 pt-3 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-widest">Password</label>
              <input
                type={showPw ? "text" : "password"}
                value={form.password}
                onChange={e => update("password", e.target.value)}
                className="w-full px-4 pb-3 pr-12 bg-transparent text-sm text-[var(--text)] outline-none"
              />
              <button onClick={() => setShowPw(v => !v)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
                {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {form.password && (
              <div className="space-y-1.5">
                <div className="flex gap-1">
                  {[1, 2, 3].map(i => (
                    <div key={i} className={`flex-1 h-1 rounded-full transition-all ${i <= pwStrength ? strengthColors[pwStrength] : "bg-[var(--bg-muted)]"}`} />
                  ))}
                </div>
                <p className="text-xs text-[var(--text-muted)]">Password strength: <span className={`font-semibold ${pwStrength === 3 ? "text-green-500" : pwStrength === 2 ? "text-yellow-500" : "text-red-500"}`}>{strengthLabels[pwStrength]}</span></p>
              </div>
            )}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={loading}
          className="w-full py-3.5 mt-6 bg-gradient-to-r from-sky-500 to-indigo-500 hover:from-sky-600 hover:to-indigo-600 text-white font-semibold rounded-xl transition-all shadow-lg shadow-sky-200 dark:shadow-sky-900/30 disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {loading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : step === 2 ? (
            <>
              <Check size={16} />
              Create account
            </>
          ) : (
            "Continue"
          )}
        </button>

        <p className="text-center text-xs text-[var(--text-muted)] mt-4 leading-relaxed">
          By signing up, you agree to our{" "}
          <Link href="#" className="text-sky-500 hover:underline">Terms</Link>,{" "}
          <Link href="#" className="text-sky-500 hover:underline">Privacy Policy</Link> and{" "}
          <Link href="#" className="text-sky-500 hover:underline">Cookies Policy</Link>.
        </p>

        <div className="border-t border-[var(--border)] mt-8 pt-6 text-center">
          <p className="text-sm text-[var(--text-muted)]">
            Have an account?{" "}
            <Link href="/login" className="text-sky-500 hover:text-sky-600 font-semibold">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
