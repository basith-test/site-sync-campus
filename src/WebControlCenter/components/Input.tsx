
import React from 'react';

interface InputProps {
  type: string;
  fieldName: string;
  state: string;
  setState: (value: string) => void;
  width?: string;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({ 
  type, 
  fieldName, 
  state, 
  setState, 
  width = '100%', 
  placeholder 
}) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2 dark:text-white">
        {fieldName}
      </label>
      <input
        type={type}
        value={state}
        onChange={(e) => setState(e.target.value)}
        placeholder={placeholder || fieldName}
        style={{ width }}
        className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white"
      />
    </div>
  );
};

export default Input;
