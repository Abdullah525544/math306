import React, { useState } from 'react';
import MathText from '../components/MathText';
import { 
  Table, 
  ArrowLeftRight, 
  Maximize2, 
  CheckCircle2, 
  HelpCircle,
  Sparkles,
  Sliders
} from 'lucide-react';

interface IntervalDefinition {
  id: string;
  name: string;
  notation: string;
  setNotation: string;
  type: 'Finite' | 'Infinite';
  leftBracket: '(' | '[';
  rightBracket: ')' | ']';
  leftVal: number;
  rightVal: number;
  isInfiniteLeft?: boolean;
  isInfiniteRight?: boolean;
}

const TABLE_1_INTERVALS: IntervalDefinition[] = [
  { id: 'open', name: 'Open finite', notation: '(a, b)', setNotation: '{x \\mid a < x < b}', type: 'Finite', leftBracket: '(', rightBracket: ')', leftVal: -2, rightVal: 3 },
  { id: 'closed', name: 'Closed finite', notation: '[a, b]', setNotation: '{x \\mid a \\le x \\le b}', type: 'Finite', leftBracket: '[', rightBracket: ']', leftVal: -2, rightVal: 3 },
  { id: 'half-open-left', name: 'Half-open [a, b)', notation: '[a, b)', setNotation: '{x \\mid a \\le x < b}', type: 'Finite', leftBracket: '[', rightBracket: ')', leftVal: -2, rightVal: 3 },
  { id: 'half-open-right', name: 'Half-open (a, b]', notation: '(a, b]', setNotation: '{x \\mid a < x \\le b}', type: 'Finite', leftBracket: '(', rightBracket: ']', leftVal: -2, rightVal: 3 },
  { id: 'inf-open-right', name: 'Infinite (a, ∞)', notation: '(a, \\infty)', setNotation: '{x \\mid x > a}', type: 'Infinite', leftBracket: '(', rightBracket: ')', leftVal: 1, rightVal: 8, isInfiniteRight: true },
  { id: 'inf-closed-right', name: 'Infinite [a, ∞)', notation: '[a, \\infty)', setNotation: '{x \\mid x \\ge a}', type: 'Infinite', leftBracket: '[', rightBracket: ')', leftVal: 1, rightVal: 8, isInfiniteRight: true },
  { id: 'inf-open-left', name: 'Infinite (-∞, b)', notation: '(-\\infty, b)', setNotation: '{x \\mid x < b}', type: 'Infinite', leftBracket: '(', rightBracket: ')', leftVal: -8, rightVal: 2, isInfiniteLeft: true },
  { id: 'inf-closed-left', name: 'Infinite (-∞, b]', notation: '(-\\infty, b]', setNotation: '{x \\mid x \\le b}', type: 'Infinite', leftBracket: '(', rightBracket: ']', leftVal: -8, rightVal: 2, isInfiniteLeft: true },
  { id: 'all-reals', name: 'All Reals (-∞, ∞)', notation: '(-\\infty, \\infty)', setNotation: '\\mathbb{R}', type: 'Infinite', leftBracket: '(', rightBracket: ')', leftVal: -8, rightVal: 8, isInfiniteLeft: true, isInfiniteRight: true },
];

export const Section1Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'table1' | 'figures' | 'signflip' | 'neighborhood' | 'solver'>('table1');

  // Table 1 State
  const [selectedIntervalId, setSelectedIntervalId] = useState<string>('closed');

  // Figures State
  const [activeFigure, setActiveFigure] = useState<'fig1' | 'fig2' | 'fig3' | 'fig4'>('fig1');

  // Sign Flip & Reciprocal State
  const [valA, setValA] = useState<number>(2);
  const [valB, setValB] = useState<number>(5);
  const [multiplierC, setMultiplierC] = useState<number>(-1.5);
  const [showReciprocals, setShowReciprocals] = useState<boolean>(false);

  // Absolute Value Neighborhood State
  const [centerA, setCenterA] = useState<number>(5);
  const [distanceD, setDistanceD] = useState<number>(9);
  const [relationOperator, setRelationOperator] = useState<'<' | '<=' | '>' | '>='>('<');
  const [testPointX, setTestPointX] = useState<number>(8);

  // Linear Solver Preset State
  const [solverPreset, setSolverPreset] = useState<'ex1a' | 'ex1b' | 'ex1c' | 'ex5' | 'ex6' | 'ex7'>('ex5');

  // SVG Helper
  const svgWidth = 580;
  const svgHeight = 110;
  const minX = -10;
  const maxX = 16;
  const toSvgX = (val: number) => ((val - minX) / (maxX - minX)) * (svgWidth - 80) + 40;

  const currentInterval = TABLE_1_INTERVALS.find((i) => i.id === selectedIntervalId) || TABLE_1_INTERVALS[1];

  // Neighborhood calculations
  const leftRadius = centerA - distanceD;
  const rightRadius = centerA + distanceD;
  const actualDistance = Math.abs(testPointX - centerA);
  const isSatisfied = 
    relationOperator === '<' ? actualDistance < distanceD :
    relationOperator === '<=' ? actualDistance <= distanceD :
    relationOperator === '>' ? actualDistance > distanceD :
    actualDistance >= distanceD;

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Section 1 Visual Studio & Interactive Lab
          </h3>
          <p className="text-xs text-slate-400">
            Preliminaries (Pages 1–8) • Table 1, Figures 1–4, and Interactive Rule Demonstrators
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium overflow-x-auto">
          {[
            { id: 'table1', label: 'Table 1 Intervals' },
            { id: 'figures', label: 'Textbook Figures' },
            { id: 'neighborhood', label: '|x - a| < D' },
            { id: 'signflip', label: 'Sign-Flip Rule' },
            { id: 'solver', label: 'Guided Solver' },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setActiveTab(t.id as any)}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                activeTab === t.id
                  ? 'bg-brand-mint text-slate-900 font-bold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* 1. TABLE 1 INTERVALS VISUALIZER */}
      {activeTab === 'table1' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-2">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Table className="w-4 h-4 text-brand-mint" />
                Table 1: The 9 Types of Intervals (Page 3)
              </h4>
              <span className="text-xs font-mono text-brand-indigo font-semibold">
                Boundary vs Interior Points
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Endpoints are called <strong>boundary points</strong>. Points strictly between endpoints are <strong>interior points</strong>.
              A solid dot <span className="text-brand-mint font-bold">●</span> means the endpoint is included in the set (<MathText math="[" /> or <MathText math="]" />); a hollow circle <span className="text-slate-400 font-bold">○</span> means it is excluded (<MathText math="(" /> or <MathText math=")" />).
            </p>
          </div>

          {/* Interactive Interval Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
            {TABLE_1_INTERVALS.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSelectedIntervalId(item.id)}
                className={`p-2.5 rounded-xl border text-xs font-mono transition-all text-left ${
                  selectedIntervalId === item.id
                    ? 'bg-brand-mint/15 border-brand-mint text-white font-bold shadow-md'
                    : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-800'
                }`}
              >
                <span className="text-[10px] text-slate-400 block font-sans">{item.name}</span>
                <MathText math={item.notation} />
              </button>
            ))}
          </div>

          {/* Live Interval SVG Graph */}
          <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono px-2">
              <span className="text-slate-400">Selected Interval:</span>
              <span className="text-brand-mint font-bold text-sm">
                <MathText math={`${currentInterval.notation} = ${currentInterval.setNotation}`} />
              </span>
            </div>

            <div className="overflow-x-auto py-2">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                {/* Number Line Axis */}
                <line x1="20" y1="55" x2={svgWidth - 20} y2="55" stroke="#475569" strokeWidth="2" />
                <polygon points="15,55 25,50 25,60" fill="#475569" />
                <polygon points="565,55 555,50 555,60" fill="#475569" />

                {/* Number Line Ticks */}
                {Array.from({ length: 27 }, (_, i) => i - 10).map((t) => {
                  const tx = toSvgX(t);
                  const isMajor = t % 5 === 0;
                  return (
                    <g key={t}>
                      <line
                        x1={tx}
                        y1={isMajor ? 47 : 51}
                        x2={tx}
                        y2={isMajor ? 63 : 59}
                        stroke={isMajor ? '#94A3B8' : '#334155'}
                        strokeWidth={isMajor ? '2' : '1'}
                      />
                      {isMajor && (
                        <text x={tx} y="78" textAnchor="middle" fill="#94A3B8" fontSize="10" fontFamily="monospace">
                          {t}
                        </text>
                      )}
                    </g>
                  );
                })}

                {/* Shaded Interval Segment */}
                {(() => {
                  const leftX = currentInterval.isInfiniteLeft ? 25 : toSvgX(currentInterval.leftVal);
                  const rightX = currentInterval.isInfiniteRight ? svgWidth - 25 : toSvgX(currentInterval.rightVal);

                  return (
                    <>
                      <line
                        x1={leftX}
                        y1="55"
                        x2={rightX}
                        y2="55"
                        stroke="#2DD4BF"
                        strokeWidth="8"
                        strokeOpacity="0.8"
                      />

                      {/* Left Boundary Point */}
                      {!currentInterval.isInfiniteLeft && (
                        <circle
                          cx={leftX}
                          cy="55"
                          r="6"
                          fill={currentInterval.leftBracket === '[' ? '#2DD4BF' : '#090D16'}
                          stroke="#2DD4BF"
                          strokeWidth="2.5"
                        />
                      )}

                      {/* Right Boundary Point */}
                      {!currentInterval.isInfiniteRight && (
                        <circle
                          cx={rightX}
                          cy="55"
                          r="6"
                          fill={currentInterval.rightBracket === ']' ? '#2DD4BF' : '#090D16'}
                          stroke="#2DD4BF"
                          strokeWidth="2.5"
                        />
                      )}
                    </>
                  );
                })()}
              </svg>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono px-2">
              <span>● Solid dot = Included in set ([ or ])</span>
              <span>○ Hollow circle = Excluded boundary (( or ))</span>
            </div>
          </div>
        </div>
      )}

      {/* 2. TEXTBOOK FIGURES & DIAGRAMS */}
      {activeTab === 'figures' && (
        <div className="space-y-6">
          {/* Sub-tabs for Figures */}
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3">
            {[
              { id: 'fig1', label: 'Figure 1 (Ex 1 Graphs)' },
              { id: 'fig2', label: 'Figure 2 (Distance on Line)' },
              { id: 'fig3', label: 'Figure 3 (|x - 5| < 9 Graph)' },
              { id: 'fig4', label: 'Figure 4 (<= 1 vs >= 1 Rays)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFigure(f.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                  activeFigure === f.id
                    ? 'bg-brand-indigo text-white border-brand-indigo'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* FIGURE 1: Example 1 (a), (b), (c) */}
          {activeFigure === 'fig1' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">
                  Figure 1 • Page 4
                </span>
                <h4 className="text-base font-bold text-white">
                  Solution Sets for Example 1 on the Real Line
                </h4>
                <p className="text-xs text-slate-300">
                  Visual representation of Example 1 solutions: (a) strictly less than 4, (b) strictly greater than -3/7, and (c) rational inequality half-open segment (1, 11/5].
                </p>
              </div>

              {/* Sub-figures in Fig 1 */}
              <div className="space-y-4 pt-2">
                {/* 1(a) */}
                <div className="p-3.5 rounded-xl bg-[#090D16] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">(a) 2x - 1 &lt; x + 3</span>
                    <span className="text-brand-mint">(-∞, 4)</span>
                  </div>
                  <svg viewBox="0 0 500 50" className="w-full h-auto">
                    <line x1="20" y1="25" x2="480" y2="25" stroke="#475569" strokeWidth="2" />
                    <line x1="20" y1="25" x2="350" y2="25" stroke="#2DD4BF" strokeWidth="6" />
                    <circle cx="350" cy="25" r="5" fill="#090D16" stroke="#2DD4BF" strokeWidth="2.5" />
                    <text x="350" y="44" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="monospace">4</text>
                  </svg>
                </div>

                {/* 1(b) */}
                <div className="p-3.5 rounded-xl bg-[#090D16] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">(b) -x/3 &lt; 2x + 1</span>
                    <span className="text-brand-mint">(-3/7, ∞)</span>
                  </div>
                  <svg viewBox="0 0 500 50" className="w-full h-auto">
                    <line x1="20" y1="25" x2="480" y2="25" stroke="#475569" strokeWidth="2" />
                    <line x1="180" y1="25" x2="480" y2="25" stroke="#818CF8" strokeWidth="6" />
                    <circle cx="180" cy="25" r="5" fill="#090D16" stroke="#818CF8" strokeWidth="2.5" />
                    <text x="180" y="44" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="monospace">-3/7</text>
                  </svg>
                </div>

                {/* 1(c) */}
                <div className="p-3.5 rounded-xl bg-[#090D16] border border-slate-800 space-y-1">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-300 font-bold">(c) 6/(x - 1) &gt;= 5 (with x &gt; 1)</span>
                    <span className="text-brand-mint">(1, 11/5]</span>
                  </div>
                  <svg viewBox="0 0 500 50" className="w-full h-auto">
                    <line x1="20" y1="25" x2="480" y2="25" stroke="#475569" strokeWidth="2" />
                    <line x1="150" y1="25" x2="350" y2="25" stroke="#38BDF8" strokeWidth="6" />
                    <circle cx="150" cy="25" r="5" fill="#090D16" stroke="#38BDF8" strokeWidth="2.5" />
                    <circle cx="350" cy="25" r="5" fill="#38BDF8" stroke="#38BDF8" strokeWidth="2.5" />
                    <text x="150" y="44" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="monospace">1 (open)</text>
                    <text x="350" y="44" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="monospace">11/5 = 2.2 (closed)</text>
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* FIGURE 2: Distance on the Line */}
          {activeFigure === 'fig2' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">
                  Figure 2 • Page 5
                </span>
                <h4 className="text-base font-bold text-white">
                  Absolute Values as Geometric Distance
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The distance between points <MathText math="x" /> and <MathText math="y" /> on the real line is <MathText math="|x - y| = |y - x|" />.
                  Distances from the origin: <MathText math="|-5| = 5" /> and <MathText math="|3| = 3" />.
                  Distance between -4 and 1: <MathText math="|-4 - 1| = |-5| = 5" />. Distance between 4 and 1: <MathText math="|4 - 1| = 3" />.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800">
                <svg viewBox="0 0 540 100" className="w-full h-auto">
                  <line x1="20" y1="50" x2="520" y2="50" stroke="#475569" strokeWidth="2" />
                  {/* Origin */}
                  <circle cx="270" cy="50" r="4" fill="#FBBF24" />
                  <text x="270" y="70" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">0</text>

                  {/* Point -5 */}
                  <circle cx="120" cy="50" r="4" fill="#38BDF8" />
                  <text x="120" y="70" textAnchor="middle" fill="#38BDF8" fontSize="11">-5</text>
                  <path d="M 120 40 Q 195 15 270 40" fill="none" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="195" y="22" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">|-5| = 5</text>

                  {/* Point 3 */}
                  <circle cx="360" cy="50" r="4" fill="#2DD4BF" />
                  <text x="360" y="70" textAnchor="middle" fill="#2DD4BF" fontSize="11">3</text>
                  <path d="M 270 40 Q 315 22 360 40" fill="none" stroke="#2DD4BF" strokeWidth="2" strokeDasharray="3 3" />
                  <text x="315" y="26" textAnchor="middle" fill="#2DD4BF" fontSize="10" fontWeight="bold">|3| = 3</text>
                </svg>
              </div>
            </div>
          )}

          {/* FIGURE 3: |x - 5| < 9 Graph */}
          {activeFigure === 'fig3' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">
                  Figure 3 • Page 6
                </span>
                <h4 className="text-base font-bold text-white">
                  Graph of |x - 5| &lt; 9: Center 5 with Radius 9
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  The inequality <MathText math="|x - 5| < 9" /> means "the distance between <MathText math="x" /> and <MathText math="5" /> is less than <MathText math="9" />".
                  Walking 9 units left reaches <MathText math="5 - 9 = -4" />; walking 9 units right reaches <MathText math="5 + 9 = 14" />.
                  The solution is the open interval <MathText math="(-4, 14)" />.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800">
                <svg viewBox="0 0 540 100" className="w-full h-auto">
                  <line x1="20" y1="50" x2="520" y2="50" stroke="#475569" strokeWidth="2" />
                  {/* Shaded band from -4 to 14 */}
                  <line x1="120" y1="50" x2="420" y2="50" stroke="#2DD4BF" strokeWidth="7" strokeOpacity="0.75" />
                  {/* Endpoints */}
                  <circle cx="120" cy="50" r="5" fill="#090D16" stroke="#2DD4BF" strokeWidth="2.5" />
                  <text x="120" y="72" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="monospace">-4</text>
                  <circle cx="420" cy="50" r="5" fill="#090D16" stroke="#2DD4BF" strokeWidth="2.5" />
                  <text x="420" y="72" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="monospace">14</text>

                  {/* Center a = 5 */}
                  <circle cx="270" cy="50" r="5" fill="#FBBF24" />
                  <text x="270" y="72" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">Center 5</text>

                  {/* Radius arcs */}
                  <path d="M 120 40 Q 195 20 270 40" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="195" y="24" textAnchor="middle" fill="#FBBF24" fontSize="10">Radius 9</text>
                  <path d="M 270 40 Q 345 20 420 40" fill="none" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" />
                  <text x="345" y="24" textAnchor="middle" fill="#FBBF24" fontSize="10">Radius 9</text>
                </svg>
              </div>
            </div>
          )}

          {/* FIGURE 4: Side-by-side comparison <= vs >= */}
          {activeFigure === 'fig4' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
              <div className="space-y-1">
                <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">
                  Figure 4 • Pages 6–7
                </span>
                <h4 className="text-base font-bold text-white">
                  Side-by-Side Comparison: Connected Segment vs Disjoint Exterior Rays
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Solving <MathText math="|2x - 3| \le 1" /> yields single closed interval <MathText math="[1, 2]" />.
                  Solving <MathText math="|2x - 3| \ge 1" /> yields two outward rays joined by union: <MathText math="(-\infty, 1] \cup [2, \infty)" />.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* 4(a) */}
                <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-brand-mint block font-mono">
                    (a) |2x - 3| ≤ 1 ⇒ [1, 2]
                  </span>
                  <svg viewBox="0 0 260 70" className="w-full h-auto">
                    <line x1="10" y1="35" x2="250" y2="35" stroke="#475569" strokeWidth="2" />
                    <line x1="90" y1="35" x2="170" y2="35" stroke="#2DD4BF" strokeWidth="6" />
                    <circle cx="90" cy="35" r="5" fill="#2DD4BF" />
                    <text x="90" y="55" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="monospace">1</text>
                    <circle cx="170" cy="35" r="5" fill="#2DD4BF" />
                    <text x="170" y="55" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="monospace">2</text>
                  </svg>
                  <p className="text-[11px] text-slate-400">
                    Bounded closed segment between 1 and 2.
                  </p>
                </div>

                {/* 4(b) */}
                <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 space-y-2">
                  <span className="text-xs font-bold text-brand-indigo block font-mono">
                    (b) |2x - 3| ≥ 1 ⇒ (-∞, 1] ∪ [2, ∞)
                  </span>
                  <svg viewBox="0 0 260 70" className="w-full h-auto">
                    <line x1="10" y1="35" x2="250" y2="35" stroke="#475569" strokeWidth="2" />
                    <line x1="10" y1="35" x2="90" y2="35" stroke="#818CF8" strokeWidth="6" />
                    <line x1="170" y1="35" x2="250" y2="35" stroke="#818CF8" strokeWidth="6" />
                    <circle cx="90" cy="35" r="5" fill="#818CF8" />
                    <text x="90" y="55" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="monospace">1</text>
                    <circle cx="170" cy="35" r="5" fill="#818CF8" />
                    <text x="170" y="55" textAnchor="middle" fill="#CBD5E1" fontSize="10" fontFamily="monospace">2</text>
                  </svg>
                  <p className="text-[11px] text-slate-400">
                    Two outward rays extending to ±infinity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* 3. ABSOLUTE VALUE NEIGHBORHOOD EXPLORER */}
      {activeTab === 'neighborhood' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Sliders className="w-4 h-4 text-brand-mint" />
              Interactive Neighborhood: |x - a| &lt; D vs |x - a| &gt; D
            </h4>
            <p className="text-xs text-slate-300">
              Drag the center <MathText math="a" /> and walking distance <MathText math="D" />.
              Switch the operator to see how bounded intervals instantly flip into two outward rays!
            </p>
          </div>

          {/* SVG Visualizer */}
          <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-3">
            <div className="flex flex-wrap items-center justify-between text-xs font-mono px-2 gap-2">
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Inequality:</span>
                <span className="text-brand-mint font-bold text-sm">
                  |x - ({centerA})| {relationOperator} {distanceD}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Solution Interval:</span>
                <span className="px-2 py-0.5 rounded bg-brand-indigo/20 text-brand-indigo border border-brand-indigo/30 font-bold">
                  {relationOperator === '<' ? `(${leftRadius}, ${rightRadius})` :
                   relationOperator === '<=' ? `[${leftRadius}, ${rightRadius}]` :
                   relationOperator === '>' ? `(-∞, ${leftRadius}) ∪ (${rightRadius}, ∞)` :
                   `(-∞, ${leftRadius}] ∪ [${rightRadius}, ∞)`}
                </span>
              </div>
            </div>

            <div className="overflow-x-auto py-2">
              <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`} className="w-full h-auto min-w-[500px]">
                <line x1="20" y1="55" x2={svgWidth - 20} y2="55" stroke="#475569" strokeWidth="2" />
                <polygon points="15,55 25,50 25,60" fill="#475569" />
                <polygon points="565,55 555,50 555,60" fill="#475569" />

                {/* Shaded Solution */}
                {relationOperator === '<' || relationOperator === '<=' ? (
                  <>
                    <line
                      x1={Math.max(25, toSvgX(leftRadius))}
                      y1="55"
                      x2={Math.min(svgWidth - 25, toSvgX(rightRadius))}
                      y2="55"
                      stroke="#2DD4BF"
                      strokeWidth="8"
                      strokeOpacity="0.8"
                    />
                    <circle cx={toSvgX(leftRadius)} cy="55" r="5" fill={relationOperator === '<=' ? '#2DD4BF' : '#090D16'} stroke="#2DD4BF" strokeWidth="2" />
                    <circle cx={toSvgX(rightRadius)} cy="55" r="5" fill={relationOperator === '<=' ? '#2DD4BF' : '#090D16'} stroke="#2DD4BF" strokeWidth="2" />
                  </>
                ) : (
                  <>
                    <line x1="25" y1="55" x2={toSvgX(leftRadius)} y2="55" stroke="#818CF8" strokeWidth="8" strokeOpacity="0.8" />
                    <line x1={toSvgX(rightRadius)} y1="55" x2={svgWidth - 25} y2="55" stroke="#818CF8" strokeWidth="8" strokeOpacity="0.8" />
                    <circle cx={toSvgX(leftRadius)} cy="55" r="5" fill={relationOperator === '>=' ? '#818CF8' : '#090D16'} stroke="#818CF8" strokeWidth="2" />
                    <circle cx={toSvgX(rightRadius)} cy="55" r="5" fill={relationOperator === '>=' ? '#818CF8' : '#090D16'} stroke="#818CF8" strokeWidth="2" />
                  </>
                )}

                {/* Center marker */}
                <circle cx={toSvgX(centerA)} cy="55" r="4" fill="#FBBF24" />
                <text x={toSvgX(centerA)} y="40" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">Center {centerA}</text>

                {/* Test point marker */}
                <circle cx={toSvgX(testPointX)} cy="55" r="6" fill={isSatisfied ? '#2DD4BF' : '#F43F5E'} stroke="#FFF" strokeWidth="2" />
                <text x={toSvgX(testPointX)} y="78" textAnchor="middle" fill={isSatisfied ? '#2DD4BF' : '#F43F5E'} fontSize="11" fontWeight="bold">
                  x = {testPointX}
                </text>
              </svg>
            </div>

            {/* Test Status feedback */}
            <div className={`p-3 rounded-xl border flex items-center justify-between text-xs ${
              isSatisfied ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300' : 'bg-rose-950/40 border-rose-500/40 text-rose-300'
            }`}>
              <span>
                Distance |{testPointX} - {centerA}| = <strong>{actualDistance}</strong>.
                This is {isSatisfied ? 'within the solution region (Satisfied)' : 'outside the solution region (Not Satisfied)'}.
              </span>
              <span className="font-bold">{isSatisfied ? 'TRUE' : 'FALSE'}</span>
            </div>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div>
              <label className="text-slate-300 flex justify-between font-semibold">
                <span>Center (a): {centerA}</span>
              </label>
              <input
                type="range"
                min="-4"
                max="10"
                step="1"
                value={centerA}
                onChange={(e) => setCenterA(parseInt(e.target.value))}
                className="w-full mt-2 accent-brand-mint"
              />
            </div>

            <div>
              <label className="text-slate-300 flex justify-between font-semibold">
                <span>Radius (D): {distanceD}</span>
              </label>
              <input
                type="range"
                min="1"
                max="12"
                step="1"
                value={distanceD}
                onChange={(e) => setDistanceD(parseInt(e.target.value))}
                className="w-full mt-2 accent-brand-indigo"
              />
            </div>

            <div>
              <label className="text-slate-300 flex justify-between font-semibold">
                <span>Test Point (x): {testPointX}</span>
              </label>
              <input
                type="range"
                min="-8"
                max="15"
                step="1"
                value={testPointX}
                onChange={(e) => setTestPointX(parseInt(e.target.value))}
                className="w-full mt-2 accent-amber-400"
              />
            </div>

            <div>
              <span className="text-slate-300 font-semibold block mb-1.5">Operator:</span>
              <div className="grid grid-cols-4 gap-1">
                {(['<', '<=', '>', '>='] as const).map((op) => (
                  <button
                    key={op}
                    type="button"
                    onClick={() => setRelationOperator(op)}
                    className={`py-1 rounded font-mono font-bold border transition-colors ${
                      relationOperator === op
                        ? 'bg-brand-mint text-slate-900 border-brand-mint'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {op}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. SIGN-FLIP & RECIPROCAL DEMO */}
      {activeTab === 'signflip' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-brand-mint" />
              Inequality Rules 4 & 6: Negative Multiplication and Reciprocals
            </h4>
            <p className="text-xs text-slate-300">
              When multiplying by <MathText math="c < 0" />, the coordinates flip across 0, reversing order (<MathText math="a < b \implies bc < ac" />).
              Similarly, for positive numbers, taking reciprocals inverts fractions (<MathText math="0 < a < b \implies 1/b < 1/a" />).
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Statement:</span>
              <span className={`font-bold text-sm ${multiplierC < 0 ? 'text-amber-400' : 'text-brand-mint'}`}>
                {valA} &lt; {valB} &nbsp;×&nbsp; ({multiplierC}) &nbsp;⇒&nbsp; {(valA * multiplierC).toFixed(1)} {multiplierC < 0 ? '>' : '<'} {(valB * multiplierC).toFixed(1)}
              </span>
            </div>

            <svg viewBox="0 0 540 80" className="w-full h-auto">
              <line x1="20" y1="40" x2="520" y2="40" stroke="#475569" strokeWidth="2" />
              <circle cx="270" cy="40" r="4" fill="#CBD5E1" />
              <text x="270" y="58" textAnchor="middle" fill="#CBD5E1" fontSize="10">0</text>

              {/* Scaled A */}
              <circle cx={270 + valA * multiplierC * 16} cy="40" r="6" fill="#2DD4BF" />
              <text x={270 + valA * multiplierC * 16} y="25" textAnchor="middle" fill="#2DD4BF" fontSize="10" fontWeight="bold">
                c·a = {(valA * multiplierC).toFixed(1)}
              </text>

              {/* Scaled B */}
              <circle cx={270 + valB * multiplierC * 16} cy="40" r="6" fill="#818CF8" />
              <text x={270 + valB * multiplierC * 16} y="25" textAnchor="middle" fill="#818CF8" fontSize="10" fontWeight="bold">
                c·b = {(valB * multiplierC).toFixed(1)}
              </text>
            </svg>

            {multiplierC < 0 && (
              <div className="p-2.5 rounded-lg bg-amber-950/30 border border-amber-500/40 text-amber-300 text-xs text-center font-semibold">
                Sign Reversed! Since c = {multiplierC} is negative, the order of the points swapped on the number line.
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div>
              <label className="text-slate-300 flex justify-between font-semibold">
                <span>Value a: {valA}</span>
              </label>
              <input
                type="range"
                min="-5"
                max="4"
                step="1"
                value={valA}
                onChange={(e) => setValA(parseInt(e.target.value))}
                className="w-full mt-2 accent-brand-mint"
              />
            </div>
            <div>
              <label className="text-slate-300 flex justify-between font-semibold">
                <span>Value b (b &gt; a): {valB}</span>
              </label>
              <input
                type="range"
                min="-3"
                max="7"
                step="1"
                value={valB}
                onChange={(e) => setValB(Math.max(valA + 1, parseInt(e.target.value)))}
                className="w-full mt-2 accent-brand-indigo"
              />
            </div>
            <div>
              <label className="text-slate-300 flex justify-between font-semibold">
                <span>Multiplier c: {multiplierC}</span>
              </label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={multiplierC}
                onChange={(e) => setMultiplierC(parseFloat(e.target.value))}
                className="w-full mt-2 accent-amber-400"
              />
            </div>
          </div>
        </div>
      )}

      {/* 5. GUIDED SOLVER FOR TEXTBOOK EXAMPLES */}
      {activeTab === 'solver' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-brand-mint" />
              Textbook Worked Examples Step-by-Step Solver
            </h4>
            <p className="text-xs text-slate-300">
              Select an inequality from Pages 4–7 to see its algebraic solution and corresponding number line visualization.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {[
              { id: 'ex1a', label: 'Ex 1(a): 2x - 1 < x + 3' },
              { id: 'ex1b', label: 'Ex 1(b): -x/3 < 2x + 1' },
              { id: 'ex1c', label: 'Ex 1(c): 6/(x-1) ≥ 5' },
              { id: 'ex5', label: 'Ex 5: |x - 5| < 9' },
              { id: 'ex6', label: 'Ex 6: |5 - 2/x| < 1' },
              { id: 'ex7', label: 'Ex 7: |2x - 3| ≤ 1' },
            ].map((ex) => (
              <button
                key={ex.id}
                type="button"
                onClick={() => setSolverPreset(ex.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                  solverPreset === ex.id
                    ? 'bg-brand-mint text-slate-900 border-brand-mint shadow-sm'
                    : 'bg-slate-900 text-slate-300 border-slate-800 hover:text-white'
                }`}
              >
                {ex.label}
              </button>
            ))}
          </div>

          <div className="p-5 rounded-2xl bg-[#090D16] border border-slate-800 space-y-3 font-mono text-xs">
            {solverPreset === 'ex1a' && (
              <div className="space-y-2">
                <span className="text-brand-mint font-bold text-sm block">Example 1(a): 2x - 1 &lt; x + 3</span>
                <p className="text-slate-300 font-sans">Step 1: Subtract x from both sides (Rule 2) ⇒ x - 1 &lt; 3</p>
                <p className="text-slate-300 font-sans">Step 2: Add 1 to both sides (Rule 1) ⇒ x &lt; 4</p>
                <div className="p-2 rounded bg-slate-950 text-brand-mint font-bold text-sm">
                  Final Solution Interval: (-∞, 4)
                </div>
              </div>
            )}
            {solverPreset === 'ex1b' && (
              <div className="space-y-2">
                <span className="text-brand-mint font-bold text-sm block">Example 1(b): -x/3 &lt; 2x + 1</span>
                <p className="text-slate-300 font-sans">Step 1: Multiply by 3 ⇒ -x &lt; 6x + 3</p>
                <p className="text-slate-300 font-sans">Step 2: Subtract 6x ⇒ -7x &lt; 3</p>
                <p className="text-amber-400 font-sans">Step 3: Divide by -7 (REVERSE SIGN, Rule 4) ⇒ x &gt; -3/7</p>
                <div className="p-2 rounded bg-slate-950 text-brand-mint font-bold text-sm">
                  Final Solution Interval: (-3/7, ∞)
                </div>
              </div>
            )}
            {solverPreset === 'ex1c' && (
              <div className="space-y-2">
                <span className="text-brand-mint font-bold text-sm block">Example 1(c): 6/(x - 1) ≥ 5</span>
                <p className="text-slate-300 font-sans">Step 1: Domain requires denominator &gt; 0, so x &gt; 1.</p>
                <p className="text-slate-300 font-sans">Step 2: Multiply by (x - 1) &gt; 0 ⇒ 6 ≥ 5(x - 1) = 5x - 5</p>
                <p className="text-slate-300 font-sans">Step 3: 11 ≥ 5x ⇒ x ≤ 11/5</p>
                <div className="p-2 rounded bg-slate-950 text-brand-mint font-bold text-sm">
                  Final Solution Interval: (1, 11/5]
                </div>
              </div>
            )}
            {solverPreset === 'ex5' && (
              <div className="space-y-2">
                <span className="text-brand-mint font-bold text-sm block">Example 5: |x - 5| &lt; 9</span>
                <p className="text-slate-300 font-sans">Step 1: Expand into double inequality: -9 &lt; x - 5 &lt; 9</p>
                <p className="text-slate-300 font-sans">Step 2: Add 5 across all three parts: -4 &lt; x &lt; 14</p>
                <div className="p-2 rounded bg-slate-950 text-brand-mint font-bold text-sm">
                  Final Solution Interval: (-4, 14)
                </div>
              </div>
            )}
            {solverPreset === 'ex6' && (
              <div className="space-y-2">
                <span className="text-brand-mint font-bold text-sm block">Example 6: |5 - 2/x| &lt; 1</span>
                <p className="text-slate-300 font-sans">Step 1: -1 &lt; 5 - 2/x &lt; 1</p>
                <p className="text-slate-300 font-sans">Step 2: Subtract 5 ⇒ -6 &lt; -2/x &lt; -4</p>
                <p className="text-amber-400 font-sans">Step 3: Multiply by -1/2 (REVERSE SIGN) ⇒ 3 &gt; 1/x &gt; 2 ⇒ 2 &lt; 1/x &lt; 3</p>
                <p className="text-amber-400 font-sans">Step 4: Take reciprocals of positives (REVERSE ORDER) ⇒ 1/3 &lt; x &lt; 1/2</p>
                <div className="p-2 rounded bg-slate-950 text-brand-mint font-bold text-sm">
                  Final Solution Interval: (1/3, 1/2)
                </div>
              </div>
            )}
            {solverPreset === 'ex7' && (
              <div className="space-y-2">
                <span className="text-brand-mint font-bold text-sm block">Example 7: |2x - 3| ≤ 1 vs |2x - 3| ≥ 1</span>
                <p className="text-slate-300 font-sans">(a) ≤ 1: -1 ≤ 2x - 3 ≤ 1 ⇒ 2 ≤ 2x ≤ 4 ⇒ 1 ≤ x ≤ 2 ⇒ [1, 2]</p>
                <p className="text-slate-300 font-sans">(b) ≥ 1: 2x - 3 ≤ -1 or 2x - 3 ≥ 1 ⇒ x ≤ 1 or x ≥ 2 ⇒ (-∞, 1] ∪ [2, ∞)</p>
                <div className="p-2 rounded bg-slate-950 text-brand-mint font-bold text-sm">
                  Solutions: [1, 2] and (-∞, 1] ∪ [2, ∞)
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Section1Tools;
