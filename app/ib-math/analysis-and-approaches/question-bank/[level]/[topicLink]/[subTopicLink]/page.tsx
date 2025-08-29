import { getQuestionsPage } from "@/lib/ib-math/questions";
import { getTopicDataByLink } from "@/lib/ib-math/topics";
import { notFound } from "next/navigation";
import Filters from "./Filters";
import QuestionsSSR from "./QuestionsSSR";
import QuestionsVirtuoso from "./QuestionsVirtuoso";

export const revalidate = 86400; // 24h; change if needed

export default async function QuestionsPage({ params, searchParams }: {
    params: Promise<{ level: Level, topicLink: string, subTopicLink: string }>,
    searchParams: Promise<{ paper?: Paper, difficulty?: Difficulty; q?: string }>
}
) {
    const { level, topicLink, subTopicLink } = await params;

    // Fetch the topics based on the level
    const topicData = await getTopicDataByLink(topicLink, subTopicLink, level);

    if (!topicData) {
        notFound();
    }

    /// normalize filters
    const { paper, difficulty, q } = await searchParams;

    // fetch first page (SSR)
    const { items, nextCursor } = await getQuestionsPage(
        topicData?.subTopicId,
        20,
        paper,
        difficulty
    );

    const base = `/api/ib-math/question-bank/questions/${encodeURIComponent(topicData.subTopicId)}`;
    const qs = new URLSearchParams();

    if (paper) qs.set('paper', String(paper));
    if (difficulty) qs.set('difficulty', String(difficulty));
    if (q) qs.set('q', q);

    const endpoint = `${base}?${qs.toString()}`;

    const filterKey = `${paper}|${difficulty}|${q}`;

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

            {/* Filters are interactive (client) but also submit as GET for no-JS */}
            <Filters initial={{ paper, difficulty, q }} />

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
                <nav aria-label="Pagination" className="sr-only">
                    {nextCursor && <a href={`?cursor=${nextCursor}`}>Next page</a>}
                </nav>

                <noscript>
                    {/* <PaginationLinks page={pageNum} hasNext={!!initialPage.nextCursor} /> */}

                    <QuestionsSSR data-ssr items={items} />
                </noscript>

                <QuestionsVirtuoso initialItems={items} initialCursor={nextCursor ?? null} endpoint={endpoint} filterKey={filterKey} />
            </main>
        </>
    );
}