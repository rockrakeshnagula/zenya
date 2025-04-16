import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { HeaderProvider } from './context/HeaderContext';
import Layout from './components/layout/Layout';
import Home from './views/Home';
import BookingPage from './views/BookingPage';
import CalendarView from './views/CalendarView';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';

function App() {
  return (
    <BookingProvider>
      <HeaderProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Layout>
      </HeaderProvider>
    </BookingProvider>
  );
}

export default App;