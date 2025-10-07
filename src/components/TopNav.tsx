'use client';

import { ArrowIcon, CandleIcon } from '@/assets/icons';
import { useState, useEffect } from 'react';

export default function TopNav() {
  const [isDark, setIsDark] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);

  useEffect(() => {
    // Check for saved theme preference or default to system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (isCollectionsOpen && !target.closest('.collections-dropdown')) {
        setIsCollectionsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCollectionsOpen]);

  return (
    <nav className="shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-3">
            <div className="flex-shrink-0">
              <CandleIcon size={32} color="#3a3122"className="w-12 h-12" />
            </div>
            <h1 className="text-xl font-bold text-primary">
              Candlelandia
            </h1>
          </div>
          <div className="relative flex items-center collections-dropdown">
            <button
              onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-300 focus:outline-none text-secondary bg-accent font-medium"
              aria-label="Collections menu"
            >
              Collections
              <ArrowIcon size={16} color="#dddddd" className={`transition-transform duration-200 ${isCollectionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {isCollectionsOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-accent rounded-lg shadow-lg 600 py-2 z-50">
                <a
                  href="#"
                  className="block px-4 py-2 text-secondary hover:bg-highlight transition-colors"
                  onClick={() => setIsCollectionsOpen(false)}
                >
                  Classic
                </a>
                <a
                  href="#"
                  className="block px-4 py-2 text-secondary hover:bg-highlight transition-colors"
                  onClick={() => setIsCollectionsOpen(false)}
                >
                  Love
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}