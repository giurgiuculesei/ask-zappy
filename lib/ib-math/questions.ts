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
  const q = dedent`[Maximum mark: 5]

A company’s revenue in year 0 is $R_0 = 8.0\times 10^{5}$ dollars. Each year, the revenue is multiplied by a constant factor $k$ with $1<k<1.2$. After $n$ years, the revenue is $R_n = R_0\,k^{n}$.

|||
|:---|---:|
| **(a)** Given $R_3 = 1.10\times 10^{6}$, find $k$ correct to 3 significant figures. | [2] |
| **(b)** Find the least integer $n$ such that $R_n \ge 1.5\times 10^{6}$. | [3] |`;

  const m = dedent`**(a)** Using $R_3 = R_0\,k^{3}$:
$$k^{3}=\frac{R_3}{R_0}=\frac{1.10\times 10^{6}}{8.0\times 10^{5}}=1.375.$$
$$k=1.375^{1/3}\approx 1.112\ \Rightarrow\ \boxed{k=1.11\ \text{(3 s.f.)}}.$$

**(b)** Require $R_0\,k^{n}\ge 1.5\times 10^{6}$:
$$k^{n}\ge \frac{1.5\times 10^{6}}{8.0\times 10^{5}}=1.875.$$
Using logs,
$$n \ge \frac{\ln(1.875)}{\ln(k)} \approx \frac{0.627}{\ln(1.112)} \approx 5.92.$$
Hence the least integer is $\boxed{n=6}$.

(Check): $k^{6}=(k^{3})^{2}=(1.375)^{2}=1.890625$ so
$$R_6=R_0\,k^{6}=(8.0\times 10^{5})\times 1.890625=1.5125\times 10^{6}\ge 1.5\times 10^{6}.$$
`;

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
