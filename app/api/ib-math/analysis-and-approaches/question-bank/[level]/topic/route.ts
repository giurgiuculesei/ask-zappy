import { NextResponse } from 'next/server';

type Level = 'sl' | 'hl';

const topics: Array<{
    section: number
    title: string
    items: Array<{
        title: string
        desc: string
        levels: Level[]
        free?: boolean
    }>
}> = [
        {
            section: 1,
            title: 'Number & Algebra',
            items: [
                { title: 'Topic 1 All', desc: 'All questions in Topic 1 Number & Algebra', levels: ['sl', 'hl'] },
                { title: 'Sequences & Series', desc: 'Arithmetic/Geometric, Sigma notation, Applications, Compound interest…', levels: ['sl', 'hl'] },
                { title: 'Exponents & Logs', desc: 'Exponent & log laws, solving exponential & logarithmic equations…', levels: ['sl', 'hl'] },
                { title: 'Binomial Theorem', desc: 'Binomial expansion, Pascal’s triangle & the binomial coefficient nCr…', levels: ['hl'] },
                { title: 'Proofs', desc: 'Simple deductive proofs, LHS to RHS proofs…', levels: ['hl'] }
            ]
        },
        {
            section: 2,
            title: 'Functions',
            items: [
                { title: 'Topic 2 All', desc: 'All questions in Topic 2 Functions', levels: ['sl', 'hl'], free: true },
                { title: 'Properties of Functions', desc: 'Domain & range, composite & inverse functions, intercepts, sketching…', levels: ['sl', 'hl'], free: true },
                { title: 'Quadratics', desc: 'Equations, factorising, completing the square, discriminant, vertex…', levels: ['sl', 'hl'], free: true },
                { title: 'Rational Functions', desc: 'Asymptotes, intercepts, sketching, reciprocal functions…', levels: ['hl'], free: true },
                { title: 'Exponent–Log Functions', desc: 'Exponential & logarithmic graphs, asymptotes, applications…', levels: ['sl', 'hl'], free: true },
                { title: 'Transformations', desc: 'Translations, reflections, stretches, composite transformations…', levels: ['sl', 'hl'], free: true }
            ]
        }
    ]


export async function GET(
    _req: Request,
    context: { params: Promise<{ level: Level }> }
) {
    const { level } = await context.params;

    if (level !== "sl" && level !== "hl") {
        return NextResponse.json(
            { error: "Invalid level. Use 'sl' or 'hl'." },
            { status: 400 }
        );
    }


    // Filter topics based on the level
    const filteredTopics = topics.map(topic => ({
        ...topic,
        items: topic.items.filter(item => item.levels.includes(level!))
    })).filter(topic => topic.items.length > 0);

    return NextResponse.json(filteredTopics);
}