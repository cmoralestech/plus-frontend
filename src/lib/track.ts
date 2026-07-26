import api from "./api";

type FunnelEvent =
  | "signup"
  | "profile_created"
  | "paywall_hit"
  | "pricing_viewed"
  | "subscription_tab_viewed"
  | "checkout_started"
  | "checkout_completed"
  | "checkout_cancelled"
  | "search_location"
  | "cancellation_saved"
  | "subscription_cancelled"
  | "allowance_calculator_viewed"
  | "acquisition_source";

export function trackFunnel(event: FunnelEvent, metadata?: Record<string, unknown>) {
  api.post("/api/analytics/event", { event, metadata }).catch(() => {});
}
