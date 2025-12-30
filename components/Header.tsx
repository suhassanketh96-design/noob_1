
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center transform rotate-45">
              <div className="w-4 h-4 bg-slate-950 rounded-sm"></div>
            </div>
            <span className="text-2xl font-rajdhani font-bold tracking-tighter text-white">
              NEXUS<span className="text-cyan-400">CORE</span>
            </span>
          </div>
          
          <nav className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-slate-400">
            <a href="#" className="hover:text-cyan-400 transition-colors">Builder</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Pre-builts</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Components</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Support</a>
          </nav>

          <div className="flex items-center gap-4">
            <button className="bg-slate-800 p-2 rounded-full hover:bg-slate-700 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 118 0m-4 4v2m0 0l-5.497-1.456a.45.45 0 01-.31-.306L8 5.402a.45.45 0 01.303-.45l1.498-.549M16 11l-2.013 1.007a.45.45 0 01-.401 0L11 11m0 0L8.803 9.902a.45.45 0 01-.21-.307L8 5.402" />
              </svg>
            </button>
            <button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2 rounded-md font-bold text-sm uppercase transition-all shadow-lg shadow-cyan-500/20">
              Sign In
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
