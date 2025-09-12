
'use client';

import { useState, useEffect } from 'react';
import { Sun, Moon, Laptop, Bot } from 'lucide-react';
import { Flame } from 'lucide-react';

export const themes = [
  { value: 'light', label: 'Light', icon: Sun },
  { value: 'dark', label: 'Dark', icon: Moon },
  { value: 'system', label: 'System', icon: Laptop },
  { value: 'theme-pinkpurple', label: 'Pink/Purple', icon: Bot },
  { value: 'theme-firebase-neon', label: 'Firebase Neon', icon: Flame },
];

export function useTheme() {
  const [theme, setThemeState] = useState('system');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && themes.some(t => t.value === savedTheme)) {
        setThemeState(savedTheme);
    }
  }, []);

  const setTheme = (newTheme: string) => {
    const root = document.documentElement;
    
    // Clear existing theme classes from both globals.css and the html element
    themes.forEach(t => root.classList.remove(t.value));
    
    let activeTheme = newTheme;
    if (newTheme === 'system') {
      activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    root.classList.add(activeTheme);
    localStorage.setItem('theme', newTheme);
    setThemeState(newTheme);
  };

  useEffect(() => {
    // This effect ensures the correct class is applied on initial load
    // and when the system preference changes.
     let activeTheme = theme;
     if (theme === 'system') {
        activeTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
     }
     const root = document.documentElement;
     themes.forEach(t => root.classList.remove(t.value));
     root.classList.add(activeTheme);

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
        if (localStorage.getItem('theme') === 'system') {
            const newActiveTheme = mediaQuery.matches ? 'dark' : 'light';
            themes.forEach(t => root.classList.remove(t.value));
            root.classList.add(newActiveTheme);
        }
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);

  }, [theme]);

  return { theme, setTheme, themes };
}

/**
 * @deprecated This component is deprecated and should not be used directly.
 * Use the `useTheme` hook and build the menu items in your component instead.
 */
export function ThemeSwitcher() {
    return null;
}
