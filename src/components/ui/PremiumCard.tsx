import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface PremiumCardProps {
  children: ReactNode;
  className?: string;
  glowColor?: string;
  borderColor?: string;
  hoverScale?: number;
  hoverY?: number;
}

export const PremiumCard: React.FC<PremiumCardProps> = ({
  children,
  className,
  glowColor = "rgba(86, 87, 246, 0.15)",
  borderColor = "#232329",
  hoverScale = 1.02,
  hoverY = -8,
}) => {
  return (
    <motion.div
      className={cn(
        "relative rounded-lg overflow-hidden transform-gpu",
        className
      )}
      whileHover={{ 
        y: hoverY,
        scale: hoverScale,
        boxShadow: "0 20px 60px -12px rgba(0, 0, 0, 0.2)"
      }}
      transition={{ 
        type: "spring", 
        stiffness: 300, 
        damping: 20 
      }}
    >
      {/* Glow effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
        style={{ 
          background: `radial-gradient(circle at center, ${glowColor} 0%, transparent 70%)`,
          filter: "blur(20px)"
        }}
      />
      
      {/* Subtle border gradient */}
      <div className="p-px rounded-lg bg-gradient-to-br from-[#2a2a30] via-[#323238] to-[#232329]">
        <div className="bg-[#151518] rounded-lg relative z-10 h-full">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// Special version for service cards
export const ServiceCard: React.FC<{
  children: ReactNode;
  color?: string;
  className?: string;
}> = ({
  children,
  color = "#5657F6",
  className
}) => {
  return (
    <PremiumCard 
      className={cn("h-full group", className)}
      glowColor={`${color}30`}
    >
      <div className="relative h-full">
        {/* Top indicator line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-0.5 group-hover:h-1 transition-all duration-300" 
          style={{ backgroundColor: color }}
        />
        
        <div className="p-6 h-full flex flex-col">
          {children}
        </div>
      </div>
    </PremiumCard>
  );
};