import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const HistoryPanel = ({ history, onSelect, onClear }) => {
  return html`
    <div className="flex flex-col h-full bg-slate-950/40 rounded-3xl border border-slate-800/50 overflow-hidden backdrop-blur-md">
      <div className="p-5 border-b border-slate-800/50 flex justify-between items-center bg-slate-900/30">
        <h3 className="text-slate-400 font-bold text-xs uppercase tracking-[0.2em] flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History
        </h3>
        <button 
          onClick=${onClear}
          className="text-[10px] text-slate-500 hover:text-rose-400 transition-colors uppercase font-black"
        >
          Clear
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        ${history.length === 0 ? html`
          <div className="h-full flex flex-col items-center justify-center text-slate-600 text-sm space-y-3 opacity-30">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            <p className="font-medium">No recent logs</p>
          </div>
        ` : history.map((entry) => html`
            <button
              key=${entry.id}
              onClick=${() => onSelect(entry)}
              className="w-full text-right group p-3 hover:bg-blue-600/5 rounded-2xl transition-all duration-300 border border-transparent hover:border-blue-500/20"
            >
              <div className="text-[11px] text-slate-500 font-mono mb-1 truncate group-hover:text-blue-400 transition-colors tracking-tighter">
                ${entry.expression}
              </div>
              <div className="text-base text-white font-mono font-bold truncate">
                = ${entry.result}
              </div>
            </button>
          `)}
      </div>
      
      <div className="p-4 bg-slate-900/20 text-[10px] text-slate-600 text-center border-t border-slate-800/30 italic">
        Tap entry to restore
      </div>
    </div>
  `;
};

export default HistoryPanel;