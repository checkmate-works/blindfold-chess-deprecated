import { getMarkdownContent } from "@/content/tips/markdown-loader";

export function TestMarkdown() {
  const content = getMarkdownContent("bishop-movement", "en");
  console.info("Markdown content:", content);
  return (
    <div>
      <h1>Test Markdown</h1>
      <pre>{content.substring(0, 200)}...</pre>
    </div>
  );
}
