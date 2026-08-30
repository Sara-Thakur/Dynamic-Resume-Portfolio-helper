import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { PortfolioProvider } from './context/PortfolioContext';
import { Navbar } from './components/Navbar';
import { BuilderPage } from './pages/BuilderPage';
import { PublicPortfolioPage } from './pages/PublicPortfolioPage';

export function App() {
  return (
    <PortfolioProvider>
      <Router>
        <div className="min-h-screen bg-slate-50 flex flex-col font-sans antialiased text-slate-800">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Navbar />
                  <BuilderPage />
                </>
              }
            />
            <Route path="/portfolio/:slug" element={<PublicPortfolioPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </PortfolioProvider>
  );
}

export default App;
