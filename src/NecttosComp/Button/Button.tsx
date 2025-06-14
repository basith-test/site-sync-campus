
import React from 'react';

interface ButtonProps {
  type?: 'save' | 'edit' | 'delete' | 'close';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  loader?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  type = 'save', 
  onClick, 
  children, 
  className = '',
  loader = false 
}) => {
  const baseClasses = "px-3 py-1.5 rounded text-sm font-medium transition-colors";
  
  const typeClasses = {
    save: "bg-blue-600 text-white hover:bg-blue-700",
    edit: "bg-slate-100 text-slate-700 hover:bg-slate-200",
    delete: "bg-red-100 text-red-700 hover:bg-red-200",
    close: "bg-slate-100 text-slate-700 hover:bg-slate-200"
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${typeClasses[type]} ${className}`}
      disabled={loader}
    >
      {loader ? 'Loading...' : children}
    </button>
  );
};

export default Button;
