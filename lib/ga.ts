// log page views
export const pageview = (url: string) => {
  if (typeof window !== "undefined" && (window as any).gtag) {
    (window as any).gtag("config", process.env.NEXT_PUBLIC_GA_TRACKING_ID, {
      page_path: url,
    });
  }
};

// Define allowed event params
type GAParam = string | number | boolean | undefined;

interface GAEvent {
  action: string; // event name
  params?: Record<string, GAParam>; // custom params
}

export const event = ({ action, params = {} }: GAEvent) => {
  if (typeof window !== "undefined" && "gtag" in window) {
    window.gtag("event", action, params);
  }
};
