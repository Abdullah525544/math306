import React, { useMemo } from 'react';
import katex from 'katex';

interface MathTextProps {
  /** If provided, renders this specific LaTeX string directly */
  math?: string;
  /** Whether to render in display/block mode (true) or inline mode (false) */
  block?: boolean;
  /**
   * If provided, parses markdown-style text with inline $...$ and block $$...$$ delimiters
   */
  text?: string;
  className?: string;
}

/**
 * Reusable KaTeX wrapper for inline, display, and mixed mathematical text
 */
export const MathText: React.FC<MathTextProps> = ({
  math,
  block = false,
  text,
  className = '',
}) => {
  // Direct math mode
  if (math !== undefined) {
    const html = useMemo(() => {
      try {
        return katex.renderToString(math, {
          displayMode: block,
          throwOnError: false,
          output: 'htmlAndMathml',
        });
      } catch (e) {
        console.warn('KaTeX render error:', e);
        return `<span class="text-rose-400 font-mono text-xs">${math}</span>`;
      }
    }, [math, block]);

    return (
      <span
        className={`${block ? 'block my-3 overflow-x-auto py-1 text-center' : 'inline-block mx-0.5'} ${className}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    );
  }

  // Mixed text mode with $ and $$
  const renderedContent = useMemo(() => {
    if (!text) return null;

    // Split text by $$...$$ and $...$
    // Regex splits by double dollars first, then single dollars
    const parts = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);

    return parts.map((part, index) => {
      if (part.startsWith('$$') && part.endsWith('$$')) {
        const rawFormula = part.slice(2, -2).trim();
        try {
          const blockHtml = katex.renderToString(rawFormula, {
            displayMode: true,
            throwOnError: false,
            output: 'htmlAndMathml',
          });
          return (
            <div
              key={index}
              className="my-3 overflow-x-auto text-center py-1"
              dangerouslySetInnerHTML={{ __html: blockHtml }}
            />
          );
        } catch {
          return (
            <div key={index} className="font-mono text-rose-400 text-xs my-2">
              {rawFormula}
            </div>
          );
        }
      } else if (part.startsWith('$') && part.endsWith('$')) {
        const rawFormula = part.slice(1, -1).trim();
        try {
          const inlineHtml = katex.renderToString(rawFormula, {
            displayMode: false,
            throwOnError: false,
            output: 'htmlAndMathml',
          });
          return (
            <span
              key={index}
              className="inline-block mx-0.5"
              dangerouslySetInnerHTML={{ __html: inlineHtml }}
            />
          );
        } catch {
          return (
            <span key={index} className="font-mono text-rose-400 text-xs">
              {rawFormula}
            </span>
          );
        }
      } else {
        // Plain text segment
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    });
  }, [text]);

  return <span className={className}>{renderedContent}</span>;
};

export default MathText;
