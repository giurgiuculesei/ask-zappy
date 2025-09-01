"use client";

import "katex/dist/katex.min.css";
import { useEffect, useRef, useState } from "react";

export function QuestionCard({ q }: { q: Question }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Close on Esc, lock scroll
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open]);

  // Click outside to close
  const onBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target as Node)) {
      setOpen(false);
    }
  };

  return (
    <section className="mb-6" key={q.id}>
      <h2 className="text-base font-semibold text-slate-700 mb-3">
        Question {q.id}{" "}
      </h2>

      {/* Grid container ensures equal height */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
        {/* Left panel */}
        <article className="lg:col-span-9 rounded-2xl border border-slate-200 bg-white shadow-card flex flex-col">
          <div className="relative flex items-center justify-between px-4 py-3 border-b border-slate-200">
            {/* Left: Calculator allowed / not allowed */}
            <div className="flex items-center gap-2">
              {/* Text pill – hidden on small screens, visible from sm: and up */}
              <span
                className="hidden sm:inline text-[11px] font-semibold rounded-full px-2 py-1 border
                                            text-[#1166c3] bg-[#f1f5f9] border-[#bfe1ff]"
              >
                {q.paper === "paper2" ? "CALCULATOR" : "NO CALCULATOR"}
              </span>

              {/* Icon – mobile only */}
              <span className="sm:hidden flex items-center justify-center">
                {q.paper === "paper2" && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="size-6"
                    viewBox="0 0 24 24"
                    fill="#f1f5f9"
                    stroke="#87c4f9"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    {/* Display screen */}
                    <rect
                      x="7"
                      y="4"
                      width="10"
                      height="4"
                      fill="#87c4f9"
                      stroke="none"
                      rx="1"
                    />
                    {/* Buttons */}
                    <circle cx="8" cy="11" r="1" />
                    <circle cx="12" cy="11" r="1" />
                    <circle cx="16" cy="11" r="1" />
                    <circle cx="8" cy="15" r="1" />
                    <circle cx="12" cy="15" r="1" />
                    <circle cx="16" cy="15" r="1" />
                    <circle cx="8" cy="19" r="1" />
                    <circle cx="12" cy="19" r="1" />
                    <circle cx="16" cy="19" r="1" />
                  </svg>
                )}

                {q.paper !== "paper2" && (
                  <svg
                    viewBox="0 0 24 24"
                    className="size-6"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    fill="#f8fafc" /* slate-50-ish body */
                    stroke="#94a3b8" /* slate-400 outlines */
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    {/* Body */}
                    <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
                    {/* Display */}
                    <rect
                      x="7"
                      y="4"
                      width="10"
                      height="4"
                      rx="1"
                      stroke="none"
                      fill="#cbd5e1"
                    />{" "}
                    {/* slate-300 */}
                    {/* Buttons (outlined) */}
                    <circle cx="8" cy="11" r="1" fill="none" />
                    <circle cx="12" cy="11" r="1" fill="none" />
                    <circle cx="16" cy="11" r="1" fill="none" />
                    <circle cx="8" cy="15" r="1" fill="none" />
                    <circle cx="12" cy="15" r="1" fill="none" />
                    <circle cx="16" cy="15" r="1" fill="none" />
                    <circle cx="8" cy="19" r="1" fill="none" />
                    <circle cx="12" cy="19" r="1" fill="none" />
                    <circle cx="16" cy="19" r="1" fill="none" />
                    {/* Slash */}
                    <line
                      x1="5"
                      y1="3"
                      x2="19"
                      y2="21"
                      stroke="#64748b"
                      strokeWidth="2.25"
                    />{" "}
                    {/* slate-500 */}
                  </svg>
                )}
              </span>
            </div>

            {/* Middle: Difficulty */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
              {q.difficulty === "mild" && (
                <>
                  <span className="text-sm text-emerald-500 font-medium">
                    Mild
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-emerald-500"></span>
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-slate-300"></span>
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-slate-300"></span>
                  </span>
                </>
              )}
              {q.difficulty === "medium" && (
                <>
                  <span className="text-sm text-orange-400 font-medium">
                    Medium
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-orange-400"></span>
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-orange-400"></span>
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-slate-300"></span>
                  </span>
                </>
              )}
              {q.difficulty === "spicy" && (
                <>
                  <span className="text-sm text-red-500 font-medium">
                    Spicy
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-red-500"></span>
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-red-500"></span>
                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-red-500"></span>
                  </span>
                </>
              )}
            </div>

            {/* Right: Action icons */}
            <div className="flex items-center gap-2 text-slate-400">
              {/* Bookmark */}
              <button
                className="group relative p-1.5 rounded-md hover:bg-slate-100 cursor-pointer"
                aria-label="Bookmark"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M6 2h12a1 1 0 0 1 1 1v19l-7-3-7 3V3a1 1 0 0 1 1-1z"
                  />
                </svg>
                <span className="tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition">
                  Bookmark
                </span>
              </button>

              {/* Mark as done */}
              <button
                className="group relative p-1.5 rounded-md hover:bg-slate-100 cursor-pointer"
                aria-label="Mark as done"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
                  />
                </svg>
                <span className="tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition">
                  Mark as Complete
                </span>
              </button>
            </div>
          </div>

          <div className="px-5 py-5 flex-1">
            <div
              className="
                question-content
                prose prose-slate max-w-none
                text-[0.8rem] sm:text-[0.95rem] lg:text-[1.05rem]
                leading-[1.6] sm:leading-[1.65] lg:leading-[1.7]

                prose-p:mt-0
                prose-p:mb-3 lg:prose-p:mb-4
                prose-p:last:mb-0
                
                prose-table:w-full
                prose-table:border-separate    
                prose-table:mt-0
                prose-table:mb-0
                
                prose-th:p-0              
                prose-td:text-[0.8rem] prose-td:sm:text-[0.95rem] prose-td:lg:text-[1.05rem]                          
                prose-td:leading-[1.6] prose-td:sm:leading-[1.65] prose-td:lg:leading-[1.7]          
            "
              dangerouslySetInnerHTML={{ __html: q.questionHtml ?? "" }}
            />
          </div>
        </article>

        {/* Right panel */}
        <aside className="lg:col-span-3 h-full">
          <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-card p-3 flex flex-col gap-2">
            {/* Mark Scheme (light blue) */}
            <button
              onClick={() => setOpen(true)}
              className="w-full block rounded-xl px-3 py-2 text-sm font-medium
                                     text-[#1166c3] bg-[#d8edff]  border-[#bfe1ff] hover:bg-[#bfe1ff] 
cursor-pointer
               border  focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/60  text-center lg:flex lg:items-center lg:justify-between lg:text-left"
            >
              <span className="w-full">Mark Scheme</span>
            </button>

            {/* Video Solutions (white) */}
            <button
              id="open-video-solution"
              className="w-full block rounded-xl px-3 py-2 text-sm font-medium
                text-slate-800 bg-white border border-slate-200 cursor-pointer
                hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300/60
                text-center lg:flex lg:items-center lg:justify-between lg:text-left"
            >
              <span className="w-full">Video Solutions</span>
            </button>
          </div>
        </aside>
      </div>

      {/* ---- Modal (Mark Scheme) ---- */}
      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal="true"
          role="dialog"
          aria-labelledby={`ms-title-${q.id}`}
        >
          {/* Backdrop (click to close) */}
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Dialog */}
          <div
            ref={dialogRef}
            // Mobile: bottom sheet with rounded top; Desktop: centered card
            className="
            flex flex-col
        relative z-10 w-full sm:max-w-3xl
        bg-white shadow-xl border border-slate-200
        sm:rounded-2xl sm:rounded-t-2xl
        rounded-2xl 
        sm:mx-4
        overflow-hidden
      "
            style={{
              height: "90svh",
              maxHeight: "90vh",
              //marginBottom: "calc(env(safe-area-inset-bottom) + 16px)", // lift off bottom safely
            }}
          >
            {/* Drag handle (mobile only) */}
            <div className="sm:hidden flex justify-center pt-2">
              <span className="h-1.5 w-10 rounded-full bg-slate-200" />
            </div>

            {/* Header (sticky) */}
            <div
              className="
          sticky top-0 z-10
          bg-white/95 backdrop-blur
          px-4 py-3 border-b border-slate-200
          flex items-center justify-between
        "
            >
              <h3
                id={`ms-title-${q.id}`}
                className="text-sm font-semibold text-slate-800"
              >
                Mark Scheme
              </h3>

              <button
                onClick={() => setOpen(false)}
                className="p-2 -mr-1 rounded-md hover:bg-slate-100 active:bg-slate-200"
                aria-label="Close mark scheme"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="size-6"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill="currentColor"
                    d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z"
                  />
                </svg>
              </button>
            </div>

            {/* Scroll area */}
            <div
              className="flex-1 overflow-y-auto px-4 py-4"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {/* Mark scheme block */}
              <div>
                <div
                  className="
                    question-content
                    prose prose-slate max-w-none
                    text-[0.8rem] sm:text-[0.95rem] lg:text-[1.05rem]
                    leading-[1.6] sm:leading-[1.65] lg:leading-[1.7]

                    prose-p:mt-0
                    prose-p:mb-3 lg:prose-p:mb-4
                    prose-p:last:mb-0
                    
                    prose-table:w-full
                    prose-table:border-separate    
                    prose-table:mt-0
                    prose-table:mb-0
                    
                    prose-th:p-0              
                    prose-td:text-[0.8rem] prose-td:sm:text-[0.95rem] prose-td:lg:text-[1.05rem]                          
                    prose-td:leading-[1.6] prose-td:sm:leading-[1.65] prose-td:lg:leading-[1.7]          
                "
                  dangerouslySetInnerHTML={{ __html: q.markSchemeHtml ?? "" }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
