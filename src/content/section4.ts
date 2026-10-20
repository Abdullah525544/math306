import { Lesson } from '../types';

export const SECTION_4_DATA: Lesson = {
  id: 'section-4',
  sectionId: 'section-4',
  sectionNumber: 4,
  title: 'Shifting Graphs',
  subtitle: 'Vertical and horizontal shifts, circles, completing the square, and quadratic parabolas.',
  bookPages: 'Pages 27–35',
  exerciseInfo: 'Exercises 4 (About 82 Questions, Answers A-37 to A-39)',
  estimatedMinutes: 45,
  learningGoals: [
    'Apply vertical shift formulas y = f(x) + k (up if k > 0, down if k < 0).',
    'Apply horizontal shift formulas y = f(x - h) (right if h > 0, left if h < 0) and understand why the sign inside is opposite.',
    'Write the standard equation of a circle (x - h)² + (y - k)² = a² with center (h, k) and radius a.',
    'Complete the square on general quadratic equations x² + y² + Dx + Ey + F = 0 to identify circle centers and radii.',
    'Distinguish between circle interior regions (< a²) and exterior regions (> a²).',
    'Graph vertical parabolas y - k = a(x - h)² and horizontal parabolas x - h = a(y - k)², recognizing upper/lower branches.',
    'Execute the 5-step textbook method for graphing quadratic functions y = ax² + bx + c using vertex x = -b/(2a).',
  ],
  intuitiveAnalogy: {
    title: 'The Blueprint Projector & The Stencil Slide',
    text: 'Imagine shining a stencil of y = x² onto a wall. If you push the whole projector UP by 2 units, every point on the wall lands 2 units higher (y = x² + 2). But if you slide the slide inside the projector by 2 units to the right, to hit the exact same stencil opening you have to feed an x that is 2 units LARGER than before! That is why y = (x - 2)² shifts RIGHT: to get (0)², x must be 2. The formula "lags behind" by 2 units!',
  },
  explanationBlocks: [
    {
      heading: '1. Vertical and Horizontal Graph Shifts',
      body: '• **Vertical Shifts:** Adding a constant $k$ to a formula shifts the entire graph vertically:\n  $$y = f(x) + k \\quad \\text{or} \\quad y - k = f(x)$$\n  - If $k > 0$, the graph shifts **UP** by $k$ units.\n  - If $k < 0$, the graph shifts **DOWN** by $|k|$ units.\n\n• **Horizontal Shifts:** Replacing $x$ with $x - h$ shifts the entire graph horizontally:\n  $$y = f(x - h)$$\n  - If $h > 0$, the graph shifts **RIGHT** by $h$ units (e.g., $y = (x - 2)^2$).\n  - If $h < 0$, replacing $x$ with $x - (-3) = x + 3$ shifts **LEFT** by $3$ units (e.g., $y = (x + 3)^2$).\n\n*Why the sign feels backwards:* To get the same output $y$ as $f(0)$, we now need $x - h = 0 \\implies x = h$. The input must be $h$ units larger to compensate for subtracting $h$.',
      formulaLatex: 'y - k = f(x - h) \\iff y = f(x - h) + k \\quad (\\text{Center/vertex shifts to } (h, k))',
    },
    {
      heading: '2. Circles & Completing the Square',
      body: '• **Standard Equation of a Circle:** The circle with radius $a > 0$ centered at $(h, k)$ has equation:\n  $$(x - h)^2 + (y - k)^2 = a^2$$\n\n• **Completing the Square Method:** To convert $x^2 + y^2 + Dx + Ey + F = 0$ into standard form:\n  1. Group $x$-terms and $y$-terms; move the constant $F$ to the right side.\n  2. Add the square of half the coefficient of $x$, namely $(D/2)^2$, to both sides.\n  3. Add the square of half the coefficient of $y$, namely $(E/2)^2$, to both sides.\n  4. Factor into $(x - h)^2 + (y - k)^2 = a^2$.\n\n• **Inequality Regions:**\n  - **Interior (Open Disk):** $(x - h)^2 + (y - k)^2 < a^2$\n  - **Exterior:** $(x - h)^2 + (y - k)^2 > a^2$\n  - **Closed Disk:** $(x - h)^2 + (y - k)^2 \\le a^2$',
      formulaLatex: '(x - h)^2 + (y - k)^2 = a^2 \\quad\\mid\\quad x^2 + Dx + \\left(\\frac{D}{2}\\right)^2 = \\left(x + \\frac{D}{2}\\right)^2',
    },
    {
      heading: '3. Parabolic Graphs & The 5-Step Quadratic Method',
      body: '• **Base Parabolas $y = ax^2$:**\n  - Vertex at $(0, 0)$, symmetric about the $y$-axis ($x = 0$).\n  - Opens upward if $a > 0$, downward if $a < 0$.\n  - Narrows as $|a|$ grows large, widens as $|a| \\to 0$.\n\n• **Shifted Parabola Equation:**\n  $$y - k = a(x - h)^2 \\implies y = ax^2 + bx + c$$\n  - **Axis of Symmetry:** The vertical line $x = -\\frac{b}{2a}$.\n  - **Vertex:** $(h, k)$ where $h = -\\frac{b}{2a}$ and $k = c - \\frac{b^2}{4a}$.\n\n• **The 5-Step Textbook Graphing Procedure (Example 12):**\n  1. Find vertex $(h, k)$ and axis of symmetry $x = -b/(2a)$.\n  2. Determine opening direction from sign of $a$ (up if $a > 0$, down if $a < 0$).\n  3. Find the $y$-intercept by evaluating at $x = 0$ (yielding $(0, c)$).\n  4. Plot the reflection point of $(0, c)$ across the axis of symmetry: $(2h, c)$.\n  5. Find $x$-intercepts (if any) by solving $ax^2 + bx + c = 0$ using the quadratic formula.',
      formulaLatex: 'x = -\\frac{b}{2a}, \\quad \\text{Vertex: } \\left(-\\frac{b}{2a}, \\; f\\left(-\\frac{b}{2a}\\right)\\right)',
    },
  ],
  keyFormulas: [
    {
      title: 'Standard Circle Equation',
      latex: '(x - h)^2 + (y - k)^2 = a^2',
      description: 'Circle of radius a with center (h, k). Follows from the distance formula.',
      ruleOrName: 'Circle Form',
    },
    {
      title: 'Horizontal & Vertical Shift',
      latex: 'y - k = f(x - h)',
      description: 'Replaces (x, y) with (x - h, y - k), shifting entire graph right by h and up by k.',
      ruleOrName: 'Shift Formula',
    },
    {
      title: 'Parabola Axis of Symmetry',
      latex: 'x = -\\frac{b}{2a}',
      description: 'Vertical line passing through the vertex of quadratic curve y = ax² + bx + c.',
      ruleOrName: 'Axis Formula',
    },
    {
      title: 'Completing the Square Identity',
      latex: 'x^2 + Bx + \\left(\\frac{B}{2}\\right)^2 = \\left(x + \\frac{B}{2}\\right)^2',
      description: 'Converts general second-degree forms into vertex or center-radius form.',
      ruleOrName: 'Square Identity',
    },
  ],
  figures: [
    {
      id: 'fig-33-34',
      figureNumber: 'Figures 33 & 34',
      title: 'Figures 33 & 34: Vertical and Horizontal Parabola Shifts (Page 27)',
      bookPage: 'Page 27',
      caption: 'Parabola y = x² shifted vertically to y = x² + 2, x² - 2 and horizontally to (x + 3)², (x - 2)²',
      description: 'Visual demonstration of shift direction and translation geometry.',
    },
    {
      id: 'fig-35',
      figureNumber: 'Figure 35',
      title: 'Figure 35: Shifted Cubic Curves (Page 28)',
      bookPage: 'Page 28',
      caption: 'y = (x - 2)³ - 2 with center (2, -2) and y = (x + 1)³ + 3 with center (-1, 3)',
      description: 'Demonstrates simultaneous horizontal and vertical shifts on inflection curves.',
    },
    {
      id: 'fig-36-37',
      figureNumber: 'Figures 36 & 37',
      title: 'Figures 36 & 37: Circle Geometry & Inequality Regions (Pages 28–30)',
      bookPage: 'Pages 28–30',
      caption: 'Circle of radius a centered at C(h, k) with shaded interior (< a²) vs exterior (> a²).',
      description: 'Distance-based definition of circles and coordinate disk regions.',
    },
    {
      id: 'fig-38-40',
      figureNumber: 'Figures 38–40',
      title: 'Figures 38–40: Families of Parabolas & Horizontal Branches (Pages 30–31)',
      bookPage: 'Pages 30–31',
      caption: 'Vertical scaling y = ax² vs horizontal x = ay², and joining y = ±√x to form x = y².',
      description: 'Width variation with scaling factor a and splitting non-function curves into function branches.',
    },
    {
      id: 'fig-41-42',
      figureNumber: 'Figures 41 & 42',
      title: 'Figures 41 & 42: Shifted Parabola & 5-Step Graph of Example 12 (Page 32)',
      bookPage: 'Page 32',
      caption: 'Annotated graph of y = -1/2 x² - x + 4 with vertex (-1, 9/2), axis x = -1, intercepts (-4, 0), (2, 0), and (0, 4).',
      description: 'Complete textbook case study executing the 5-step quadratic graphing method.',
    },
  ],
  workedExamples: [
    {
      id: 'sec4-ex1-5',
      prompt: 'Examples 1–5: Shift y = x² and y = x³ by vertical and horizontal translations.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Shift y = x² up 1 unit: add 1 to the formula => y = x² + 1. Shift down 2 units => y = x² - 2.',
          expressionLatex: 'y = x^2 + 1 \\; (\\text{up 1}), \\quad y = x^2 - 2 \\; (\\text{down 2})',
        },
        {
          stepNumber: 2,
          explanation: 'Shift y = x² right 2 units: replace x with (x - 2) => y = (x - 2)². Shift left 3 units => y = (x + 3)².',
          expressionLatex: 'y = (x - 2)^2 \\; (\\text{right 2}), \\quad y = (x + 3)^2 \\; (\\text{left 3})',
        },
        {
          stepNumber: 3,
          explanation: 'Shift y = x³ right 2 and down 2: y = (x - 2)³ - 2. Shift left 1 and up 3: y = (x + 1)³ + 3.',
          expressionLatex: 'y = (x - 2)^3 - 2 \\; (\\text{center at } (2, -2)), \\quad y = (x + 1)^3 + 3 \\; (\\text{center at } (-1, 3))',
        },
      ],
      finalAnswer: 'Vertical shift adds k; horizontal shift replaces x with (x - h).',
      finalAnswerLatex: 'y = f(x - h) + k',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 4, Examples 1–5, Pages 27–28',
    },
    {
      id: 'sec4-ex6',
      prompt: 'Example 6: Shift the circle x² + y² = 25 two units to the left and three units up.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Identify shift amounts: left 2 means h = -2, up 3 means k = 3.',
          expressionLatex: 'h = -2, \\quad k = 3',
        },
        {
          stepNumber: 2,
          explanation: 'Replace x with x - (-2) = x + 2, and y with y - 3 in the equation.',
          expressionLatex: '(x + 2)^2 + (y - 3)^2 = 25',
        },
      ],
      finalAnswer: '(x + 2)² + (y - 3)² = 25 with center (-2, 3) and radius 5',
      finalAnswerLatex: '(x + 2)^2 + (y - 3)^2 = 25',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 4, Example 6, Page 29',
    },
    {
      id: 'sec4-ex7-8',
      prompt: 'Examples 7 & 8: Write standard circle forms and extract center and radius.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Ex 7: Circle centered at (3, 4) with radius 2: (x - 3)² + (y - 4)² = 2² = 4.',
          expressionLatex: '(x - 3)^2 + (y - 4)^2 = 4',
        },
        {
          stepNumber: 2,
          explanation: 'Ex 8: From (x - 1)² + (y + 5)² = 3, write y + 5 as y - (-5) and 3 as (√3)². Center is (1, -5) and radius is √3.',
          expressionLatex: '(x - 1)^2 + (y - (-5))^2 = (\\sqrt{3})^2 \\implies \\text{Center: } (1, -5), \\; a = \\sqrt{3}',
        },
      ],
      finalAnswer: 'Ex 7: (x - 3)² + (y - 4)² = 4; Ex 8: Center (1, -5), radius √3',
      finalAnswerLatex: '\\text{Center: } (1, -5), \\quad \\text{Radius: } \\sqrt{3}',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 4, Examples 7 & 8, Page 29',
    },
    {
      id: 'sec4-ex9',
      prompt: 'Example 9: Find the center and radius of x² + y² + 4x - 6y - 3 = 0 by completing the square.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Group x-terms and y-terms together, and move constant -3 to right side.',
          expressionLatex: '(x^2 + 4x) + (y^2 - 6y) = 3',
        },
        {
          stepNumber: 2,
          explanation: 'Take half of x-coefficient: 4/2 = 2, square it: 2² = 4. Take half of y-coefficient: -6/2 = -3, square it: (-3)² = 9. Add 4 and 9 to BOTH sides.',
          expressionLatex: '(x^2 + 4x + 4) + (y^2 - 6y + 9) = 3 + 4 + 9 = 16',
        },
        {
          stepNumber: 3,
          explanation: 'Factor each perfect square trinomial.',
          expressionLatex: '(x + 2)^2 + (y - 3)^2 = 16 = 4^2',
        },
      ],
      finalAnswer: 'Center (-2, 3) and radius 4',
      finalAnswerLatex: '\\text{Center: } (-2, 3), \\quad \\text{Radius: } a = 4',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 4, Example 9, Page 29',
    },
    {
      id: 'sec4-ex12',
      prompt: 'Example 12: Graph y = -1/2 x² - x + 4 following the 5-step textbook method.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Identify coefficients: a = -1/2, b = -1, c = 4. Calculate axis of symmetry: x = -b/(2a) = -(-1)/(2(-1/2)) = 1/(-1) = -1.',
          expressionLatex: 'x = -\\frac{-1}{2(-1/2)} = -1',
        },
        {
          stepNumber: 2,
          explanation: 'Calculate vertex y-value by substituting x = -1: y = -1/2(-1)² - (-1) + 4 = -1/2 + 1 + 4 = 9/2 = 4.5. Vertex is (-1, 9/2).',
          expressionLatex: '\\text{Vertex: } \\left(-1, \\frac{9}{2}\\right)',
        },
        {
          stepNumber: 3,
          explanation: 'Opening direction: since a = -1/2 < 0, the parabola opens downward.',
          expressionLatex: 'a = -\\frac{1}{2} < 0 \\implies \\text{Opens downward}',
        },
        {
          stepNumber: 4,
          explanation: 'Find y-intercept: set x = 0 => y = 4, yielding (0, 4). By symmetry across x = -1, plot (-2, 4).',
          expressionLatex: '(0, 4) \\text{ reflects to } (-2, 4)',
        },
        {
          stepNumber: 5,
          explanation: 'Find x-intercepts: solve -1/2 x² - x + 4 = 0 => x² + 2x - 8 = 0 => (x + 4)(x - 2) = 0 => x = -4, 2.',
          expressionLatex: 'x \\text{-intercepts: } (-4, 0) \\text{ and } (2, 0)',
        },
      ],
      finalAnswer: 'Vertex (-1, 9/2), axis x = -1, intercepts (-4, 0), (2, 0), (0, 4)',
      finalAnswerLatex: '\\text{Vertex: } \\left(-1, \\frac{9}{2}\\right), \\; \\text{Axis: } x = -1, \\; x\\text{-intercepts: } -4, 2',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 4, Example 12, Page 32',
    },
  ],
  toolIds: ['section4-tools'],
  commonMistakes: [
    {
      mistake: 'Shifting to the left when seeing y = f(x - 2).',
      correction: 'y = f(x - 2) shifts RIGHT by 2 units.',
      why: 'To achieve the same output value as f(0), the new input x must equal +2.',
    },
    {
      mistake: 'Adding square terms only to the left side when completing the square.',
      correction: 'Always add (D/2)² and (E/2)² to BOTH sides of the equation to maintain algebraic equality.',
      why: 'Failing to add to the right side changes the radius of the circle completely.',
    },
    {
      mistake: 'Forgetting the negative sign in the vertex formula: writing x = b/(2a).',
      correction: 'The correct axis of symmetry is x = -b/(2a).',
      why: 'Expanding a(x - h)² yields -2ahx, so equating to bx gives h = -b/(2a).',
    },
  ],
  quickCheckIds: ['q4-1', 'q4-2', 'q4-3'],
  chapterSummary: 'Rigid translations shift graphs horizontally (x - h) and vertically (y - k). Completing the square standardizes quadratic relations into circle equations (x - h)² + (y - k)² = a² and determines disk boundaries. Parabolas y = ax² + bx + c have vertical axis x = -b/(2a) and vertex (-b/(2a), y), graphed deterministically using the 5-step textbook method.',
};
