"use client";

import { useState } from "react";
import { X } from "lucide-react";

interface FilterBarProps {
  filters: Record<string, string>;
  onFilterChange: (filters: Record<string, string>) => void;
  onSearch: () => void;
}

interface FilterOption {
  key: string;
  label: string;
  type: "select" | "input";
  options?: { value: string; label: string }[];
  placeholder?: string;
}

const FILTER_DEFS: FilterOption[] = [
  { key: "gender", label: "Gender", type: "select", options: [
    { value: "", label: "Any" }, { value: "male", label: "Men" }, { value: "female", label: "Women" },
  ]},
  { key: "min_age", label: "Age", type: "input", placeholder: "Min" },
  { key: "max_age", label: "to", type: "input", placeholder: "Max" },
  { key: "city", label: "City", type: "input", placeholder: "City" },
  { key: "max_distance", label: "Distance", type: "select", options: [
    { value: "", label: "Any" }, { value: "10", label: "10 mi" }, { value: "25", label: "25 mi" },
    { value: "50", label: "50 mi" }, { value: "100", label: "100 mi" }, { value: "250", label: "250 mi" },
  ]},
  { key: "user_type", label: "Type", type: "select", options: [
    { value: "", label: "Any" }, { value: "sugar", label: "Successful" }, { value: "attractive", label: "Attractive" },
  ]},
  { key: "income_range", label: "Income", type: "select", options: [
    { value: "", label: "Any" }, { value: "100k_250k", label: "$100K+" }, { value: "250k_500k", label: "$250K+" },
    { value: "500k_1m", label: "$500K+" }, { value: "1m_5m", label: "$1M+" }, { value: "5m_10m", label: "$5M+" }, { value: "over_10m", label: "$10M+" },
  ]},
  { key: "education", label: "Education", type: "select", options: [
    { value: "", label: "Any" }, { value: "bachelors", label: "Bachelor's+" }, { value: "masters", label: "Master's+" }, { value: "doctorate", label: "Doctorate" },
  ]},
  { key: "body_type", label: "Body", type: "select", options: [
    { value: "", label: "Any" }, { value: "slim", label: "Slim" }, { value: "athletic", label: "Athletic" },
    { value: "average", label: "Average" }, { value: "curvy", label: "Curvy" },
  ]},
];

export default function FilterBar({ filters, onFilterChange, onSearch }: FilterBarProps) {
  const [expandedFilter, setExpandedFilter] = useState<string | null>(null);

  const update = (key: string, value: string) => {
    onFilterChange({ ...filters, [key]: value });
  };

  const activeCount = Object.values(filters).filter(Boolean).length;

  const clearAll = () => {
    const cleared: Record<string, string> = {};
    Object.keys(filters).forEach((k) => (cleared[k] = ""));
    onFilterChange(cleared);
  };

  const getFilterLabel = (def: FilterOption): string => {
    const val = filters[def.key];
    if (!val) return def.label;
    if (def.options) {
      const opt = def.options.find((o) => o.value === val);
      return opt ? opt.label : def.label;
    }
    return val;
  };

  return (
    <div className="mb-4">
      {/* Pill row */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none" style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" } as React.CSSProperties}>
        {/* Search button */}
        <button
          onClick={onSearch}
          className="flex-shrink-0 px-4 py-2 bg-accent text-[#141210] rounded-full text-sm font-medium min-h-[38px] whitespace-nowrap"
        >
          Search{activeCount > 0 ? ` (${activeCount})` : ""}
        </button>

        {/* Filter pills */}
        {FILTER_DEFS.map((def) => {
          const isActive = !!filters[def.key];
          const isExpanded = expandedFilter === def.key;

          // Age is a special case — combine min/max
          if (def.key === "max_age") return null;
          if (def.key === "min_age") {
            const hasAge = filters.min_age || filters.max_age;
            const ageLabel = hasAge
              ? `${filters.min_age || "18"}-${filters.max_age || "99"}`
              : "Age";
            return (
              <div key="age" className="relative flex-shrink-0">
                <button
                  onClick={() => setExpandedFilter(isExpanded ? null : "age")}
                  className={`px-3 py-2 rounded-full text-sm font-medium min-h-[38px] whitespace-nowrap border transition-colors ${
                    hasAge
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-card-border text-muted hover:border-accent/50"
                  }`}
                >
                  {ageLabel}
                </button>
                {expandedFilter === "age" && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setExpandedFilter(null)} />
                    <div className="absolute top-full left-0 mt-2 bg-card border border-card-border rounded-lg shadow-xl p-3 z-20 flex gap-2 items-center">
                      <input
                        type="number" placeholder="Min" value={filters.min_age || ""}
                        onChange={(e) => update("min_age", e.target.value)}
                        className="w-16 px-2 py-1.5 bg-background border border-card-border rounded text-sm text-center"
                        min={18}
                      />
                      <span className="text-xs text-muted">to</span>
                      <input
                        type="number" placeholder="Max" value={filters.max_age || ""}
                        onChange={(e) => update("max_age", e.target.value)}
                        className="w-16 px-2 py-1.5 bg-background border border-card-border rounded text-sm text-center"
                      />
                      <button onClick={() => setExpandedFilter(null)} className="text-accent text-xs font-medium ml-1">Done</button>
                    </div>
                  </>
                )}
              </div>
            );
          }

          if (def.type === "input") {
            return (
              <div key={def.key} className="relative flex-shrink-0">
                <button
                  onClick={() => setExpandedFilter(isExpanded ? null : def.key)}
                  className={`px-3 py-2 rounded-full text-sm font-medium min-h-[38px] whitespace-nowrap border transition-colors ${
                    isActive
                      ? "border-accent bg-accent/10 text-accent"
                      : "border-card-border text-muted hover:border-accent/50"
                  }`}
                >
                  {getFilterLabel(def)}
                </button>
                {isExpanded && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setExpandedFilter(null)} />
                    <div className="absolute top-full left-0 mt-2 bg-card border border-card-border rounded-lg shadow-xl p-3 z-20">
                      <input
                        autoFocus
                        value={filters[def.key] || ""}
                        onChange={(e) => update(def.key, e.target.value)}
                        placeholder={def.placeholder}
                        className="w-40 px-3 py-2 bg-background border border-card-border rounded text-sm"
                        onKeyDown={(e) => { if (e.key === "Enter") { setExpandedFilter(null); onSearch(); } }}
                      />
                    </div>
                  </>
                )}
              </div>
            );
          }

          // Select type — show options as pills in dropdown
          return (
            <div key={def.key} className="relative flex-shrink-0">
              <button
                onClick={() => setExpandedFilter(isExpanded ? null : def.key)}
                className={`px-3 py-2 rounded-full text-sm font-medium min-h-[38px] whitespace-nowrap border transition-colors ${
                  isActive
                    ? "border-accent bg-accent/10 text-accent"
                    : "border-card-border text-muted hover:border-accent/50"
                }`}
              >
                {getFilterLabel(def)}
                {isActive && (
                  <span
                    onClick={(e) => { e.stopPropagation(); update(def.key, ""); }}
                    className="ml-1.5 inline-flex"
                  >
                    <X size={12} />
                  </span>
                )}
              </button>
              {isExpanded && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setExpandedFilter(null)} />
                  <div className="absolute top-full left-0 mt-2 bg-card border border-card-border rounded-lg shadow-xl py-1 z-20 min-w-[140px]">
                    {def.options?.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { update(def.key, opt.value); setExpandedFilter(null); }}
                        className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                          filters[def.key] === opt.value
                            ? "text-accent bg-accent/5"
                            : "text-muted hover:bg-muted-bg hover:text-foreground"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          );
        })}

        {/* Clear all */}
        {activeCount > 0 && (
          <button
            onClick={clearAll}
            className="flex-shrink-0 px-3 py-2 rounded-full text-sm text-muted hover:text-foreground min-h-[38px] whitespace-nowrap"
          >
            Clear all
          </button>
        )}
      </div>
    </div>
  );
}
