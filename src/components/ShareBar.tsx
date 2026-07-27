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
    <div className="flex items-center gap-3 py-4" style={{ borderTop: "1px solid #E8DDD2" }}>
      <span className="text-xs" style={{ color: "#8A7E76" }}>Share:</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{ color: "#8A7E76", border: "1px solid #E8DDD2" }}
      >
        X / Twitter
      </a>
      <a
        href={`https://www.reddit.com/submit?url=${encodedUrl}&title=${text}`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{ color: "#8A7E76", border: "1px solid #E8DDD2" }}
      >
        Reddit
      </a>
      <button
        onClick={copy}
        className="text-xs px-3 py-1.5 rounded-full transition-colors"
        style={{ color: copied ? "#C87F6E" : "#8A7E76", border: "1px solid #E8DDD2" }}
      >
        {copied ? "Copied!" : "Copy link"}
      </button>
    </div>
  );
}
