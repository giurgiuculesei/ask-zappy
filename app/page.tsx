// app/ib-math/page.tsx
import type { Metadata, Viewport } from "next";
import HomeClient from "./HomeClient";

export const revalidate = 86400; // Revalidate every 24h (ISR)
export const dynamic = "force-static"; // Opt into static rendering

export const metadata: Metadata = {
  metadataBase: new URL("https://ask-zappy.com"),
  title: "IB Math - Ask Zappy",
  description:
    "Structured IB Math help: clear notes, targeted practice, and friendly support. Explore topics, lessons, and tips designed for faster progress.",
  keywords: [
    "IB Math",
    "IB Mathematics",
    "Analysis and Approaches",
    "Applications and Interpretation",
    "AA",
    "AI",
    "HL",
    "SL",
    "Question Bank",
    "Mark scheme",
    "IB exam practice",
  ],
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  category: "education",
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function Page() {
  return <HomeClient />;
}
