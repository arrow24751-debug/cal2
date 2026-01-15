import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const Display = ({ expression, result, mode, onToggleHistory }) => {
  return html`
    <div className="relative bg-slate-950/60 rounded-3xl p-8 border border-slate-800/50 shadow-inner flex flex-col items-end justify-center overflow-hidden h-40">
      <!-- Top Badge Area -->
      <div className="absolute top-4 left-6 flex items-center space-x-3">
        <span className="px-3 py-1 bg-blue-600/20 text-blue-400 text-[10px] font-bold rounded-full uppercase tracking-widest border border-blue-500/20">
          ${mode}
        </span>
        <button 
          onClick=${onToggleHistory}
          className="lg:hidden p-1.5 text-slate-500 hover:text-white transition-colors bg-slate-800/50 rounded-lg"
          title="Toggle History"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <!-- Text Content -->
      <div className="w-full text-right overflow-hidden mt-4">
        <div className="text-slate-500 text-lg font-mono truncate h-8 mb-2 tracking-tight">
          ${expression || ' '}
        </div>
        <div className=${`text-white text-5xl font-bold font-mono truncate transition-all duration-300 ${result === 'Error' ? 'text-rose-500' : ''}`}>
          ${result !== null ? result : (expression ? '' : '0')}
        </div>
      </div>
      
      <!-- Decorative Glow -->
      <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-20"></div>
    </div>
  `;
};

export default Display;