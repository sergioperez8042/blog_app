'use client'

import { useState, createContext, useEffect } from "react";

export const ThemeContext = createContext()

const getFromLocalStorage = () => {
    if(typeof window !== "undefined"){
        const value = localStorage.getItem("theme")
        return value || "light"
    }
    return "light"
};

export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState("light")

    useEffect(() => {
        const storedTheme = getFromLocalStorage()
        setTheme(storedTheme)
    }, [])

    const toggle = () => {
      setTheme(theme === "light" ? "dark" : "light");
    }

    useEffect(() => {
      if(typeof window !== "undefined"){
        localStorage.setItem("theme", theme);
      }
    }, [theme]);

  return (
    <ThemeContext.Provider value={{theme,toggle}}>
      {children}
    </ThemeContext.Provider>
  )
}