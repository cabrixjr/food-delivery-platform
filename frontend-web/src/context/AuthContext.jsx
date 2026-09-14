// frontend-web/src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const DEMO_CREDENTIALS = {
  CLIENT: {
    email: 'client@foodfinder.com',
    password: 'password123',
    role: 'CLIENT',
    name: 'Alex Johnson',
  },
  HOTEL: {
    email: 'hotel@foodfinder.com',
    password: 'password123',
    role: 'HOTEL',
    name: 'Grand Spice Palace',
  },
  ADMIN: {
    email: 'admin@foodfinder.com',
    password: 'password123',
    role: 'ADMIN',
    name: 'System Admin',
  },
};

export const AuthProvider = ({ children }) => {
  // Start as null (logged out) unless explicit valid token/user exists in localStorage
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('foodfinder_user');
    try {
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });

  const [usersDatabase, setUsersDatabase] = useState(() => {
    const savedDb = localStorage.getItem('foodfinder_users_db');
    return savedDb ? JSON.parse(savedDb) : Object.values(DEMO_CREDENTIALS);
  });

  useEffect(() => {
    localStorage.setItem('foodfinder_users_db', JSON.stringify(usersDatabase));
  }, [usersDatabase]);

  const login = (email, password) => {
    const foundUser = usersDatabase.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('foodfinder_user', JSON.stringify(userWithoutPassword));
      return { success: true, user: userWithoutPassword };
    }
    return { success: false, error: 'Invalid email or password' };
  };

  const register = (newUser) => {
    const existing = usersDatabase.find(
      (u) => u.email.toLowerCase() === newUser.email.toLowerCase()
    );

    if (existing) {
      return { success: false, error: 'User with this email already exists' };
    }

    setUsersDatabase((prev) => [...prev, newUser]);
    const { password: _, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem('foodfinder_user', JSON.stringify(userWithoutPassword));
    return { success: true, user: userWithoutPassword };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('foodfinder_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, DEMO_CREDENTIALS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
