import React, { useState } from 'react';
import MathText from '../components/MathText';
import { 
  GitFork, 
  Workflow, 
  Layers, 
  LayoutGrid, 
  ArrowRight, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  HelpCircle,
  Maximize2
} from 'lucide-react';

export const Section3Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'vlt' | 'gallery' | 'pipeline' | 'stepfunctions' | 'figures'>('vlt');

  // VLT State
  const [vltPreset, setVltPreset] = useState<'circle' | 'parabola' | 'cubic' | 'semicircle' | 'sideways'>('circle');
  const [vltX, setVltX] = useState<number>(1.5);

  // Gallery Active Card State
  const [selectedGalleryId, setSelectedGalleryId] = useState<number>(0);

  // Composition Pipeline State
  const [pipePresetIndex, setPipePresetIndex] = useState<number>(0);
  const [pipeX, setPipeX] = useState<number>(3);

  // Step Function State
  const [stepMode, setStepMode] = useState<'floor' | 'ceiling' | 'ex7'>('floor');
  const [stepX, setStepX] = useState<number>(-1.2);

  // Figures tab sub-selection
  const [activeFig, setActiveFig] = useState<'fig23_24' | 'fig25' | 'fig27' | 'fig28' | 'fig29_32'>('fig25');

  // Coordinates helper for SVG (size 400x400, view -5 to 5)
  const svgSize = 400;
  const range = 5;
  const toSvgX = (x: number) => ((x + range) / (2 * range)) * svgSize;
  const toSvgY = (y: number) => ((range - y) / (2 * range)) * svgSize;

  // VLT Calculations
  const getVltIntersections = (x: number) => {
    switch (vltPreset) {
      case 'circle': {
        const radius = 3;
        if (Math.abs(x) > radius) return [];
        const yVal = Math.sqrt(Math.max(0, radius * radius - x * x));
        return yVal === 0 ? [0] : [yVal, -yVal];
      }
      case 'parabola':
        return [0.4 * x * x - 2];
      case 'cubic':
        return [0.15 * (x * x * x - 4 * x)];
      case 'semicircle': {
        const radius = 3;
        if (Math.abs(x) > radius) return [];
        return [Math.sqrt(Math.max(0, radius * radius - x * x))];
      }
      case 'sideways':
        if (x < 0) return [];
        if (x === 0) return [0];
        const yVal = Math.sqrt(x * 2);
        return [yVal, -yVal];
    }
  };

  const vltIntersections = getVltIntersections(vltX);
  const passesVlt = vltPreset !== 'circle' && vltPreset !== 'sideways';

  // 9 Useful Graphs Data
  const usefulGraphs = [
    {
      id: 0,
      name: 'y = x²',
      latex: 'y = x^2',
      type: 'Even (y-axis symmetry)',
      domain: '(-\\infty, \\infty)',
      range: '[0, \\infty)',
      desc: 'Standard upward parabola with vertex at (0, 0). Satisfies f(-x) = (-x)² = x² = f(x).',
      plot: (x: number) => x * x,
      minX: -2.2, maxX: 2.2, minY: -0.5, maxY: 5
    },
    {
      id: 1,
      name: 'y = x³',
      latex: 'y = x^3',
      type: 'Odd (origin symmetry)',
      domain: '(-\\infty, \\infty)',
      range: '(-\\infty, \\infty)',
      desc: 'Standard cubic curve. Passing through origin with inflection point. f(-x) = -f(x).',
      plot: (x: number) => x * x * x,
      minX: -1.8, maxX: 1.8, minY: -5, maxY: 5
    },
    {
      id: 2,
      name: 'y = x^(2/3)',
      latex: 'y = x^{2/3} = (\\sqrt[3]{x})^2',
      type: 'Even (cusp at origin)',
      domain: '(-\\infty, \\infty)',
      range: '[0, \\infty)',
      desc: 'Cusp graph with sharp point at origin. Always non-negative because of squaring.',
      plot: (x: number) => Math.pow(Math.abs(x), 2 / 3),
      minX: -3.5, maxX: 3.5, minY: -0.5, maxY: 3
    },
    {
      id: 3,
      name: 'y = √x',
      latex: 'y = \\sqrt{x}',
      type: 'Neither (Restricted domain)',
      domain: '[0, \\infty)',
      range: '[0, \\infty)',
      desc: 'Principal square root curve; upper branch of parabola x = y².',
      plot: (x: number) => (x >= 0 ? Math.sqrt(x) : NaN),
      minX: -1, maxX: 4.5, minY: -0.5, maxY: 2.5
    },
    {
      id: 4,
      name: 'y = ∛x',
      latex: 'y = \\sqrt[3]{x}',
      type: 'Odd (origin symmetry)',
      domain: '(-\\infty, \\infty)',
      range: '(-\\infty, \\infty)',
      desc: 'Cube root defined for all real numbers including negatives; ∛(-8) = -2.',
      plot: (x: number) => Math.cbrt(x),
      minX: -4, maxX: 4, minY: -2, maxY: 2
    },
    {
      id: 5,
      name: 'y = 1/x',
      latex: 'y = \\frac{1}{x}',
      type: 'Odd (hyperbola)',
      domain: '(-\\infty, 0) \\cup (0, \\infty)',
      range: '(-\\infty, 0) \\cup (0, \\infty)',
      desc: 'Equilateral hyperbola with asymptotes along x- and y-axes. Undefined at x = 0.',
      plot: (x: number) => (x !== 0 ? 1 / x : NaN),
      minX: -4, maxX: 4, minY: -4, maxY: 4
    },
    {
      id: 6,
      name: 'y = 1/x²',
      latex: 'y = \\frac{1}{x^2}',
      type: 'Even (volcano)',
      domain: '(-\\infty, 0) \\cup (0, \\infty)',
      range: '(0, \\infty)',
      desc: 'Symmetric chimney/volcano curve. Always strictly positive for x ≠ 0.',
      plot: (x: number) => (x !== 0 ? 1 / (x * x) : NaN),
      minX: -3, maxX: 3, minY: -0.5, maxY: 5
    },
    {
      id: 7,
      name: 'y = mx',
      latex: 'y = mx \\quad (m = 1.5)',
      type: 'Odd (straight line through origin)',
      domain: '(-\\infty, \\infty)',
      range: '(-\\infty, \\infty)',
      desc: 'Family of direct linear proportions through the origin (0, 0).',
      plot: (x: number) => 1.5 * x,
      minX: -3, maxX: 3, minY: -4, maxY: 4
    },
    {
      id: 8,
      name: 'y = x^(3/2)',
      latex: 'y = x^{3/2} = (\\sqrt{x})^3',
      type: 'Neither (x ≥ 0 only)',
      domain: '[0, \\infty)',
      range: '[0, \\infty)',
      desc: 'Semi-cubical curve growing faster than linear, starting at (0, 0).',
      plot: (x: number) => (x >= 0 ? Math.pow(x, 1.5) : NaN),
      minX: -1, maxX: 3, minY: -0.5, maxY: 5
    },
  ];

  // Pipeline Presets
  const pipelinePresets = [
    {
      name: 'Textbook Example 6: f(u)=√u, g(x)=x+1',
      gLatex: 'g(x) = x + 1',
      fLatex: 'f(u) = \\sqrt{u}',
      fogLatex: '(f \\circ g)(x) = \\sqrt{x + 1}',
      gFn: (x: number) => ({ valid: true, val: x + 1, reason: '' }),
      fFn: (u: number) => ({
        valid: u >= 0,
        val: u >= 0 ? Math.sqrt(u) : NaN,
        reason: u < 0 ? `Cannot take square root of negative intermediate u = ${u.toFixed(2)}` : ''
      }),
      fogDomainLatex: '[-1, \\infty)',
      gofLatex: '(g \\circ f)(x) = \\sqrt{x} + 1 \\text{ on } [0, \\infty)',
      gofFn: (x: number) => (x >= 0 ? Math.sqrt(x) + 1 : NaN)
    },
    {
      name: 'Quadratic & Linear: f(u)=u², g(x)=2x-3',
      gLatex: 'g(x) = 2x - 3',
      fLatex: 'f(u) = u^2',
      fogLatex: '(f \\circ g)(x) = (2x - 3)^2',
      gFn: (x: number) => ({ valid: true, val: 2 * x - 3, reason: '' }),
      fFn: (u: number) => ({ valid: true, val: u * u, reason: '' }),
      fogDomainLatex: '(-\\infty, \\infty)',
      gofLatex: '(g \\circ f)(x) = 2x^2 - 3 \\text{ on } (-\\infty, \\infty)',
      gofFn: (x: number) => 2 * x * x - 3
    },
    {
      name: 'Rational Discontinuity: f(u)=1/u, g(x)=x²-4',
      gLatex: 'g(x) = x^2 - 4',
      fLatex: 'f(u) = \\frac{1}{u}',
      fogLatex: '(f \\circ g)(x) = \\frac{1}{x^2 - 4}',
      gFn: (x: number) => ({ valid: true, val: x * x - 4, reason: '' }),
      fFn: (u: number) => ({
        valid: Math.abs(u) > 1e-6,
        val: Math.abs(u) > 1e-6 ? 1 / u : NaN,
        reason: Math.abs(u) <= 1e-6 ? 'Division by zero! u = 0 occurs when x = ±2' : ''
      }),
      fogDomainLatex: '\\{x \\in \\mathbb{R} \\mid x \\neq \\pm 2\\}',
      gofLatex: '(g \\circ f)(x) = \\frac{1}{x^2} - 4 \\text{ on } x \\neq 0',
      gofFn: (x: number) => (x !== 0 ? 1 / (x * x) - 4 : NaN)
    }
  ];

  const currentPipe = pipelinePresets[pipePresetIndex];
  const gResult = currentPipe.gFn(pipeX);
  const fResult = gResult.valid ? currentPipe.fFn(gResult.val) : { valid: false, val: NaN, reason: 'Step 1 invalid' };
  const gofResult = currentPipe.gofFn(pipeX);

  // Step function calculations
  const floorVal = Math.floor(stepX);
  const ceilVal = Math.ceil(stepX);
  const ex7Val = stepX < 0 ? -stepX : stepX <= 1 ? stepX * stepX : 1;

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Section 3 Visual Studio & Interactive Laboratory
          </h3>
          <p className="text-xs text-slate-400">
            Interactive Vertical Line Test, Figure 26 Graph Gallery, Composition Pipeline, and Step Functions.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('vlt')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'vlt' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <GitFork className="w-3.5 h-3.5" />
            VLT Scanner
          </button>
          <button
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'gallery' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
            Fig 26 Gallery
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'pipeline' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Workflow className="w-3.5 h-3.5" />
            (f ∘ g) Machine
          </button>
          <button
            onClick={() => setActiveTab('stepfunctions')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'stepfunctions' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Floor / Ceiling
          </button>
          <button
            onClick={() => setActiveTab('figures')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'figures' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Figures 23–32
          </button>
        </div>
      </div>

      {/* TAB 1: VERTICAL LINE TEST SCANNER */}
      {activeTab === 'vlt' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Interactive VLT Coordinate Plane
              </span>
              <span className={`text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 ${
                passesVlt ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
              }`}>
                {passesVlt ? <CheckCircle2 className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                {passesVlt ? 'Valid Function of x' : 'Fails VLT (Not a function)'}
              </span>
            </div>

            <svg width={svgSize} height={svgSize} className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
              {/* Grid Lines */}
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((coord) => (
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

              {/* Plotted Curves */}
              {vltPreset === 'circle' && (
                <circle
                  cx={toSvgX(0)}
                  cy={toSvgY(0)}
                  r={((3 / (2 * range)) * svgSize)}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />
              )}

              {vltPreset === 'parabola' && (
                <path
                  d={Array.from({ length: 101 }, (_, i) => {
                    const x = -4 + (i / 100) * 8;
                    const y = 0.4 * x * x - 2;
                    return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />
              )}

              {vltPreset === 'cubic' && (
                <path
                  d={Array.from({ length: 101 }, (_, i) => {
                    const x = -3.5 + (i / 100) * 7;
                    const y = 0.15 * (x * x * x - 4 * x);
                    return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />
              )}

              {vltPreset === 'semicircle' && (
                <path
                  d={Array.from({ length: 101 }, (_, i) => {
                    const x = -3 + (i / 100) * 6;
                    const y = Math.sqrt(Math.max(0, 9 - x * x));
                    return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="3"
                />
              )}

              {vltPreset === 'sideways' && (
                <>
                  <path
                    d={Array.from({ length: 80 }, (_, i) => {
                      const x = (i / 79) * 4.5;
                      const y = Math.sqrt(x * 2);
                      return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                  <path
                    d={Array.from({ length: 80 }, (_, i) => {
                      const x = (i / 79) * 4.5;
                      const y = -Math.sqrt(x * 2);
                      return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="3"
                  />
                </>
              )}

              {/* Scanning Vertical Line */}
              <line
                x1={toSvgX(vltX)}
                y1={0}
                x2={toSvgX(vltX)}
                y2={svgSize}
                stroke={vltIntersections.length > 1 ? '#f43f5e' : '#2dd4bf'}
                strokeWidth="2.5"
                strokeDasharray="4,4"
              />

              {/* Intersection Points */}
              {vltIntersections.map((yVal, idx) => (
                <g key={idx}>
                  <circle
                    cx={toSvgX(vltX)}
                    cy={toSvgY(yVal)}
                    r="6"
                    fill={vltIntersections.length > 1 ? '#f43f5e' : '#2dd4bf'}
                    stroke="#ffffff"
                    strokeWidth="2"
                  />
                  <text
                    x={toSvgX(vltX) + 8}
                    y={toSvgY(yVal) - 6}
                    fill="#ffffff"
                    fontSize="11"
                    fontFamily="monospace"
                  >
                    ({vltX.toFixed(2)}, {yVal.toFixed(2)})
                  </text>
                </g>
              ))}

              {/* X position label on axis */}
              <text
                x={toSvgX(vltX)}
                y={toSvgY(0) + 16}
                fill="#2dd4bf"
                fontSize="11"
                textAnchor="middle"
                fontWeight="bold"
              >
                x = {vltX.toFixed(2)}
              </text>
            </svg>

            {/* Slider */}
            <div className="w-full mt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Slide Scanning Vertical Line x:</span>
                <span className="font-mono text-brand-mint font-bold">{vltX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-4"
                max="4"
                step="0.05"
                value={vltX}
                onChange={(e) => setVltX(parseFloat(e.target.value))}
                className="w-full accent-brand-mint cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            {/* Curve Selector */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Select Test Curve:
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setVltPreset('circle')}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    vltPreset === 'circle'
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Circle x² + y² = 9
                </button>
                <button
                  onClick={() => setVltPreset('parabola')}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    vltPreset === 'parabola'
                      ? 'bg-brand-mint/10 border-brand-mint/40 text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Parabola y = 0.4x² - 2
                </button>
                <button
                  onClick={() => setVltPreset('semicircle')}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    vltPreset === 'semicircle'
                      ? 'bg-brand-mint/10 border-brand-mint/40 text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Upper Semicircle √(9 - x²)
                </button>
                <button
                  onClick={() => setVltPreset('sideways')}
                  className={`p-2 rounded-lg border text-left transition-all ${
                    vltPreset === 'sideways'
                      ? 'bg-rose-500/10 border-rose-500/40 text-rose-300 font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Sideways Parabola x = y²/2
                </button>
                <button
                  onClick={() => setVltPreset('cubic')}
                  className={`p-2 rounded-lg border text-left transition-all col-span-2 ${
                    vltPreset === 'cubic'
                      ? 'bg-brand-mint/10 border-brand-mint/40 text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Cubic y = 0.15(x³ - 4x)
                </button>
              </div>
            </div>

            {/* Diagnostic Card */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <HelpCircle className="w-3.5 h-3.5 text-brand-mint" />
                VLT Analysis at x = {vltX.toFixed(2)}
              </h4>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Intersections Detected:</span>
                  <span className={`font-mono font-bold ${vltIntersections.length > 1 ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {vltIntersections.length} point{vltIntersections.length !== 1 ? 's' : ''}
                  </span>
                </div>
                {vltIntersections.length === 2 && (
                  <div className="text-rose-300 text-[11px] leading-relaxed border-t border-slate-800 pt-2">
                    <AlertTriangle className="w-3.5 h-3.5 inline mr-1 text-rose-400" />
                    <strong>Ambiguous Output:</strong> Input <MathText text={`$x = ${vltX.toFixed(2)}$`} /> yields two distinct values:
                    <br />
                    <MathText text={`$y_1 = ${vltIntersections[0].toFixed(2)}, \\; y_2 = ${vltIntersections[1].toFixed(2)}$`} />
                    <br />
                    Violates the fundamental rule: "Exactly one output $y$ for each input $x$."
                  </div>
                )}
                {vltIntersections.length === 1 && (
                  <div className="text-emerald-300 text-[11px] leading-relaxed border-t border-slate-800 pt-2">
                    <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                    Single unique value <MathText text={`$y = ${vltIntersections[0].toFixed(2)}$`} />. Satisfies function definition.
                  </div>
                )}
                {vltIntersections.length === 0 && (
                  <div className="text-slate-400 text-[11px] border-t border-slate-800 pt-2">
                    Input <MathText text={`$x = ${vltX.toFixed(2)}$`} /> is outside the curve's domain.
                  </div>
                )}
              </div>

              <div className="p-3 bg-slate-950/60 rounded-lg text-xs text-slate-300 space-y-1">
                <span className="text-brand-mint font-semibold">Textbook Principle (Page 20):</span>
                <p className="text-[11px] leading-relaxed text-slate-400">
                  "A circle fails because a vertical line can intersect it twice. However, the upper semicircle <MathText text="$y = \\sqrt{a^2 - x^2}$" /> and lower semicircle <MathText text="$y = -\\sqrt{a^2 - x^2}$" /> are each legitimate functions on <MathText text="$[-a, a]$" />."
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: FIGURE 26 GALLERY */}
      {activeTab === 'gallery' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h4 className="text-sm font-bold text-white">Figure 26: The Nine Useful Graphs (Page 21)</h4>
              <p className="text-xs text-slate-400">Click any graph card to view detailed domain, range, and symmetry proofs.</p>
            </div>
            <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 text-brand-mint font-mono font-bold">
              Card {selectedGalleryId + 1} of 9
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {usefulGraphs.map((g) => {
              const isSelected = selectedGalleryId === g.id;
              const cardSvgW = 160;
              const cardSvgH = 100;
              const cardToX = (x: number) => ((x - g.minX) / (g.maxX - g.minX)) * cardSvgW;
              const cardToY = (y: number) => cardSvgH - ((y - g.minY) / (g.maxY - g.minY)) * cardSvgH;

              return (
                <div
                  key={g.id}
                  onClick={() => setSelectedGalleryId(g.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-brand-mint shadow-lg ring-1 ring-brand-mint/40'
                      : 'bg-slate-950/70 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-sm font-bold text-white">{g.name}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 font-mono">
                      {g.type.split(' ')[0]}
                    </span>
                  </div>

                  {/* Mini SVG Plot */}
                  <div className="bg-slate-950 rounded-lg p-1 border border-slate-900 flex justify-center">
                    <svg width={cardSvgW} height={cardSvgH}>
                      {/* Axes */}
                      <line
                        x1={cardToX(g.minX)}
                        y1={cardToY(0)}
                        x2={cardToX(g.maxX)}
                        y2={cardToY(0)}
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      <line
                        x1={cardToX(0)}
                        y1={cardToY(g.minY)}
                        x2={cardToX(0)}
                        y2={cardToY(g.maxY)}
                        stroke="#334155"
                        strokeWidth="1"
                      />
                      {/* Curve */}
                      <path
                        d={Array.from({ length: 60 }, (_, i) => {
                          const x = g.minX + (i / 59) * (g.maxX - g.minX);
                          const y = g.plot(x);
                          if (isNaN(y) || y < g.minY || y > g.maxY) return '';
                          return `${i === 0 ? 'M' : 'L'} ${cardToX(x)} ${cardToY(y)}`;
                        }).join(' ')}
                        fill="none"
                        stroke={isSelected ? '#2dd4bf' : '#38bdf8'}
                        strokeWidth="2.5"
                      />
                    </svg>
                  </div>

                  <div className="mt-2 text-[11px] space-y-1 text-slate-400">
                    <div>Domain: <MathText text={`$${g.domain}$`} /></div>
                    <div>Range: <MathText text={`$${g.range}$`} /></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed Inspector for Selected Card */}
          {usefulGraphs[selectedGalleryId] && (
            <div className="p-4 bg-slate-900/90 rounded-xl border border-brand-mint/40 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-2">
                <span className="text-sm font-bold text-white flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand-mint" />
                  Detailed Textbook Profile: <MathText text={`$${usefulGraphs[selectedGalleryId].latex}$`} />
                </span>
                <span className="text-xs text-brand-mint font-semibold">
                  Classification: {usefulGraphs[selectedGalleryId].type}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {usefulGraphs[selectedGalleryId].desc}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-1">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold mb-1">
                    Natural Domain:
                  </span>
                  <MathText text={`$D = ${usefulGraphs[selectedGalleryId].domain}$`} />
                </div>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[11px] uppercase tracking-wider font-semibold mb-1">
                    Corresponding Range:
                  </span>
                  <MathText text={`$R = ${usefulGraphs[selectedGalleryId].range}$`} />
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: COMPOSITE FUNCTION PIPELINE */}
      {activeTab === 'pipeline' && (
        <div className="space-y-6">
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
            <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
              Select Composition Pipeline:
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {pipelinePresets.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setPipePresetIndex(idx)}
                  className={`p-2.5 rounded-lg border text-left text-xs transition-all ${
                    pipePresetIndex === idx
                      ? 'bg-brand-mint/10 border-brand-mint text-brand-mint font-bold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-semibold text-white mb-1">{p.name}</div>
                  <MathText text={`$${p.fogLatex}$`} />
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Pipeline Machine Visualization */}
          <div className="p-6 bg-slate-950/80 rounded-xl border border-slate-800 space-y-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="w-full sm:w-1/3 space-y-1.5">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Input x value:</span>
                  <span className="font-mono text-brand-mint font-bold">{pipeX.toFixed(2)}</span>
                </div>
                <input
                  type="range"
                  min="-5"
                  max="5"
                  step="0.25"
                  value={pipeX}
                  onChange={(e) => setPipeX(parseFloat(e.target.value))}
                  className="w-full accent-brand-mint cursor-pointer"
                />
              </div>

              <div className="text-xs text-slate-400 text-center sm:text-right">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Domain Requirement:</span>
                <MathText text={`$D(f \\circ g) = ${currentPipe.fogDomainLatex}$`} />
              </div>
            </div>

            {/* Flowchart Boxes */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
              {/* Box 1: Input x */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 text-center space-y-2">
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Step 1: Raw Input</span>
                <div className="text-lg font-mono font-bold text-white">x = {pipeX.toFixed(2)}</div>
                <div className="text-[11px] text-slate-400">Feeds directly into inner function g</div>
              </div>

              {/* Box 2: Inner Machine g(x) */}
              <div className="p-4 bg-slate-900 rounded-xl border border-brand-mint/40 text-center space-y-2 relative">
                <span className="text-[10px] uppercase tracking-wider font-bold text-brand-mint">Machine g (Inner)</span>
                <MathText text={`$${currentPipe.gLatex}$`} />
                <div className="pt-1 font-mono text-sm font-bold text-white">
                  u = g({pipeX.toFixed(2)}) = {gResult.val.toFixed(2)}
                </div>
              </div>

              {/* Box 3: Outer Machine f(u) */}
              <div className={`p-4 rounded-xl border text-center space-y-2 ${
                fResult.valid ? 'bg-slate-900 border-emerald-500/50' : 'bg-rose-950/40 border-rose-500/50'
              }`}>
                <span className="text-[10px] uppercase tracking-wider font-bold text-emerald-400">Machine f (Outer)</span>
                <MathText text={`$${currentPipe.fLatex}$`} />
                <div className="pt-1 font-mono text-sm font-bold">
                  {fResult.valid ? (
                    <span className="text-emerald-400">y = f({gResult.val.toFixed(2)}) = {fResult.val.toFixed(3)}</span>
                  ) : (
                    <span className="text-rose-400 text-xs flex items-center justify-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      Domain Error!
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Diagnostic Message */}
            {!fResult.valid && (
              <div className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>
                  <strong>Processing Halt:</strong> {fResult.reason}. Because intermediate output <MathText text={`$u = ${gResult.val.toFixed(2)}$`} /> does not lie in the domain of <MathText text="$f$" />, <MathText text={`$x = ${pipeX.toFixed(2)}$`} /> is <em>excluded</em> from <MathText text="$D(f \\circ g)$" />.
                </span>
              </div>
            )}

            {/* Non-Commutative Comparison */}
            <div className="p-4 bg-slate-900/60 rounded-xl border border-slate-800 space-y-2 text-xs">
              <span className="text-slate-300 font-bold block uppercase tracking-wider text-[11px]">
                Non-Commutative Proof: (f ∘ g)(x) vs (g ∘ f)(x)
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-300">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Direct Order (f ∘ g)(x):</span>
                  <MathText text={`$${currentPipe.fogLatex}$`} />
                  <span className="text-brand-mint font-mono font-bold block mt-1">
                    Value at {pipeX.toFixed(2)}: {fResult.valid ? fResult.val.toFixed(3) : 'Undefined'}
                  </span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px]">Reverse Order (g ∘ f)(x):</span>
                  <MathText text={`$${currentPipe.gofLatex}$`} />
                  <span className="text-brand-gold font-mono font-bold block mt-1">
                    Value at {pipeX.toFixed(2)}: {!isNaN(gofResult) ? gofResult.toFixed(3) : 'Undefined'}
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 pt-1">
                Notice that <MathText text="$(f \\circ g)(x) \\neq (g \\circ f)(x)$" />. Order of operational execution is paramount!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: STEP FUNCTIONS (FLOOR & CEILING) */}
      {activeTab === 'stepfunctions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Step Function Coordinate Geometry
              </span>
              <div className="flex gap-1 text-[11px]">
                <button
                  onClick={() => setStepMode('floor')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    stepMode === 'floor' ? 'bg-brand-mint text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Floor ⌊x⌋
                </button>
                <button
                  onClick={() => setStepMode('ceiling')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    stepMode === 'ceiling' ? 'bg-brand-mint text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Ceiling ⌈x⌉
                </button>
                <button
                  onClick={() => setStepMode('ex7')}
                  className={`px-2.5 py-1 rounded font-medium ${
                    stepMode === 'ex7' ? 'bg-brand-mint text-slate-950' : 'bg-slate-800 text-slate-300'
                  }`}
                >
                  Example 7
                </button>
              </div>
            </div>

            <svg width={svgSize} height={svgSize} className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
              {/* Grid Lines */}
              {[-4, -3, -2, -1, 1, 2, 3, 4].map((coord) => (
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

              {/* Reference diagonal y = x */}
              <line
                x1={toSvgX(-range)}
                y1={toSvgY(-range)}
                x2={toSvgX(range)}
                y2={toSvgY(range)}
                stroke="#334155"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* Axes */}
              <line x1={0} y1={toSvgY(0)} x2={svgSize} y2={toSvgY(0)} stroke="#475569" strokeWidth="2" />
              <line x1={toSvgX(0)} y1={0} x2={toSvgX(0)} y2={svgSize} stroke="#475569" strokeWidth="2" />

              {/* Floor Function Steps */}
              {stepMode === 'floor' && (
                [-4, -3, -2, -1, 0, 1, 2, 3].map((n) => (
                  <g key={n}>
                    {/* Horizontal segment from n to n+1 */}
                    <line
                      x1={toSvgX(n)}
                      y1={toSvgY(n)}
                      x2={toSvgX(n + 1)}
                      y2={toSvgY(n)}
                      stroke="#38bdf8"
                      strokeWidth="3.5"
                    />
                    {/* Filled dot at left (n, n) */}
                    <circle cx={toSvgX(n)} cy={toSvgY(n)} r="4" fill="#38bdf8" />
                    {/* Hollow dot at right (n+1, n) */}
                    <circle cx={toSvgX(n + 1)} cy={toSvgY(n)} r="4" fill="#020617" stroke="#38bdf8" strokeWidth="2" />
                  </g>
                ))
              )}

              {/* Ceiling Function Steps */}
              {stepMode === 'ceiling' && (
                [-4, -3, -2, -1, 0, 1, 2, 3].map((n) => (
                  <g key={n}>
                    {/* Horizontal segment from n to n+1 at height n+1 */}
                    <line
                      x1={toSvgX(n)}
                      y1={toSvgY(n + 1)}
                      x2={toSvgX(n + 1)}
                      y2={toSvgY(n + 1)}
                      stroke="#a855f7"
                      strokeWidth="3.5"
                    />
                    {/* Hollow dot at left (n, n+1) */}
                    <circle cx={toSvgX(n)} cy={toSvgY(n + 1)} r="4" fill="#020617" stroke="#a855f7" strokeWidth="2" />
                    {/* Filled dot at right (n+1, n+1) */}
                    <circle cx={toSvgX(n + 1)} cy={toSvgY(n + 1)} r="4" fill="#a855f7" />
                  </g>
                ))
              )}

              {/* Example 7 Piecewise */}
              {stepMode === 'ex7' && (
                <>
                  {/* Branch 1: y = -x for x < 0 */}
                  <line
                    x1={toSvgX(-4)}
                    y1={toSvgY(4)}
                    x2={toSvgX(0)}
                    y2={toSvgY(0)}
                    stroke="#2dd4bf"
                    strokeWidth="3"
                  />
                  {/* Branch 2: y = x² for 0 <= x <= 1 */}
                  <path
                    d={Array.from({ length: 40 }, (_, i) => {
                      const x = (i / 39) * 1;
                      const y = x * x;
                      return `${i === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(y)}`;
                    }).join(' ')}
                    fill="none"
                    stroke="#2dd4bf"
                    strokeWidth="3"
                  />
                  {/* Branch 3: y = 1 for x > 1 */}
                  <line
                    x1={toSvgX(1)}
                    y1={toSvgY(1)}
                    x2={toSvgX(4)}
                    y2={toSvgY(1)}
                    stroke="#2dd4bf"
                    strokeWidth="3"
                  />
                </>
              )}

              {/* Test Point Marker */}
              {stepMode === 'floor' && (
                <circle
                  cx={toSvgX(stepX)}
                  cy={toSvgY(floorVal)}
                  r="6"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              )}
              {stepMode === 'ceiling' && (
                <circle
                  cx={toSvgX(stepX)}
                  cy={toSvgY(ceilVal)}
                  r="6"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              )}
              {stepMode === 'ex7' && (
                <circle
                  cx={toSvgX(stepX)}
                  cy={toSvgY(ex7Val)}
                  r="6"
                  fill="#f59e0b"
                  stroke="#ffffff"
                  strokeWidth="2"
                />
              )}
            </svg>

            {/* Slider */}
            <div className="w-full mt-4 space-y-1.5">
              <div className="flex justify-between text-xs text-slate-300">
                <span>Evaluate at x:</span>
                <span className="font-mono text-brand-gold font-bold">{stepX.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="-3.5"
                max="3.5"
                step="0.1"
                value={stepX}
                onChange={(e) => setStepX(parseFloat(e.target.value))}
                className="w-full accent-brand-gold cursor-pointer"
              />
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Live Decimal Rounding Analysis
              </h4>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Floor ⌊x⌋:
                  </span>
                  <div className="text-lg font-bold font-mono text-sky-400">
                    ⌊{stepX.toFixed(2)}⌋ = {floorVal}
                  </div>
                  <span className="text-[11px] text-slate-500">Greatest integer ≤ x</span>
                </div>

                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Ceiling ⌈x⌉:
                  </span>
                  <div className="text-lg font-bold font-mono text-purple-400">
                    ⌈{stepX.toFixed(2)}⌉ = {ceilVal}
                  </div>
                  <span className="text-[11px] text-slate-500">Least integer ≥ x</span>
                </div>
              </div>

              {/* Crucial Negative Clarification */}
              {stepX < 0 && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-300 text-xs leading-relaxed space-y-1">
                  <span className="font-bold block flex items-center gap-1">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Crucial Negative Decimal Behavior:
                  </span>
                  <p className="text-[11px]">
                    Because <MathText text={`$${floorVal} \\le ${stepX.toFixed(2)} \\le ${ceilVal}$`} />, the floor rounds <em>downward</em> (to the left) to <MathText text={`$${floorVal}$`} />, NOT <MathText text={`$${ceilVal}$`} />!
                  </p>
                </div>
              )}

              {/* Textbook Comparison Table */}
              <div className="overflow-x-auto text-[11px]">
                <table className="w-full text-left text-slate-300">
                  <thead className="bg-slate-950 text-slate-400 uppercase text-[10px]">
                    <tr>
                      <th className="p-2">x</th>
                      <th className="p-2">⌊x⌋ (Floor)</th>
                      <th className="p-2">⌈x⌉ (Ceiling)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    <tr className={Math.abs(stepX - 2.4) < 0.15 ? 'bg-brand-mint/10 font-bold text-brand-mint' : ''}>
                      <td className="p-2">2.4</td>
                      <td className="p-2">2</td>
                      <td className="p-2">3</td>
                    </tr>
                    <tr className={Math.abs(stepX - (-0.3)) < 0.15 ? 'bg-brand-mint/10 font-bold text-brand-mint' : ''}>
                      <td className="p-2">-0.3</td>
                      <td className="p-2">-1</td>
                      <td className="p-2">0</td>
                    </tr>
                    <tr className={Math.abs(stepX - (-1.2)) < 0.15 ? 'bg-brand-mint/10 font-bold text-brand-mint' : ''}>
                      <td className="p-2">-1.2</td>
                      <td className="p-2">-2</td>
                      <td className="p-2">-1</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: FIGURES 23-32 SHOWCASE */}
      {activeTab === 'figures' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setActiveFig('fig25')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFig === 'fig25' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Fig 25: Circle & VLT
            </button>
            <button
              onClick={() => setActiveFig('fig27')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFig === 'fig27' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Fig 27: Composition Arrows
            </button>
            <button
              onClick={() => setActiveFig('fig28')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFig === 'fig28' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Fig 28: Even vs Odd Symmetry
            </button>
            <button
              onClick={() => setActiveFig('fig29_32')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFig === 'fig29_32' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 29–32: |x| & Steps
            </button>
          </div>

          {activeFig === 'fig25' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Figure 25: Vertical Line Test on Circle (Page 20)</h4>
              <p className="text-xs text-slate-400">
                A circle <MathText text="$x^2 + y^2 = a^2$" /> fails the Vertical Line Test because any vertical line <MathText text="$x = c$" /> with <MathText text="$-a < c < a$" /> intersects the circle at both <MathText text="$(c, \\sqrt{a^2 - c^2})$" /> and <MathText text="$(c, -\\sqrt{a^2 - c^2})$" />.
              </p>
            </div>
          )}

          {activeFig === 'fig27' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Figure 27: Two-Stage Arrow Diagram (Page 23)</h4>
              <p className="text-xs text-slate-400">
                Mapping input <MathText text="$x \\in D(g)$" /> through <MathText text="$g$" /> to <MathText text="$g(x)$" />, which then serves as the input to <MathText text="$f$" /> giving <MathText text="$f(g(x))$" />.
              </p>
            </div>
          )}

          {activeFig === 'fig28' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Figure 28: Even vs. Odd Symmetries (Page 23)</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-brand-mint font-bold block mb-1">Even Function (y-Axis Reflection)</span>
                  <MathText text="$f(-x) = f(x)$" />
                  <p className="text-slate-400 text-[11px] mt-1">If (x, y) is on the curve, so is (-x, y).</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
                  <span className="text-brand-gold font-bold block mb-1">Odd Function (Origin 180° Rotation)</span>
                  <MathText text="$f(-x) = -f(x)$" />
                  <p className="text-slate-400 text-[11px] mt-1">If (x, y) is on the curve, so is (-x, -y).</p>
                </div>
              </div>
            </div>
          )}

          {activeFig === 'fig29_32' && (
            <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-sm font-bold text-white">Figures 29–32: Discontinuous & Step Curves (Page 24)</h4>
              <p className="text-xs text-slate-400">
                Step graphs for Floor <MathText text="$\\lfloor x \\rfloor$" /> and Ceiling <MathText text="$\\lceil x \\rceil$" /> have jump discontinuities at every integer.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
