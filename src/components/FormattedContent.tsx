import React from 'react';
import MathText from './MathText';
import { AlertTriangle, Info } from 'lucide-react';

interface FormattedContentProps {
  content: string;
  className?: string;
}

interface BulletItem {
  text: string;
  isSub: boolean;
}

interface NumberedItem {
  number: string;
  text: string;
}

type ParsedBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'subheading'; text: string }
  | { type: 'bulletList'; items: BulletItem[] }
  | { type: 'numberedList'; items: NumberedItem[] }
  | { type: 'callout'; text: string; subType: 'warning' | 'info' | 'special' }
  | { type: 'displayMath'; text: string };

/**
 * Safely renders LaTeX math inside any text string ($...$ inline and $$...$$ display)
 * without breaking when nested inside bold markdown.
 */
const renderMathInString = (text: string, keyPrefix: string = '') => {
  if (!text) return null;
  const segments = text.split(/(\$\$[\s\S]*?\$\$|\$[^$\n]+?\$)/g);
  return segments.map((seg, i) => {
    if (seg.startsWith('$$') && seg.endsWith('$$') && seg.length > 4) {
      return <MathText key={`${keyPrefix}-dm-${i}`} math={seg.slice(2, -2).trim()} block />;
    }
    if (seg.startsWith('$') && seg.endsWith('$') && seg.length > 2) {
      return <MathText key={`${keyPrefix}-im-${i}`} math={seg.slice(1, -1).trim()} block={false} />;
    }
    return <span key={`${keyPrefix}-txt-${i}`}>{seg}</span>;
  });
};

/**
 * Parses markdown inline tokens:
 * - Bold: **text** (including any LaTeX math embedded inside it)
 * - Formulas: $...$ and $$...$$
 */
export const renderRichTextWithMath = (rawText: string) => {
  if (!rawText) return null;

  // Split on bold tokens (**...**)
  const boldParts = rawText.split(/(\*\*[^*]+?\*\*)/g);

  return boldParts.map((bPart, bIdx) => {
    if (bPart.startsWith('**') && bPart.endsWith('**') && bPart.length >= 4) {
      const inner = bPart.slice(2, -2);
      return (
        <strong key={`b-${bIdx}`} className="text-white font-bold tracking-tight">
          {renderMathInString(inner, `b-in-${bIdx}`)}
        </strong>
      );
    }
    return renderMathInString(bPart, `p-${bIdx}`);
  });
};

/**
 * Intelligent content formatter that renders a balanced mixture of:
 * - Clear, readable narrative paragraphs
 * - Grouped bullet lists with custom cyan/mint indicators
 * - Numbered procedural steps with stylish badges
 * - Sub-headings with mint accents
 * - Distinct callout / warning banners
 * - Formatted KaTeX mathematical displays
 */
export const FormattedContent: React.FC<FormattedContentProps> = ({ content, className = '' }) => {
  const blocks: ParsedBlock[] = [];
  const lines = content.split('\n');

  let activeParagraph = '';
  let activeBulletList: BulletItem[] | null = null;
  let activeNumberedList: NumberedItem[] | null = null;

  const flushParagraph = () => {
    if (activeParagraph.trim()) {
      blocks.push({ type: 'paragraph', text: activeParagraph.trim() });
      activeParagraph = '';
    }
  };

  const flushBulletList = () => {
    if (activeBulletList && activeBulletList.length > 0) {
      blocks.push({ type: 'bulletList', items: activeBulletList });
      activeBulletList = null;
    }
  };

  const flushNumberedList = () => {
    if (activeNumberedList && activeNumberedList.length > 0) {
      blocks.push({ type: 'numberedList', items: activeNumberedList });
      activeNumberedList = null;
    }
  };

  const flushAll = () => {
    flushParagraph();
    flushBulletList();
    flushNumberedList();
  };

  for (let i = 0; i < lines.length; i++) {
    const rawLine = lines[i];
    const trimmed = rawLine.trim();

    if (!trimmed) {
      flushAll();
      continue;
    }

    // 1. Display LaTeX $$...$$
    if (trimmed.startsWith('$$') && trimmed.endsWith('$$') && trimmed.length > 4) {
      flushAll();
      blocks.push({ type: 'displayMath', text: trimmed.slice(2, -2).trim() });
      continue;
    }

    // 2. Callout / Warning / Special Notes
    const isWarning =
      trimmed.includes('CRITICAL WARNING') ||
      trimmed.startsWith('**Warning') ||
      trimmed.startsWith('Warning:') ||
      trimmed.startsWith('**CRITICAL RULE');
    const isSpecial =
      trimmed.includes('Special Case:') ||
      trimmed.includes('A Word About Scales:');

    if (isWarning || isSpecial) {
      flushAll();
      blocks.push({
        type: 'callout',
        text: trimmed,
        subType: isWarning ? 'warning' : 'special',
      });
      continue;
    }

    // 3. Sub-bullet (indented with 2+ spaces followed by bullet/dash)
    const subBulletMatch = rawLine.match(/^\s{2,}([•\-\*])\s+(.+)$/);
    if (subBulletMatch) {
      flushParagraph();
      flushNumberedList();
      if (!activeBulletList) {
        activeBulletList = [];
      }
      activeBulletList.push({ text: subBulletMatch[2], isSub: true });
      continue;
    }

    // 4. Main bullet (starts with • or - or *)
    const bulletMatch = trimmed.match(/^([•\-\*])\s+(.+)$/);
    if (bulletMatch) {
      flushParagraph();
      flushNumberedList();
      if (!activeBulletList) {
        activeBulletList = [];
      }
      activeBulletList.push({ text: bulletMatch[2], isSub: false });
      continue;
    }

    // 5. Numbered item (starts with 1. or 1) )
    const numberMatch = trimmed.match(/^(\d+)[\.\)]\s+(.+)$/);
    if (numberMatch) {
      flushParagraph();
      flushBulletList();
      if (!activeNumberedList) {
        activeNumberedList = [];
      }
      activeNumberedList.push({ number: numberMatch[1], text: numberMatch[2] });
      continue;
    }

    // 6. Section Sub-heading within block (e.g., ends with ":" and is under 70 chars, or starts and ends with **...:**)
    const isSubheading =
      (trimmed.endsWith(':') && trimmed.length < 80 && !trimmed.includes('.')) ||
      (trimmed.startsWith('**') && trimmed.endsWith(':**')) ||
      trimmed.startsWith('Subsets of ') ||
      trimmed.startsWith('**The ') ||
      trimmed.startsWith('**The 4 Absolute');

    if (isSubheading) {
      flushAll();
      blocks.push({ type: 'subheading', text: trimmed });
      continue;
    }

    // 7. Regular narrative paragraph line
    flushBulletList();
    flushNumberedList();
    if (activeParagraph) {
      activeParagraph += ' ' + trimmed;
    } else {
      activeParagraph = trimmed;
    }
  }

  flushAll();

  return (
    <div className={`space-y-4 text-sm ${className}`}>
      {blocks.map((block, idx) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p key={idx} className="text-slate-300 leading-relaxed font-sans text-sm sm:text-base">
                {renderRichTextWithMath(block.text)}
              </p>
            );

          case 'subheading':
            return (
              <div key={idx} className="pt-2 pb-0.5 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-mint shrink-0 shadow-sm shadow-brand-mint/50" />
                <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-mint/90 font-mono">
                  {renderRichTextWithMath(block.text)}
                </h4>
              </div>
            );

          case 'bulletList':
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-950/40 border border-slate-800/70 p-3.5 sm:p-4 space-y-2.5 my-2 shadow-inner"
              >
                {block.items.map((item, itemIdx) => (
                  <div
                    key={itemIdx}
                    className={`flex items-start gap-3 ${
                      item.isSub
                        ? 'ml-4 sm:ml-6 pl-2.5 border-l border-slate-800/80 text-xs sm:text-sm'
                        : 'text-xs sm:text-sm'
                    }`}
                  >
                    {item.isSub ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-2 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-brand-mint mt-2 shrink-0 shadow-sm shadow-brand-mint/50" />
                    )}
                    <div className="text-slate-300 leading-relaxed flex-1">
                      {renderRichTextWithMath(item.text)}
                    </div>
                  </div>
                ))}
              </div>
            );

          case 'numberedList':
            return (
              <div
                key={idx}
                className="rounded-xl bg-slate-950/40 border border-slate-800/70 p-3.5 sm:p-4 space-y-3 my-2 shadow-inner"
              >
                {block.items.map((item, itemIdx) => (
                  <div key={itemIdx} className="flex items-start gap-3.5 text-xs sm:text-sm">
                    <span className="flex items-center justify-center w-5 h-5 rounded-md bg-brand-indigo/20 text-brand-indigo font-mono font-bold text-xs border border-brand-indigo/35 shrink-0 mt-0.5">
                      {item.number}
                    </span>
                    <div className="text-slate-200 leading-relaxed flex-1">
                      {renderRichTextWithMath(item.text)}
                    </div>
                  </div>
                ))}
              </div>
            );

          case 'callout':
            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border text-xs sm:text-sm leading-relaxed flex items-start gap-3.5 my-3 shadow-md ${
                  block.subType === 'warning'
                    ? 'bg-amber-500/10 border-amber-500/35 text-amber-200'
                    : 'bg-brand-indigo/10 border-brand-indigo/35 text-slate-200'
                }`}
              >
                {block.subType === 'warning' ? (
                  <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                ) : (
                  <Info className="w-5 h-5 text-brand-mint shrink-0 mt-0.5" />
                )}
                <div className="flex-1 space-y-1">
                  {renderRichTextWithMath(block.text)}
                </div>
              </div>
            );

          case 'displayMath':
            return (
              <div
                key={idx}
                className="my-3 p-3.5 sm:p-4 rounded-xl bg-[#090D16] border border-slate-800 text-center font-mono text-brand-mint shadow-inner overflow-x-auto"
              >
                <MathText math={block.text} block />
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};

export default FormattedContent;
