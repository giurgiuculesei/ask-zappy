'use client';
import { useCallback, useRef, useState } from 'react';
import { Virtuoso } from 'react-virtuoso';
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
    endpoint
}: {
    initialItems: Question[];
    initialCursor: string | null;
    endpoint: string;
}) {
    const [items, setItems] = useState<Question[]>(initialItems);
    const [cursor, setCursor] = useState<string | null>(initialCursor);
    const [loading, setLoading] = useState(false);

    const isFetchingRef = useRef(false);

    const loadMore = useCallback(async () => {
        if (isFetchingRef.current || loading || !cursor) return;
        isFetchingRef.current = true;
        setLoading(true);
        try {
            const sep = endpoint.includes('?') ? '&' : '?';
            const res = await fetch(`${endpoint}${sep}cursor=${encodeURIComponent(cursor)}`, {
                method: 'GET',
                headers: { Accept: 'application/json' },
                cache: 'no-store',
            });

            if (!res.ok) throw new Error(`Failed to fetch: ${res.status}`);
            const page: QuestionsPage = await res.json();
            setItems(prev => mergeById(prev, page.items));
            setCursor(page.nextCursor ?? null);
        } catch (e) {
            console.error(e);
        } finally {
            isFetchingRef.current = false;
            setLoading(false);
        }
    }, [cursor, endpoint, loading]);

    const MemoRow = useCallback(({ q }: { q: Question }) => <QuestionCard key={q.id} q={q} />, []);

    return (
        <Virtuoso
            computeItemKey={(_, q) => q.id}            // stable keys!
            overscan={10000}                              // extra px before/after viewport
            increaseViewportBy={{ top: 10000, bottom: 10000 }} // keep more DOM mounted

            useWindowScroll
            data={items}
            endReached={loadMore}
            itemContent={(_, q) => <MemoRow q={q} />}
        />
    );
}