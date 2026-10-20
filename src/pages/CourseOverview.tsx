import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Clock, 
  Target, 
  CheckCircle2, 
  ArrowRight, 
  FlaskConical, 
  HelpCircle,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { SECTIONS_DATA } from '../content/sections';
import { useProgress } from '../lib/progress';

export const CourseOverview: React.FC = () => {
  const { progress } = useProgress();
  const sectionsList = Object.values(SECTIONS_DATA);

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/30 text-brand-indigo text-xs font-semibold">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Complete Curriculum Map • Math-306</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Course Syllabus & Roadmap
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          A structured guide through the entire <strong className="text-white">Preliminaries</strong> chapter (Pages 1–50). Each section is engineered with intuition-first analogies, KaTeX formula cards, step-by-step worked examples, and interactive SVG graphical labs.
        </p>

        {/* Scope Guarantee Banner */}
        <div className="p-3.5 rounded-xl bg-slate-900/80 border border-brand-mint/30 flex items-start gap-3 text-xs">
          <ShieldCheck className="w-5 h-5 text-brand-mint shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-white block">Strict Pre-Calculus Chapter Boundary:</span>
            <p className="text-slate-300">
              Content strictly adheres to textbook chapter Sections 1 to 5, Pages 1–50, and Answers A-35 to A-40.
              Topics outside this chapter (such as limits, derivatives, or integrals) are intentionally excluded to ensure complete focus on foundational mastery.
            </p>
          </div>
        </div>
      </div>

      {/* Sections Syllabus List */}
      <div className="space-y-6">
        {sectionsList.map((sec) => {
          const isCompleted = progress.completedLessons.includes(sec.id);

          return (
            <div
              key={sec.id}
              className={`rounded-2xl border p-6 sm:p-8 transition-all ${
                isCompleted
                  ? 'bg-[#0F172A]/90 border-brand-mint/40 shadow-lg shadow-brand-mint/5'
                  : 'bg-[#0F172A]/70 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/80 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded bg-brand-indigo/20 text-brand-indigo border border-brand-indigo/30 font-mono text-xs font-bold">
                      Section {sec.sectionNumber}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      {sec.bookPages} • {sec.exerciseInfo}
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-white">
                    {sec.title}
                  </h2>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800">
                    <Clock className="w-3.5 h-3.5 text-brand-mint" />
                    <span>~{sec.estimatedMinutes} mins</span>
                  </div>

                  {isCompleted && (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-mint px-2.5 py-1 rounded-lg bg-brand-mint/10 border border-brand-mint/30">
                      <CheckCircle2 className="w-4 h-4" /> Completed
                    </span>
                  )}
                </div>
              </div>

              {/* Learning Goals */}
              <div className="py-4 space-y-3">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-brand-mint" />
                  Key Learning Goals:
                </h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
                  {sec.learningGoals.map((goal, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-mint mt-1.5 shrink-0" />
                      <span>{goal}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 text-xs text-slate-400 font-mono">
                  <span>{sec.workedExamples.length} Worked Examples</span>
                  <span>•</span>
                  <span>{sec.keyFormulas.length} Formulas</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/section/${sec.id}`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-brand-mint text-slate-900 hover:bg-brand-mintHover transition-all shadow-sm"
                  >
                    <span>{isCompleted ? 'Review Section' : 'Open Lesson'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  <Link
                    to="/practice"
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all border border-slate-700"
                  >
                    <HelpCircle className="w-3.5 h-3.5 text-brand-indigo" />
                    <span>Practice</span>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}

        {/* End of chapter review block */}
        <div className="rounded-2xl border border-brand-violet/30 bg-gradient-to-br from-indigo-950/30 to-slate-900 p-6 sm:p-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
            <div>
              <span className="px-2.5 py-0.5 rounded bg-brand-violet/20 text-brand-violet border border-brand-violet/30 font-mono text-xs font-bold">
                End of Chapter Review
              </span>
              <h2 className="text-xl font-bold text-white mt-1">
                22 Review Questions & Full Answer Key
              </h2>
            </div>
            <span className="text-xs text-slate-400 font-mono">
              Book Pages 47–50, Answers A-35 to A-40
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Consolidate your mastery with interactive flashcards covering all 22 conceptual review questions posed at the conclusion of the chapter, paired with deterministic problem solving.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <Link
              to="/review"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-brand-violet text-white hover:bg-violet-600 transition-all shadow-sm"
            >
              <span>Launch 22 Review Flashcards</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <Link
              to="/practice"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 transition-all border border-slate-700"
            >
              <HelpCircle className="w-3.5 h-3.5 text-brand-indigo" />
              <span>Full Question Bank</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseOverview;
