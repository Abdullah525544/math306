import { useState, useEffect, useCallback } from 'react';
import { UserProgress, SectionId, QuestionAttempt } from '../types';

const STORAGE_KEY = 'math_lab_preliminaries_progress_v1';

const defaultProgress: UserProgress = {
  completedLessons: [],
  bookmarkedSections: [],
  attempts: {},
  totalAttempted: 0,
  totalCorrect: 0,
  accuracyPercentage: 0,
  reviewedFlashcards: [],
  lastActiveSectionId: 'section-1',
};

/**
 * Loads user progress safely from localStorage
 */
export function getStoredProgress(): UserProgress {
  if (typeof window === 'undefined') return defaultProgress;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultProgress;
    const parsed = JSON.parse(raw);
    return {
      ...defaultProgress,
      ...parsed,
      attempts: parsed.attempts || {},
      completedLessons: parsed.completedLessons || [],
      bookmarkedSections: parsed.bookmarkedSections || [],
      reviewedFlashcards: parsed.reviewedFlashcards || [],
    };
  } catch (err) {
    console.error('Failed to parse progress from localStorage:', err);
    return defaultProgress;
  }
}

/**
 * Saves user progress to localStorage and dispatches a window event for cross-component sync
 */
export function persistProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
    window.dispatchEvent(new CustomEvent('mathlab:progress-update', { detail: progress }));
  } catch (err) {
    console.error('Failed to save progress to localStorage:', err);
  }
}

/**
 * Toggle lesson completion state
 */
export function toggleLessonComplete(lessonId: string): UserProgress {
  const current = getStoredProgress();
  const exists = current.completedLessons.includes(lessonId);
  const updatedList = exists
    ? current.completedLessons.filter(id => id !== lessonId)
    : [...current.completedLessons, lessonId];

  const updated: UserProgress = {
    ...current,
    completedLessons: updatedList,
  };
  persistProgress(updated);
  return updated;
}

/**
 * Toggle section bookmark
 */
export function toggleSectionBookmark(sectionId: SectionId): UserProgress {
  const current = getStoredProgress();
  const exists = current.bookmarkedSections.includes(sectionId);
  const updatedList = exists
    ? current.bookmarkedSections.filter(id => id !== sectionId)
    : [...current.bookmarkedSections, sectionId];

  const updated: UserProgress = {
    ...current,
    bookmarkedSections: updatedList,
  };
  persistProgress(updated);
  return updated;
}

/**
 * Record student question answer attempt and calculate accuracy
 */
export function recordAttempt(
  questionId: string,
  userAnswer: string,
  isCorrect: boolean,
  hintsRevealed: number = 0
): UserProgress {
  const current = getStoredProgress();
  const prevAttempt = current.attempts[questionId];

  const newAttempt: QuestionAttempt = {
    questionId,
    userAnswer,
    isCorrect,
    timestamp: Date.now(),
    hintsRevealed,
  };

  const newAttempts = {
    ...current.attempts,
    [questionId]: newAttempt,
  };

  const attemptsArray = Object.values(newAttempts);
  const totalAttempted = attemptsArray.length;
  const totalCorrect = attemptsArray.filter(a => a.isCorrect).length;
  const accuracyPercentage = totalAttempted > 0 
    ? Math.round((totalCorrect / totalAttempted) * 100) 
    : 0;

  const updated: UserProgress = {
    ...current,
    attempts: newAttempts,
    totalAttempted,
    totalCorrect,
    accuracyPercentage,
  };

  persistProgress(updated);
  return updated;
}

/**
 * Record flashcard mastery
 */
export function toggleFlashcardReviewed(cardId: string): UserProgress {
  const current = getStoredProgress();
  const exists = current.reviewedFlashcards.includes(cardId);
  const updatedList = exists
    ? current.reviewedFlashcards.filter(id => id !== cardId)
    : [...current.reviewedFlashcards, cardId];

  const updated: UserProgress = {
    ...current,
    reviewedFlashcards: updatedList,
  };
  persistProgress(updated);
  return updated;
}

/**
 * Set last active section
 */
export function setLastActiveSection(sectionId: SectionId): UserProgress {
  const current = getStoredProgress();
  const updated: UserProgress = {
    ...current,
    lastActiveSectionId: sectionId,
  };
  persistProgress(updated);
  return updated;
}

/**
 * Resets user progress with mandatory user confirmation
 */
export function confirmAndResetProgress(): boolean {
  if (typeof window === 'undefined') return false;
  const confirmed = window.confirm(
    'Are you sure you want to reset all your progress? This will clear all completed lessons, bookmarks, quiz scores, and flashcard states.'
  );
  if (!confirmed) return false;

  persistProgress(defaultProgress);
  return true;
}

/**
 * React Hook for real-time progress subscription
 */
export function useProgress() {
  const [progress, setProgress] = useState<UserProgress>(getStoredProgress);

  useEffect(() => {
    // Initial fetch in case SSR/hydration
    setProgress(getStoredProgress());

    const handleUpdate = (e: Event) => {
      const customEvent = e as CustomEvent<UserProgress>;
      if (customEvent.detail) {
        setProgress(customEvent.detail);
      } else {
        setProgress(getStoredProgress());
      }
    };

    window.addEventListener('mathlab:progress-update', handleUpdate);
    window.addEventListener('storage', handleUpdate);

    return () => {
      window.removeEventListener('mathlab:progress-update', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  const completeLesson = useCallback((id: string) => toggleLessonComplete(id), []);
  const toggleBookmark = useCallback((id: SectionId) => toggleSectionBookmark(id), []);
  const logAttempt = useCallback(
    (qId: string, ans: string, correct: boolean, hints: number) =>
      recordAttempt(qId, ans, correct, hints),
    []
  );
  const toggleFlashcard = useCallback((id: string) => toggleFlashcardReviewed(id), []);
  const resetAll = useCallback(() => confirmAndResetProgress(), []);

  return {
    progress,
    completeLesson,
    toggleBookmark,
    logAttempt,
    toggleFlashcard,
    resetAll,
  };
}
