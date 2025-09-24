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
    <ul className="mb-6 ml-6 list-disc space-y-2 text-gray-700 marker:text-blue-500 dark:text-gray-300 dark:marker:text-blue-400">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-6 ml-6 list-decimal space-y-2 text-gray-700 marker:text-blue-500 dark:text-gray-300 dark:marker:text-blue-400">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-2 leading-7">{children}</li>,
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
          className="mb-4 break-words rounded bg-neutral-200 px-1.5 py-1 text-sm text-gray-800 dark:bg-gray-800 dark:text-gray-200"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="!mb-4 !mt-4 overflow-x-auto">
        <SyntaxHighlighter
          className="rounded-lg text-sm"
          language={match[1]}
          style={a11yDark}
          PreTag="div"
          customStyle={{ 
            margin: 0,
            padding: '1rem',
            fontSize: '14px',
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
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
  // Tables
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto">
      <table className="w-full border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-gray-100 dark:bg-gray-800">{children}</thead>
  ),
  tbody: ({ children }) => (
    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
      {children}
    </tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-gray-200 dark:border-gray-700">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm text-gray-700 dark:text-gray-300">
      {children}
    </td>
  ),
};

interface MarkdownProps {
  children?: string | null | undefined;
  className?: string;
}

export default function Markdown({ children, className = "" }: MarkdownProps) {
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
