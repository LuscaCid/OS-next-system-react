import * as Dialog from '@radix-ui/react-dialog'
import { ChevronsUpDown, Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

interface props {
  currentTheme : string
}

export function ThemeTriggerButton({currentTheme} : props){
  
  const [isDark, setIsDark] = useState<boolean>(currentTheme === 'light' ? false : true)
  useEffect(() => {
    setIsDark(currentTheme === 'light' ? false : true)

  }, [setIsDark, currentTheme ]) 
  return ( 
    <Dialog.Trigger asChild>
      <button type='button' className='text-sm font-bold items-center flex justify-between dark:text-zinc-300  w-full bg-transparent p-1 px-3 border dark:hover:bg-zinc-900 border-zinc-300 dark:border-zinc-800 rounded-md hover:bg-zinc-300 transition duration-200 cursor-pointer'>
        Theme {isDark ? (<Moon size={20} />) : (<Sun size={20}/>)}  
        <ChevronsUpDown size={20} />
      </button>
    </Dialog.Trigger>

  )
} 