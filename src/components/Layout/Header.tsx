import { SidebarContext } from "../../contexts/Sidebar-context"
import { MenuIcon, Rocket } from "lucide-react"
import { useContextSelector } from "use-context-selector"

export function Header() {

  const handleOpenOrClose = useContextSelector(
    SidebarContext, 
    (context) => {
    return  context.handleOpenOrClose
  })

  function handleChange () {
    handleOpenOrClose()
    console.log('edsa')
  }
  return (
    <header className="flex justify-between items-center  p-1  w-full bg-transparent shadow-md border-b dark:border-zinc-800">
      <button className="bg-transparent border-b border-zinc-300 dark:border-zinc-800 p-1 rounded-md dark:hover:bg-zinc-800/80 hover:bg-zinc-200 duration-200 " onClick={handleChange}>
        <MenuIcon size={24}/>
      </button>
      <Rocket size={24}/>
    </header>
  )
}