import { History } from "lucide-react";
import UsersHistory from "./UsersHistory";

export function UsersSection () {
  
  return (
    <section className="w-full h-screen border-b border-zinc-300 dark:border-zinc-800/80">
      <h1 className=" p-2 flex items-center gap-2 text-3xl font-bold border border-t-0 border-l-0 border-r-0  border-zinc-300 dark:border-zinc-800 w-full">
        <div className="rounded-md border border-zinc-300 dark:border-zinc-800/80">
          <History size={24} />
        </div>
          Historico de clientes
        </h1>
        
        <div className=" border-zinc-300 dark:border-zinc-800  rounded-md m-2 flex flex-col gap-2  ">           
          <UsersHistory />
        </div>     
    </section> 
  )
}