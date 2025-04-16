export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price: number;
  category: string;
  color: string;
  image?: string;
}

export interface TimeSlot {
  id: string;
  start: string; // ISO date string
  end: string; // ISO date string
  available: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  start: string; // ISO date string
  end: string; // ISO date string
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  notes?: string;
  status: BookingStatus;
  color: string;
  createdAt: string; // ISO date string
}

export type BookingStatus = 'confirmed' | 'pending' | 'cancelled' | 'completed';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'customer';
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  color: string;
  extendedProps: {
    booking: Booking;
  };
}