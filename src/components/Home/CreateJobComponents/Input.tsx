import { LucideIcon } from "lucide-react"
import { useFormContext } from "react-hook-form"

interface InputProps {
  IType : "text" | "number" | "date" 
  input_placeholder : string
  icon : LucideIcon
  input_name : string
}
export default function Input ({ IType,icon : Icon,input_placeholder, input_name } : InputProps) {
  const {register} = useFormContext()
  
  return (
    <div className="relative h-12  mx-2 flex items-center gap-1 border dark:border-zinc-800 border-zinc-300 rounded-md shadow-sm ">
        
        {Icon && <Icon className="ml-1" size={24}/>}
        <input
          placeholder={input_placeholder} 
          {...register(input_name)}
          id={input_placeholder}
          className="bg-transparent w-full pl-8 h-full absolute"
          type={IType} 
        />     

      </div>
  )
} 