import { getQuestionsPage } from '@/lib/ib-math/questions';
import { NextResponse } from 'next/server';

export const revalidate = 86400; // 24h; change if needed

export async function GET(req: Request,
    ctx: { params: Promise<{ subTopicId: string }> }
) {
    const { subTopicId } = await ctx.params;

    if (!subTopicId) {
        return NextResponse.json({ error: 'subTopicId is required' }, { status: 400 });
    }

    const url = new URL(req.url);

    const rawPaper = url.searchParams.get('paper');
    const paperMap = { paper1: 'paper1', paper2: 'paper2' } as const;
    const paper = (paperMap as Record<string, Paper>)[
        (rawPaper ?? '').toLowerCase()
    ];
    if (rawPaper && !paper) {
        return NextResponse.json({ error: 'paper is invalid' }, { status: 400 });
    }

    const rawDifficulty = url.searchParams.get('difficulty');
    const difficultyMap = { mild: 'mild', medium: 'medium', spicy: 'spicy' } as const;
    const difficulty = (difficultyMap as Record<string, Difficulty>)[
        (rawDifficulty ?? '').toLowerCase()
    ];
    if (rawDifficulty && !difficulty) {
        return NextResponse.json({ error: 'difficulty is invalid' }, { status: 400 });
    }


    const cursor = url.searchParams.get('cursor');
    const limit = Math.min(Number(url.searchParams.get('limit') ?? 20), 50);

    const data = await getQuestionsPage(subTopicId, limit, paper, difficulty, cursor);

    return NextResponse.json(data, {
        headers: {
            'Cache-Control': `s-maxage=${revalidate}, stale-while-revalidate=${revalidate}`,
        },
    });
}