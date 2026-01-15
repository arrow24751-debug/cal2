
import React from 'react';
import { ButtonConfig, CalcMode } from '../types';

interface KeypadProps {
  onKeyClick: (value: string, type: string) => void;
  mode: CalcMode;
}

const Keypad: React.FC<KeypadProps> = ({ onKeyClick, mode }) => {
  const buttons: ButtonConfig[] = [
    // Row 1: Scientific Constants/Modes
    { label: mode === CalcMode.DEG ? 'DEG' : 'RAD', value: 'toggle-mode', type: 'action', variant: 'accent' },
    { label: 'sin', value: 'sin', type: 'function', variant: 'secondary' },
    { label: 'cos', value: 'cos', type: 'function', variant: 'secondary' },
    { label: 'tan', value: 'tan', type: 'function', variant: 'secondary' },
    { label: 'π', value: 'π', type: 'constant', variant: 'secondary' },

    // Row 2: Scientific Functions
    { label: 'xʸ', value: '^', type: 'operator', variant: 'secondary' },
    { label: 'lg', value: 'log10', type: 'function', variant: 'secondary' },
    { label: 'ln', value: 'log', type: 'function', variant: 'secondary' },
    { label: '√', value: 'sqrt', type: 'function', variant: 'secondary' },
    { label: 'e', value: 'e', type: 'constant', variant: 'secondary' },

    // Row 3: Main Actions
    { label: 'AC', value: 'AC', type: 'action', variant: 'danger' },
    { label: '(', value: '(', type: 'operator', variant: 'secondary' },
    { label: ')', value: ')', type: 'operator', variant: 'secondary' },
    { label: 'DEL', value: 'DEL', type: 'action', variant: 'danger' },
    { label: '÷', value: '÷', type: 'operator', variant: 'primary' },

    // Row 4: Digits 7-9
    { label: '7', value: '7', type: 'digit' },
    { label: '8', value: '8', type: 'digit' },
    { label: '9', value: '9', type: 'digit' },
    { label: '!', value: '!', type: 'operator', variant: 'secondary' },
    { label: '×', value: '×', type: 'operator', variant: 'primary' },

    // Row 5: Digits 4-6
    { label: '4', value: '4', type: 'digit' },
    { label: '5', value: '5', type: 'digit' },
    { label: '6', value: '6', type: 'digit' },
    { label: '%', value: '%', type: 'operator', variant: 'secondary' },
    { label: '-', value: '-', type: 'operator', variant: 'primary' },

    // Row 6: Digits 1-3
    { label: '1', value: '1', type: 'digit' },
    { label: '2', value: '2', type: 'digit' },
    { label: '3', value: '3', type: 'digit' },
    { label: '.', value: '.', type: 'digit' },
    { label: '+', value: '+', type: 'operator', variant: 'primary' },

    // Row 7: Bottom
    { label: '0', value: '0', type: 'digit', span: 2 },
    { label: 'EXP', value: 'e', type: 'operator', variant: 'secondary' },
    { label: '=', value: '=', type: 'action', variant: 'accent', span: 2 },
  ];

  const getButtonStyles = (btn: ButtonConfig) => {
    const base = "flex items-center justify-center rounded-xl text-lg font-semibold transition-all duration-150 active:scale-95 shadow-lg select-none";
    const span = btn.span ? `col-span-${btn.span}` : '';
    
    let colors = "bg-slate-800 text-white hover:bg-slate-700"; // Default: Digits
    
    if (btn.variant === 'primary') {
      colors = "bg-blue-600/20 text-blue-400 hover:bg-blue-600/30 border border-blue-500/20";
    } else if (btn.variant === 'secondary') {
      colors = "bg-slate-700 text-slate-300 hover:bg-slate-600";
    } else if (btn.variant === 'accent') {
      colors = "bg-blue-600 text-white hover:bg-blue-500 shadow-blue-900/40";
    } else if (btn.variant === 'danger') {
      colors = "bg-rose-900/30 text-rose-400 hover:bg-rose-900/40 border border-rose-500/20";
    }

    return `${base} ${span} ${colors} h-14 md:h-16`;
  };

  return (
    <div className="grid grid-cols-5 gap-3">
      {buttons.map((btn, idx) => (
        <button
          key={`${btn.label}-${idx}`}
          className={getButtonStyles(btn)}
          onClick={() => onKeyClick(btn.value, btn.type)}
        >
          {btn.label}
        </button>
      ))}
    </div>
  );
};

export default Keypad;
