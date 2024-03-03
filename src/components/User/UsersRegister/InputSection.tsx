import { useFormContext } from "react-hook-form"

interface InputProperties {
  input_name : string
  input_label : string
  input_placeholder : string
  input_value? : string
  condition? : {
    maxLength? : {value : number, message : string}
    minLength? : {value : number, message : string}
  }
}

export default function InputSection ( props : InputProperties ) {
  const {register, watch} = useFormContext()
  let inputWatched = watch(props.input_name)
  inputWatched = props.input_value  || inputWatched
  return (
    <fieldset className="flex flex-col gap-1 w-full lg:w-full">
      <label className="sr-only" htmlFor={props.input_name}>{props.input_label}</label>
      <input
        value={inputWatched}
        className="w-full  rounded-sm bg-transparent border border-zinc-300 dark:border-zinc-800/80 px-2 py-1" 
        placeholder={props.input_placeholder}
        id={props.input_name} 
        type="text" 
        {...register(props.input_name)}
      />
    </fieldset>

  )
}