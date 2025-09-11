import { refreshDB } from "@/lib/ib-math/refreshDB";

export async function POST() {
  await refreshDB().catch((err) => {
    console.error("Error refreshing DB:", err);
  });

  return new Response("DB Refreshed");
}
