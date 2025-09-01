import React from "react";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import MarkdownComponent from "react-markdown";

const CustomComponents: Components = {
  // Headings with consistent styling matching PortableText
  h1: ({ children }) => (
    <h1 className="mb-4 text-4xl font-bold text-gray-900 dark:text-white">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="mb-3 text-3xl font-semibold text-gray-900 dark:text-white">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-2 text-2xl font-semibold text-gray-900 dark:text-white">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-2 text-xl font-semibold text-gray-900 dark:text-white">
      {children}
    </h4>
  ),
  // Paragraphs and text
  p: ({ children }) => (
    <p className="mb-4 leading-7 text-gray-700 dark:text-gray-300">
      {children}
    </p>
  ),
  // Lists
  ul: ({ children }) => (
    <ul className="mb-4 list-inside list-disc text-gray-700 dark:text-gray-300">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-4 list-inside list-decimal text-gray-700 dark:text-gray-300">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="mb-1">{children}</li>,
  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="my-4 border-l-4 border-blue-500 pl-4 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  // Links
  a: ({ href, children }) => {
    const rel = !href?.startsWith("/") ? "noreferrer noopener" : undefined;
    return (
      <a
        href={href}
        rel={rel}
        className="text-blue-600 hover:underline dark:text-blue-400"
        target={!href?.startsWith("/") ? "_blank" : undefined}
      >
        {children}
      </a>
    );
  },
  // Code blocks and inline code
  code: ({ node, className, children, ...props }) => {
    const match = /^language-(\w+)/.exec(className || "");
    const isInline = !match;
    
    if (isInline) {
      return (
        <code 
          className="rounded bg-gray-100 px-1 py-0.5 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200 mb-4"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        className="!mb-4 !mt-4 rounded-lg"
        language={match[1]}
        style={a11yDark}
        PreTag="div"
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  },
  // Strong and emphasis
  strong: ({ children }) => (
    <strong className="font-semibold text-gray-900 dark:text-white">
      {children}
    </strong>
  ),
  em: ({ children }) => (
    <em className="italic text-gray-700 dark:text-gray-300">{children}</em>
  ),
  // Horizontal rule
  hr: () => <hr className="my-8 border-gray-300 dark:border-gray-700" />,
};

interface MarkdownProps {
  children?: string | null | undefined;
  className?: string;
}

export default function Markdown({
  children,
  className = "",
}: MarkdownProps) {
  if (!children) return null;
  
  return (
    <div className={`prose prose-lg dark:prose-invert max-w-none ${className}`}>
      <MarkdownComponent
        remarkPlugins={[remarkGfm]}
        components={CustomComponents}
      >
        {children}
      </MarkdownComponent>
    </div>
  );
}
