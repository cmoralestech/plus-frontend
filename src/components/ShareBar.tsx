"use client";

import { useState } from "react";

interface Props {
  title: string;
  slug: string;
}

export default function ShareBar({ title, slug }: Props) {
  const [copied, setCopied] = useState(false);
  const url = `https://meetyourplus.com/blog/${slug}`;
  const text = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center gap-3 py-4" style={{ borderTop: "1px solid #2e2a24" }}>
      <span className="text-xs" style={{ color: "#706860" }}>Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{ color: "#a8a090", border: "1px solid #2e2a24" }}
      >
        X / Twitter
      </a>
      <a
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{ color: "#a8a090", border: "1px solid #2e2a24" }}
      >
        Reddit
      </a>
      <button
        onClick={copy}
        className="text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{ color: copied ? "#d4b896" : "#a8a090", border: "1px solid #2e2a24" }}
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
