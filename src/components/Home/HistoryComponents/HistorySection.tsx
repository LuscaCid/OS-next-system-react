import { History } from "lucide-react";
import JobsHistory from "./JobsHistory";

export function HistorySection () {
  

  return (
    <section className="w-full relative  h-full">
      <h1 className=" p-2 flex items-center gap-2 text-3xl font-bold border border-t-0 border-l-0 border-r-0  border-zinc-300 dark:border-zinc-800 w-full">
        <div className="rounded-md border border-zinc-300 dark:border-zinc-800/80">
          <History size={24} />
        </div>
          History
        </h1>
        
        <div className=" border-zinc-300 dark:border-zinc-800  rounded-md m-2 flex flex-col gap-2   ">           
          <JobsHistory />
        </div>     
    </section> 
  )
}