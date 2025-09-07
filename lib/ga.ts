export {};

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void; // no `any`
    dataLayer?: unknown[];
  }
}

// lib/ga.ts
type GAParam = string | number | boolean | undefined | null;
type GAParams = Record<string, GAParam>;

interface GAEvent {
  action: string; // event name in GA4
  params?: GAParams; // custom params (primitives only)
}

const GA_ID = process.env.NEXT_PUBLIC_GA_TRACKING_ID ?? "";

// userland type guard for gtag presence
const hasGtag = (
  w: Window
): w is Window & { gtag: (...args: unknown[]) => void } =>
  typeof (w as Partial<Window>).gtag === "function";

// log page views
export const pageview = (url: string) => {
  if (typeof window === "undefined" || !GA_ID) return;
  if (!hasGtag(window)) return;

  window.gtag("config", GA_ID, { page_path: url });
};

// log custom events (GA4-style)
export const event = ({ action, params = {} }: GAEvent) => {
  if (typeof window === "undefined") return;
  if (!hasGtag(window)) return;

  window.gtag("event", action, params);
};
