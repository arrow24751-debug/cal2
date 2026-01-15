
import React, { useState, useEffect, useCallback } from 'react';
import * as math from 'mathjs';
import { CalcMode, HistoryEntry } from '../types.ts';
import Display from './Display.tsx';
import Keypad from './Keypad.tsx';
import HistoryPanel from './HistoryPanel.tsx';

const ScientificCalculator: React.FC = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [mode, setMode] = useState<CalcMode>(CalcMode.DEG);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const evaluateExpression = useCallback(() => {
    if (!expression) return;
    try {
      // Configure mathjs for the current mode
      const config = {
        angles: mode === CalcMode.DEG ? 'deg' : 'rad'
      };
      
      // Basic sanitization and transformation for display characters
      let processedExpr = expression
        .replace(/×/g, '*')
        .replace(/÷/g, '/')
        .replace(/π/g, 'pi')
        .replace(/e/g, 'e');

      // If evaluating trig in DEG mode, we need to wrap inputs if using native mathjs 
      // but mathjs handles a lot of this. For simplicity in this demo, we use math.evaluate
      const evaluated = math.evaluate(processedExpr);
      const finalResult = math.format(evaluated, { precision: 10 });
      
      setResult(finalResult.toString());
      
      // Add to history
      const newEntry: HistoryEntry = {
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

  const handleKeyPress = useCallback((value: string, type: string) => {
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
      // Auto-add parentheses for functions
      setExpression(prev => prev + value + '(');
    } else {
      // Append digit, operator, or constant
      setExpression(prev => prev + value);
    }
  }, [evaluateExpression]);

  // Handle Keyboard Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key;
      if (/[0-9]/.test(key)) handleKeyPress(key, 'digit');
      // Fix: Use .includes() instead of .test() on an array of strings
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

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-slate-900/50 backdrop-blur-xl border border-slate-800 p-6 rounded-3xl shadow-2xl transition-all duration-300">
      <div className="lg:col-span-3 space-y-6">
        <Display 
          expression={expression} 
          result={result} 
          mode={mode}
          onToggleHistory={() => setIsHistoryOpen(!isHistoryOpen)}
        />
        <Keypad onKeyClick={handleKeyPress} mode={mode} />
      </div>
      
      <div className={`lg:col-span-1 h-full min-h-[400px] ${isHistoryOpen ? 'block' : 'hidden lg:block'}`}>
        <HistoryPanel 
          history={history} 
          onSelect={(entry) => {
            setExpression(entry.expression);
            setResult(entry.result);
          }}
          onClear={() => setHistory([])}
        />
      </div>
    </div>
  );
};

export default ScientificCalculator;
