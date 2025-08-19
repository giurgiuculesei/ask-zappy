import type { Metadata } from 'next'
import "./globals.css";
import { Inter } from "next/font/google";
import Header from './components/header';
import Footer from './components/footer';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});


export const metadata: Metadata = {
  title: 'IB Mathematics AA SL — Questionbank',
  description: 'IB Mathematics: Analysis & Approaches (SL) questionbank by topic.'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  )
}