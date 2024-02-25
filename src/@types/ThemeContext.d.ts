export type Theme = "light" | "dark"

export interface ContextProviderProps {
  children: React.ReactNode;
}

export interface IContext {
  theme : Theme
  toggleTheme: (themeSet : Theme) => void
}
