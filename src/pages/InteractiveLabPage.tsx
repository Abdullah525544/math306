import React, { useState } from 'react';
import { 
  FlaskConical, 
  Search, 
  Sliders, 
  Sparkles, 
  Layers, 
  Move, 
  Compass, 
  ArrowRight,
  BookOpen
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Import Section Tools
import { Section1Tools } from '../tools/Section1Tools';
import { Section2Tools } from '../tools/Section2Tools';
import { Section3Tools } from '../tools/Section3Tools';
import { Section4Tools } from '../tools/Section4Tools';
import { Section5Tools } from '../tools/Section5Tools';
import NumberLineTool from '../tools/NumberLineTool';
import CoordinateLineTool from '../tools/CoordinateLineTool';
import FunctionGrapherTool from '../tools/FunctionGrapherTool';
import GraphShiftTool from '../tools/GraphShiftTool';
import UnitCircleTrigTool from '../tools/UnitCircleTrigTool';

interface ToolMetadata {
  id: string;
  sectionId: string;
  sectionNumber: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
}

const TOOLS_METADATA: ToolMetadata[] = [
  {
    id: 'studio-sec1',
    sectionId: 'section-1',
    sectionNumber: 1,
    title: 'Section 1 Full Studio: Number Lines, Table 1 & Solver',
    category: 'Real Numbers & Inequalities',
    description: 'Table 1 interval visualizer, Figures 1–4, sign-flip reciprocal demo, and absolute value neighborhood explorer.',
    tags: ['intervals', 'table 1', 'absolute value', 'distance', 'sign flip', 'solver'],
  },
  {
    id: 'studio-sec2',
    sectionId: 'section-2',
    sectionNumber: 2,
    title: 'Section 2 Full Studio: Coordinates, Distance & Insulation',
    category: 'Coordinates & Lines',
    description: 'Two-point Δx, Δy, distance right triangle, inclination angle φ, perpendicular proof, and wall insulation gradient.',
    tags: ['distance', 'slope', 'increments', 'inclination', 'insulation', 'celsius', 'perpendicular'],
  },
  {
    id: 'studio-sec3',
    sectionId: 'section-3',
    sectionNumber: 3,
    title: 'Section 3 Full Studio: VLT, Fig 26 & Composition Machine',
    category: 'Functions & Operations',
    description: 'Vertical Line Test scanner, Figure 26 9-graph gallery, (f ∘ g) pipeline, and step functions ⌊x⌋ and ⌈x⌉.',
    tags: ['vertical line test', 'figure 26', 'composition', 'step functions', 'floor', 'ceiling', 'symmetry'],
  },
  {
    id: 'studio-sec4',
    sectionId: 'section-4',
    sectionNumber: 4,
    title: 'Section 4 Full Studio: Shifter, Circles & 5-Step Parabola',
    category: 'Shifting Graphs & Circles',
    description: 'Master curve shifter y = f(x - h) + k, completing the square for circle disks, and the 5-step quadratic parabola studio.',
    tags: ['shifts', 'circles', 'completing square', 'parabola', 'vertex', 'translations'],
  },
  {
    id: 'studio-sec5',
    sectionId: 'section-5',
    sectionNumber: 5,
    title: 'Section 5 Full Studio: Unit Circle, Alaska Sine & Law of Cosines',
    category: 'Trigonometric Functions',
    description: 'Synchronized unit circle and wave tracer, CAST rule, Fairbanks Alaska pipeline model, and Law of Cosines triangle solver.',
    tags: ['unit circle', 'cast rule', 'trigonometry', 'sine wave', 'fairbanks', 'law of cosines', 'radians'],
  },
  {
    id: 'tool-sec1',
    sectionId: 'section-1',
    sectionNumber: 1,
    title: 'Focused Lab: Absolute Value Neighborhood Explorer',
    category: 'Real Numbers & Inequalities',
    description: 'Explore |x - a| < D vs |x - a| > D, see shaded solution intervals, and test the negative multiplication sign-flip rule.',
    tags: ['intervals', 'absolute value', 'distance', 'sign flip', 'inequalities'],
  },
  {
    id: 'tool-sec2',
    sectionId: 'section-2',
    sectionNumber: 2,
    title: 'Focused Lab: Coordinate Increments & Temperature Line',
    category: 'Coordinates & Lines',
    description: 'Drag points P1 and P2 to see Δx, Δy, distance hypotenuse, slope m = tan φ, and explore the Celsius-Fahrenheit linear relation.',
    tags: ['distance', 'slope', 'increments', 'inclination', 'celsius', 'fahrenheit'],
  },
  {
    id: 'tool-sec3',
    sectionId: 'section-3',
    sectionNumber: 3,
    title: 'Focused Lab: Function Grapher & Domain Visualizer',
    category: 'Functions & Operations',
    description: 'Inspect domain and range of fundamental curves and scrub vertical lines to verify single-valued function criteria.',
    tags: ['vertical line test', 'domain', 'range', 'symmetry'],
  },
  {
    id: 'tool-sec4',
    sectionId: 'section-4',
    sectionNumber: 4,
    title: 'Focused Lab: Curve Shifter & Circle Region Explorer',
    category: 'Shifting Graphs & Circles',
    description: 'Translate base curves y = f(x - h) + k and test interior/exterior regions of circles (x-h)² + (y-k)² = a².',
    tags: ['shifts', 'circles', 'parabola', 'translations'],
  },
  {
    id: 'tool-sec5',
    sectionId: 'section-5',
    sectionNumber: 5,
    title: 'Focused Lab: Unit Circle & Real-Time Wave Tracker',
    category: 'Trigonometric Functions',
    description: 'Rotate angles θ, observe (cos θ, sin θ) on the unit circle, and trace the continuous sine and cosine oscillations.',
    tags: ['unit circle', 'cast rule', 'trigonometry', 'radians', 'sine wave'],
  },
];

export const InteractiveLabPage: React.FC = () => {
  const [selectedToolId, setSelectedToolId] = useState<string>('studio-sec1');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sectionFilter, setSectionFilter] = useState<string>('all');

  const filteredTools = TOOLS_METADATA.filter((t) => {
    const matchesSection = sectionFilter === 'all' || t.sectionId === sectionFilter;
    const matchesSearch =
      searchQuery === '' ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSection && matchesSearch;
  });

  const activeTool = TOOLS_METADATA.find((t) => t.id === selectedToolId) || TOOLS_METADATA[0];

  const renderActiveToolComponent = () => {
    switch (activeTool.id) {
      case 'studio-sec1':
        return <Section1Tools />;
      case 'studio-sec2':
        return <Section2Tools />;
      case 'studio-sec3':
        return <Section3Tools />;
      case 'studio-sec4':
        return <Section4Tools />;
      case 'studio-sec5':
        return <Section5Tools />;
      case 'tool-sec1':
        return <NumberLineTool />;
      case 'tool-sec2':
        return <CoordinateLineTool />;
      case 'tool-sec3':
        return <FunctionGrapherTool />;
      case 'tool-sec4':
        return <GraphShiftTool />;
      case 'tool-sec5':
        return <UnitCircleTrigTool />;
      default:
        return <Section1Tools />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-mint/10 border border-brand-mint/30 text-brand-mint text-xs font-semibold">
          <FlaskConical className="w-3.5 h-3.5" />
          <span>Mathematical Visualization Studio</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Interactive Mathematical Lab
        </h1>
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
          Directly manipulate formulas, coordinates, and curves. Every visualization runs live deterministically in your browser with zero latency and full mobile-touch responsiveness.
        </p>

        {/* Search and Filters Bar */}
        <div className="pt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search tools by concept (e.g. slope, circle, CAST, radians, shifts)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-800 focus:border-brand-mint focus:outline-none text-xs text-white placeholder-slate-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All Tools' },
              { id: 'section-1', label: 'Sec 1' },
              { id: 'section-2', label: 'Sec 2' },
              { id: 'section-3', label: 'Sec 3' },
              { id: 'section-4', label: 'Sec 4' },
              { id: 'section-5', label: 'Sec 5' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setSectionFilter(f.id)}
                className={`px-3 py-2 rounded-xl text-xs font-mono font-bold whitespace-nowrap transition-colors border ${
                  sectionFilter === f.id
                    ? 'bg-brand-mint text-slate-900 border-brand-mint shadow-sm'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Studio Grid: Tool Selector + Active Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Tool Selector List */}
        <div className="lg:col-span-4 space-y-3">
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
            Select Tool ({filteredTools.length} Available):
          </span>

          <div className="space-y-2">
            {filteredTools.map((tool) => {
              const isSelected = tool.id === activeTool.id;

              return (
                <button
                  key={tool.id}
                  type="button"
                  onClick={() => setSelectedToolId(tool.id)}
                  className={`w-full p-4 rounded-2xl text-left border transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-brand-mint shadow-lg shadow-brand-mint/5'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-brand-indigo uppercase">
                      Section {tool.sectionNumber} • {tool.category}
                    </span>
                    {isSelected && (
                      <span className="w-2 h-2 rounded-full bg-brand-mint animate-pulse" />
                    )}
                  </div>
                  <h4 className={`text-sm font-bold ${isSelected ? 'text-brand-mint' : 'text-white'}`}>
                    {tool.title}
                  </h4>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                    {tool.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active Tool Workspace */}
        <div className="lg:col-span-8 space-y-4">
          <div className="p-4 rounded-2xl bg-slate-900/70 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-xs text-brand-indigo font-mono font-semibold">
                Active Workspace • Section {activeTool.sectionNumber}
              </span>
              <h2 className="text-lg font-bold text-white">
                {activeTool.title}
              </h2>
            </div>

            <Link
              to={`/section/${activeTool.sectionId}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-800 hover:bg-slate-700 text-brand-mint border border-slate-700 transition-colors shrink-0"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Read Full Lesson {activeTool.sectionNumber}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Render Active Tool */}
          <div className="w-full">
            {renderActiveToolComponent()}
          </div>
        </div>

      </div>
    </div>
  );
};

export default InteractiveLabPage;
