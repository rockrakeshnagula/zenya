import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import { PremiumCard } from '../components/ui/PremiumCard';

const Dashboard: React.FC = () => {
  const { bookings } = useBooking();
  const [stats, setStats] = useState({
    upcoming: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0,
    completed: 0
  });

  // Calculate booking statistics
  useEffect(() => {
    const now = new Date();
    
    const upcoming = bookings.filter(booking => 
      new Date(booking.start) > now && booking.status !== 'cancelled'
    ).length;
    
    const confirmed = bookings.filter(booking => 
      booking.status === 'confirmed'
    ).length;
    
    const pending = bookings.filter(booking => 
      booking.status === 'pending'
    ).length;
    
    const cancelled = bookings.filter(booking => 
      booking.status === 'cancelled'
    ).length;
    
    const completed = bookings.filter(booking => 
      booking.status === 'completed'
    ).length;
    
    setStats({
      upcoming,
      confirmed,
      pending,
      cancelled,
      completed
    });
  }, [bookings]);

  // Linear-inspired animation variants
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

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white">
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

      <div className="container mx-auto pt-32 pb-12 px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative z-10"
        >
          {/* Linear-inspired decorative blobs */}
          <div className="absolute -z-10 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-20 -right-20 w-[500px] h-[500px] rounded-full opacity-10"
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
              className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full opacity-10"
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

          <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex items-center">
                <motion.span 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mr-4 inline-flex items-center px-3 py-1 rounded-full text-[#A3A3A3] text-xs font-medium border border-[#313035] bg-[#131316]"
                >
                  <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
                  Analytics
                </motion.span>
                <h1 className="text-3xl font-display font-bold text-white">Dashboard</h1>
              </div>
              <p className="text-[#a0a0a0] mt-2">Get an overview of your booking metrics and upcoming appointments</p>
            </motion.div>
            
            <div className="mt-4 md:mt-0 flex items-center">
              <Link to="/booking">
                <motion.div
                  whileHover={{ y: -2 }} 
                  whileTap={{ scale: 0.98 }}
                >
                  <Button 
                    className="bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200"
                  >
                    New Booking
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 ml-2" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                      initial={{ x: 0 }}
                      whileHover={{ x: 3 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </motion.svg>
                  </Button>
                </motion.div>
              </Link>
            </div>
          </div>
          
          {/* Stats Cards */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {/* Upcoming Card */}
            <motion.div variants={itemVariants}>
              <PremiumCard className="h-full">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Upcoming</h3>
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E1E25] text-[#5657F6]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-[#5657F6]">{stats.upcoming}</p>
                  <p className="text-sm text-[#8c8c8c] mt-1">Appointments</p>
                </div>
              </PremiumCard>
            </motion.div>
            
            {/* Confirmed Card */}
            <motion.div variants={itemVariants}>
              <PremiumCard className="h-full" glowColor="rgba(86, 87, 246, 0.15)">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Confirmed</h3>
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E1E25] text-[#5657F6]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-[#5657F6]">{stats.confirmed}</p>
                  <p className="text-sm text-[#8c8c8c] mt-1">Bookings</p>
                </div>
              </PremiumCard>
            </motion.div>
            
            {/* Pending Card */}
            <motion.div variants={itemVariants}>
              <PremiumCard className="h-full" glowColor="rgba(152, 129, 252, 0.15)">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Pending</h3>
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E1E25] text-[#9881fc]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-[#9881fc]">{stats.pending}</p>
                  <p className="text-sm text-[#8c8c8c] mt-1">Approval needed</p>
                </div>
              </PremiumCard>
            </motion.div>
            
            {/* Completed Card */}
            <motion.div variants={itemVariants}>
              <PremiumCard className="h-full" glowColor="rgba(47, 162, 224, 0.15)">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-medium text-white">Completed</h3>
                    <span className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1E1E25] text-[#2fa2e0]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                        <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </span>
                  </div>
                  <p className="text-3xl font-bold text-[#2fa2e0]">{stats.completed}</p>
                  <p className="text-sm text-[#8c8c8c] mt-1">This month</p>
                </div>
              </PremiumCard>
            </motion.div>
          </motion.div>
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recent Bookings Table */}
            <div className="lg:col-span-2">
              <PremiumCard>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-medium text-white">Recent Bookings</h2>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#2c2c31] hover:border-[#5657F6] text-[#dcdcdc] text-xs font-medium"
                      >
                        View All
                      </Button>
                    </motion.div>
                  </div>
                  
                  {bookings.length > 0 ? (
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-[#232329]">
                        <thead className="bg-[#1A1A1E]">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">
                              Customer
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">
                              Service
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">
                              Date & Time
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">
                              Status
                            </th>
                            <th scope="col" className="relative px-6 py-3">
                              <span className="sr-only">Actions</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#232329]">
                          {bookings.slice(0, 5).map((booking) => (
                            <tr key={booking.id} className="hover:bg-[#1E1E25] transition-colors duration-150">
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-[#1E1E25] flex items-center justify-center">
                                    <span className="text-[#a3a3a3] font-medium">
                                      {booking.customerName.charAt(0)}
                                    </span>
                                  </div>
                                  <div className="ml-4">
                                    <div className="text-sm font-medium text-white">
                                      {booking.customerName}
                                    </div>
                                    <div className="text-sm text-[#8c8c8c]">
                                      {booking.customerEmail}
                                    </div>
                                  </div>
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-white">{booking.serviceName}</div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm text-white">
                                  {format(new Date(booking.start), 'MMM d, yyyy')}
                                </div>
                                <div className="text-sm text-[#8c8c8c]">
                                  {format(new Date(booking.start), 'h:mm a')}
                                </div>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-medium rounded-full ${
                                  booking.status === 'confirmed' 
                                    ? 'bg-[#1e2c6a] text-[#5657F6]' 
                                    : booking.status === 'pending'
                                    ? 'bg-[#2b234b] text-[#9881fc]'
                                    : booking.status === 'cancelled'
                                    ? 'bg-[#3a1c1c] text-[#f87171]'
                                    : 'bg-[#1a3044] text-[#38bdf8]'
                                }`}>
                                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <motion.button 
                                  className="text-[#5657F6] hover:text-[#6E6EF7]"
                                  whileHover={{ x: 2 }}
                                  transition={{ duration: 0.2 }}
                                >
                                  Details
                                </motion.button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ) : (
                    <div className="py-12 text-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto text-[#2c2c31] mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p className="text-[#8c8c8c]">No bookings to display</p>
                      <motion.div 
                        className="mt-4"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Link to="/booking">
                          <Button 
                            className="bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200"
                          >
                            Create Your First Booking
                          </Button>
                        </Link>
                      </motion.div>
                    </div>
                  )}
                </div>
              </PremiumCard>
            </div>
            
            {/* Right Sidebar */}
            <div>
              {/* Upcoming Today Card */}
              <PremiumCard>
                <div className="p-6">
                  <h2 className="text-xl font-medium text-white mb-4 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
                    Upcoming Today
                  </h2>
                  
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.slice(0, 3).map((booking) => (
                        <motion.div 
                          key={booking.id} 
                          className="p-4 bg-[#1A1A1E] border border-[#2c2c31] rounded-lg"
                          whileHover={{ x: 2, backgroundColor: "#22222b" }}
                          transition={{ duration: 0.2 }}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="text-sm font-medium text-[#a3a3a3]">
                                {format(new Date(booking.start), 'h:mm a')}
                              </span>
                              <h3 className="font-medium text-white mt-1">{booking.serviceName}</h3>
                              <p className="text-sm text-[#8c8c8c] mt-1">{booking.customerName}</p>
                            </div>
                            <span 
                              className={`w-3 h-3 rounded-full ${
                                booking.status === 'confirmed' 
                                  ? 'bg-[#5657F6]' 
                                  : booking.status === 'pending'
                                  ? 'bg-[#9881fc]'
                                  : booking.status === 'cancelled'
                                  ? 'bg-[#f87171]'
                                  : 'bg-[#38bdf8]'
                              }`}
                            ></span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="py-8 text-center text-[#8c8c8c]">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 mx-auto text-[#2c2c31] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <p>No appointments today</p>
                    </div>
                  )}
                </div>
              </PremiumCard>
              
              {/* Quick Actions Card */}
              <PremiumCard className="mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-white mb-4 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#9881fc] mr-2"></span>
                    Quick Actions
                  </h2>
                  
                  <div className="space-y-3">
                    <Link to="/booking">
                      <motion.div 
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full"
                      >
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-[#2c2c31] hover:border-[#5657F6] text-[#dcdcdc] hover:text-white"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#5657F6]" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                          </svg>
                          Create New Booking
                        </Button>
                      </motion.div>
                    </Link>
                    
                    <motion.div 
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[#2c2c31] hover:border-[#9881fc] text-[#dcdcdc] hover:text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#9881fc]" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        Contact Customer
                      </Button>
                    </motion.div>
                    
                    <motion.div 
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full"
                    >
                      <Button 
                        variant="outline" 
                        className="w-full justify-start border-[#2c2c31] hover:border-[#2fa2e0] text-[#dcdcdc] hover:text-white"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-[#2fa2e0]" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V8z" clipRule="evenodd" />
                        </svg>
                        Generate Report
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </PremiumCard>
              
              {/* Analytics Preview Card */}
              <PremiumCard className="mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-medium text-white mb-4 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#2fa2e0] mr-2"></span>
                    Analytics Preview
                  </h2>
                  
                  <div className="mt-4 space-y-4">
                    {/* Simple Chart Visualization */}
                    <div className="h-32 flex items-end justify-between gap-2">
                      {[65, 40, 85, 30, 55, 60, 75].map((height, i) => (
                        <motion.div
                          key={i}
                          className="h-full flex-1 flex flex-col justify-end"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.1 * i, duration: 0.5 }}
                        >
                          <motion.div 
                            className="rounded-t-sm bg-gradient-to-t from-[#5657F6] to-[#9881fc]"
                            style={{ height: `${height}%` }}
                            whileHover={{ scale: 1.05 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          />
                          <div className="text-[#8c8c8c] text-xs mt-1 text-center">
                            {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                    <div className="text-center text-[#a3a3a3] text-sm">
                      Bookings this week
                    </div>
                    
                    <motion.div 
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="mt-4 text-center"
                    >
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#2c2c31] hover:border-[#2fa2e0] text-[#dcdcdc] hover:text-white text-xs"
                      >
                        View Full Analytics
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </PremiumCard>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;