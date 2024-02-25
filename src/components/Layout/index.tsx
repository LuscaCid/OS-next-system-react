import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar/Sidebar";

export function Layout() {
  return (
    <div className="overflow-hidden flex flex-col border-b-none border h-full border-zinc-300 dark:border-zinc-800 rounded-md shadow-2xl">
      <Header />
      <div className="flex">
        <Sidebar />
        <Outlet />
      </div>
        
    </div>
  )
}