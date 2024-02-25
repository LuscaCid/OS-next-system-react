import { ContextProviderProps, IContext, Theme } from "@/@types/ThemeContext";
import { useState } from "react";
import { createContext } from "use-context-selector";

export const ThemeContext = createContext({} as IContext)

export function ThemeProvider ({ children }: ContextProviderProps) {
  const [theme, setTheme] = useState<Theme>(() : Theme => {
    const storageTheme = localStorage.getItem('@symnager-theme') || 'light'
    return storageTheme as Theme
  })

  function toggleTheme(themeSet : Theme){
    setTheme(themeSet)
  }
  return (
    <ThemeContext.Provider value={{
      theme,
      toggleTheme
    }}>
      {children}
    </ThemeContext.Provider>
  )
}