import { PencilRuler } from "lucide-react"
import { useFormContext } from "react-hook-form"

interface InputWithDataProps {
    IValue? : string
    IPlaceholder : string
    IName : string
    Id : string 
    labelTemplate : string
}

export default function InputWithData ({labelTemplate, IName, IPlaceholder, IValue, Id } : InputWithDataProps) {
   
    const { register } = useFormContext()

    return (
        <div className="w-full mb-2 flex flex-col gap-2 rounded-md border border-zinc-300 dark:border-zinc-800 p-2 shadow-lg">
            <div className="flex w-full justify-between items-center">
                <label htmlFor={Id}>{labelTemplate}</label>
                <PencilRuler size={20}  />
            </div>
            <input   
                id={Id}
                {...register(IName)}
                className="py-0.5 px-1 bg-transparent border-b border-zinc-500 dark:border-zinc-600/80 " 
                type="text"
                placeholder={IPlaceholder}
                value={IValue}
            />  
        </div>
    )
}