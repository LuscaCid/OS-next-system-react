import { useFormContext } from "react-hook-form"

interface InputProperties {
  input_name : string
  input_label : string
  input_placeholder : string
}

export default function InputSection ( props : InputProperties) {
  const {register} = useFormContext()
  
  return (
    <fieldset className="flex flex-col gap-1">
      <label htmlFor={props.input_name}>{props.input_name}</label>
      <input
        className="rounded-md bg-transparent border border-zinc-300 dark:border-zinc-800/80 px-2 py-1" 
        placeholder={props.input_placeholder}
        id={props.input_name} 
        type="text" 
        {...register(props.input_name)}
      />
    </fieldset>

  )
}