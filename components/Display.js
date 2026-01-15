
import React from 'react';
import htm from 'htm';

const html = htm.bind(React.createElement);

const Display = ({ expression, result, mode, onToggleHistory }) => {
  return html`
    <div className="relative bg-slate-950/80 rounded-2xl p-6 border border-slate-800 shadow-inner flex flex-col items-end justify-end overflow-hidden h-36">
      <div className="absolute top-4 left-4 flex items-center space-x-2">
        <span className="px-2 py-0.5 bg-slate-800 text-blue-400 text-[10px] font-bold rounded-md uppercase tracking-wider">
          ${mode}
        </span>
        <button 
          onClick=${onToggleHistory}
          className="lg:hidden p-1 text-slate-500 hover:text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      <div className="w-full text-right overflow-hidden">
        <div className="text-slate-500 text-lg font-mono truncate h-8 mb-1">
          ${expression || ' '}
        </div>
        <div className=${`text-white text-4xl font-bold font-mono truncate transition-all ${result === 'Error' ? 'text-red-400' : ''}`}>
          ${result !== null ? result : (expression ? '' : '0')}
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-600 opacity-30"></div>
    </div>
  `;
};

export default Display;
