import dedent from "dedent";
import "server-only";
import { mdToHtml } from "../mdToHtml";

export async function getQuestionsPage(
  subTopicId: string,
  limit: number,
  paper?: Paper,
  difficulty?: Difficulty,
  cursor?: string | null
): Promise<QuestionsPage> {
  const m = dedent`## Markdown Equation Generator & Math Editor Features

    ### LaTeX Mathematical Expressions Online

    Our **markdown formula generator** and **markdown equation generator** supports comprehensive LaTeX math syntax with live preview. Create beautiful mathematical equations in your markdown documents using our **markdown equation editor**:

    The first two terms of an infinite geometric sequence, in order, are

    Inline equation: $E = mc^2$

    Display equations:
    $$
    \begin{aligned}
    \frac{d}{dx}e^x &= e^x \\
    \int_a^b f(x)dx &= F(b) - F(a) \\
    \sum_{i=1}^n i &= \frac{n(n+1)}{2}
    \end{aligned}
    $$`;

  const q = dedent`The first two terms of an infinite geometric sequence, in order, are
    
    Inline equation: $E = mc^2$

    Display equations:
    $$
    \begin{aligned}
    \frac{d}{dx}e^x &= e^x \\
    \int_a^b f(x)dx &= F(b) - F(a) \\
    \sum_{i=1}^n i &= \frac{n(n+1)}{2}
    \end{aligned}
    $$`;

  const compiledQ = await mdToHtml(q);
  const compiledM = await mdToHtml(m);

  const start = cursor ? Number(cursor) + 1 : 1;
  const items: Question[] = Array.from({ length: limit }, (_, i) => {
    const idNum = start + i;

    return {
      id: String(idNum),
      difficulty: difficulty
        ? difficulty
        : idNum % 3 === 0
        ? "mild"
        : idNum % 3 === 1
        ? "medium"
        : "spicy",
      paper: paper ? paper : idNum % 2 === 0 ? "paper1" : "paper2",
      maximumMark: [1, 2, 3, 4, 5][idNum % 5],
      calculatorAllowed: [true, false][idNum % 2],
      questionHtml: compiledQ,
      markupHtml: compiledM,
      sortKey: String(idNum).padStart(6, "0"),
      updatedAt: new Date().toISOString(),
    };
  });
  const nextCursor =
    start + limit - 1 >= 200 ? null : String(start + limit - 1); // cap demo at 200
  return { items, nextCursor, hasNext: nextCursor != null };
}
