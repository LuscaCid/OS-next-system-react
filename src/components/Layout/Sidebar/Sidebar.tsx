import { SidebarContext } from "../../../contexts/Sidebar-context";
import { ChevronsUpDown, User } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useContextSelector } from "use-context-selector";
import { ChangeTheme } from "./Theme";

export function Sidebar () {

  const isOpen = useContextSelector(SidebarContext, (context) => context.isOpen)

  return (
    <aside className={` rounded-md  opacity-0 ease-in-out  h-screen  bg-zinc-100 w-0 items-start overflow-hidden p-2 transition-all duration-200 border-r border-t  border-zinc-300 dark:bg-zinc-950 dark:border-zinc-800 ${isOpen ? `w-36 opacity-100 ` : `w-0 -mx-2`}`}>
            
            <div className="rounded-md border border-zinc-300 no dark:border-zinc-800 flex gap-1 hover:bg-zinc-300 dark:hover:bg-zinc-800 transition duration-200 cursor-pointer mb-2 items-center  text-nowrap overflow-x-hidden" >
                <User  size={15}/>Lucas Cid <ChevronsUpDown size={15} />
            </div>
 
            <nav className="list-none flex flex-col gap-2">
                <li className="cursor-pointer bg-transparent rounded-md p-1 w-full hover:bg-zinc-200 transition duration-200 dark:hover:bg-zinc-800 ">
                  <NavLink to='/' />
                  Home
                </li>
                <li className="cursor-pointer bg-transparent rounded-md p-1 w-full hover:bg-zinc-200 transition duration-200 dark:hover:bg-zinc-800 ">
                  <NavLink to='/costumer'/>
                  Costumers
                </li>
                <li className="cursor-pointer bg-transparent rounded-md p-1 w-full hover:bg-zinc-200 transition duration-200 dark:hover:bg-zinc-800 ">
                  <NavLink to='/settings'/>
                  Settings
                </li>
                <ChangeTheme />
            </nav>
        </aside>
  )
}