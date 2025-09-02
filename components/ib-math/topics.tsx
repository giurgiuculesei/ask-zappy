"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export const revalidate = 86400; // 24h; change if needed

export default function Topics({
  initialLevel,
  initialTopics,
}: {
  initialLevel: Level;
  initialTopics: Array<Topic>;
}) {
  const [level, setLevel] = useState<Level>(initialLevel);
  const [topics, setTopics] = useState<Array<Topic>>([]);

  const createFilteredTopics = (initialTopics: Array<Topic>, level: Level) => {
    // Filter topics based on the level
    const filteredTopics = initialTopics
      .map((t) => ({
        ...t,
        subtopics: t.subtopics?.filter(
          (s) => s.levels.some((l) => l.level === level.toUpperCase()) ?? false
        ),
      }))
      .filter((t) => (t.subtopics?.length ?? 0) > 0);

    return filteredTopics;
  };

  useEffect(() => {
    // Filter topics based on the level
    const filteredTopics = createFilteredTopics(initialTopics, level);

    setTopics(filteredTopics);
  }, [initialTopics, level]);

  const onChange = (newLevel: Level) => {
    if (newLevel === level) return;

    setLevel(newLevel);

    // Filter topics based on the level
    const filteredTopics = createFilteredTopics(initialTopics, newLevel);
    setTopics(filteredTopics);

    window.history.replaceState(
      null,
      "",
      `/ib-math/analysis-and-approaches/question-bank/${encodeURIComponent(
        newLevel
      )}`
    );
  };

  const hero = (
    <section className="bg-lucian-50 bg-[#EAF4FF]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* <nav aria-label="Breadcrumb">
                    <ol className="flex flex-wrap items-center gap-2 text-sm">
                        <li>
                            <a href="#" className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeWidth={2} d="m3 12 9-9 9 9M5 10v10h14V10" />
                                </svg>
                                Home
                            </a>
                        </li>
                        {['IB Math', 'IB Math AA SL', 'Questionbank'].map((chip) => (
                            <li key={chip}>
                                <button className="inline-flex items-center gap-1 rounded-full bg-white border border-slate-200 px-3 py-1.5 text-slate-700 hover:bg-slate-50">
                                    {chip}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeWidth={2} d="m6 9 6 6 6-6" />
                                    </svg>
                                </button>
                            </li>
                        ))}
                    </ol>
                </nav> */}

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
          <div className="md:col-span-2">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
              IB Mathematics Analysis and Approaches
              <br className="hidden sm:block" />{" "}
              <span className="text-slate-800">Questionbank</span>
            </h1>
            <p className="mt-3 text-slate-700 leading-relaxed max-w-2xl">
              Practice questions across the Analysis & Approaches (AA) syllabus,
              Standard Level (SL) or Higher Level (HL), with clear step-by-step
              solutions. Topics are grouped and arranged by difficulty, so you
              can focus on the concepts that matter most.
            </p>
          </div>
          <div className="md:col-span-1">
            <div className="flex md:justify-end">
              <Image
                src="/icon-aa-badge.svg"
                alt="Analysis & Approaches"
                width={112}
                height={112}
                className="w-28 h-28"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const levelFilter = (
    <section id="global-level" className="bg-white border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <fieldset role="radiogroup" aria-label="Level">
          <legend className="sr-only">Level</legend>
          <div className="flex items-center justify-start">
            <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 p-2">
              {(["sl", "hl"] as Level[]).map((opt) => (
                <label className="cursor-pointer" key={opt}>
                  <input
                    type="radio"
                    name="level"
                    value={opt}
                    className="peer sr-only"
                    checked={opt === level}
                    onChange={() => onChange(opt)}
                  />
                  <span className="px-5 py-3 text-base md:text-lg rounded-xl text-slate-700 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow peer-checked:ring-1 peer-checked:ring-slate-300">
                    {opt.toUpperCase()}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </fieldset>
      </div>
    </section>
  );

  const renderCards = (topicLink: string, subtopics: SubTopic[]) => {
    // Show cards if selected level is included
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {subtopics.map((subTopic: SubTopic) => (
          <article
            key={subTopic.name}
            className="relative rounded-2xl h-full flex flex-col border border-slate-200 bg-white p-5 shadow-card"
          >
            {subTopic.free && (
              <span
                aria-label="Free"
                title="Free"
                className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-600 text-white grid place-items-center ring-4 ring-white shadow-md"
              >
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path
                    strokeWidth={2}
                    d="M7 11V9a5 5 0 1 1 10 0v2M5 11h14v9H5z"
                  />
                </svg>
              </span>
            )}
            <h3 className="text-lg font-semibold">{subTopic.name}</h3>
            <p className="mt-1 text-sm text-slate-600">
              {
                subTopic.levels.filter(
                  (l) => l.level === level.toUpperCase()
                )[0].description
              }
            </p>
            <div className="mt-auto pt-5">
              <Link
                href={`/ib-math/analysis-and-approaches/question-bank/${level}/${topicLink}/${subTopic.link}`}
                className="inline-flex items-center justify-center w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50"
              >
                Open Study
              </Link>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <>
      {hero}
      {levelFilter}

      {topics.map((t, i) => {
        const Body = (
          <>
            <p className="text-sm text-slate-500">Topic {t.id}</p>
            <h2 className="text-2xl font-semibold tracking-tight mt-1">
              {t.name}
            </h2>
            <div className="mt-6">{renderCards(t.link, t.subtopics)}</div>
          </>
        );

        return i % 2 === 0 ? (
          <main
            key={`topic-${t.id}`}
            className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10"
          >
            {Body}
          </main>
        ) : (
          <section key={`topic-${t.id}`} className="bg-slate-50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
              {Body}
            </div>
          </section>
        );
      })}
    </>
  );
}
