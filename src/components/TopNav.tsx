'use client';

import { CandleIcon, CartIcon } from '@/assets/icons';

export default function TopNav() {
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
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 focus:outline-none text-secondary bg-accent font-medium shadow-md hover:shadow-lg"
            aria-label="Shopping cart"
          >
            <CartIcon size={20} color="#c2b8aa" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}