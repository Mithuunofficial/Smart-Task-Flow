import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

interface ButtonProps extends HTMLMotionProps<'button'> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  ...props
}) => {
  const baseStyle = "inline-flex items-center justify-center font-semibold rounded-xl cursor-pointer transition-all duration-200 select-none active:scale-[0.98]";
  
  const variants = {
    primary: "text-white bg-gradient-to-r from-brand-purple to-indigo-600 shadow-md shadow-brand-purple/20 hover:scale-[1.02] hover:shadow-brand-purple/30",
    secondary: "text-slate-300 bg-white/5 border border-white/5 hover:bg-white/10 hover:text-white hover:border-white/10",
    danger: "text-rose-400 bg-rose-500/10 border border-rose-500/10 hover:bg-rose-500/20 hover:border-rose-500/20",
    ghost: "text-slate-400 hover:text-white hover:bg-white/5 border border-transparent"
  };

  const sizes = {
    sm: "px-3 py-1.5 text-[10px]",
    md: "px-4 py-2.5 text-xs",
    lg: "px-6 py-3.5 text-sm"
  };

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      className={`${baseStyle} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
