"use server";

import { driver } from "../neo4j/neo4j";

export async function refreshDB() {
  console.log(`refreshDB enter `);

  const session = driver.session({ defaultAccessMode: "WRITE" });
  try {
    await session.run(
      `
        MATCH (b: QuestionBank) SET b.updated = datetime()
        `
    );
  } finally {
    await session.close();
  }
}
