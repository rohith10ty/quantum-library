import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useLenis } from './hooks/useLenis';
import { LibraryProvider } from './context/LibraryContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { IssueBookModal } from './components/library/IssueBookModal';
import { HomePage } from './pages/HomePage';
import { CatalogPage } from './pages/CatalogPage';
import { BookDetailsPage } from './pages/BookDetailsPage';
import { DashboardPage } from './pages/DashboardPage';
import { LoginPage } from './pages/LoginPage';

// Scroll to top on route change helper
function ScrollToTopOnRoute() {
  const { pathname } = useLocation();

  useEffect(() => {
    if (window.lenis) {
      window.lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}

function MainApp() {
  // Synchronized Lenis smooth scroll with GSAP ticker
  useLenis(true);

  return (
    <div className="relative w-full min-h-screen bg-transparent text-white selection:bg-[#c471e1] selection:text-white overflow-x-hidden font-mono">
      {/* Navigation Header */}
      <Navbar />

      <ScrollToTopOnRoute />

      {/* Main Routed Content */}
      <main className="relative w-full">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/catalog" element={<CatalogPage />} />
          <Route path="/book/:id" element={<BookDetailsPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </main>

      {/* Universal Issue Book Modal */}
      <IssueBookModal />

      {/* Academic Footer */}
      <Footer />
    </div>
  );
}

export function App() {
  return (
    <LibraryProvider>
      <BrowserRouter>
        <MainApp />
      </BrowserRouter>
    </LibraryProvider>
  );
}

export default App;
