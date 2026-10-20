import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  CheckCircle2, 
  Bookmark, 
  BookmarkCheck, 
  ArrowLeft, 
  ArrowRight, 
  Clock, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  Lightbulb, 
  FlaskConical,
  HelpCircle,
  FileText,
  Target,
  Check
} from 'lucide-react';
import { SECTIONS_DATA } from '../content/sections';
import { SectionId } from '../types';
import { useProgress } from '../lib/progress';
import MathText from '../components/MathText';
import FormattedContent from '../components/FormattedContent';

// Import Section Tools
import { Section1Tools } from '../tools/Section1Tools';
import { Section2Tools } from '../tools/Section2Tools';
import { Section3Tools } from '../tools/Section3Tools';
import { Section4Tools } from '../tools/Section4Tools';
import { Section5Tools } from '../tools/Section5Tools';
import NumberLineTool from '../tools/NumberLineTool';
import CoordinateLineTool from '../tools/CoordinateLineTool';
import FunctionGrapherTool from '../tools/FunctionGrapherTool';
import GraphShiftTool from '../tools/GraphShiftTool';
import UnitCircleTrigTool from '../tools/UnitCircleTrigTool';

export const SectionLessonPage: React.FC = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const navigate = useNavigate();
  const { progress, completeLesson, toggleBookmark } = useProgress();

  const validSectionId: SectionId = (sectionId && SECTIONS_DATA[sectionId])
    ? (sectionId as SectionId)
    : 'section-1';

  const lesson = SECTIONS_DATA[validSectionId];

  // Active concept tab state ('all' or specific block index 0..N)
  const [activeConceptTab, setActiveConceptTab] = useState<number | 'all'>('all');

  // Expanded state for worked examples
  const [expandedExamples, setExpandedExamples] = useState<Record<string, boolean>>({
    [lesson.workedExamples[0]?.id || '']: true,
  });

  const toggleExample = (id: string) => {
    setExpandedExamples((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const isCompleted = progress.completedLessons.includes(validSectionId);
  const isBookmarked = progress.bookmarkedSections.includes(validSectionId);

  // Determine prev / next sections
  const sectionKeys: SectionId[] = ['section-1', 'section-2', 'section-3', 'section-4', 'section-5'];
  const currentIndex = sectionKeys.indexOf(validSectionId);
  const prevSectionId = currentIndex > 0 ? sectionKeys[currentIndex - 1] : null;
  const nextSectionId = currentIndex < sectionKeys.length - 1 ? sectionKeys[currentIndex + 1] : null;

  // Scroll to top on section change and reset concept tab
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveConceptTab('all');
    // Expand the first worked example by default
    if (lesson.workedExamples[0]) {
      setExpandedExamples({ [lesson.workedExamples[0].id]: true });
    }
  }, [validSectionId]);

  const scrollToStudio = () => {
    const el = document.getElementById('interactive-studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Render appropriate interactive tool per section
  const renderInteractiveTool = () => {
    switch (validSectionId) {
      case 'section-1':
        return <Section1Tools />;
      case 'section-2':
        return <Section2Tools />;
      case 'section-3':
        return <Section3Tools />;
      case 'section-4':
        return <Section4Tools />;
      case 'section-5':
        return <Section5Tools />;
      default:
        return <Section1Tools />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Breadcrumb & Section Navigation Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link to="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link to="/overview" className="hover:text-white transition-colors">Preliminaries</Link>
          <span>/</span>
          <span className="text-brand-mint font-semibold">Section {lesson.sectionNumber}</span>
        </div>

        {/* Quick Section Switcher Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
          {sectionKeys.map((secKey, idx) => {
            const isCurrent = secKey === validSectionId;
            const isDone = progress.completedLessons.includes(secKey);
            return (
              <Link
                key={secKey}
                to={`/section/${secKey}`}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold transition-all border ${
                  isCurrent
                    ? 'bg-brand-mint text-slate-900 border-brand-mint shadow-sm'
                    : isDone
                    ? 'bg-slate-900/80 text-brand-mint border-brand-mint/30 hover:bg-slate-800'
                    : 'bg-slate-900/60 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                Sec {idx + 1}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Main 2-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Lesson Explanations, Interactive Tool & Worked Examples */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Section Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-brand-indigo/20 text-brand-indigo border border-brand-indigo/30 font-mono text-xs font-bold">
                Section {lesson.sectionNumber}
              </span>
              <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                {lesson.bookPages}
              </span>
              <span className="text-xs text-slate-400 font-mono bg-slate-900 px-2.5 py-1 rounded-full border border-slate-800">
                {lesson.exerciseInfo}
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              {lesson.title}
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-sans">
              {lesson.subtitle}
            </p>

            {/* Mobile Quick Action Bar (Visible only on mobile/tablet screens < lg) */}
            <div className="flex items-center gap-2.5 pt-1 lg:hidden">
              <button
                type="button"
                onClick={() => completeLesson(validSectionId)}
                className={`flex-1 min-h-[42px] px-4 py-2 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isCompleted
                    ? 'bg-brand-mint text-slate-900 shadow-md'
                    : 'bg-slate-900 text-slate-200 border border-slate-700 hover:border-brand-mint'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Completed ✓' : 'Mark Section Complete'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleBookmark(validSectionId)}
                className={`min-h-[42px] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-all cursor-pointer ${
                  isBookmarked
                    ? 'bg-brand-indigo/20 text-brand-indigo border-brand-indigo/40'
                    : 'bg-slate-900 text-slate-400 border-slate-800'
                }`}
                title={isBookmarked ? 'Bookmarked' : 'Bookmark Section'}
              >
                {isBookmarked ? <BookmarkCheck className="w-4 h-4 text-brand-indigo" /> : <Bookmark className="w-4 h-4" />}
                <span className="hidden sm:inline">{isBookmarked ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>

          {/* Key Learning Objectives Checklist (Structured Points) */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-mint flex items-center gap-2">
                <Target className="w-4 h-4 text-brand-mint" />
                Key Learning Objectives ({lesson.learningGoals.length} Core Concepts)
              </span>
              <span className="text-[11px] font-mono text-slate-500">
                Foundational Checklist
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {lesson.learningGoals.map((goal, gIdx) => (
                <div
                  key={gIdx}
                  className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-950/60 border border-slate-800/80 text-xs text-slate-300"
                >
                  <div className="w-4 h-4 rounded-md bg-brand-mint/15 text-brand-mint flex items-center justify-center shrink-0 mt-0.5 border border-brand-mint/30">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span className="leading-relaxed flex-1">{goal}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Intuitive Analogy Card ("Understand the Idea") */}
          <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-slate-900 to-[#0F172A] border border-brand-indigo/30 space-y-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-brand-mint text-xs font-bold uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-brand-mint" />
                <span>Intuitive Mental Model</span>
              </div>
              <span className="text-[11px] px-2 py-0.5 rounded bg-brand-mint/10 text-brand-mint font-mono font-bold">
                Intuition First
              </span>
            </div>

            <h3 className="text-base font-bold text-white">
              {lesson.intuitiveAnalogy.title}
            </h3>

            <p className="text-sm text-slate-200 leading-relaxed font-sans">
              {lesson.intuitiveAnalogy.text}
            </p>
          </div>

          {/* Detailed Explanation Blocks */}
          <div className="space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-brand-indigo" />
                <span>Core Concepts & Mathematical Rigor</span>
              </h2>

              <button
                type="button"
                onClick={scrollToStudio}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-mint/10 hover:bg-brand-mint/20 text-brand-mint text-xs font-semibold border border-brand-mint/30 transition-all shrink-0 self-start sm:self-auto cursor-pointer"
              >
                <FlaskConical className="w-3.5 h-3.5" />
                <span>Jump to Interactive Studio ↓</span>
              </button>
            </div>

            {/* Concept Topic Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 pt-0.5 scrollbar-none">
              <button
                type="button"
                onClick={() => setActiveConceptTab('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  activeConceptTab === 'all'
                    ? 'bg-brand-mint text-slate-950 font-bold shadow-sm'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                All Topics ({lesson.explanationBlocks.length})
              </button>
              {lesson.explanationBlocks.map((block, bIdx) => {
                const isSelected = activeConceptTab === bIdx;
                const cleanHeading = block.heading.replace(/^\d+[\.\)]\s*/, '').split(/[,&—:]/)[0].trim();
                return (
                  <button
                    key={bIdx}
                    type="button"
                    onClick={() => setActiveConceptTab(bIdx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                      isSelected
                        ? 'bg-brand-indigo text-white font-bold shadow-sm'
                        : 'bg-slate-950/60 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    <span className="w-4 h-4 rounded-full bg-slate-800/80 text-[10px] font-mono flex items-center justify-center">
                      {bIdx + 1}
                    </span>
                    <span>{cleanHeading}</span>
                  </button>
                );
              })}
            </div>

            {/* Render Selected Block(s) */}
            <div className="space-y-5">
              {(activeConceptTab === 'all'
                ? lesson.explanationBlocks.map((block, idx) => ({ block, originalIdx: idx }))
                : [{ block: lesson.explanationBlocks[activeConceptTab], originalIdx: activeConceptTab }]
              ).map(({ block, originalIdx }) => (
                <div
                  key={originalIdx}
                  className="p-5 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800/90 space-y-4 shadow-sm"
                >
                  <div className="flex items-center gap-2.5 border-b border-slate-800/60 pb-3">
                    <span className="w-6 h-6 rounded-lg bg-brand-indigo/20 text-brand-indigo text-xs font-mono font-bold flex items-center justify-center border border-brand-indigo/35 shrink-0">
                      {originalIdx + 1}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {block.heading.replace(/^\d+[\.\)]\s*/, '')}
                    </h3>
                  </div>

                  {/* Formatted Content with mixture of narrative paragraphs, grouped bullet cards, numbered procedural steps, and callout blocks */}
                  <FormattedContent content={block.body} />

                  {block.formulaLatex && (
                    <div className="p-3.5 sm:p-4 rounded-xl bg-[#090D16] border border-indigo-950/80 shadow-inner space-y-1.5 overflow-x-auto">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                        Key Formula Reference
                      </span>
                      <div className="text-brand-mint py-0.5">
                        <MathText math={block.formulaLatex} block />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Embedded Interactive Mathematical Tool */}
          <div id="interactive-studio" className="space-y-3 pt-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <FlaskConical className="w-4 h-4 text-brand-mint" />
              Interactive Mathematical Studio
            </h2>
            <div className="overflow-hidden">
              {renderInteractiveTool()}
            </div>
          </div>

          {/* Expandable Step-by-Step Worked Examples */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-brand-indigo" />
                Step-by-Step Worked Examples
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                {lesson.workedExamples.length} Examples
              </span>
            </div>

            {lesson.workedExamples.map((ex) => {
              const isOpen = !!expandedExamples[ex.id];

              return (
                <div
                  key={ex.id}
                  className="rounded-2xl bg-[#0F172A] border border-slate-800 overflow-hidden transition-all shadow-md"
                >
                  {/* Example Header Clickable */}
                  <button
                    type="button"
                    onClick={() => toggleExample(ex.id)}
                    className="w-full p-4 sm:p-5 flex items-start justify-between gap-4 text-left hover:bg-slate-800/40 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-brand-mint/15 text-brand-mint border border-brand-mint/30 font-mono text-[11px] font-bold">
                          {ex.sourceLabel === 'textbook' ? 'Textbook Example' : 'Extra Practice'}
                        </span>
                        {ex.sourceLocation && (
                          <span className="text-[11px] text-slate-400 font-mono">
                            {ex.sourceLocation}
                          </span>
                        )}
                      </div>
                      <h4 className="text-sm sm:text-base font-bold text-white">
                        {ex.prompt}
                      </h4>
                    </div>

                    <div className="p-1.5 rounded-lg bg-slate-800 text-slate-300 shrink-0">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </div>
                  </button>

                  {/* Expanded Steps */}
                  {isOpen && (
                    <div className="p-4 sm:p-6 border-t border-slate-800 bg-[#090D16]/50 space-y-4">
                      <div className="space-y-3">
                        {ex.steps.map((st) => (
                          <div key={st.stepNumber} className="flex items-start gap-3 text-xs sm:text-sm">
                            <span className="w-6 h-6 rounded-full bg-slate-800 text-brand-mint border border-slate-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                              {st.stepNumber}
                            </span>
                            <div className="space-y-1.5 flex-1">
                              <p className="text-slate-300 font-sans">{st.explanation}</p>
                              {st.expressionLatex && (
                                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-center overflow-x-auto">
                                  <MathText math={st.expressionLatex} block />
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Final Answer Banner */}
                      <div className="p-3.5 rounded-xl bg-brand-mint/10 border border-brand-mint/30 flex items-center justify-between text-xs sm:text-sm font-mono">
                        <span className="text-brand-mint font-sans font-bold">Final Answer:</span>
                        <span className="font-bold text-white">
                          {ex.finalAnswerLatex ? (
                            <MathText math={ex.finalAnswerLatex} />
                          ) : (
                            ex.finalAnswer
                          )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Common Mistakes to Avoid */}
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/80 border border-rose-900/30 space-y-4">
            <h3 className="text-sm font-bold text-rose-300 flex items-center gap-2 uppercase tracking-wider">
              <AlertTriangle className="w-4 h-4 text-rose-400" />
              Common Student Pitfalls & Corrections
            </h3>

            <div className="space-y-3">
              {lesson.commonMistakes.map((m, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#090D16] border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-start gap-2">
                    <span className="text-rose-400 font-bold">❌ Mistake:</span>
                    <span className="text-slate-300">{m.mistake}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-brand-mint font-bold">✅ Correction:</span>
                    <span className="text-slate-200">{m.correction}</span>
                  </div>
                  <p className="text-[11px] text-slate-500 italic pl-6">
                    Why: {m.why}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Next / Prev Navigation */}
          <div className="pt-6 border-t border-slate-800 flex items-center justify-between gap-4">
            {prevSectionId ? (
              <Link
                to={`/section/${prevSectionId}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Previous Section</span>
              </Link>
            ) : (
              <div />
            )}

            {nextSectionId ? (
              <Link
                to={`/section/${nextSectionId}`}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-mint text-slate-900 hover:bg-brand-mintHover transition-colors shadow-sm"
              >
                <span>Next Section</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            ) : (
              <Link
                to="/practice"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-indigo text-white hover:bg-brand-indigoHover transition-colors shadow-sm"
              >
                <span>Proceed to Practice</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>

        </div>

        {/* Right Sticky Sidebar: Key Formulas & Quick Controls */}
        <aside className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
          
          {/* Action Card: Mark Complete & Bookmark */}
          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Lesson Controls
            </span>

            <div className="space-y-2">
              <button
                type="button"
                onClick={() => completeLesson(validSectionId)}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                  isCompleted
                    ? 'bg-brand-mint/15 text-brand-mint border border-brand-mint/40 hover:bg-brand-mint/25'
                    : 'bg-brand-mint text-slate-900 hover:bg-brand-mintHover shadow-md shadow-brand-mint/10'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>{isCompleted ? 'Completed (Click to Undo)' : 'Mark Section Complete'}</span>
              </button>

              <button
                type="button"
                onClick={() => toggleBookmark(validSectionId)}
                className={`w-full py-2 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all border ${
                  isBookmarked
                    ? 'bg-amber-500/10 text-amber-300 border-amber-500/30 hover:bg-amber-500/20'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:bg-slate-800'
                }`}
              >
                {isBookmarked ? (
                  <>
                    <BookmarkCheck className="w-4 h-4 text-amber-400" />
                    <span>Bookmarked for Review</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-slate-400" />
                    <span>Bookmark Section</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> ~{lesson.estimatedMinutes} mins
              </span>
              <span>{lesson.bookPages}</span>
            </div>
          </div>

          {/* Key Formula Cards */}
          <div className="p-5 rounded-2xl bg-[#0F172A] border border-slate-800 space-y-4 shadow-xl">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              Key Formula Reference Cards
            </span>

            <div className="space-y-3">
              {lesson.keyFormulas.map((formula, idx) => (
                <div key={idx} className="p-3.5 rounded-xl bg-[#090D16] border border-indigo-900/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{formula.title}</span>
                    {formula.ruleOrName && (
                      <span className="text-[10px] text-brand-indigo font-mono">
                        {formula.ruleOrName}
                      </span>
                    )}
                  </div>
                  <div className="p-2 rounded bg-slate-950 font-mono text-center text-xs overflow-x-auto text-brand-mint">
                    <MathText math={formula.latex} block />
                  </div>
                  <p className="text-[11px] text-slate-400 leading-snug">
                    {formula.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Practice Link */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-brand-indigo/30 space-y-2 text-xs">
            <span className="font-bold text-white block">Ready to test yourself?</span>
            <p className="text-slate-300 text-[11px]">
              Solve verified textbook problems with progressive hints and instant answer checking.
            </p>
            <Link
              to="/practice"
              className="inline-flex items-center gap-1.5 font-bold text-brand-mint hover:underline pt-1"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Open Section {lesson.sectionNumber} Practice Questions</span>
            </Link>
          </div>

        </aside>

      </div>
    </div>
  );
};

export default SectionLessonPage;
