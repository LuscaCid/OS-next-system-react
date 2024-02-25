import { useState } from "react"
import { HistoryFetchAndRendering } from "./HistoryFetchRender"

export default function JobsHistory () {
  const [query, setQuery] = useState<string>('')
  return (
    <div className="flex-col rounded-md w-full flex gap-1  p-1 items-center border border-zinc-300 dark:border-zinc-800/80">
        
          <input 
          className="py-1 px-2  bg-zinc-300 rounded- w-full border border-zinc-400 text-md text-zinc-950 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700/80"
          type="text"
          placeholder="Pesquisar" 
          onChange={(e) => setQuery(e.target.value)}
        />
        
        <div className=" border-t border-b w-full h-screen overflow-y-auto border-zinc-300 dark:border-zinc-800  rounded-md m-2 flex flex-col gap-2 max-h-[640px]">           
         <HistoryFetchAndRendering query={query}/>
         
      </div> 
  </div>
  )
}