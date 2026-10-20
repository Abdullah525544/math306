# Math Lab — Preliminaries (Math-306)

> **"Understand the idea. Explore the graph. Practise with confidence."**

An interactive pre-calculus learning platform strictly based on the textbook chapter **"Preliminaries (Math-306)"** (Sections 1 to 5, Pages 1–50, and Answer Key A-35 to A-40).

---

## 🎯 Strict Curricular Scope (Pre-Calculus Foundations)

This project strictly covers the foundational pre-calculus domain defined in Sections 1–5 of the Math-306 curriculum. **No limits, derivatives, or integrals are included.**

| Section | Title | Book Pages | Exercise Coverage | Interactive Tool |
|---|---|---|---|---|
| **Section 1** | Real Numbers and the Real Line | Pages 1–8 | Exercises 1 (~50 Qs) | `NumberLineTool` (Intervals, Distance $\|x - a\| < D$, Sign-Flip) |
| **Section 2** | Coordinates, Lines, and Increments | Pages 8–17 | Exercises 2 (~56 Qs) | `CoordinateLineTool` (2-Point $\Delta x, \Delta y$, Slope, $F = \frac{9}{5}C + 32$) |
| **Section 3** | Functions | Pages 17–26 | Exercises 3 (~62 Qs) | `FunctionGrapherTool` (Figure 26 Gallery, Vertical Line Test) |
| **Section 4** | Shifting Graphs | Pages 27–35 | Exercises 4 (~86 Qs) | `GraphShiftTool` (Translations $f(x-h)+k$, Circle Shifter, Completing the Square) |
| **Section 5** | Trigonometric Functions | Pages 35–47 | Exercises 5 (~70 Qs) | `UnitCircleTrigTool` (Unit Circle $(\cos\theta, \sin\theta)$, CAST, Fairbanks Model) |
| **Review** | End-of-Chapter Synthesis | Pages 47–50 | Answers A-35 to A-40 | `ReviewFlashcardsPage` (22 Conceptual Questions to Guide Your Review) |

---

## 🛠 Tech Stack & Architecture

- **Core Framework**: React 19 + TypeScript + Vite 6
- **Routing**: React Router 7 (`/`, `/overview`, `/section/:sectionId`, `/lab`, `/practice`, `/review`)
- **Styling**: Tailwind CSS + Custom CSS Graph-Paper Grid & Glassmorphism Surfaces
- **Mathematical Rendering**: KaTeX 0.16 (Fast, clean inline `$...$` and display `$$...$$` equations)
- **Icons**: Lucide React
- **Deterministic Math Engine**: `src/lib/math.ts` (string normalization, fraction/decimal tolerance parser, interval set validator, circle completing-the-square calculator, parabola analyzer)
- **Progress Storage**: `src/lib/progress.ts` (100% browser localStorage with reactive updates and confirmed reset)

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

---

## 🎨 Design System: "Premium Digital Math Studio"

- **Theme**: Deep charcoal & navy background (`#090D16` and `#0F172A`) with subtle mathematical graph-paper grid overlay (`.bg-graph-paper`).
- **Primary Accent**: Mint / Cyan (`#2DD4BF`) for active states, key interactive handles, and verified answers.
- **Secondary Highlight**: Indigo / Violet (`#818CF8` and `#A78BFA`) for structural cards, formulas, and geometry guides.
- **Responsiveness**: Zero horizontal overflow, mobile bottom-navigation bar, sticky desktop header with live progress badge, and full `prefers-reduced-motion` compliance.

---

## 📁 Source Tree

```
d:/math306/
├── index.html                  # KaTeX CSS link, Inter font, viewport settings
├── package.json                # Exact pinned dependencies
├── postcss.config.js
├── tailwind.config.js          # Studio palette & graph paper patterns
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── types.ts                # TypeScript domain models (SectionId, Lesson, Question, etc.)
│   ├── main.tsx                # App entry
│   ├── App.tsx                 # Route declarations & ScrollToTop
│   ├── index.css               # Graph-paper patterns, KaTeX overrides, responsive reset
│   ├── lib/
│   │   ├── math.ts             # Deterministic math engine & interval checker
│   │   └── progress.ts         # LocalStorage manager with confirmed reset
│   ├── components/
│   │   ├── Layout.tsx          # AppShell (Header, Progress Badge, Mobile Bar, Footer)
│   │   └── MathText.tsx        # Reusable KaTeX renderer for LaTeX and text
│   ├── content/
│   │   ├── sections.ts         # Pedagogical content for Sections 1 to 5
│   │   ├── questions.ts        # Typed question bank across difficulty levels
│   │   └── flashcards.ts       # 22 Questions to Guide Your Review
│   ├── tools/
│   │   ├── NumberLineTool.tsx       # Section 1 interactive tool
│   │   ├── CoordinateLineTool.tsx   # Section 2 interactive tool
│   │   ├── FunctionGrapherTool.tsx  # Section 3 interactive tool
│   │   ├── GraphShiftTool.tsx       # Section 4 interactive tool
│   │   └── UnitCircleTrigTool.tsx   # Section 5 interactive tool
│   └── pages/
│       ├── Dashboard.tsx            # Route: "/"
│       ├── CourseOverview.tsx       # Route: "/overview"
│       ├── SectionLessonPage.tsx    # Route: "/section/:sectionId"
│       ├── InteractiveLabPage.tsx   # Route: "/lab"
│       ├── PracticePage.tsx         # Route: "/practice"
│       └── ReviewFlashcardsPage.tsx # Route: "/review"
```

---

## ✅ Quality & Verification Status

- [x] Strict chapter alignment (Math-306, Pages 1–50, Answers A-35 to A-40).
- [x] No calculus concepts (zero limits, derivatives, or integrals).
- [x] Zero TypeScript compilation errors (`tsc --noEmit` exits with code 0).
- [x] Zero build errors (`vite build` production bundle generated cleanly).
- [x] Deterministic mathematical evaluation in the client without external APIs.
