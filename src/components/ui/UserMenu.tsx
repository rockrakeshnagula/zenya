import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';

const UserMenu: React.FC = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if we're clicking outside the menu AND the menu is open
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    // Use capture phase to ensure this handler runs before others
    document.addEventListener('mousedown', handleClickOutside, true);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside, true);
    };
  }, [isOpen]); // Add isOpen as a dependency to prevent unnecessary checks

  // Menu animation variants
  const menuVariants = {
    hidden: { opacity: 0, y: 10, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        type: 'spring',
        stiffness: 400,
        damping: 25
      }
    },
    exit: { 
      opacity: 0, 
      y: 10, 
      scale: 0.95,
      transition: { 
        duration: 0.2
      }
    }
  };

  // Handle click on menu toggle
  const handleMenuToggle = (e: React.MouseEvent) => {
    // Stop event from propagating to prevent other handlers from firing
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link 
          to="/login"
          className="text-[#a0a0a0] hover:text-white text-sm transition-colors duration-200"
        >
          Sign In
        </Link>
        <Link 
          to="/register"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="bg-[#5657F6] hover:bg-[#6E6EF7] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Register
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={handleMenuToggle}
        className="flex items-center space-x-2 rounded-full p-1 focus:outline-none focus:ring-1 focus:ring-[#5657F6]"
      >
        <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-[#5657F6] to-[#9881fc] flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {user?.name.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="text-white hidden md:inline-block max-w-[100px] truncate">{user?.name}</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-4 w-4 text-[#a0a0a0] transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute right-0 mt-2 w-48 bg-[#151518] border border-[#2c2c31] rounded-lg shadow-lg py-1 z-[100]"
            onClick={(e) => e.stopPropagation()} // Prevent clicks inside menu from closing it
          >
            <div className="px-4 py-2 border-b border-[#2c2c31]">
              <p className="text-sm font-medium text-white">{user?.name}</p>
              <p className="text-xs text-[#a0a0a0] truncate">{user?.email}</p>
            </div>
            
            <div className="py-1">
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-[#dcdcdc] hover:bg-[#1E1E25] hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Dashboard
              </Link>
              <Link
                to="/booking"
                className="block px-4 py-2 text-sm text-[#dcdcdc] hover:bg-[#1E1E25] hover:text-white transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Book Appointment
              </Link>
              {user?.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-[#dcdcdc] hover:bg-[#1E1E25] hover:text-white transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
            </div>
            
            <div className="py-1 border-t border-[#2c2c31]">
              <button
                onClick={() => {
                  setIsOpen(false);
                  logout();
                }}
                className="block w-full text-left px-4 py-2 text-sm text-[#dcdcdc] hover:bg-[#1E1E25] hover:text-white transition-colors"
              >
                Sign Out
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UserMenu;