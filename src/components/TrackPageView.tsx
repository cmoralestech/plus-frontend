"use client";

import { useEffect } from "react";
import { trackFunnel } from "@/lib/track";

export default function TrackPageView({ event, metadata }: { event: Parameters<typeof trackFunnel>[0]; metadata?: Record<string, unknown> }) {
  useEffect(() => {
    trackFunnel(event, metadata);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return null;
}
