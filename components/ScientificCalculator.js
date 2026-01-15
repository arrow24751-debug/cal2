
import React, { useState, useEffect, useCallback } from 'react';
import htm from 'htm';
import * as math from 'mathjs';
import { CalcMode } from '../constants.js';
import Display from './Display.js';
import Keypad from './Keypad.js';
import HistoryPanel from './HistoryPanel.js';

const html = htm.bind(React.createElement);

const ScientificCalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const [mode, setMode] = useState(CalcMode.DEG);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const evaluateExpression = useCallback(() => {
    if (!expression) return;
    try {
      let processedExpr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'e');

      const evaluated = math.evaluate(processedExpr);
      const finalResult = math.format(evaluated, { precision: 10 });
      
      setResult(finalResult.toString());
      
      const newEntry = {
        id: Math.random().toString(36).substr(2, 9),
        expression,
        result: finalResult.toString(),
        timestamp: Date.now()
      };
      setHistory(prev => [newEntry, ...prev].slice(0, 50));
    } catch (error) {
      setResult('Error');
    }
  }, [expression, mode]);

  const handleKeyPress = useCallback((value, type) => {
    if (type === 'action') {
      if (value === 'AC') {
        setExpression('');
        setResult(null);
      } else if (value === '=') {
        evaluateExpression();
      } else if (value === 'DEL') {
        setExpression(prev => prev.slice(0, -1));
      } else if (value === 'toggle-mode') {
        setMode(prev => prev === CalcMode.DEG ? CalcMode.RAD : CalcMode.DEG);
      }
    } else if (type === 'function') {
      setExpression(prev => prev + value + '(');
    } else {
      setExpression(prev => prev + value);
    }
  }, [evaluateExpression]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const key = e.key;
      if (/[0-9]/.test(key)) handleKeyPress(key, 'digit');
      if (['+', '-', '*', '/', '(', ')', '^', '.'].includes(key)) {
        let mapped = key;
        if (key === '*') mapped = '×';
        if (key === '/') mapped = '÷';
        handleKeyPress(mapped, 'operator');
      }
      if (key === 'Enter') handleKeyPress('=', 'action');
      if (key === 'Backspace') handleKeyPress('DEL', 'action');
      if (key === 'Escape') handleKeyPress('AC', 'action');
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return html`
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-2xl transition-all duration-300">
      <div className="lg:col-span-3 space-y-6">
        <${Display} 
          expression=${expression} 
          result=${result} 
          mode=${mode}
          onToggleHistory=${() => setIsHistoryOpen(!isHistoryOpen)}
        />
        <${Keypad} onKeyClick=${handleKeyPress} mode=${mode} />
      </div>
      
      <div className=${`lg:col-span-1 h-full min-h-[400px] ${isHistoryOpen ? 'block' : 'hidden lg:block'}`}>
        <${HistoryPanel} 
          history=${history} 
          onSelect=${(entry) => {
            setExpression(entry.expression);
            setResult(entry.result);
          }}
          onClear=${() => setHistory([])}
        />
      </div>
    </div>
  `;
};

export default ScientificCalculator;
