import React, { ButtonHTMLAttributes } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost';
type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  isFullWidth?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

const Button = ({
  children,
  className,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leadingIcon,
  trailingIcon,
  disabled,
  ...props
}: ButtonProps) => {
  const getVariantClasses = (variant: ButtonVariant) => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500';
      case 'secondary':
        return 'bg-secondary-600 text-white hover:bg-secondary-700 focus:ring-secondary-500';
      case 'outline':
        return 'border border-neutral-300 bg-white text-neutral-700 hover:bg-neutral-50 focus:ring-primary-500';
      case 'ghost':
        return 'bg-transparent text-neutral-700 hover:bg-neutral-100 focus:ring-primary-500';
      default:
        return 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500';
    }
  };

  const getSizeClasses = (size: ButtonSize) => {
    switch (size) {
      case 'xs':
        return 'py-1 px-2 text-xs';
      case 'sm':
        return 'py-1.5 px-3 text-sm';
      case 'md':
        return 'py-2 px-4 text-sm';
      case 'lg':
        return 'py-2.5 px-5 text-base';
      case 'xl':
        return 'py-3 px-6 text-lg';
      default:
        return 'py-2 px-4 text-sm';
    }
  };

  const buttonClasses = classNames(
    'inline-flex items-center justify-center rounded-xl font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none gap-2',
    getVariantClasses(variant),
    getSizeClasses(size),
    isFullWidth && 'w-full',
    className
  );
  
  // Using a regular button instead of motion.button to avoid type conflicts
  return (
    <button
      className={buttonClasses}
      disabled={isLoading || disabled}
      {...props}
    >
      <motion.div
        whileTap={{ scale: 0.98 }}
        whileHover={{ scale: 1.01 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className="flex items-center justify-center w-full h-full"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-2 h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Loading...
          </>
        ) : (
          <>
            {leadingIcon && <span>{leadingIcon}</span>}
            {children}
            {trailingIcon && <span>{trailingIcon}</span>}
          </>
        )}
      </motion.div>
    </button>
  );
};

export default Button;