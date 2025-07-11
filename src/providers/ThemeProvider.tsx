'use client'
import React, { useContext, ReactNode } from 'react';
import { ThemeContext } from '../context/ThemeContext';

interface ThemeProviderProps {
  children: ReactNode;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('ThemeProvider must be used within a ThemeContextProvider');
  }
  
  const { theme } = context;
  
  return (
    <div className={theme}>
      {children}
    </div>
  );
};

export default ThemeProvider;
