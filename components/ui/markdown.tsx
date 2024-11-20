import React, { Children } from "react";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import MarkdownComponent from "react-markdown";

const CustomComponents: Components = {
  p: ({ children }) => <p className="mb-4 break-words">{children}</p>,
  li: ({ children }) => <li className="">{children}</li>,
  ul: ({ children }) => <ul className="mb-4 list-disc pl-6">{children}</ul>,
  h2: ({ children }) => <h2 className="my-2 text-2xl font-bold">{children}</h2>,
  h4: ({ children }) => <h4 className="text-xl">{children}</h4>,
  strong: ({ children }) => <strong className="text-lg">{children}</strong>,
  hr: () => <hr className="md-post-hr" />,
  code: ({ node, className, children, style, ...props }) => {
    const match = /language-(\w+)/.exec(className || "");
    return (
      <SyntaxHighlighter
        className="!mb-4 !mt-0 rounded-md !p-6"
        language={match?.[1]}
        style={a11yDark}
        PreTag="div"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
};

export default function Markdown({
  children,
}: {
  children?: string | null | undefined;
}) {
  return (
    <MarkdownComponent
      remarkPlugins={[remarkGfm]} // Allows us to have embedded HTML tags in our markdown
      components={CustomComponents}
      className="mt-8 w-[100vw-4rem] break-all rounded bg-slate-100 p-3 dark:bg-slate-900 md:px-12 md:py-8"
    >
      {children}
    </MarkdownComponent>
  );
}
