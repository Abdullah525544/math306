import React, { useState } from 'react';
import MathText from '../components/MathText';
import { Layers, CheckCircle2, XCircle } from 'lucide-react';

interface GalleryFunction {
  id: string;
  name: string;
  latex: string;
  domain: string;
  range: string;
  symmetry: 'Even' | 'Odd' | 'None';
  calc: (x: number) => number | null;
}

const GALLERY_FUNCTIONS: GalleryFunction[] = [
  { id: 'identity', name: 'Identity', latex: 'y = x', domain: '(-\\infty, \\infty)', range: '(-\\infty, \\infty)', symmetry: 'Odd', calc: (x) => x },
  { id: 'square', name: 'Squaring', latex: 'y = x^2', domain: '(-\\infty, \\infty)', range: '[0, \\infty)', symmetry: 'Even', calc: (x) => x ** 2 },
  { id: 'cube', name: 'Cubing', latex: 'y = x^3', domain: '(-\\infty, \\infty)', range: '(-\\infty, \\infty)', symmetry: 'Odd', calc: (x) => x ** 3 },
  { id: 'sqrt', name: 'Square Root', latex: 'y = \\sqrt{x}', domain: '[0, \\infty)', range: '[0, \\infty)', symmetry: 'None', calc: (x) => (x >= 0 ? Math.sqrt(x) : null) },
  { id: 'cbrt', name: 'Cube Root', latex: 'y = \\sqrt[3]{x}', domain: '(-\\infty, \\infty)', range: '(-\\infty, \\infty)', symmetry: 'Odd', calc: (x) => Math.cbrt(x) },
  { id: 'reciprocal', name: 'Reciprocal', latex: 'y = 1/x', domain: 'x \\neq 0', range: 'y \\neq 0', symmetry: 'Odd', calc: (x) => (Math.abs(x) > 0.05 ? 1 / x : null) },
  { id: 'recip_sq', name: 'Reciprocal Square', latex: 'y = 1/x^2', domain: 'x \\neq 0', range: '(0, \\infty)', symmetry: 'Even', calc: (x) => (Math.abs(x) > 0.05 ? 1 / (x * x) : null) },
  { id: 'x_2_3', name: 'Two-Thirds Power', latex: 'y = x^{2/3}', domain: '(-\\infty, \\infty)', range: '[0, \\infty)', symmetry: 'Even', calc: (x) => Math.cbrt(x) ** 2 },
  { id: 'x_3_2', name: 'Three-Halves Power', latex: 'y = x^{3/2}', domain: '[0, \\infty)', range: '[0, \\infty)', symmetry: 'None', calc: (x) => (x >= 0 ? Math.pow(x, 1.5) : null) },
];

export const FunctionGrapherTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'gallery' | 'vlt'>('gallery');
  const [selectedFuncId, setSelectedFuncId] = useState<string>('square');

  // Vertical line test state
  const [vltX, setVltX] = useState<number>(1.5);
  const [vltCurve, setVltCurve] = useState<'circle' | 'parabola' | 'sideways'>('circle');

  const selectedFunc = GALLERY_FUNCTIONS.find((f) => f.id === selectedFuncId) || GALLERY_FUNCTIONS[1];

  // SVG dimensions
  const svgSize = 380;
  const range = 5;

  const toSvgX = (x: number) => ((x + range) / (2 * range)) * svgSize;
  const toSvgY = (y: number) => ((range - y) / (2 * range)) * svgSize;

  // Build SVG polyline points for selected function
  const pathD = React.useMemo(() => {
    let d = '';
    let drawing = false;
    const step = 0.05;

    for (let x = -range; x <= range; x += step) {
      const y = selectedFunc.calc(x);
      if (y === null || isNaN(y) || Math.abs(y) > range + 2) {
        drawing = false;
      } else {
        const sx = toSvgX(x);
        const sy = toSvgY(y);
        if (!drawing) {
          d += `M ${sx.toFixed(1)} ${sy.toFixed(1)} `;
          drawing = true;
        } else {
          d += `L ${sx.toFixed(1)} ${sy.toFixed(1)} `;
        }
      }
    }
    return d;
  }, [selectedFunc]);

  // VLT intersections calculation
  const vltIntersections = React.useMemo(() => {
    if (vltCurve === 'circle') {
      const r = 3;
      if (Math.abs(vltX) < r) {
        const yTop = Math.sqrt(r * r - vltX * vltX);
        const yBottom = -yTop;
        return [
          { x: vltX, y: yTop },
          { x: vltX, y: yBottom },
        ];
      } else if (Math.abs(vltX) === r) {
        return [{ x: vltX, y: 0 }];
      }
      return [];
    } else if (vltCurve === 'parabola') {
      return [{ x: vltX, y: 0.5 * vltX * vltX - 2 }];
    } else {
      // sideways parabola x = y^2 / 2 - 2 => y^2 = 2(x + 2)
      if (vltX > -2) {
        const yVal = Math.sqrt(2 * (vltX + 2));
        return [
          { x: vltX, y: yVal },
          { x: vltX, y: -yVal },
        ];
      } else if (vltX === -2) {
        return [{ x: -2, y: 0 }];
      }
      return [];
    }
  }, [vltCurve, vltX]);

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Function Lab & Vertical Line Test
          </h3>
          <p className="text-xs text-slate-400">
            Section 3 • Textbook Figure 26 Graph Gallery, Domain, Range, and Single-Valued Criterion
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'gallery'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Figure 26 Gallery
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vlt')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'vlt'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Vertical Line Test
          </button>
        </div>
      </div>

      {activeTab === 'gallery' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Gallery Selector Buttons */}
          <div className="lg:col-span-4 space-y-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
              9 Useful Textbook Functions:
            </span>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-1.5">
              {GALLERY_FUNCTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedFuncId(f.id)}
                  className={`flex items-center justify-between px-3 py-2 rounded-xl text-xs font-mono transition-all border ${
                    selectedFuncId === f.id
                      ? 'bg-brand-mint/15 border-brand-mint text-white font-bold shadow-md'
                      : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                  }`}
                >
                  <span>{f.name}</span>
                  <MathText math={f.latex} />
                </button>
              ))}
            </div>
          </div>

          {/* Graph & Properties Panel */}
          <div className="lg:col-span-8 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* SVG Canvas */}
              <div className="relative w-full aspect-square max-w-[380px] mx-auto bg-[#090D16] rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
                <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full">
                  {/* Grid Lines */}
                  {Array.from({ length: 2 * range + 1 }, (_, i) => i - range).map((val) => (
                    <g key={val}>
                      <line
                        x1={toSvgX(val)}
                        y1="0"
                        x2={toSvgX(val)}
                        y2={svgSize}
                        stroke={val === 0 ? '#64748B' : '#1E293B'}
                        strokeWidth={val === 0 ? '2' : '1'}
                      />
                      <line
                        x1="0"
                        y1={toSvgY(val)}
                        x2={svgSize}
                        y2={toSvgY(val)}
                        stroke={val === 0 ? '#64748B' : '#1E293B'}
                        strokeWidth={val === 0 ? '2' : '1'}
                      />
                    </g>
                  ))}

                  {/* Function Curve */}
                  <path d={pathD} fill="none" stroke="#2DD4BF" strokeWidth="3" strokeLinecap="round" />
                </svg>
              </div>

              {/* Mathematical Properties Card */}
              <div className="flex flex-col justify-between space-y-3 p-4 rounded-2xl bg-slate-900/70 border border-slate-800">
                <div className="space-y-3">
                  <div className="border-b border-slate-800 pb-2">
                    <span className="text-[11px] text-slate-400 block uppercase tracking-wider">Function</span>
                    <h4 className="text-xl font-bold text-white font-mono flex items-center gap-2">
                      <MathText math={selectedFunc.latex} />
                    </h4>
                  </div>

                  <div className="space-y-2 text-xs">
                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block font-sans">Domain (Allowed Inputs x):</span>
                      <span className="font-mono text-brand-mint font-bold text-sm">
                        <MathText math={selectedFunc.domain} />
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                      <span className="text-slate-400 block font-sans">Range (Possible Outputs y):</span>
                      <span className="font-mono text-brand-indigo font-bold text-sm">
                        <MathText math={selectedFunc.range} />
                      </span>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center justify-between">
                      <span className="text-slate-400 font-sans">Symmetry Classification:</span>
                      <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-amber-300 border border-amber-400/30">
                        {selectedFunc.symmetry}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  Reproduced directly from Math-306 Preliminaries, Figure 26: Nine useful graphs.
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Vertical Line Test Tab */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-brand-mint" />
              The Vertical Line Test Criterion
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Slide the vertical line across the plane. If the line ever crosses the curve at{' '}
              <strong className="text-rose-400">more than one point</strong>, then a single input{' '}
              <MathText math="x" /> produces multiple outputs <MathText math="y" />, meaning the curve{' '}
              <strong className="text-rose-400">CANNOT be a function</strong> of <MathText math="x" />!
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="text-xs text-slate-400">Select Curve:</span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setVltCurve('circle')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                    vltCurve === 'circle'
                      ? 'bg-brand-indigo text-white border-brand-indigo'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Circle x² + y² = 9
                </button>
                <button
                  type="button"
                  onClick={() => setVltCurve('parabola')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                    vltCurve === 'parabola'
                      ? 'bg-brand-indigo text-white border-brand-indigo'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Parabola y = 0.5x² - 2
                </button>
                <button
                  type="button"
                  onClick={() => setVltCurve('sideways')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border ${
                    vltCurve === 'sideways'
                      ? 'bg-brand-indigo text-white border-brand-indigo'
                      : 'bg-slate-800 text-slate-300 border-slate-700'
                  }`}
                >
                  Sideways Curve x = y²/2 - 2
                </button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
            {/* SVG Visualizer */}
            <div className="relative w-full aspect-square max-w-[360px] mx-auto bg-[#090D16] rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
              <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full">
                {/* Axes */}
                <line x1="0" y1={toSvgY(0)} x2={svgSize} y2={toSvgY(0)} stroke="#475569" strokeWidth="1.5" />
                <line x1={toSvgX(0)} y1="0" x2={toSvgX(0)} y2={svgSize} stroke="#475569" strokeWidth="1.5" />

                {/* Plot Curve */}
                {vltCurve === 'circle' && (
                  <circle
                    cx={toSvgX(0)}
                    cy={toSvgY(0)}
                    r={(3 / (2 * range)) * svgSize}
                    fill="none"
                    stroke="#818CF8"
                    strokeWidth="2.5"
                  />
                )}
                {vltCurve === 'parabola' && (
                  <path
                    d={Array.from({ length: 41 }, (_, i) => -4 + i * 0.2)
                      .map((x, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(x)} ${toSvgY(0.5 * x * x - 2)}`)
                      .join(' ')}
                    fill="none"
                    stroke="#818CF8"
                    strokeWidth="2.5"
                  />
                )}
                {vltCurve === 'sideways' && (
                  <path
                    d={Array.from({ length: 41 }, (_, i) => -4 + i * 0.2)
                      .map((y, idx) => `${idx === 0 ? 'M' : 'L'} ${toSvgX(0.5 * y * y - 2)} ${toSvgY(y)}`)
                      .join(' ')}
                    fill="none"
                    stroke="#818CF8"
                    strokeWidth="2.5"
                  />
                )}

                {/* Vertical Line x = vltX */}
                <line
                  x1={toSvgX(vltX)}
                  y1="0"
                  x2={toSvgX(vltX)}
                  y2={svgSize}
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                  strokeDasharray="4 4"
                />

                {/* Intersection dots */}
                {vltIntersections.map((pt, idx) => (
                  <g key={idx}>
                    <circle
                      cx={toSvgX(pt.x)}
                      cy={toSvgY(pt.y)}
                      r="6"
                      fill="#F43F5E"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                  </g>
                ))}
              </svg>
            </div>

            {/* Test Analysis Card */}
            <div className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-slate-300 flex justify-between">
                  <span>Scrub Vertical Line (x):</span>
                  <span className="font-mono text-amber-400 font-bold">{vltX.toFixed(2)}</span>
                </label>
                <input
                  type="range"
                  min="-4"
                  max="4"
                  step="0.1"
                  value={vltX}
                  onChange={(e) => setVltX(parseFloat(e.target.value))}
                  className="w-full mt-2 accent-amber-400"
                />
              </div>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
                <span className="text-xs text-slate-400 font-semibold block uppercase">
                  Line Intersection Count:
                </span>
                <div className="text-2xl font-bold font-mono text-white flex items-center gap-2">
                  <span>{vltIntersections.length}</span>
                  <span className="text-xs font-sans text-slate-400 font-normal">
                    point{vltIntersections.length === 1 ? '' : 's'} of intersection
                  </span>
                </div>

                <div
                  className={`p-3 rounded-lg border text-xs flex items-center gap-2 ${
                    vltIntersections.length > 1
                      ? 'bg-rose-950/40 border-rose-500/40 text-rose-300'
                      : 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
                  }`}
                >
                  {vltIntersections.length > 1 ? (
                    <>
                      <XCircle className="w-5 h-5 shrink-0 text-rose-400" />
                      <div>
                        <strong>Fails Vertical Line Test:</strong> Not a function of x! Input x={vltX.toFixed(1)} maps to multiple outputs.
                      </div>
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                      <div>
                        <strong>Passes at x={vltX.toFixed(1)}:</strong> Single unique output.
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FunctionGrapherTool;
