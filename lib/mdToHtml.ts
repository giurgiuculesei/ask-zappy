import rehypeKatex from "rehype-katex";
import rehypeRaw from "rehype-raw";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function mdToHtml(md: string) {
  const normalize = (s: string) => s.replace(/\n[ \t]+\n/g, "\n\n");

  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkMath)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeSanitize, {
      ...defaultSchema,
      tagNames: [
        ...(defaultSchema.tagNames || []),
        "div",
        "span",
        "table",
        "thead",
        "tbody",
        "tr",
        "th",
        "td",
        "caption",
      ],
      attributes: {
        ...defaultSchema.attributes,
        div: [...(defaultSchema.attributes?.div || []), ["className"]],
        span: [...(defaultSchema.attributes?.span || []), ["className"]],
        p: [...(defaultSchema.attributes?.p || []), ["className"]],
        th: [
          ...(defaultSchema.attributes?.th || []),
          ["className", "colspan", "rowspan"],
        ],
        td: [
          ...(defaultSchema.attributes?.td || []),
          ["className", "colspan", "rowspan"],
        ],
        "*": [...(defaultSchema.attributes?.["*"] || []), ["style"]],
      },
    })
    .use(rehypeKatex, {
      strict: "ignore",
      output: "htmlAndMathml",
      trust: false,
    })
    .use(rehypeStringify)
    .process(normalize(md));

  return String(file);
}
