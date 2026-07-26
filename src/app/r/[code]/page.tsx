"use client";

import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function ReferralRedirectPage() {
  const router = useRouter();
  const params = useParams();
  const code = params.code as string;

  useEffect(() => {
    if (!code) return;

    // Track the click
    const apiBase = process.env.NEXT_PUBLIC_API_URL || "https://api.meetyourplus.com";
    fetch(`${apiBase}/api/referrals/track/${code}`).catch(() => {});

    // Store referral code for after registration
    localStorage.setItem("referral_code", code);

    // Redirect to register
    router.push("/auth?mode=register");
  }, [code, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-8 h-8 border-2 border-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
