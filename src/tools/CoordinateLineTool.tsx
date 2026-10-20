import React, { useState } from 'react';
import MathText from '../components/MathText';
import { Sliders, Compass, Thermometer } from 'lucide-react';

export const CoordinateLineTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'twopoints' | 'temperature'>('twopoints');

  // Point 1 and Point 2 state
  const [p1, setP1] = useState<{ x: number; y: number }>({ x: -2, y: 1 });
  const [p2, setP2] = useState<{ x: number; y: number }>({ x: 3, y: 4 });

  // Temperature state
  const [celsius, setCelsius] = useState<number>(20);

  // SVG dimensions
  const svgSize = 440;
  const range = 8; // from -8 to +8

  const toSvgX = (x: number) => ((x + range) / (2 * range)) * svgSize;
  const toSvgY = (y: number) => ((range - y) / (2 * range)) * svgSize;

  // Coordinate Calculations
  const deltaX = p2.x - p1.x;
  const deltaY = p2.y - p1.y;
  const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);
  const isVertical = deltaX === 0;
  const slope = !isVertical ? deltaY / deltaX : null;
  const angleRad = slope !== null ? Math.atan(slope) : Math.PI / 2;
  const angleDeg = ((angleRad * 180) / Math.PI + (angleRad < 0 ? 180 : 0)).toFixed(1);

  // Fahrenheit calculation
  const fahrenheit = (9 / 5) * celsius + 32;

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Interactive Coordinate & Line Lab
          </h3>
          <p className="text-xs text-slate-400">
            Section 2 • Increments Δx & Δy, Distance Triangle, Slope, and Temperature Models
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('twopoints')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'twopoints'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Two-Point & Slope Explorer
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('temperature')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'temperature'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Celsius / Fahrenheit Model
          </button>
        </div>
      </div>

      {activeTab === 'twopoints' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: SVG Coordinate Plane */}
          <div className="lg:col-span-7 flex flex-col items-center">
            <div className="relative w-full max-w-[440px] aspect-square bg-[#090D16] rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
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
                    {val !== 0 && Math.abs(val) % 2 === 0 && (
                      <>
                        <text
                          x={toSvgX(val)}
                          y={toSvgY(0) + 14}
                          textAnchor="middle"
                          fill="#64748B"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {val}
                        </text>
                        <text
                          x={toSvgX(0) - 8}
                          y={toSvgY(val) + 3}
                          textAnchor="end"
                          fill="#64748B"
                          fontSize="9"
                          fontFamily="monospace"
                        >
                          {val}
                        </text>
                      </>
                    )}
                  </g>
                ))}

                {/* Extended Line through P1 and P2 */}
                {!isVertical ? (
                  <line
                    x1={toSvgX(-range)}
                    y1={toSvgY(p1.y + (slope as number) * (-range - p1.x))}
                    x2={toSvgX(range)}
                    y2={toSvgY(p1.y + (slope as number) * (range - p1.x))}
                    stroke="#818CF8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeOpacity="0.6"
                  />
                ) : (
                  <line
                    x1={toSvgX(p1.x)}
                    y1="0"
                    x2={toSvgX(p1.x)}
                    y2={svgSize}
                    stroke="#818CF8"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                    strokeOpacity="0.6"
                  />
                )}

                {/* Right Triangle for Δx and Δy */}
                <polygon
                  points={`${toSvgX(p1.x)},${toSvgY(p1.y)} ${toSvgX(p2.x)},${toSvgY(p1.y)} ${toSvgX(p2.x)},${toSvgY(p2.y)}`}
                  fill="rgba(45, 212, 191, 0.08)"
                />
                {/* Horizontal Leg Δx */}
                <line
                  x1={toSvgX(p1.x)}
                  y1={toSvgY(p1.y)}
                  x2={toSvgX(p2.x)}
                  y2={toSvgY(p1.y)}
                  stroke="#F59E0B"
                  strokeWidth="2.5"
                />
                {/* Vertical Leg Δy */}
                <line
                  x1={toSvgX(p2.x)}
                  y1={toSvgY(p1.y)}
                  x2={toSvgX(p2.x)}
                  y2={toSvgY(p2.y)}
                  stroke="#38BDF8"
                  strokeWidth="2.5"
                />
                {/* Hypotenuse Segment d */}
                <line
                  x1={toSvgX(p1.x)}
                  y1={toSvgY(p1.y)}
                  x2={toSvgX(p2.x)}
                  y2={toSvgY(p2.y)}
                  stroke="#2DD4BF"
                  strokeWidth="3.5"
                />

                {/* Point P1 */}
                <g>
                  <circle cx={toSvgX(p1.x)} cy={toSvgY(p1.y)} r="7" fill="#F43F5E" stroke="#FFFFFF" strokeWidth="2" />
                  <text
                    x={toSvgX(p1.x)}
                    y={toSvgY(p1.y) - 12}
                    textAnchor="middle"
                    fill="#F43F5E"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    P₁({p1.x}, {p1.y})
                  </text>
                </g>

                {/* Point P2 */}
                <g>
                  <circle cx={toSvgX(p2.x)} cy={toSvgY(p2.y)} r="7" fill="#2DD4BF" stroke="#FFFFFF" strokeWidth="2" />
                  <text
                    x={toSvgX(p2.x)}
                    y={toSvgY(p2.y) - 12}
                    textAnchor="middle"
                    fill="#2DD4BF"
                    fontSize="11"
                    fontWeight="bold"
                  >
                    P₂({p2.x}, {p2.y})
                  </text>
                </g>
              </svg>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              Hypotenuse d (Mint), Run Δx (Amber), Rise Δy (Sky)
            </p>
          </div>

          {/* Right: Live Calculations & Sliders */}
          <div className="lg:col-span-5 space-y-4">
            {/* Live Metrics Display */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Live Coordinate Metrics
              </h4>

              <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-amber-400 block font-sans">Run Δx:</span>
                  <span className="font-bold text-white text-base">
                    {deltaX > 0 ? `+${deltaX}` : deltaX}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-sky-400 block font-sans">Rise Δy:</span>
                  <span className="font-bold text-white text-base">
                    {deltaY > 0 ? `+${deltaY}` : deltaY}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-brand-mint block font-sans">Distance d:</span>
                  <span className="font-bold text-brand-mint text-base">
                    {distance.toFixed(2)}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-indigo-400 block font-sans">Slope m:</span>
                  <span className="font-bold text-indigo-300 text-base">
                    {isVertical ? 'Undefined' : (slope as number).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Line Equation Card */}
              <div className="p-3 rounded-lg bg-[#090D16] border border-indigo-900/40 text-xs space-y-1">
                <span className="text-slate-400 block">Line Equation:</span>
                <div className="font-mono text-sm text-brand-mint font-semibold">
                  {isVertical ? (
                    `x = ${p1.x}`
                  ) : (
                    <MathText
                      math={`y - (${p1.y}) = ${(slope as number).toFixed(2)}(x - (${p1.x}))`}
                    />
                  )}
                </div>
                {!isVertical && (
                  <p className="text-[11px] text-slate-400">
                    Angle of inclination φ: <strong className="text-white">{angleDeg}°</strong> (m = tan φ)
                  </p>
                )}
              </div>
            </div>

            {/* Slider Controls for P1 and P2 */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-3">
              <span className="text-xs font-semibold text-slate-300 block">
                Adjust Points Coordinates:
              </span>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-400 font-mono">P₁ x-coordinate: {p1.x}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={p1.x}
                  onChange={(e) => setP1({ ...p1, x: parseInt(e.target.value) })}
                  className="w-full accent-rose-500"
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-rose-400 font-mono">P₁ y-coordinate: {p1.y}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={p1.y}
                  onChange={(e) => setP1({ ...p1, y: parseInt(e.target.value) })}
                  className="w-full accent-rose-500"
                />
              </div>

              <div className="space-y-2 pt-2 border-t border-slate-800">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-mint font-mono">P₂ x-coordinate: {p2.x}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={p2.x}
                  onChange={(e) => setP2({ ...p2, x: parseInt(e.target.value) })}
                  className="w-full accent-brand-mint"
                />

                <div className="flex items-center justify-between text-xs">
                  <span className="text-brand-mint font-mono">P₂ y-coordinate: {p2.y}</span>
                </div>
                <input
                  type="range"
                  min="-6"
                  max="6"
                  step="1"
                  value={p2.y}
                  onChange={(e) => setP2({ ...p2, y: parseInt(e.target.value) })}
                  className="w-full accent-brand-mint"
                />
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Temperature Model Tab */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Thermometer className="w-4 h-4 text-brand-mint" />
              Fahrenheit vs Celsius Linear Relationship
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              From physics, water freezes at <MathText math="0^\circ\text{C} = 32^\circ\text{F}" /> and boils at <MathText math="100^\circ\text{C} = 212^\circ\text{F}" />.
              This defines a straight line with slope <MathText math="m = \frac{212 - 32}{100 - 0} = \frac{9}{5}" /> and equation <MathText math="F = \frac{9}{5}C + 32" />.
            </p>

            <div className="p-4 rounded-lg bg-[#090D16] border border-slate-800 grid grid-cols-1 sm:grid-cols-3 gap-4 text-center font-mono">
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-sans">Freezing Point</span>
                <span className="text-white font-bold text-sm">(0°C, 32°F)</span>
              </div>
              <div className="p-2 rounded bg-brand-mint/10 border border-brand-mint/30">
                <span className="text-[11px] text-brand-mint block font-sans font-semibold">Equality Point</span>
                <span className="text-brand-mint font-bold text-sm">(-40°C, -40°F)</span>
              </div>
              <div className="p-2 rounded bg-slate-900 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-sans">Boiling Point</span>
                <span className="text-white font-bold text-sm">(100°C, 212°F)</span>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-4">
            <label className="text-xs font-semibold text-slate-300 flex justify-between">
              <span>Drag Celsius Input (°C):</span>
              <span className="font-mono text-brand-mint font-bold text-base">{celsius}°C</span>
            </label>
            <input
              type="range"
              min="-50"
              max="110"
              step="1"
              value={celsius}
              onChange={(e) => setCelsius(parseInt(e.target.value))}
              className="w-full accent-brand-mint"
            />

            <div className="p-3 rounded-lg bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between text-sm font-mono">
              <span className="text-slate-300">Converted Fahrenheit Value:</span>
              <span className="text-indigo-300 font-bold text-lg">
                F = {fahrenheit.toFixed(1)}°F
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CoordinateLineTool;
