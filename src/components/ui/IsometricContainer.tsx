import React, { ReactNode } from 'react';
import { motion, useScroll, useTransform, } from 'framer-motion';
import { cn } from '../../utils/cn';

interface IsometricContainerProps {
  children: ReactNode;
  className?: string;
  shadowOpacity?: number;
  perspective?: number; 
  rotateX?: number;
  rotateY?: number;
  parallax?: boolean;
  parallaxIntensity?: number;
}

export const IsometricContainer: React.FC<IsometricContainerProps> = ({
  children,
  className,
  shadowOpacity = 0.2,
  perspective = 800,
  rotateX = -12,
  rotateY = 12,
  parallax = true,
  parallaxIntensity = 0.05,
}) => {
  const { scrollYProgress } = useScroll();
  
  // Create motion values for parallax effect
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${40 * parallaxIntensity}%`]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 5 * parallaxIntensity]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.05, 1.1]);
  
  return (
    <div className={cn("relative", className)}>
      <motion.div
        style={{
          perspective: `${perspective}px`,
          y: parallax ? y : 0,
          scale: parallax ? scale : 1,
        }}
        className="w-full relative"
      >
        {/* Shadow element */}
        <motion.div
          className="absolute inset-0 rounded-lg opacity-70 blur-xl"
          style={{
            backgroundColor: `rgba(0, 0, 0, ${shadowOpacity})`,
            transform: `translateY(40px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.9)`,
            filter: "blur(20px)",
          }}
        />
        
        {/* Main content with isometric transform */}
        <motion.div
          className="relative w-full overflow-hidden"
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            rotate: parallax ? rotate : 0,
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
};

// Overlay dots that float on top of the isometric container
export const FloatingOverlayElement: React.FC<{
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  color?: string;
  size?: string;
}> = ({ 
  className, 
  delay = 0,
  x = 0,
  y = 0,
  color = "#5657F6",
  size = "w-2 h-2" 
}) => {
  return (
    <motion.div
      className={cn(
        "absolute rounded-full z-10",
        size,
        className
      )}
      style={{ 
        backgroundColor: color,
        top: `${y}%`,
        left: `${x}%`,
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: [0.4, 0.8, 0.4],
        y: [0, -15, 0]
      }}
      transition={{
        duration: 5,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    />
  );
};

// Floating UI element that appears to be part of the interface
export const FloatingUIElement: React.FC<{
  className?: string;
  delay?: number;
  x?: number;
  y?: number;
  rotate?: number;
  children: ReactNode;
}> = ({ 
  className, 
  delay = 0,
  x = 0,
  y = 0,
  rotate = 0,
  children 
}) => {
  return (
    <motion.div
      className={cn(
        "absolute z-20 rounded-lg bg-[#151518] border border-[#232329] shadow-lg",
        className
      )}
      style={{ 
        top: `${y}%`,
        left: `${x}%`,
        rotate: `${rotate}deg`,
      }}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: 1,
        y: [0, -10, 0],
        scale: [0.95, 1, 0.95]
      }}
      transition={{
        duration: 8,
        delay: delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
    >
      {children}
    </motion.div>
  );
};