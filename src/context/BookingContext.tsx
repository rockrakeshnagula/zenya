import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { Booking, Service, TimeSlot, BookingStatus } from '../types';
import { 
  getBookings, 
  addBooking, 
  updateBooking,
  getServices,
  getServiceById as getServiceByIdFromStorage
} from '../utils/storage';
import { generateTimeSlots } from '../data/mockData';

interface BookingContextType {
  bookings: Booking[];
  services: Service[];
  loading: boolean;
  createBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void;
  updateBookingStatus: (bookingId: string, status: BookingStatus) => void;
  rescheduleBooking: (bookingId: string, newStart: string, newEnd: string) => void;
  cancelBooking: (bookingId: string) => void;
  getServiceById: (serviceId: string) => Service | undefined;
  getAvailableTimeSlots: (date: Date, serviceId: string) => TimeSlot[];
}

const BookingContext = React.createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = React.useState<Booking[]>([]);
  const [services, setServices] = React.useState<Service[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    // Load data from localStorage
    const loadData = () => {
      try {
        const bookingsData = getBookings();
        const servicesData = getServices();
        
        setBookings(bookingsData);
        setServices(servicesData);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Error loading booking data');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const createBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    try {
      const newBooking: Booking = {
        ...bookingData,
        id: uuidv4(),
        createdAt: new Date().toISOString(),
      };
      
      addBooking(newBooking);
      setBookings((prev: Booking[]) => [...prev, newBooking]);
      toast.success('Booking created successfully');
      
      return newBooking;
    } catch (error) {
      console.error('Error creating booking:', error);
      toast.error('Failed to create booking');
      return null;
    }
  };

  const updateBookingStatus = (bookingId: string, status: BookingStatus) => {
    try {
      const bookingToUpdate = bookings.find((b) => b.id === bookingId);
      
      if (!bookingToUpdate) {
        throw new Error('Booking not found');
      }
      
      const updatedBooking = {
        ...bookingToUpdate,
        status,
      };
      
      updateBooking(updatedBooking);
      setBookings((prev: Booking[]) => 
        prev.map((b: Booking) => (b.id === bookingId ? updatedBooking : b))
      );
      
      toast.success(`Booking ${status}`);
    } catch (error) {
      console.error('Error updating booking status:', error);
      toast.error('Failed to update booking status');
    }
  };

  const rescheduleBooking = (bookingId: string, newStart: string, newEnd: string) => {
    try {
      const bookingToUpdate = bookings.find((b) => b.id === bookingId);
      
      if (!bookingToUpdate) {
        throw new Error('Booking not found');
      }
      
      const updatedBooking = {
        ...bookingToUpdate,
        start: newStart,
        end: newEnd,
      };
      
      updateBooking(updatedBooking);
      setBookings((prev: Booking[]) => 
        prev.map((b: Booking) => (b.id === bookingId ? updatedBooking : b))
      );
      
      toast.success('Booking rescheduled');
    } catch (error) {
      console.error('Error rescheduling booking:', error);
      toast.error('Failed to reschedule booking');
    }
  };

  const cancelBooking = (bookingId: string) => {
    updateBookingStatus(bookingId, 'cancelled');
  };

  const getServiceByIdFunction = (serviceId: string) => {
    return getServiceByIdFromStorage(serviceId);
  };

  const getAvailableTimeSlots = (date: Date, serviceId: string) => {
    return generateTimeSlots(date, serviceId);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        services,
        loading,
        createBooking,
        updateBookingStatus,
        rescheduleBooking,
        cancelBooking,
        getServiceById: getServiceByIdFunction,
        getAvailableTimeSlots,
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = React.useContext(BookingContext);
  
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  
  return context;
};