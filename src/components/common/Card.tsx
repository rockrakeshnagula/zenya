import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  elevation?: 'none' | 'sm' | 'md' | 'lg';
  padding?: 'none' | 'sm' | 'md' | 'lg';
  border?: boolean;
  onClick?: () => void;
}

const Card = ({
  children,
  className,
  interactive = false,
  elevation = 'md',
  padding = 'md',
  border = true,
  onClick,
}: CardProps) => {
  const getPaddingClasses = (padding: string) => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'sm':
        return 'p-3';
      case 'md':
        return 'p-5';
      case 'lg':
        return 'p-6';
      default:
        return 'p-5';
    }
  };

  const getElevationClasses = (elevation: string) => {
    switch (elevation) {
      case 'none':
        return '';
      case 'sm':
        return 'shadow-sm';
      case 'md':
        return 'shadow-soft';
      case 'lg':
        return 'shadow-premium';
      default:
        return 'shadow-soft';
    }
  };

  const cardClasses = classNames(
    'rounded-2xl',
    'bg-white',
    getPaddingClasses(padding),
    getElevationClasses(elevation),
    border && 'border border-neutral-200',
    interactive && 'cursor-pointer transition-all duration-300 hover:shadow-premium',
    className
  );

  const cardContent = interactive ? (
    <motion.div
      className={cardClasses}
      whileHover={{ y: -2, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      {children}
    </motion.div>
  ) : (
    <div className={cardClasses}>
      {children}
    </div>
  );

  return cardContent;
};

export default Card;