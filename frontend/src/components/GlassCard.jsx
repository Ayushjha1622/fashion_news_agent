import React from 'react';
import { motion } from 'framer-motion';

export default function GlassCard({ children, className = "", noHover = false, ...props }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`glass-card rounded-xl ${!noHover ? 'hover:border-outline hover:bg-surface-container transition-colors cursor-default' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
