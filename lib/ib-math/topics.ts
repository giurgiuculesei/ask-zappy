'use server';

import { driver } from "../neo4j/neo4j";

export async function getTopics(): Promise<Topic[]> {
    console.log(`getTopics enter`);

    const session = driver.session({ defaultAccessMode: "READ" });
    try {
        const res = await session.run(
            `
        MATCH (:QuestionBank {id: $qbId})-[:HAS_TOPIC]->(t:Topic)
        WITH t
        CALL (t) {
        WITH t
        MATCH (t)-[:HAS_SUB_TOPIC]->(s:SubTopic)
        WITH s
        ORDER BY s.order
        CALL (s) {
            WITH s
            OPTIONAL MATCH (s)-[:HAS_SUB_TOPIC_LEVEL]->(stl:SubTopicLevel)-[:HAS_LEVEL]->(lvl:Level)
            WITH stl, lvl
            ORDER BY lvl.id
            RETURN collect(stl { .description, level: lvl.id }) AS levels
        }
        RETURN collect(
                s {.name, .order, levels: levels }
                ) AS subtopics
        }
        WITH t, subtopics
        ORDER BY t.order
        RETURN t {.name, .order, subtopics: subtopics } AS topic;
        `,
            { qbId: "1" }
        );

        console.log(`getTopics exit - result length:`, res.records.length);

        const topics = res.records.map(r => r.get("topic")) as Topic[];
        return topics;

    } finally {
        await session.close();
    }
}