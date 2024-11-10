"use client";

import React from "react";
import ReactMarkdown, { Components } from "react-markdown";
import hljs from "highlight.js";

interface Props {
  text: string;
  className?: string;
}

export const Markdown: React.FC<Props> = ({ text, className }) => {
  const markdownComponents: Components = {
    h1: ({ node, ...props }) => (
      <h1
        className="border-b-[rgba(0,_0,_0,_.05)] border-b border-solid mb-6 font-bold leading-[40px] text-[40px] mt-8  pb-[10px]"
        {...props}
      />
    ),

    ol: ({ node, ...props }) => (
      <ol className="list-decimal list-inside break-words" {...props} />
    ),

    ul: ({ node, ...props }) => (
      <ul className="list-disc pl-[40px]" {...props} />
    ),

    a: ({ node, ...props }) => (
      <a
        className="text-primary hover:underline"
        {...props}
        target="_blank"
        rel="noopener noreferrer"
      />
    ),

    p: ({ node, ...props }) => <p className="mt-4 mb-4 text-wrap" {...props} />,

    img: ({ node, ...props }) => (
      <img
        className="w-full mt-4 mb-4 rounded-[15px]"
        src={props.src}
        alt={props.alt}
      />
    ),
  };

  React.useEffect(() => {
    hljs.highlightAll();
  }, []);
  return (
    <div className={className}>
      <ReactMarkdown
        className="mt-[30px] text-[20px] leading-[31px] animate"
        components={markdownComponents}
      >
        {text}
      </ReactMarkdown>
    </div>
  );
};
