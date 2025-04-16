import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { useHeader } from '../../context/HeaderContext';
import { cn } from '../../utils/cn';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  const { isTransparent } = useHeader();
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll behavior
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      setVisible(
        (prevScrollPos > currentScrollPos) || // Scrolling up
        currentScrollPos < 10 || // At the top
        isMobileMenuOpen // Menu is open
      );
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos, visible, isMobileMenuOpen]);
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  return (
    <motion.header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        isTransparent ? "bg-transparent" : "bg-[#0A0A0B]/80 border-b border-[#232329]/60",
        !visible && "transform -translate-y-full",
        className
      )}
      animate={{
        y: visible ? 0 : -100,
      }}
      transition={{ duration: 0.3 }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <motion.span 
              className="font-display font-bold text-white text-xl"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              Zenya
            </motion.span>
          </Link>
          
          {/* Navigation - Desktop */}
          <nav className="hidden md:flex space-x-8">
            {[
              { label: 'Home', href: '/' },
              { label: 'Calendar', href: '/calendar' },
              { label: 'Dashboard', href: '/dashboard' },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-[#a0a0a0] hover:text-white text-sm font-medium transition-colors duration-200"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* CTA Button & Mobile Menu Toggle */}
          <div className="flex items-center">
            <Link to="/booking">
              <motion.button
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-[#5657F6] hover:bg-[#6E6EF7] text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200"
              >
                Book Now
              </motion.button>
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="ml-4 md:hidden text-white"
              onClick={toggleMobileMenu}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#0A0A0B] border-b border-[#232329]"
          >
            <div className="px-4 py-5 space-y-3">
              {[
                { label: 'Home', href: '/' },
                { label: 'Calendar', href: '/calendar' },
                { label: 'Dashboard', href: '/dashboard' },
              ].map((item) => (
                <Link
                  key={item.label}
                  to={item.href}
                  className="block text-[#a0a0a0] hover:text-white text-sm font-medium transition-colors duration-200"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;