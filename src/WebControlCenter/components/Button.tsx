
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'save' | 'edit' | 'delete' | 'primary' | 'secondary';
  className?: string;
  loader?: boolean;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  onClick, 
  type = 'primary', 
  className = '', 
  loader = false,
  disabled = false 
}) => {
  const getButtonStyles = () => {
    switch (type) {
      case 'save':
        return 'bg-green-600 hover:bg-green-700 text-white';
      case 'edit':
        return 'bg-blue-600 hover:bg-blue-700 text-white';
      case 'delete':
        return 'bg-red-600 hover:bg-red-700 text-white';
      case 'secondary':
        return 'bg-slate-200 hover:bg-slate-300 text-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 dark:text-white';
      default:
        return 'bg-blue-600 hover:bg-blue-700 text-white';
    }
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled || loader}
      className={`px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 ${getButtonStyles()} ${className}`}
    >
      {loader ? (
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          <span>Loading...</span>
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
