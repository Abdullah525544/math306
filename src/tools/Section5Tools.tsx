import React, { useState } from 'react';
import MathText from '../components/MathText';
import { 
  Compass, 
  Activity, 
  Triangle, 
  Layers, 
  RotateCw, 
  CheckCircle2, 
  HelpCircle,
  Maximize2
} from 'lucide-react';

export const Section5Tools: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'unitcircle' | 'pipeline' | 'lawofcosines' | 'figures'>('unitcircle');

  // Unit Circle State
  const [angleDeg, setAngleDeg] = useState<number>(60);

  // General Sine & Fairbanks State
  const [ampA, setAmpA] = useState<number>(37);
  const [periodB, setPeriodB] = useState<number>(365);
  const [shiftC, setShiftC] = useState<number>(101);
  const [midlineD, setMidlineD] = useState<number>(25);

  // Law of Cosines State
  const [sideA, setSideA] = useState<number>(5);
  const [sideB, setSideB] = useState<number>(7);
  const [angleThetaDeg, setAngleThetaDeg] = useState<number>(60);

  // Figures tab sub-tab
  const [activeFigure, setActiveFigure] = useState<'fig47_51' | 'fig52_59' | 'fig60_61' | 'fig62_63' | 'fig64_65'>('fig64_65');

  // Math conversions
  const angleRad = (angleDeg * Math.PI) / 180;
  const cosVal = Math.cos(angleRad);
  const sinVal = Math.sin(angleRad);
  const tanVal = Math.abs(cosVal) > 1e-5 ? sinVal / cosVal : null;
  const cscVal = Math.abs(sinVal) > 1e-5 ? 1 / sinVal : null;
  const secVal = Math.abs(cosVal) > 1e-5 ? 1 / cosVal : null;
  const cotVal = Math.abs(sinVal) > 1e-5 ? cosVal / sinVal : null;

  // Active Quadrant
  const normalizedDeg = ((angleDeg % 360) + 360) % 360;
  const activeQuad =
    normalizedDeg >= 0 && normalizedDeg < 90
      ? 'I'
      : normalizedDeg >= 90 && normalizedDeg < 180
      ? 'II'
      : normalizedDeg >= 180 && normalizedDeg < 270
      ? 'III'
      : 'IV';

  // Law of Cosines computation
  const thetaRad = (angleThetaDeg * Math.PI) / 180;
  const sideCSquared = sideA * sideA + sideB * sideB - 2 * sideA * sideB * Math.cos(thetaRad);
  const sideC = Math.sqrt(Math.max(0, sideCSquared));

  // Unit Circle SVG parameters (size 280x280)
  const ucSize = 280;
  const ucCenter = 140;
  const ucRadius = 100;
  const toUcX = (x: number) => ucCenter + x * ucRadius;
  const toUcY = (y: number) => ucCenter - y * ucRadius;

  // Wave tracer SVG parameters (size 340x280)
  const waveW = 340;
  const waveH = 280;
  const waveMidY = 140;
  const waveAmpPx = 80;

  // Table 2 Presets
  const table2Angles = [-180, -135, -90, -45, 0, 30, 45, 60, 90, 120, 135, 180, 270, 360];

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Section 5 Visual Studio & Trigonometric Laboratory
          </h3>
          <p className="text-xs text-slate-400">
            Synchronized unit circle, wave tracer, Law of Cosines, and Trans-Alaska temperature modeling.
          </p>
        </div>

        <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('unitcircle')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'unitcircle' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Compass className="w-3.5 h-3.5" />
            Unit Circle & Tracer
          </button>
          <button
            onClick={() => setActiveTab('pipeline')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'pipeline' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Alaska Pipeline Model
          </button>
          <button
            onClick={() => setActiveTab('lawofcosines')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'lawofcosines' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Triangle className="w-3.5 h-3.5" />
            Law of Cosines
          </button>
          <button
            onClick={() => setActiveTab('figures')}
            className={`px-3 py-1.5 rounded-lg font-medium transition-colors flex items-center gap-1.5 ${
              activeTab === 'figures' ? 'bg-brand-mint text-slate-950 shadow-sm' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            Figures 47–65
          </button>
        </div>
      </div>

      {/* TAB 1: UNIT CIRCLE & SYNCHRONIZED WAVE TRACER */}
      {activeTab === 'unitcircle' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left: Unit Circle */}
            <div className="lg:col-span-5 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Unit Circle (r = 1)
                </span>
                <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-slate-800 text-brand-mint border border-slate-700">
                  Quadrant {activeQuad}
                </span>
              </div>

              <svg width={ucSize} height={ucSize} className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
                {/* Quadrant Tinting for CAST rule */}
                <rect x={ucCenter} y="0" width={ucCenter} height={ucCenter} fill="#38bdf8" fillOpacity={activeQuad === 'I' ? 0.15 : 0.03} />
                <rect x="0" y="0" width={ucCenter} height={ucCenter} fill="#2dd4bf" fillOpacity={activeQuad === 'II' ? 0.15 : 0.03} />
                <rect x="0" y={ucCenter} width={ucCenter} height={ucCenter} fill="#f59e0b" fillOpacity={activeQuad === 'III' ? 0.15 : 0.03} />
                <rect x={ucCenter} y={ucCenter} width={ucCenter} height={ucCenter} fill="#a855f7" fillOpacity={activeQuad === 'IV' ? 0.15 : 0.03} />

                {/* CAST Quadrant Labels */}
                <text x={ucCenter + 55} y="40" fill="#38bdf8" fontSize="13" fontWeight="bold">A (All +)</text>
                <text x="40" y="40" fill="#2dd4bf" fontSize="13" fontWeight="bold">S (Sin +)</text>
                <text x="40" y={ucCenter + 80} fill="#f59e0b" fontSize="13" fontWeight="bold">T (Tan +)</text>
                <text x={ucCenter + 55} y={ucCenter + 80} fill="#a855f7" fontSize="13" fontWeight="bold">C (Cos +)</text>

                {/* Axes */}
                <line x1="10" y1={ucCenter} x2={ucSize - 10} y2={ucCenter} stroke="#475569" strokeWidth="1.5" />
                <line x1={ucCenter} y1="10" x2={ucCenter} y2={ucSize - 10} stroke="#475569" strokeWidth="1.5" />

                {/* Unit Circle Circumference */}
                <circle cx={ucCenter} cy={ucCenter} r={ucRadius} fill="none" stroke="#38bdf8" strokeWidth="2.5" />

                {/* Reference Right Triangle */}
                <line
                  x1={toUcX(0)}
                  y1={toUcY(0)}
                  x2={toUcX(cosVal)}
                  y2={toUcY(0)}
                  stroke="#38bdf8"
                  strokeWidth="3"
                />
                <line
                  x1={toUcX(cosVal)}
                  y1={toUcY(0)}
                  x2={toUcX(cosVal)}
                  y2={toUcY(sinVal)}
                  stroke="#2dd4bf"
                  strokeWidth="3"
                />
                <line
                  x1={toUcX(0)}
                  y1={toUcY(0)}
                  x2={toUcX(cosVal)}
                  y2={toUcY(sinVal)}
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Radius Terminal Point P */}
                <circle cx={toUcX(cosVal)} cy={toUcY(sinVal)} r="6" fill="#f59e0b" stroke="#ffffff" strokeWidth="2" />

                {/* Coordinates label */}
                <text
                  x={toUcX(cosVal) + (cosVal >= 0 ? 8 : -75)}
                  y={toUcY(sinVal) + (sinVal >= 0 ? -8 : 16)}
                  fill="#ffffff"
                  fontSize="11"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  P({cosVal.toFixed(2)}, {sinVal.toFixed(2)})
                </text>
              </svg>
            </div>

            {/* Right: Synchronized Wave Tracer */}
            <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
              <div className="w-full flex justify-between items-center mb-2">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Synchronized Wave Tracer: y = sin θ (Mint) & y = cos θ (Sky)
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  θ = {angleDeg}° ({angleRad.toFixed(3)} rad)
                </span>
              </div>

              <svg width={waveW} height={waveH} className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
                {/* Horizontal Midline */}
                <line x1="0" y1={waveMidY} x2={waveW} y2={waveMidY} stroke="#475569" strokeWidth="1.5" />
                <line x1="20" y1="20" x2="20" y2={waveH - 20} stroke="#475569" strokeWidth="1.5" />

                {/* High and Low Reference lines */}
                <line x1="0" y1={waveMidY - waveAmpPx} x2={waveW} y2={waveMidY - waveAmpPx} stroke="#1e293b" strokeDasharray="3,3" />
                <line x1="0" y1={waveMidY + waveAmpPx} x2={waveW} y2={waveMidY + waveAmpPx} stroke="#1e293b" strokeDasharray="3,3" />
                <text x="25" y={waveMidY - waveAmpPx + 12} fill="#64748b" fontSize="10">+1</text>
                <text x="25" y={waveMidY + waveAmpPx - 4} fill="#64748b" fontSize="10">-1</text>

                {/* Sine Wave */}
                <path
                  d={Array.from({ length: 121 }, (_, i) => {
                    const deg = (i / 120) * 360;
                    const r = (deg * Math.PI) / 180;
                    const px = 20 + (deg / 360) * (waveW - 40);
                    const py = waveMidY - Math.sin(r) * waveAmpPx;
                    return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#2dd4bf"
                  strokeWidth="2.5"
                />

                {/* Cosine Wave */}
                <path
                  d={Array.from({ length: 121 }, (_, i) => {
                    const deg = (i / 120) * 360;
                    const r = (deg * Math.PI) / 180;
                    const px = 20 + (deg / 360) * (waveW - 40);
                    const py = waveMidY - Math.cos(r) * waveAmpPx;
                    return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
                  }).join(' ')}
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="1.5"
                  strokeDasharray="3,3"
                />

                {/* Active Trace Points on Waves */}
                {normalizedDeg <= 360 && (
                  <>
                    <circle
                      cx={20 + (normalizedDeg / 360) * (waveW - 40)}
                      cy={waveMidY - sinVal * waveAmpPx}
                      r="6"
                      fill="#2dd4bf"
                      stroke="#ffffff"
                      strokeWidth="2"
                    />
                    <circle
                      cx={20 + (normalizedDeg / 360) * (waveW - 40)}
                      cy={waveMidY - cosVal * waveAmpPx}
                      r="5"
                      fill="#38bdf8"
                      stroke="#ffffff"
                      strokeWidth="1.5"
                    />
                  </>
                )}
              </svg>
            </div>
          </div>

          {/* Slider and Preset Buttons */}
          <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-3">
            <div className="flex justify-between items-center text-xs text-slate-300">
              <span className="font-semibold uppercase tracking-wider">Drag Angle θ (-180° to 360°):</span>
              <span className="font-mono text-brand-mint font-bold text-sm">
                {angleDeg}° = {(angleRad / Math.PI).toFixed(2)}π rad
              </span>
            </div>

            <input
              type="range"
              min="-180"
              max="360"
              step="5"
              value={angleDeg}
              onChange={(e) => setAngleDeg(parseInt(e.target.value))}
              className="w-full accent-brand-mint cursor-pointer"
            />

            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] text-slate-400 block font-semibold">
                Table 2 Special Textbook Angles (Page 39):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {table2Angles.map((ang) => (
                  <button
                    key={ang}
                    onClick={() => setAngleDeg(ang)}
                    className={`px-2 py-1 rounded text-[11px] font-mono transition-all ${
                      angleDeg === ang
                        ? 'bg-brand-mint text-slate-950 font-bold shadow'
                        : 'bg-slate-950 border border-slate-800 text-slate-300 hover:text-white'
                    }`}
                  >
                    {ang}°
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Real-time 6 Trigonometric Values Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">sin θ (y/r)</span>
              <div className="text-base font-mono font-bold text-brand-mint mt-1">
                {sinVal.toFixed(3)}
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">cos θ (x/r)</span>
              <div className="text-base font-mono font-bold text-sky-400 mt-1">
                {cosVal.toFixed(3)}
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">tan θ (y/x)</span>
              <div className="text-base font-mono font-bold text-amber-400 mt-1">
                {tanVal !== null ? tanVal.toFixed(3) : 'Undefined'}
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">csc θ (1/sin)</span>
              <div className="text-base font-mono font-bold text-brand-mint mt-1">
                {cscVal !== null ? cscVal.toFixed(3) : 'Undefined'}
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">sec θ (1/cos)</span>
              <div className="text-base font-mono font-bold text-sky-400 mt-1">
                {secVal !== null ? secVal.toFixed(3) : 'Undefined'}
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
              <span className="text-slate-400 block text-[10px] uppercase font-bold">cot θ (1/tan)</span>
              <div className="text-base font-mono font-bold text-amber-400 mt-1">
                {cotVal !== null ? cotVal.toFixed(3) : 'Undefined'}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: ALASKA PIPELINE SINE WAVE MODEL */}
      {activeTab === 'pipeline' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                General Sine Curve Anatomy (Fig. 64 & 65)
              </span>
              <button
                onClick={() => {
                  setAmpA(37);
                  setPeriodB(365);
                  setShiftC(101);
                  setMidlineD(25);
                }}
                className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-800 text-brand-mint border border-slate-700 hover:bg-slate-700"
              >
                Load Fairbanks Alaska Model
              </button>
            </div>

            {/* SVG Sine Curve with Dimension Annotations */}
            <svg width="380" height="260" className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
              {/* Midline D */}
              <line x1="20" y1="130" x2="360" y2="130" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="3,3" />
              <text x="365" y="134" fill="#f59e0b" fontSize="10">y = D ({midlineD}°)</text>

              {/* Upper Bound D + A */}
              <line x1="20" y1="50" x2="360" y2="50" stroke="#1e293b" strokeDasharray="2,2" />
              <text x="25" y="44" fill="#2dd4bf" fontSize="10">Max = D + A ({midlineD + ampA}°)</text>

              {/* Lower Bound D - A */}
              <line x1="20" y1="210" x2="360" y2="210" stroke="#1e293b" strokeDasharray="2,2" />
              <text x="25" y="222" fill="#38bdf8" fontSize="10">Min = D - A ({midlineD - ampA}°)</text>

              {/* Sine Wave Curve */}
              <path
                d={Array.from({ length: 101 }, (_, i) => {
                  const xNorm = i / 100;
                  const angle = 2 * Math.PI * xNorm;
                  const px = 30 + xNorm * 300;
                  const py = 130 - Math.sin(angle) * 80;
                  return `${i === 0 ? 'M' : 'L'} ${px} ${py}`;
                }).join(' ')}
                fill="none"
                stroke="#2dd4bf"
                strokeWidth="3.5"
              />

              {/* Amplitude Dimension Arrow */}
              <line x1="105" y1="130" x2="105" y2="50" stroke="#38bdf8" strokeWidth="2" />
              <text x="110" y="95" fill="#38bdf8" fontSize="11" fontWeight="bold">Amplitude |A| = {ampA}</text>

              {/* Period Dimension Line */}
              <line x1="30" y1="245" x2="330" y2="245" stroke="#a855f7" strokeWidth="2" />
              <text x="180" y="240" fill="#a855f7" fontSize="11" textAnchor="middle" fontWeight="bold">Period B = {periodB}</text>
            </svg>

            {/* Sliders */}
            <div className="w-full mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Amplitude A:</span>
                    <span className="font-mono text-brand-mint font-bold">{ampA}</span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="50"
                    step="1"
                    value={ampA}
                    onChange={(e) => setAmpA(parseFloat(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Period B:</span>
                    <span className="font-mono text-brand-mint font-bold">{periodB}</span>
                  </div>
                  <input
                    type="range"
                    min="100"
                    max="500"
                    step="5"
                    value={periodB}
                    onChange={(e) => setPeriodB(parseFloat(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Horizontal Shift C:</span>
                    <span className="font-mono text-brand-mint font-bold">{shiftC}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    step="1"
                    value={shiftC}
                    onChange={(e) => setShiftC(parseFloat(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Midline D:</span>
                    <span className="font-mono text-brand-mint font-bold">{midlineD}</span>
                  </div>
                  <input
                    type="range"
                    min="-20"
                    max="50"
                    step="1"
                    value={midlineD}
                    onChange={(e) => setMidlineD(parseFloat(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-brand-mint" />
                Fairbanks, Alaska Application Profile
              </h4>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Textbook Equation (Page 46):
                </span>
                <div className="font-mono text-sm text-white font-bold">
                  <MathText text={`$f(x) = ${ampA}\\sin\\left(\\frac{2\\pi}{${periodB}}(x - ${shiftC})\\right) + ${midlineD}$`} />
                </div>
              </div>

              <div className="space-y-2 text-xs text-slate-300">
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Mean Annual Temperature (Midline):</span>
                  <span className="font-mono font-bold text-amber-400">{midlineD}°F</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Peak Summer High (D + A):</span>
                  <span className="font-mono font-bold text-emerald-400">{midlineD + ampA}°F</span>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-lg border border-slate-800 flex justify-between">
                  <span className="text-slate-400">Winter Low (D - A):</span>
                  <span className="font-mono font-bold text-sky-400">{midlineD - ampA}°F</span>
                </div>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed pt-1">
                <strong>Why this mattered to engineers:</strong> Permafrost melts above 32°F, so the 800-mile Trans-Alaska Pipeline had to be elevated on thermal heat pipes to prevent ground thawing and disastrous pipe rupture.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: LAW OF COSINES */}
      {activeTab === 'lawofcosines' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 bg-slate-950/70 p-4 rounded-xl border border-slate-800 flex flex-col items-center">
            <div className="w-full flex justify-between items-center mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Interactive Triangle & Coordinate Placement (Fig. 63)
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-mono font-bold bg-slate-800 text-brand-mint border border-slate-700">
                c = {sideC.toFixed(2)}
              </span>
            </div>

            {/* Triangle SVG */}
            <svg width="360" height="260" className="bg-slate-950 rounded-lg border border-slate-800/80 shadow-inner overflow-hidden">
              {/* Axes */}
              <line x1="20" y1="210" x2="340" y2="210" stroke="#475569" strokeWidth="1.5" />
              <line x1="40" y1="20" x2="40" y2="240" stroke="#475569" strokeWidth="1.5" />

              {/* Triangle Vertices: Origin C(0,0), A(b, 0), B(a cos θ, a sin θ) */}
              {(() => {
                const ox = 50;
                const oy = 210;
                const scale = 22;
                const ax = ox + sideB * scale;
                const ay = oy;
                const bx = ox + sideA * Math.cos(thetaRad) * scale;
                const by = oy - sideA * Math.sin(thetaRad) * scale;

                return (
                  <g>
                    {/* Triangle Polygon */}
                    <polygon
                      points={`${ox},${oy} ${ax},${ay} ${bx},${by}`}
                      fill="#2dd4bf"
                      fillOpacity="0.15"
                      stroke="#2dd4bf"
                      strokeWidth="2.5"
                    />

                    {/* Side Labels */}
                    <text x={(ox + ax) / 2} y={oy + 18} fill="#38bdf8" fontSize="12" fontWeight="bold">
                      b = {sideB}
                    </text>
                    <text x={(ox + bx) / 2 - 15} y={(oy + by) / 2} fill="#38bdf8" fontSize="12" fontWeight="bold">
                      a = {sideA}
                    </text>
                    <text x={(ax + bx) / 2 + 10} y={(ay + by) / 2} fill="#f59e0b" fontSize="12" fontWeight="bold">
                      c = {sideC.toFixed(2)}
                    </text>

                    {/* Angle Arc at origin */}
                    <text x={ox + 20} y={oy - 8} fill="#a855f7" fontSize="11" fontWeight="bold">
                      θ = {angleThetaDeg}°
                    </text>

                    {/* Vertices Dots */}
                    <circle cx={ox} cy={oy} r="4" fill="#ffffff" />
                    <circle cx={ax} cy={ay} r="4" fill="#ffffff" />
                    <circle cx={bx} cy={by} r="4" fill="#ffffff" />
                  </g>
                );
              })()}
            </svg>

            {/* Sliders */}
            <div className="w-full mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Side a:</span>
                    <span className="font-mono text-brand-mint font-bold">{sideA}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="0.5"
                    value={sideA}
                    onChange={(e) => setSideA(parseFloat(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-xs text-slate-300">
                    <span>Side b:</span>
                    <span className="font-mono text-brand-mint font-bold">{sideB}</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="9"
                    step="0.5"
                    value={sideB}
                    onChange={(e) => setSideB(parseFloat(e.target.value))}
                    className="w-full accent-brand-mint cursor-pointer"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Included Angle θ:</span>
                  <span className="font-mono text-brand-mint font-bold">{angleThetaDeg}°</span>
                </div>
                <input
                  type="range"
                  min="15"
                  max="165"
                  step="5"
                  value={angleThetaDeg}
                  onChange={(e) => setAngleThetaDeg(parseInt(e.target.value))}
                  className="w-full accent-brand-mint cursor-pointer"
                />
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="p-4 bg-slate-900/90 rounded-xl border border-slate-800 space-y-3">
              <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-brand-mint" />
                Law of Cosines Step-by-Step
              </h4>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">General Formula:</span>
                <MathText text="$c^2 = a^2 + b^2 - 2ab\\cos\\theta$" />
              </div>

              <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs space-y-2 font-mono">
                <div className="text-slate-400">
                  c² = ({sideA})² + ({sideB})² - 2({sideA})({sideB})cos({angleThetaDeg}°)
                </div>
                <div className="text-slate-400">
                  c² = {sideA * sideA} + {sideB * sideB} - {(2 * sideA * sideB * Math.cos(thetaRad)).toFixed(2)}
                </div>
                <div className="text-white font-bold">
                  c² = {sideCSquared.toFixed(2)}
                </div>
                <div className="text-brand-mint text-sm font-bold pt-1 border-t border-slate-800">
                  c = √({sideCSquared.toFixed(2)}) = {sideC.toFixed(3)}
                </div>
              </div>

              {angleThetaDeg === 90 && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-lg text-emerald-300 text-xs">
                  <CheckCircle2 className="w-3.5 h-3.5 inline mr-1 text-emerald-400" />
                  Since $\cos 90^\circ = 0$, the formula reduces exactly to the <strong>Pythagorean Theorem</strong>: $c^2 = a^2 + b^2$.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: FIGURES 47–65 */}
      {activeTab === 'figures' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setActiveFigure('fig47_51')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig47_51' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 47–51: Radians & Arc s = rθ
            </button>
            <button
              onClick={() => setActiveFigure('fig52_59')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig52_59' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 52–59: Circle Trig & CAST
            </button>
            <button
              onClick={() => setActiveFigure('fig60_61')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig60_61' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 60–61: 6 Trig Graphs
            </button>
            <button
              onClick={() => setActiveFigure('fig62_63')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig62_63' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 62–63: Law of Cosines
            </button>
            <button
              onClick={() => setActiveFigure('fig64_65')}
              className={`px-3 py-1.5 rounded-lg border font-medium ${
                activeFigure === 'fig64_65' ? 'bg-brand-mint text-slate-950 border-brand-mint' : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}
            >
              Figs 64–65: Fairbanks Wave
            </button>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
            {activeFigure === 'fig47_51' && (
              <>
                <h4 className="text-sm font-bold text-white">Figures 47–51: Arc Length & Reference Triangles (Pages 35–36)</h4>
                <p className="text-xs text-slate-400">
                  Arc length $s = r\theta$ requires $\theta$ in radians. Special triangles 45°-45°-90° ($1, 1, \sqrt{2}$) and 30°-60°-90° ($1, \sqrt{3}, 2$) establish fundamental values.
                </p>
              </>
            )}
            {activeFigure === 'fig52_59' && (
              <>
                <h4 className="text-sm font-bold text-white">Figures 52–59: Circular Definitions & The CAST Rule (Pages 37–39)</h4>
                <p className="text-xs text-slate-400">
                  $P(x, y) = (r\cos\theta, r\sin\theta)$. Quadrant signs follow All, Sin, Tan, Cos. Reference triangles in QII and QIV provide exact radicals.
                </p>
              </>
            )}
            {activeFigure === 'fig60_61' && (
              <>
                <h4 className="text-sm font-bold text-white">Figures 60 & 61: The 6 Trigonometric Graphs (Pages 40–41)</h4>
                <p className="text-xs text-slate-400">
                  Plots of $\sin, \cos, \tan, \sec, \csc, \cot$ with vertical asymptotes. Demonstrates frequency doubling in $\cos 2x$ (period $\pi$) versus frequency halving in $\cos(x/2)$ (period $4\pi$).
                </p>
              </>
            )}
            {activeFigure === 'fig62_63' && (
              <>
                <h4 className="text-sm font-bold text-white">Figures 62 & 63: Derivation of the Law of Cosines (Pages 41–43)</h4>
                <p className="text-xs text-slate-400">
                  By placing triangle vertex $C$ at origin with $A(b, 0)$ and $B(a\cos\theta, a\sin\theta)$, the distance formula directly derives $c^2 = a^2 + b^2 - 2ab\cos\theta$.
                </p>
              </>
            )}
            {activeFigure === 'fig64_65' && (
              <>
                <h4 className="text-sm font-bold text-white">Figures 64 & 65: General Sine Curves & Fairbanks Alaska (Page 46)</h4>
                <p className="text-xs text-slate-400">
                  <MathText text="$f(x) = A\sin((2\pi/B)(x - C)) + D$ parameterized for 365-day annual arctic temperature oscillations with midline $25^\circ\text{F}$ and amplitude $37^\circ\text{F}$." />
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
