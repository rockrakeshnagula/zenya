import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../utils/cn';

interface BackgroundGradientProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
  interactive?: boolean; 
  gradientOpacity?: number;
  gradientPrimary?: string;
  gradientSecondary?: string;
  gradientTertiary?: string;
  borderOpacity?: number;
  borderColor?: string;
  blurStrength?: number;
}

export const BackgroundGradient: React.FC<BackgroundGradientProps> = ({
  children,
  className,
  containerClassName,
  animate = true,
  interactive = true,
  gradientOpacity = 0.6,
  gradientPrimary,
  gradientSecondary,
  gradientTertiary,
  borderOpacity = 0.1,
  borderColor = "rgba(255, 255, 255, 0.1)",
  blurStrength = 20,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const gradientRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  
  // Handle mouse move for interactive gradient
  useEffect(() => {
    if (!animate || !interactive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !gradientRef.current) return;
      
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      
      // Calculate mouse position relative to container
      const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
      const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
      
      setPosition({ x, y });
    };
    
    // Handle mousemove only when container is hovered
    if (isHovered) {
      window.addEventListener('mousemove', handleMouseMove);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [animate, interactive, isHovered]);
  
  // Set CSS variables for gradient colors
  const gradientStyle = {
    '--gradient-primary': gradientPrimary || 'var(--gradient-primary, rgba(86, 87, 246, 0.3))',
    '--gradient-secondary': gradientSecondary || 'var(--gradient-secondary, rgba(152, 129, 252, 0.2))',
    '--gradient-tertiary': gradientTertiary || 'var(--gradient-tertiary, rgba(47, 162, 224, 0.1))',
  } as React.CSSProperties;
  
  return (
    <div 
      ref={containerRef}
      className={cn("relative overflow-hidden rounded-xl p-px", containerClassName)}
      style={gradientStyle}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Animated border gradient */}
      <motion.div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `linear-gradient(to right, ${borderColor}, transparent, ${borderColor})`,
          opacity: borderOpacity,
        }}
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      {/* Main gradient background */}
      <motion.div
        ref={gradientRef}
        className="absolute inset-0 rounded-[inherit]"
        style={{
          backgroundImage: `radial-gradient(
            circle at ${interactive && isHovered ? `${position.x}% ${position.y}%` : '50% 50%'}, 
            var(--gradient-primary) 0%, 
            var(--gradient-secondary) 25%, 
            var(--gradient-tertiary) 50%, 
            transparent 80%
          )`,
          opacity: gradientOpacity,
          filter: `blur(${blurStrength}px)`,
        }}
        animate={animate ? {
          opacity: [gradientOpacity * 0.8, gradientOpacity, gradientOpacity * 0.8],
        } : {}}
        transition={{
          duration: 4,
          repeat: Infinity,
          repeatType: 'reverse',
        }}
      />
      
      {/* Inner content container */}
      <div className={cn(
        "relative z-10 rounded-[inherit] bg-[#151518] dark:bg-gray-950", 
        className
      )}>
        {children}
      </div>
    </div>
  );
};