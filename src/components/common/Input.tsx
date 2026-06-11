import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  ...props
}) => {
  return (
    <div className="space-y-1.5 text-left w-full">
      {label && (
        <label className="text-xs font-semibold text-slate-300 block">
          {label}
        </label>
      )}
      <input
        className={`w-full px-3 py-2 text-xs rounded-xl bg-white/5 border border-white/5 hover:border-white/10 focus:border-brand-purple/50 focus:ring-1 focus:ring-brand-purple/50 focus:outline-none transition-all placeholder-slate-600 text-white ${
          error ? 'border-rose-500/50 focus:border-rose-500/50 focus:ring-rose-500/50' : ''
        } ${className}`}
        {...props}
      />
      {error && (
        <span className="text-[10px] text-rose-400 font-semibold block mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
