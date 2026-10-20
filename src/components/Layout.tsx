import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { 
  Compass, 
  BookOpen, 
  FlaskConical, 
  HelpCircle, 
  Layers, 
  CheckCircle2, 
  RotateCcw, 
  Menu, 
  X,
  ChevronDown
} from 'lucide-react';
import { useProgress } from '../lib/progress';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { progress, resetAll } = useProgress();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sectionsDropdownOpen, setSectionsDropdownOpen] = useState(false);
  const location = useLocation();

  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / 5) * 100);

  const sectionsList = [
    { id: 'section-1', title: '1. Real Numbers & The Real Line', pages: 'Pages 1–8' },
    { id: 'section-2', title: '2. Coordinates, Lines & Increments', pages: 'Pages 8–17' },
    { id: 'section-3', title: '3. Functions & Operations', pages: 'Pages 17–26' },
    { id: 'section-4', title: '4. Shifting Graphs & Circles', pages: 'Pages 27–35' },
    { id: 'section-5', title: '5. Trigonometric Functions', pages: 'Pages 35–47' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-[#090D16] text-slate-100 bg-graph-paper">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 glass-panel border-b border-indigo-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo and Brand */}
            <div className="flex items-center gap-3">
              <Link 
                to="/" 
                className="flex items-center gap-2.5 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-mint rounded-lg px-1.5 py-1"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-mint/20 to-brand-indigo/30 border border-brand-mint/40 flex items-center justify-center text-brand-mint group-hover:scale-105 transition-transform">
                  <Compass className="w-5 h-5 text-brand-mint" />
                </div>
                <div>
                  <span className="font-bold text-lg tracking-tight text-white flex items-center gap-1.5">
                    Math Lab
                    <span className="text-[11px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded-full bg-brand-indigo/20 text-brand-indigo border border-brand-indigo/30">
                      Math-306
                    </span>
                  </span>
                  <p className="text-[11px] text-slate-400 font-mono -mt-0.5 hidden sm:block">
                    Preliminaries • Sections 1–5
                  </p>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-mint ${
                    isActive
                      ? 'bg-slate-800/80 text-brand-mint border border-brand-mint/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/overview"
                className={({ isActive }) =>
                  `px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-mint ${
                    isActive
                      ? 'bg-slate-800/80 text-brand-mint border border-brand-mint/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                Syllabus Map
              </NavLink>

              {/* Sections Dropdown */}
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSectionsDropdownOpen(!sectionsDropdownOpen)}
                  onBlur={() => setTimeout(() => setSectionsDropdownOpen(false), 200)}
                  className={`flex items-center gap-1 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-mint ${
                    location.pathname.startsWith('/section/')
                      ? 'bg-slate-800/80 text-brand-mint border border-brand-mint/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`}
                >
                  <BookOpen className="w-4 h-4 text-brand-indigo" />
                  Lessons
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${sectionsDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {sectionsDropdownOpen && (
                  <div className="absolute top-full left-0 mt-2 w-72 rounded-xl bg-[#0F172A] border border-slate-700/80 shadow-2xl p-2 z-50">
                    <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Textbook Sections (p. 1–47)
                    </div>
                    {sectionsList.map((sec) => {
                      const isComplete = progress.completedLessons.includes(sec.id);
                      return (
                        <Link
                          key={sec.id}
                          to={`/section/${sec.id}`}
                          className="flex items-center justify-between px-3 py-2 text-xs rounded-lg hover:bg-slate-800/80 text-slate-200 transition-colors group"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium group-hover:text-brand-mint">{sec.title}</span>
                            <span className="text-[10px] text-slate-500 font-mono">{sec.pages}</span>
                          </div>
                          {isComplete && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint shrink-0 ml-2" />
                          )}
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>

              <NavLink
                to="/lab"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-mint ${
                    isActive
                      ? 'bg-slate-800/80 text-brand-mint border border-brand-mint/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                <FlaskConical className="w-4 h-4 text-brand-mint" />
                Interactive Lab
              </NavLink>

              <NavLink
                to="/practice"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-mint ${
                    isActive
                      ? 'bg-slate-800/80 text-brand-mint border border-brand-mint/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                <HelpCircle className="w-4 h-4 text-brand-indigo" />
                Practice Bank
              </NavLink>

              <NavLink
                to="/review"
                className={({ isActive }) =>
                  `flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-brand-mint ${
                    isActive
                      ? 'bg-slate-800/80 text-brand-mint border border-brand-mint/30'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                  }`
                }
              >
                <Layers className="w-4 h-4 text-brand-violet" />
                22 Review Cards
              </NavLink>
            </nav>

            {/* Right Side: Progress Stats & Reset */}
            <div className="hidden sm:flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800/70 border border-slate-700/60 text-xs">
                <div className="w-16 bg-slate-700 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-brand-mint h-full transition-all duration-500 rounded-full"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <span className="font-mono text-slate-300 font-medium">
                  {completedCount}/5 ({progressPercent}%)
                </span>
                {progress.totalAttempted > 0 && (
                  <span className="pl-2 border-l border-slate-700 text-brand-mint font-mono font-medium">
                    {progress.accuracyPercentage}% Acc
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={resetAll}
                title="Reset all local progress"
                className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800/60 rounded-lg transition-colors focus-visible:ring-2 focus-visible:ring-rose-500"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex md:hidden items-center gap-2">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg focus-visible:ring-2 focus-visible:ring-brand-mint"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden glass-panel border-b border-slate-800 px-4 pt-3 pb-6 space-y-2">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs text-slate-400">
              <span>Overall Progress: {progressPercent}% ({completedCount}/5 Lessons)</span>
              <button
                type="button"
                onClick={() => {
                  resetAll();
                  setMobileMenuOpen(false);
                }}
                className="text-rose-400 hover:underline flex items-center gap-1"
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            </div>

            <NavLink
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200"
            >
              Dashboard
            </NavLink>
            <NavLink
              to="/overview"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200"
            >
              Syllabus Map
            </NavLink>
            <div className="pl-3 border-l-2 border-slate-700 py-1 space-y-1">
              <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                Lessons
              </span>
              {sectionsList.map((sec) => (
                <Link
                  key={sec.id}
                  to={`/section/${sec.id}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-1 text-xs text-slate-300 hover:text-brand-mint"
                >
                  {sec.title}
                </Link>
              ))}
            </div>
            <NavLink
              to="/lab"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200"
            >
              <FlaskConical className="w-4 h-4 text-brand-mint" />
              Interactive Lab
            </NavLink>
            <NavLink
              to="/practice"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200"
            >
              <HelpCircle className="w-4 h-4 text-brand-indigo" />
              Practice Bank
            </NavLink>
            <NavLink
              to="/review"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 text-slate-200"
            >
              <Layers className="w-4 h-4 text-brand-violet" />
              22 Review Flashcards
            </NavLink>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 pb-20 md:pb-8">
        {children}
      </main>

      {/* Mobile Bottom Quick-Action Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0F172A]/95 backdrop-blur-lg border-t border-slate-800 px-3 py-2 flex items-center justify-around text-[10px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${isActive ? 'text-brand-mint font-bold' : 'text-slate-400'}`
          }
        >
          <Compass className="w-4 h-4" />
          <span>Home</span>
        </NavLink>
        <NavLink
          to="/overview"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${isActive ? 'text-brand-mint font-bold' : 'text-slate-400'}`
          }
        >
          <BookOpen className="w-4 h-4" />
          <span>Syllabus</span>
        </NavLink>
        <NavLink
          to="/lab"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${isActive ? 'text-brand-mint font-bold' : 'text-slate-400'}`
          }
        >
          <FlaskConical className="w-4 h-4" />
          <span>Lab</span>
        </NavLink>
        <NavLink
          to="/practice"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${isActive ? 'text-brand-mint font-bold' : 'text-slate-400'}`
          }
        >
          <HelpCircle className="w-4 h-4" />
          <span>Practice</span>
        </NavLink>
        <NavLink
          to="/review"
          className={({ isActive }) =>
            `flex flex-col items-center gap-0.5 ${isActive ? 'text-brand-mint font-bold' : 'text-slate-400'}`
          }
        >
          <Layers className="w-4 h-4" />
          <span>Review</span>
        </NavLink>
      </nav>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-[#090D16]/90 text-slate-400 text-xs py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="text-center md:text-left">
            <p className="font-semibold text-slate-200">
              Math Lab — Preliminaries (Math-306)
            </p>
            <p className="text-slate-500 mt-1">
              Strictly faithful to textbook chapter <span className="text-slate-400 font-mono">Preliminaries (Pages 1–50)</span> & Answer Key <span className="text-slate-400 font-mono">A-35 to A-40</span>.
            </p>
            <p className="text-[11px] text-brand-indigo/80 mt-0.5">
              Strict scope: Pre-calculus foundations only. Zero limits, derivatives, or integrals.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
              Deterministic Math Engine
            </span>
            <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-300">
              100% Local Storage
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
