import React from "react";
import type { Components } from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { a11yDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import MarkdownComponent from "react-markdown";

const CustomComponents: Components = {
  // Headings with consistent styling matching PortableText
  h1: ({ children }) => (
    <h1 className="text-balance mb-6 mt-10 font-title text-4xl font-bold tracking-tight text-foreground first:mt-0">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-balance mb-4 mt-12 font-title text-3xl font-semibold tracking-tight text-foreground">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-3 mt-10 text-2xl font-semibold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  h4: ({ children }) => (
    <h4 className="mb-3 mt-8 text-xl font-semibold text-foreground">
      {children}
    </h4>
  ),
  // Paragraphs and text
  p: ({ children }) => (
    <p className="text-foreground/85 mb-5 text-[1.05rem] leading-8">
      {children}
    </p>
  ),
  // Lists
  ul: ({ children }) => (
    <ul className="text-foreground/85 mb-6 ml-6 list-disc space-y-3 text-[1.02rem] leading-8 marker:text-primary">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="text-foreground/85 mb-6 ml-6 list-decimal space-y-3 text-[1.02rem] leading-8 marker:text-primary">
      {children}
    </ol>
  ),
  li: ({ children }) => <li className="pl-2">{children}</li>,
  // Blockquotes
  blockquote: ({ children }) => (
    <blockquote className="my-8 rounded-none border-l-4 border-primary bg-primary/5 px-5 py-4 text-lg italic leading-8 text-foreground/80">
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
        className="font-medium text-primary underline decoration-primary/30 underline-offset-4 transition-colors hover:text-primary/80"
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
          className="break-words rounded-none border border-border/60 bg-muted px-1.5 py-1 text-[0.95em] text-foreground"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <div className="!mb-8 !mt-8 overflow-x-auto rounded-none border border-border/70">
        <SyntaxHighlighter
          className="rounded-none text-sm"
          language={match[1]}
          style={a11yDark}
          PreTag="div"
          customStyle={{
            margin: 0,
            padding: "1.25rem",
            fontSize: "14px",
          }}
        >
          {String(children).replace(/\n$/, "")}
        </SyntaxHighlighter>
      </div>
    );
  },
  // Strong and emphasis
  strong: ({ children }) => (
    <strong className="font-semibold text-foreground">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-foreground/80">{children}</em>
  ),
  // Horizontal rule
  hr: () => <hr className="my-10 border-border/80" />,
  // Tables
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-none border border-border/70">
      <table className="w-full border-collapse overflow-hidden">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-muted/70">{children}</thead>,
  tbody: ({ children }) => (
    <tbody className="divide-y divide-border/70">{children}</tbody>
  ),
  tr: ({ children }) => (
    <tr className="border-b border-border/70">{children}</tr>
  ),
  th: ({ children }) => (
    <th className="px-4 py-3 text-left text-sm font-semibold text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-4 py-3 text-sm leading-6 text-foreground/80">
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
    <div className={`prose prose-lg max-w-none text-foreground ${className}`}>
      <MarkdownComponent
        remarkPlugins={[remarkGfm]}
        components={CustomComponents}
      >
        {children}
      </MarkdownComponent>
    </div>
  );
}
