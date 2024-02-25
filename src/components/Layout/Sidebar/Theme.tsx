import * as Dialog from '@radix-ui/react-dialog'
import { ThemeTriggerButton } from './ThemeTrigger'
import { MouseEvent, useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ChangeTheme() {
    
    const [actualTheme, setActualTheme] = useState<string>('')


    function handleSwitchTheme(e : MouseEvent<HTMLButtonElement>) {
        e.preventDefault()
        if(e.currentTarget.name === 'light'){
            setActualTheme('light')
            localStorage.setItem('@OS-theme', 'light')
            
        } else if(e.currentTarget.name === 'dark'){
            setActualTheme('dark')
            localStorage.setItem('@OS-theme', 'dark')
        }
    }

    useEffect(() => {
        const themeFromStorage = localStorage.getItem('@OS-theme')
        setActualTheme(themeFromStorage ? themeFromStorage : 'light')

        const HtmlElement = document.querySelector('html')
        if(themeFromStorage === 'dark'){
            HtmlElement?.classList.add('dark')
        } else if (themeFromStorage === 'light') {
            HtmlElement?.classList.remove('dark')
        }

    }, [])

    useEffect(() => {
        const HtmlElement = document.querySelector('html')
        if(actualTheme === 'dark'){
            HtmlElement?.classList.add('dark')
        } else if (actualTheme === 'light') {
            HtmlElement?.classList.remove('dark')
        }
    }, [actualTheme])
    return (
        <Dialog.Root>
            <ThemeTriggerButton currentTheme = {actualTheme}/>
            <Dialog.Overlay/>
            <Dialog.Content className='flex flex-col gap-1 rounded-md border  border-zinc-300 p-2 dark:border-zinc-900 shadow-md'>     
                <button 
                    onClick={handleSwitchTheme}
                    name='light' 
                    className='hover:bg-zinc-200 transition duration-200 rounded-md flex px-2 dark:hover:bg-zinc-800/80 justify-between'>
                    light <Sun size={20} />
                </button>
        
            
                 <button 
                    onClick={handleSwitchTheme}
                    name='dark' 
                    className='hover:bg-zinc-200 transition duration-200 rounded-md flex px-2 dark:hover:bg-zinc-800/80 justify-between'>
                    dark <Moon size={20} />
                </button>

            </Dialog.Content>
        </Dialog.Root>
    )
}