import { getQuestionsPage } from "@/lib/ib-math/questions";
import { getTopicDataByLink, getTopics } from "@/lib/ib-math/topics";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import Filters from "./Filters";
import QuestionsSSR from "./QuestionsSSR";
import QuestionsVirtuoso from "./QuestionsVirtuoso";

export const revalidate = 86400; // 24h; change if needed

export async function generateStaticParams() {
  const topics = await getTopics();

  const params: Array<{
    level: Level;
    topicLink: string;
    subTopicLink: string;
  }> = [];

  for (const t of topics) {
    const topicLink = t.link;

    for (const s of t.subtopics ?? []) {
      const subTopicLink = s.link;

      for (const l of s.levels ?? []) {
        const level = l.level.toLowerCase() as Level;
        params.push({ level, topicLink, subTopicLink });
      }
    }
  }

  return params;
}

export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ level: Level; topicLink: string; subTopicLink: string }>;
  searchParams: Promise<{ paper?: Paper; difficulty?: Difficulty; q?: string }>;
}): Promise<Metadata> {
  const { level, topicLink, subTopicLink } = await params;
  const { paper, difficulty, q } = await searchParams;

  const topicData = await getTopicDataByLink(topicLink, subTopicLink, level);
  if (!topicData) {
    return {
      title: "Not found | Ask Zappy",
      description: "The requested subtopic could not be found.",
    };
  }

  const lvl = level.toUpperCase();
  const title = `${topicData.subTopicName} - ${topicData.topicName} - IB Math AA ${lvl} Questionbank`;

  const parts: string[] = [];
  parts.push(
    `Practice IB Mathematics: Analysis & Approaches ${lvl} questions for ${topicData.subTopicName} with markschemes. ${topicData.subTopicLevelDescription}.`
  );

  if (paper) parts.push(`Paper: ${paper}`);
  if (difficulty) parts.push(`Difficulty: ${difficulty}`);
  if (q && q.trim()) parts.push(`Query: “${q.trim()}”`);

  const description = parts.join(" - ");

  console.log("meta", { title, description });

  return { title, description };
}

export default async function QuestionsPage({
  params,
  searchParams,
}: {
  params: Promise<{ level: Level; topicLink: string; subTopicLink: string }>;
  searchParams: Promise<{
    paper?: Paper;
    difficulty?: Difficulty;
    q?: string;
    cursor?: number;
  }>;
}) {
  const { level, topicLink, subTopicLink } = await params;

  // Fetch the topics based on the level
  const topicData = await getTopicDataByLink(topicLink, subTopicLink, level);

  if (!topicData) {
    notFound();
  }

  /// normalize filters
  const { paper, difficulty, q, cursor } = await searchParams;
  console.log({ paper, difficulty, q, cursor });

  // fetch first page (SSR)
  const { items, nextCursor } = await getQuestionsPage(
    topicData?.subTopicId,
    20,
    paper,
    difficulty,
    q,
    cursor
  );

  const base = `/api/ib-math/question-bank/questions/${encodeURIComponent(
    topicData.subTopicId
  )}`;
  const qs = new URLSearchParams();

  if (paper) qs.set("paper", String(paper));
  if (difficulty) qs.set("difficulty", String(difficulty));
  if (q) qs.set("q", q);

  const endpoint = `${base}?${qs.toString()}`;

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
          <QuestionsSSR data-ssr items={items} />
        </noscript>

        <QuestionsVirtuoso
          initialItems={items}
          initialCursor={nextCursor ?? null}
          endpoint={endpoint}
        />
      </main>
    </>
  );
}
