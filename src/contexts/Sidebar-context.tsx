import { createContext } from "use-context-selector";
import { ContextProps } from '../@types/SidebarContext'
import { ReactNode, useState } from "react";

export const SidebarContext = createContext({} as ContextProps)

export  function SidebarContextProvider ({children} : {children : ReactNode}) {
  
  const [isOpen, setIsOpen] = useState<boolean>(false) 
  
  function handleOpenOrClose () {
    setIsOpen(!isOpen)
    console.log(isOpen)
  }
  return (
    <SidebarContext.Provider value={{
      isOpen,
      handleOpenOrClose
    }}>
      {children} 
    </SidebarContext.Provider>
  )
}