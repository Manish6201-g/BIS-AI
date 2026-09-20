import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bismart_user');
    return saved ? JSON.parse(saved) : {
      id: 'demo-consumer',
      email: 'consumer@bismart.gov.in',
      full_name: 'Aarav Sharma',
      role: 'consumer',
      organization: 'Consumer Forum'
    };
  });
  const [token, setToken] = useState(() => localStorage.getItem('bismart_token') || 'demo_token');
  const [loading, setLoading] = useState(false);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      const data = response.data;
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('bismart_token', data.access_token);
      localStorage.setItem('bismart_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.detail || 'Invalid email or password' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      const data = response.data;
      setToken(data.access_token);
      setUser(data.user);
      localStorage.setItem('bismart_token', data.access_token);
      localStorage.setItem('bismart_user', JSON.stringify(data.user));
      return { success: true };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.detail || 'Registration failed' 
      };
    } finally {
      setLoading(false);
    }
  };

  const switchDemoRole = (role) => {
    let mockUser;
    if (role === 'admin') {
      mockUser = {
        id: 'demo-admin',
        email: 'admin@bismart.gov.in',
        full_name: 'Rajesh Verma (BIS Scientist E)',
        role: 'admin',
        organization: 'Bureau of Indian Standards Central HQ'
      };
    } else if (role === 'industry') {
      mockUser = {
        id: 'demo-industry',
        email: 'industry@bismart.gov.in',
        full_name: 'Priya Patel',
        role: 'industry',
        organization: 'Apex Kitchenware & Manufacturing Ltd'
      };
    } else {
      mockUser = {
        id: 'demo-consumer',
        email: 'consumer@bismart.gov.in',
        full_name: 'Aarav Sharma',
        role: 'consumer',
        organization: 'General Citizen / Consumer'
      };
    }
    setUser(mockUser);
    localStorage.setItem('bismart_user', JSON.stringify(mockUser));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bismart_token');
    localStorage.removeItem('bismart_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, switchDemoRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
