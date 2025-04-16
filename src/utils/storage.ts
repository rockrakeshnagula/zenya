import { Booking, Service, User } from '../types';
import { bookings as mockBookings, services as mockServices, users as mockUsers } from '../data/mockData';

// Keys for localStorage
const BOOKINGS_KEY = 'zenya_bookings';
const SERVICES_KEY = 'zenya_services';
const USERS_KEY = 'zenya_users';

// Initialize localStorage with mock data if empty
export const initializeLocalStorage = () => {
  if (!localStorage.getItem(BOOKINGS_KEY)) {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(mockBookings));
  }
  
  if (!localStorage.getItem(SERVICES_KEY)) {
    localStorage.setItem(SERVICES_KEY, JSON.stringify(mockServices));
  }
  
  if (!localStorage.getItem(USERS_KEY)) {
    localStorage.setItem(USERS_KEY, JSON.stringify(mockUsers));
  }
};

// Booking operations
export const getBookings = (): Booking[] => {
  const bookingsJSON = localStorage.getItem(BOOKINGS_KEY);
  return bookingsJSON ? JSON.parse(bookingsJSON) : [];
};

export const addBooking = (booking: Booking): void => {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
};

export const updateBooking = (updatedBooking: Booking): void => {
  const bookings = getBookings();
  const index = bookings.findIndex(booking => booking.id === updatedBooking.id);
  
  if (index !== -1) {
    bookings[index] = updatedBooking;
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }
};

export const deleteBooking = (bookingId: string): void => {
  const bookings = getBookings();
  const filteredBookings = bookings.filter(booking => booking.id !== bookingId);
  localStorage.setItem(BOOKINGS_KEY, JSON.stringify(filteredBookings));
};

// Service operations
export const getServices = (): Service[] => {
  const servicesJSON = localStorage.getItem(SERVICES_KEY);
  return servicesJSON ? JSON.parse(servicesJSON) : [];
};

export const getServiceById = (serviceId: string): Service | undefined => {
  const services = getServices();
  return services.find(service => service.id === serviceId);
};

// User operations
export const getUsers = (): User[] => {
  const usersJSON = localStorage.getItem(USERS_KEY);
  return usersJSON ? JSON.parse(usersJSON) : [];
};

export const getCurrentUser = (): User => {
  // In a real app, this would check authentication
  // For our demo, we'll just return the admin user
  const users = getUsers();
  return users.find(user => user.role === 'admin') || users[0];
};