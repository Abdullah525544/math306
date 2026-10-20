import { Lesson } from '../types';

export const SECTION_1_DATA: Lesson = {
  id: 'section-1',
  sectionId: 'section-1',
  sectionNumber: 1,
  title: 'Real Numbers and the Real Line',
  subtitle: 'Decimals, Completeness, the 6 Inequality Laws, Intervals (Table 1), and Absolute Value Distance.',
  bookPages: 'Pages 1–8',
  exerciseInfo: 'Exercises 1 (About 50 Questions)',
  estimatedMinutes: 35,
  learningGoals: [
    'Distinguish terminating, repeating, and non-repeating decimals across ℝ subsets (ℕ, ℤ, ℚ, and irrationals).',
    'Understand the algebraic, order, and completeness properties of real numbers (no gaps or holes at √2).',
    'Master all 6 inequality rules, especially negative multiplication/division and reciprocal reversal.',
    'Classify all 9 interval types from Table 1, distinguishing interior points from boundary endpoints.',
    'Solve union (∪) and intersection (∩) operations on intervals (e.g. [1, 3] ∩ [2, 4] = [2, 3]).',
    'Apply the absolute value definition, heed the warning √(a²) = |a|, and deploy the Triangle Inequality.',
    'Solve both bounded center-radius intervals (|x - a| < D) and split exterior rays (|x - a| > D).',
  ],
  intuitiveAnalogy: {
    title: 'The Number Line as a Two-Way Street',
    text: 'Think of the real line as an unbroken continuous street with Zero as the central landmark. Positive addresses lie to the right; negative addresses lie to the left. Multiplying by -1 mirrors the entire street around Zero: the house farthest to the right is now farthest to the left! That is the physical reason why every inequality sign flips when multiplying or dividing by a negative number.',
  },
  explanationBlocks: [
    {
      heading: '1. Real Numbers, Decimals & Subsets of ℝ',
      body: 'Real numbers can be fully represented as decimals:\n\n• **Terminating decimals:** Fractions with denominators of factors of 2 and 5 end in repeating zeros, such as $-3/4 = -0.75000\\dots$\n• **Repeating decimals:** Fractions like $1/3 = 0.33333\\dots = 0.\\overline{3}$ and $23/11 = 2.090909\\dots = 2.\\overline{09}$. Every repeating decimal is a rational number.\n• **Non-repeating, non-terminating decimals:** Numbers like $\\sqrt{2} = 1.41421356\\dots$ and $\\pi = 3.14159265\\dots$. These cannot be written as a ratio of integers and are called **irrational numbers**.\n\nSubsets of the Real Numbers ($\\mathbb{R}$):\n1. **Natural numbers ($\\mathbb{N}$):** $\\{1, 2, 3, 4, \\dots\\}$\n2. **Integers ($\\mathbb{Z}$):** $\\{\\dots, -3, -2, -1, 0, 1, 2, 3, \\dots\\}$\n3. **Rational numbers ($\\mathbb{Q}$):** Numbers $m/n$ where $m, n \\in \\mathbb{Z}$ and $n \\neq 0$.\n4. **Irrational numbers:** Real numbers that are not rational (e.g. $\\pi, \\sqrt{2}, \\sqrt{5}, \\log_{10} 3$).',
      formulaLatex: '\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}',
    },
    {
      heading: '2. The Three Fundamental Properties of ℝ',
      body: 'The real number system is mathematically defined by three pillars:\n\n1. **Algebraic Properties:** Real numbers can be added, subtracted, multiplied, and divided (division by zero is strictly excluded).\n2. **Order Properties:** Any two numbers $a, b$ satisfy the trichotomy law: either $a < b$, $a = b$, or $a > b$. Inequalities obey transitive laws ($a < b$ and $b < c \\implies a < c$).\n3. **Completeness Property:** The real line has no gaps or holes. While the rational line has a hole where $\\sqrt{2}$ should be, the completeness axiom guarantees every point on the real line corresponds to an actual real number.',
      formulaLatex: '\\forall x \\in \\mathbb{R}, \\; \\exists \\text{ point on line} \\quad (\\text{Completeness: Zero gaps or holes})',
    },
    {
      heading: '3. The 6 Rules for Inequalities',
      body: 'Let $a, b,$ and $c$ be real numbers:\n\n1. **Addition Rule:** If $a < b$, then $a + c < b + c$.\n2. **Subtraction Rule:** If $a < b$, then $a - c < b - c$.\n3. **Positive Multiplication Rule:** If $a < b$ and $c > 0$, then $ac < bc$.\n4. **Negative Multiplication Rule (Sign Reversal):** If $a < b$ and $c < 0$, then $bc < ac$ (or $ac > bc$).\n   *Special Case:* If $a < b$, then $-b < -a$.\n5. **Reciprocal Sign Rule:** If $a > 0$, then $1/a > 0$.\n6. **Reciprocal Order Rule:** If $a$ and $b$ are **both positive** or **both negative**, then $a < b \\implies \\frac{1}{b} < \\frac{1}{a}$.',
      formulaLatex: 'a < b \\;\\text{and}\\; c < 0 \\implies ac > bc \\quad\\mid\\quad 0 < a < b \\implies \\frac{1}{b} < \\frac{1}{a}',
    },
    {
      heading: '4. Intervals, Boundary Points & Table 1',
      body: 'Subsets of the real line are described using intervals:\n\n• **Finite Intervals:**\n  - Open $(a, b) = \\{x \\mid a < x < b\\}$ (endpoints excluded; hollow dots $\\circ$)\n  - Closed $[a, b] = \\{x \\mid a \\le x \\le b\\}$ (endpoints included; solid dots $\\bullet$)\n  - Half-open $[a, b) = \\{x \\mid a \\le x < b\\}$ and $(a, b] = \\{x \\mid a < x \\le b\\}$\n• **Infinite Intervals:** $(a, \\infty)$, $[a, \\infty)$, $(-\\infty, b)$, $(-\\infty, b]$, and $(-\\infty, \\infty) = \\mathbb{R}$.\n• **Set Operations:**\n  - **Union ($\\cup$):** in either set ($A \\cup B$).\n  - **Intersection ($\\cap$):** in both sets simultaneously (e.g., $[1, 3] \\cap [2, 4] = [2, 3]$).',
      formulaLatex: '[1, 3] \\cap [2, 4] = [2, 3] \\quad\\mid\\quad [1, 2] \\cup [2, 4] = [1, 4]',
    },
    {
      heading: '5. Absolute Value, Distance & The Square Root Identity',
      body: 'The absolute value $|x|$ represents the non-negative distance between $x$ and $0$ on the number line:\n$$|x| = \\begin{cases} x & \\text{if } x \\ge 0 \\\\ -x & \\text{if } x < 0 \\end{cases}$$\n\n**CRITICAL WARNING ON SQUARE ROOTS:**\n$$\\sqrt{a^2} = |a|$$\n**Do not write $\\sqrt{a^2} = a$ unless you already know $a \\ge 0$!** For example, $\\sqrt{(-5)^2} = \\sqrt{25} = 5 = |-5|$, not $-5$!\n\n**The 4 Absolute Value Properties:**\n1. $|-a| = |a|$\n2. $|ab| = |a||b|$\n3. $|a/b| = |a|/|b|$ ($b \\neq 0$)\n4. **Triangle Inequality:** $|a + b| \\le |a| + |b|$\n\n**Inequalities Involving Absolute Values:**\n• $|x - a| < D \\iff a - D < x < a + D$ (one connected band of radius $D$ centered at $a$)\n• $|x - a| > D \\iff x < a - D \\;\\text{or}\\; x > a + D$ (two disconnected rays exterior to distance $D$)',
      formulaLatex: '\\sqrt{a^2} = |a| \\quad\\mid\\quad |a + b| \\le |a| + |b| \\quad\\mid\\quad |x - a| < D \\iff a - D < x < a + D',
    },
  ],
  keyFormulas: [
    {
      title: 'Piecewise Absolute Value',
      latex: '|x| = \\begin{cases} x & x \\ge 0 \\\\ -x & x < 0 \\end{cases}',
      description: 'The non-negative magnitude or distance from zero.',
      ruleOrName: 'Definition',
    },
    {
      title: 'Principal Square Root Identity',
      latex: '\\sqrt{a^2} = |a|',
      description: 'The square root of a square is ALWAYS the absolute value. Never drop the absolute bars without knowing a >= 0.',
      ruleOrName: 'Square Root Identity',
    },
    {
      title: 'The Triangle Inequality',
      latex: '|a + b| \\le |a| + |b|',
      description: 'The absolute value of a sum never exceeds the sum of the absolute values.',
      ruleOrName: 'Property 4',
    },
    {
      title: 'Less-Than Neighborhood',
      latex: '|x - a| < D \\iff a - D < x < a + D',
      description: 'Interval (a - D, a + D) centered at a with radius D.',
      ruleOrName: 'Distance Metric',
    },
    {
      title: 'Greater-Than Exterior Rays',
      latex: '|x - a| > D \\iff x < a - D \\;\\text{or}\\; x > a + D',
      description: 'Union of two outside rays: (-inf, a - D) U (a + D, inf).',
      ruleOrName: 'Complementary Neighborhood',
    },
  ],
  figures: [
    {
      id: 'table-1',
      figureNumber: 'Table 1',
      title: 'Table 1: Types of Intervals (Page 3)',
      bookPage: 'Page 3',
      caption: 'Complete taxonomy of the 9 interval types with algebraic set notation and number line graphs.',
      description: 'Covers Open (a,b), Closed [a,b], Half-Open [a,b) & (a,b], and the 5 infinite intervals with open hollow circles vs solid filled dots.',
    },
    {
      id: 'fig-1',
      figureNumber: 'Figure 1',
      title: 'Figure 1: Solution Sets on the Real Line (Page 4)',
      bookPage: 'Page 4',
      caption: 'Graphs of solution sets for Example 1: (a) (-∞, 4), (b) (-3/7, ∞), and (c) (1, 11/5].',
      description: 'Visual demonstration of open hollow endpoints versus closed solid endpoints on single-ray and bounded intervals.',
    },
    {
      id: 'fig-2',
      figureNumber: 'Figure 2',
      title: 'Figure 2: Absolute Value as Distance on the Line (Page 5)',
      bookPage: 'Page 5',
      caption: 'Distances on the number line: |-5| = 5, |3| = 3, |-4 - 1| = 5, and |4 - 1| = 3.',
      description: 'Shows that |x| is distance to 0, and |x - y| is the geometric distance between points x and y.',
    },
    {
      id: 'fig-3',
      figureNumber: 'Figure 3',
      title: 'Figure 3: Graph of |x - 5| < 9 (Page 6)',
      bookPage: 'Page 6',
      caption: 'Solution interval (-4, 14) centered at 5 with radius 9 in both directions.',
      description: 'Illustrates walking 9 units left and 9 units right from central address 5.',
    },
    {
      id: 'fig-4',
      figureNumber: 'Figure 4',
      title: 'Figure 4: Side-by-Side Comparison of |2x - 3| ≤ 1 vs |2x - 3| ≥ 1 (Pages 6–7)',
      bookPage: 'Pages 6–7',
      caption: '(a) Closed interval [1, 2] vs (b) Two disjoint infinite rays (-∞, 1] ∪ [2, ∞).',
      description: 'Direct geometric visualization showing why <= forms one connected segment while >= forms two outward rays.',
    },
  ],
  workedExamples: [
    {
      id: 'sec1-ex1a',
      prompt: 'Example 1(a): Solve 2x - 1 < x + 3 and state the solution interval.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Subtract x from both sides (Rule 2 for inequalities).',
          expressionLatex: '(2x - 1) - x < (x + 3) - x \\implies x - 1 < 3',
        },
        {
          stepNumber: 2,
          explanation: 'Add 1 to both sides (Rule 1 for inequalities).',
          expressionLatex: '(x - 1) + 1 < 3 + 1 \\implies x < 4',
        },
        {
          stepNumber: 3,
          explanation: 'Express in interval notation. The set of all real numbers strictly less than 4 is an open ray.',
          expressionLatex: '(-\\infty, 4)',
        },
      ],
      finalAnswer: '(-inf, 4)',
      finalAnswerLatex: '(-\\infty, 4)',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 1, Example 1(a), Page 4',
    },
    {
      id: 'sec1-ex1b',
      prompt: 'Example 1(b): Solve -x/3 < 2x + 1 and graph the solution.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Multiply both sides by 3 (positive constant, Rule 3 preserves the inequality).',
          expressionLatex: '-\\frac{x}{3} \\cdot 3 < (2x + 1) \\cdot 3 \\implies -x < 6x + 3',
        },
        {
          stepNumber: 2,
          explanation: 'Subtract 6x from both sides (Rule 2).',
          expressionLatex: '-x - 6x < 3 \\implies -7x < 3',
        },
        {
          stepNumber: 3,
          explanation: 'Divide both sides by -7. Because -7 < 0, RULE 4 REQUIRES REVERSING THE INEQUALITY SIGN!',
          expressionLatex: '\\frac{-7x}{-7} > \\frac{3}{-7} \\implies x > -\\frac{3}{7}',
        },
        {
          stepNumber: 4,
          explanation: 'Write in interval notation: all numbers strictly greater than -3/7.',
          expressionLatex: '\\left(-\\frac{3}{7}, \\infty\\right)',
        },
      ],
      finalAnswer: '(-3/7, inf)',
      finalAnswerLatex: '\\left(-\\frac{3}{7}, \\infty\\right)',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 1, Example 1(b), Page 4',
    },
    {
      id: 'sec1-ex1c',
      prompt: 'Example 1(c): Solve the rational inequality 6 / (x - 1) >= 5.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'First analyze the domain restriction: we cannot divide by zero, so x ≠ 1. Moreover, the left side is positive (>= 5), so the denominator must be strictly positive: x - 1 > 0, which requires x > 1.',
          expressionLatex: 'x - 1 > 0 \\implies x > 1',
        },
        {
          stepNumber: 2,
          explanation: 'Since x - 1 is strictly positive, we can safely multiply both sides by (x - 1) without reversing the inequality (Rule 3).',
          expressionLatex: '6 \\ge 5(x - 1) \\implies 6 \\ge 5x - 5',
        },
        {
          stepNumber: 3,
          explanation: 'Add 5 to both sides and divide by 5.',
          expressionLatex: '11 \\ge 5x \\implies x \\le \\frac{11}{5}',
        },
        {
          stepNumber: 4,
          explanation: 'Combine the requirement x > 1 with x <= 11/5. The solution is half-open interval (1, 11/5].',
          expressionLatex: '1 < x \\le \\frac{11}{5} \\implies \\left(1, \\frac{11}{5}\\right]',
        },
      ],
      finalAnswer: '(1, 11/5]',
      finalAnswerLatex: '\\left(1, \\frac{11}{5}\\right]',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 1, Example 1(c), Page 4',
    },
    {
      id: 'sec1-ex2-3',
      prompt: 'Examples 2 & 3: Evaluate absolute values |-5|, |3|, |0|, and verify the Triangle Inequality for a = -3, b = 5.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Apply definition of absolute value: |-5| = -(-5) = 5, |3| = 3, |0| = 0.',
          expressionLatex: '|-5| = 5, \\quad |3| = 3, \\quad |0| = 0',
        },
        {
          stepNumber: 2,
          explanation: 'Compute |a + b| with a = -3, b = 5: |-3 + 5| = |2| = 2.',
          expressionLatex: '|a + b| = |-3 + 5| = |2| = 2',
        },
        {
          stepNumber: 3,
          explanation: 'Compute |a| + |b|: |-3| + |5| = 3 + 5 = 8.',
          expressionLatex: '|a| + |b| = |-3| + |5| = 3 + 5 = 8',
        },
        {
          stepNumber: 4,
          explanation: 'Observe that 2 < 8, satisfying the Triangle Inequality |a + b| <= |a| + |b| with strict inequality because the numbers have opposite signs.',
          expressionLatex: '2 \\le 8 \\quad (|a + b| \\le |a| + |b|)',
        },
      ],
      finalAnswer: '|-3+5|=2 <= |-3|+|5|=8',
      finalAnswerLatex: '|-3 + 5| = 2 < 8 = |-3| + |5|',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 1, Examples 2 & 3, Pages 4–5',
    },
    {
      id: 'sec1-ex4',
      prompt: 'Example 4: Solve the absolute value equation |2x - 3| = 7.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'By definition of absolute value, the expression inside must equal +7 or -7.',
          expressionLatex: '2x - 3 = 7 \\quad\\text{or}\\quad 2x - 3 = -7',
        },
        {
          stepNumber: 2,
          explanation: 'Solve positive branch: 2x = 10 => x = 5.',
          expressionLatex: '2x = 10 \\implies x = 5',
        },
        {
          stepNumber: 3,
          explanation: 'Solve negative branch: 2x = -4 => x = -2.',
          expressionLatex: '2x = -4 \\implies x = -2',
        },
      ],
      finalAnswer: 'x = -2, 5',
      finalAnswerLatex: 'x = -2, \\; 5',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 1, Example 4, Page 5',
    },
    {
      id: 'sec1-ex5',
      prompt: 'Example 5: Solve |x - 5| < 9 and state the solution interval.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Apply the distance rule: |u| < D is equivalent to the double inequality -D < u < D.',
          expressionLatex: '-9 < x - 5 < 9',
        },
        {
          stepNumber: 2,
          explanation: 'Add 5 across all three parts of the inequality chain (Rule 1).',
          expressionLatex: '-9 + 5 < x < 9 + 5 \\implies -4 < x < 14',
        },
        {
          stepNumber: 3,
          explanation: 'Geometrically, this represents all points within 9 units of address 5 on the line.',
          expressionLatex: '(-4, 14)',
        },
      ],
      finalAnswer: '(-4, 14)',
      finalAnswerLatex: '(-4, 14)',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 1, Example 5, Page 6',
    },
    {
      id: 'sec1-ex6',
      prompt: 'Example 6: Solve |5 - 2/x| < 1 and state the solution interval.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'Expand the absolute value into a double inequality.',
          expressionLatex: '-1 < 5 - \\frac{2}{x} < 1',
        },
        {
          stepNumber: 2,
          explanation: 'Subtract 5 across all three parts.',
          expressionLatex: '-1 - 5 < -\\frac{2}{x} < 1 - 5 \\implies -6 < -\\frac{2}{x} < -4',
        },
        {
          stepNumber: 3,
          explanation: 'Multiply all three parts by -1/2. Because -1/2 < 0, Rule 4 REVERSES the inequality signs!',
          expressionLatex: '(-6)\\left(-\\frac{1}{2}\\right) > \\left(-\\frac{2}{x}\\right)\\left(-\\frac{1}{2}\\right) > (-4)\\left(-\\frac{1}{2}\\right) \\implies 3 > \\frac{1}{x} > 2',
        },
        {
          stepNumber: 4,
          explanation: 'Rewrite in standard increasing order: 2 < 1/x < 3. Take reciprocals of all parts (Rule 6: since all are positive, taking reciprocals reverses order again!).',
          expressionLatex: '\\frac{1}{3} < x < \\frac{1}{2}',
        },
        {
          stepNumber: 5,
          explanation: 'The solution is the open interval (1/3, 1/2).',
          expressionLatex: '\\left(\\frac{1}{3}, \\frac{1}{2}\\right)',
        },
      ],
      finalAnswer: '(1/3, 1/2)',
      finalAnswerLatex: '\\left(\\frac{1}{3}, \\frac{1}{2}\\right)',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 1, Example 6, Page 6',
    },
    {
      id: 'sec1-ex7',
      prompt: 'Example 7: Solve both (a) |2x - 3| <= 1 and (b) |2x - 3| >= 1.',
      steps: [
        {
          stepNumber: 1,
          explanation: 'For (a) <=: this is a bounded interval -1 <= 2x - 3 <= 1.',
          expressionLatex: '-1 \\le 2x - 3 \\le 1',
        },
        {
          stepNumber: 2,
          explanation: 'Add 3: 2 <= 2x <= 4. Divide by 2: 1 <= x <= 2, giving closed segment [1, 2].',
          expressionLatex: '2 \\le 2x \\le 4 \\implies 1 \\le x \\le 2 \\implies [1, 2]',
        },
        {
          stepNumber: 3,
          explanation: 'For (b) >=: this represents points exterior to distance 1, splitting into two separate rays.',
          expressionLatex: '2x - 3 \\le -1 \\quad\\text{or}\\quad 2x - 3 \\ge 1',
        },
        {
          stepNumber: 4,
          explanation: 'Solve both rays: 2x <= 2 => x <= 1, and 2x >= 4 => x >= 2.',
          expressionLatex: 'x \\le 1 \\quad\\text{or}\\quad x \\ge 2 \\implies (-\\infty, 1] \\cup [2, \\infty)',
        },
      ],
      finalAnswer: '(a) [1, 2], (b) (-inf, 1] U [2, inf)',
      finalAnswerLatex: '\\text{(a) } [1, 2], \\quad \\text{(b) } (-\\infty, 1] \\cup [2, \\infty)',
      sourceLabel: 'textbook',
      sourceLocation: 'Section 1, Example 7, Pages 6–7',
    },
  ],
  toolIds: ['section1-tools'],
  commonMistakes: [
    {
      mistake: 'Dropping absolute values on square roots: writing √(a²) = a.',
      correction: 'Always write √(a²) = |a|. For example, √((-5)²) = √25 = 5 = |-5|.',
      why: 'By definition, the principal radical symbol √ produces the non-negative root.',
    },
    {
      mistake: 'Failing to reverse inequality signs when multiplying/dividing by a negative number.',
      correction: 'If -3x < 12, dividing by -3 produces x > -4, NOT x < -4.',
      why: 'Negation reflects values across zero on the number line, which inverts their relative order.',
    },
    {
      mistake: 'Treating |x - a| > D as a single chain like -D > x - a > D.',
      correction: 'Write as two disjoint linear inequalities joined by OR: x - a < -D OR x - a > D.',
      why: 'No single real number can be simultaneously less than -D and greater than +D.',
    },
    {
      mistake: 'Multiplying an inequality by an algebraic expression with an unknown sign (e.g. multiplying by x - 1 without checking sign).',
      correction: 'Analyze the domain first to ensure whether the denominator is strictly positive or negative.',
      why: 'If the expression could be negative, multiplying without flipping produces erroneous extraneous intervals.',
    },
  ],
  quickCheckIds: ['q1-1', 'q1-2', 'q1-3'],
  chapterSummary: 'Real numbers form an unbroken continuum with algebraic, order, and completeness properties. Inequalities follow 6 strict laws where negative multiplication and same-sign reciprocals invert order. Intervals (Table 1) format solution sets, while absolute value encodes Euclidean distance, yielding bounded intervals for < and disjoint outer rays for >.',
};
