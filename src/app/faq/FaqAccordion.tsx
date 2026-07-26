"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqSection {
  title: string;
  items: FaqItem[];
}

export default function FaqAccordion({ sections }: { sections: FaqSection[] }) {
  const [openKey, setOpenKey] = useState<string | null>(null);

  const toggle = (key: string) => {
    setOpenKey((prev) => (prev === key ? null : key));
  };

  return (
    <div className="px-5 md:px-10 lg:px-16 pb-14 md:pb-28">
      <div className="max-w-4xl space-y-12 md:space-y-20">
        {sections.map((section) => (
          <div key={section.title}>
            <p className="text-accent text-xs tracking-[0.4em] uppercase mb-8">
              {section.title}
            </p>
            <div className="divide-y divide-card-border border-y border-card-border">
              {section.items.map((item) => {
                const key = `${section.title}-${item.question}`;
                const isOpen = openKey === key;

                return (
                  <div key={key}>
                    <button
                      onClick={() => toggle(key)}
                      className="w-full flex items-start justify-between gap-4 py-5 md:py-6 text-left group"
                      aria-expanded={isOpen}
                    >
                      <span className="text-sm md:text-base font-medium leading-snug group-hover:text-accent transition-colors">
                        {item.question}
                      </span>
                      <ChevronDown
                        size={18}
                        className={`flex-shrink-0 mt-0.5 text-muted transition-transform duration-200 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-200 ${
                        isOpen ? "max-h-[500px] pb-6" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-muted leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
