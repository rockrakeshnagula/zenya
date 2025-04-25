// src/App.tsx
import { Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import { HeaderProvider } from './context/HeaderContext';
import { AuthProvider } from './context/AuthContext';
import { ToastProvider } from './components/providers/ToastProvider';
import Layout from './components/layout/Layout';
import Home from './views/Home';
import LoginPage from './views/LoginPage';
import RegisterPage from './views/RegisterPage';
import BookingPage from './views/BookingPage';
import CalendarView from './views/CalendarView';
import Dashboard from './views/Dashboard';
import NotFound from './views/NotFound';
import ProtectedRoute from './components/auth/ProtectedRoute';
import { initializeLocalStorage } from './utils/storage';

// Initialize localStorage with mock data
initializeLocalStorage();

function App() {
  return (
    <>
      <ToastProvider />
      <HeaderProvider>
        <AuthProvider>
          <BookingProvider>
            <Layout>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                {/* Protected Routes */}
                <Route path="/booking" element={
                  <ProtectedRoute>
                    <BookingPage />
                  </ProtectedRoute>
                } />
                <Route path="/calendar" element={
                  <ProtectedRoute>
                    <CalendarView />
                  </ProtectedRoute>
                } />
                <Route path="/dashboard" element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } />

                {/* 404 Route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Layout>
          </BookingProvider>
        </AuthProvider>
      </HeaderProvider>
    </>
  );
}

export default App;