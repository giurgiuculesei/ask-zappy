"use client";

import * as ga from "@/lib/ga";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";

function buildQueryFromObj(obj: Record<string, string | undefined>) {
  const sp = new URLSearchParams();
  for (const [k, v] of Object.entries(obj)) {
    const val = (v ?? "").trim();
    if (val && val.toLowerCase() !== "all") sp.set(k, val);
  }
  const qs = sp.toString();
  return qs ? `?${qs}` : "";
}

export default function Filters({
  initial,
}: {
  initial: { paper?: Paper; difficulty?: Difficulty; q?: string };
}) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  // 1) Derive initial values from URL/server once
  const derived = useMemo(
    () => ({
      paper: params.get("paper") ?? initial.paper ?? "all",
      difficulty: params.get("difficulty") ?? initial.difficulty ?? "all",
      view: "all",
      q: params.get("q") ?? initial.q ?? "",
    }),
    [params, initial]
  );

  // 2) Local optimistic state (updates instantly on click/typing)
  const [local, setLocal] = useState(derived);

  // Keep local in sync when URL changes from outside (e.g., back/forward)
  useEffect(() => setLocal(derived), [derived]);

  // 3) Async, low-priority URL updates
  const [, startTransition] = useTransition();
  const debounceRef = useRef<number | null>(null);

  const scheduleUrlUpdate = useCallback(
    (next: typeof local) => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      debounceRef.current = window.setTimeout(() => {
        const qs = buildQueryFromObj(next);
        startTransition(() => {
          router.replace(`${pathname}${qs}`, { scroll: false });
        });
      }, 80); // tiny debounce smooths rapid clicks
    },
    [pathname, router, startTransition]
  );

  // Handlers — update local immediately, then async URL
  const setPaper = useCallback(
    (paper: string) => {
      ga.event({
        action: "paper_filter_clicked",
        params: {
          new_paper: paper,
        },
      });

      const next = { ...local, paper };
      setLocal(next);
      scheduleUrlUpdate(next);
    },
    [local, scheduleUrlUpdate]
  );

  const setDifficulty = useCallback(
    (difficulty: string) => {
      ga.event({
        action: "difficulty_filter_clicked",
        params: {
          new_difficulty: difficulty,
        },
      });

      const next = { ...local, difficulty };
      setLocal(next);
      scheduleUrlUpdate(next);
    },
    [local, scheduleUrlUpdate]
  );

  const setView = useCallback(
    (view: string) => {
      ga.event({
        action: "view_filter_clicked",
        params: {
          new_view: view,
        },
      });

      const next = { ...local, view };
      setLocal(next);
      scheduleUrlUpdate(next);
    },
    [local, scheduleUrlUpdate]
  );

  const setQ = useCallback(
    (q: string) => {
      const next = { ...local, q };
      setLocal(next);
      // For search, only sync on blur/enter (keeps typing snappy)
    },
    [local]
  );

  const onSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      ga.event({
        action: "search_filter_aplied",
        params: {
          new_query: local.q.trim(),
        },
      });

      // trim q before building the query
      const next = { ...local, q: local.q.trim() };
      scheduleUrlUpdate(next); // buildQueryFromObj already strips "all"
    },
    [local, scheduleUrlUpdate]
  );

  return (
    <div className="top-0 z-30 border-b border-slate-200 bg-slate-50/80 backdrop-blur">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <form
          className="py-3 flex flex-wrap items-center gap-3 justify-center xl:justify-between"
          onSubmit={onSubmit}
        >
          {/* Paper */}
          <fieldset className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-xs w-full sm:w-auto">
            {[
              { label: "All", value: "all" },
              { label: "Paper 1", value: "paper1" },
              { label: "Paper 2", value: "paper2" },
            ].map(({ label, value }) => (
              <label
                key={value}
                className="relative flex-1 sm:flex-none cursor-pointer"
              >
                <input
                  type="radio"
                  name="paper"
                  value={value}
                  className="sr-only peer"
                  checked={local.paper === value}
                  onChange={() => setPaper(value)}
                />
                <span className="block text-center px-3 py-1.5 rounded-full text-sm text-slate-700 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                  {label}
                </span>
              </label>
            ))}
          </fieldset>

          {/* Difficulty */}
          <fieldset className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-xs w-full sm:w-auto">
            {["all", "mild", "medium", "spicy"].map((d) => (
              <label
                key={d}
                className="relative flex-1 sm:flex-none cursor-pointer"
              >
                <input
                  type="radio"
                  name="difficulty"
                  value={d}
                  className="sr-only peer"
                  checked={local.difficulty === d}
                  onChange={() => setDifficulty(d)}
                />
                <span className="block text-center px-3 py-1.5 rounded-full text-sm text-slate-700 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                  {d === "all" ? "All" : d[0].toUpperCase() + d.slice(1)}
                </span>
              </label>
            ))}
          </fieldset>

          {/* View */}
          <fieldset className="flex bg-slate-100 rounded-full p-1 border border-slate-200 max-w-md w-full sm:w-auto">
            {[
              { label: "All", value: "all" },
              { label: "Bookmarks", value: "bookmarks" },
              { label: "Complete", value: "complete" },
              { label: "Incomplete", value: "incomplete" },
            ].map(({ label, value }) => (
              <label
                key={value}
                className="relative flex-1 sm:flex-none cursor-pointer"
              >
                <input
                  type="radio"
                  name="view"
                  value={value}
                  className="sr-only peer"
                  checked={local.view === value}
                  onChange={() => setView(value)}
                />
                <span className="block text-center px-3 py-1.5 rounded-full text-sm text-slate-700 peer-checked:bg-white peer-checked:text-slate-900 peer-checked:shadow">
                  {label}
                </span>
              </label>
            ))}
          </fieldset>

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
                  d="M21 21l-4.35-4.35m1.1-4.4a6.75 6.75 0 11-13.5 0 6.75 6.75 0 0113.5 0z"
                />
              </svg>
              <input
                type="search"
                name="q"
                value={local.q}
                onChange={(e) => setQ(e.target.value)}
                onBlur={() => scheduleUrlUpdate(local)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault(); // block form submit
                    onSubmit(e); //    and run our handler
                  }
                }}
                placeholder="Questions, mark schemes (Enter ↵)"
                className="w-full xl:w-72 pl-9 pr-3 py-2 rounded-full border border-slate-300 bg-white/90 focus:bg-white outline-none text-sm transition-[width] duration-200 ease-out xl:focus:w-96"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
