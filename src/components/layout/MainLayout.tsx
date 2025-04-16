// import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';

const MainLayout = () => {
  const navLinks = [ 
    { name: 'Home', path: '/' },
    { name: 'Book Now', path: '/booking' },
    { name: 'Calendar', path: '/calendar' },
    { name: 'Dashboard', path: '/dashboard' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50">
      {/* Header */}
      <header className="bg-white border-b border-neutral-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <NavLink to="/" className="flex items-center">
                <span className="font-display text-2xl font-bold text-primary-600">Zenya</span>
              </NavLink>
            </div>
            
            {/* Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    classNames(
                      'px-1 py-2 text-sm font-medium transition-colors duration-150 relative',
                      isActive
                        ? 'text-primary-600'
                        : 'text-neutral-600 hover:text-primary-600'
                    )
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-500"
                          layoutId="navbar-indicator"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
            
            {/* Mobile menu button */}
            <div className="flex md:hidden">
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 rounded-md text-neutral-500 hover:text-primary-600 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={window.location.pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="min-h-[calc(100vh-4rem)]"
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      
      {/* Footer */}
      <footer className="bg-white border-t border-neutral-200 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="font-display text-xl font-bold text-primary-600">Zenya</span>
              <p className="text-sm text-neutral-500 mt-1">Effortless Appointments. Elegant Experience.</p>
            </div>
            <div className="flex space-x-6">
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors duration-150">
                Terms
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors duration-150">
                Privacy
              </a>
              <a href="#" className="text-neutral-500 hover:text-primary-600 transition-colors duration-150">
                Contact
              </a>
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-neutral-200 text-center text-sm text-neutral-500">
            &copy; {new Date().getFullYear()} Zenya. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;