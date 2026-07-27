"use client";

import { useRouter } from "next/navigation";

export default function BlogCTA({ slug, gold, dark1 }: { slug: string; gold: string; dark1: string }) {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4">
      <button
        onClick={() => {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'cta_click', { source: 'blog', slug });
          }
          router.push('/auth?mode=register');
        }}
        className="inline-flex items-center justify-center px-10 py-4 text-sm tracking-wide font-medium transition-all cursor-pointer"
        style={{ background: gold, color: dark1 }}
      >
        Create your free profile
      </button>
      <p className="text-xs" style={{ color: '#8A7E76' }}>
        Know someone who&apos;d love this?{' '}
        <a href="/earn" style={{ color: gold, textDecoration: 'underline' }}>
          Earn $5–$12/month per referral
        </a>
      </p>
      <p className="text-xs" style={{ color: '#8A7E76' }}>
        Successful and generous?{' '}
        <a href="/for-sugar-daddies" style={{ color: gold, textDecoration: 'underline' }}>
          See why Plus is worth it
        </a>
      </p>
      <p className="text-xs" style={{ color: '#8A7E76' }}>
        Join the community &rarr;{' '}
        <a href="/community" style={{ color: gold, textDecoration: 'underline' }}>
          Free dating advice from real members
        </a>
      </p>
    </div>
  );
}
