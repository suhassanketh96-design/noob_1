
import React, { useState, useMemo, useCallback } from 'react';
import Header from './components/Header';
import PartSelector from './components/PartSelector';
import PerformanceGraph from './components/PerformanceGraph';
import { PC_PARTS } from './constants';
import { PCPart, PartCategory } from './types';
import { gemini } from './services/geminiService';

const CATEGORIES = Object.values(PartCategory);

const App: React.FC = () => {
  const [selectedParts, setSelectedParts] = useState<Partial<Record<PartCategory, PCPart>>>({});
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiRationale, setAiRationale] = useState<string | null>(null);
  const [budget, setBudget] = useState(2000);

  const totalPrice = useMemo(() => {
    // Fix: Cast Object.values to expected type to resolve 'unknown' property access errors for 'price'
    const parts = Object.values(selectedParts) as (PCPart | undefined)[];
    return parts.reduce((acc, part) => acc + (part?.price || 0), 0);
  }, [selectedParts]);

  const avgPerformance = useMemo(() => {
    // Fix: Cast Object.values to expected type to resolve 'unknown' property access errors for 'performanceScore'
    const parts = Object.values(selectedParts) as (PCPart | undefined)[];
    if (parts.length === 0) return 0;
    return Math.round(parts.reduce((acc, p) => acc + (p?.performanceScore || 0), 0) / parts.length);
  }, [selectedParts]);

  const handleSelectPart = (part: PCPart) => {
    setSelectedParts(prev => ({
      ...prev,
      [part.category]: part
    }));
  };

  const handleAiOptimize = async () => {
    setIsAiLoading(true);
    setAiRationale(null);
    try {
      const rec = await gemini.getBuildRecommendation(budget, 'gaming', 'High refresh rate 1440p gaming');
      const suggestedParts = PC_PARTS.filter(p => rec.suggestedPartIds.includes(p.id));
      
      const newBuild: Partial<Record<PartCategory, PCPart>> = {};
      suggestedParts.forEach(p => {
        newBuild[p.category] = p;
      });
      
      setSelectedParts(newBuild);
      setAiRationale(rec.rationale);
    } catch (err) {
      alert("Failed to get AI recommendation. Please try again.");
    } finally {
      setIsAiLoading(false);
    }
  };

  const clearBuild = () => setSelectedParts({});

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-12 gap-8">
          
          {/* Left Column: Builder Controls */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-rajdhani font-bold text-white tracking-tight">CUSTOM <span className="text-cyan-400">BUILDER</span></h1>
                <p className="text-slate-400 mt-2">Precision engineered. AI optimized. Your perfect rig awaits.</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={clearBuild}
                  className="px-4 py-2 text-slate-400 hover:text-white transition-colors text-sm font-bold uppercase tracking-widest"
                >
                  Reset
                </button>
                <button 
                  onClick={handleAiOptimize}
                  disabled={isAiLoading}
                  className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 disabled:opacity-50 text-white px-6 py-2 rounded-lg font-bold text-sm uppercase transition-all shadow-xl shadow-cyan-500/20 flex items-center gap-2"
                >
                  {isAiLoading ? (
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  )}
                  AI Optimize
                </button>
              </div>
            </div>

            {aiRationale && (
              <div className="bg-cyan-500/10 border border-cyan-500/30 p-4 rounded-xl text-cyan-100 text-sm leading-relaxed animate-in fade-in slide-in-from-top-4">
                <span className="font-bold text-cyan-400 uppercase tracking-widest text-[10px] block mb-1">AI Insights</span>
                {aiRationale}
              </div>
            )}

            <div className="grid md:grid-cols-2 gap-6">
              {CATEGORIES.map(category => (
                <PartSelector
                  key={category}
                  category={category}
                  selectedPart={selectedParts[category]}
                  parts={PC_PARTS.filter(p => p.category === category)}
                  onSelect={handleSelectPart}
                />
              ))}
            </div>
          </div>

          {/* Right Column: Build Summary & Performance (Sticky) */}
          <div className="lg:col-span-4 lg:sticky lg:top-24 h-fit space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full"></div>
              
              <h2 className="text-xl font-rajdhani font-bold text-white mb-6 uppercase tracking-widest flex items-center justify-between">
                Order Summary
                <span className="text-[10px] text-slate-500 px-2 py-1 bg-slate-800 rounded border border-slate-700">v2.4</span>
              </h2>

              <div className="space-y-4 mb-8">
                {CATEGORIES.map(category => (
                  <div key={category} className="flex justify-between text-sm items-center">
                    <span className="text-slate-400 font-medium">{category}</span>
                    <span className={`font-mono ${selectedParts[category] ? 'text-white' : 'text-slate-700 italic'}`}>
                      {selectedParts[category] ? `$${selectedParts[category]?.price}` : 'Not Selected'}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-slate-800 space-y-4">
                <div className="flex justify-between items-end">
                  <span className="text-slate-400 font-bold uppercase tracking-widest text-xs">Estimated Total</span>
                  <span className="text-3xl font-rajdhani font-bold text-white">${totalPrice.toLocaleString()}</span>
                </div>
                
                <div className="space-y-3">
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest">Target Budget: ${budget}</label>
                  <input 
                    type="range" 
                    min="500" 
                    max="5000" 
                    step="100"
                    value={budget}
                    onChange={(e) => setBudget(Number(e.target.value))}
                    className="w-full h-1 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-500" 
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-600">
                    <span>$500</span>
                    <span>$5000</span>
                  </div>
                </div>

                <PerformanceGraph score={avgPerformance} />

                <button 
                  disabled={Object.keys(selectedParts).length < 3}
                  className="w-full bg-white hover:bg-slate-200 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-bold py-4 rounded-xl transition-all shadow-xl shadow-white/5 active:scale-95 uppercase tracking-widest text-sm"
                >
                  Checkout Build
                </button>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h4 className="text-white text-sm font-bold">Compatibility Guaranteed</h4>
                <p className="text-slate-500 text-xs">All selected parts are verified for fit.</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">© 2024 NexusCore Systems. All rights reserved. High performance visuals by DesignTeam.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
