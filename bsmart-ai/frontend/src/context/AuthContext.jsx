import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authService } from '../services/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('bismart_user');
    try {
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => localStorage.getItem('bismart_token') || null);
  const [refreshToken, setRefreshToken] = useState(() => localStorage.getItem('bismart_refresh_token') || null);
  const [loading, setLoading] = useState(true);

  // Validate session on app initialization
  const initializeAuth = useCallback(async () => {
    const storedToken = localStorage.getItem('bismart_token');
    const storedRefresh = localStorage.getItem('bismart_refresh_token');

    if (!storedToken && !storedRefresh) {
      setUser(null);
      setToken(null);
      setRefreshToken(null);
      setLoading(false);
      return;
    }

    try {
      // Try to get fresh profile with current token
      const res = await authService.getMe();
      setUser(res.data);
      localStorage.setItem('bismart_user', JSON.stringify(res.data));
    } catch {
      // If access token failed, try refreshing if refresh token exists
      if (storedRefresh) {
        try {
          const refreshRes = await authService.refresh(storedRefresh);
          const { access_token, refresh_token: newRefresh, user: refreshedUser } = refreshRes.data;
          setToken(access_token);
          setRefreshToken(newRefresh);
          setUser(refreshedUser);
          localStorage.setItem('bismart_token', access_token);
          localStorage.setItem('bismart_refresh_token', newRefresh);
          localStorage.setItem('bismart_user', JSON.stringify(refreshedUser));
        } catch {
          // Both failed: clear auth state
          setUser(null);
          setToken(null);
          setRefreshToken(null);
          localStorage.removeItem('bismart_token');
          localStorage.removeItem('bismart_refresh_token');
          localStorage.removeItem('bismart_user');
        }
      } else {
        setUser(null);
        setToken(null);
        localStorage.removeItem('bismart_token');
        localStorage.removeItem('bismart_user');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    initializeAuth();

    // Listen for logout events dispatched by api interceptor
    const handleLogoutEvent = () => {
      setUser(null);
      setToken(null);
      setRefreshToken(null);
    };
    window.addEventListener('bismart_auth_logout', handleLogoutEvent);
    return () => window.removeEventListener('bismart_auth_logout', handleLogoutEvent);
  }, [initializeAuth]);

  // Login handler
  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await authService.login(email, password);
      const data = response.data;
      setToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setUser(data.user);
      localStorage.setItem('bismart_token', data.access_token);
      localStorage.setItem('bismart_refresh_token', data.refresh_token);
      localStorage.setItem('bismart_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      const msg = err.response?.data?.detail || 'Invalid email or password';
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // Register handler
  const register = async (userData) => {
    setLoading(true);
    try {
      const response = await authService.register(userData);
      const data = response.data;
      setToken(data.access_token);
      setRefreshToken(data.refresh_token);
      setUser(data.user);
      localStorage.setItem('bismart_token', data.access_token);
      localStorage.setItem('bismart_refresh_token', data.refresh_token);
      localStorage.setItem('bismart_user', JSON.stringify(data.user));
      return { success: true, user: data.user };
    } catch (err) {
      const msg = err.response?.data?.detail || 'Registration failed';
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  // Profile update handler
  const updateProfile = async (updateData) => {
    try {
      const response = await authService.updateProfile(updateData);
      setUser(response.data);
      localStorage.setItem('bismart_user', JSON.stringify(response.data));
      return { success: true, user: response.data };
    } catch (err) {
      return { 
        success: false, 
        message: err.response?.data?.detail || 'Failed to update profile' 
      };
    }
  };

  // Logout handler (revokes on server too)
  const logout = async () => {
    const currentRefresh = refreshToken || localStorage.getItem('bismart_refresh_token');
    if (currentRefresh) {
      try {
        await authService.logout(currentRefresh);
      } catch (err) {
        console.warn('Server logout error:', err);
      }
    }
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    localStorage.removeItem('bismart_token');
    localStorage.removeItem('bismart_refresh_token');
    localStorage.removeItem('bismart_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      token, 
      loading, 
      isAuthenticated: !!user,
      login, 
      register, 
      logout,
      updateProfile 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
