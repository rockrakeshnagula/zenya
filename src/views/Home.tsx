import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useBooking } from '../context/BookingContext';
import { useHeader } from '../context/HeaderContext';
import { IsometricContainer, FloatingOverlayElement, FloatingUIElement } from '../components/ui/IsometricContainer';
import { BackgroundGradient } from '../components/ui/BackgroundGradient';
import { PremiumCard, ServiceCard } from '../components/ui/PremiumCard';
import { cn } from '../utils/cn';

const Home: React.FC = () => {
  const { services } = useBooking();
  const { setIsTransparent } = useHeader();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Set header to transparent when we're at the top of the page
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = heroRef.current?.offsetHeight || 0;
      setIsTransparent(window.scrollY < heroHeight * 0.7);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [setIsTransparent]);
  
  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24
      }
    }
  };

  // Scroll animations
  const { scrollYProgress } = useScroll();
  
  // Parallax values for hero section
  const heroY = useTransform(scrollYProgress, [0, 0.5], ['0%', '50%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);
  const blurStrength = useTransform(scrollYProgress, [0, 0.25], [0, 20]);
  
  // Subtle float animation for decorative elements
  const floatAnimation = {
    y: [0, -10, 0],
    transition: { 
      duration: 6,
      repeat: Infinity, 
      ease: "easeInOut" 
    }
  };

  return (
    <div className="relative bg-[#0A0A0B] text-white overflow-hidden">
      {/* Linear-inspired grid background pattern */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 opacity-[0.03]" 
          style={{
            backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), 
                            linear-gradient(to bottom, #888 1px, transparent 1px)`,
            backgroundSize: '40px 40px'
          }}>
        </div>
        
        {/* Subtle noise texture for depth */}
        <div className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            backgroundSize: '150px 150px'
          }}
        />
      </div>
      
      {/* Hero Section - Linear-inspired */}
      <section ref={heroRef} className="relative pt-28 pb-40 px-4 sm:px-6 lg:px-8 overflow-hidden min-h-screen flex flex-col items-center">
  {/* Linear-inspired subtle gradients */}
  <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
    {/* Enhanced Linear's signature gradient spheres with better parallax */}
    <motion.div 
      className="absolute top-0 left-[10%] w-[600px] h-[600px] rounded-full opacity-20"
      style={{ 
        background: "radial-gradient(circle, rgba(138, 43, 226, 0.2) 0%, rgba(138, 43, 226, 0.1) 30%, transparent 70%)",
        filter: "blur(60px)",
        y: useTransform(scrollYProgress, [0, 1], [0, 200]),
      }}
      animate={{ 
        scale: [0.8, 1, 0.8]
      }}
      transition={{ 
        duration: 20, 
        repeat: Infinity,
        ease: "easeInOut" 
      }}
    />
    <motion.div 
      className="absolute -top-[200px] right-[5%] w-[500px] h-[500px] rounded-full opacity-20"
      style={{ 
        background: "radial-gradient(circle, rgba(50, 152, 219, 0.2) 0%, rgba(50, 152, 219, 0.1) 30%, transparent 70%)",
        filter: "blur(60px)",
        y: useTransform(scrollYProgress, [0, 1], [0, 150]),
      }}
      animate={{ 
        scale: [1, 0.9, 1]
      }}
      transition={{ 
        duration: 15, 
        repeat: Infinity,
        ease: "easeInOut",
        delay: 1
      }}
    />
  </div>

  <motion.div 
    className="container mx-auto max-w-5xl mb-24"
    style={{
      y: heroY,
      opacity: heroOpacity,
    }}
  >
    <div className="flex flex-col items-center justify-center text-center">
      {/* Linear-inspired tag/badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        className="mb-8 relative"
      >
        <span className="px-3 py-1.5 rounded-full text-[#A3A3A3] text-xs font-medium border border-[#313035] bg-[#131316]">
          Modern Scheduling Platform
        </span>
      </motion.div>
      
      {/* Linear-inspired minimalist heading */}
      <motion.div
        className="mb-6 relative w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl sm:text-6xl md:text-7xl font-display font-bold tracking-tight text-white leading-[1.1]"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="block"
          >
            Effortless
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#3a7bd5] to-[#7e77fc]">
              {" "}Appointments
            </span>
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="block mt-2"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#7e77fc] to-[#c977fc]">
              Elegant
            </span>
            {" "}Experience
          </motion.span>
        </motion.h1>
      </motion.div>
      
      {/* Linear-inspired subtitle with muted color */}
      <motion.p 
        className="max-w-2xl mx-auto mt-6 text-[#a0a0a0] text-xl leading-relaxed"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
      >
        Zenya is a beautifully crafted appointment booking app built for modern professionals 
        and businesses—designed for simplicity, speed, and total clarity.
      </motion.p>
      
      {/* Linear-inspired CTA Buttons with distinctive subtle hover effects */}
      <motion.div 
        className="mt-12 flex flex-col sm:flex-row gap-5 justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.9 }}
      >
        <Link to="/booking">
          <motion.div 
            whileHover={{ y: -2 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              size="lg" 
              className="bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-lg px-8 py-3 text-sm font-medium transition-all duration-200"
            >
              Book Now
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                initial={{ x: 0 }}
                animate={{ x: 0 }}
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </motion.svg>
            </Button>
          </motion.div>
        </Link>
        
        <Link to="/calendar">
          <motion.div 
            whileHover={{ y: -2 }} 
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              variant="outline" 
              size="lg" 
              className="text-[#dcdcdc] bg-transparent rounded-lg border border-[#33333e] hover:border-[#555562] px-8 py-3 text-sm font-medium transition-all duration-200"
            >
              View Calendar
            </Button>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  </motion.div>

  {/* Enhanced Linear-inspired isometric calendar preview card - moved down */}
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8, delay: 1.4 }}
    className="max-w-4xl mx-auto relative"
  >
    {/* Floating UI elements for 3D effect - positioned absolutely */}
    <FloatingOverlayElement x={-5} y={20} color="#5657F6" />
    <FloatingOverlayElement x={85} y={15} color="#9881fc" size="w-3 h-3" delay={1} />
    <FloatingOverlayElement x={75} y={85} color="#2fa2e0" delay={2} />
    <FloatingOverlayElement x={25} y={90} color="#5657F6" size="w-1.5 h-1.5" delay={3} />
    
    {/* Floating UI Elements */}
    <FloatingUIElement x={-8} y={30} delay={0.5} className="px-3 py-2">
      <div className="flex items-center space-x-2">
        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
        <span className="text-xs text-white">Online</span>
      </div>
    </FloatingUIElement>
    
    <FloatingUIElement x={85} y={75} delay={1.5} rotate={-5} className="px-3 py-2">
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#5657F6]" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
        <span className="text-xs text-white">New Booking</span>
      </div>
    </FloatingUIElement>
    
    <IsometricContainer
      className="w-full"
      perspective={2000}
      rotateX={-20}
      rotateY={12}
      parallax={true}
      parallaxIntensity={0.1}
    >
      <div className="relative">
        {/* Linear-inspired card with border and subtle gradient */}
        <div className="p-[1px] rounded-lg bg-gradient-to-r from-[#333] via-[#555] to-[#333]">
          <div className="rounded-lg bg-[#151518] border-[#222] overflow-hidden">
            {/* Calendar UI Preview with Linear styling */}
            <div className="p-8">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-medium text-xl text-white">April 2025</h3>
                  <p className="text-[#8c8c8c] text-sm">Your upcoming schedule</p>
                </div>
                <div className="flex space-x-2">
                  <motion.button 
                    className="p-1.5 rounded hover:bg-[#2a2a2e] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#a3a3a3]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  <motion.button 
                    className="p-1.5 rounded hover:bg-[#2a2a2e] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#a3a3a3]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
              </div>
              
              {/* Linear-styled calendar grid */}
              <div className="grid grid-cols-7 gap-1 text-center mb-4">
                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                  <div key={i} className="text-[#8c8c8c] font-medium text-xs py-2">{day}</div>
                ))}
                
                <div className="grid grid-cols-7 col-span-7 gap-1">
                  {Array.from({ length: 35 }).map((_, i) => {
                    // Highlight a few days to simulate events
                    const hasEvent = [8, 15, 22, 27].includes(i);
                    const isToday = i === 14;
                    
                    return (
                      <motion.div 
                        key={i} 
                        className={`
                          relative rounded p-2 text-xs aspect-square flex flex-col items-center justify-center cursor-pointer
                          ${isToday ? 'bg-[#22223b] text-white font-medium' : hasEvent ? 'hover:bg-[#1c1c21]' : 'hover:bg-[#1c1c21]'}
                          transition-all duration-200
                        `}
                        whileHover={{ 
                          scale: 1.05, 
                          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)" 
                        }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        {i < 31 ? i + 1 : ''}
                        {hasEvent && (
                          <motion.span 
                            className={`absolute bottom-1 w-1 h-1 rounded-full ${i === 27 ? 'bg-[#9881fc]' : 'bg-[#5657F6]'}`}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          />
                        )}
                      </motion.div>
                    );
                  })}
                </div>
              </div>
              
              {/* Linear-styled upcoming events list */}
              <div className="space-y-3 mt-6">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-[#a3a3a3]">Upcoming</h4>
                  <motion.button 
                    className="text-xs text-[#5657F6] font-medium flex items-center"
                    whileHover={{ x: 2 }}
                  >
                    View all
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </div>
                
                <motion.div 
                  className="p-3 rounded bg-[#1c1c21] border border-[#2c2c31] flex justify-between items-center"
                  whileHover={{ x: 2, backgroundColor: "#22222b" }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <p className="font-medium text-white">Premium Consultation</p>
                    <p className="text-xs text-[#8c8c8c]">Today, 2:00 PM</p>
                  </div>
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-[#5657F6]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                
                <motion.div 
                  className="p-3 rounded bg-[#1c1c21] border border-[#2c2c31] flex justify-between items-center"
                  whileHover={{ x: 2, backgroundColor: "#22222b" }}
                  transition={{ duration: 0.2 }}
                >
                  <div>
                    <p className="font-medium text-white">Executive Coaching</p>
                    <p className="text-xs text-[#8c8c8c]">Tomorrow, 10:00 AM</p>
                  </div>
                  <motion.span 
                    className="w-2 h-2 rounded-full bg-[#9881fc]"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </IsometricContainer>
  </motion.div>
</section>


      {/* Linear-inspired page divider - subtle line */}
      <div className="w-full h-px bg-[#232329] my-12 opacity-50" />

      {/* Features Section - Linear-inspired */}
   <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-[#0A0A0B]">
        {/* Linear-inspired subtle gradients and lighting */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Subtle dot pattern Linear-style */}
          <div className="absolute inset-0 opacity-[0.015]"
            style={{
              backgroundImage: `radial-gradient(#fff 1px, transparent 1px)`,
              backgroundSize: '30px 30px',
              backgroundPosition: '0 0'
            }}
          />
          
          {/* Linear-inspired subtle gradient blobs */}
          <motion.div 
            className="absolute right-0 top-[10%] w-[40%] h-[40%] rounded-full"
            style={{ 
              background: "radial-gradient(circle, rgba(86, 87, 246, 0.1) 0%, rgba(86, 87, 246, 0.05) 40%, transparent 70%)",
              filter: "blur(80px)" 
            }}
            animate={{ 
              x: [0, -20, 0],
              y: [0, 30, 0],
              opacity: [0.3, 0.4, 0.3]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          />
        </div>

        <div className="container mx-auto max-w-7xl">
          <motion.div 
            className="text-center mb-24"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[#A3A3A3] text-xs font-medium border border-[#313035] bg-[#131316]">
                <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
                Premium Experience
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-display font-bold tracking-tight mx-auto leading-tight max-w-3xl text-white"
            >
              Designed for Modern Professionals
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-xl text-[#a0a0a0] max-w-2xl mx-auto"
            >
              Everything you need to manage appointments with elegance and efficiency, wrapped in a beautiful interface that's a joy to use.
            </motion.p>
          </motion.div>

          {/* Linear-inspired Feature Cards - Enhanced with PremiumCard component */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <PremiumCard className="h-full group">
                <div className="p-6 h-full flex flex-col">
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1E1E25] text-[#5657F6] mb-6"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                    </svg>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-medium text-white mb-3 group-hover:text-[#5657F6] transition-colors duration-300"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    Interactive Calendar
                  </motion.h3>
                  
                  <p className="text-[#a0a0a0] leading-relaxed mb-6">
                    View and manage all your appointments with an intuitive, beautiful calendar interface designed for clarity and ease of use.
                  </p>
                  
                  <motion.a 
                    href="#"
                    className="inline-flex items-center text-[#5657F6] text-sm font-medium mt-auto"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
              </PremiumCard>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <PremiumCard className="h-full group" glowColor="rgba(152, 129, 252, 0.15)">
                <div className="p-6 h-full flex flex-col">
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1E1E25] text-[#9881fc] mb-6"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 9v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
                    </svg>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-medium text-white mb-3 group-hover:text-[#9881fc] transition-colors duration-300"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    Effortless Booking
                  </motion.h3>
                  
                  <p className="text-[#a0a0a0] leading-relaxed mb-6">
                    Streamlined booking flow with real-time availability checking and instant confirmations that keep everyone in sync.
                  </p>
                  
                  <motion.a 
                    href="#"
                    className="inline-flex items-center text-[#9881fc] text-sm font-medium mt-auto"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
              </PremiumCard>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              <PremiumCard className="h-full group" glowColor="rgba(47, 162, 224, 0.15)">
                <div className="p-6 h-full flex flex-col">
                  <motion.div 
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-[#1E1E25] text-[#2fa2e0] mb-6"
                    whileHover={{ 
                      scale: 1.05,
                      y: -2
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                    </svg>
                  </motion.div>
                  
                  <motion.h3 
                    className="text-xl font-medium text-white mb-3 group-hover:text-[#2fa2e0] transition-colors duration-300"
                    whileHover={{ x: 2 }}
                    transition={{ duration: 0.2 }}
                  >
                    Smart Management
                  </motion.h3>
                  
                  <p className="text-[#a0a0a0] leading-relaxed mb-6">
                    Track and manage all your appointments with powerful tools designed to give you complete control of your schedule.
                  </p>
                  
                  <motion.a 
                    href="#"
                    className="inline-flex items-center text-[#2fa2e0] text-sm font-medium mt-auto"
                    whileHover={{ x: 4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <span>Learn more</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.a>
                </div>
              </PremiumCard>
            </motion.div>
          </div>
          
          {/* Linear-inspired Stats Section */}
          <motion.div 
  className="mt-32"
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 1 }}
>
  <div className="rounded-lg bg-[#0A0A0B] border border-[#232329] overflow-hidden p-8 md:p-10">
    <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 z-10">
      <div className="text-center relative">
        <motion.div 
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <span className="text-5xl font-display font-bold text-white">
            98<span className="text-[#5657F6]">%</span>
          </span>
        </motion.div>
        <p className="text-[#8c8c8c] mt-2 text-sm">Customer satisfaction</p>
      </div>
      
      <div className="text-center relative">
        <motion.div 
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
        >
          <span className="text-5xl font-display font-bold text-white">
            15<span className="text-[#9881fc]">M+</span>
          </span>
        </motion.div>
        <p className="text-[#8c8c8c] mt-2 text-sm">Appointments booked</p>
      </div>
      
      <div className="text-center relative">
        <motion.div 
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <span className="text-5xl font-display font-bold text-white">
            5K<span className="text-[#2fa2e0]">+</span>
          </span>
        </motion.div>
        <p className="text-[#8c8c8c] mt-2 text-sm">Businesses transformed</p>
      </div>
    </div>
  </div>
</motion.div>

        </div>
      </section>

      {/* Linear-inspired page divider - subtle line */}
      <div className="w-full h-px bg-[#232329] my-12 opacity-50" />

      {/* Services Section - Linear-inspired with fixed card styling */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0A0A0B]">
        {/* Linear-inspired decorative background elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          {/* Linear-style subtle patterns */}
          <motion.div 
            className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-[#0f0f12] to-transparent"
            initial={{ opacity: 0.5 }}
            animate={{ opacity: [0.5, 0.7, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Linear-styled decorative blobs */}
          <motion.div
            className="absolute -left-64 top-96 w-[500px] h-[500px] rounded-full opacity-20"
            style={{ 
              background: "radial-gradient(circle, rgba(152, 129, 252, 0.1) 0%, rgba(152, 129, 252, 0.05) 40%, transparent 70%)",
              filter: "blur(80px)" 
            }}
            animate={{ 
              scale: [1, 1.05, 1],
              x: [0, 10, 0],
              y: [0, -10, 0]
            }}
            transition={{ 
              duration: 20, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          {/* Linear-style geometric decoration */}
          <div className="absolute top-1/2 -right-40 w-[300px] h-[300px] opacity-5">
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
              <path fill="#A8A8A8" d="M39.9,-65.7C54.1,-60.5,69.5,-53.1,78.7,-40.8C87.9,-28.5,90.9,-11.1,87.6,4.1C84.2,19.3,74.5,32.4,63.4,42.1C52.3,51.8,39.7,58.1,26.4,65.2C13.1,72.3,-0.9,80.2,-15.4,79.9C-29.9,79.6,-45,71.2,-57.3,59.6C-69.7,48,-79.4,33.3,-83.6,16.7C-87.7,0.1,-86.3,-18.5,-79.4,-34.3C-72.5,-50,-60,-63,-45.2,-68.4C-30.4,-73.7,-13.3,-71.4,0.4,-72C14.1,-72.6,25.7,-70.9,39.9,-65.7Z" transform="translate(100 100)" />
            </svg>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-6"
            >
              <span className="inline-flex items-center px-3 py-1 rounded-full text-[#A3A3A3] text-xs font-medium border border-[#313035] bg-[#131316]">
                <span className="w-2 h-2 rounded-full bg-[#9881fc] mr-2"></span>
                Premium Services
              </span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-4xl sm:text-5xl font-display font-bold text-white tracking-tight max-w-3xl mx-auto leading-tight"
            >
              Tailored for Your Specific Needs
            </motion.h2>
            
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="mt-6 text-xl text-[#a0a0a0] max-w-2xl mx-auto"
            >
              Select from our premium range of services designed to meet the needs of modern professionals and businesses.
            </motion.p>
          </motion.div>

          {/* Linear-inspired Service Categories with better hover effects */}
          <motion.div 
            className="flex flex-wrap gap-3 justify-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <motion.button 
              className="px-4 py-2 bg-[#5657F6] text-white rounded-md text-xs font-medium"
              whileHover={{ 
                y: -2,
                boxShadow: "0 4px 12px rgba(86, 87, 246, 0.3)" 
              }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              All Services
            </motion.button>
            {["Consultation", "Coaching", "Wellness", "Strategy"].map((category, idx) => (
              <motion.button 
                key={category}
                className="px-4 py-2 bg-[#151518] text-[#a3a3a3] rounded-md text-xs font-medium border border-[#232329]"
                whileHover={{ 
                  y: -2,
                  borderColor: "#444",
                  backgroundColor: "#1A1A1E" 
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                {category}
              </motion.button>
            ))}
          </motion.div>

          {/* Linear-inspired Service Cards Grid - Using ServiceCard component */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
          >
            {services.map((service, index) => (
              <motion.div 
                key={service.id}
                variants={itemVariants}
                custom={index}
                className="h-full"
              >
                <ServiceCard color={service.color}>
                  {/* Linear-styled service tag */}
                  <div className="mb-6 flex justify-between items-center">
                    <motion.span 
                      className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-[#1A1A1E] border border-[#2c2c31]" 
                      style={{ 
                        color: service.color 
                      }}
                      whileHover={{ 
                        y: -2,
                        borderColor: service.color + "50"
                      }}
                      transition={{ duration: 0.2 }}
                    >
                      {service.category}
                    </motion.span>
                    <motion.div
                      whileHover={{ rotate: 15, scale: 1.2 }}
                      transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      className="h-7 w-7 flex items-center justify-center rounded-full bg-[#1A1A1E] border border-[#2c2c31]"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#a3a3a3] group-hover:text-[#5657F6] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </motion.div>
                  </div>
                  
                  {/* Linear-styled Service Content */}
                  <motion.h3 
                    className="text-lg font-medium text-white mb-2 group-hover:text-[#5657F6] transition-colors duration-300"
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    {service.name}
                  </motion.h3>
                  <p className="text-[#a0a0a0] mb-6 text-sm leading-relaxed transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Linear-styled Service Details */}
                  <div className="pt-4 mt-auto border-t border-[#232329] grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-[#737378] mb-1">Duration</p>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#a3a3a3] mr-1 group-hover:text-[#5657F6] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-xs text-[#a3a3a3] group-hover:text-white transition-colors duration-300">{service.duration} min</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-[#737378] mb-1">Price</p>
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-[#a3a3a3] mr-1 group-hover:text-[#5657F6] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="font-medium text-xs text-[#a3a3a3] group-hover:text-white transition-colors duration-300">${service.price}</span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Linear-styled Book Now Button */}
                  <motion.button 
                    className="mt-6 w-full py-2 rounded-md bg-[#1A1A1E] border border-[#2c2c31] text-[#a3a3a3] text-xs font-medium group-hover:bg-[#5657F6] group-hover:text-white group-hover:border-[#5657F6] transition-all duration-300 flex items-center justify-center"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="relative z-10">Book This Service</span>
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-3.5 w-3.5 ml-1.5 relative z-10" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </motion.button>
                </ServiceCard>
              </motion.div>
            ))}
          </motion.div>

          {/* Linear-inspired View All Services Button */}
          <motion.div 
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            <Link to="/booking">
              <motion.div 
                whileHover={{ y: -3 }} 
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  size="lg" 
                  className="bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-8 py-3 text-sm font-medium transition-all duration-200"
                >
                  Book an Appointment
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    className="h-4 w-4 ml-2" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                    initial={{ x: 0 }}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </motion.svg>
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Linear-inspired CTA Section - Fixed z-index issues */}
      <section className="py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-[#0A0A0B] z-0">
  {/* Linear-inspired gradients and background effects */}
  <div className="absolute inset-0 overflow-hidden">
    {/* Linear's signature geometric grid pattern */}
    <div className="absolute inset-0"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), 
                        linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)`,
        backgroundSize: '16px 16px'
      }}
    />
    
    {/* Linear-styled gradient glow */}
    <motion.div 
      className="absolute top-0 right-[10%] w-[60%] h-[60%] rounded-full opacity-20"
      style={{ 
        background: "radial-gradient(circle, rgba(86, 87, 246, 0.15) 0%, rgba(86, 87, 246, 0.05) 50%, transparent 80%)",
        filter: "blur(120px)" 
      }}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div 
      className="absolute bottom-0 left-[10%] w-[50%] h-[50%] rounded-full opacity-20"
      style={{ 
        background: "radial-gradient(circle, rgba(152, 129, 252, 0.15) 0%, rgba(152, 129, 252, 0.05) 50%, transparent 80%)",
        filter: "blur(120px)" 
      }}
      animate={{ 
        scale: [1, 1.2, 1],
        opacity: [0.1, 0.2, 0.1]
      }}
      transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
    />
  </div>

  <div className="container mx-auto max-w-5xl relative z-10">
    {/* Linear-inspired card container */}
    <div className="rounded-lg bg-[#0A0A0B] border border-[#232329] overflow-hidden">
      <div className="p-8 md:p-12 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <motion.span 
            className="inline-flex items-center px-3 py-1 rounded-full text-[#A3A3A3] text-xs font-medium border border-[#313035] bg-[#131316] mb-8"
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
            Get Started Today
          </motion.span>
          
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-3xl sm:text-4xl font-display font-bold text-white tracking-tight leading-tight"
          >
            Ready to experience
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#5657F6] to-[#9881fc] ml-2">premium booking?</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mt-6 text-[#a0a0a0] text-lg max-w-2xl mx-auto"
          >
            Join thousands of professionals who have transformed their booking experience with Zenya. Start your journey today.
          </motion.p>
        </motion.div>
        
        {/* Linear-inspired testimonial quote */}
        <motion.div 
          className="mt-12 mb-12 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.5 }}
        >
          <div className="p-6 rounded-lg bg-[#1A1A1E] border border-[#2c2c31]">
            <svg className="h-6 w-6 text-[#5657F6] mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
            </svg>
            <p className="text-[#a0a0a0] italic text-center">Zenya has completely transformed how we manage appointments. The elegant interface and powerful features have made scheduling a joy rather than a chore.</p>
            <div className="mt-6 flex items-center justify-center">
              <div className="h-8 w-8 rounded-full bg-[#1E1E25] flex items-center justify-center mr-3">
                <span className="text-[#a3a3a3] text-xs">JS</span>
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">Jennifer Smith</p>
                <p className="text-[#737378] text-xs">CEO at TechForward</p>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Linear-inspired CTA Buttons */}
        <motion.div 
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.6 }}
        >
          <Link to="/booking">
            <motion.div 
              whileHover={{ y: -3 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                size="lg" 
                className="bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-200"
              >
                Get Started
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-4 w-4 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                  initial={{ x: 0 }}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </motion.svg>
              </Button>
            </motion.div>
          </Link>
          
          <Link to="/calendar">
            <motion.div 
              whileHover={{ y: -3 }} 
              whileTap={{ scale: 0.98 }}
            >
              <Button 
                variant="outline" 
                size="lg" 
                className="text-[#dcdcdc] bg-transparent rounded-md border border-[#33333e] hover:border-[#555562] px-6 py-2.5 text-sm font-medium transition-all duration-200"
              >
                View Demo
              </Button>
            </motion.div>
          </Link>
        </motion.div>
        
        {/* Linear-inspired feature pills */}
        <motion.div 
          className="mt-16 flex flex-wrap gap-3 justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          {[
            {label: "Secure Bookings", color: "#5657F6"},
            {label: "Lightning Fast", color: "#9881fc"},
            {label: "Real-time Updates", color: "#2fa2e0"},
            {label: "Premium Interface", color: "#6E6EF7"},
            {label: "24/7 Support", color: "#a3a3a3"}
          ].map((feature, i) => (
            <motion.div 
              key={i}
              className="px-3 py-1.5 rounded-md bg-[#1A1A1E] border border-[#2c2c31] text-xs font-medium text-[#a3a3a3]"
              whileHover={{ 
                y: -2,
                color: feature.color,
                borderColor: feature.color + "50"
              }}
              transition={{ duration: 0.2 }}
            >
              {feature.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  </div>
</section>

      {/* Linear-inspired minimal footer */}
      <footer className="py-16 px-4 sm:px-6 lg:px-8 bg-[#080809]">
        <div className="container mx-auto max-w-7xl">
          {/* <div className="w-full h-px bg-[#1a1a1d] mb-12 opacity-70" /> */}
          
          {/* <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div>
              <h4 className="text-white font-medium text-sm mb-4">Zenya</h4>
              <p className="text-[#8c8c8c] text-xs leading-relaxed">
                The ultra-premium booking system for modern professionals and businesses.
              </p>
            </div>
            
            {['Products', 'Resources', 'Company'].map((category, i) => (
              <div key={category}>
                <h4 className="text-white font-medium text-sm mb-4">{category}</h4>
                <ul className="space-y-2">
                  {[1, 2, 3, 4].map((item) => (
                    <li key={item}>
                      <a href="#" className="text-[#8c8c8c] text-xs hover:text-white transition-colors duration-200">
                        {category} Link {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div> */}
          
          {/* <div className="w-full h-px bg-[#1a1a1d] mb-8 opacity-70" /> */}
          
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-[#737378] text-xs">
              © 2025 Zenya. All rights reserved.
            </p>
            
            <div className="flex space-x-4 mt-4 md:mt-0">
              {['Privacy', 'Terms', 'Cookies', 'Contact'].map((link) => (
                <a key={link} href="#" className="text-[#8c8c8c] text-xs hover:text-white transition-colors duration-200">
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;