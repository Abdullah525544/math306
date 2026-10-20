import React, { useState } from 'react';
import { 
  Layers, 
  RotateCw, 
  CheckCircle2, 
  ArrowLeft, 
  ArrowRight, 
  Shuffle, 
  BookOpen,
  Sparkles,
  HelpCircle
} from 'lucide-react';
import { REVIEW_FLASHCARDS } from '../content/flashcards';
import { useProgress } from '../lib/progress';
import MathText from '../components/MathText';
import { SectionId } from '../types';

export const ReviewFlashcardsPage: React.FC = () => {
  const { progress, toggleFlashcard } = useProgress();

  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  const filteredCards = REVIEW_FLASHCARDS.filter((c) =>
    selectedSection === 'all' ? true : c.sectionId === selectedSection
  );

  const safeIndex = Math.min(currentCardIndex, Math.max(0, filteredCards.length - 1));
  const activeCard = filteredCards[safeIndex] || REVIEW_FLASHCARDS[0];

  const isMastered = progress.reviewedFlashcards.includes(activeCard.id);
  const masteredCount = progress.reviewedFlashcards.length;
  const masteredPercent = Math.round((masteredCount / 22) * 100);

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentCardIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    const randomIndex = Math.floor(Math.random() * filteredCards.length);
    setCurrentCardIndex(randomIndex);
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-violet/10 border border-brand-violet/30 text-brand-violet text-xs font-semibold">
          <Layers className="w-3.5 h-3.5" />
          <span>End-of-Chapter Synthesis • Pages 47–50</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          22 Conceptual Review Flashcards
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
          Based directly on the 22 textbook <strong className="text-white">“Questions to Guide Your Review”</strong>. Flip each card to test your conceptual recall, verify formulas, and solidify key takeaways.
        </p>

        {/* Mastery Tracker */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-xs font-mono">
            <span className="text-slate-400">Mastery Progress:</span>
            <div className="w-32 bg-slate-800 rounded-full h-2.5 overflow-hidden border border-slate-700">
              <div
                className="bg-brand-violet h-full transition-all duration-300 rounded-full"
                style={{ width: `${masteredPercent}%` }}
              />
            </div>
            <span className="font-bold text-brand-violet">
              {masteredCount} / 22 ({masteredPercent}%)
            </span>
          </div>

          {/* Section Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 text-xs">
            {[
              { id: 'all', label: 'All 22' },
              { id: 'section-1', label: 'Sec 1' },
              { id: 'section-2', label: 'Sec 2' },
              { id: 'section-3', label: 'Sec 3' },
              { id: 'section-4', label: 'Sec 4' },
              { id: 'section-5', label: 'Sec 5' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => {
                  setSelectedSection(f.id);
                  setCurrentCardIndex(0);
                  setIsFlipped(false);
                }}
                className={`px-3 py-1.5 rounded-lg font-mono font-bold border transition-colors ${
                  selectedSection === f.id
                    ? 'bg-brand-violet text-white border-brand-violet shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Flashcard Stage */}
      <div className="space-y-6">
        
        {/* Flashcard Component */}
        <div
          onClick={() => setIsFlipped(!isFlipped)}
          className="relative w-full min-h-[340px] sm:min-h-[380px] rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#151F32] to-[#090D16] border border-indigo-900/40 p-6 sm:p-10 shadow-2xl cursor-pointer hover:border-brand-mint/50 transition-all select-none flex flex-col justify-between group"
        >
          {/* Card Top: Number, Section & Flip Indicator */}
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
            <div className="flex items-center gap-2.5">
              <span className="w-8 h-8 rounded-xl bg-brand-violet/20 border border-brand-violet/30 flex items-center justify-center font-mono font-bold text-brand-violet text-sm">
                #{activeCard.number}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {activeCard.sectionRef} • {activeCard.pageRef}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {isMastered && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-mint px-2 py-0.5 rounded-full bg-brand-mint/10 border border-brand-mint/30">
                  <CheckCircle2 className="w-3 h-3" /> Mastered
                </span>
              )}
              <span className="inline-flex items-center gap-1 text-xs text-slate-400 font-mono group-hover:text-brand-mint transition-colors">
                <RotateCw className="w-3.5 h-3.5" />
                <span>Click to Flip</span>
              </span>
            </div>
          </div>

          {/* Card Middle: Content (Front vs Back) */}
          <div className="py-6 my-auto text-center space-y-4">
            {!isFlipped ? (
              /* FRONT OF CARD: QUESTION */
              <div className="space-y-4">
                <span className="text-xs font-bold text-brand-indigo uppercase tracking-wider block">
                  Question to Guide Your Review:
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white leading-relaxed max-w-xl mx-auto">
                  {activeCard.question}
                </h3>
                {activeCard.questionLatex && (
                  <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 font-mono text-center inline-block mx-auto max-w-full overflow-x-auto text-brand-mint">
                    <MathText math={activeCard.questionLatex} block />
                  </div>
                )}
                <p className="text-xs text-slate-500 font-mono pt-2">
                  (Think of your answer before flipping!)
                </p>
              </div>
            ) : (
              /* BACK OF CARD: DETAILED ANSWER */
              <div className="space-y-4 text-left max-w-2xl mx-auto">
                <span className="text-xs font-bold text-brand-mint uppercase tracking-wider block text-center sm:text-left">
                  Mathematical Answer & Explanation:
                </span>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-sans">
                  {activeCard.answer}
                </p>

                {activeCard.answerLatex && (
                  <div className="p-3 rounded-xl bg-[#090D16] border border-indigo-900/40 text-center font-mono my-2 text-brand-mint overflow-x-auto">
                    <MathText math={activeCard.answerLatex} block />
                  </div>
                )}

                {/* Key Takeaway */}
                <div className="p-3.5 rounded-xl bg-brand-violet/10 border border-brand-violet/30 text-xs text-slate-200 space-y-1">
                  <span className="font-bold text-brand-violet block uppercase tracking-wider text-[10px]">
                    Core Concept Takeaway:
                  </span>
                  <p>{activeCard.keyTakeaway}</p>
                </div>
              </div>
            )}
          </div>

          {/* Card Bottom: Navigation & Mastered Toggle */}
          <div
            className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs"
            onClick={(e) => e.stopPropagation()}
          >
            <span className="text-slate-400 font-mono">
              Card {safeIndex + 1} of {filteredCards.length}
            </span>

            <button
              type="button"
              onClick={() => toggleFlashcard(activeCard.id)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                isMastered
                  ? 'bg-brand-mint/15 text-brand-mint border-brand-mint/40 hover:bg-brand-mint/25'
                  : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>{isMastered ? 'Mastered' : 'Mark as Mastered'}</span>
            </button>
          </div>
        </div>

        {/* Carousel Controls */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <button
            type="button"
            onClick={handlePrev}
            className="min-h-[42px] inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-slate-200 hover:bg-slate-800 border border-slate-800 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Prev<span className="hidden sm:inline">ious Card</span></span>
          </button>

          <button
            type="button"
            onClick={handleShuffle}
            className="min-h-[42px] inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900/60 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Shuffle</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="min-h-[42px] inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs font-bold bg-brand-violet text-white hover:bg-violet-600 transition-colors shadow-md cursor-pointer"
          >
            <span>Next<span className="hidden sm:inline"> Card</span></span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>
    </div>
  );
};

export default ReviewFlashcardsPage;
