import rehypeKatex from "rehype-katex";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";
import remarkMath from "remark-math";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export async function mdToHtml(md: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkMath)
    .use(remarkRehype)
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        //code: [["className", /^language-./, "math-inline", "math-display"]],
        div: [...(defaultSchema.attributes?.div || []), ["className"]],
        span: [...(defaultSchema.attributes?.span || []), ["className"]],
        p: [...(defaultSchema.attributes?.p || []), ["className"]],
      },
    })
    .use(rehypeKatex, {
      strict: "ignore",
      output: "htmlAndMathml",
      trust: false,
    })
    .use(rehypeStringify)
    .process(md);

  return String(file);
}
