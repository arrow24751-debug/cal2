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
      // Configure mathjs to handle units/angles based on mode
      // For simplicity, we manually replace tokens for mathjs compatibility
      let processedExpr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'e');

      // Mathjs evaluate
      const scope = {};
      const config = {
        angles: mode === CalcMode.DEG ? 'deg' : 'rad'
      };
      
      const evaluated = math.evaluate(processedExpr, scope);
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
        setResult(null);
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
      if (e.key === 'Enter') handleKeyPress('=', 'action');
      else if (e.key === 'Backspace') handleKeyPress('DEL', 'action');
      else if (e.key === 'Escape') handleKeyPress('AC', 'action');
      else if (/[0-9]/.test(e.key)) handleKeyPress(e.key, 'digit');
      else if (['+', '-', '*', '/', '(', ')', '^', '.'].includes(e.key)) {
        let val = e.key;
        if (val === '*') val = '×';
        if (val === '/') val = '÷';
        handleKeyPress(val, 'operator');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyPress]);

  return html`
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-slate-900/40 backdrop-blur-2xl border border-slate-800 p-6 rounded-[2rem] shadow-2xl transition-all duration-500">
      <div className="lg:col-span-3 space-y-6">
        <${Display} 
          expression=${expression} 
          result=${result} 
          mode=${mode}
          onToggleHistory=${() => setIsHistoryOpen(!isHistoryOpen)}
        />
        <${Keypad} onKeyClick=${handleKeyPress} mode=${mode} />
      </div>
      
      <div className=${`lg:col-span-1 h-full min-h-[450px] transition-all duration-300 ${isHistoryOpen ? 'block' : 'hidden lg:block'}`}>
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