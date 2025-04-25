import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useHeader } from '../context/HeaderContext';
import toast from 'react-hot-toast';

const RegisterPage: React.FC = () => {
  const { setIsTransparent } = useHeader();
  const { register } = useAuth();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  
  // Set header to opaque for register page
  useEffect(() => {
    setIsTransparent(false);
    return () => setIsTransparent(true);
  }, [setIsTransparent]);
  
  // Animation variants
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      toast.error("All fields are required");
      return;
    }
    
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }
    
    try {
      setIsSubmitting(true);
      await register(formData.name, formData.email, formData.password);
      // Navigation is handled in the register function
    } catch (error) {
      // Error handling is done in the register function
      console.error("Registration error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white pt-16">
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

      <div className="container mx-auto py-16 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-md mx-auto relative z-10"
        >
          {/* Linear-inspired decorative blobs */}
          <div className="absolute -z-10 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-10 -right-40 w-[400px] h-[400px] rounded-full opacity-10"
              style={{ 
                background: "radial-gradient(circle, rgba(86, 87, 246, 0.3) 0%, rgba(86, 87, 246, 0.1) 40%, transparent 70%)",
                filter: "blur(80px)" 
              }}
              animate={{ 
                scale: [1, 1.05, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ 
                duration: 15, 
                repeat: Infinity,
                ease: "easeInOut" 
              }}
            />
            <motion.div 
              className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full opacity-10"
              style={{ 
                background: "radial-gradient(circle, rgba(152, 129, 252, 0.3) 0%, rgba(152, 129, 252, 0.1) 40%, transparent 70%)",
                filter: "blur(100px)" 
              }}
              animate={{ 
                scale: [1, 1.1, 1],
                opacity: [0.1, 0.15, 0.1]
              }}
              transition={{ 
                duration: 20, 
                repeat: Infinity,
                ease: "easeInOut",
                delay: 2
              }}
            />
          </div>

          <div className="mb-8 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              {/* Logo */}
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5657F6] to-[#9881fc] flex items-center justify-center">
                <span className="text-white text-xl font-bold">Z</span>
              </div>
            </motion.div>
            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-3xl font-bold"
            >
              Create Your Account
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mt-2 text-[#a0a0a0]"
            >
              Begin your premium booking experience
            </motion.p>
          </div>
          
          <motion.div 
            className="w-full bg-[#151518] border border-[#2c2c31] rounded-lg p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <form onSubmit={handleSubmit}>
              <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-5"
              >
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">
                    Full Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1E] border border-[#2c2c31] rounded-lg text-white placeholder-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#5657F6] focus:border-[#5657F6] transition-colors duration-200"
                    placeholder="Enter your full name"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1E] border border-[#2c2c31] rounded-lg text-white placeholder-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#5657F6] focus:border-[#5657F6] transition-colors duration-200"
                    placeholder="Enter your email address"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1E] border border-[#2c2c31] rounded-lg text-white placeholder-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#5657F6] focus:border-[#5657F6] transition-colors duration-200"
                    placeholder="Create a password (min. 6 characters)"
                  />
                </motion.div>
                
                <motion.div variants={itemVariants}>
                  <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2.5 bg-[#1A1A1E] border border-[#2c2c31] rounded-lg text-white placeholder-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#5657F6] focus:border-[#5657F6] transition-colors duration-200"
                    placeholder="Confirm your password"
                  />
                </motion.div>
                
                <motion.div 
                  variants={itemVariants}
                  className="mt-8"
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md py-2.5 text-sm font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Creating Account...
                      </div>
                    ) : "Create Account"}
                  </motion.button>
                </motion.div>
              </motion.div>
            </form>
            
            <div className="mt-6 text-center text-sm text-[#a0a0a0]">
              <p>
                Already have an account?{" "}
                <Link to="/login" className="text-[#9881fc] hover:text-[#B4A6FD] transition-colors">
                  Login here
                </Link>
              </p>
            </div>
          </motion.div>
          
          <div className="mt-8 text-center text-xs text-[#5c5c5c]">
            <p>By creating an account, you agree to our</p>
            <p className="mt-1">
              <a href="#" className="text-[#a0a0a0] hover:text-[#dcdcdc] transition-colors">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-[#a0a0a0] hover:text-[#dcdcdc] transition-colors">
                Privacy Policy
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RegisterPage;