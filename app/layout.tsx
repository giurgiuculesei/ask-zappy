import "katex/dist/katex.min.css";
import Footer from '../components/footer';
import Header from '../components/header';
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="no-js h-full overflow-x-clip">
      <body className="font-sans antialiased bg-slate-50 text-slate-800 min-h-dvh overflow-x-clip">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}