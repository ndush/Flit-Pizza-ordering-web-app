// contexts/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, password) => {
    // Replace this with your actual authentication logic
    const isValidUser = await simulateAuthentication(email, password);

    if (isValidUser) {
      // Simulate getting user data from your authentication provider
      const userData = {
        email,
        // Other user properties...
        role: email === 'admin@mail.com' ? 'admin' : 'user', // Simulate assigning roles
      };

      setUser(userData);
      setIsAuthenticated(true);
    } else {
      throw new Error('Invalid credentials');
    }
  };

  const simulateAuthentication = (email, password) => {
    // Simulate a simple authentication check
    const validAdminEmail = 'admin@mail.com';
    const validAdminPassword = 'admin123';
    const validUserEmail = 'user@mail.com';
    const validUserPassword = 'user123';

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          (email === validAdminEmail && password === validAdminPassword) ||
          (email === validUserEmail && password === validUserPassword)
        );
      }, 1000); // Simulate a delay for asynchronous behavior
    });
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
  };

  const checkUserRole = () => {
    return user ? user.role : null;
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout, checkUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth hook should be used within a functional component
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};
