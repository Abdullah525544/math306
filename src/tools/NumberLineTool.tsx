import React, { useState } from 'react';
import MathText from '../components/MathText';
import { Sliders, ArrowLeftRight, CheckCircle2, AlertCircle } from 'lucide-react';

export const NumberLineTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'distance' | 'signflip'>('distance');

  // Distance Tab State
  const [centerA, setCenterA] = useState<number>(1);
  const [distanceD, setDistanceD] = useState<number>(3);
  const [pointX, setPointX] = useState<number>(2.5);
  const [relationType, setRelationType] = useState<'less' | 'greater'>('less');

  // Sign Flip Tab State
  const [signA, setSignA] = useState<number>(1);
  const [signB, setSignB] = useState<number>(3);
  const [multiplierC, setMultiplierC] = useState<number>(1);

  // SVG dimensions
  const width = 600;
  const height = 140;
  const minX = -10;
  const maxX = 10;

  const toSvgX = (val: number) => {
    return ((val - minX) / (maxX - minX)) * (width - 80) + 40;
  };

  // Calculations for distance
  const leftBound = centerA - distanceD;
  const rightBound = centerA + distanceD;
  const currentDist = Math.abs(pointX - centerA);
  const satisfiesInequality =
    relationType === 'less' ? currentDist < distanceD : currentDist > distanceD;

  // Sign flip calculations
  const scaledA = signA * multiplierC;
  const scaledB = signB * multiplierC;

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Interactive Number Line Lab
          </h3>
          <p className="text-xs text-slate-400">
            Section 1 • Real Line, Absolute Value Distance & Inequality Transformations
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('distance')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'distance'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Distance |x - a|
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('signflip')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'signflip'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Sign-Flip Demo
          </button>
        </div>
      </div>

      {activeTab === 'distance' ? (
        <div className="space-y-6">
          {/* Formula Banner */}
          <div className="p-3.5 rounded-xl bg-slate-900/90 border border-indigo-900/40 flex flex-wrap items-center justify-between gap-4 text-sm font-mono">
            <div className="flex items-center gap-3">
              <span className="text-slate-400">Current Rule:</span>
              <MathText
                math={
                  relationType === 'less'
                    ? `|x - (${centerA})| < ${distanceD} \\iff ${leftBound.toFixed(1)} < x < ${rightBound.toFixed(1)}`
                    : `|x - (${centerA})| > ${distanceD} \\iff x < ${leftBound.toFixed(1)} \\;\\text{or}\\; x > ${rightBound.toFixed(1)}`
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 font-sans">Interval:</span>
              <span className="px-2.5 py-1 rounded bg-brand-indigo/20 text-brand-indigo border border-brand-indigo/30 font-bold text-xs">
                {relationType === 'less'
                  ? `(${leftBound.toFixed(1)}, ${rightBound.toFixed(1)})`
                  : `(-∞, ${leftBound.toFixed(1)}) ∪ (${rightBound.toFixed(1)}, ∞)`}
              </span>
            </div>
          </div>

          {/* SVG Canvas */}
          <div className="relative w-full overflow-x-auto bg-[#090D16] rounded-xl border border-slate-800 p-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
              {/* Main Axis Line */}
              <line
                x1="20"
                y1={height / 2}
                x2={width - 20}
                y2={height / 2}
                stroke="#475569"
                strokeWidth="2"
              />
              {/* Arrowheads */}
              <polygon points="15,70 25,65 25,75" fill="#475569" />
              <polygon points="585,70 575,65 575,75" fill="#475569" />

              {/* Ticks and Numbers */}
              {Array.from({ length: 21 }, (_, i) => i - 10).map((tick) => {
                const tx = toSvgX(tick);
                const isMajor = tick % 5 === 0;
                return (
                  <g key={tick}>
                    <line
                      x1={tx}
                      y1={isMajor ? height / 2 - 8 : height / 2 - 4}
                      x2={tx}
                      y2={isMajor ? height / 2 + 8 : height / 2 + 4}
                      stroke={isMajor ? '#94A3B8' : '#334155'}
                      strokeWidth={isMajor ? '2' : '1'}
                    />
                    {isMajor && (
                      <text
                        x={tx}
                        y={height / 2 + 22}
                        textAnchor="middle"
                        fill="#94A3B8"
                        fontSize="11"
                        fontFamily="monospace"
                      >
                        {tick}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Shaded Solution Region */}
              {relationType === 'less' ? (
                <>
                  <line
                    x1={Math.max(25, toSvgX(leftBound))}
                    y1={height / 2}
                    x2={Math.min(width - 25, toSvgX(rightBound))}
                    y2={height / 2}
                    stroke="#2DD4BF"
                    strokeWidth="8"
                    strokeOpacity="0.75"
                  />
                  {/* Open circles at boundaries */}
                  <circle cx={toSvgX(leftBound)} cy={height / 2} r="5" fill="#090D16" stroke="#2DD4BF" strokeWidth="2.5" />
                  <circle cx={toSvgX(rightBound)} cy={height / 2} r="5" fill="#090D16" stroke="#2DD4BF" strokeWidth="2.5" />
                </>
              ) : (
                <>
                  {/* Left ray */}
                  <line
                    x1={25}
                    y1={height / 2}
                    x2={toSvgX(leftBound)}
                    y2={height / 2}
                    stroke="#818CF8"
                    strokeWidth="8"
                    strokeOpacity="0.75"
                  />
                  {/* Right ray */}
                  <line
                    x1={toSvgX(rightBound)}
                    y1={height / 2}
                    x2={width - 25}
                    y2={height / 2}
                    stroke="#818CF8"
                    strokeWidth="8"
                    strokeOpacity="0.75"
                  />
                  <circle cx={toSvgX(leftBound)} cy={height / 2} r="5" fill="#090D16" stroke="#818CF8" strokeWidth="2.5" />
                  <circle cx={toSvgX(rightBound)} cy={height / 2} r="5" fill="#090D16" stroke="#818CF8" strokeWidth="2.5" />
                </>
              )}

              {/* Center point a marker */}
              <g>
                <circle cx={toSvgX(centerA)} cy={height / 2} r="4" fill="#FBBF24" />
                <text
                  x={toSvgX(centerA)}
                  y={height / 2 - 14}
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  a = {centerA}
                </text>
              </g>

              {/* Test Point x Marker */}
              <g>
                <circle
                  cx={toSvgX(pointX)}
                  cy={height / 2}
                  r="7"
                  fill={satisfiesInequality ? '#2DD4BF' : '#F43F5E'}
                  stroke="#FFFFFF"
                  strokeWidth="2"
                />
                <text
                  x={toSvgX(pointX)}
                  y={height / 2 - 24}
                  textAnchor="middle"
                  fill={satisfiesInequality ? '#2DD4BF' : '#F43F5E'}
                  fontSize="12"
                  fontWeight="bold"
                >
                  x = {pointX.toFixed(1)}
                </text>
              </g>
            </svg>
          </div>

          {/* Verification Status Feedback */}
          <div
            className={`p-3 rounded-xl border flex items-center gap-3 text-xs ${
              satisfiesInequality
                ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
            }`}
          >
            {satisfiesInequality ? (
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            ) : (
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            )}
            <span>
              Distance from <strong className="font-mono">x={pointX.toFixed(1)}</strong> to{' '}
              <strong className="font-mono">a={centerA}</strong> is{' '}
              <strong className="font-mono">{currentDist.toFixed(2)}</strong>. This is{' '}
              {satisfiesInequality ? (
                <span className="font-bold underline">
                  {relationType === 'less' ? 'LESS than D' : 'GREATER than D'} (Inequality Satisfied)
                </span>
              ) : (
                <span className="font-bold underline">
                  {relationType === 'less' ? 'NOT less than D' : 'NOT greater than D'} (Outside Solution Set)
                </span>
              )}.
            </span>
          </div>

          {/* Controls Panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Center (a):</span>
                <span className="font-mono text-brand-mint">{centerA}</span>
              </label>
              <input
                type="range"
                min="-6"
                max="6"
                step="0.5"
                value={centerA}
                onChange={(e) => setCenterA(parseFloat(e.target.value))}
                className="w-full mt-2 accent-brand-mint"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Distance Threshold (D):</span>
                <span className="font-mono text-brand-indigo">{distanceD}</span>
              </label>
              <input
                type="range"
                min="0.5"
                max="8"
                step="0.5"
                value={distanceD}
                onChange={(e) => setDistanceD(parseFloat(e.target.value))}
                className="w-full mt-2 accent-brand-indigo"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Test Point (x):</span>
                <span className="font-mono text-white">{pointX.toFixed(1)}</span>
              </label>
              <input
                type="range"
                min="-9"
                max="9"
                step="0.1"
                value={pointX}
                onChange={(e) => setPointX(parseFloat(e.target.value))}
                className="w-full mt-2 accent-slate-300"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-2">
                Inequality Mode:
              </label>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setRelationType('less')}
                  className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-mono font-bold border transition-colors ${
                    relationType === 'less'
                      ? 'bg-brand-mint text-slate-900 border-brand-mint'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  |x - a| &lt; D
                </button>
                <button
                  type="button"
                  onClick={() => setRelationType('greater')}
                  className={`flex-1 py-1.5 px-2 text-xs rounded-lg font-mono font-bold border transition-colors ${
                    relationType === 'greater'
                      ? 'bg-brand-indigo text-slate-900 border-brand-indigo'
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:border-slate-500'
                  }`}
                >
                  |x - a| &gt; D
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Sign-Flip Tab */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <ArrowLeftRight className="w-4 h-4 text-brand-mint" />
              Inequality Multiplication Law (Rule 4)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Start with <MathText math={`a = ${signA}`} /> and <MathText math={`b = ${signB}`} /> where <MathText math="a < b" />.
              Multiply both sides by <MathText math={`c = ${multiplierC}`} />. Watch how the numbers swap order on the line when <MathText math="c < 0" />!
            </p>

            <div className="p-3 rounded-lg bg-[#090D16] border border-slate-800 flex items-center justify-between text-sm font-mono">
              <div>
                <span className="text-slate-400">Inequality Statement: </span>
                <span className={`font-bold ${multiplierC < 0 ? 'text-amber-400' : 'text-brand-mint'}`}>
                  {scaledA.toFixed(1)} {multiplierC < 0 ? '>' : multiplierC === 0 ? '=' : '<'} {scaledB.toFixed(1)}
                </span>
              </div>
              {multiplierC < 0 ? (
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-sans font-semibold">
                  Sign Reversed (c &lt; 0)
                </span>
              ) : (
                <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-sans font-semibold">
                  Order Preserved (c &gt; 0)
                </span>
              )}
            </div>
          </div>

          {/* SVG Canvas for sign flip */}
          <div className="relative w-full overflow-x-auto bg-[#090D16] rounded-xl border border-slate-800 p-2">
            <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto min-w-[500px]">
              <line x1="20" y1={height / 2} x2={width - 20} y2={height / 2} stroke="#475569" strokeWidth="2" />
              <polygon points="15,70 25,65 25,75" fill="#475569" />
              <polygon points="585,70 575,65 575,75" fill="#475569" />

              {/* Zero Marker */}
              <line x1={toSvgX(0)} y1={height / 2 - 12} x2={toSvgX(0)} y2={height / 2 + 12} stroke="#CBD5E1" strokeWidth="2" />
              <text x={toSvgX(0)} y={height / 2 + 25} textAnchor="middle" fill="#CBD5E1" fontSize="12" fontWeight="bold">0</text>

              {/* Point a Marker */}
              <g>
                <circle cx={toSvgX(scaledA)} cy={height / 2} r="6" fill="#2DD4BF" stroke="#FFF" strokeWidth="1.5" />
                <text x={toSvgX(scaledA)} y={height / 2 - 14} textAnchor="middle" fill="#2DD4BF" fontSize="11" fontWeight="bold">
                  c·a = {scaledA.toFixed(1)}
                </text>
              </g>

              {/* Point b Marker */}
              <g>
                <circle cx={toSvgX(scaledB)} cy={height / 2} r="6" fill="#818CF8" stroke="#FFF" strokeWidth="1.5" />
                <text x={toSvgX(scaledB)} y={height / 2 - 14} textAnchor="middle" fill="#818CF8" fontSize="11" fontWeight="bold">
                  c·b = {scaledB.toFixed(1)}
                </text>
              </g>
            </svg>
          </div>

          {/* Controls */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Value a:</span>
                <span className="font-mono text-brand-mint">{signA}</span>
              </label>
              <input
                type="range"
                min="-4"
                max="3"
                step="1"
                value={signA}
                onChange={(e) => setSignA(parseInt(e.target.value))}
                className="w-full mt-2 accent-brand-mint"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Value b (must be &gt; a):</span>
                <span className="font-mono text-brand-indigo">{signB}</span>
              </label>
              <input
                type="range"
                min="-2"
                max="5"
                step="1"
                value={signB}
                onChange={(e) => setSignB(Math.max(signA + 1, parseInt(e.target.value)))}
                className="w-full mt-2 accent-brand-indigo"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Multiplier (c):</span>
                <span className={`font-mono font-bold ${multiplierC < 0 ? 'text-amber-400' : 'text-brand-mint'}`}>
                  {multiplierC}
                </span>
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
    </div>
  );
};

export default NumberLineTool;
