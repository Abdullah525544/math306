import React, { useState } from 'react';
import MathText from '../components/MathText';
import { 
  Compass, 
  Layers, 
  Thermometer, 
  Sliders, 
  ArrowRight,
  Maximize2,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';

export const Section2Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'twopoints' | 'figures' | 'ortho' | 'applications'>('twopoints');

  // Two points state
  const [p1, setP1] = useState<{ x: number; y: number }>({ x: 4, y: -3 });
  const [p2, setP2] = useState<{ x: number; y: number }>({ x: 2, y: 5 });

  // Figures sub-tab
  const [activeFigure, setActiveFigure] = useState<'fig5_6' | 'fig7_8' | 'fig9_10' | 'fig11_15' | 'fig20'>('fig7_8');

  // Orthogonal line state
  const [baseSlope, setBaseSlope] = useState<number>(2);
  const [baseIntercept, setBaseIntercept] = useState<number>(1);
  const [orthoPoint, setOrthoPoint] = useState<{ x: number; y: number }>({ x: 1, y: 3 });

  // Wall insulation state
  const [outsideTemp, setOutsideTemp] = useState<number>(0);
  const [insideTemp, setInsideTemp] = useState<number>(68);

  // SVG parameters
  const svgSize = 420;
  const range = 8;
  const toSvgX = (x: number) => ((x + range) / (2 * range)) * svgSize;
  const toSvgY = (y: number) => ((range - y) / (2 * range)) * svgSize;

  // Increments and distance calculations
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const isVertical = deltaX === 0;
  const slope = !isVertical ? deltaY / deltaX : null;
  const angleRad = slope !== null ? Math.atan(slope) : Math.PI / 2;
  const angleDeg = ((angleRad * 180) / Math.PI + (angleRad < 0 ? 180 : 0)).toFixed(1);

  // Perpendicular slope
  const orthoSlope = baseSlope !== 0 ? -1 / baseSlope : null;

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Section 2 Visual Studio & Interactive Geometry
          </h3>
          <p className="text-xs text-slate-400">
            Coordinates, Lines & Increments (Pages 8–17) • Figures 5–22 & Real-World Gradient Labs
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs font-medium overflow-x-auto">
          {[
            { id: 'twopoints', label: 'Two-Point Lab' },
            { id: 'figures', label: 'Figures 5–22' },
            { id: 'ortho', label: 'Perpendicular Studio' },
            { id: 'applications', label: 'Wall & Temperature' },
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

      {/* 1. TWO-POINT LAB */}
      {activeTab === 'twopoints' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* SVG Coordinate Grid */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[420px] aspect-square bg-[#090D16] rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
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

                {/* Right triangle for increments */}
                <polygon
                  points={`${toSvgX(p1.x)},${toSvgY(p1.y)} ${toSvgX(p2.x)},${toSvgY(p1.y)} ${toSvgX(p2.x)},${toSvgY(p2.y)}`}
                  fill="rgba(45, 212, 191, 0.08)"
                />
                {/* Δx leg */}
                <line
                  x1={toSvgX(p1.x)}
                  y1={toSvgY(p1.y)}
                  x2={toSvgX(p2.x)}
                  y2={toSvgY(p1.y)}
                  stroke="#F59E0B"
                  strokeWidth="3"
                />
                {/* Δy leg */}
                <line
                  x1={toSvgX(p2.x)}
                  y1={toSvgY(p1.y)}
                  x2={toSvgX(p2.x)}
                  y2={toSvgY(p2.y)}
                  stroke="#38BDF8"
                  strokeWidth="3"
                />
                {/* Hypotenuse line */}
                <line
                  x1={toSvgX(p1.x)}
                  y1={toSvgY(p1.y)}
                  x2={toSvgX(p2.x)}
                  y2={toSvgY(p2.y)}
                  stroke="#2DD4BF"
                  strokeWidth="3.5"
                />

                {/* Point 1 */}
                <circle cx={toSvgX(p1.x)} cy={toSvgY(p1.y)} r="7" fill="#F43F5E" stroke="#FFF" strokeWidth="2" />
                <text x={toSvgX(p1.x)} y={toSvgY(p1.y) - 10} textAnchor="middle" fill="#F43F5E" fontSize="11" fontWeight="bold">
                  P₁({p1.x}, {p1.y})
                </text>

                {/* Point 2 */}
                <circle cx={toSvgX(p2.x)} cy={toSvgY(p2.y)} r="7" fill="#2DD4BF" stroke="#FFF" strokeWidth="2" />
                <text x={toSvgX(p2.x)} y={toSvgY(p2.y) - 10} textAnchor="middle" fill="#2DD4BF" fontSize="11" fontWeight="bold">
                  P₂({p2.x}, {p2.y})
                </text>
              </svg>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              Hypotenuse d (Mint), Run Δx (Amber), Rise Δy (Sky)
            </p>
          </div>

          {/* Metrics & Equations */}
          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3 text-xs">
              <span className="font-semibold text-slate-400 uppercase tracking-wider block">
                Live Geometry Metrics
              </span>

              <div className="grid grid-cols-2 gap-3 font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-amber-400 block font-sans">Run Δx = x₂ - x₁:</span>
                  <span className="font-bold text-white text-base">{deltaX}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-sky-400 block font-sans">Rise Δy = y₂ - y₁:</span>
                  <span className="font-bold text-white text-base">{deltaY}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-brand-mint block font-sans">Distance d:</span>
                  <span className="font-bold text-brand-mint text-base">{distance.toFixed(3)}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-brand-indigo block font-sans">Slope m = Δy/Δx:</span>
                  <span className="font-bold text-brand-indigo text-base">
                    {isVertical ? 'Undefined' : (slope as number).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Equation Forms */}
              <div className="p-3 rounded-lg bg-[#090D16] border border-indigo-900/30 space-y-1 font-mono text-xs">
                <span className="text-slate-400 block font-sans font-bold">Line Equations:</span>
                <div>• Point-Slope: y - ({p1.y}) = {isVertical ? 'undefined' : (slope as number).toFixed(2)}(x - ({p1.x}))</div>
                {!isVertical && (
                  <div>• Slope-Intercept: y = {(slope as number).toFixed(2)}x + {((p1.y - (slope as number) * p1.x)).toFixed(2)}</div>
                )}
                <div>• Inclination: φ = {angleDeg}° (m = tan φ)</div>
              </div>
            </div>

            {/* Quick Presets */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">Textbook Presets:</span>
              <div className="flex flex-wrap gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => { setP1({ x: 4, y: -3 }); setP2({ x: 2, y: 5 }); }}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  Ex 1: A(4,-3) to B(2,5)
                </button>
                <button
                  type="button"
                  onClick={() => { setP1({ x: -1, y: 2 }); setP2({ x: 3, y: 4 }); }}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  Ex 3: P(-1,2) to Q(3,4)
                </button>
                <button
                  type="button"
                  onClick={() => { setP1({ x: -2, y: -1 }); setP2({ x: 3, y: 4 }); }}
                  className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 hover:text-white border border-slate-700"
                >
                  Ex 8: (-2,-1) to (3,4)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TEXTBOOK FIGURES 5–22 */}
      {activeTab === 'figures' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-2 border-b border-slate-800 pb-3 text-xs">
            {[
              { id: 'fig7_8', label: 'Figs 7 & 8 (Increments & Distance)' },
              { id: 'fig9_10', label: 'Figs 9 & 10 (Circle & Parabola)' },
              { id: 'fig11_15', label: 'Figs 11–15 (Similar Triangles & Orthogonality)' },
              { id: 'fig20', label: 'Fig 20 (Wall Insulation)' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFigure(f.id as any)}
                className={`px-3 py-1.5 rounded-lg font-semibold border transition-colors ${
                  activeFigure === f.id
                    ? 'bg-brand-indigo text-white border-brand-indigo'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>

          {activeFigure === 'fig7_8' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">
                Figures 7 & 8 • Pages 9–10
              </span>
              <h4 className="text-base font-bold text-white">
                Coordinate Increments and the Distance Right Triangle
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                As a point moves from A(4, -3) to B(2, 5), Δx = 2 - 4 = -2 and Δy = 5 - (-3) = 8.
                Right triangle PCQ has horizontal side |Δx| = 2 and vertical side |Δy| = 8. By Pythagoras, d = √((-2)² + 8²) = √68 ≈ 8.25.
              </p>
              <div className="p-4 rounded-xl bg-[#090D16] border border-slate-800 text-center font-mono text-brand-mint text-sm">
                <MathText text="$d = \sqrt{(\Delta x)^2 + (\Delta y)^2} = \sqrt{(-2)^2 + 8^2} = \sqrt{68} = 2\sqrt{17}$" />
              </div>
            </div>
          )}

          {activeFigure === 'fig9_10' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">
                Figures 9 & 10 • Pages 10–11
              </span>
              <h4 className="text-base font-bold text-white">
                Circle x² + y² = a² and Smooth Parabola y = x²
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                A circle centered at the origin consists of all points satisfying x² + y² = a². The filled disk includes all interior points x² + y² ≤ a².
                The squaring curve y = x² plots smoothly through (-2,4), (-1,1), (0,0), (1,1), (2,4) and is symmetric across the y-axis.
              </p>
            </div>
          )}

          {activeFigure === 'fig11_15' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">
                Figures 11–15 • Pages 11–12
              </span>
              <h4 className="text-base font-bold text-white">
                Constant Slope via Similar Triangles and Perpendicular Slope Proof
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Similar triangles P₁QP₂ and P₁'Q'P₂' prove that Δy/Δx is identical anywhere on a straight line.
                Furthermore, by right triangles formed with the axes, perpendicular lines L₁ and L₂ satisfy m₁ · m₂ = (a/h)(-h/a) = -1.
              </p>
              <div className="p-3 rounded-xl bg-[#090D16] border border-slate-800 font-mono text-center text-xs text-brand-mint">
                <MathText text="$m_1 = \frac{a}{h}, \quad m_2 = -\frac{h}{a} \implies m_1 m_2 = -1$" />
              </div>
            </div>
          )}

          {activeFigure === 'fig20' && (
            <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <span className="text-[10px] uppercase font-bold text-brand-mint tracking-wider">
                Figure 20 • Pages 16–17
              </span>
              <h4 className="text-base font-bold text-white">
                Wall Insulation Temperature Gradient
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Heat flows through a multi-layered home wall from inside (68°F) to outside (0°F).
                Each layer has a characteristic temperature drop rate (slope):
                • Gypsum wallboard (0.5 in): slope -2.5 °F/in
                • Fiberglass batt (3.5 in): slope -16.1 °F/in (steepest insulation gradient!)
                • Plywood & wood siding: slope -8.3 °F/in.
              </p>
            </div>
          )}
        </div>
      )}

      {/* 3. PERPENDICULAR STUDIO */}
      {activeTab === 'ortho' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Compass className="w-4 h-4 text-brand-mint" />
              Perpendicular Lines Studio: m₁ · m₂ = -1
            </h4>
            <p className="text-xs text-slate-300">
              Set the slope <MathText math="m_1" /> of Line 1. The perpendicular line automatically takes slope <MathText math="m_2 = -1/m_1" />.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
            <div className="p-3 rounded-xl bg-slate-900 border border-brand-mint/30">
              <span className="text-brand-mint font-bold block mb-1">Line 1 (Base Line):</span>
              <div>Slope m₁ = {baseSlope}</div>
              <div>Equation: y = {baseSlope}x + {baseIntercept}</div>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-brand-indigo/30">
              <span className="text-brand-indigo font-bold block mb-1">Line 2 (Perpendicular):</span>
              <div>Slope m₂ = {orthoSlope !== null ? orthoSlope.toFixed(2) : 'Undefined'}</div>
              <div>Product m₁ · m₂ = {baseSlope && orthoSlope ? (baseSlope * orthoSlope).toFixed(0) : '-1'}</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <label className="text-slate-300 flex justify-between font-semibold">
              <span>Adjust Slope m₁: {baseSlope}</span>
            </label>
            <input
              type="range"
              min="-4"
              max="4"
              step="0.5"
              value={baseSlope}
              onChange={(e) => setBaseSlope(parseFloat(e.target.value) || 0.1)}
              className="w-full mt-2 accent-brand-mint"
            />
          </div>
        </div>
      )}

      {/* 4. WALL INSULATION & CELSIUS/FAHRENHEIT */}
      {activeTab === 'applications' && (
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-2">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-brand-mint" />
              Real-World Applications: Wall Insulation & Temperature Equivalence
            </h4>
            <p className="text-xs text-slate-300">
              Linear slopes model temperature gradients across physical boundaries and conversion between scientific scales.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-[#090D16] border border-slate-800 space-y-3 font-mono text-xs">
            <span className="text-brand-mint font-bold text-sm block font-sans">
              Celsius vs. Fahrenheit Equivalence Theorem
            </span>
            <p className="text-slate-300 font-sans">
              Formula: F = (9/5)C + 32.
              When F = C:
            </p>
            <div className="p-3 rounded-lg bg-slate-950 text-center font-bold text-brand-mint text-sm">
              C = \frac{9}{5}C + 32 \implies -\frac{4}{5}C = 32 \implies C = -40^\circ
            </div>
            <p className="text-slate-400 font-sans">
              -40° is the unique temperature where mercury thermometers read identical values on both scales.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Section2Tools;
