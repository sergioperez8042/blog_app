
'use client'
import React, { useContext } from 'react';
import styles from './themeToggle.module.css';
import Image from 'next/image';
import { ThemeContext } from '../../../context/ThemeContext';

const ThemeToggle: React.FC = () => {
  const context = useContext(ThemeContext);
  
  if (!context) {
    throw new Error('ThemeToggle must be used within a ThemeContextProvider');
  }
  
  const { toggle, theme } = context;
  
  return (
    <div className={styles.container} onClick={toggle}>
      <Image src="/moon.png" alt='moon' width={14} height={14}/>
      <div 
        className={styles.ball} 
        style={{
          left: theme === "dark" ? 2 : 22,
        }}
      ></div>
      <Image src="/sun.png" alt='sun' width={14} height={14}/>
    </div>
  );
};

export default ThemeToggle;
