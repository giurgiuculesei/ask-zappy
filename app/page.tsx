export default function Page() {
  return (
    <>
      <main>
        <section className="relative overflow-hidden bg-sky-50 border-b border-sky-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-10 md:pb-14">
            <h1 className="mt-4 text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900">
              A zappier way to ace IB Math
            </h1>
            <p className="mt-4 text-lg text-slate-600">
              Crystal-clear notes, exam-style questions, and step-by-step
              solutions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 ">
              <a
                href="#courses"
                className="inline-flex items-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
              >
                Start learning
              </a>
              <a
                href="#topics"
                className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold hover:bg-slate-50"
              >
                Browse topics
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-6 text-sm">
              <span className="inline-flex items-center gap-2 ">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
                Exam-style practice
              </span>

              <span className="inline-flex items-center gap-2 ">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M12 8v8m-4-4h8" />
                </svg>
                Step-by-step hints
              </span>

              <span className="inline-flex items-center gap-2 ">
                <svg
                  viewBox="0 0 24 24"
                  className="w-5 h-5 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M3 12h18" />
                </svg>
                Clean solutions
              </span>
            </div>
          </div>
        </section>

        <section className="relative border-y border-indigo-100 bg-indigo-50/40">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 md:pt-20 pb-10 md:pb-14">
            <div className="grid md:grid-cols-2 gap-4 md:gap-6">
              <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-card">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      IB Mathematics
                    </div>
                    <h3 className="mt-0.5 text-xl font-bold text-slate-900">
                      Analysis &amp; Approaches
                    </h3>
                  </div>
                  <span className="inline-grid w-10 h-10 place-items-center rounded-xl bg-indigo-100 text-[#434cc0] font-bold">
                    ∫
                  </span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-[15px]">
                  <a
                    href="#"
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 hover:bg-slate-50"
                  >
                    <span>SL</span>
                    <span>›</span>
                  </a>
                  <a
                    href="#"
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 hover:bg-slate-50"
                  >
                    <span>HL</span>
                    <span>›</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="topics" className="border-y border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
            <div className="flex items-end justify-between gap-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Explore topics
                </h2>
                <p className="mt-2 text-slate-600">
                  Mapped to the latest IB syllabus for AA.
                </p>
              </div>
              <a
                href="#"
                className="hidden md:inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800"
              >
                View all
                <svg
                  viewBox="0 0 24 24"
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  aria-hidden="true"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </div>

            <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Topic 1 */}
              <a
                href="#"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow hover:border-indigo-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Topic 1
                    </div>
                    <div className="mt-0.5 text-lg font-semibold">
                      Number &amp; Algebra
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1">
                    48 Qs
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Sequences
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Exponents
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Logs
                  </span>
                </div>
              </a>

              {/* Topic 2 */}
              <a
                href="#"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow hover:border-indigo-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Topic 2
                    </div>
                    <div className="mt-0.5 text-lg font-semibold">
                      Functions
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1">
                    62 Qs
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Transformations
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Inverse
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Composite
                  </span>
                </div>
              </a>

              {/* Topic 3 */}
              <a
                href="#"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow hover:border-indigo-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Topic 3
                    </div>
                    <div className="mt-0.5 text-lg font-semibold">
                      Geometry &amp; Trigonometry
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1">
                    54 Qs
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Trig Identities
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Vectors
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Triangles
                  </span>
                </div>
              </a>

              {/* Topic 4 */}
              <a
                href="#"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow hover:border-indigo-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Topic 4
                    </div>
                    <div className="mt-0.5 text-lg font-semibold">
                      Statistics &amp; Probability
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1">
                    39 Qs
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Distributions
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Combinatorics
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Regression
                  </span>
                </div>
              </a>

              {/* Topic 5 */}
              <a
                href="#"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow hover:border-indigo-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Topic 5
                    </div>
                    <div className="mt-0.5 text-lg font-semibold">Calculus</div>
                  </div>
                  <span className="rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1">
                    41 Qs
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Limits
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Differentiation
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Integration
                  </span>
                </div>
              </a>

              {/* Topic 6 */}
              <a
                href="#"
                className="group rounded-2xl border border-slate-200 bg-white p-5 shadow hover:border-indigo-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-semibold text-slate-500">
                      Topic 6
                    </div>
                    <div className="mt-0.5 text-lg font-semibold">
                      Exploration (IA)
                    </div>
                  </div>
                  <span className="rounded-full bg-indigo-100 text-indigo-700 text-xs font-semibold px-3 py-1">
                    Guides
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-2 text-xs text-slate-600">
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Choosing a topic
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Structure
                  </span>
                  <span className="rounded-full bg-slate-50 border border-slate-200 px-2.5 py-1">
                    Assessment
                  </span>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section
          id="practice"
          className="relative border-y border-violet-100 bg-violet-50/40"
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-20">
            <div className="grid md:grid-cols-5 gap-10 items-start">
              {/* Left copy */}
              <div className="md:col-span-2">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                  Practice that teaches
                </h2>
                <p className="mt-3 text-slate-600 max-w-prose">
                  Solve exam-style questions with instant hints and clean
                  solutions. Generate new sets for any subtopic and track what
                  to review next.
                </p>

                <ul className="mt-6 grid gap-3 text-sm text-slate-700">
                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 inline-flex shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Paper 1 &amp; Paper 2 modes
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 inline-flex shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Hints and full solutions
                  </li>

                  <li className="flex items-center gap-3">
                    <span className="w-5 h-5 inline-flex shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-3.5 h-3.5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        aria-hidden="true"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </span>
                    Mild / Medium / Spicy levels
                  </li>
                </ul>
              </div>

              {/* Right: Question box mock */}
              <div className="relative md:col-span-3">
                <section aria-label="Question card demo">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                    {/* Left panel */}
                    <article className="lg:col-span-9 rounded-2xl border border-slate-200 bg-white shadow flex flex-col">
                      <div className="relative flex items-center justify-between px-6 py-4 border-b border-slate-200">
                        {/* Left: calc allowed? */}
                        <div className="flex items-center gap-2">
                          <span className="hidden sm:inline text-[11px] font-semibold rounded-full px-2 py-1 border text-sky-700 bg-slate-50 border-sky-200">
                            NO CALCULATOR
                          </span>
                          <span
                            className="sm:hidden flex items-center justify-center"
                            aria-label="No calculator"
                          >
                            <svg
                              viewBox="0 0 24 24"
                              className="w-6 h-6"
                              fill="#f8fafc"
                              stroke="#94a3b8"
                              strokeWidth={2}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="4"
                                y="2"
                                width="16"
                                height="20"
                                rx="2"
                                ry="2"
                              />
                              <rect
                                x="7"
                                y="4"
                                width="10"
                                height="4"
                                rx="1"
                                stroke="none"
                                fill="#cbd5e1"
                              />
                              <circle cx="8" cy="11" r="1" fill="none" />
                              <circle cx="12" cy="11" r="1" fill="none" />
                              <circle cx="16" cy="11" r="1" fill="none" />
                              <circle cx="8" cy="15" r="1" fill="none" />
                              <circle cx="12" cy="15" r="1" fill="none" />
                              <circle cx="16" cy="15" r="1" fill="none" />
                              <circle cx="8" cy="19" r="1" fill="none" />
                              <circle cx="12" cy="19" r="1" fill="none" />
                              <circle cx="16" cy="19" r="1" fill="none" />
                              <line
                                x1="5"
                                y1="3"
                                x2="19"
                                y2="21"
                                stroke="#64748b"
                                strokeWidth="2.25"
                              />
                            </svg>
                          </span>
                        </div>

                        {/* Middle: difficulty */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                          <span className="text-sm text-orange-500 font-medium">
                            Medium
                          </span>
                          <span
                            className="inline-flex items-center gap-1"
                            aria-hidden="true"
                          >
                            <span className="w-[6px] h-[6px] rounded-full inline-block bg-orange-400" />
                            <span className="w-[6px] h-[6px] rounded-full inline-block bg-orange-400" />
                            <span className="w-[6px] h-[6px] rounded-full inline-block bg-slate-300" />
                          </span>
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-2 text-slate-400">
                          <button
                            className="group relative p-1.5 rounded-md hover:bg-slate-100"
                            aria-label="Bookmark"
                          >
                            <svg viewBox="0 0 24 24" className="w-5 h-5">
                              <path
                                fill="currentColor"
                                d="M6 2h12a1 1 0 0 1 1 1v19l-7-3-7 3V3a1 1 0 0 1 1-1z"
                              />
                            </svg>
                            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition">
                              Bookmark
                            </span>
                          </button>
                          <button
                            className="group relative p-1.5 rounded-md hover:bg-slate-100"
                            aria-label="Mark as complete"
                          >
                            <svg viewBox="0 0 24 24" className="w-5 h-5">
                              <path
                                fill="currentColor"
                                d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z"
                              />
                            </svg>
                            <span className="absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition">
                              Mark as Complete
                            </span>
                          </button>
                        </div>
                      </div>

                      <div className="px-6 py-6 flex-1 text-base leading-8 text-slate-800">
                        <p className="mt-0">
                          1) If a sequence has a<sub>1</sub> = 5 and common
                          difference d = 3, find a<sub>20</sub>.
                        </p>
                        <p>
                          2) Solve for x: 2·3<sup>x</sup> = 54.
                        </p>
                        <p>3) Find the inverse of f(x) = (2x − 3)/(x + 4).</p>
                      </div>
                    </article>

                    {/* Right tools */}
                    <aside className="lg:col-span-3 h-full">
                      <div className="h-full rounded-2xl border border-slate-200 bg-white shadow p-3 flex flex-col gap-2">
                        <button
                          id="open-mark-scheme"
                          className="w-full rounded-xl px-3 py-2 text-sm font-medium text-sky-700 bg-[#d8edff] border border-[#bfe1ff] hover:bg-[#bfe1ff] focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-300 text-center"
                        >
                          Mark Scheme
                        </button>
                        <button
                          id="open-video-solution"
                          className="w-full rounded-xl px-3 py-2 text-sm font-medium text-slate-800 bg-white border border-slate-200 hover:bg-slate-50 text-center"
                        >
                          Video Solutions
                        </button>
                      </div>
                    </aside>
                  </div>

                  {/* Modal (Mark Scheme) */}
                  <div
                    id="markSchemeModal"
                    className="hidden fixed inset-0 z-50 flex items-center justify-center"
                    aria-modal="true"
                    role="dialog"
                    aria-labelledby="ms-title-1"
                  >
                    <button
                      id="ms-backdrop"
                      type="button"
                      aria-label="Close"
                      className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
                    />
                    <div
                      className="relative z-10 w-full sm:max-w-3xl bg-white shadow-xl border border-slate-200 rounded-2xl sm:mx-4 overflow-hidden"
                      style={{ maxHeight: "90vh" }}
                    >
                      <div className="sm:hidden flex justify-center pt-2">
                        <span className="h-1.5 w-10 rounded-full bg-slate-200" />
                      </div>
                      <div className="sticky top-0 z-10 bg-white/95 backdrop-blur px-4 py-3 border-b border-slate-200 flex items-center justify-between">
                        <h3
                          id="ms-title-1"
                          className="text-sm font-semibold text-slate-800"
                        >
                          Mark Scheme
                        </h3>
                        <button
                          id="close-ms"
                          className="p-2 -mr-1 rounded-md hover:bg-slate-100 active:bg-slate-200"
                          aria-label="Close mark scheme"
                        >
                          <svg viewBox="0 0 24 24" className="w-6 h-6">
                            <path
                              fill="currentColor"
                              d="M18.3 5.7a1 1 0 0 0-1.4 0L12 10.6 7.1 5.7a1 1 0 1 0-1.4 1.4L10.6 12l-4.9 4.9a1 1 0 1 0 1.4 1.4l4.9-4.9 4.9 4.9a1 1 0 0 0 1.4-1.4L13.4 12l4.9-4.9a1 1 0 0 0 0-1.4z"
                            />
                          </svg>
                        </button>
                      </div>
                      <div className="flex-1 overflow-y-auto px-4 py-4 text-[0.95rem] leading-7">
                        <p>
                          <strong>1)</strong> a<sub>n</sub> = a<sub>1</sub> +
                          (n−1)d ⇒ a<sub>20</sub> = 5 + 19·3 = 62.
                        </p>
                        <p>
                          <strong>2)</strong> 2·3<sup>x</sup> = 54 ⇒ 3
                          <sup>x</sup> = 27 ⇒ x = 3.
                        </p>
                        <p>
                          <strong>3)</strong> y = (2x − 3)/(x + 4) ⇒ x = (3 +
                          4y)/(2 − y) ⇒ f<sup>−1</sup>(x) = (3 + 4x)/(2 − x).
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 md:py-16">
          <div className="rounded-3xl border border-sky-200 bg-sky-100 p-8 md:p-10 shadow">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-xl md:text-2xl font-extrabold text-sky-900">
                  Ready to study smarter?
                </h3>
                <p className="mt-2 text-slate-700">
                  Everything here is free while we’re in beta. No exam packs or
                  paywalls.
                </p>
              </div>
              <div className="flex md:justify-end gap-3">
                <a
                  href="#topics"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold hover:bg-slate-50"
                >
                  Explore topics
                </a>
                <a
                  href="#courses"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white hover:bg-slate-800"
                >
                  Start free
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
