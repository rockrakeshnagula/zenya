import { ReactNode, forwardRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { cn } from '../../utils/cn';

interface LayerTransitionProps {
  children: ReactNode;
  className?: string;
  bgClassName?: string;
  offset?: number;
  zIndex?: number;
  translateY?: number;
  scrollOpacityRange?: [number, number]; 
  scrollYRange?: [number, number];
  bgColor?: string;
}

/**
 * A component that creates the Linear-style scroll-driven layer transition effect
 * where sections slide over one another with a depth effect.
 */
export const LayerTransition = forwardRef<HTMLDivElement, LayerTransitionProps>(({
  children,
  className,
  bgClassName,
  offset = 100, // How much to offset from previous section
  zIndex = 10,
  translateY = -120, // Controls how much the layer moves up
  scrollOpacityRange = [0, 0.15],
  scrollYRange = [0, 0.4],
  bgColor = "#0A0A0B",
}, ref) => {
  const { scrollYProgress } = useScroll();
  
  // Animation values based on scroll position
  const sectionY = useTransform(scrollYProgress, scrollYRange, [offset, translateY]);
  const overlayOpacity = useTransform(scrollYProgress, scrollOpacityRange, [0.6, 0]);
  const shadowOpacity = useTransform(scrollYProgress, scrollYRange, [0.25, 0.15]);
  
  return (
    <motion.div 
      ref={ref}
      className={cn("relative", className)}
      style={{
        zIndex,
      }}
    >
      {/* Gradient overlay with parallax effect */}
      <motion.div
        className="absolute left-0 right-0 bottom-full h-[70vh] pointer-events-none"
        style={{
          opacity: overlayOpacity,
          background: `linear-gradient(to bottom, transparent, ${bgColor})`,
        }}
      />
      
      {/* Main layer with shadow effect */}
      <motion.div
        className={cn("relative w-full", bgClassName)}
        style={{
          y: sectionY,
          backgroundImage: `linear-gradient(to bottom, ${bgColor}, ${bgColor})`,
          borderTopLeftRadius: '24px',
          borderTopRightRadius: '24px',
          boxShadow: `0 -10px 30px -5px rgba(0, 0, 0, ${shadowOpacity})`,
        }}
      >
        {/* Top edge glowing line */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#232329] opacity-60" />
        
        {/* Content */}
        <div className="overflow-visible">
          {children}
        </div>
      </motion.div>
    </motion.div>
  );
});

LayerTransition.displayName = 'LayerTransition';

/**
 * A component that creates a sticky section with scroll-based animations
 */
export const StickyLayerSection = forwardRef<HTMLElement, {
  children: ReactNode;
  className?: string;
  zIndex?: number;
  start?: string; // ViewportValue like '0px'
  end?: string;   // ViewportValue like '100vh'
}>(({
  children,
  className,
  zIndex = 10,
  // start = 'top top',
  // end = '100% top',
}, ref) => {
  return (
    <motion.section
      ref={ref}
      className={cn("relative min-h-screen", className)}
      style={{ zIndex }}
    >
      {children}
    </motion.section>
  );
});

StickyLayerSection.displayName = 'StickyLayerSection';