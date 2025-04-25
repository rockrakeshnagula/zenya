import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import { useBooking } from '../context/BookingContext';
import { PremiumCard } from '../components/ui/PremiumCard';
import { cn } from '../utils/cn';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { 
  format, 
  startOfMonth, 
  endOfMonth, 
  eachDayOfInterval, 
  isSameMonth, 
  isSameDay, 
  addMonths, 
  subMonths, 
  isToday, 
  addDays,
  isAfter,
  addMinutes
} from 'date-fns';

const BookingPage: React.FC = () => {
  const navigate = useNavigate();
  const { services, createBooking } = useBooking();
  const [step, setStep] = useState(1);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  
  // Date & Time selection state
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimes, setAvailableTimes] = useState<string[]>([]);

  // User details state
  const [userDetails, setUserDetails] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Loading state for submission
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Linear-inspired subtle animation variants
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

  const handleNextStep = () => {
    setStep(prev => prev + 1);
  };

  const handlePreviousStep = () => {
    setStep(prev => prev - 1);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(prev => subMonths(prev, 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(prev => addMonths(prev, 1));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
    
    // Generate available time slots for the selected date
    // This would normally come from a backend API based on availability
    const timeSlots = generateTimeSlots(date);
    setAvailableTimes(timeSlots);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  // Handle user details input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Function to generate time slots
  const generateTimeSlots = (date: Date): string[] => {
    // Mock time slots - in a real app, these would come from your backend
    const allTimeSlots = [
      '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
      '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
      '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM'
    ];
    
    // Simulate some slots being unavailable
    // Use date as seed to make the generation deterministic
    const seedDate = date.getDate();
    return allTimeSlots.filter((_, index) => {
      return (index + seedDate) % 3 !== 0; // Make some slots unavailable based on date
    });
  };

  // Get days for the current month view
  const getDaysInMonth = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(currentMonth);
    const dateRange = eachDayOfInterval({ start: monthStart, end: monthEnd });
    
    // Get day of the week the month starts on (0 = Sunday, 1 = Monday, etc.)
    const startDay = monthStart.getDay();
    
    // Add days from the previous month to fill in the calendar
    const daysFromPreviousMonth = [];
    for (let i = 0; i < startDay; i++) {
      daysFromPreviousMonth.unshift(addDays(monthStart, -(i + 1)));
    }
    
    // Get the day of the week the month ends on
    const endDay = monthEnd.getDay();
    
    // Add days from the next month to fill in the calendar
    const daysFromNextMonth = [];
    for (let i = 1; i < 7 - endDay; i++) {
      daysFromNextMonth.push(addDays(monthEnd, i));
    }
    
    return [...daysFromPreviousMonth, ...dateRange, ...daysFromNextMonth];
  };

  // Check if a date is selectable (e.g., not in the past)
  const isDateSelectable = (date: Date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return isAfter(date, today) || isToday(date);
  };

  // Check if a date has available time slots
  const hasAvailableSlots = (date: Date) => {
    // This would normally check with your backend
    // For the demo, allow booking on any date that's not a Sunday (day 0)
    return date.getDay() !== 0 && isDateSelectable(date);
  };

  // Handle booking confirmation
  const handleConfirmBooking = () => {
    if (!selectedService || !selectedDate || !selectedTime) {
      toast.error("Missing booking information");
      return;
    }

    try {
      setIsSubmitting(true);

      // Find the selected service
      const service = services.find(s => s.id === selectedService);
      if (!service) {
        throw new Error("Service not found");
      }

      // Parse the selected time
      const [hours, minutes] = selectedTime.includes('PM') 
        ? [parseInt(selectedTime.split(':')[0]) + 12, parseInt(selectedTime.split(':')[1])]
        : [parseInt(selectedTime.split(':')[0]), parseInt(selectedTime.split(':')[1])];
      
      const startTime = new Date(selectedDate);
      startTime.setHours(hours, minutes, 0, 0);
      
      // Create end time based on service duration
      const endTime = addMinutes(startTime, service.duration);

      // Create booking object
      const bookingData = {
        serviceId: service.id,
        serviceName: service.name,
        start: startTime.toISOString(),
        end: endTime.toISOString(),
        customerName: userDetails.name,
        customerEmail: userDetails.email,
        customerPhone: userDetails.phone,
        notes: userDetails.notes,
        status: 'confirmed' as const,
        color: service.color
      };

      // Call the createBooking function from context
      createBooking(bookingData);
      
      // Success feedback and navigation
      toast.success("Booking confirmed successfully!");
      
      // Redirect to success page or dashboard
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      console.error("Error confirming booking:", error);
      toast.error("Failed to create booking. Please try again.");
    } finally {
      setIsSubmitting(false);
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
          className="max-w-3xl mx-auto relative z-10"
        >
          {/* Linear-inspired decorative blobs */}
          <div className="absolute -z-10 overflow-hidden pointer-events-none">
            <motion.div 
              className="absolute top-20 -right-80 w-[500px] h-[500px] rounded-full opacity-10"
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
              className="absolute -top-40 -left-80 w-[600px] h-[600px] rounded-full opacity-10"
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

          <div className="mb-8 flex flex-col">
            <div className="flex items-center">
              <motion.span 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mr-4 inline-flex items-center px-3 py-1 rounded-full text-[#A3A3A3] text-xs font-medium border border-[#313035] bg-[#131316]"
              >
                <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
                Booking
              </motion.span>
              <h1 className="text-3xl font-display font-bold text-white">Book an Appointment</h1>
            </div>
            <p className="text-[#a0a0a0] mt-2 ml-1">Complete the following steps to schedule your appointment</p>
          </div>
          
          {/* Progress Steps */}
          <div className="relative mb-8">
            <div className="flex justify-between mb-4">
              {['Service', 'Date & Time', 'Your Details', 'Confirmation'].map((stepLabel, index) => (
                <div 
                  key={stepLabel} 
                  className={cn(
                    "flex flex-col items-center",
                    step >= index + 1 ? "text-white" : "text-[#737378]"
                  )}
                >
                  <div className={cn(
                    "flex items-center justify-center w-8 h-8 mb-2 rounded-full border-2 transition-colors duration-300",
                    step > index + 1 
                      ? "bg-[#5657F6] border-[#5657F6] text-white" 
                      : step === index + 1
                      ? "border-[#5657F6] text-[#5657F6]" 
                      : "border-[#2c2c31] text-[#737378]"
                  )}>
                    {step > index + 1 ? (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-xs font-medium">{index + 1}</span>
                    )}
                  </div>
                  <div className={cn(
                    "text-xs transition-colors duration-300",
                    step >= index + 1 ? "font-medium" : "font-normal"
                  )}>
                    {stepLabel}
                  </div>
                </div>
              ))}
            </div>
            <div className="relative h-1 w-full bg-[#1E1E25] rounded-full mt-2 mb-4">
              <motion.div 
                className="absolute h-1 bg-gradient-to-r from-[#5657F6] to-[#9881fc] rounded-full"
                initial={{ width: '25%' }}
                animate={{ width: `${step * 25}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </div>
          </div>
          
          <PremiumCard className="w-full">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div 
                  key="step1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
                    Select a Service
                  </h2>
                  
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-4 mb-8"
                  >
                    {services.map((service, index) => (
                      <motion.div 
                        key={service.id}
                        variants={itemVariants}
                        custom={index}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
                      >
                        <div 
                          className={cn(
                            "p-4 border rounded-lg cursor-pointer transition-all",
                            selectedService === service.id 
                              ? 'border-[#5657F6] bg-[#1a1a24]' 
                              : 'border-[#2c2c31] hover:border-[#3c3c41] bg-[#1A1A1E]'
                          )}
                          onClick={() => handleServiceSelect(service.id)}
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-white">{service.name}</h3>
                              <p className="text-sm text-[#a0a0a0] mt-1">{service.description}</p>
                              <div className="flex items-center mt-3">
                                <div className="flex items-center text-[#8c8c8c] text-sm">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                                  </svg>
                                  <span>{service.duration} min</span>
                                </div>
                                <span className="mx-2 text-[#5c5c5c]">•</span>
                                <span className="font-medium text-[#dcdcdc]">${service.price}</span>
                              </div>
                            </div>
                            {selectedService === service.id && (
                              <div className="flex-shrink-0 h-6 w-6 text-[#5657F6]">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                  
                  <div className="flex justify-end">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={handleNextStep} 
                        disabled={!selectedService}
                        className={cn(
                          "bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                          !selectedService && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        Continue
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
                  </div>
                </motion.div>
              )}
              
              {step === 2 && (
                <motion.div 
                  key="step2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
                    Select Date & Time
                  </h2>
                  
                  <div className="mb-8">
                    {/* Date Picker Section */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-md font-medium text-white">Select a Date</h3>
                        <div className="flex space-x-2">
                          <motion.button 
                            onClick={goToPreviousMonth}
                            className="p-1.5 rounded hover:bg-[#1E1E25] transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a3a3a3]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.button>
                          <span className="text-white font-medium">
                            {format(currentMonth, 'MMMM yyyy')}
                          </span>
                          <motion.button 
                            onClick={goToNextMonth}
                            className="p-1.5 rounded hover:bg-[#1E1E25] transition-colors"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a3a3a3]" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                            </svg>
                          </motion.button>
                        </div>
                      </div>
                      
                      {/* Calendar Grid */}
                      <div className="bg-[#151518] border border-[#2c2c31] rounded-lg p-4">
                        {/* Day names row */}
                        <div className="grid grid-cols-7 gap-1 mb-2">
                          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, i) => (
                            <div key={i} className="text-center text-[#8c8c8c] text-xs font-medium py-2">
                              {day}
                            </div>
                          ))}
                        </div>
                        
                        {/* Calendar days */}
                        <div className="grid grid-cols-7 gap-1">
                          {getDaysInMonth().map((day, i) => {
                            const isSelected = selectedDate && isSameDay(day, selectedDate);
                            const isCurrentMonth = isSameMonth(day, currentMonth);
                            const isAvailable = hasAvailableSlots(day);
                            // const isSelectable = isDateSelectable(day);
                            
                            return (
                              <motion.div 
                                key={i}
                                whileHover={isAvailable ? { y: -2, scale: 1.05 } : {}}
                                whileTap={isAvailable ? { scale: 0.95 } : {}}
                                onClick={() => isAvailable && handleDateSelect(day)}
                                className={cn(
                                  "h-10 flex items-center justify-center rounded cursor-pointer text-sm relative",
                                  isSelected && isAvailable 
                                    ? "bg-[#5657F6] text-white" 
                                    : isToday(day)
                                    ? "bg-[#1E1E25] text-white" 
                                    : isCurrentMonth && isAvailable
                                    ? "text-white hover:bg-[#1E1E25]" 
                                    : isCurrentMonth && !isAvailable
                                    ? "text-[#5c5c5c] cursor-not-allowed" 
                                    : "text-[#5c5c5c] opacity-40 cursor-not-allowed"
                                )}
                              >
                                {format(day, 'd')}
                                
                                {/* Availability indicator */}
                                {isCurrentMonth && isAvailable && !isSelected && (
                                  <span className="absolute bottom-1 w-1 h-1 rounded-full bg-[#5657F6]"></span>
                                )}
                                
                                {/* Today indicator */}
                                {isToday(day) && !isSelected && (
                                  <span className="absolute top-1 right-1 w-1 h-1 rounded-full bg-[#2fa2e0]"></span>
                                )}
                              </motion.div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                    
                    {/* Time Picker Section */}
                    {selectedDate && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="mt-6">
                          <h3 className="text-md font-medium text-white mb-4">
                            Available Times for {format(selectedDate, 'EEEE, MMMM d')}
                          </h3>
                          
                          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {availableTimes.map((time) => (
                              <motion.div
                                key={time}
                                whileHover={{ y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className={cn(
                                  "p-2 border rounded-md text-center text-sm cursor-pointer transition-all",
                                  selectedTime === time
                                    ? "border-[#5657F6] bg-[#1a1a24] text-white"
                                    : "border-[#2c2c31] hover:border-[#3c3c41] text-[#dcdcdc]"
                                )}
                                onClick={() => handleTimeSelect(time)}
                              >
                                {time}
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="outline" 
                        onClick={handlePreviousStep}
                        className="border-[#2c2c31] hover:border-[#5657F6] text-[#dcdcdc] hover:text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200"
                      >
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-2" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          initial={{ x: 0 }}
                          animate={{ x: 0 }}
                          whileHover={{ x: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </motion.svg>
                        Back
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={handleNextStep}
                        disabled={!selectedDate || !selectedTime}
                        className={cn(
                          "bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                          (!selectedDate || !selectedTime) && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        Continue
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
                  </div>
                </motion.div>
              )}
              
              {step === 3 && (
                <motion.div 
                  key="step3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
                    Your Details
                  </h2>
                  
                  <motion.div 
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="space-y-5 mb-8"
                  >
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">
                        Full Name
                      </label>
                      <input
                        name="name"
                        value={userDetails.name}
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
                        value={userDetails.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 bg-[#1A1A1E] border border-[#2c2c31] rounded-lg text-white placeholder-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#5657F6] focus:border-[#5657F6] transition-colors duration-200"
                        placeholder="Enter your email address"
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userDetails.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2.5 bg-[#1A1A1E] border border-[#2c2c31] rounded-lg text-white placeholder-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#5657F6] focus:border-[#5657F6] transition-colors duration-200"
                        placeholder="Enter your phone number"
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium text-[#a0a0a0] mb-1.5">
                        Special Requests
                      </label>
                      <textarea 
                        name="notes"
                        value={userDetails.notes}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2.5 bg-[#1A1A1E] border border-[#2c2c31] rounded-lg text-white placeholder-[#5c5c5c] focus:outline-none focus:ring-1 focus:ring-[#5657F6] focus:border-[#5657F6] transition-colors duration-200 resize-none"
                        rows={4}
                        placeholder="Any special requests or notes for your appointment..."
                      />
                    </motion.div>
                  </motion.div>
                  
                  <div className="flex justify-between">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="outline" 
                        onClick={handlePreviousStep}
                        className="border-[#2c2c31] hover:border-[#5657F6] text-[#dcdcdc] hover:text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200"
                      >
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-2" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          initial={{ x: 0 }}
                          animate={{ x: 0 }}
                          whileHover={{ x: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </motion.svg>
                        Back
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={handleNextStep}
                        disabled={!userDetails.name || !userDetails.email || !userDetails.phone}
                        className={cn(
                          "bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200",
                          (!userDetails.name || !userDetails.email || !userDetails.phone) && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        Continue
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
                  </div>
                </motion.div>
              )}
              
              {step === 4 && (
                <motion.div 
                  key="step4"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6"
                >
                  <h2 className="text-xl font-medium text-white mb-6 flex items-center">
                    <span className="w-2 h-2 rounded-full bg-[#5657F6] mr-2"></span>
                    Booking Confirmation
                  </h2>
                  
                  <div className="bg-[#151518] border border-[#2c2c31] rounded-lg p-6 mb-8">
                    <div className="flex items-center text-[#5657F6] mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span className="font-medium">Booking Ready for Confirmation</span>
                    </div>
                    
                    <p className="text-[#a0a0a0] mb-6">
                      Please review your booking details below and confirm if everything looks correct.
                    </p>
                    
                    <div className="border-t border-[#2c2c31] pt-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-[#737378] mb-1">Service</p>
                          <p className="font-medium text-white">
                            {services.find(s => s.id === selectedService)?.name || 'Selected Service'}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#737378] mb-1">Duration</p>
                          <p className="font-medium text-white">
                            {services.find(s => s.id === selectedService)?.duration || 60} min
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#737378] mb-1">Date & Time</p>
                          <p className="font-medium text-white">
                            {selectedDate ? format(selectedDate, 'MMMM d, yyyy') : ''} at {selectedTime || ''}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-[#737378] mb-1">Price</p>
                          <p className="font-medium text-white">
                            ${services.find(s => s.id === selectedService)?.price || 0}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 border-t border-[#2c2c31] pt-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-[#737378] mb-1">Name</p>
                            <p className="font-medium text-white">{userDetails.name}</p>
                          </div>
                          <div>
                            <p className="text-sm text-[#737378] mb-1">Phone</p>
                            <p className="font-medium text-white">{userDetails.phone}</p>
                          </div>
                          <div className="col-span-2">
                            <p className="text-sm text-[#737378] mb-1">Email</p>
                            <p className="font-medium text-white">{userDetails.email}</p>
                          </div>
                          {userDetails.notes && (
                            <div className="col-span-2">
                              <p className="text-sm text-[#737378] mb-1">Notes</p>
                              <p className="font-medium text-white">{userDetails.notes}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="outline" 
                        onClick={handlePreviousStep}
                        className="border-[#2c2c31] hover:border-[#5657F6] text-[#dcdcdc] hover:text-white rounded-md px-4 py-2 text-sm font-medium transition-all duration-200"
                      >
                        <motion.svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          className="h-4 w-4 mr-2" 
                          viewBox="0 0 20 20" 
                          fill="currentColor"
                          initial={{ x: 0 }}
                          animate={{ x: 0 }}
                          whileHover={{ x: -3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </motion.svg>
                        Back
                      </Button>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        onClick={handleConfirmBooking}
                        disabled={isSubmitting}
                        className={cn(
                          "bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-6 py-2.5 text-sm font-medium transition-all duration-200",
                          isSubmitting && "opacity-50 cursor-not-allowed"
                        )}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        {isSubmitting ? "Processing..." : "Confirm Booking"}
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </PremiumCard>
        </motion.div>
      </div>
    </div>
  );
};

export default BookingPage;