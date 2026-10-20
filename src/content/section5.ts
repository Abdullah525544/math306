import { Lesson } from '../types';

export const SECTION_5_DATA: Lesson = {
  id: 'section-5',
  sectionId: 'section-5',
  sectionNumber: 5,
  title: 'Trigonometric Functions',
  subtitle: 'Radian measure, circular definitions, CAST rule, graphs, symmetries, identities, Law of Cosines, and sine modeling.',
  bookPages: 'Pages 35–47',
  exerciseInfo: 'Exercises 5 (About 68 Questions, Answers A-39 to A-40)',
  estimatedMinutes: 50,
  learningGoals: [
    'Convert seamlessly between radians and degrees using π rad = 180° and apply arc length formula s = rθ.',
    'Define all 6 trigonometric functions on the Cartesian circle of radius r: sin, cos, tan, csc, sec, cot.',
    'Locate reference angles, determine signs with the CAST Rule, and recall exact special values from Table 2.',
    'Sketch and analyze the periodic graphs of all 6 trigonometric functions, noting vertical asymptotes and periods (π for tan/cot; 2π for sin/cos/sec/csc).',
    'Classify trig symmetries: even (cos, sec) vs. odd (sin, tan, csc, cot).',
    'Derive and apply Pythagorean, angle sum, double-angle, and half-angle / power-reducing identities.',
    'Apply the Law of Cosines c² = a² + b² - 2ab cos θ to arbitrary oblique triangles.',
    'Model periodic real-world phenomena with general sine curves f(x) = A sin((2π/B)(x - C)) + D, such as the Trans-Alaska Pipeline temperature model.',
  ],
  intuitiveAnalogy: {
    title: 'The Ferris Wheel & The Unrolling Ribbon',
    text: 'Imagine riding a unit Ferris wheel of radius 1 centered at the origin. Your horizontal position is cos θ, and your vertical height is sin θ. As the wheel turns at a steady angle θ, a pen tracing your height onto an unrolling paper ribbon draws the smooth sinusoidal wave y = sin θ! Radians measure the actual distance you travel along the wheel circumference (s = rθ). One full revolution of the wheel is 2π radians (approx 6.28 units of track)!',
  },
  explanationBlocks: [
    {
      heading: '1. Radian Measure & Arc Length s = rθ',
      body: '• **Radian Definition:** An angle of 1 radian subtends an arc on a circle equal in length to the circle radius $r$.\n  $$\\pi \\text{ radians} = 180^\\circ \\implies 1^\\circ = \\frac{\\pi}{180} \\text{ rad} \\approx 0.0175 \\text{ rad}, \\quad 1 \\text{ rad} = \\frac{180^\\circ}{\\pi} \\approx 57.296^\\circ$$\n\n• **Standard Position:** Vertex at origin $(0, 0)$, initial ray along positive $x$-axis. Counterclockwise rotations represent positive angles; clockwise rotations represent negative angles.\n\n• **Arc Length Formula:**\n  $$s = r\\theta$$\n  *CRITICAL RULE:* This formula is valid **ONLY when $\\theta$ is measured in radians**! In calculus, all angle inputs are assumed to be in radians unless explicit degree marks are given.',
      formulaLatex: 's = r\\theta \\quad (\\theta \\text{ in radians}) \\quad\\mid\\quad \\pi \\text{ rad} = 180^\\circ',
    },
    {
      heading: '2. The Six Trigonometric Functions & CAST Rule',
      body: 'Let $P(x, y)$ be any point on a circle of radius $r = \\sqrt{x^2 + y^2}$ at angle $\\theta$:\n• $\\sin\\theta = \\frac{y}{r}, \\quad \\cos\\theta = \\frac{x}{r}, \\quad \\tan\\theta = \\frac{y}{x} \\; (x \\neq 0)$\n• $\\csc\\theta = \\frac{r}{y} \\; (y \\neq 0), \\quad \\sec\\theta = \\frac{r}{x} \\; (x \\neq 0), \\quad \\cot\\theta = \\frac{x}{y} \\; (y \\neq 0)$\n\nOn the **Unit Circle** ($r = 1$):\n$$x = \\cos\\theta, \\quad y = \\sin\\theta, \\quad P(\\cos\\theta, \\sin\\theta)$$\n\n• **The CAST Rule (Quadrant Signs):**\n  - **Quadrant I (0 to $\\pi/2$):** **A**ll functions are positive.\n  - **Quadrant II ($\\pi/2$ to $\\pi$):** **S**ine (and csc) are positive; cos, tan are negative.\n  - **Quadrant III ($\\pi$ to $3\\pi/2$):** **T**angent (and cot) are positive; sin, cos are negative.\n  - **Quadrant IV ($3\\pi/2$ to $2\\pi$):** **C**osine (and sec) are positive; sin, tan are negative.',
      formulaLatex: 'x = r\\cos\\theta, \\; y = r\\sin\\theta \\quad\\mid\\quad \\text{CAST Rule: } \\begin{array}{c|c} \\text{II: Sin} & \\text{I: All} \\\\ \\hline \\text{III: Tan} & \\text{IV: Cos} \\end{array}',
    },
    {
      heading: '3. Periodicity, Symmetries & Fundamental Identities',
      body: '• **Periodicity:** A function is periodic if $f(x + p) = f(x)$ for all $x$. The smallest positive constant $p$ is the fundamental period.\n  - Period $\\pi$: $\\tan(x + \\pi) = \\tan x, \\quad \\cot(x + \\pi) = \\cot x$\n  - Period $2\\pi$: $\\sin(x + 2\\pi) = \\sin x, \\quad \\cos(x + 2\\pi) = \\cos x, \\quad \\sec, \\csc$\n\n• **Even vs. Odd Symmetries:**\n  - **Even ($y$-axis symmetry):** $\\cos(-x) = \\cos x, \\quad \\sec(-x) = \\sec x$\n  - **Odd (origin symmetry):** $\\sin(-x) = -\\sin x, \\quad \\tan(-x) = -\\tan x, \\quad \\csc(-x) = -\\csc x, \\quad \\cot(-x) = -\\cot x$\n\n• **Pythagorean Identities:**\n  $$\\cos^2\\theta + \\sin^2\\theta = 1, \\quad 1 + \\tan^2\\theta = \\sec^2\\theta, \\quad 1 + \\cot^2\\theta = \\csc^2\\theta$$\n\n• **Angle Sum & Double-Angle Formulas:**\n  $$\\cos(A + B) = \\cos A \\cos B - \\sin A \\sin B, \\quad \\sin(A + B) = \\sin A \\cos B + \\cos A \\sin B$$\n  $$\\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta, \\quad \\sin 2\\theta = 2\\sin\\theta\\cos\\theta$$\n  $$\\cos^2\\theta = \\frac{1 + \\cos 2\\theta}{2}, \\quad \\sin^2\\theta = \\frac{1 - \\cos 2\\theta}{2}$$',
      formulaLatex: '\\cos^2\\theta + \\sin^2\\theta = 1 \\quad\\mid\\quad \\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta = 2\\cos^2\\theta - 1 = 1 - 2\\sin^2\\theta',
    },
    {
      heading: '4. Law of Cosines & General Sine Modeling',
      body: '• **The Law of Cosines:** For any triangle with side lengths $a, b, c$ and included angle $\\theta$ opposite to side $c$:\n  $$c^2 = a^2 + b^2 - 2ab\\cos\\theta$$\n  When $\\theta = 90^\\circ$, $\\cos 90^\\circ = 0$, reducing to the Pythagorean theorem $c^2 = a^2 + b^2$.\n\n• **General Sine Curve Anatomy (Figure 64):**\n  $$f(x) = A\\sin\\left(\\frac{2\\pi}{B}(x - C)\\right) + D$$\n  - $|A|$: **Amplitude** (peak height above midline)\n  - $|B|$: **Period** (horizontal length of one full cycle)\n  - $C$: **Horizontal shift** (phase shift to the right)\n  - $D$: **Vertical shift / Midline** ($y = D$)\n\n• **Fairbanks, Alaska Air Temperature Model (Page 46):**\n  $$f(x) = 37\\sin\\left(\\frac{2\\pi}{365}(x - 101)\\right) + 25$$\n  Where $x$ is day of year ($x = 101$ is April 11). Midline is $25^\\circ\\text{F}$, amplitude is $37^\\circ\\text{F}$, so high is $62^\\circ\\text{F}$ and low is $-12^\\circ\\text{F}$.',
      formulaLatex: 'c^2 = a^2 + b^2 - 2ab\\cos\\theta \\quad\\mid\\quad f(x) = A\\sin\\left(\\frac{2\\pi}{B}(x - C)\\right) + D',
    },
  ],
  keyFormulas: [
    {
      title: 'Arc Length',
      latex: 's = r\\theta',
      description: 'Arc length subtended by central angle θ (strictly in radians).',
      ruleOrName: 'Arc Formula',
    },
    {
      title: 'Pythagorean Fundamental',
      latex: '\\cos^2\\theta + \\sin^2\\theta = 1',
      description: 'Coordinates on the unit circle satisfy x² + y² = 1.',
      ruleOrName: 'Trig Pythagorean',
    },
    {
      title: 'Double-Angle Identities',
      latex: '\\sin 2\\theta = 2\\sin\\theta\\cos\\theta, \\quad \\cos 2\\theta = \\cos^2\\theta - \\sin^2\\theta',
      description: 'Expresses trig functions of 2θ in terms of single-angle θ.',
      ruleOrName: 'Double Angle',
    },
    {
      title: 'Law of Cosines',
      latex: 'c^2 = a^2 + b^2 - 2ab\\cos\\theta',
      description: 'Relates three sides and one angle of any oblique triangle.',
      ruleOrName: 'Law of Cosines',
    },
    {
      title: 'General Sine Wave',
      latex: 'f(x) = A\\sin\\left(\\frac{2\\pi}{B}(x - C)\\right) + D',
      description: 'Parameters: A = Amplitude, B = Period, C = Horizontal Shift, D = Midline.',
      ruleOrName: 'Sine Model',
    },
  ],
  figures: [
    {
      id: 'fig-47-51',
      figureNumber: 'Figures 47–51',
      title: 'Figures 47–51: Radian Arc Length & Special Triangles (Pages 35–36)',
      bookPage: 'Pages 35–36',
      caption: 'Unit circle arc length θ, 45°-45°-90° (1, 1, √2), and 30°-60°-90° (1, √3, 2) reference triangles.',
      description: 'Foundational geometric definitions for radians and exact trigonometric values.',
    },
    {
      id: 'fig-52-59',
      figureNumber: 'Figures 52–59',
      title: 'Figures 52–59: Circle Definitions & CAST Quadrant Rule (Pages 37–39)',
      bookPage: 'Pages 37–39',
      caption: 'P(x, y) = (r cos θ, r sin θ), reference triangles in Quadrant II and IV, and the CAST rule diagram.',
      description: 'Extension of right-triangle trigonometry to arbitrary positive and negative real angles.',
    },
    {
      id: 'fig-60-61',
      figureNumber: 'Figures 60 & 61',
      title: 'Figures 60 & 61: The 6 Trig Function Graphs & Frequency Shifts (Pages 40–41)',
      bookPage: 'Pages 40–41',
      caption: 'Graphs of sin, cos, tan, cot, sec, csc with asymptotes, and frequency comparison of cos 2x vs cos(x/2).',
      description: 'Visualizing period, range boundaries, and vertical asymptote locations.',
    },
    {
      id: 'fig-62-63',
      figureNumber: 'Figures 62 & 63',
      title: 'Figures 62 & 63: Derivation of Law of Cosines (Pages 41–43)',
      bookPage: 'Pages 41–43',
      caption: 'Placing triangle ABC on Cartesian axes with A(b, 0) and B(a cos θ, a sin θ) to derive c² = a² + b² - 2ab cos θ.',
      description: 'Rigorous coordinate geometry proof of the Law of Cosines.',
    },
    {
      id: 'fig-64-65',
      figureNumber: 'Figures 64 & 65',
      title: 'Figures 64 & 65: General Sine Curve & Fairbanks Alaska Pipeline Model (Page 46)',
      bookPage: 'Page 46',
      caption: 'Anatomy of A sin((2π/B)(x - C)) + D and the Fairbanks Alaska 365-day normal mean temperature fit.',
      description: 'Application of pre-calculus trigonometry to arctic pipeline engineering.',
    },
  ],
  workedExamples: [
    {
      id: 'sec5-ex1',
      prompt: 'Example 1: Convert angles between radians and degrees: (a) 45°, (b) -π/6 rad, (c) 1 rad.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Convert 45° to radians: multiply by π/180.',
          expressionLatex: '45^\\circ \\times \\frac{\\pi}{180^\\circ} = \\frac{\\pi}{4} \\text{ rad}',
        },
        {
          stepNumber: 2,
          explanation: 'Convert -π/6 rad to degrees: multiply by 180/π.',
          expressionLatex: '-\\frac{\\pi}{6} \\times \\frac{180^\\circ}{\\pi} = -30^\\circ',
        },
        {
          stepNumber: 3,
          explanation: 'Convert 1 radian to degrees: 180/π ≈ 57.3°.',
          expressionLatex: '1 \\text{ rad} = \\frac{180^\\circ}{\\pi} \\approx 57.296^\\circ',
        },
      ],
      finalAnswer: '45° = π/4 rad; -π/6 rad = -30°; 1 rad ≈ 57.3°',
      finalAnswerLatex: '45^\\circ = \\frac{\\pi}{4}, \\quad -\\frac{\\pi}{6} = -30^\\circ, \\quad 1 \\text{ rad} \\approx 57.3^\\circ',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 5, Example 1, Page 36',
    },
    {
      id: 'sec5-ex2',
      prompt: 'Example 2: Find the exact values of cos(2π/3) and tan(2π/3).',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Angle 2π/3 (120°) lies in Quadrant II. The reference angle is π - 2π/3 = π/3 (60°).',
          expressionLatex: '\\theta_{\\text{ref}} = \\pi - \\frac{2\\pi}{3} = \\frac{\\pi}{3}',
        },
        {
          stepNumber: 2,
          explanation: 'In Quadrant II, cosine and tangent are NEGATIVE (by CAST rule).',
          expressionLatex: '\\cos\\left(\\frac{2\\pi}{3}\\right) = -\\cos\\left(\\frac{\\pi}{3}\\right) = -\\frac{1}{2}',
        },
        {
          stepNumber: 3,
          explanation: 'Evaluate tangent using reference value tan(π/3) = √3 with negative sign.',
          expressionLatex: '\\tan\\left(\\frac{2\\pi}{3}\\right) = -\\tan\\left(\\frac{\\pi}{3}\\right) = -\\sqrt{3}',
        },
      ],
      finalAnswer: 'cos(2π/3) = -1/2, tan(2π/3) = -√3',
      finalAnswerLatex: '\\cos\\left(\\frac{2\\pi}{3}\\right) = -\\frac{1}{2}, \\quad \\tan\\left(\\frac{2\\pi}{3}\\right) = -\\sqrt{3}',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 5, Example 2, Page 39',
    },
    {
      id: 'sec5-ex3',
      prompt: 'Example 3: Find exact values of sin(-π/4), cos(-π/4), and sec(-π/4).',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Angle -π/4 lies in Quadrant IV with reference angle π/4.',
          expressionLatex: '\\theta = -\\frac{\\pi}{4} \\in \\text{Quadrant IV}, \\quad \\theta_{\\text{ref}} = \\frac{\\pi}{4}',
        },
        {
          stepNumber: 2,
          explanation: 'In Quadrant IV, cosine and secant are positive; sine is negative.',
          expressionLatex: '\\sin\\left(-\\frac{\\pi}{4}\\right) = -\\sin\\left(\\frac{\\pi}{4}\\right) = -\\frac{\\sqrt{2}}{2} = -\\frac{1}{\\sqrt{2}}',
        },
        {
          stepNumber: 3,
          explanation: 'Cosine is even: cos(-x) = cos(x), so cos(-π/4) = √2/2, sec(-π/4) = √2.',
          expressionLatex: '\\cos\\left(-\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}, \\quad \\sec\\left(-\\frac{\\pi}{4}\\right) = \\sqrt{2}',
        },
      ],
      finalAnswer: 'sin = -√2/2, cos = √2/2, sec = √2',
      finalAnswerLatex: '\\sin\\left(-\\frac{\\pi}{4}\\right) = -\\frac{\\sqrt{2}}{2}, \\; \\cos\\left(-\\frac{\\pi}{4}\\right) = \\frac{\\sqrt{2}}{2}, \\; \\sec\\left(-\\frac{\\pi}{4}\\right) = \\sqrt{2}',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 5, Example 3, Page 39',
    },
    {
      id: 'sec5-fairbanks',
      prompt: 'Trans-Alaska Pipeline Case: Interpret the Fairbanks model f(x) = 37 sin((2π/365)(x - 101)) + 25.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Identify parameters: Amplitude A = 37°F, Period B = 365 days, Shift C = 101 days, Midline D = 25°F.',
          expressionLatex: 'A = 37, \\quad B = 365, \\quad C = 101, \\quad D = 25',
        },
        {
          stepNumber: 2,
          explanation: 'Calculate annual high and low temperatures: High = D + A = 25 + 37 = 62°F. Low = D - A = 25 - 37 = -12°F.',
          expressionLatex: 'T_{\\max} = 25 + 37 = 62^\\circ\\text{F}, \\quad T_{\\min} = 25 - 37 = -12^\\circ\\text{F}',
        },
        {
          stepNumber: 3,
          explanation: 'Horizontal shift C = 101 indicates the date when temperature crosses midline 25°F rising upward (day 101 = April 11).',
          expressionLatex: 'x = 101 \\implies f(101) = 37\\sin(0) + 25 = 25^\\circ\\text{F}',
        },
      ],
      finalAnswer: 'Midline 25°F, Amplitude 37°F (High 62°F, Low -12°F), Period 365 days',
      finalAnswerLatex: 'T_{\\text{high}} = 62^\\circ\\text{F}, \\quad T_{\\text{low}} = -12^\\circ\\text{F}, \\quad \\text{Period} = 365 \\text{ days}',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 5, Pages 46–47',
    },
  ],
  toolIds: ['section5-tools'],
  commonMistakes: [
    {
      mistake: 'Using degree angle inputs in the arc length formula s = rθ.',
      correction: 'Convert degrees to radians FIRST before evaluating s = rθ.',
      why: 'The radian is defined so that θ = s/r; using degrees multiplies the answer erroneously by 180/π ≈ 57.3.',
    },
    {
      mistake: 'Confusing even and odd symmetries: treating sin(-x) as sin(x).',
      correction: 'Sine is odd: sin(-x) = -sin(x). Cosine is even: cos(-x) = cos(x).',
      why: 'Reflecting angle across x-axis negates the y-coordinate (sin), while keeping the x-coordinate (cos) identical.',
    },
    {
      mistake: 'Forgetting the negative sign in Law of Cosines: writing c² = a² + b² + 2ab cos θ.',
      correction: 'The correct formula is c² = a² + b² - 2ab cos θ.',
      why: 'Derived from distance formula on (a cos θ - b)² + (a sin θ)², producing the cross-term -2ab cos θ.',
    },
  ],
  quickCheckIds: ['q5-1', 'q5-2', 'q5-3'],
  chapterSummary: 'Trigonometric functions map real radian angles along the circular trajectory P(cos θ, sin θ). The CAST rule and reference triangles govern exact values across all quadrants. Symmetries and fundamental identities (Pythagorean, angle sum, double-angle) enable algebraic transformation. The Law of Cosines solves arbitrary triangles, while general sine curves model periodic phenomena like seasonal Arctic temperature variations.',
};
