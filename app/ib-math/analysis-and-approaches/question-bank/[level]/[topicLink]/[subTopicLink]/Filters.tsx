'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo, useRef } from 'react';

function buildQueryFromForm(form: HTMLFormElement) {
    const fd = new FormData(form);
    const params = new URLSearchParams();

    for (const [k, v] of fd.entries()) {
        const val = String(v).trim();
        if (val && val.toLowerCase() !== 'all') params.set(k, val);
    }

    const qs = params.toString();
    return qs ? `?${qs}` : '';
}

export default function Filters({
    initial,
}: {
    initial: { paper?: Paper; difficulty?: Difficulty; q?: string };
}) {
    const router = useRouter();
    const pathname = usePathname();
    const params = useSearchParams();

    // keep a ref to the form to submit without a visible button if JS is on
    const formRef = useRef<HTMLFormElement>(null);

    const onChange = useCallback(() => {
        if (!formRef.current) return;
        const qs = buildQueryFromForm(formRef.current);
        router.replace(`${pathname}${qs}`, { scroll: false });
    }, [pathname, router]);

    // current values (so radios are "checked" server + client)
    const v = useMemo(
        () => ({
            paper: params.get('paper') ?? initial.paper ?? 'all',
            difficulty: params.get('difficulty') ?? initial.difficulty ?? 'all',
            //view: params.get('view') ?? initial.view ?? 'all',
            view: 'all',
            q: params.get('q') ?? initial.q ?? '',
        }),
        [params, initial]
    );

    return (
        <div className="top-0 z-30 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <form ref={formRef} className="py-3 flex flex-wrap items-center gap-3 justify-center xl:justify-between" method="GET" action="">
                    {/* Paper */}
                    <fieldset className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-xs w-full sm:w-auto">
                        {[
                            { label: 'All', value: 'all' },
                            { label: 'Paper 1', value: 'paper1' },
                            { label: 'Paper 2', value: 'paper2' },
                        ].map(({ label, value }) => (
                            <label key={value} className="relative flex-1 sm:flex-none cursor-pointer">
                                <input
                                    type="radio"
                                    name="paper"
                                    value={value}
                                    className="sr-only peer"
                                    checked={v.paper === value}
                                    onChange={onChange}
                                />
                                <span className="block text-center px-3 py-1.5 rounded-full text-sm text-slate-700 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                                    {label}
                                </span>
                            </label>
                        ))}
                    </fieldset>

                    {/* Difficulty */}
                    <fieldset className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-xs w-full sm:w-auto">
                        {['all', 'mild', 'medium', 'spicy'].map((d) => (
                            <label key={d} className="relative flex-1 sm:flex-none cursor-pointer">
                                <input
                                    type="radio"
                                    name="difficulty"
                                    value={d}
                                    className="sr-only peer"
                                    checked={v.difficulty === d}
                                    onChange={onChange}
                                />
                                <span className="block text-center px-3 py-1.5 rounded-full text-sm text-slate-700 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                                    {d === 'all' ? 'All' : d[0].toUpperCase() + d.slice(1)}
                                </span>
                            </label>
                        ))}
                    </fieldset>

                    {/* View */}
                    <fieldset className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-md w-full sm:w-auto">
                        {[
                            { label: 'All', value: 'all' },
                            { label: 'Bookmarks', value: 'bookmarks' },
                            { label: 'Complete', value: 'complete' },
                            { label: 'Incomplete', value: 'incomplete' },
                        ].map(({ label, value }) => (
                            <label key={value} className="relative flex-1 sm:flex-none cursor-pointer">
                                <input
                                    type="radio"
                                    name="view"
                                    value={value}
                                    className="sr-only peer"
                                    checked={v.view === value}
                                    onChange={onChange}
                                />
                                <span className="block text-center px-3 py-1.5 rounded-full text-sm text-slate-700 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                                    {label}
                                </span>
                            </label>
                        ))}
                    </fieldset>

                    {/* Search (submit on Enter; change on blur or add a button) */}
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
                                name="q"
                                defaultValue={v.q}
                                placeholder="Search questions (Enter ↵)"
                                className="w-full xl:w-72 pl-9 pr-3 py-2 rounded-full border border-slate-300 bg-white/90 focus:bg-white outline-none text-sm transition-[width] duration-200 ease-out xl:focus:w-96"
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') {
                                        // native GET submit works with or without JS
                                    }
                                }}
                                onBlur={onChange} // optional: update when leaving the field
                            />
                        </div>
                    </div>

                    {/* Accessible fallback submit for no-JS users (visible in <noscript>) */}
                    <noscript>
                        <div className="w-full">
                            <button type="submit" className="mt-2 rounded-md border px-3 py-1.5 text-sm">Apply filters</button>
                        </div>
                    </noscript>
                </form>
            </div>
        </div>
    );
}