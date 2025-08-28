import { getQuestionsPage } from "@/lib/ib-math/questions";
import { getTopicDataByLink } from "@/lib/ib-math/topics";
import { notFound } from "next/navigation";
import QuestionsSSR from "./QuestionsSSR";
import QuestionsVirtuoso from "./QuestionsVirtuoso";

export default async function QuestionsPage({ params }: { params: Promise<{ level: Level, topicLink: string, subTopicLink: string }> }) {
    const { level, topicLink, subTopicLink } = await params;

    // Fetch the topics based on the level
    const topicData = await getTopicDataByLink(topicLink, subTopicLink, level);

    if (!topicData) {
        notFound();
    }

    // Server-fetch first page (SEO-visible)
    const { items, nextCursor } = await getQuestionsPage({
        /*  topic: (searchParams.topic as string[]) || [],
         level: (searchParams.level as string) || undefined,
         difficulty: (searchParams.difficulty as string) || undefined,
         q: (searchParams.q as string) || undefined, */
        after: null,
        limit: 20,
    });

    //const endpoint = `/api/questions?level=${encodeURIComponent(params.level)}&topicLink=${encodeURIComponent(params.topicLink)}&subTopicLink=${encodeURIComponent(params.subTopicLink)}`;
    const endpoint = `/api/ib-math/question-bank/questions`;

    return (
        <>
            <header className="bg-[#e0ecfa]">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                    <h1 className="text-[clamp(2.0rem,3vw+1rem,2.5rem)] font-bold tracking-tight">
                        Analysis and Approaches {level.toUpperCase()} — Questionbank
                    </h1>
                    <p className="mt-4 text-lg md:text-xl text-slate-700 leading-relaxed max-w-3xl">
                        {topicData.subTopicName} - {topicData.topicName}
                    </p>
                    <p className="mt-2 text-base md:text-lg text-slate-500">
                        {topicData.subTopicLevelDescription}
                    </p>
                </div>
            </header>

            <div className="top-0 z-30 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="py-3 flex flex-wrap items-center gap-3 justify-center xl:justify-between">

                        {/* Paper toggle */}
                        <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-xs w-full sm:w-auto">
                            <label className="relative flex-1 sm:flex-none">
                                <input type="radio" name="paper" className="sr-only peer" defaultChecked />
                                <span className="block text-center px-3 py-1.5 rounded-full text-sm cursor-pointer text-slate-700 
                peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                                    All
                                </span>
                            </label>
                            <label className="relative flex-1 sm:flex-none">
                                <input type="radio" name="paper" className="sr-only peer" />
                                <span className="block text-center px-3 py-1.5 rounded-full text-sm cursor-pointer text-slate-700 
                peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                                    Paper 1
                                </span>
                            </label>
                            <label className="relative flex-1 sm:flex-none">
                                <input type="radio" name="paper" className="sr-only peer" />
                                <span className="block text-center px-3 py-1.5 rounded-full text-sm cursor-pointer text-slate-700 
                peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                                    Paper 2
                                </span>
                            </label>
                        </div>

                        {/* Difficulty toggle */}
                        <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-xs w-full sm:w-auto">
                            {["All", "Mild", "Medium", "Spicy"].map((level, idx) => (
                                <label key={level} className="relative flex-1 sm:flex-none">
                                    <input
                                        type="radio"
                                        name="difficulty"
                                        className="sr-only peer"
                                        defaultChecked={idx === 0}
                                    />
                                    <span className="block text-center px-3 py-1.5 rounded-full text-sm cursor-pointer text-slate-700 
                  peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                                        {level}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* View toggle */}
                        <div className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-md w-full sm:w-auto">
                            {["All", "Bookmarks", "Complete", "Incomplete"].map((view, idx) => (
                                <label key={view} className="relative flex-1 sm:flex-none">
                                    <input
                                        type="radio"
                                        name="view"
                                        className="sr-only peer"
                                        defaultChecked={idx === 0}
                                    />
                                    <span className="block text-center px-3 py-1.5 rounded-full text-sm cursor-pointer text-slate-700 
                  peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                                        {view}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* Search */}
                        <div className="w-full max-w-md mx-auto xl:w-auto xl:mx-0 xl:ml-auto">
                            <div className="relative w-full">
                                <svg
                                    className="absolute left-3 top-2.5 h-4 w-4 text-slate-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        d="M21 21l-4.35-4.35m1.1-4.4a6.75 6.75 0 11-13.5 0 
                     6.75 6.75 0 0113.5 0z"
                                    />
                                </svg>
                                <input
                                    type="search"
                                    placeholder="Search questions (Enter ↵)"
                                    className="w-full xl:w-72 pl-9 pr-3 py-2 rounded-full border border-slate-300 
                  bg-white/90 focus:bg-white outline-none text-sm 
                  transition-[width] duration-200 ease-out xl:focus:w-96"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div >

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <noscript>
                    {/* <PaginationLinks page={pageNum} hasNext={!!initialPage.nextCursor} /> */}

                    <QuestionsSSR data-ssr items={items} />
                </noscript>

                <QuestionsVirtuoso data-enhanced initialItems={items} initialCursor={nextCursor ?? null} endpoint={endpoint} />
            </main>
        </>
    );
}