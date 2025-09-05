"use client";

import { Inter } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

type ColumnLink = { label: string; href: string };
type Column = { title: string; links: ColumnLink[] };
type Subject = { id: string; label: string; columns?: Column[] };

const SUBJECTS: Subject[] = [
  {
    id: "ib-math",
    label: "IB Math",
    columns: [
      {
        title: "IB Math AA SL",
        links: [
          {
            label: "Question Bank",
            href: "/ib-math/analysis-and-approaches/question-bank/sl",
          },
        ],
      },
      {
        title: "IB Math AA HL",
        links: [
          {
            label: "Question Bank",
            href: "/ib-math/analysis-and-approaches/question-bank/hl",
          },
        ],
      },
    ],
  },
  { id: "ib-bio", label: "IB Biology" },
  { id: "ib-chem", label: "IB Chemistry" },
  { id: "ib-phys", label: "IB Physics" },
  { id: "ib-psych", label: "IB Psychology" },
  { id: "ib-econ", label: "IB Economics" },
];

export default function Header() {
  const [subjectsOpen, setSubjectsOpen] = useState(false); // desktop Subjects
  const [mobileOpen, setMobileOpen] = useState(false); // mobile panel
  const [activeSubject, setActiveSubject] = useState<string>("ib-math");

  const panelRef = useRef<HTMLDivElement | null>(null);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const pathname = usePathname();

  // Close both menus on route change
  useEffect(() => {
    setSubjectsOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  // Close desktop mega on Esc / click-away
  useEffect(() => {
    if (!subjectsOpen) return;
    const onKey = (e: KeyboardEvent) =>
      e.key === "Escape" && setSubjectsOpen(false);
    const onClickAway = (e: MouseEvent) => {
      const panel = panelRef.current;
      const btn = btnRef.current;
      if (!panel || !btn) return;
      const t = e.target as Node;
      if (!panel.contains(t) && !btn.contains(t)) setSubjectsOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClickAway);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClickAway);
    };
  }, [subjectsOpen]);

  const current = SUBJECTS.find((s) => s.id === activeSubject);

  return (
    <header
      className={[
        "sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur",
        inter.variable,
        "antialiased",
        "[font-feature-settings:'ss01','tnum','liga']",
      ].join(" ")}
      style={{ fontOpticalSizing: "auto" } as React.CSSProperties}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center">
        {/* Brand (closes mobile menu on tap) */}
        <Link
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-2 cursor-pointer"
          aria-label="Ask Zappy home"
        >
          <Image
            src="/ib-blocks-badge.svg"
            alt="Ask Zappy logo"
            width={40}
            height={40}
            priority
          />
          <span className="text-[17px] md:text-[18px] font-extrabold leading-none tracking-[-0.02em] text-slate-950">
            Ask Zappy
          </span>
        </Link>

        {/* Primary nav (desktop) */}
        <nav className="ml-6 hidden md:flex items-center gap-6">
          {/* Subjects mega menu trigger */}
          <div className="relative">
            <button
              ref={btnRef}
              type="button"
              onClick={() => setSubjectsOpen((s) => !s)}
              className="inline-flex items-center gap-1 text-[15px] font-semibold text-slate-800 tracking-tight hover:text-slate-900 transition cursor-pointer"
              aria-haspopup="dialog"
              aria-expanded={subjectsOpen}
              aria-controls="subjects-mega"
            >
              Subjects
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth={2} d="m6 9 6 6 6-6" />
              </svg>
            </button>

            {/* Mega panel */}
            {subjectsOpen && (
              <div className="fixed inset-x-0 top-16 z-50 px-3 sm:px-4 overscroll-contain">
                <div
                  ref={panelRef}
                  id="subjects-mega"
                  role="dialog"
                  aria-label="Subjects"
                  className="mx-auto w-full max-w-[min(1000px,calc(100vw-1.5rem))] rounded-2xl border border-slate-200 bg-white shadow-lg max-h-[min(80vh,640px)] overflow-auto"
                >
                  <div className="grid grid-cols-12">
                    {/* Left rail */}
                    <div className="col-span-5 md:col-span-4 rounded-l-2xl bg-slate-50/60 p-2">
                      {SUBJECTS.map((s) => {
                        const active = s.id === activeSubject;
                        return (
                          <button
                            key={s.id}
                            onMouseEnter={() => setActiveSubject(s.id)}
                            onFocus={() => setActiveSubject(s.id)}
                            onClick={() => setActiveSubject(s.id)}
                            className={[
                              "w-full text-left flex items-center justify-between px-3 py-2 rounded-lg transition cursor-pointer",
                              "text-[14.5px] leading-6",
                              active
                                ? "bg-white text-slate-900 shadow-sm font-semibold"
                                : "text-slate-700 hover:bg-white/70 font-medium",
                            ].join(" ")}
                          >
                            <span>{s.label}</span>
                            <svg
                              className="w-4 h-4 text-slate-400"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>

                    {/* Right: columns */}
                    <div className="col-span-7 md:col-span-8 p-4 lg:p-6">
                      {current?.columns ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6">
                          {current.columns.map((col) => (
                            <div key={col.title} className="min-w-0">
                              <div className="text-[13px] font-semibold uppercase tracking-wide text-slate-900/90">
                                {col.title}
                              </div>
                              <ul className="mt-2 space-y-1.5">
                                {col.links.map((link) => (
                                  <li key={link.href}>
                                    <Link
                                      href={link.href}
                                      className="inline-flex items-center text-[15px] font-medium text-slate-700 hover:text-slate-900 hover:font-semibold transition cursor-pointer"
                                      onClick={() => setSubjectsOpen(false)}
                                    >
                                      {link.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-sm text-slate-500 py-10 px-2">
                          Coming soon. Pick another subject on the left.
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Empty menus */}
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-slate-500 cursor-not-allowed select-none"
          >
            Educators
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeWidth={2} d="m6 9 6 6 6-6" />
            </svg>
          </button>
          <button
            type="button"
            disabled
            aria-disabled="true"
            title="Coming soon"
            className="inline-flex items-center gap-1 text-[15px] font-semibold text-slate-500 cursor-not-allowed select-none"
          >
            Students
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path strokeWidth={2} d="m6 9 6 6 6-6" />
            </svg>
          </button>
        </nav>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-3">
          <button
            className="p-2 rounded-lg hover:bg-slate-100"
            aria-label="Account"
          >
            <svg
              className="w-5 h-5 text-slate-800"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeWidth={2}
                d="M16 19a4 4 0 0 0-8 0M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
              />
            </svg>
          </button>
          <Link
            href="/premium"
            className="inline-flex items-center rounded-full bg-violet-600 px-4 py-2 text-white text-sm font-semibold hover:bg-violet-700 transition"
            onClick={() => setMobileOpen(false)}
          >
            Try Premium
          </Link>
          <MobileSubjects open={mobileOpen} setOpen={setMobileOpen} />
        </div>
      </div>
    </header>
  );
}

/* ---------- Mobile Subjects ---------- */
function MobileSubjects({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
}) {
  return (
    <>
      <button
        className="md:hidden p-2 rounded-lg hover:bg-slate-100"
        aria-label="Menu"
        aria-expanded={open}
        aria-controls="mobile-subjects"
        onClick={() => setOpen(!open)}
      >
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <div
        id="mobile-subjects"
        className={[
          "md:hidden fixed inset-x-0 top-16 z-50 border-t border-slate-200 bg-white shadow-lg transition-[max-height] duration-300 overflow-hidden",
          open ? "max-h-[70vh]" : "max-h-0",
        ].join(" ")}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          <details open className="group">
            <summary className="cursor-pointer list-none py-2 flex items-center justify-between text-[15px] font-semibold text-slate-900 tracking-tight">
              <span>IB Math</span>
              <svg
                className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeWidth={2} d="m6 9 6 6 6-6" />
              </svg>
            </summary>

            <div className="pl-2 pt-1 pb-3 space-y-4">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  IB Math AA SL
                </div>
                <Link
                  href="/ib-math/analysis-and-approaches/question-bank/sl"
                  className="mt-1 block text-[15px] font-medium text-slate-700 hover:text-slate-900 hover:font-semibold transition cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Question Bank
                </Link>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  IB Math AA HL
                </div>
                <Link
                  href="/ib-math/analysis-and-approaches/question-bank/hl"
                  className="mt-1 block text-[15px] font-medium text-slate-700 hover:text-slate-900 hover:font-semibold transition cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  Question Bank
                </Link>
              </div>
            </div>
          </details>

          {[
            "IB Biology",
            "IB Chemistry",
            "IB Physics",
            "IB Psychology",
            "IB Economics",
          ].map((label) => (
            <details key={label} className="group">
              <summary className="cursor-pointer list-none py-2 flex items-center justify-between text-[15px] font-medium text-slate-700">
                <span>{label}</span>
                <svg
                  className="w-4 h-4 text-slate-500 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeWidth={2} d="m6 9 6 6 6-6" />
                </svg>
              </summary>
              <div className="pl-2 pb-3 text-sm text-slate-500">
                Coming soon
              </div>
            </details>
          ))}
        </div>
      </div>
    </>
  );
}
