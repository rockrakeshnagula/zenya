import React, { InputHTMLAttributes, useState } from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const Input = ({
  className,
  label,
  error,
  helperText,
  leadingIcon,
  trailingIcon,
  fullWidth = true,
  ...props
}: InputProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    if (props.onFocus) {
      props.onFocus(e);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    if (props.onBlur) {
      props.onBlur(e);
    }
  };

  const containerClasses = classNames(
    'flex flex-col',
    fullWidth && 'w-full',
    className
  );

  const inputWrapperClasses = classNames(
    'relative flex items-center overflow-hidden rounded-xl border transition-all duration-200',
    error
      ? 'border-red-500 focus-within:border-red-500 focus-within:ring-2 focus-within:ring-red-500/20'
      : 'border-neutral-300 focus-within:border-primary-500 focus-within:ring-2 focus-within:ring-primary-500/20',
    isFocused && !error && 'border-primary-500',
    leadingIcon && 'pl-2',
    trailingIcon && 'pr-2'
  );

  const inputClasses = classNames(
    'block w-full border-0 py-2.5 px-3 text-neutral-900 placeholder:text-neutral-400 focus:ring-0 sm:text-sm sm:leading-6 bg-transparent',
    leadingIcon && 'pl-2',
    trailingIcon && 'pr-2'
  );

  return (
    <div className={containerClasses}>
      {label && (
        <label
          htmlFor={props.id}
          className="mb-1.5 block text-sm font-medium text-neutral-700"
        >
          {label}
        </label>
      )}
      
      <motion.div
        className={inputWrapperClasses}
        initial={{ scale: 1 }}
        animate={{ scale: isFocused ? 1.01 : 1 }}
        transition={{ duration: 0.2 }}
      >
        {leadingIcon && <div className="text-neutral-500">{leadingIcon}</div>}
        <input
          className={inputClasses}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {trailingIcon && <div className="text-neutral-500">{trailingIcon}</div>}
      </motion.div>
      
      {(error || helperText) && (
        <p
          className={classNames(
            'mt-1.5 text-sm',
            error ? 'text-red-500' : 'text-neutral-500'
          )}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;