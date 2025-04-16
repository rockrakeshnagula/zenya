import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/common/Button';
import { useBooking } from '../context/BookingContext';
import { format } from 'date-fns';
import { PremiumCard } from '../components/ui/PremiumCard';
import { cn } from '../utils/cn';

// FullCalendar imports
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin from '@fullcalendar/interaction';

const CalendarView: React.FC = () => {
  const { bookings } = useBooking();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'month' | 'week' | 'day'>('month');
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<any>(null);
  const calendarRef = useRef<any>(null);
  
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

  // Format bookings for FullCalendar
  const events = bookings.map(booking => ({
    id: booking.id,
    title: booking.serviceName,
    start: new Date(booking.start),
    end: new Date(booking.end),
    extendedProps: {
      customerName: booking.customerName,
      status: booking.status,
      description: booking.notes || '',
      color: getStatusColor(booking.status)
    },
    backgroundColor: getStatusColor(booking.status),
    borderColor: getStatusColor(booking.status)
  }));

  function getStatusColor(status: string): string {
    switch (status) {
      case 'confirmed':
        return '#5657F6';
      case 'pending':
        return '#9881fc';
      case 'cancelled':
        return '#EF4444';
      default:
        return '#2fa2e0';
    }
  }

  const handleEventClick = (info: any) => {
    setSelectedEvent({
      id: info.event.id,
      title: info.event.title,
      start: info.event.start,
      end: info.event.end,
      customerName: info.event.extendedProps.customerName,
      status: info.event.extendedProps.status,
      description: info.event.extendedProps.description,
      color: info.event.backgroundColor
    });
    setShowEventModal(true);
  };

  const handleDateClick = (info: any) => {
    // Handle date clicks for creating new bookings
    console.log('Date clicked:', info.dateStr);
  };

  const handleViewChange = (newView: 'month' | 'week' | 'day') => {
    setView(newView);
    
    // Update FullCalendar view
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      
      switch (newView) {
        case 'day':
          calendarApi.changeView('timeGridDay');
          break;
        case 'week':
          calendarApi.changeView('timeGridWeek');
          break;
        case 'month':
          calendarApi.changeView('dayGridMonth');
          break;
      }
    }
  };

  const goToPreviousMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCurrentMonth(calendarApi.getDate());
    }
  };

  const goToNextMonth = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCurrentMonth(calendarApi.getDate());
    }
  };

  const goToToday = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.today();
      setCurrentMonth(calendarApi.getDate());
    }
  };

  // Calendar display customization
  const renderEventContent = (eventInfo: any) => {
    return (
      <div className="flex flex-col px-1.5 py-1 overflow-hidden w-full h-full">
        <p className="text-xs font-medium truncate">{eventInfo.event.title}</p>
        <p className="text-xs opacity-70 truncate">{eventInfo.timeText}</p>
      </div>
    );
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

      {/* Main container with increased top padding to prevent header overlap */}
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
                  Calendar View
                </motion.span>
                <h1 className="text-3xl font-display font-bold text-white">Appointment Calendar</h1>
              </div>
              <p className="text-[#a0a0a0] mt-2">Manage your schedule with our elegant, interactive calendar</p>
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
                    Create New Booking
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
          
          <PremiumCard className="mb-8">
            <div className="p-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <div className="flex items-center mb-4 sm:mb-0">
                  <motion.button 
                    onClick={goToPreviousMonth}
                    className="mr-2 p-1.5 rounded hover:bg-[#1E1E25] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a3a3a3]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  
                  <h2 className="text-xl font-medium text-white">
                    {format(currentMonth, 'MMMM yyyy')}
                  </h2>
                  
                  <motion.button 
                    onClick={goToNextMonth}
                    className="ml-2 p-1.5 rounded hover:bg-[#1E1E25] transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-[#a3a3a3]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                  
                  <motion.button 
                    onClick={goToToday}
                    className="ml-4 px-2.5 py-1 text-xs text-[#a3a3a3] hover:text-white hover:bg-[#1E1E25] transition-colors rounded"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Today
                  </motion.button>
                </div>
                
                <div className="inline-flex rounded-lg p-1 bg-[#1A1A1E] border border-[#2c2c31]">
                  <motion.button
                    type="button"
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200", 
                      view === 'month' 
                        ? "bg-[#2a2a30] text-white shadow-sm" 
                        : "text-[#a3a3a3] hover:text-white"
                    )}
                    onClick={() => handleViewChange('month')}
                    whileHover={{ scale: view === 'month' ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Month
                  </motion.button>
                  <motion.button
                    type="button"
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200", 
                      view === 'week' 
                        ? "bg-[#2a2a30] text-white shadow-sm" 
                        : "text-[#a3a3a3] hover:text-white"
                    )}
                    onClick={() => handleViewChange('week')}
                    whileHover={{ scale: view === 'week' ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Week
                  </motion.button>
                  <motion.button
                    type="button"
                    className={cn(
                      "px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200", 
                      view === 'day' 
                        ? "bg-[#2a2a30] text-white shadow-sm" 
                        : "text-[#a3a3a3] hover:text-white"
                    )}
                    onClick={() => handleViewChange('day')}
                    whileHover={{ scale: view === 'day' ? 1 : 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Day
                  </motion.button>
                </div>
              </div>
              
              {/* FullCalendar Integration */}
              <div className="h-[650px] mt-4 calendar-container">
                <FullCalendar
                  ref={calendarRef}
                  plugins={[dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin]}
                  initialView="dayGridMonth"
                  events={events}
                  headerToolbar={false} // Hide the header since we have our own
                  eventContent={renderEventContent}
                  dateClick={handleDateClick}
                  eventClick={handleEventClick}
                  height="100%"
                  editable={true}
                  selectable={true}
                  selectMirror={true}
                  dayMaxEvents={3}
                  nowIndicator={true}
                  // Linear-inspired theme
                  themeSystem='standard'
                  dayHeaderFormat={{ weekday: 'short' }}
                  allDaySlot={false}
                  // Other options for better appearance
                  eventTimeFormat={{
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  }}
                />
              </div>
            </div>
          </PremiumCard>
          
          {/* Upcoming Bookings Card */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <PremiumCard>
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-medium text-white">Upcoming Bookings</h2>
                  
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
                
                {bookings.length > 0 ? (
                  <div className="space-y-4">
                    {bookings.slice(0, 5).map((booking) => (
                      <motion.div 
                        key={booking.id}
                        variants={itemVariants}
                        className="p-4 rounded bg-[#1A1A1E] border border-[#2c2c31] flex justify-between items-center"
                        whileHover={{ x: 2, backgroundColor: "#22222b" }}
                        transition={{ duration: 0.2 }}
                      >
                        <div>
                          <h3 className="font-medium text-white">{booking.serviceName}</h3>
                          <p className="text-xs text-[#8c8c8c]">{booking.customerName}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs text-[#8c8c8c]">
                              {format(new Date(booking.start), 'MMM d, yyyy \'at\' h:mm a')}
                            </span>
                            <span className={`ml-2 inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
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
                          </div>
                        </div>
                        <div className="flex items-center">
                          <motion.button 
                            className="text-sm text-[#a3a3a3] hover:text-white mr-2"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </motion.button>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="border-[#2c2c31] hover:border-[#5657F6] text-[#dcdcdc] text-xs font-medium"
                            >
                              View Details
                            </Button>
                          </motion.div>
                        </div>
                      </motion.div>
                    ))}
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
          </motion.div>
        </motion.div>
      </div>

      {/* Event Modal */}
      <AnimatePresence>
        {showEventModal && selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
            onClick={() => setShowEventModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="p-[1px] rounded-lg bg-gradient-to-r from-[#333] via-[#555] to-[#333] overflow-hidden max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-[#151518] rounded-lg overflow-hidden">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div 
                        className="w-3 h-3 rounded-full mr-2" 
                        style={{ backgroundColor: selectedEvent.color }} 
                      />
                      <h3 className="text-xl font-medium text-white">{selectedEvent.title}</h3>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setShowEventModal(false)}
                      className="text-[#a3a3a3] hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </motion.button>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-[#737378] mb-1">Customer</p>
                      <p className="text-sm text-white">{selectedEvent.customerName}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-[#737378] mb-1">Status</p>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        selectedEvent.status === 'confirmed' 
                          ? 'bg-[#1e2c6a] text-[#5657F6]' 
                          : selectedEvent.status === 'pending'
                          ? 'bg-[#2b234b] text-[#9881fc]'
                          : selectedEvent.status === 'cancelled'
                          ? 'bg-[#3a1c1c] text-[#f87171]'
                          : 'bg-[#1a3044] text-[#38bdf8]'
                      }`}>
                        {selectedEvent.status.charAt(0).toUpperCase() + selectedEvent.status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="col-span-2">
                      <p className="text-xs text-[#737378] mb-1">Time</p>
                      <p className="text-sm text-white">
                        {format(selectedEvent.start, 'MMM d, yyyy \'at\' h:mm a')}
                        {selectedEvent.end && ` - ${format(selectedEvent.end, 'h:mm a')}`}
                      </p>
                    </div>
                    
                    {selectedEvent.description && (
                      <div className="col-span-2">
                        <p className="text-xs text-[#737378] mb-1">Notes</p>
                        <p className="text-sm text-[#a3a3a3]">{selectedEvent.description}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="pt-4 border-t border-[#2c2c31] flex justify-end space-x-2">
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="border-[#2c2c31] hover:border-[#5657F6] text-[#dcdcdc] text-xs font-medium"
                        onClick={() => setShowEventModal(false)}
                      >
                        Close
                      </Button>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        className="bg-[#5657F6] hover:bg-[#6E6EF7] text-white rounded-md px-3 py-1.5 text-xs font-medium transition-all duration-200"
                      >
                        Edit Booking
                      </Button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Custom FullCalendar Styling */}
      <style>
        {`
        /* FullCalendar Dark Theme */
        .calendar-container .fc {
          --fc-border-color: #2c2c31;
          --fc-page-bg-color: transparent;
          --fc-neutral-bg-color: #1A1A1E;
          --fc-today-bg-color: #22223b;
          --fc-event-border-color: transparent;
          --fc-now-indicator-color: #5657F6;
          --fc-event-text-color: #fff;
        }
        
        .calendar-container .fc-theme-standard th,
        .calendar-container .fc-theme-standard td {
          border-color: var(--fc-border-color);
        }
        
        .calendar-container .fc-theme-standard .fc-scrollgrid {
          border-color: var(--fc-border-color);
        }
        
        .calendar-container .fc-col-header-cell {
          background-color: #1A1A1E;
          padding: 8px 0;
        }
        
        .calendar-container .fc-col-header-cell-cushion {
          color: #a3a3a3;
          font-weight: 500;
          font-size: 0.8rem;
          text-decoration: none;
        }
        
        .calendar-container .fc-daygrid-day-number {
          color: #a3a3a3;
          text-decoration: none;
          padding: 4px 8px;
          font-size: 0.8rem;
        }
        
        .calendar-container .fc-daygrid-day.fc-day-today .fc-daygrid-day-number {
          color: white;
          font-weight: 500;
        }
        
        .calendar-container .fc-daygrid-day-events {
          padding: 0 2px;
        }
        
        .calendar-container .fc-h-event {
          border-radius: 4px;
          margin-bottom: 2px;
          padding: 0;
          border: none;
        }
        
        .calendar-container .fc-timegrid-slot {
          height: 40px;
        }
        
        .calendar-container .fc-timegrid-slot-label-cushion {
          color: #a3a3a3;
          font-size: 0.75rem;
        }
        
        .calendar-container .fc-timegrid-axis-cushion {
          color: #a3a3a3;
          font-size: 0.75rem;
        }
        
        .calendar-container .fc-timegrid-now-indicator-line {
          border-color: var(--fc-now-indicator-color);
        }
        
        .calendar-container .fc-timegrid-event {
          border-radius: 4px;
        }
        
        .calendar-container .fc-daygrid-day-frame {
          min-height: 90px;
        }
        
        .calendar-container .fc-day-other .fc-daygrid-day-top .fc-daygrid-day-number {
          color: #666;
          opacity: 0.6;
        }
        
        .calendar-container .fc-event-time {
          font-size: 0.75rem;
        }
        
        .calendar-container .fc-event-title {
          font-size: 0.75rem;
          font-weight: 500;
        }
        
        .calendar-container .fc-event:hover {
          opacity: 0.9;
        }
        `}
      </style>
    </div>
  );
};

export default CalendarView;