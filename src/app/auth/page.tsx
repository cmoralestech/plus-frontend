"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuthStore } from "@/lib/store";
import api from "@/lib/api";
import { trackFunnel } from "@/lib/track";
import { Eye, EyeOff, Shield, BadgeCheck, Lock } from "lucide-react";

export default function AuthPage() {
  return (
    <Suspense>
      <AuthForm />
    </Suspense>
  );
}

function AuthForm() {
  const searchParams = useSearchParams();
  const [mode, setMode] = useState<"login" | "register">(
    searchParams.get("mode") === "register" ? "register" : "login"
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState<"sugar" | "attractive">("attractive");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { setAuth, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    document.title = mode === "login" ? "Sign In | Plus" : "Create Account | Plus";
  }, [mode]);

  useEffect(() => {
    if (user) router.push("/discover");
  }, [user, router]);

  const passwordStrength = (() => {
    if (!password || mode === "login") return null;
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    if (score <= 1) return { label: "Weak", color: "bg-danger", width: "w-1/4" };
    if (score <= 2) return { label: "Fair", color: "bg-orange-400", width: "w-2/4" };
    if (score <= 3) return { label: "Good", color: "bg-accent", width: "w-3/4" };
    return { label: "Strong", color: "bg-success", width: "w-full" };
  })();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    if (mode === "register" && !agreedToTerms) {
      setError("You must agree to the Terms of Service and Privacy Policy");
      return;
    }
    if (mode === "register") {
      if (!dateOfBirth) {
        setError("Date of birth is required.");
        return;
      }
      const dob = new Date(dateOfBirth);
      const today = new Date();
      let age = today.getFullYear() - dob.getFullYear();
      const m = today.getMonth() - dob.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
      if (age < 18) {
        setError("You must be at least 18 years old to join Plus.");
        return;
      }
    }
    setError("");
    setSubmitting(true);

    try {
      const endpoint = mode === "login" ? "/api/auth/login" : "/api/auth/register";
      let body: Record<string, string>;
      if (mode === "login") {
        body = { email, password };
      } else {
        const utmRaw = localStorage.getItem("utm_data");
        const utm = utmRaw ? JSON.parse(utmRaw) : {};
        body = {
          email,
          password,
          user_type: userType,
          date_of_birth: dateOfBirth,
          referrer: utm.referrer || document.referrer || "",
          landing_page: utm.landing_page || "",
          ...(utm.utm_source && { utm_source: utm.utm_source }),
          ...(utm.utm_medium && { utm_medium: utm.utm_medium }),
          ...(utm.utm_campaign && { utm_campaign: utm.utm_campaign }),
          ...(utm.utm_content && { utm_content: utm.utm_content }),
        };
      }

      const { data } = await api.post(endpoint, body);
      setAuth(data.user, data.access_token);

      if (mode === "register") {
        const utmForTrack = localStorage.getItem("utm_data");
        const utmParsed = utmForTrack ? JSON.parse(utmForTrack) : {};
        trackFunnel("signup", {
          referrer: utmParsed.referrer || document.referrer || "",
          landing_page: utmParsed.landing_page || "",
          ...(utmParsed.utm_source && { utm_source: utmParsed.utm_source }),
          ...(utmParsed.utm_medium && { utm_medium: utmParsed.utm_medium }),
          ...(utmParsed.utm_campaign && { utm_campaign: utmParsed.utm_campaign }),
          ...(utmParsed.utm_content && { utm_content: utmParsed.utm_content }),
        });
        if (typeof window !== "undefined" && (window as any).gtag) {
          (window as any).gtag("event", "sign_up", { method: "email" });
        }
        // Meta Pixel: CompleteRegistration
        if (typeof window !== "undefined" && (window as any).fbq) {
          (window as any).fbq("track", "CompleteRegistration");
        }
        const refCode = localStorage.getItem("referral_code");
        if (refCode) {
          try {
            await api.post(`/api/referrals/register-referral?code=${refCode}`, null, {
              headers: { Authorization: `Bearer ${data.access_token}` },
            });
          } catch {}
          localStorage.removeItem("referral_code");
        }
      }

      router.push(data.user.has_profile ? "/discover" : "/onboarding");
    } catch (err: any) {
      const detail = err.response?.data?.detail;
      if (typeof detail === "string" && detail.toLowerCase().includes("already")) {
        setError("An account with this email already exists. Try signing in instead.");
      } else if (typeof detail === "string" && detail.toLowerCase().includes("credentials")) {
        setError("Invalid email or password. Please try again.");
      } else {
        setError(detail || "Something went wrong. Please try again.");
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      {/* Left side — value prop (desktop only) */}
      <div className="hidden lg:flex lg:w-[45%] relative flex-col justify-end p-12 xl:p-16">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1581954548122-4dff8989c0f7?w=1200&q=80&auto=format"
            alt=""
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        </div>
        <div className="relative z-10">
          <Link href="/" className="text-lg tracking-[0.2em] uppercase font-display text-accent block mb-10">
            Plus
          </Link>
          <h2 className="font-display text-3xl xl:text-4xl text-white leading-snug mb-4">
            {mode === "register" ? "Your next chapter starts here." : "Welcome back."}
          </h2>
          <p className="text-white/60 text-sm leading-relaxed max-w-sm mb-8">
            {mode === "register"
              ? "Join verified members who are honest about what they want. Create your profile in two minutes."
              : "Pick up where you left off. Your matches are waiting."}
          </p>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3 text-white/50 text-xs">
              <BadgeCheck size={16} className="text-accent flex-shrink-0" />
              <span>Income & photo verified members</span>
            </div>
            <div className="flex items-center gap-3 text-white/50 text-xs">
              <Shield size={16} className="text-accent flex-shrink-0" />
              <span>Private & discreet by default</span>
            </div>
            <div className="flex items-center gap-3 text-white/50 text-xs">
              <Lock size={16} className="text-accent flex-shrink-0" />
              <span>Free for attractive members, always</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right side — form */}
      <div className="flex-1 flex items-start md:items-center justify-center px-5 pt-14 md:pt-12 pb-12">
        <div className="w-full max-w-sm">
          {/* Mobile logo */}
          <h1 className="lg:hidden">
            <Link href="/" className="text-lg tracking-[0.2em] uppercase font-display text-accent block mb-8 text-center">
              Plus
            </Link>
          </h1>

          {/* Desktop heading */}
          <div className="hidden lg:block mb-8">
            <h1 className="text-xl font-display mb-1">
              {mode === "login" ? "Sign in to your account" : "Create your free account"}
            </h1>
            <p className="text-sm text-muted">
              {mode === "login"
                ? "Enter your email and password to continue."
                : "Takes less than 2 minutes. No credit card needed."}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-card rounded-lg p-1 mb-6 border border-card-border">
            <button
              type="button"
              onClick={() => { setMode("login"); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
                mode === "login"
                  ? "bg-muted-bg text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => { setMode("register"); setError(""); }}
              className={`flex-1 py-2.5 text-sm font-medium rounded-md transition-colors ${
                mode === "register"
                  ? "bg-muted-bg text-foreground"
                  : "text-muted hover:text-foreground"
              }`}
            >
              Create account
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="auth-email" className="block text-sm font-medium mb-1.5">
                Email
              </label>
              <input
                id="auth-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="auth-password" className="text-sm font-medium">
                  Password
                </label>
                {mode === "login" && (
                  <Link href="/forgot-password" className="text-xs text-accent hover:text-accent-light transition-colors">
                    Forgot password?
                  </Link>
                )}
              </div>
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength={8}
                  autoComplete={mode === "login" ? "current-password" : "new-password"}
                  className="w-full px-4 py-3 pr-12 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  placeholder={mode === "register" ? "Min. 8 characters" : "Your password"}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {/* Password strength bar */}
              {mode === "register" && password.length > 0 && passwordStrength && (
                <div className="mt-2">
                  <div className="h-1 bg-card-border rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${passwordStrength.color} ${passwordStrength.width}`}
                    />
                  </div>
                  <p className="text-[11px] text-muted mt-1">{passwordStrength.label} password</p>
                </div>
              )}
            </div>

            {mode === "register" && (
              <>
                {/* User type selector */}
                <fieldset>
                  <legend className="text-sm font-medium mb-2">I want to join as...</legend>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setUserType("sugar")}
                      aria-pressed={userType === "sugar"}
                      className={`px-4 py-3.5 rounded-lg border-2 text-left transition-colors ${
                        userType === "sugar"
                          ? "border-accent bg-accent/5"
                          : "border-card-border hover:border-muted"
                      }`}
                    >
                      <span className="text-sm font-medium block">Successful</span>
                      <span className="text-[11px] text-muted mt-0.5 block leading-snug">
                        I&apos;m established and generous. I&apos;ll verify my income.
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserType("attractive")}
                      aria-pressed={userType === "attractive"}
                      className={`px-4 py-3.5 rounded-lg border-2 text-left transition-colors ${
                        userType === "attractive"
                          ? "border-accent bg-accent/5"
                          : "border-card-border hover:border-muted"
                      }`}
                    >
                      <span className="text-sm font-medium block">Attractive</span>
                      <span className="text-[11px] text-muted mt-0.5 block leading-snug">
                        I bring the spark. Always 100% free.
                      </span>
                    </button>
                  </div>
                </fieldset>

                {/* Date of birth */}
                <div>
                  <label htmlFor="auth-dob" className="block text-sm font-medium mb-1.5">
                    Date of birth
                  </label>
                  <input
                    id="auth-dob"
                    type="date"
                    value={dateOfBirth}
                    onChange={(e) => setDateOfBirth(e.target.value)}
                    max={new Date(new Date().getFullYear() - 18, new Date().getMonth(), new Date().getDate()).toISOString().split("T")[0]}
                    className="w-full px-4 py-3 bg-card border border-card-border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent"
                  />
                </div>

                {/* Terms agreement */}
                <label className="flex items-start gap-2.5 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded border-card-border bg-card accent-accent flex-shrink-0"
                  />
                  <span className="text-xs text-muted leading-relaxed">
                    I agree to the{" "}
                    <Link href="/terms" target="_blank" className="text-accent hover:underline">
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" target="_blank" className="text-accent hover:underline">
                      Privacy Policy
                    </Link>
                    . I am at least 18 years old.
                  </span>
                </label>
              </>
            )}

            {error && (
              <p className="text-danger text-sm bg-danger/10 border border-danger/20 px-4 py-3 rounded-lg" role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-accent text-background rounded-lg font-semibold hover:bg-accent-dark transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 min-h-[48px] flex items-center justify-center gap-2"
            >
              {submitting && (
                <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              )}
              {submitting
                ? mode === "login"
                  ? "Signing in..."
                  : "Creating account..."
                : mode === "login"
                ? "Sign in"
                : "Create free account"}
            </button>
          </form>

          <p className="text-center text-xs text-muted mt-6">
            {mode === "login" ? (
              <>
                New here?{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="text-accent hover:underline"
                >
                  Create a free account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="text-accent hover:underline"
                >
                  Sign in
                </button>
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
