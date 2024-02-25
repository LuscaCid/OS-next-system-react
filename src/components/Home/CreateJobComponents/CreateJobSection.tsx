import { Plus } from "lucide-react";
import { NewJobForm } from "./NewJobForm";

export function CreateJobSection () {
    return (
        <div className="relative border border-t-0 border-zinc-300 dark:border-zinc-800/80 h-full col-span-1 md:col-span-1/5">
            <h1 className=" text-3xl font-bold border-b border-zinc-300 dark:border-zinc-800 w-full p-2 flex items-center gap-2">
                <div className="flex items-center border border-zinc-300 dark:border-zinc-800 rounded-md">
                    <Plus size={24}/> 
                </div>
                Add a job
            </h1>
            <NewJobForm />
        </div>
    )
}