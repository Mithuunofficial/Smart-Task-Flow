import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'purple' | 'blue' | 'cyan' | 'pink' | 'none';
  onClick?: () => void;
}

export const GlassCard: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  glowColor = 'purple',
  onClick 
}) => {
  const glowClasses = {
    purple: 'hover:border-brand-purple/40 hover:shadow-brand-purple/20 shadow-2xl',
    blue: 'hover:border-brand-blue/40 hover:shadow-brand-blue/20 shadow-2xl',
    cyan: 'hover:border-brand-cyan/40 hover:shadow-brand-cyan/20 shadow-2xl',
    pink: 'hover:border-brand-pink/40 hover:shadow-brand-pink/20 shadow-2xl',
    none: 'hover:border-white/10'
  };

  return (
    <motion.div
      whileHover={{ y: onClick ? -4 : 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={onClick}
      className={`glass-panel rounded-2xl p-6 transition-all duration-300 border border-white/5 ${onClick ? 'cursor-pointer' : ''} ${glowClasses[glowColor]} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;
