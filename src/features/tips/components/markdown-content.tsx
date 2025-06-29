import ReactMarkdown from "react-markdown";
import rehypeKatex from "rehype-katex";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
// @ts-expect-error - No type definitions available
import "katex/dist/katex.min.css";

interface MarkdownContentProps {
  content: string;
}

export const MarkdownContent = ({ content }: MarkdownContentProps) => {
  return (
    <div
      className="prose prose-lg max-w-none 
      prose-headings:text-chess-gray-900 
      prose-p:text-chess-gray-700 
      prose-p:leading-relaxed
      prose-p:mb-4
      prose-strong:text-chess-gray-900 
      prose-code:text-chess-gray-800 
      prose-code:bg-chess-gray-100 
      prose-code:px-1 
      prose-code:py-0.5 
      prose-code:rounded 
      prose-code:text-sm
      prose-pre:bg-chess-gray-100 
      prose-pre:border 
      prose-pre:border-chess-gray-200
      prose-ul:list-disc
      prose-ul:ml-6
      prose-ol:list-decimal
      prose-ol:ml-6
      prose-li:mb-2
      prose-li:text-chess-gray-700
      prose-blockquote:border-l-4
      prose-blockquote:border-chess-gray-300
      prose-blockquote:pl-4
      prose-blockquote:italic
      prose-blockquote:text-chess-gray-600
      prose-table:border-collapse
      prose-th:border
      prose-th:border-chess-gray-300
      prose-th:bg-chess-gray-100
      prose-th:px-4
      prose-th:py-2
      prose-td:border
      prose-td:border-chess-gray-300
      prose-td:px-4
      prose-td:py-2
    "
    >
      <ReactMarkdown
        remarkPlugins={[remarkMath, remarkGfm, remarkBreaks]}
        rehypePlugins={[
          [
            rehypeKatex,
            {
              // KaTeX options
              displayMode: true,
              throwOnError: false,
              trust: true,
            },
          ],
        ]}
        components={{
          // カスタムコンポーネントで数式ブロックのセンタリングを実現
          div: ({ className, children, ...props }) => {
            if (className?.includes("math-display")) {
              return (
                <div className="flex justify-center my-6" {...props}>
                  {children}
                </div>
              );
            }
            return (
              <div className={className} {...props}>
                {children}
              </div>
            );
          },
          // インライン数式のスタイリング
          span: ({ className, children, ...props }) => {
            if (className?.includes("math-inline")) {
              return (
                <span className="mx-1" {...props}>
                  {children}
                </span>
              );
            }
            return (
              <span className={className} {...props}>
                {children}
              </span>
            );
          },
          // ヘッダーのマージン調整
          h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold mb-6 mt-8" {...props}>
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-bold mb-4 mt-6" {...props}>
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 className="text-xl font-bold mb-3 mt-5" {...props}>
              {children}
            </h3>
          ),
          // リストの改善
          ul: ({ children, ...props }) => (
            <ul className="list-disc list-inside mb-4 space-y-2" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-decimal list-inside mb-4 space-y-2" {...props}>
              {children}
            </ol>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
