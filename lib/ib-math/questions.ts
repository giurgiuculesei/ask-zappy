"use server";

import { int } from "neo4j-driver";
import { driver } from "../neo4j/neo4j";

export async function getQuestionsPage(
  subTopicId: number,
  limit: number,
  paper?: Paper,
  difficulty?: Difficulty,
  cursor?: number | null
): Promise<QuestionsPage> {
  console.log(`getQuestionsPage enter`, {
    subTopicId,
    limit,
    paper,
    difficulty,
    cursor,
  });

  const session = driver.session({ defaultAccessMode: "READ" });

  try {
    const pageSize = Math.max(1, Math.min(100, limit || 20));

    const res = await session.run(
      `
        MATCH (st:SubTopic {id: $subTopicId})-[:HAS_QUESTION]->(q:Question)
      
        OPTIONAL MATCH (q)-[:HAS_PAPER]->(p:Paper)
        WHERE $paper IS NULL OR p.id = $paper

        OPTIONAL MATCH (q)-[:HAS_DIFFICULTY]->(d:Difficulty)
        WHERE $difficulty IS NULL OR d.id = $difficulty

        WITH
        q,
        collect(DISTINCT toLower(p.id)) AS papers,
        collect(DISTINCT toLower(d.id)) AS diffs
       
        WHERE
        ($cursorId IS NULL OR q.id > $cursorId)
        AND ($paper IS NULL OR size(papers) > 0)
        AND ($difficulty IS NULL OR size(diffs) > 0)

        RETURN
        q.id                    AS id,
        q.questionMarkdown      AS questionMarkdown,
        q.questionHtml          AS questionHtml,
        q.questionText          AS questionText,
        q.markSchemeMarkdown    AS markSchemeMarkdown,
        q.markSchemeHtml        AS markSchemeHtml,
        q.markSchemeText        AS markSchemeText,
        papers[0]               AS paper, 
        diffs[0]                AS difficulty 

        ORDER BY id ASC
        LIMIT $limitPlus
      `,
      {
        subTopicId,
        paper: paper?.toUpperCase() ?? null,
        difficulty: difficulty?.toUpperCase() ?? null,
        cursorId: cursor == null ? null : int(cursor),
        limitPlus: int(pageSize + 1),
      }
    );

    const results = res.records.map((r) => r.toObject()) as Question[];

    const hasMore = results.length > pageSize;
    const items = hasMore ? results.slice(0, pageSize) : results;
    const nextCursor = hasMore ? items[items.length - 1].id : null;

    console.log(`getQuestionsPage exit results=`, results.length);

    return { items, nextCursor };
  } finally {
    await session.close();
  }
}
