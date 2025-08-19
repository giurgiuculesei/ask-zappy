import { headers } from 'next/headers';
import Image from 'next/image'
import Link from 'next/link';

export const revalidate = 60 * 60 * 24; // 24h; change if needed
export const dynamicParams = false;     // we only allow 'sl' and 'hl'

export async function generateStaticParams() {
    return [{ level: 'sl' }, { level: 'hl' }];
}

type Level = 'sl' | 'hl';

async function getBaseUrl() {
    const host = (await headers()).get("host")!;
    const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
    return `${protocol}://${host}`;
}

async function getData(level: Level) {
    const baseUrl = await getBaseUrl();

    const res = await fetch(`${baseUrl}//api/ib-math/analysis-and-approaches/question-bank/topic`, {
        // Cache the result and revalidate on the schedule above
        next: { revalidate },
    });
    if (!res.ok) throw new Error('Failed to load content');
    return res.json();
}

export default async function Page({ params }: { params: Promise<{ level: Level }> }) {
    const topics = await getData('sl'); // Default to 'sl' for initial render
    // Get the level from params
    let { level } = await params;

    const hero = (
        <section className="bg-lucian-50 bg-[#EAF4FF]">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
                <nav aria-label="Breadcrumb">
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
                </nav>

                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-center">
                    <div className="md:col-span-2">
                        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">
                            IB Mathematics Analysis and Approaches<br className="hidden sm:block" /> <span className="text-slate-800">Questionbank</span>
                        </h1>
                        <p className="mt-3 text-slate-700 leading-relaxed max-w-2xl">
                            Practice questions across the Analysis & Approaches (AA) syllabus, Standard Level (SL) or Higher Level (HL), with clear step-by-step solutions. Topics are grouped and arranged by difficulty, so you can focus on the concepts that matter most.
                        </p>
                    </div>
                    <div className="md:col-span-1">
                        <div className="flex md:justify-end">
                            <Image src="/icon-aa-badge.svg" alt="Analysis & Approaches" width={112} height={112} className="w-28 h-28" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )

    const levelFilter = (
        <section id="global-level" className="bg-white border-b border-slate-200">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
                <fieldset role="radiogroup" aria-label="Level">
                    <legend className="sr-only">Level</legend>
                    <div className="flex items-center justify-start">
                        <div className="inline-flex items-center gap-2 rounded-2xl bg-slate-100 p-2">
                            {(['sl', 'hl'] as Level[]).map((opt) => (
                                <Link href={`/ib-math/analysis-and-approaches/question-bank/${opt}`} className="inline-flex items-center gap-2" key={opt}>
                                    <label className="cursor-pointer">
                                        <input type="radio" name="level" value={opt} className="peer sr-only" defaultChecked={opt === level} />
                                        <span className="px-5 py-3 text-base md:text-lg rounded-xl text-slate-700 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow peer-checked:ring-1 peer-checked:ring-slate-300">
                                            {opt.toUpperCase()}
                                        </span>
                                    </label>
                                </Link>
                            ))}
                        </div>
                    </div>
                </fieldset>
            </div >
        </section >
    )

    const renderCards = (items: typeof topics[number]['items']) => {
        // Show cards if selected level is included
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {items.map((item: any) => (
                    <article key={item.title} className="relative rounded-2xl h-full flex flex-col border border-slate-200 bg-white p-5 shadow-card">
                        {item.free && (
                            <span aria-label="Free" title="Free" className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-blue-600 text-white grid place-items-center ring-4 ring-white shadow-md">
                                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeWidth={2} d="M7 11V9a5 5 0 1 1 10 0v2M5 11h14v9H5z" />
                                </svg>
                            </span>
                        )}
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-1 text-sm text-slate-600">{item.desc}</p>
                        <div className="mt-auto pt-5">
                            <a href="#" className="inline-flex items-center justify-center w-full rounded-full border border-slate-300 px-4 py-2.5 text-sm font-medium hover:bg-slate-50">Open Study</a>
                        </div>
                    </article>
                ))}
            </div>
        )
    }

    return (
        <>
            {hero}
            {levelFilter}

            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                <p className="text-sm text-slate-500">Topic 1</p>
                <h2 className="text-2xl font-semibold tracking-tight mt-1">Number &amp; Algebra</h2>

                <div className="mt-6">{renderCards(topics[0].items.slice(0, 3))}</div>
                <div className="mt-4">{renderCards(topics[0].items.slice(3))}</div>
            </main>

            <section className="bg-slate-50">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
                    <p className="text-sm text-slate-500">Topic 2</p>
                    <h2 className="text-2xl font-semibold tracking-tight mt-1">Functions</h2>
                    <div className="mt-6">{renderCards(topics[1].items.slice(0, 3))}</div>
                    <div className="mt-4">{renderCards(topics[1].items.slice(3))}</div>
                </div>
            </section>
        </>
    )
}