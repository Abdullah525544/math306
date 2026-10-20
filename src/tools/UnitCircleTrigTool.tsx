import React, { useState } from 'react';
import MathText from '../components/MathText';
import { Compass, Waves, CheckCircle2 } from 'lucide-react';

const SPECIAL_ANGLES = [
  { name: '0', rad: 0, deg: 0, cos: '1', sin: '0', tan: '0' },
  { name: 'π/6', rad: Math.PI / 6, deg: 30, cos: '√3/2', sin: '1/2', tan: '1/√3' },
  { name: 'π/4', rad: Math.PI / 4, deg: 45, cos: '√2/2', sin: '√2/2', tan: '1' },
  { name: 'π/3', rad: Math.PI / 3, deg: 60, cos: '1/2', sin: '√3/2', tan: '√3' },
  { name: 'π/2', rad: Math.PI / 2, deg: 90, cos: '0', sin: '1', tan: 'Undef' },
  { name: '2π/3', rad: (2 * Math.PI) / 3, deg: 120, cos: '-1/2', sin: '√3/2', tan: '-√3' },
  { name: '3π/4', rad: (3 * Math.PI) / 4, deg: 135, cos: '-√2/2', sin: '√2/2', tan: '-1' },
  { name: '5π/6', rad: (5 * Math.PI) / 6, deg: 150, cos: '-√3/2', sin: '1/2', tan: '-1/√3' },
  { name: 'π', rad: Math.PI, deg: 180, cos: '-1', sin: '0', tan: '0' },
  { name: '3π/2', rad: (3 * Math.PI) / 2, deg: 270, cos: '0', sin: '-1', tan: 'Undef' },
  { name: '2π', rad: 2 * Math.PI, deg: 360, cos: '1', sin: '0', tan: '0' },
];

export const UnitCircleTrigTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'circle' | 'wave'>('circle');

  // Angle theta in radians
  const [theta, setTheta] = useState<number>(Math.PI / 4);

  // Wave model parameters f(x) = A sin((2π/B)(x - C)) + D
  const [waveA, setWaveA] = useState<number>(37); // Fairbanks amplitude
  const [waveB, setWaveB] = useState<number>(365); // Fairbanks period (days)
  const [waveC, setWaveC] = useState<number>(101); // Fairbanks phase shift
  const [waveD, setWaveD] = useState<number>(25); // Fairbanks midline (avg temp °F)

  // Circle calculations
  const cosVal = Math.cos(theta);
  const sinVal = Math.sin(theta);
  const degVal = Math.round((theta * 180) / Math.PI) % 360;

  // Determine Quadrant
  const normalizedTheta = (theta % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
  let quadrant = 'I';
  if (normalizedTheta > Math.PI / 2 && normalizedTheta < Math.PI) quadrant = 'II';
  else if (normalizedTheta > Math.PI && normalizedTheta < (3 * Math.PI) / 2) quadrant = 'III';
  else if (normalizedTheta > (3 * Math.PI) / 2 && normalizedTheta < 2 * Math.PI) quadrant = 'IV';

  // SVG parameters for circle
  const svgSize = 360;
  const radius = 130;
  const cx = svgSize / 2;
  const cy = svgSize / 2;

  const px = cx + radius * cosVal;
  const py = cy - radius * sinVal;

  // Wave plot path
  const wavePoints = React.useMemo(() => {
    const pts: string[] = [];
    const wWidth = 500;
    const wHeight = 160;
    const days = 365;

    for (let day = 0; day <= days; day += 5) {
      const angle = ((2 * Math.PI) / waveB) * (day - waveC);
      const tempF = waveA * Math.sin(angle) + waveD;
      const x = (day / days) * (wWidth - 60) + 30;
      // map temp from -30 to +80 to height
      const y = wHeight - 20 - ((tempF + 30) / 110) * (wHeight - 40);
      pts.push(`${day === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${y.toFixed(1)}`);
    }
    return pts.join(' ');
  }, [waveA, waveB, waveC, waveD]);

  return (
    <div className="rounded-2xl bg-[#0F172A] border border-slate-800 p-4 sm:p-6 shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div>
          <h3 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-brand-mint animate-pulse" />
            Unit Circle & Sine Wave Lab
          </h3>
          <p className="text-xs text-slate-400">
            Section 5 • Trigonometric Coordinates, CAST Rule, Special Angles & Periodic Modeling
          </p>
        </div>

        <div className="flex items-center gap-1 bg-slate-900/80 p-1 rounded-xl border border-slate-800 text-xs font-medium">
          <button
            type="button"
            onClick={() => setActiveTab('circle')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'circle'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Unit Circle & CAST
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('wave')}
            className={`px-3 py-1.5 rounded-lg transition-colors ${
              activeTab === 'wave'
                ? 'bg-brand-mint text-slate-900 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Fairbanks Sine Wave Model
          </button>
        </div>
      </div>

      {activeTab === 'circle' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* SVG Unit Circle */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <div className="relative w-full max-w-[360px] aspect-square bg-[#090D16] rounded-2xl border border-slate-800 p-2 overflow-hidden shadow-inner">
              <svg viewBox={`0 0 ${svgSize} ${svgSize}`} className="w-full h-full">
                {/* Axes */}
                <line x1="20" y1={cy} x2={svgSize - 20} y2={cy} stroke="#475569" strokeWidth="1.5" />
                <line x1={cx} y1="20" x2={cx} y2={svgSize - 20} stroke="#475569" strokeWidth="1.5" />

                {/* Circle x² + y² = 1 */}
                <circle cx={cx} cy={cy} r={radius} fill="none" stroke="#64748B" strokeWidth="2" strokeDasharray="3 3" />

                {/* Quadrant CAST labels */}
                <text x={cx + 70} y={cy - 70} fill="#94A3B8" fontSize="13" fontWeight="bold">I (ALL +)</text>
                <text x={cx - 110} y={cy - 70} fill="#94A3B8" fontSize="13" fontWeight="bold">II (SIN +)</text>
                <text x={cx - 110} y={cy + 90} fill="#94A3B8" fontSize="13" fontWeight="bold">III (TAN +)</text>
                <text x={cx + 70} y={cy + 90} fill="#94A3B8" fontSize="13" fontWeight="bold">IV (COS +)</text>

                {/* Reference Right Triangle */}
                <polygon
                  points={`${cx},${cy} ${px},${cy} ${px},${py}`}
                  fill="rgba(45, 212, 191, 0.1)"
                />
                {/* Adjacent (cos) */}
                <line x1={cx} y1={cy} x2={px} y2={cy} stroke="#F59E0B" strokeWidth="3" />
                {/* Opposite (sin) */}
                <line x1={px} y1={cy} x2={px} y2={py} stroke="#38BDF8" strokeWidth="3" />
                {/* Hypotenuse (r = 1) */}
                <line x1={cx} y1={cy} x2={px} y2={py} stroke="#2DD4BF" strokeWidth="2.5" />

                {/* Point P(cos θ, sin θ) */}
                <circle cx={px} cy={py} r="7" fill="#2DD4BF" stroke="#FFF" strokeWidth="2" />
              </svg>
            </div>
            <p className="text-[11px] text-slate-500 mt-2 font-mono">
              cos θ (Amber Horizontal), sin θ (Sky Vertical), Hypotenuse r=1 (Mint)
            </p>
          </div>

          {/* Values & Controls */}
          <div className="lg:col-span-6 space-y-4">
            {/* Live Trig Values Grid */}
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="text-xs text-slate-400 uppercase font-semibold">
                  Angle θ: {degVal}° ({(theta / Math.PI).toFixed(2)}π rad)
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-bold bg-slate-800 text-brand-mint border border-brand-mint/30">
                  Quadrant {quadrant}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 text-sm font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-amber-400 block font-sans">cos θ (x):</span>
                  <span className="font-bold text-white text-base">{cosVal.toFixed(4)}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-sky-400 block font-sans">sin θ (y):</span>
                  <span className="font-bold text-white text-base">{sinVal.toFixed(4)}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-indigo-400 block font-sans">tan θ (sin/cos):</span>
                  <span className="font-bold text-indigo-300 text-base">
                    {Math.abs(cosVal) < 1e-4 ? 'Undefined' : (sinVal / cosVal).toFixed(4)}
                  </span>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/60 border border-slate-800">
                  <span className="text-xs text-brand-mint block font-sans">Pythagorean Check:</span>
                  <span className="font-bold text-brand-mint text-base">
                    {(cosVal ** 2 + sinVal ** 2).toFixed(3)} = 1
                  </span>
                </div>
              </div>
            </div>

            {/* Special Angles Snapping Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-slate-400 block">
                Snap to Textbook Table 2 Special Angles:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {SPECIAL_ANGLES.map((ang) => (
                  <button
                    key={ang.name}
                    type="button"
                    onClick={() => setTheta(ang.rad)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-mono border transition-colors ${
                      Math.abs(theta - ang.rad) < 0.05
                        ? 'bg-brand-mint text-slate-900 border-brand-mint font-bold'
                        : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-600'
                    }`}
                  >
                    {ang.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Continuous Angle Slider */}
            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800">
              <label className="text-xs font-semibold text-slate-300 flex justify-between">
                <span>Continuous Angle Scrub (0 to 2π):</span>
                <span className="font-mono text-brand-mint">{degVal}°</span>
              </label>
              <input
                type="range"
                min="0"
                max={2 * Math.PI}
                step="0.02"
                value={theta}
                onChange={(e) => setTheta(parseFloat(e.target.value))}
                className="w-full mt-2 accent-brand-mint"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Wave Model Tab (Fairbanks Alaska) */
        <div className="space-y-6">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-indigo-900/40 space-y-3">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Waves className="w-4 h-4 text-brand-mint" />
              General Sinusoidal Curve: The Fairbanks, Alaska Model
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              In Section 5 (Page 41), the daily normal temperature in Fairbanks is modeled by:
            </p>
            <div className="p-2 rounded bg-[#090D16] border border-slate-800 font-mono text-sm text-center">
              <MathText math="f(x) = 37 \\sin\\left(\\frac{2\\pi}{365}(x - 101)\\right) + 25" block />
            </div>
            <p className="text-xs text-slate-400">
              Amplitude = 37°F, Period = 365 days, Phase shift = Day 101 (April 11), Midline = 25°F.
            </p>
          </div>

          {/* SVG Wave Visualizer */}
          <div className="relative w-full overflow-x-auto bg-[#090D16] rounded-2xl border border-slate-800 p-2">
            <svg viewBox="0 0 500 160" className="w-full h-auto min-w-[480px]">
              {/* Midline */}
              <line x1="30" y1="85" x2="470" y2="85" stroke="#475569" strokeWidth="1" strokeDasharray="3 3" />
              <text x="35" y="80" fill="#64748B" fontSize="10" fontFamily="monospace">Midline D = 25°F</text>

              {/* Sine Wave Curve */}
              <path d={wavePoints} fill="none" stroke="#2DD4BF" strokeWidth="3" />

              {/* Peak Temperature */}
              <circle cx="270" cy="35" r="4" fill="#F43F5E" />
              <text x="270" y="25" textAnchor="middle" fill="#F43F5E" fontSize="10" fontWeight="bold">
                Max: 62°F (Day 192)
              </text>

              {/* Trough Temperature */}
              <circle cx="90" cy="135" r="4" fill="#38BDF8" />
              <text x="90" y="150" textAnchor="middle" fill="#38BDF8" fontSize="10" fontWeight="bold">
                Min: -12°F (Day 10)
              </text>
            </svg>
          </div>

          {/* Wave Sliders */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs">
            <div>
              <label className="text-slate-300 flex justify-between">
                <span>Amplitude (|A|): {waveA}°F</span>
              </label>
              <input
                type="range"
                min="10"
                max="50"
                value={waveA}
                onChange={(e) => setWaveA(parseInt(e.target.value))}
                className="w-full accent-brand-mint"
              />
            </div>
            <div>
              <label className="text-slate-300 flex justify-between">
                <span>Period (B): {waveB} days</span>
              </label>
              <input
                type="range"
                min="180"
                max="365"
                value={waveB}
                onChange={(e) => setWaveB(parseInt(e.target.value))}
                className="w-full accent-brand-indigo"
              />
            </div>
            <div>
              <label className="text-slate-300 flex justify-between">
                <span>Horizontal Shift (C): {waveC}</span>
              </label>
              <input
                type="range"
                min="0"
                max="180"
                value={waveC}
                onChange={(e) => setWaveC(parseInt(e.target.value))}
                className="w-full accent-amber-400"
              />
            </div>
            <div>
              <label className="text-slate-300 flex justify-between">
                <span>Midline (D): {waveD}°F</span>
              </label>
              <input
                type="range"
                min="0"
                max="50"
                value={waveD}
                onChange={(e) => setWaveD(parseInt(e.target.value))}
                className="w-full accent-sky-400"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UnitCircleTrigTool;
