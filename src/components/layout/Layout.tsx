import React, { ReactNode, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { useHeader } from '../../context/HeaderContext';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../utils/cn';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isTransparent } = useHeader();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const { scrollY } = useScroll();
  
  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  // Handle scroll behavior for header visibility
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
  
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden bg-[#0A0A0B]">
      <motion.header 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isTransparent 
            ? "bg-transparent backdrop-blur-md bg-[#0A0A0B]/20" 
            : "bg-[#0A0A0B]/80 backdrop-blur-md border-b border-[#232329]/60",
          !visible && "transform -translate-y-full"
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
                  className={cn(
                    "text-[#a0a0a0] hover:text-white text-sm font-medium transition-colors duration-200",
                    location.pathname === item.href && "text-white"
                  )}
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
                <motion.div
                  initial={false}
                  animate={isMobileMenuOpen ? "open" : "closed"}
                  className="w-6 h-6 relative"
                >
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: 45, y: 8 }
                    }}
                    className="absolute h-0.5 w-6 bg-white rounded-sm top-1"
                  />
                  <motion.span
                    variants={{
                      closed: { opacity: 1 },
                      open: { opacity: 0 }
                    }}
                    className="absolute h-0.5 w-6 bg-white rounded-sm top-3"
                  />
                  <motion.span
                    variants={{
                      closed: { rotate: 0, y: 0 },
                      open: { rotate: -45, y: -8 }
                    }}
                    className="absolute h-0.5 w-6 bg-white rounded-sm top-5"
                  />
                </motion.div>
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
                    className={cn(
                      "block text-[#a0a0a0] hover:text-white text-sm font-medium transition-colors duration-200",
                      location.pathname === item.href && "text-white"
                    )}
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
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
};

export default Layout;