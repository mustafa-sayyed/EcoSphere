import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Articles from './pages/Articles';
import CarbonCalculator from './pages/CarbonCalculator';
import ExtinctSpecies from './pages/ExtinctSpecies';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        <Navbar darkMode={darkMode} toggleDarkMode={() => setDarkMode(!darkMode)} />
        <main className="container mx-auto px-4 pt-20">
          <Routes>
            <Route path="/" element={<Navigate to="/articles" replace />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/calculator" element={<CarbonCalculator />} />
            <Route path="/extinct" element={<ExtinctSpecies />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;