import React, { useState } from 'react';
import MathText from '../components/MathText';
import { completeSquareForCircle, calculateParabola } from '../lib/math';
import { Sliders, Move, Disc, Binary } from 'lucide-react';

export const GraphShiftTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shift' | 'circle' | 'square'>('shift');

  // Shift Playground State
  const [baseType, setBaseType] = useState<'parabola' | 'cubic' | 'abs' | 'sqrt'>('parabola');
  const [shiftH, setShiftH] = useState<number>(2);
  const [shiftK, setShiftK] = useState<number>(-1);

  // Circle Shifter State
  const [circleH, setCircleH] = useState<number>(-2);
  const [circleK, setCircleK] = useState<number>(3);
  const [circleRadius, setCircleRadius] = useState<number>(4);
  const [testPt, setTestPt] = useState<{ x: number; y: number }>({ x: 0, y: 3 });

  // Completing the Square State
  const [eqD, setEqD] = useState<number>(4);
  const [eqE, setEqE] = useState<number>(-6);
  const [eqF, setEqF] = useState<number>(-3);

  // SVG parameters
  const svgSize = 380;
  const range = 6;
  const toSvgX = (x: number) => ((x + range) / (2 * range)) * svgSize;
  const toSvgY = (y: number) => ((range - y) / (2 * range)) * svgSize;

  // Base Function definition
  const baseFunc = (x: number): number | null => {
    switch (baseType) {
      case 'parabola': return x * x;
      case 'cubic': return 0.5 * x * x * x;
      case 'abs': return Math.abs(x);
      case 'sqrt': return x >= 0 ? 2 * Math.sqrt(x) : null;
    }
  };

  // Shifted curve path
  const shiftedPathD = React.useMemo(() => {
    let d = '';
    let drawing = false;
    for (let x = -range; x <= range; x += 0.05) {
      const baseY = baseFunc(x - shiftH);
      if (baseY === null || isNaN(baseY) || Math.abs(baseY + shiftK) > range + 2) {
        drawing = false;
      } else {
        const sx = toSvgX(x);
        const sy = toSvgY(baseY + shiftK);
        if (!drawing) {
          d += `M ${sx.toFixed(1)} ${sy.toFixed(1)} `;
          drawing = true;
        } else {
          d += `L ${sx.toFixed(1)} ${sy.toFixed(1)} `;
        }
      }
    }
    return d;
  }, [baseType, shiftH, shiftK]);

  // Base unshifted curve path
  const basePathD = React.useMemo(() => {
    let d = '';
    let drawing = false;
    for (let x = -range; x <= range; x += 0.05) {
      const baseY = baseFunc(x);
      if (baseY === null || isNaN(baseY) || Math.abs(baseY) > range + 2) {
        drawing = false;
      } else {
        const sx = toSvgX(x);
        const sy = toSvgY(baseY);
        if (!drawing) {
          d += `M ${sx.toFixed(1)} ${sy.toFixed(1)} `;
          drawing = true;
        } else {
          d += `L ${sx.toFixed(1)} ${sy.toFixed(1)} `;
        }
      }
    }
    return d;
  }, [baseType]);

  // Circle Region Check
  const testDistSq = (testPt.x - circleH) ** 2 + (testPt.y - circleK) ** 2;
  const radiusSq = circleRadius ** 2;
  const testRegion =
    Math.abs(testDistSq - radiusSq) < 1e-4
      ? 'On Boundary'
      : testDistSq < radiusSq
      ? 'Inside Circle'
      : 'Outside Circle';

  // Completing the square solution
  const squareSolution = completeSquareForCircle(eqD, eqE, eqF);

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Graph Translation & Circle Lab
          </h3>
          <p className="text-xs text-slate-400">
            Section 4 • Vertical/Horizontal Shifts, Circle Equations, and Completing the Square
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('shift')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'shift'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Shift Playground
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('circle')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'circle'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Circle Shifter
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('square')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'square'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Complete the Square
          </button>
        </div>
      </div>

      {activeTab === 'shift' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* SVG Visualizer */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] aspect-square bg-[#090D16] rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
              <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full">
                {/* Axes */}
                <line x1="0" y1={toSvgY(0)} x2={svgSize} y2={toSvgY(0)} stroke="#475569" strokeWidth="1.5" />
                <line x1={toSvgX(0)} y1="0" x2={toSvgX(0)} y2={svgSize} stroke="#475569" strokeWidth="1.5" />

                {/* Base curve (dashed slate) */}
                <path d={basePathD} fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="4 4" />

                {/* Shifted curve (bold mint) */}
                <path d={shiftedPathD} fill="none" stroke="#2DD4BF" strokeWidth="3.5" />

                {/* Key Point / Vertex marker */}
                <circle cx={toSvgX(shiftH)} cy={toSvgY(shiftK)} r="6" fill="#FBBF24" stroke="#FFF" strokeWidth="2" />
                <text
                  x={toSvgX(shiftH)}
                  y={toSvgY(shiftK) - 12}
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  ({shiftH}, {shiftK})
                </text>
              </svg>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              Unshifted Base Curve (Dashed Gray) → Shifted Curve (Solid Mint)
            </p>
          </div>

          {/* Controls & Math Details */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-xs text-slate-400 uppercase font-semibold">Base Equation:</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 'parabola', label: 'y = x²' },
                  { id: 'cubic', label: 'y = 0.5x³' },
                  { id: 'abs', label: 'y = |x|' },
                  { id: 'sqrt', label: 'y = 2√x' },
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setBaseType(item.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold border transition-colors ${
                      baseType === item.id
                        ? 'bg-brand-indigo text-white border-brand-indigo'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Translated Equation Box */}
              <div className="p-3 rounded-lg bg-[#090D16] border border-brand-mint/30 space-y-1">
                <span className="text-xs text-slate-400 block font-sans">Shifted Equation:</span>
                <div className="font-mono text-sm text-brand-mint font-bold">
                  <MathText
                    math={`y = f(x ${shiftH >= 0 ? '- ' + shiftH : '+ ' + Math.abs(shiftH)}) ${
                      shiftK >= 0 ? '+ ' + shiftK : '- ' + Math.abs(shiftK)
                    }`}
                  />
                </div>
                <p className="text-[11px] text-slate-300">
                  Shifted <strong className="text-white">{Math.abs(shiftH)} units {shiftH >= 0 ? 'Right' : 'Left'}</strong> and{' '}
                  <strong className="text-white">{Math.abs(shiftK)} units {shiftK >= 0 ? 'Up' : 'Down'}</strong>.
                </p>
              </div>
            </div>

            {/* Shift Sliders */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 flex justify-between">
                  <span>Horizontal Shift (h):</span>
                  <span className="font-mono text-brand-mint font-bold">{shiftH > 0 ? `+${shiftH}` : shiftH}</span>
                </label>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={shiftH}
                  onChange={(e) => setShiftH(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-brand-mint"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-300 flex justify-between">
                  <span>Vertical Shift (k):</span>
                  <span className="font-mono text-brand-indigo font-bold">{shiftK > 0 ? `+${shiftK}` : shiftK}</span>
                </label>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={shiftK}
                  onChange={(e) => setShiftK(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-brand-indigo"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'circle' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Circle Visualizer */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[380px] aspect-square bg-[#090D16] rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
              <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full">
                {/* Axes */}
                <line x1="0" y1={toSvgY(0)} x2={svgSize} y2={toSvgY(0)} stroke="#475569" strokeWidth="1.5" />
                <line x1={toSvgX(0)} y1="0" x2={toSvgX(0)} y2={svgSize} stroke="#475569" strokeWidth="1.5" />

                {/* Shaded Circle Interior */}
                <circle
                  cx={toSvgX(circleH)}
                  cy={toSvgY(circleK)}
                  r={(circleRadius / (2 * range)) * svgSize}
                  fill="rgba(45, 212, 191, 0.12)"
                  stroke="#2DD4BF"
                  strokeWidth="2.5"
                />

                {/* Center (h, k) */}
                <circle cx={toSvgX(circleH)} cy={toSvgY(circleK)} r="5" fill="#FBBF24" />

                {/* Test Point */}
                <circle
                  cx={toSvgX(testPt.x)}
                  cy={toSvgY(testPt.y)}
                  r="6"
                  fill={testRegion === 'Inside Circle' ? '#2DD4BF' : testRegion === 'On Boundary' ? '#FBBF24' : '#F43F5E'}
                  stroke="#FFF"
                  strokeWidth="2"
                />
                <text
                  x={toSvgX(testPt.x)}
                  y={toSvgY(testPt.y) - 10}
                  textAnchor="middle"
                  fill="#FFF"
                  fontSize="11"
                  fontWeight="bold"
                >
                  P({testPt.x}, {testPt.y})
                </text>
              </svg>
            </div>
          </div>

          {/* Circle Controls */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 uppercase font-semibold">Standard Form:</span>
              <div className="font-mono text-sm text-brand-mint font-bold">
                <MathText
                  math={`(x ${circleH >= 0 ? '- ' + circleH : '+ ' + Math.abs(circleH)})^2 + (y ${
                    circleK >= 0 ? '- ' + circleK : '+ ' + Math.abs(circleK)
                  })^2 = ${circleRadius}^2`}
                />
              </div>
              <p className="text-xs text-slate-300">
                Center: <strong className="text-white font-mono">({circleH}, {circleK})</strong>, Radius:{' '}
                <strong className="text-white font-mono">{circleRadius}</strong>
              </p>

              {/* Point Location Status */}
              <div
                className={`p-3 rounded-lg border text-xs font-semibold mt-3 ${
                  testRegion === 'Inside Circle'
                    ? 'bg-emerald-950/40 border-emerald-500/30 text-emerald-300'
                    : testRegion === 'On Boundary'
                    ? 'bg-amber-950/40 border-amber-500/30 text-amber-300'
                    : 'bg-rose-950/40 border-rose-500/30 text-rose-300'
                }`}
              >
                Point P({testPt.x}, {testPt.y}) is: <span className="underline">{testRegion}</span>
                <div className="font-mono text-[11px] font-normal text-slate-400 mt-1">
                  (x - h)² + (y - k)² = {testDistSq.toFixed(1)} vs a² = {radiusSq}
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3 text-xs">
              <div>
                <label className="text-slate-300 flex justify-between">
                  <span>Center X (h): {circleH}</span>
                </label>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={circleH}
                  onChange={(e) => setCircleH(parseInt(e.target.value))}
                  className="w-full accent-brand-mint"
                />
              </div>

              <div>
                <label className="text-slate-300 flex justify-between">
                  <span>Center Y (k): {circleK}</span>
                </label>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="1"
                  value={circleK}
                  onChange={(e) => setCircleK(parseInt(e.target.value))}
                  className="w-full accent-brand-mint"
                />
              </div>

              <div>
                <label className="text-slate-300 flex justify-between">
                  <span>Radius a: {circleRadius}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  step="0.5"
                  value={circleRadius}
                  onChange={(e) => setCircleRadius(parseFloat(e.target.value))}
                  className="w-full accent-brand-indigo"
                />
              </div>

              <div>
                <label className="text-slate-300 flex justify-between">
                  <span>Test Point X: {testPt.x}</span>
                </label>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.5"
                  value={testPt.x}
                  onChange={(e) => setTestPt({ ...testPt, x: parseFloat(e.target.value) })}
                  className="w-full accent-amber-400"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'square' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Binary className="w-4 h-4 text-brand-mint" />
              Completing the Square for Circles (Textbook Example 5, p. 30)
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              General form: <MathText math={`x^2 + y^2 ${eqD >= 0 ? '+ ' + eqD : eqD}x ${eqE >= 0 ? '+ ' + eqE : eqE}y ${eqF >= 0 ? '+ ' + eqF : eqF} = 0`} />
            </p>

            {/* Quick Presets */}
            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  setEqD(4);
                  setEqE(-6);
                  setEqF(-3);
                }}
                className="px-3 py-1 rounded bg-brand-mint/20 border border-brand-mint/40 text-brand-mint text-xs font-semibold"
              >
                Reset to Textbook Example 5 (p. 30)
              </button>
            </div>
          </div>

          {/* Stepper Display */}
          <div className="space-y-3">
            {squareSolution.isValid ? (
              squareSolution.steps.map((st) => (
                <div key={st.stepNumber} className="p-4 rounded-xl bg-slate-900/70 border border-slate-800 space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="w-6 h-6 rounded-full bg-brand-indigo/30 text-brand-indigo border border-brand-indigo/40 flex items-center justify-center font-bold text-xs">
                      {st.stepNumber}
                    </span>
                    <span className="text-xs text-slate-300 font-medium">{st.text}</span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[#090D16] border border-slate-800/80 font-mono text-sm text-center">
                    <MathText math={st.latex} block />
                  </div>
                </div>
              ))
            ) : (
              <div className="p-4 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs">
                {squareSolution.error}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphShiftTool;
