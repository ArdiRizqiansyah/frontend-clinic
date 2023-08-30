import React, { useEffect } from "react";
import { themeChange } from "theme-change";

// create context
export const ThemeContext = React.createContext({
    theme: window.localStorage.getItem('theme') || 'light',
    toggleTheme: () => {},
});

// create provider
interface ThemeProviderProps {
    children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
    const [theme, setTheme] = React.useState(
        () => window.localStorage.getItem('theme') || 'light',
    );

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    }

    useEffect(() => {
      themeChange();
      console.log(theme);
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>
    );
}