import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { getRealm } from '../db/realm';
import { User } from '../types/userInterface';

interface ThemeContextType {
  themeColor: string;
  setThemeColor: (color: string) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [themeColor, setThemeColor] = useState<string>('#22c55e');

  useEffect(() => {
    const loadAppColor = async () => {
        const realm = await getRealm();
        const user = realm.objects<User>('User')[0];

        if (user && user.appColor) {
            setThemeColor(user.appColor);
        }
    };

    loadAppColor();
}, []);
  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
