export function formatIncome(range?: string): string {
  const map: Record<string, string> = {
    under_100k: "Under $100K",
    "100k_250k": "$100K - $250K",
    "250k_500k": "$250K - $500K",
    "500k_1m": "$500K - $1M",
    "1m_5m": "$1M - $5M",
    "5m_10m": "$5M - $10M",
    over_10m: "$10M+",
  };
  return range ? map[range] || range : "";
}

export function formatNetWorth(range?: string): string {
  const map: Record<string, string> = {
    under_1m: "Under $1M",
    "1m_5m": "$1M - $5M",
    "5m_10m": "$5M - $10M",
    "10m_50m": "$10M - $50M",
    "50m_100m": "$50M - $100M",
    over_100m: "$100M+",
  };
  return range ? map[range] || range : "";
}

export function formatLifestyle(level?: string): string {
  const map: Record<string, string> = {
    negotiable: "Negotiable",
    minimal: "Minimal",
    practical: "Practical",
    moderate: "Moderate",
    substantial: "Substantial",
    high: "High",
  };
  return level ? map[level] || level : "";
}

export function formatHeight(cm?: number): string {
  if (!cm) return "";
  const totalInches = Math.round(cm / 2.54);
  const feet = Math.floor(totalInches / 12);
  const inches = totalInches % 12;
  return `${feet}'${inches}"`;
}

export function capitalize(s?: string): string {
  if (!s) return "";
  return s.charAt(0).toUpperCase() + s.slice(1).replace(/_/g, " ");
}

export function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  return date.toLocaleDateString();
}
