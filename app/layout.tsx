import "katex/dist/katex.min.css";
import Script from "next/script";
import Footer from "../components/footer";
import Header from "../components/header";
import AnalyticsTracker from "./AnalyticsTracker";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="no-js h-full overflow-x-clip">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
      </head>
      <body className="font-sans antialiased bg-slate-50 text-slate-800 min-h-dvh overflow-x-clip">
        <Header />
        {children}
        <Footer />
        <AnalyticsTracker />
      </body>
    </html>
  );
}
