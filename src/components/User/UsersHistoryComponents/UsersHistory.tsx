import { useState } from "react"
import { UserFetch } from "./UserFetchData"

export default function UsersHistory () {
  const [query, setQuery] = useState<string>('')
  return (
    <div className="flex-col absolute inset-0 rounded-md w-full flex gap-1  p-1 items-center border border-zinc-300 dark:border-zinc-800/80">
        
          <input 
          className="py-1 px-2 rounded-sm bg-zinc-300 rounded- w-full border border-zinc-400 text-md text-zinc-950 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700/80"
          type="text"
          placeholder="Pesquisar clientes" 
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <div className=" border-t border-b w-full overflow-y-auto border-zinc-300 dark:border-zinc-800  rounded-md m-1 flex flex-col gap-2 pr-1 ">           
         <UserFetch query={query}/>
         
      </div> 
  </div>
  )
}