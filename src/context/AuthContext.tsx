import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in on initial load
  useEffect(() => {
    const loadUser = () => {
      try {
        const storedUser = localStorage.getItem('zenya_user');
        const token = localStorage.getItem('zenya_token');
        
        if (storedUser && token) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Error loading user:', error);
        // Clear any invalid data
        localStorage.removeItem('zenya_user');
        localStorage.removeItem('zenya_token');
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();
  }, []);

  // Login function - simulates API call with mock data
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, accept any well-formed email/password
      // In production, this would validate against a backend
      if (email && password.length >= 6) {
        const userData: User = {
          id: `user-${Date.now()}`,
          name: email.split('@')[0], // Extract name from email
          email: email,
          role: 'customer'
        };
        
        // Store in localStorage
        localStorage.setItem('zenya_user', JSON.stringify(userData));
        localStorage.setItem('zenya_token', 'mock-jwt-token');
        
        setUser(userData);
        toast.success('Successfully logged in!');
        
        // Use the redirectPath if provided, otherwise default to dashboard
        // IMPORTANT: Do not navigate here, let the login page handle navigation
        return;
      }
      
      throw new Error('Invalid credentials');
    } catch (error) {
      toast.error('Invalid email or password');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function - simulates API call with mock data
  const register = async (name: string, email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Validate password
      if (!password || password.length < 6) {
        throw new Error('Password must be at least 6 characters long');
      }
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user registration response
      const userData: User = {
        id: `user-${Date.now()}`,
        name: name,
        email: email,
        role: 'customer'
      };
      
      // Store in localStorage
      localStorage.setItem('zenya_user', JSON.stringify(userData));
      localStorage.setItem('zenya_token', 'mock-jwt-token');
      
      setUser(userData);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('zenya_user');
    localStorage.removeItem('zenya_token');
    setUser(null);
    toast.success('Successfully logged out!');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
};