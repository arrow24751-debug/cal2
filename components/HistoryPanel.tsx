
import React from 'react';
import { HistoryEntry } from '../types';

interface HistoryPanelProps {
  history: HistoryEntry[];
  onSelect: (entry: HistoryEntry) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear }) => {
  return (
    <div className="flex flex-col h-full bg-slate-950/40 rounded-2xl border border-slate-800 overflow-hidden">
      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
        <h3 className="text-slate-300 font-semibold text-sm uppercase tracking-wider flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History
        </h3>
        <button 
          onClick={onClear}
          className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors uppercase font-bold"
        >
          Clear
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {history.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-slate-600 text-sm space-y-2 opacity-50">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            <p>No history yet</p>
          </div>
        ) : (
          history.map((entry) => (
            <button
              key={entry.id}
              onClick={() => onSelect(entry)}
              className="w-full text-right group p-2 hover:bg-slate-800/50 rounded-lg transition-all duration-200 border border-transparent hover:border-slate-700"
            >
              <div className="text-xs text-slate-500 font-mono mb-1 truncate group-hover:text-blue-400 transition-colors">
                {entry.expression}
              </div>
              <div className="text-sm text-white font-mono font-bold truncate">
                = {entry.result}
              </div>
            </button>
          ))
        )}
      </div>
      
      <div className="p-3 bg-slate-900/50 text-[10px] text-slate-500 text-center border-top border-slate-800 italic">
        Click an entry to reuse
      </div>
    </div>
  );
};

export default HistoryPanel;
