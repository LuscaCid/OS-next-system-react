import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar/Sidebar";

export function Layout() {
  return (
    <div className="h-screen flex flex-col border-b-none border border-zinc-300 dark:border-zinc-800 rounded-md shadow-2xl">
      <Header />
      <div className="flex h-full">
        <Sidebar />
        <Outlet />
      </div>
        
    </div>
  )
}