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
    <>
        <button 
            onClick={handleSwitchTheme}
            name='light' 
            className='hover:bg-zinc-200 transition duration-200 rounded-md flex px-1 border border-zinc-300  dark:border-zinc-800/80  items-center dark:hover:bg-zinc-800/80 justify-between'>
            light <Sun size={20} />
        </button>

            <button 
            onClick={handleSwitchTheme}
            name='dark' 
            className='hover:bg-zinc-200 transition duration-200 rounded-md flex px-1 border border-zinc-300  dark:border-zinc-800/80 items-center dark:hover:bg-zinc-800/80 justify-between'>
            dark <Moon size={20} />
        </button>
        </>
    )
}  