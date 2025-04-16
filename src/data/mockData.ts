import { Service, Booking, User } from '../types';
import { addDays, addMinutes, format, startOfDay, setHours, setMinutes } from 'date-fns';

// Services
export const services: Service[] = [
  {
    id: '1',
    name: 'Premium Consultation',
    description: 'One-on-one consultation with our expert advisor.',
    duration: 60,
    price: 150,
    category: 'Consultation', 
    color: '#4f46e5', // indigo-600
  },
  {
    id: '2',
    name: 'Executive Coaching',
    description: 'Personalized coaching session for executives and leaders.',
    duration: 90,
    price: 250,
    category: 'Coaching',
    color: '#0369a1', // blue-700
  },
  {
    id: '3',
    name: 'Wellness Session',
    description: 'Comprehensive wellness and mindfulness session.',
    duration: 75,
    price: 175,
    category: 'Wellness',
    color: '#16a34a', // green-600
  },
  {
    id: '4',
    name: 'Strategic Planning',
    description: 'Collaborative strategic planning and roadmapping session.',
    duration: 120,
    price: 350,
    category: 'Strategy',
    color: '#9333ea', // purple-600
  },
  {
    id: '5',
    name: 'Express Check-in',
    description: 'Quick check-in and progress assessment.',
    duration: 30,
    price: 75,
    category: 'Check-in',
    color: '#dc2626', // red-600
  },
];

// Generate bookings for the next 14 days
const generateBookings = (): Booking[] => {
  const bookings: Booking[] = [];
  const today = startOfDay(new Date());
  const statuses: Booking['status'][] = ['confirmed', 'pending', 'cancelled', 'completed'];
  
  // Customer information templates
  const customers = [
    { name: 'Emma Thompson', email: 'emma@example.com', phone: '555-123-4567' },
    { name: 'James Wilson', email: 'james@example.com', phone: '555-987-6543' },
    { name: 'Olivia Garcia', email: 'olivia@example.com', phone: '555-456-7890' },
    { name: 'William Chen', email: 'william@example.com', phone: '555-789-0123' },
    { name: 'Sophia Kim', email: 'sophia@example.com', phone: '555-234-5678' },
  ];
  
  // Generate bookings
  for (let i = 0; i < 30; i++) {
    const dayOffset = Math.floor(i / 3); // Distribute across 10 days
    const bookingDate = addDays(today, dayOffset);
    
    // Set booking to business hours (9 AM - 5 PM)
    const hourOffset = (i % 3) * 3; // Space out appointments
    const startTime = setHours(setMinutes(bookingDate, 0), 9 + hourOffset);
    
    // Select a random service
    const service = services[Math.floor(Math.random() * services.length)];
    const customer = customers[Math.floor(Math.random() * customers.length)];
    
    // Create booking
    bookings.push({
      id: `booking-${i + 1}`,
      serviceId: service.id,
      serviceName: service.name,
      start: startTime.toISOString(),
      end: addMinutes(startTime, service.duration).toISOString(),
      customerName: customer.name,
      customerEmail: customer.email,
      customerPhone: customer.phone,
      notes: Math.random() > 0.7 ? 'Special requests noted for this appointment.' : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      color: service.color,
      createdAt: addDays(today, -Math.floor(Math.random() * 10)).toISOString(),
    });
  }
  
  return bookings;
};

export const bookings: Booking[] = generateBookings();

// Users
export const users: User[] = [
  {
    id: '1',
    name: 'Admin User',
    email: 'admin@zenya.com',
    role: 'admin',
  },
  {
    id: '2',
    name: 'Test Customer',
    email: 'customer@example.com',
    role: 'customer',
  },
];

// Generate available time slots
export const generateTimeSlots = (date: Date, serviceId: string) => {
  const timeSlots = [];
  const service = services.find(s => s.id === serviceId);
  
  if (!service) return [];
  
  const dayStart = setHours(setMinutes(startOfDay(date), 0), 9); // 9 AM
  const dayEnd = setHours(setMinutes(startOfDay(date), 0), 17); // 5 PM
  
  // Generate 30-minute slots
  let currentSlot = dayStart;
  const slotDuration = 30; // minutes
  
  while (currentSlot < dayEnd) {
    const slotEnd = addMinutes(currentSlot, slotDuration);
    
    // Check if this slot overlaps with any existing booking
    const isAvailable = !bookings.some(booking => {
      const bookingStart = new Date(booking.start);
      const bookingEnd = new Date(booking.end);
      
      // Check for overlap
      return (
        booking.status !== 'cancelled' &&
        ((currentSlot >= bookingStart && currentSlot < bookingEnd) ||
        (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
        (currentSlot <= bookingStart && slotEnd >= bookingEnd))
      );
    });
    
    timeSlots.push({
      id: `slot-${format(currentSlot, 'yyyyMMddHHmm')}`,
      start: currentSlot.toISOString(),
      end: slotEnd.toISOString(),
      available: isAvailable
    });
    
    currentSlot = slotEnd;
  }
  
  return timeSlots;
};