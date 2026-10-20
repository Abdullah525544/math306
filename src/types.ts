export type SectionId = 
  | 'section-1' 
  | 'section-2' 
  | 'section-3' 
  | 'section-4' 
  | 'section-5';

export type DifficultyLevel = 'Beginner' | 'Intermediate' | 'Challenge';

export type AnswerType = 
  | 'numeric' 
  | 'interval' 
  | 'multiple-choice' 
  | 'boolean' 
  | 'expression';

export interface WorkedExampleStep {
  stepNumber: number;
  explanation: string;
  expressionLatex?: string;
  mathExplanation?: string;
}

export interface WorkedExample {
  id: string;
  prompt: string;
  promptLatex?: string;
  steps: WorkedExampleStep[];
  finalAnswer: string;
  finalAnswerLatex?: string;
  sourceLabel: 'textbook' | 'extra-practice';
  sourceLocation?: string;
  notes?: string;
}

export interface ExplanationBlock {
  heading: string;
  body: string;
  bodyLatex?: string;
  formulaLatex?: string;
  keyConcept?: string;
}

export interface FormulaCard {
  title: string;
  latex: string;
  description: string;
  ruleOrName?: string;
  exampleLatex?: string;
}

export interface CommonMistake {
  mistake: string;
  correction: string;
  why: string;
}

export interface DiagramFigure {
  id: string;
  figureNumber: string;
  title: string;
  bookPage: string;
  caption: string;
  description: string;
}

export interface Lesson {
  id: string;
  sectionId: SectionId;
  sectionNumber: number;
  title: string;
  subtitle: string;
  bookPages: string;
  exerciseInfo: string;
  estimatedMinutes: number;
  learningGoals: string[];
  intuitiveAnalogy: {
    title: string;
    text: string;
  };
  explanationBlocks: ExplanationBlock[];
  keyFormulas: FormulaCard[];
  workedExamples: WorkedExample[];
  figures?: DiagramFigure[];
  toolIds: string[];
  commonMistakes: CommonMistake[];
  quickCheckIds: string[];
  chapterSummary: string;
}

export interface SolutionStep {
  stepNumber: number;
  explanation: string;
  mathLatex?: string;
}

export interface PracticeQuestion {
  id: string;
  sectionId: SectionId;
  topic: string;
  difficulty: DifficultyLevel;
  prompt: string;
  promptLatex?: string;
  answerType: AnswerType;
  options?: string[];
  acceptedAnswers: string[];
  tolerance?: number;
  hints: string[];
  solutionSteps: SolutionStep[];
  finalAnswer: string;
  sourceLabel: 'textbook' | 'extra-practice';
  sourceReference: string;
  sourceLocation?: string;
  verificationStatus: 'verified-from-pdf' | 'extra-practice-aligned';
}

export interface ReviewFlashcard {
  id: string;
  number: number;
  sectionId: SectionId;
  question: string;
  questionLatex?: string;
  answer: string;
  answerLatex?: string;
  keyTakeaway: string;
  sectionRef: string;
  pageRef: string;
}

export interface QuestionAttempt {
  questionId: string;
  userAnswer: string;
  isCorrect: boolean;
  timestamp: number;
  hintsRevealed: number;
}

export interface UserProgress {
  completedLessons: string[];
  bookmarkedSections: string[];
  attempts: Record<string, QuestionAttempt>;
  totalAttempted: number;
  totalCorrect: number;
  accuracyPercentage: number;
  reviewedFlashcards: string[];
  lastActiveSectionId?: SectionId;
}
