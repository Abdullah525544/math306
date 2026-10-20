import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Layout from './components/Layout';

// Pages
import Dashboard from './pages/Dashboard';
import CourseOverview from './pages/CourseOverview';
import SectionLessonPage from './pages/SectionLessonPage';
import InteractiveLabPage from './pages/InteractiveLabPage';
import PracticePage from './pages/PracticePage';
import ReviewFlashcardsPage from './pages/ReviewFlashcardsPage';

// Scroll to top on route change helper
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/overview" element={<CourseOverview />} />
          <Route path="/section/:sectionId" element={<SectionLessonPage />} />
          <Route path="/lab" element={<InteractiveLabPage />} />
          <Route path="/practice" element={<PracticePage />} />
          <Route path="/review" element={<ReviewFlashcardsPage />} />
          {/* Catch-all fallback route */}
          <Route path="*" element={<Dashboard />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
