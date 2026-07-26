"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import api from "@/lib/api";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

function VerifyContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "already" | "error">("loading");

  useEffect(() => {
    if (!token) {
      setStatus("error");
      return;
    }
    (async () => {
      try {
        const { data } = await api.get(`/api/auth/verify-email?token=${token}`);
        setStatus(data.already_verified ? "already" : "success");
      } catch {
        setStatus("error");
      }
    })();
  }, [token]);

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="text-center max-w-md">
        {status === "loading" && (
          <>
            <Loader2 size={48} className="animate-spin text-accent mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Verifying your email...</h2>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle size={48} className="text-success mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Email verified!</h2>
            <p className="text-sm text-muted mb-6">Your account is now verified. You can start using Plus.</p>
            <Link href="/discover" className="px-6 py-3 bg-accent text-[#141210] rounded-lg font-semibold inline-block">
              Start discovering
            </Link>
          </>
        )}
        {status === "already" && (
          <>
            <CheckCircle size={48} className="text-success mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Already verified</h2>
            <p className="text-sm text-muted mb-6">Your email is already verified.</p>
            <Link href="/discover" className="px-6 py-3 bg-accent text-[#141210] rounded-lg font-semibold inline-block">
              Go to app
            </Link>
          </>
        )}
        {status === "error" && (
          <>
            <XCircle size={48} className="text-danger mx-auto mb-4" />
            <h2 className="text-xl font-bold mb-2">Verification failed</h2>
            <p className="text-sm text-muted mb-6">This link is invalid or expired. Try requesting a new one.</p>
            <Link href="/auth" className="px-6 py-3 bg-accent text-[#141210] rounded-lg font-semibold inline-block">
              Back to sign in
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return <Suspense><VerifyContent /></Suspense>;
}
