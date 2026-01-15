import React from 'react';
import htm from 'htm';
import ScientificCalculator from './components/ScientificCalculator.js';

const html = htm.bind(React.createElement);

const App = () => {
  return html`
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8">
      <!-- Background effects -->
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      
      <main className="w-full max-w-4xl z-10">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-tight">
            Titan<span className="text-blue-500">Calc</span>
          </h1>
          <p className="text-slate-400 mt-2 font-light">Advanced Scientific Computing Engine</p>
        </div>
        
        <${ScientificCalculator} />
        
        <footer className="mt-8 text-center text-slate-500 text-sm">
          <p>© ${new Date().getFullYear()} TitanCalc Engineering. Designed for precision.</p>
        </footer>
      </main>
    </div>
  `;
};

export default App;