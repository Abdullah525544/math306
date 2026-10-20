/**
 * Deterministic Math Engine for Math Lab — Preliminaries
 * Strictly browser-side, deterministic numerical & symbolic helpers.
 */

export interface CircleCompletionResult {
  isValid: boolean;
  h: number;
  k: number;
  radiusSquared: number;
  radius: number;
  steps: Array<{ stepNumber: number; text: string; latex: string }>;
  error?: string;
}

export interface ParabolaCharacteristics {
  a: number;
  b: number;
  c: number;
  vertexX: number;
  vertexY: number;
  axisOfSymmetry: number;
  yIntercept: number;
  discriminant: number;
  xIntercepts: number[];
  opens: 'up' | 'down';
  focusY: number;
}

/**
 * Normalizes user input strings for math comparison
 */
export function normalizeMathString(input: string): string {
  if (!input) return '';
  return input
    .trim()
    // Replace various unicode minus / dashes with standard ASCII minus
    .replace(/[\u2212\u2013\u2014\u2010\u2011\u2012]/g, '-')
    // Replace unicode infinity or TeX infinity with 'inf'
    .replace(/(\\infty|∞|infinity)/gi, 'inf')
    // Replace \cup or U or union with 'U'
    .replace(/(\\cup|\bunion\b)/gi, 'U')
    // Remove all whitespace around commas, brackets, operators
    .replace(/\s+/g, ' ')
    .replace(/\s*([,()\[\]\+\-\*\/=<>])\s*/g, '$1')
    .toLowerCase();
}

/**
 * Parses numeric strings including integers, decimals, and simple fractions like "-3/4"
 */
export function parseNumberOrFraction(valStr: string): number | null {
  const clean = normalizeMathString(valStr);
  if (!clean) return null;

  // Check for simple fraction like "a/b" or "-a/b"
  const fractionMatch = clean.match(/^([+-]?\d+(?:\.\d+)?)\/([+-]?\d+(?:\.\d+)?)$/);
  if (fractionMatch) {
    const num = parseFloat(fractionMatch[1]);
    const den = parseFloat(fractionMatch[2]);
    if (den === 0 || isNaN(num) || isNaN(den)) return null;
    return num / den;
  }

  // Check for special constants
  if (clean === 'pi' || clean === '\\pi' || clean === 'π') return Math.PI;
  if (clean === '-pi' || clean === '-\\pi' || clean === '-π') return -Math.PI;

  const num = parseFloat(clean);
  return isNaN(num) ? null : num;
}

/**
 * Deterministically checks if student numeric answer equals expected within tolerance
 */
export function checkNumericAnswer(
  userAnswer: string,
  acceptedAnswers: string[],
  tolerance: number = 0.01
): boolean {
  const normUser = normalizeMathString(userAnswer);
  if (!normUser) return false;

  // Direct string equality check first
  for (const acc of acceptedAnswers) {
    if (normUser === normalizeMathString(acc)) {
      return true;
    }
  }

  const userNum = parseNumberOrFraction(userAnswer);
  if (userNum === null) return false;

  // Numeric proximity check
  for (const acc of acceptedAnswers) {
    const accNum = parseNumberOrFraction(acc);
    if (accNum !== null) {
      if (Math.abs(userNum - accNum) <= tolerance) {
        return true;
      }
    }
  }

  return false;
}

export interface IntervalSegment {
  leftInclusive: boolean;
  leftVal: number; // -Infinity if -inf
  rightVal: number; // Infinity if inf
  rightInclusive: boolean;
}

/**
 * Parses a single interval segment like "[-3, 5)" or "(-inf, 2]"
 */
export function parseIntervalSegment(segmentStr: string): IntervalSegment | null {
  const clean = normalizeMathString(segmentStr);
  const match = clean.match(/^([(\[])([+-]?inf|[+-]?\d+(?:\.\d+)?|[+-]?\d+\/\d+),([+-]?inf|[+-]?\d+(?:\.\d+)?|[+-]?\d+\/\d+)([)\]])$/);
  if (!match) return null;

  const leftBracket = match[1];
  const leftRaw = match[2];
  const rightRaw = match[3];
  const rightBracket = match[4];

  let leftVal: number;
  if (leftRaw === '-inf' || leftRaw === 'inf') {
    leftVal = -Infinity;
  } else {
    const parsed = parseNumberOrFraction(leftRaw);
    if (parsed === null) return null;
    leftVal = parsed;
  }

  let rightVal: number;
  if (rightRaw === 'inf' || rightRaw === '+inf') {
    rightVal = Infinity;
  } else if (rightRaw === '-inf') {
    return null; // Invalid interval (-inf, -inf)
  } else {
    const parsed = parseNumberOrFraction(rightRaw);
    if (parsed === null) return null;
    rightVal = parsed;
  }

  if (leftVal > rightVal) return null;

  return {
    leftInclusive: leftBracket === '[',
    leftVal,
    rightVal,
    rightInclusive: rightBracket === ']',
  };
}

/**
 * Validates and compares interval notation such as "(-inf, 3] U [5, inf)"
 */
export function checkIntervalAnswer(userAnswer: string, expectedAnswer: string): boolean {
  const normUser = normalizeMathString(userAnswer);
  const normExp = normalizeMathString(expectedAnswer);

  if (normUser === normExp) return true;

  const userPieces = normUser.split('u').map(s => s.trim()).filter(Boolean);
  const expPieces = normExp.split('u').map(s => s.trim()).filter(Boolean);

  if (userPieces.length !== expPieces.length) return false;

  const parsedUser = userPieces.map(parseIntervalSegment);
  const parsedExp = expPieces.map(parseIntervalSegment);

  if (parsedUser.some(p => p === null) || parsedExp.some(p => p === null)) {
    return false;
  }

  // Compare every piece (order-agnostic)
  const matched = new Set<number>();
  for (const u of parsedUser) {
    if (!u) return false;
    let found = false;
    for (let i = 0; i < parsedExp.length; i++) {
      if (matched.has(i)) continue;
      const e = parsedExp[i];
      if (!e) continue;

      const leftEq = u.leftInclusive === e.leftInclusive &&
        (u.leftVal === e.leftVal || (isNaN(u.leftVal) && isNaN(e.leftVal)) || Math.abs(u.leftVal - e.leftVal) < 1e-4);
      const rightEq = u.rightInclusive === e.rightInclusive &&
        (u.rightVal === e.rightVal || (isNaN(u.rightVal) && isNaN(e.rightVal)) || Math.abs(u.rightVal - e.rightVal) < 1e-4);

      if (leftEq && rightEq) {
        matched.add(i);
        found = true;
        break;
      }
    }
    if (!found) return false;
  }

  return matched.size === expPieces.length;
}

/**
 * Completes the square for circle equation: x^2 + y^2 + Dx + Ey + F = 0
 * Standard textbook example: x^2 + y^2 + 4x - 6y - 3 = 0 -> (x+2)^2 + (y-3)^2 = 16
 */
export function completeSquareForCircle(D: number, E: number, F: number): CircleCompletionResult {
  const h = -D / 2;
  const k = -E / 2;
  const hTermToAdd = (D / 2) ** 2;
  const kTermToAdd = (E / 2) ** 2;
  const radiusSquared = -F + hTermToAdd + kTermToAdd;

  if (radiusSquared <= 0) {
    return {
      isValid: false,
      h,
      k,
      radiusSquared,
      radius: 0,
      steps: [],
      error: radiusSquared === 0 
        ? 'Equation represents a single point (radius 0), not a circle.' 
        : 'Equation has no real solution (r² < 0), represents the empty set.',
    };
  }

  const radius = Math.sqrt(radiusSquared);

  const steps = [
    {
      stepNumber: 1,
      text: 'Move the constant term to the right-hand side and group x and y terms.',
      latex: `(x^2 ${D >= 0 ? '+ ' + D : '- ' + Math.abs(D)}x) + (y^2 ${E >= 0 ? '+ ' + E : '- ' + Math.abs(E)}y) = ${-F}`,
    },
    {
      stepNumber: 2,
      text: `Take half of the x-coefficient (${D}/2 = ${D/2}), square it (${(D/2)**2}), and add to both sides. Do the same for y (${E}/2 = ${E/2}, squared = ${(E/2)**2}).`,
      latex: `(x^2 ${D >= 0 ? '+ ' + D : '- ' + Math.abs(D)}x + ${hTermToAdd}) + (y^2 ${E >= 0 ? '+ ' + E : '- ' + Math.abs(E)}y + ${kTermToAdd}) = ${-F} + ${hTermToAdd} + ${kTermToAdd}`,
    },
    {
      stepNumber: 3,
      text: 'Factor each quadratic trinomial into a binomial squared.',
      latex: `(x ${-h >= 0 ? '+ ' + (-h) : '- ' + h})^2 + (y ${-k >= 0 ? '+ ' + (-k) : '- ' + k})^2 = ${radiusSquared}`,
    },
    {
      stepNumber: 4,
      text: `Read the centre (h, k) and radius a = √(${radiusSquared}) from standard form (x - h)² + (y - k)² = a².`,
      latex: `\\text{Centre } (h, k) = (${h}, ${k}), \\quad \\text{Radius } a = ${radius % 1 === 0 ? radius : radius.toFixed(2)}`,
    },
  ];

  return {
    isValid: true,
    h,
    k,
    radiusSquared,
    radius,
    steps,
  };
}

/**
 * Computes parabola key features for y = ax^2 + bx + c
 */
export function calculateParabola(a: number, b: number, c: number): ParabolaCharacteristics {
  if (a === 0) {
    // Degenerate case: linear
    return {
      a: 0,
      b,
      c,
      vertexX: 0,
      vertexY: c,
      axisOfSymmetry: 0,
      yIntercept: c,
      discriminant: 0,
      xIntercepts: b !== 0 ? [-c / b] : [],
      opens: 'up',
      focusY: c,
    };
  }

  const vertexX = -b / (2 * a);
  const vertexY = c - (b * b) / (4 * a);
  const discriminant = b * b - 4 * a * c;
  const xIntercepts: number[] = [];

  if (discriminant > 0) {
    const sqrtD = Math.sqrt(discriminant);
    xIntercepts.push((-b - sqrtD) / (2 * a));
    xIntercepts.push((-b + sqrtD) / (2 * a));
    xIntercepts.sort((p, q) => p - q);
  } else if (Math.abs(discriminant) < 1e-9) {
    xIntercepts.push(-b / (2 * a));
  }

  const focusY = vertexY + 1 / (4 * a);

  return {
    a,
    b,
    c,
    vertexX,
    vertexY,
    axisOfSymmetry: vertexX,
    yIntercept: c,
    discriminant,
    xIntercepts,
    opens: a > 0 ? 'up' : 'down',
    focusY,
  };
}

/**
 * Format decimal to clean fraction string if standard (e.g. 0.5 -> "1/2")
 */
export function formatAsFractionOrDecimal(val: number, maxDenominator: number = 12): string {
  if (Math.abs(val - Math.round(val)) < 1e-6) {
    return Math.round(val).toString();
  }

  for (let d = 2; d <= maxDenominator; d++) {
    const num = val * d;
    if (Math.abs(num - Math.round(num)) < 1e-5) {
      const n = Math.round(num);
      return `${n}/${d}`;
    }
  }

  return val.toFixed(2).replace(/\.?0+$/, '');
}
