import Topics from '@/components/ib-math/topics';
import { config } from '@/lib/config';
import { Metadata } from 'next';

export const revalidate = 86400; // 24h; change if needed
export const dynamicParams = false;     // we only allow 'sl' and 'hl'

export async function generateStaticParams() {
    return [{ level: 'sl' }, { level: 'hl' }];
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ level: Level }>;
}): Promise<Metadata> {
    const { level } = await params;
    return {
        title: `Analysis and Approaches ${level.toUpperCase()} topics`,
        description: `Daily-updated IB Mathematics Analysis & Approaches ${level === 'sl' ? 'Standard Level (SL)' : 'Higher Level (HL)'} topics.`,
    };
}

async function getData() {
    const res = await fetch(`${config.appUrl}/api/ib-math/analysis-and-approaches/question-bank/topic`, {
        // Cache the result and revalidate on the schedule above
        next: { revalidate },
    });
    if (!res.ok) throw new Error('Failed to load content');
    return res.json();
}

export default async function Page({ params }: { params: Promise<{ level: Level }> }) {
    // Get the level from params
    const { level } = await params;

    // Fetch the topics based on the level
    const topics = await getData();

    return (
        <Topics initialLevel={level} initialTopics={topics} />
    );
}