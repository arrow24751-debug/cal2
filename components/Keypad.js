import React from 'react';
import htm from 'htm';
import { CalcMode } from '../constants.js';

const html = htm.bind(React.createElement);

const Keypad = ({ onKeyClick, mode }) => {
  const buttons = [
    // R1
    { label: mode === CalcMode.DEG ? 'DEG' : 'RAD', value: 'toggle-mode', type: 'action', variant: 'accent' },
    { label: 'sin', value: 'sin', type: 'function', variant: 'secondary' },
    { label: 'cos', value: 'cos', type: 'function', variant: 'secondary' },
    { label: 'tan', value: 'tan', type: 'function', variant: 'secondary' },
    { label: 'π', value: 'π', type: 'constant', variant: 'secondary' },
    // R2
    { label: 'xʸ', value: '^', type: 'operator', variant: 'secondary' },
    { label: 'lg', value: 'log10', type: 'function', variant: 'secondary' },
    { label: 'ln', value: 'log', type: 'function', variant: 'secondary' },
    { label: '√', value: 'sqrt', type: 'function', variant: 'secondary' },
    { label: 'e', value: 'e', type: 'constant', variant: 'secondary' },
    // R3
    { label: 'AC', value: 'AC', type: 'action', variant: 'danger' },
    { label: '(', value: '(', type: 'operator', variant: 'secondary' },
    { label: ')', value: ')', type: 'operator', variant: 'secondary' },
    { label: 'DEL', value: 'DEL', type: 'action', variant: 'danger' },
    { label: '÷', value: '÷', type: 'operator', variant: 'primary' },
    // R4
    { label: '7', value: '7', type: 'digit' },
    { label: '8', value: '8', type: 'digit' },
    { label: '9', value: '9', type: 'digit' },
    { label: '!', value: '!', type: 'operator', variant: 'secondary' },
    { label: '×', value: '×', type: 'operator', variant: 'primary' },
    // R5
    { label: '4', value: '4', type: 'digit' },
    { label: '5', value: '5', type: 'digit' },
    { label: '6', value: '6', type: 'digit' },
    { label: '%', value: '%', type: 'operator', variant: 'secondary' },
    { label: '-', value: '-', type: 'operator', variant: 'primary' },
    // R6
    { label: '1', value: '1', type: 'digit' },
    { label: '2', value: '2', type: 'digit' },
    { label: '3', value: '3', type: 'digit' },
    { label: '.', value: '.', type: 'digit' },
    { label: '+', value: '+', type: 'operator', variant: 'primary' },
    // R7
    { label: '0', value: '0', type: 'digit', span: 2 },
    { label: 'EXP', value: 'e', type: 'operator', variant: 'secondary' },
    { label: '=', value: '=', type: 'action', variant: 'accent', span: 2 },
  ];

  const getButtonStyles = (btn) => {
    const base = "flex items-center justify-center rounded-2xl text-lg font-medium transition-all duration-200 active:scale-95 shadow-lg select-none";
    const spanClass = btn.span === 2 ? "col-span-2" : "";
    
    let colors = "bg-slate-800/40 text-white hover:bg-slate-700/60 border border-slate-700/30";
    
    if (btn.variant === 'primary') {
      colors = "bg-blue-600/10 text-blue-400 hover:bg-blue-600/20 border border-blue-500/30";
    } else if (btn.variant === 'secondary') {
      colors = "bg-slate-800/80 text-slate-400 hover:bg-slate-700 hover:text-white border border-slate-700/50";
    } else if (btn.variant === 'accent') {
      colors = "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40 border border-blue-400/50";
    } else if (btn.variant === 'danger') {
      colors = "bg-rose-950/40 text-rose-400 hover:bg-rose-900/60 border border-rose-500/20";
    }

    return `${base} ${spanClass} ${colors} h-14 md:h-16`;
  };

  return html`
    <div className="grid grid-cols-5 gap-3 md:gap-4">
      ${buttons.map((btn, idx) => html`
        <button
          key=${`btn-${idx}`}
          className=${getButtonStyles(btn)}
          onClick=${() => onKeyClick(btn.value, btn.type)}
        >
          ${btn.label}
        </button>
      `)}
    </div>
  `;
};

export default Keypad;