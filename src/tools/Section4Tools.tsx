import React, { useState } from 'react';
import MathText from '../components/MathText';
import { 
  Move, 
  CircleDot, 
  TrendingUp, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  AlertTriangle,
  HelpCircle,
  Maximize2
} from 'lucide-react';

export const Section4Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'shifter' | 'circles' | 'parabola' | 'figures'>('shifter');

  // Master Shifter State
  const [baseFunc, setBaseFunc] = useState<'x2' | 'x3' | 'sqrt' | 'abs' | 'recip'>('x2');
  const [shiftH, setShiftH] = useState<number>(2);
  const [shiftK, setShiftK] = useState<number>(1);

  // Circle Completing the Square State
  const [circlePreset, setCirclePreset] = useState<'ex9' | 'preset2' | 'preset3'>('ex9');
  const [circleRegion, setCircleRegion] = useState<'boundary' | 'interior' | 'exterior'>('interior');
  const [circleStep, setCircleStep] = useState<number>(3); // All steps visible

  // Parabola 5-Step Studio State (default Example 12: y = -0.5x² - x + 4)
  const [coeffA, setCoeffA] = useState<number>(-0.5);
  const [coeffB, setCoeffB] = useState<number>(-1);
  const [coeffC, setCoeffC] = useState<number>(4);

  // Figures Sub-Tab State
  const [activeFigure, setActiveFigure] = useState<'fig33_34' | 'fig35' | 'fig36_37' | 'fig38_40' | 'fig41_42'>('fig41_42');

  // SVG coordinate helpers (size 400x400, view -6 to 6)
  const svgSize = 400;
  const range = 6;
  const toSvgX = (x: number) => ((x + range) / (2 * range)) * svgSize;
  const toSvgY = (y: number) => ((range - y) / (2 * range)) * svgSize;

  // Base Function definition for Shifter
  const evalBase = (x: number, func: string) => {
    switch (func) {
      case 'x2':
        return x * x;
      case 'x3':
        return 0.25 * x * x * x;
      case 'sqrt':
        return x >= 0 ? Math.sqrt(x) : NaN;
      case 'abs':
        return Math.abs(x);
      case 'recip':
        return Math.abs(x) > 0.05 ? 1 / x : NaN;
      default:
        return x * x;
    }
  };

  // Circle parameters from preset
  const getCircleParams = () => {
    switch (circlePreset) {
      case 'ex9':
        // x² + y² + 4x - 6y - 3 = 0 => (x + 2)² + (y - 3)² = 16
        return {
          equationStr: 'x^2 + y^2 + 4x - 6y - 3 = 0',
          D: 4,
          E: -6,
          F: -3,
          h: -2,
          k: 3,
          r: 4,
          rSquared: 16,
          stepsText: [
            '(x^2 + 4x) + (y^2 - 6y) = 3',
            '\\left(x^2 + 4x + 4\\right) + \\left(y^2 - 6y + 9\\right) = 3 + 4 + 9',
            '(x + 2)^2 + (y - 3)^2 = 16 = 4^2',
            '\\text{Center: } (-2, 3), \\quad \\text{Radius: } a = 4'
          ]
        };
      case 'preset2':
        // x² + y² - 6x + 8y = 0 => (x - 3)² + (y + 4)² = 25
        return {
          equationStr: 'x^2 + y^2 - 6x + 8y = 0',
          D: -6,
          E: 8,
          F: 0,
          h: 3,
          k: -4,
          r: 5,
          rSquared: 25,
          stepsText: [
            '(x^2 - 6x) + (y^2 + 8y) = 0',
            '\\left(x^2 - 6x + 9\\right) + \\left(y^2 + 8y + 16\\right) = 0 + 9 + 16',
            '(x - 3)^2 + (y + 4)^2 = 25 = 5^2',
            '\\text{Center: } (3, -4), \\quad \\text{Radius: } a = 5'
          ]
        };
      case 'preset3':
        // x² + y² + 2x + 4y - 4 = 0 => (x + 1)² + (y + 2)² = 9
        return {
          equationStr: 'x^2 + y^2 + 2x + 4y - 4 = 0',
          D: 2,
          E: 4,
          F: -4,
          h: -1,
          k: -2,
          r: 3,
          rSquared: 9,
          stepsText: [
            '(x^2 + 2x) + (y^2 + 4y) = 4',
            '\\left(x^2 + 2x + 1\\right) + \\left(y^2 + 4y + 4\\right) = 4 + 1 + 4',
            '(x + 1)^2 + (y + 2)^2 = 9 = 3^2',
            '\\text{Center: } (-1, -2), \\quad \\text{Radius: } a = 3'
          ]
        };
    }
  };

  const circle = getCircleParams();

  // Parabola 5-step calculations
  const pA = coeffA !== 0 ? coeffA : 0.001;
  const pB = coeffB;
  const pC = coeffC;
  const vertexX = -pB / (2 * pA);
  const vertexY = pA * vertexX * vertexX + pB * vertexX + pC;
  const discr = pB * pB - 4 * pA * pC;
  const xIntercepts: number[] = [];
  if (discr >= 0) {
    const x1 = (-pB - Math.sqrt(discr)) / (2 * pA);
    const x2 = (-pB + Math.sqrt(discr)) / (2 * pA);
    xIntercepts.push(x1, x2);
  }
  const yIntercept = pC;
  const symmetricX = 2 * vertexX;

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Section 4 Visual Studio & Translation Lab
          </h3>
          <p className="text-xs text-slate-400">
            Rigid graph shifts, completing the square for circles, inequality disks, and quadratic parabolas.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('shifter')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'shifter' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Move className="w-3.5 h-3.5" />
            Master Graph Shifter
          </button>
          <button
            onClick={() => setActiveTab('circles')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'circles' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <CircleDot className="w-3.5 h-3.5" />
            Circles & Completing Square
          </button>
          <button
            onClick={() => setActiveTab('parabola')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'parabola' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <TrendingUp className="w-3.5 h-3.5" />
            5-Step Parabola Studio
          </button>
          <button
            onClick={() => setActiveTab('figures')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'figures' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Figures 33–42
          </button>
        </div>
      </div>

      {/* TAB 1: MASTER GRAPH SHIFTER */}
      {activeTab === 'shifter' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Live Translation Plane
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-slate-800 text-brand-mint border border-slate-700">
                Shift: ({shiftH >= 0 ? `+${shiftH}` : shiftH}, {shiftK >= 0 ? `+${shiftK}` : shiftK})
              </span>
            </div>

            <svg width={svgSize} height={svgSize} className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
              {/* Grid Lines */}
              {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((coord) => (
                <React.Fragment key={coord}>
                  <line
                    x1={toSvgX(coord)}
                    y1={0}
                    x2={toSvgX(coord)}
                    y2={svgSize}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <line
                    x1={0}
                    y1={toSvgY(coord)}
                    x2={svgSize}
                    y2={toSvgY(coord)}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </React.Fragment>
              ))}

              {/* Axes */}
              <line x1={0} y1={toSvgY(0)} x2={svgSize} y2={toSvgY(0)} stroke="#475569" strokeWidth="2" />
              <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={svgSize} stroke="#475569" strokeWidth="2" />

              {/* Base Ghost Curve (at origin) */}
              <path
                d={Array.from({ length: 120 }, (_, i) => {
                  const x = -5.5 + (i / 119) * 11;
                  const y = evalBase(x, baseFunc);
                  if (isNaN(y) || y < -6 || y > 6) return '';
                  return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                }).join(' ')}
                fill="none"
                stroke="#475569"
                strokeWidth="2"
                strokeDasharray="4,4"
              />

              {/* Shifted Curve */}
              <path
                d={Array.from({ length: 120 }, (_, i) => {
                  const x = -5.5 + (i / 119) * 11;
                  // shifted y: f(x - h) + k
                  const y = evalBase(x - shiftH, baseFunc) + shiftK;
                  if (isNaN(y) || y < -6 || y > 6) return '';
                  return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                }).join(' ')}
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="3.5"
              />

              {/* Translation Vector from (0,0) to (h, k) */}
              <line
                x1={toSvgX(0)}
                y1={toSvgY(0)}
                x2={toSvgX(shiftH)}
                y2={toSvgY(shiftK)}
                stroke="#f59e0b"
                strokeWidth="2"
                strokeDasharray="3,3"
              />

              {/* Anchor points */}
              <circle cx={toSvgX(0)} cy={toSvgY(0)} r="4" fill="#64748b" />
              <circle cx={toSvgX(shiftH)} cy={toSvgY(shiftK)} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <text
                x={toSvgX(shiftH) + 8}
                y={toSvgY(shiftK) - 6}
                fill="#f59e0b"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                ({shiftH}, {shiftK})
              </text>
            </svg>

            {/* Sliders */}
            <div className="w-full mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Horizontal Shift h (Right/Left):</span>
                  <span className="font-mono text-brand-mint font-bold">{shiftH > 0 ? `+${shiftH}` : shiftH}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={shiftH}
                  onChange={(e) => setShiftH(parseFloat(e.target.value))}
                  className="w-full accent-brand-mint cursor-pointer"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Vertical Shift k (Up/Down):</span>
                  <span className="font-mono text-brand-mint font-bold">{shiftK > 0 ? `+${shiftK}` : shiftK}</span>
                </div>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.5"
                  value={shiftK}
                  onChange={(e) => setShiftK(parseFloat(e.target.value))}
                  className="w-full accent-brand-mint cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Function Preset Selector */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Select Base Curve to Shift:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setBaseFunc('x2')}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    baseFunc === 'x2'
                      ? 'bg-brand-mint/10 border-brand-mint text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Parabola y = x²
                </button>
                <button
                  onClick={() => setBaseFunc('x3')}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    baseFunc === 'x3'
                      ? 'bg-brand-mint/10 border-brand-mint text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Cubic y = x³
                </button>
                <button
                  onClick={() => setBaseFunc('sqrt')}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    baseFunc === 'sqrt'
                      ? 'bg-brand-mint/10 border-brand-mint text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Square Root y = √x
                </button>
                <button
                  onClick={() => setBaseFunc('abs')}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    baseFunc === 'abs'
                      ? 'bg-brand-mint/10 border-brand-mint text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Absolute Value y = |x|
                </button>
                <button
                  onClick={() => setBaseFunc('recip')}
                  className={`p-2 rounded-lg border text-left transition-all col-span-2 ${
                    baseFunc === 'recip'
                      ? 'bg-brand-mint/10 border-brand-mint text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Hyperbola y = 1/x
                </button>
              </div>
            </div>

            {/* Formula Transformation Card */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-brand-mint" />
                Active Shifted Equation
              </h4>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                <div className="text-slate-400">Standard Shift Formulation:</div>
                <div className="text-sm font-bold text-brand-mint">
                  {baseFunc === 'x2' && <MathText text={`$y = (x ${shiftH >= 0 ? `- ${shiftH}` : `+ ${Math.abs(shiftH)}`})^2 ${shiftK >= 0 ? `+ ${shiftK}` : `- ${Math.abs(shiftK)}`}$`} />}
                  {baseFunc === 'x3' && <MathText text={`$y = (x ${shiftH >= 0 ? `- ${shiftH}` : `+ ${Math.abs(shiftH)}`})^3 ${shiftK >= 0 ? `+ ${shiftK}` : `- ${Math.abs(shiftK)}`}$`} />}
                  {baseFunc === 'sqrt' && <MathText text={`$y = \\sqrt{x ${shiftH >= 0 ? `- ${shiftH}` : `+ ${Math.abs(shiftH)}`}} ${shiftK >= 0 ? `+ ${shiftK}` : `- ${Math.abs(shiftK)}`}$`} />}
                  {baseFunc === 'abs' && <MathText text={`$y = |x ${shiftH >= 0 ? `- ${shiftH}` : `+ ${Math.abs(shiftH)}`}| ${shiftK >= 0 ? `+ ${shiftK}` : `- ${Math.abs(shiftK)}`}$`} />}
                  {baseFunc === 'recip' && <MathText text={`$y = \\frac{1}{x ${shiftH >= 0 ? `- ${shiftH}` : `+ ${Math.abs(shiftH)}`}} ${shiftK >= 0 ? `+ ${shiftK}` : `- ${Math.abs(shiftK)}`}$`} />}
                </div>

                <div className="border-t border-slate-800 pt-2 space-y-1 text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Anchor point shifted to:</span>
                    <span className="font-mono font-bold text-brand-gold">({shiftH}, {shiftK})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Horizontal translation:</span>
                    <span>{shiftH > 0 ? `Right by ${shiftH}` : shiftH < 0 ? `Left by ${Math.abs(shiftH)}` : 'None'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Vertical translation:</span>
                    <span>{shiftK > 0 ? `Up by ${shiftK}` : shiftK < 0 ? `Down by ${Math.abs(shiftK)}` : 'None'}</span>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs leading-relaxed space-y-1">
                <span className="font-bold block">Why is horizontal opposite?</span>
                <p className="text-[11px]">
                  Subtracting $h$ inside $f(x - h)$ requires an input $x$ that is $h$ units larger to produce the identical value. Thus $y = (x - 2)^2$ shifts the whole curve <strong>RIGHT</strong> to $x = 2$.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CIRCLES & COMPLETING THE SQUARE */}
      {activeTab === 'circles' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Circle & Inequality Region Plot
              </span>
              <div className="flex gap-1 text-[11px]">
                <button
                  onClick={() => setCircleRegion('boundary')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    circleRegion === 'boundary' ? 'bg-brand-mint text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Boundary (= a²)
                </button>
                <button
                  onClick={() => setCircleRegion('interior')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    circleRegion === 'interior' ? 'bg-brand-mint text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Interior (&lt; a²)
                </button>
                <button
                  onClick={() => setCircleRegion('exterior')}
                  className={`px-2 py-0.5 rounded font-medium ${
                    circleRegion === 'exterior' ? 'bg-brand-mint text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Exterior (&gt; a²)
                </button>
              </div>
            </div>

            <svg width={svgSize} height={svgSize} className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
              {/* Grid */}
              {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((coord) => (
                <React.Fragment key={coord}>
                  <line
                    x1={toSvgX(coord)}
                    y1={0}
                    x2={toSvgX(coord)}
                    y2={svgSize}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <line
                    x1={0}
                    y1={toSvgY(coord)}
                    x2={svgSize}
                    y2={toSvgY(coord)}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </React.Fragment>
              ))}

              {/* Axes */}
              <line x1={0} y1={toSvgY(0)} x2={svgSize} y2={toSvgY(0)} stroke="#475569" strokeWidth="2" />
              <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={svgSize} stroke="#475569" strokeWidth="2" />

              {/* Region Shading */}
              {circleRegion === 'exterior' && (
                <rect
                  x="0"
                  y="0"
                  width={svgSize}
                  height={svgSize}
                  fill="#f43f5e"
                  fillOpacity="0.12"
                />
              )}

              {/* Shaded Disk Interior */}
              <circle
                cx={toSvgX(circle.h)}
                cy={toSvgY(circle.k)}
                r={(circle.r / (2 * range)) * svgSize}
                fill={circleRegion === 'interior' ? '#38bdf8' : circleRegion === 'exterior' ? '#020617' : 'none'}
                fillOpacity={circleRegion === 'interior' ? 0.25 : 1}
                stroke="#38bdf8"
                strokeWidth={circleRegion === 'boundary' ? 3.5 : 2}
                strokeDasharray={circleRegion === 'boundary' ? 'none' : '4,4'}
              />

              {/* Center point C(h, k) */}
              <circle cx={toSvgX(circle.h)} cy={toSvgY(circle.k)} r="5" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <text
                x={toSvgX(circle.h) + 8}
                y={toSvgY(circle.k) - 6}
                fill="#f59e0b"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                C({circle.h}, {circle.k})
              </text>

              {/* Radius Vector */}
              <line
                x1={toSvgX(circle.h)}
                y1={toSvgY(circle.k)}
                x2={toSvgX(circle.h + circle.r)}
                y2={toSvgY(circle.k)}
                stroke="#38bdf8"
                strokeWidth="2"
              />
              <text
                x={toSvgX(circle.h + circle.r / 2)}
                y={toSvgY(circle.k) - 6}
                fill="#38bdf8"
                fontSize="11"
                textAnchor="middle"
                fontWeight="bold"
              >
                a = {circle.r}
              </text>
            </svg>

            {/* Presets */}
            <div className="w-full mt-4 flex gap-2">
              <button
                onClick={() => setCirclePreset('ex9')}
                className={`flex-1 p-2 rounded-lg border text-xs font-medium transition-all ${
                  circlePreset === 'ex9'
                    ? 'bg-brand-mint text-slate-950 border-brand-mint'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                Textbook Example 9
              </button>
              <button
                onClick={() => setCirclePreset('preset2')}
                className={`flex-1 p-2 rounded-lg border text-xs font-medium transition-all ${
                  circlePreset === 'preset2'
                    ? 'bg-brand-mint text-slate-950 border-brand-mint'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                Through Origin (r = 5)
              </button>
              <button
                onClick={() => setCirclePreset('preset3')}
                className={`flex-1 p-2 rounded-lg border text-xs font-medium transition-all ${
                  circlePreset === 'preset3'
                    ? 'bg-brand-mint text-slate-950 border-brand-mint'
                    : 'bg-slate-900 border-slate-800 text-slate-300'
                }`}
              >
                Radius 3 Circle
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Step-by-Step Completing the Square Card */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint" />
                Completing the Square Procedure
              </h4>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">Given Equation:</span>
                <div className="font-mono text-sm text-white font-bold">
                  <MathText text={`$${circle.equationStr}$`} />
                </div>
              </div>

              <div className="space-y-2 text-xs">
                {circle.stepsText.map((step, idx) => (
                  <div key={idx} className="p-2.5 bg-slate-950/80 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[10px] font-bold text-brand-mint uppercase tracking-wider">
                      Step {idx + 1}:
                    </span>
                    <div className="font-mono text-slate-200">
                      <MathText text={`$${step}$`} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-brand-mint/40 text-xs space-y-1">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Center (h, k):</span>
                  <span className="font-mono font-bold text-brand-gold">({circle.h}, {circle.k})</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Radius a:</span>
                  <span className="font-mono font-bold text-brand-mint">{circle.r}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Active Inequality:</span>
                  <span className="font-mono font-bold text-white">
                    {circleRegion === 'boundary' && `(x - ${circle.h})² + (y - ${circle.k})² = ${circle.rSquared}`}
                    {circleRegion === 'interior' && `(x - ${circle.h})² + (y - ${circle.k})² < ${circle.rSquared}`}
                    {circleRegion === 'exterior' && `(x - ${circle.h})² + (y - ${circle.k})² > ${circle.rSquared}`}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 5-STEP PARABOLA STUDIO */}
      {activeTab === 'parabola' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Textbook Example 12 Quadratic Studio
              </span>
              <button
                onClick={() => {
                  setCoeffA(-0.5);
                  setCoeffB(-1);
                  setCoeffC(4);
                }}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-brand-mint border border-slate-700 hover:bg-slate-700"
              >
                Reset to Example 12
              </button>
            </div>

            <svg width={svgSize} height={svgSize} className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
              {/* Grid */}
              {[-5, -4, -3, -2, -1, 1, 2, 3, 4, 5].map((coord) => (
                <React.Fragment key={coord}>
                  <line
                    x1={toSvgX(coord)}
                    y1={0}
                    x2={toSvgX(coord)}
                    y2={svgSize}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                  <line
                    x1={0}
                    y1={toSvgY(coord)}
                    x2={svgSize}
                    y2={toSvgY(coord)}
                    stroke="#1e293b"
                    strokeWidth="1"
                    strokeDasharray="2,2"
                  />
                </React.Fragment>
              ))}

              {/* Axes */}
              <line x1={0} y1={toSvgY(0)} x2={svgSize} y2={toSvgY(0)} stroke="#475569" strokeWidth="2" />
              <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={svgSize} stroke="#475569" strokeWidth="2" />

              {/* Axis of Symmetry x = -b/(2a) */}
              <line
                x1={toSvgX(vertexX)}
                y1={0}
                x2={toSvgX(vertexX)}
                y2={svgSize}
                stroke="#f43f5e"
                strokeWidth="2"
                strokeDasharray="4,4"
              />

              {/* Parabola Curve */}
              <path
                d={Array.from({ length: 121 }, (_, i) => {
                  const x = -6 + (i / 120) * 12;
                  const y = pA * x * x + pB * x + pC;
                  if (isNaN(y) || y < -6 || y > 6) return '';
                  return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                }).join(' ')}
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="3.5"
              />

              {/* Vertex Point */}
              <circle cx={toSvgX(vertexX)} cy={toSvgY(vertexY)} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />
              <text
                x={toSvgX(vertexX) + 8}
                y={toSvgY(vertexY) - 6}
                fill="#f59e0b"
                fontSize="11"
                fontFamily="monospace"
                fontWeight="bold"
              >
                V({vertexX.toFixed(1)}, {vertexY.toFixed(1)})
              </text>

              {/* y-intercept (0, c) */}
              <circle cx={toSvgX(0)} cy={toSvgY(yIntercept)} r="5" fill="#38bdf8" />
              <text x={toSvgX(0) + 8} y={toSvgY(yIntercept) + 4} fill="#38bdf8" fontSize="10">
                (0, {yIntercept.toFixed(1)})
              </text>

              {/* Reflection of y-intercept across axis */}
              <circle cx={toSvgX(symmetricX)} cy={toSvgY(yIntercept)} r="5" fill="#a855f7" />
              <text x={toSvgX(symmetricX) - 40} y={toSvgY(yIntercept) + 4} fill="#a855f7" fontSize="10">
                ({symmetricX.toFixed(1)}, {yIntercept.toFixed(1)})
              </text>

              {/* x-intercepts */}
              {xIntercepts.map((xi, idx) => (
                <circle key={idx} cx={toSvgX(xi)} cy={toSvgY(0)} r="5" fill="#10b981" />
              ))}
            </svg>

            {/* Coefficient Sliders */}
            <div className="w-full mt-4 space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Coefficient a (direction & width):</span>
                  <span className="font-mono text-brand-mint font-bold">{coeffA}</span>
                </div>
                <input
                  type="range"
                  min="-2"
                  max="2"
                  step="0.1"
                  value={coeffA}
                  onChange={(e) => setCoeffA(parseFloat(e.target.value) || 0.1)}
                  className="w-full accent-brand-mint cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Coefficient b:</span>
                    <span className="font-mono text-brand-mint font-bold">{coeffB}</span>
                  </div>
                  <input
                    type="range"
                    min="-4"
                    max="4"
                    step="0.5"
                    value={coeffB}
                    onChange={(e) => setCoeffB(parseFloat(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Constant c (y-intercept):</span>
                    <span className="font-mono text-brand-mint font-bold">{coeffC}</span>
                  </div>
                  <input
                    type="range"
                    min="-5"
                    max="5"
                    step="0.5"
                    value={coeffC}
                    onChange={(e) => setCoeffC(parseFloat(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* The 5 Textbook Steps */}
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint" />
                The 5-Step Textbook Graphing Breakdown
              </h4>

              <div className="space-y-2 text-xs">
                {/* Step 1 */}
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-brand-mint">Step 1: Vertex & Axis of Symmetry</span>
                    <span className="font-mono text-brand-gold font-bold">x = {vertexX.toFixed(2)}</span>
                  </div>
                  <MathText text={`$x = -\\frac{b}{2a} = -\\frac{${pB}}{2(${pA})} = ${vertexX.toFixed(2)}$`} />
                  <div className="text-[11px] text-slate-400">
                    Vertex coordinates: <strong className="text-white">({vertexX.toFixed(2)}, {vertexY.toFixed(2)})</strong>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-brand-mint">Step 2: Opening Direction</span>
                  <p className="text-[11px] text-slate-300">
                    Since <MathText text={`$a = ${pA} ${pA > 0 ? '> 0' : '< 0'}$`} />, the parabola opens{' '}
                    <strong className={pA > 0 ? 'text-emerald-400' : 'text-rose-400'}>
                      {pA > 0 ? 'UPWARD' : 'DOWNWARD'}
                    </strong>.
                  </p>
                </div>

                {/* Step 3 */}
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-brand-mint">Step 3: y-Intercept</span>
                  <p className="text-[11px] text-slate-300">
                    Set $x = 0 \\implies y = c = ${pC}$, giving point <strong className="text-sky-400">(0, {pC})</strong>.
                  </p>
                </div>

                {/* Step 4 */}
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-brand-mint">Step 4: Reflection Across Axis</span>
                  <p className="text-[11px] text-slate-300">
                    Reflecting $(0, {pC})$ across $x = {vertexX.toFixed(2)}$ gives mirror point{' '}
                    <strong className="text-purple-400">({symmetricX.toFixed(2)}, {pC})</strong>.
                  </p>
                </div>

                {/* Step 5 */}
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                  <span className="font-bold text-brand-mint">Step 5: x-Intercepts (Roots)</span>
                  <p className="text-[11px] text-slate-300">
                    Discriminant <MathText text={`$\\Delta = b^2 - 4ac = ${discr.toFixed(2)}$`} />.
                    {discr > 0 ? (
                      <span> Two real roots at <strong className="text-emerald-400">{xIntercepts.map(r => r.toFixed(2)).join(' and ')}</strong>.</span>
                    ) : discr === 0 ? (
                      <span> One repeated root at <strong className="text-emerald-400">{vertexX.toFixed(2)}</strong>.</span>
                    ) : (
                      <span> No real x-intercepts (curve lies strictly on one side of x-axis).</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FIGURES 33–42 */}
      {activeTab === 'figures' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setActiveFigure('fig33_34')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig33_34' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 33–34: Parabola Translations
            </button>
            <button
              onClick={() => setActiveFigure('fig35')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig35' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Fig 35: Cubic Inflections
            </button>
            <button
              onClick={() => setActiveFigure('fig36_37')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig36_37' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 36–37: Circle Inequality Disks
            </button>
            <button
              onClick={() => setActiveFigure('fig38_40')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig38_40' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 38–40: Families of Parabolas
            </button>
            <button
              onClick={() => setActiveFigure('fig41_42')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig41_42' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 41–42: Example 12 Annotated
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            {activeFigure === 'fig33_34' && (
              <>
                <h4 className="text-sm font-bold text-white">Figures 33 & 34: Vertical and Horizontal Shifts (Page 27)</h4>
                <p className="text-xs text-slate-400">
                  y = x² shifted vertically by ±k and horizontally by (x - h)². Notice that subtracting 2 shifts right to x = 2, and adding 3 shifts left to x = -3.
                </p>
              </>
            )}
            {activeFigure === 'fig35' && (
              <>
                <h4 className="text-sm font-bold text-white">Figure 35: Shifted Cubic Curves (Page 28)</h4>
                <p className="text-xs text-slate-400">
                  Inflection center shifts from (0, 0) to (2, -2) in y = (x - 2)³ - 2, and to (-1, 3) in y = (x + 1)³ + 3.
                </p>
              </>
            )}
            {activeFigure === 'fig36_37' && (
              <>
                <h4 className="text-sm font-bold text-white">Figures 36 & 37: Circle Regions (Pages 28–30)</h4>
                <p className="text-xs text-slate-400">
                  Points satisfying (x - h)² + (y - k)² &lt; a² form the open interior disk; &gt; a² forms the exterior region; = a² is the boundary circumference.
                </p>
              </>
            )}
            {activeFigure === 'fig38_40' && (
              <>
                <h4 className="text-sm font-bold text-white">Figures 38–40: Scaling Parabolas & Half-Branches (Pages 30–31)</h4>
                <p className="text-xs text-slate-400">
                  Vertical scaling y = ax² tightens as |a| increases. Horizontal parabola x = y² is decomposed into function branches y = +√x (upper) and y = -√x (lower).
                </p>
              </>
            )}
            {activeFigure === 'fig41_42' && (
              <>
                <h4 className="text-sm font-bold text-white">Figure 42: Complete Annotated Graph of Example 12 (Page 32)</h4>
                <p className="text-xs text-slate-400">
                  Full step-by-step layout of y = -1/2 x² - x + 4 with vertex (-1, 9/2), axis x = -1, y-intercept (0, 4), symmetric point (-2, 4), and roots (-4, 0) and (2, 0).
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
