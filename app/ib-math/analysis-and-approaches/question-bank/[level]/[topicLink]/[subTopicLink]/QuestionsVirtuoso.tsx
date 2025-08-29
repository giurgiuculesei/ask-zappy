'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso';
import { QuestionCard } from './QuestionCard';

function mergeById<T extends { id: string }>(prev: T[], next: T[]): T[] {
    const seen = new Set(prev.map((p) => p.id));
    const merged = [...prev];
    for (const item of next) {
        if (!seen.has(item.id)) {
            merged.push(item);
            seen.add(item.id);
        }
    }
    return merged;
}

export default function QuestionsVirtuoso({
    initialItems,
    initialCursor,
    endpoint,
    filterKey
}: {
    initialItems: Question[];
    initialCursor: string | null;
    endpoint: string;
    filterKey: string;
}) {
    const [items, setItems] = useState<Question[]>(initialItems);
    const [cursor, setCursor] = useState<string | null>(initialCursor);
    const [loading, setLoading] = useState(false);

    const isFetchingRef = useRef(false);
    const abortRef = useRef<AbortController | null>(null);
    const listRef = useRef<VirtuosoHandle>(null);

    // 🔁 Reset list whenever filters/url/initials change
    useEffect(() => {
        // cancel any in-flight request for the previous filter set
        abortRef.current?.abort();
        isFetchingRef.current = false;
        setLoading(false);

        // replace items/cursor with new server-provided page 1
        setItems(initialItems);
        setCursor(initialCursor ?? null);

        // scroll to top for new filter set
        listRef.current?.scrollToIndex({ index: 0, align: 'start' });
    }, [filterKey, endpoint, initialItems, initialCursor]);

    const loadMore = useCallback(async () => {
        if (isFetchingRef.current || loading || !cursor) return;

        isFetchingRef.current = true;
        setLoading(true);

        const controller = new AbortController();
        abortRef.current = controller;

        try {
            const sep = endpoint.includes('?') ? '&' : '?';
            const url = `${endpoint}${sep}cursor=${encodeURIComponent(cursor)}`;

            const res = await fetch(url, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                cache: 'no-store',
                signal: controller.signal,
            });

            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            const page: QuestionsPage = await res.json();

            // Append new page, dedup by id
            setItems((prev) => mergeById(prev, page.items));
            setCursor(page.nextCursor ?? null);
        } catch (e: unknown) {
            // Ignore abort errors on filter switches
            if (e instanceof DOMException && e.name === 'AbortError') console.error(e);
        } finally {
            if (abortRef.current === controller) abortRef.current = null;
            isFetchingRef.current = false;
            setLoading(false);
        }
    }, [cursor, endpoint, loading]);

    // No need to key QuestionCard; Virtuoso uses computeItemKey
    const Row = useCallback(({ q }: { q: Question }) => <QuestionCard q={q} />, []);

    return (
        <Virtuoso
            computeItemKey={(_, q) => q.id}
            /*  overscan={10000}
             increaseViewportBy={{ top: 10000, bottom: 10000 }} */
            //overscan={2000}
            increaseViewportBy={{ top: 2000, bottom: 2000 }} /* fix lag on mobile*/
            useWindowScroll
            data={items}
            endReached={loadMore}
            itemContent={(_, q) => <Row q={q} />}
        //key={filterKey}
        />
    );
}