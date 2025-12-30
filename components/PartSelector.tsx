
import React from 'react';
import { PCPart, PartCategory } from '../types';

interface PartSelectorProps {
  category: PartCategory;
  selectedPart?: PCPart;
  parts: PCPart[];
  onSelect: (part: PCPart) => void;
}

const PartSelector: React.FC<PartSelectorProps> = ({ category, selectedPart, parts, onSelect }) => {
  return (
    <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
      <div className="p-4 border-b border-slate-800 bg-slate-900/50 flex justify-between items-center">
        <h3 className="font-rajdhani font-bold text-lg text-white uppercase tracking-wider">{category}</h3>
        {selectedPart && <span className="text-cyan-400 font-bold font-mono">${selectedPart.price}</span>}
      </div>
      
      <div className="p-4 max-h-80 overflow-y-auto space-y-2">
        {parts.map((part) => (
          <button
            key={part.id}
            onClick={() => onSelect(part)}
            className={`w-full flex items-center gap-4 p-3 rounded-xl transition-all border ${
              selectedPart?.id === part.id 
                ? 'bg-cyan-500/10 border-cyan-500/50' 
                : 'bg-slate-800/40 border-transparent hover:border-slate-700 hover:bg-slate-800'
            }`}
          >
            <img src={part.imageUrl} alt={part.name} className="w-12 h-12 rounded-lg object-cover" />
            <div className="flex-1 text-left">
              <p className="text-sm font-bold text-white leading-tight">{part.name}</p>
              <p className="text-xs text-slate-500">{part.brand} • {Object.values(part.specs)[0]}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-cyan-400">${part.price}</p>
              <div className="flex gap-1 justify-end mt-1">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`h-1 w-2 rounded-full ${i < (part.performanceScore / 33) ? 'bg-cyan-500' : 'bg-slate-700'}`}></div>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default PartSelector;
