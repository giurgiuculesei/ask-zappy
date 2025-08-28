export function QuestionCard({ q }: { q: Question }) {
    return (
        <section id={`q - ${q.id}`} className="mb-6" key={q.id}>
            <h2 className="text-base font-semibold text-slate-700 mb-3">Question {q.id} </h2>

            {/* Grid container ensures equal height */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">

                {/* Left panel */}
                <article className="lg:col-span-9 rounded-2xl border border-slate-200 bg-white shadow-card flex flex-col">
                    <div className="relative flex items-center justify-between px-4 py-3 border-b border-slate-200">
                        {/* Left: NO CALCULATOR */}
                        <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold rounded-full px-2 py-1 border
                                     text-[#1166c3] bg-[#f1f5f9]  border-[#bfe1ff]">
                                {q.calculatorAllowed ? 'CALCULATOR' : 'NO CALCULATOR'}
                            </span>
                        </div>

                        {/* Middle: Difficulty */}
                        <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2">
                            {q.difficulty === 'mild' && (<>
                                <span className="text-sm text-emerald-500 font-medium">Mild</span>
                                <span className="inline-flex items-center gap-1">

                                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-emerald-500"></span>
                                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-slate-300"></span>
                                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-slate-300"></span>
                                </span>
                            </>
                            )}
                            {q.difficulty === 'medium' && (<>
                                <span className="text-sm text-orange-400 font-medium">Medium</span>
                                <span className="inline-flex items-center gap-1">

                                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-orange-400"></span>
                                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-orange-400"></span>
                                    <span className="w-[6px] h-[6px] rounded-full inline-block bg-slate-300"></span>
                                </span>
                            </>
                            )}
                            {q.difficulty === 'spicy' && (<>
                                <span className="text-sm text-red-500 font-medium">Spicy</span>
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
                            <button className="group relative p-1.5 rounded-md hover:bg-slate-100 cursor-pointer" aria-label="Bookmark">
                                <svg viewBox="0 0 24 24" className="size-5" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M6 2h12a1 1 0 0 1 1 1v19l-7-3-7 3V3a1 1 0 0 1 1-1z" />
                                </svg>
                                <span className="tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition">
                                    Bookmark
                                </span>
                            </button>

                            {/* Mark as done */}
                            <button className="group relative p-1.5 rounded-md hover:bg-slate-100 cursor-pointer" aria-label="Mark as done">
                                <svg viewBox="0 0 24 24" className="size-5" xmlns="http://www.w3.org/2000/svg">
                                    <path fill="currentColor" d="M9 16.2 4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4z" />
                                </svg>
                                <span className="tooltip absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap px-2 py-1 text-xs rounded-md bg-slate-800 text-white opacity-0 group-hover:opacity-100 transition">
                                    Mark as Complete
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="px-5 py-5 flex-1">
                        <p className="text-sm text-slate-500 mb-2">[Maximum mark: {q.maximumMark}]</p>
                        {/* <p className="leading-relaxed">
                                    Expand <span className="font-mono">(2x + 1)<sup>4</sup></span> in descending powers of
                                    <em>x</em>
                                    and simplify your answer.
                                </p>   */}
                        <div
                            className="leading-relaxed max-w-none line-clamp-2 prose"
                            dangerouslySetInnerHTML={{ __html: q.questionHtml ?? '' }}
                        />
                    </div>

                </article>

                {/* Right panel */}
                < aside className="lg:col-span-3 h-full" >
                    <div className="h-full rounded-2xl border border-slate-200 bg-white shadow-card p-3 flex flex-col gap-2">

                        {/* Mark Scheme (light blue) */}
                        <button
                            id="open-mark-scheme"
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
            </div >
        </section >
    );
}