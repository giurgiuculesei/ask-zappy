import { config } from "@/lib/config";
import { getTopics } from "@/lib/ib-math/topics";
import type { MetadataRoute } from "next";

const base = config.appUrl.replace(/\/$/, ""); // ensure no trailing slash

// tiny helpers
const trim = (s = "") => s.replace(/^\/+|\/+$/g, "");
const join = (...parts: (string | undefined)[]) =>
  [base, ...parts.map(trim)].filter(Boolean).join("/");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const urls: MetadataRoute.Sitemap = [
    { url: join(""), changeFrequency: "weekly", priority: 1 },
    {
      url: join("ib-math/analysis-and-approaches/question-bank/sl"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      // FIXED: was quoted string with ${} inside; now proper template + correct base path
      url: join("ib-math/analysis-and-approaches/question-bank/hl"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  try {
    const topics = await getTopics();

    for (const t of topics ?? []) {
      const topicLink = trim(t.link);

      for (const s of t.subtopics ?? []) {
        const subLink = trim(s.link);

        for (const l of s.levels ?? []) {
          const level = String(l.level ?? "").toLowerCase();

          urls.push({
            url: join(
              "ib-math/analysis-and-approaches/question-bank",
              level,
              topicLink,
              subLink
            ),
            changeFrequency: "daily",
            priority: 0.8,
          });
        }
      }
    }
  } catch {
    // If fetching topics fails, still return the base URLs.
  }

  return urls;
}
