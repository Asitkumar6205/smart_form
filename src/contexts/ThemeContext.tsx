import React, { createContext, useContext, useState, useEffect } from 'react';

export type ThemeName = 
  | 'plain' 
  | 'winter' 
  | 'snowy-night' 
  | 'vintage' 
  | 'vampire' 
  | 'bubblegum' 
  | 'green-tea' 
  | 'wood' 
  | 'beach';

interface ThemeContextType {
  currentTheme: ThemeName;
  setTheme: (theme: ThemeName) => void;
  themes: { name: ThemeName; label: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = [
  { name: 'plain' as const, label: 'Plain' },
  { name: 'winter' as const, label: 'Winter' },
  { name: 'snowy-night' as const, label: 'Snowy Night' },
  { name: 'vintage' as const, label: 'Vintage' },
  { name: 'vampire' as const, label: 'Vampire' },
  { name: 'bubblegum' as const, label: 'Bubblegum' },
  { name: 'green-tea' as const, label: 'Green Tea' },
  { name: 'wood' as const, label: 'Wood' },
  { name: 'beach' as const, label: 'Beach' },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeName>('plain');

  useEffect(() => {
    const savedTheme = localStorage.getItem('app-theme') as ThemeName;
    if (savedTheme && themes.some(t => t.name === savedTheme)) {
      setCurrentTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('app-theme', currentTheme);
  }, [currentTheme]);

  const setTheme = (theme: ThemeName) => {
    setCurrentTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    // Fallback to avoid crashes if ThemeProvider isn't mounted yet
    return {
      currentTheme: 'plain' as ThemeName,
      setTheme: () => {},
      themes,
    };
  }
  return context;
};