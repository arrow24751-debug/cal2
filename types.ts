
export type HistoryEntry = {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
};

export enum CalcMode {
  DEG = 'DEG',
  RAD = 'RAD'
}

export type ButtonConfig = {
  label: string;
  value: string;
  type: 'digit' | 'operator' | 'function' | 'action' | 'constant';
  variant?: 'primary' | 'secondary' | 'accent' | 'danger';
  span?: number;
};
