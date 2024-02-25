import { LucideIcon } from "lucide-react"

interface InputProps {
  IType : "text" | "number" | "date" 
  placeholder : string
  icon : LucideIcon
  label : string
  name : string
}
export default function Input ({ IType,icon : Icon,label,placeholder, name } : InputProps) {
  return (
    <div className="relative h-12  m-2 flex items-center gap-2 border dark:border-zinc-800 border-zinc-300 rounded-md shadow-sm ">
        <label htmlFor={name} className="sr-only">{label}</label>
        {Icon && <Icon className="ml-1" size={24}/>}
        <input
          placeholder={placeholder} 
          name={name}
          id={name}
          className="bg-transparent w-full pl-8 h-full absolute"
          type={IType} 
        />     

      </div>
  )
} 