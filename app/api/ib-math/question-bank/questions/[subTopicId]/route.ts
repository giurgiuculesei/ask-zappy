import { getQuestionsPage } from "@/lib/ib-math/questions";
import { NextResponse } from "next/server";

export const revalidate = 86400; // 24h; change if needed

export async function GET(
  req: Request,
  ctx: { params: Promise<{ subTopicId: number }> }
) {
  const { subTopicId } = await ctx.params;

  if (!subTopicId) {
    return NextResponse.json(
      { error: "subTopicId is required" },
      { status: 400 }
    );
  }

  const url = new URL(req.url);

  const rawPaper = url.searchParams.get("paper");
  const paperMap = { paper1: "paper1", paper2: "paper2" } as const;
  const paper = (paperMap as Record<string, Paper>)[
    (rawPaper ?? "").toLowerCase()
  ];
  if (rawPaper && !paper) {
    return NextResponse.json({ error: "paper is invalid" }, { status: 400 });
  }

  const rawDifficulty = url.searchParams.get("difficulty");
  const difficultyMap = {
    mild: "mild",
    medium: "medium",
    spicy: "spicy",
  } as const;
  const difficulty = (difficultyMap as Record<string, Difficulty>)[
    (rawDifficulty ?? "").toLowerCase()
  ];
  if (rawDifficulty && !difficulty) {
    return NextResponse.json(
      { error: "difficulty is invalid" },
      { status: 400 }
    );
  }

  const rawCursor = url.searchParams.get("cursor");
  const cursor = rawCursor !== null ? Number(rawCursor) : null;
  const limit = Math.min(Number(url.searchParams.get("limit") ?? 20), 50);

  const data = await getQuestionsPage(
    Number(subTopicId),
    limit,
    paper,
    difficulty,
    cursor
  );

  return NextResponse.json(data, {
    headers: {
      //max-age is browser cache
      //s-maxage is CDN cache
      "Cache-Control": `public, max-age=60, s-maxage=300, stale-while-revalidate=60`,
    },
  });
}
