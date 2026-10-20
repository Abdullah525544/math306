import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Compass, 
  BookOpen, 
  FlaskConical, 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  Clock, 
  BookmarkCheck,
  TrendingUp,
  Sparkles
} from 'lucide-react';
import { useProgress } from '../lib/progress';
import { SECTIONS_DATA } from '../content/sections';
import { SectionId } from '../types';

export const Dashboard: React.FC = () => {
  const { progress } = useProgress();

  const sectionsList = Object.values(SECTIONS_DATA);
  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  const lastSectionId: SectionId = progress.lastActiveSectionId || 'section-1';
  const lastSection = SECTIONS_DATA[lastSectionId] || SECTIONS_DATA['section-1'];

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0F172A] via-[#151F32] to-[#090D16] border border-indigo-900/30 p-6 sm:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-96 h-96 bg-brand-mint/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-10 w-80 h-80 bg-brand-indigo/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Strict Pre-Calculus Foundations (Math-306)</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Math Lab — <span className="bg-gradient-to-r from-brand-mint via-teal-300 to-brand-indigo bg-clip-text text-transparent">Preliminaries</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            Understand the idea. Explore the graph. Practise with confidence. An interactive, intuition-first learning environment strictly based on textbook chapter <strong className="text-white">Preliminaries (Sections 1–5, Pages 1–50)</strong>.
          </p>

          {/* Quick CTA Actions */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2">
            <Link
              to={`/section/${lastSectionId}`}
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-brand-mint text-slate-900 font-bold text-sm shadow-lg shadow-brand-mint/20 hover:bg-brand-mintHover active:scale-[0.98] transition-all w-full sm:w-auto"
            >
              <span>{completedCount > 0 ? 'Continue Learning' : 'Start Lesson 1'}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/lab"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-slate-200 text-sm font-semibold hover:bg-slate-800 transition-all w-full sm:w-auto"
            >
              <FlaskConical className="w-4 h-4 text-brand-mint" />
              <span>Explore Interactive Lab</span>
            </Link>

            <Link
              to="/overview"
              className="inline-flex items-center justify-center gap-2 min-h-[44px] px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-white transition-colors w-full sm:w-auto"
            >
              <BookOpen className="w-4 h-4 text-brand-indigo" />
              <span>Syllabus Map</span>
            </Link>
          </div>
        </div>

        {/* Live Progress Bar Banner */}
        <div className="mt-8 pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-400 block font-sans">Sections Completed</span>
            <span className="text-lg font-bold text-brand-mint font-mono mt-0.5 block">
              {completedCount} / 5
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-400 block font-sans">Syllabus Mastery</span>
            <span className="text-lg font-bold text-white font-mono mt-0.5 block">
              {progressPercent}%
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-400 block font-sans">Practice Accuracy</span>
            <span className="text-lg font-bold text-brand-indigo font-mono mt-0.5 block">
              {progress.totalAttempted > 0 ? `${progress.accuracyPercentage}%` : 'Not Started'}
            </span>
          </div>

          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
            <span className="text-slate-400 block font-sans">Review Cards Mastered</span>
            <span className="text-lg font-bold text-brand-violet font-mono mt-0.5 block">
              {progress.reviewedFlashcards.length} / 22
            </span>
          </div>
        </div>
      </section>

      {/* 5 Section Cards Grid */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800/80 pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-brand-indigo" />
              Chapter Sections (Math-306)
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Strictly faithful to textbook Preliminaries (Pages 1–50) with verified examples and zero calculus.
            </p>
          </div>

          <span className="text-xs font-mono text-slate-400 px-3 py-1 rounded-full bg-slate-800/80 border border-slate-700">
            {completedCount} of 5 Completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sectionsList.map((sec) => {
            const isCompleted = progress.completedLessons.includes(sec.id);
            const isBookmarked = progress.bookmarkedSections.includes(sec.id);

            return (
              <div
                key={sec.id}
                className={`flex flex-col justify-between rounded-2xl p-6 transition-all border group relative ${
                  isCompleted
                    ? 'bg-[#0F172A]/90 border-brand-mint/40 shadow-lg shadow-brand-mint/5'
                    : 'bg-[#0F172A]/70 border-slate-800 hover:border-slate-700 hover:bg-[#0F172A]'
                }`}
              >
                {/* Card Top: Section Number & Badge */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-brand-indigo/15 text-brand-indigo border border-brand-indigo/30">
                      Section {sec.sectionNumber}
                    </span>

                    <div className="flex items-center gap-2">
                      {isBookmarked && (
                        <span title="Bookmarked">
                          <BookmarkCheck className="w-4 h-4 text-amber-400" />
                        </span>
                      )}
                      {isCompleted ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-mint px-2 py-0.5 rounded-full bg-brand-mint/10 border border-brand-mint/30">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Completed
                        </span>
                      ) : (
                        <span className="text-[11px] text-slate-400 font-mono">
                          {sec.bookPages}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-white group-hover:text-brand-mint transition-colors">
                    {sec.title}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                    {sec.subtitle}
                  </p>

                  {/* Analogy Preview */}
                  <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800/80 text-xs space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-indigo tracking-wider block">
                      Intuitive Model: {sec.intuitiveAnalogy.title}
                    </span>
                    <p className="text-slate-300 text-[11px] line-clamp-2">
                      {sec.intuitiveAnalogy.text}
                    </p>
                  </div>
                </div>

                {/* Card Bottom Meta & Button */}
                <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>~{sec.estimatedMinutes} mins</span>
                  </div>

                  <Link
                    to={`/section/${sec.id}`}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all focus-visible:ring-2 focus-visible:ring-brand-mint ${
                      isCompleted
                        ? 'bg-slate-800 text-brand-mint hover:bg-slate-700'
                        : 'bg-brand-mint text-slate-900 hover:bg-brand-mintHover shadow-sm'
                    }`}
                  >
                    <span>{isCompleted ? 'Review Lesson' : 'Start Lesson'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* 6th Card: End of Chapter Review Card */}
          <div className="flex flex-col justify-between rounded-2xl p-6 bg-gradient-to-br from-indigo-950/40 to-slate-900 border border-brand-indigo/30 shadow-lg">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-brand-violet/20 text-brand-violet border border-brand-violet/30">
                  End of Chapter
                </span>
                <span className="text-[11px] text-slate-400 font-mono">Pages 47–50</span>
              </div>

              <h3 className="text-lg font-bold text-white">
                22 Review Flashcards & Practice Bank
              </h3>

              <p className="text-xs text-slate-300 leading-relaxed">
                Test your conceptual mastery of all 5 sections with the 22 textbook review questions and deterministic practice problem bank.
              </p>

              <div className="p-3 rounded-xl bg-[#090D16]/80 border border-slate-800 text-xs space-y-1">
                <span className="text-slate-400 block font-mono text-[11px]">
                  • 22 Questions to Guide Your Review
                </span>
                <span className="text-slate-400 block font-mono text-[11px]">
                  • Answers verified against A-35 to A-40
                </span>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800/80 flex items-center justify-between">
              <span className="text-xs text-slate-400 font-mono">Full Review</span>
              <Link
                to="/review"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-brand-indigo text-white hover:bg-brand-indigoHover transition-all shadow-sm"
              >
                <span>Open Flashcards</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Access Studio Links */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/lab"
          className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-mint/40 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-mint/10 border border-brand-mint/30 flex items-center justify-center text-brand-mint group-hover:scale-110 transition-transform">
            <FlaskConical className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-brand-mint transition-colors">
              Interactive Lab
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Search and explore all 5 interactive SVG visualizers with live mathematical sliders.
            </p>
          </div>
        </Link>

        <Link
          to="/practice"
          className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-indigo/40 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-indigo/10 border border-brand-indigo/30 flex items-center justify-center text-brand-indigo group-hover:scale-110 transition-transform">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-brand-indigo transition-colors">
              Practice Question Bank
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Beginner to challenge questions with progressive hints and step-by-step solutions.
            </p>
          </div>
        </Link>

        <Link
          to="/review"
          className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-brand-violet/40 transition-all group flex items-start gap-4"
        >
          <div className="w-10 h-10 rounded-xl bg-brand-violet/10 border border-brand-violet/30 flex items-center justify-center text-brand-violet group-hover:scale-110 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-white group-hover:text-brand-violet transition-colors">
              22 Review Flashcards
            </h4>
            <p className="text-xs text-slate-400 mt-1">
              Interactive flip-cards mapped directly to the textbook end-of-chapter review.
            </p>
          </div>
        </Link>
      </section>
    </div>
  );
};

export default Dashboard;
