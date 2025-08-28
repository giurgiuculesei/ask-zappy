import 'server-only';


export async function getQuestionsPage(
    subTopicId: string,
    limit: number,
    paper?: Paper,
    difficulty?: Difficulty,
    cursor?: string | null,
): Promise<QuestionsPage> {
    const start = cursor ? Number(cursor) + 1 : 1;
    const items: Question[] = Array.from({ length: limit }, (_, i) => {
        const idNum = start + i;

        return {
            id: String(idNum),
            difficulty: difficulty ? difficulty : idNum % 3 === 0 ? 'mild' : idNum % 3 === 1 ? 'medium' : 'spicy',
            paper: paper ? paper : (idNum % 2 === 0 ? 'paper1' : 'paper2'),
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
