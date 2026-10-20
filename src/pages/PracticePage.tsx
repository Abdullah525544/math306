import React, { useState } from 'react';
import { 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Lightbulb, 
  FileText, 
  RotateCcw, 
  Filter, 
  Check, 
  AlertCircle,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';
import { PRACTICE_QUESTIONS } from '../content/questions';
import { PracticeQuestion, SectionId, DifficultyLevel } from '../types';
import { checkNumericAnswer, checkIntervalAnswer } from '../lib/math';
import { useProgress } from '../lib/progress';
import MathText from '../components/MathText';

export const PracticePage: React.FC = () => {
  const { progress, logAttempt } = useProgress();

  // Filters
  const [selectedSection, setSelectedSection] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  // Question State trackers
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [revealedHints, setRevealedHints] = useState<Record<string, number>>({});
  const [revealedSolutions, setRevealedSolutions] = useState<Record<string, boolean>>({});
  const [attemptResults, setAttemptResults] = useState<Record<string, { isCorrect: boolean; feedback: string }>>({});

  const filteredQuestions = PRACTICE_QUESTIONS.filter((q) => {
    let matchesSec = false;
    if (selectedSection === 'all') {
      matchesSec = true;
    } else if (selectedSection === 'capstone') {
      matchesSec = q.id.startsWith('cap');
    } else {
      matchesSec = q.sectionId === selectedSection;
    }
    const matchesDiff = selectedDifficulty === 'all' || q.difficulty === selectedDifficulty;
    return matchesSec && matchesDiff;
  });

  const handleInputChange = (questionId: string, val: string) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: val }));
  };

  const handleRevealNextHint = (questionId: string, maxHints: number) => {
    const current = revealedHints[questionId] || 0;
    if (current < maxHints) {
      setRevealedHints((prev) => ({ ...prev, [questionId]: current + 1 }));
    }
  };

  const handleToggleSolution = (questionId: string) => {
    setRevealedSolutions((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleCheckAnswer = (q: PracticeQuestion) => {
    const ans = (userAnswers[q.id] || '').trim();
    if (!ans) return;

    let isCorrect = false;

    if (q.answerType === 'multiple-choice') {
      isCorrect = q.acceptedAnswers.some(
        (accepted) => accepted.trim().toLowerCase() === ans.toLowerCase()
      );
    } else if (q.answerType === 'interval') {
      isCorrect = q.acceptedAnswers.some((accepted) => checkIntervalAnswer(ans, accepted));
    } else {
      isCorrect = checkNumericAnswer(ans, q.acceptedAnswers, q.tolerance || 0.01);
    }

    const feedback = isCorrect
      ? 'Correct! Excellent mathematical reasoning.'
      : 'Not quite. Check your algebra or examine the progressive hints below.';

    setAttemptResults((prev) => ({
      ...prev,
      [q.id]: { isCorrect, feedback },
    }));

    // Record attempt in user progress
    const hintsCount = revealedHints[q.id] || 0;
    logAttempt(q.id, ans, isCorrect, hintsCount);
  };

  const handleResetQuestion = (qId: string) => {
    setUserAnswers((prev) => ({ ...prev, [qId]: '' }));
    setAttemptResults((prev) => {
      const copy = { ...prev };
      delete copy[qId];
      return copy;
    });
    setRevealedHints((prev) => ({ ...prev, [qId]: 0 }));
    setRevealedSolutions((prev) => ({ ...prev, [qId]: false }));
  };

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-indigo/10 border border-brand-indigo/30 text-brand-indigo text-xs font-semibold">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Deterministic Question Bank</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Practice & Self-Assessment
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Sharpen your skills with questions verified directly against the textbook exercises (Sections 1–5, Pages 1–50) and Answer Key (A-35 to A-40).
        </p>

        {/* Live Score Banner */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs font-mono">
          <div className="flex items-center gap-4">
            <div>
              <span className="text-slate-400 block font-sans">Total Solved:</span>
              <span className="text-base font-bold text-white">{progress.totalAttempted}</span>
            </div>
            <div className="pl-4 border-l border-slate-800">
              <span className="text-slate-400 block font-sans">Correct Answers:</span>
              <span className="text-base font-bold text-brand-mint">{progress.totalCorrect}</span>
            </div>
            <div className="pl-4 border-l border-slate-800">
              <span className="text-slate-400 block font-sans">Accuracy:</span>
              <span className="text-base font-bold text-brand-indigo">
                {progress.totalAttempted > 0 ? `${progress.accuracyPercentage}%` : '0%'}
              </span>
            </div>
          </div>

          <span className="text-slate-400 font-sans text-xs flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-brand-mint" /> 100% Deterministic Browser Evaluation
          </span>
        </div>

        {/* Filter Controls */}
        <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          {/* Section Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none flex-nowrap text-xs w-full sm:w-auto">
            <span className="text-slate-400 font-semibold mr-1 font-mono shrink-0">Section:</span>
            {[
              { id: 'all', label: 'All' },
              { id: 'section-1', label: 'Sec 1' },
              { id: 'section-2', label: 'Sec 2' },
              { id: 'section-3', label: 'Sec 3' },
              { id: 'section-4', label: 'Sec 4' },
              { id: 'section-5', label: 'Sec 5' },
              { id: 'capstone', label: 'Capstone' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSelectedSection(f.id)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl font-mono font-bold border transition-colors shrink-0 cursor-pointer ${
                  selectedSection === f.id
                    ? 'bg-brand-mint text-slate-900 border-brand-mint shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* Difficulty Filter */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none flex-nowrap text-xs w-full sm:w-auto">
            <span className="text-slate-400 font-semibold mr-1 font-mono shrink-0">Difficulty:</span>
            {['all', 'Beginner', 'Intermediate', 'Challenge'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setSelectedDifficulty(d)}
                className={`min-h-[38px] px-3.5 py-1.5 rounded-xl font-bold border transition-colors shrink-0 cursor-pointer ${
                  selectedDifficulty === d
                    ? 'bg-brand-indigo text-white border-brand-indigo shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {d === 'all' ? 'All' : d}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-6">
        {filteredQuestions.map((q, qIndex) => {
          const attempt = attemptResults[q.id];
          const hintsCount = revealedHints[q.id] || 0;
          const isSolOpen = !!revealedSolutions[q.id];

          return (
            <div
              key={q.id}
              className={`rounded-2xl border p-6 transition-all ${
                attempt?.isCorrect
                  ? 'bg-[#0F172A]/90 border-brand-mint/40 shadow-lg shadow-brand-mint/5'
                  : 'bg-[#0F172A]/70 border-slate-800'
              }`}
            >
              {/* Question Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-slate-800 text-slate-300 font-mono text-xs font-bold border border-slate-700">
                    Q{qIndex + 1}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                      q.difficulty === 'Beginner'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : q.difficulty === 'Intermediate'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                    }`}
                  >
                    {q.difficulty}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    {q.topic}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1 text-[11px] font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
                    <ShieldCheck className="w-3 h-3 text-brand-mint" />
                    {q.sourceReference}
                  </span>
                </div>
              </div>

              {/* Prompt */}
              <div className="py-4 space-y-2">
                <p className="text-sm sm:text-base text-white font-medium">
                  {q.prompt}
                </p>
                {q.promptLatex && (
                  <div className="p-3 rounded-xl bg-[#090D16] border border-indigo-900/30 text-center font-mono my-2">
                    <MathText math={q.promptLatex} block />
                  </div>
                )}
              </div>

              {/* Multiple Choice Options if available */}
              {q.options && q.options.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pb-3">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = (userAnswers[q.id] || '').trim().toLowerCase() === opt.trim().toLowerCase();
                    return (
                      <button
                        key={optIdx}
                        type="button"
                        onClick={() => handleInputChange(q.id, opt)}
                        className={`p-3 rounded-xl border text-left text-xs font-medium transition-all ${
                          isSelected
                            ? 'bg-brand-mint/15 border-brand-mint text-brand-mint font-bold ring-1 ring-brand-mint'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700 hover:text-white'
                        }`}
                      >
                        <span className="font-mono text-slate-500 mr-2">{String.fromCharCode(65 + optIdx)}.</span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Answer Entry Form */}
              <div className="pt-2 pb-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder={
                      q.options && q.options.length > 0
                        ? 'Select an option above or type answer'
                        : q.answerType === 'interval'
                        ? 'Enter interval e.g. (-inf, 6) or [-1, 4]'
                        : 'Enter numerical value (e.g. 5, -40, 2)'
                    }
                    value={userAnswers[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') handleCheckAnswer(q);
                    }}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#090D16] border border-slate-800 focus:border-brand-mint focus:outline-none text-sm text-white font-mono placeholder-slate-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleCheckAnswer(q)}
                  className="px-5 py-2.5 rounded-xl bg-brand-mint text-slate-900 font-bold text-xs hover:bg-brand-mintHover transition-colors shadow-sm focus-visible:ring-2 focus-visible:ring-brand-mint shrink-0"
                >
                  Check Answer
                </button>

                <button
                  type="button"
                  onClick={() => handleResetQuestion(q.id)}
                  title="Reset question"
                  className="p-2.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors border border-slate-700 shrink-0"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>

              {/* Feedback Message */}
              {attempt && (
                <div
                  className={`p-3 rounded-xl border text-xs flex items-center gap-2 mb-4 ${
                    attempt.isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                      : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                  }`}
                >
                  {attempt.isCorrect ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  ) : (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                  <span>{attempt.feedback}</span>
                </div>
              )}

              {/* Progressive Hints Section */}
              <div className="pt-3 border-t border-slate-800/80 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => handleRevealNextHint(q.id, q.hints.length)}
                      disabled={hintsCount >= q.hints.length}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold transition-colors border ${
                        hintsCount >= q.hints.length
                          ? 'bg-slate-900 text-slate-500 border-slate-800 cursor-not-allowed'
                          : 'bg-slate-800 text-amber-300 hover:bg-slate-700 border-slate-700'
                      }`}
                    >
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {hintsCount === 0
                          ? 'Need a Hint?'
                          : hintsCount < q.hints.length
                          ? `Reveal Next Hint (${hintsCount}/${q.hints.length})`
                          : 'All Hints Revealed'}
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleToggleSolution(q.id)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-semibold bg-slate-800 text-brand-indigo hover:bg-slate-700 transition-colors border border-slate-700"
                    >
                      <FileText className="w-3.5 h-3.5 text-brand-indigo" />
                      <span>{isSolOpen ? 'Hide Solution' : 'Step-by-Step Solution'}</span>
                    </button>
                  </div>
                </div>

                {/* Display Revealed Hints */}
                {hintsCount > 0 && (
                  <div className="p-3.5 rounded-xl bg-amber-950/20 border border-amber-500/20 space-y-2 text-xs">
                    <span className="font-bold text-amber-400 uppercase tracking-wider block text-[10px]">
                      Progressive Hints:
                    </span>
                    {q.hints.slice(0, hintsCount).map((h, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-amber-200">
                        <ChevronRight className="w-3.5 h-3.5 shrink-0 mt-0.5 text-amber-400" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Display Full Solution Steps */}
                {isSolOpen && (
                  <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 space-y-3 text-xs">
                    <span className="font-bold text-brand-indigo uppercase tracking-wider block text-[10px]">
                      Full Step-by-Step Solution:
                    </span>
                    <div className="space-y-2.5">
                      {q.solutionSteps.map((s) => (
                        <div key={s.stepNumber} className="space-y-1">
                          <p className="text-slate-300">
                            <strong>Step {s.stepNumber}:</strong> {s.explanation}
                          </p>
                          {s.mathLatex && (
                            <div className="p-2 rounded bg-slate-950 text-center font-mono">
                              <MathText math={s.mathLatex} block />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 border-t border-slate-800 flex items-center justify-between font-mono text-brand-mint font-bold">
                      <span>Final Answer:</span>
                      <span>{q.finalAnswer}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PracticePage;
