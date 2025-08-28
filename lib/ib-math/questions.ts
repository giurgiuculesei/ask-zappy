import 'server-only';


export async function getQuestionsPage(params: {
    /*  topic?: string[];
     level?: string;
     difficulty?: string;
     q?: string; */
    after?: string | null;
    limit: number;
}): Promise<QuestionsPage> {
    // TODO: Replace with your actual DB logic (Neo4j + cursor query)
    // This stub just simulates results with deterministic IDs.
    const { after, limit } = params;
    const start = after ? Number(after) + 1 : 1;
    const items: Question[] = Array.from({ length: limit }, (_, i) => {
        const idNum = start + i;
        return {
            id: String(idNum),
            difficulty: idNum % 3 === 0 ? 'Mild' : idNum % 3 === 1 ? 'Medium' : 'Spicy',
            paper: idNum % 2 === 0 ? 'Paper 1' : 'Paper 2',
            maximumMark: [1, 2, 3, 4, 5][idNum % 5],
            calculatorAllowed: [true, false][idNum % 2],
            questionHtml: `<p class="leading-relaxed">Question ${idNum}: Expand <span>(2x+1)^4</span> and simplify.</p>`,
            markupHtml: '<p class="leading-relaxed">Expand <span>(2x+1)^4</span> and simplify.</p>',
            sortKey: String(idNum).padStart(6, '0'),
            updatedAt: new Date().toISOString(),
        };
    });
    const nextCursor = start + limit - 1 >= 200 ? null : String(start + limit - 1); // cap demo at 200
    return { items, nextCursor, hasNext: nextCursor != null };
}
