import { getQuestionsPage } from '@/lib/ib-math/questions';
import { NextResponse } from 'next/server';

export const revalidate = 60;

export async function GET(req: Request) {
    const url = new URL(req.url);
    const after = url.searchParams.get('after');
    const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 50);

    const data = await getQuestionsPage({ after, limit });
    return NextResponse.json(data, {
        headers: {
            'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`,
        },
    });
}