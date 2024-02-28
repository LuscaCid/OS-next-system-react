import { User } from "lucide-react"
import InputSection from "./InputSection"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"

const formSchemaRegistration = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  address: z.object({
    street: z.string(),
    number: z.string(),
    complement: z.string(),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
})
type FormSchemaType = z.infer<typeof formSchemaRegistration>
export default function RegistrationSection(){

  const useFormProperties = useForm<FormSchemaType>({
    resolver : zodResolver(formSchemaRegistration),
    defaultValues : {
      name : "",
      email : "",
      cpf : "",
      address : {
        street : "",
        number : "",
        complement : "",
        district : "",
        city : "",
        state : "",
        zipcode : "",
      }
    }
  })

  const { handleSubmit, reset, formState: { isSubmiting } } = useFormProperties //changing this...
  return (
    <div className="w-full ">
      <div className="p-2 border-b border-l-0 border-zinc-300 dark:border-zinc-800/80">
        <h1 className='flex items-center gap-2 text-2xl font-bold'> 
          <div className="w-7 h-7 rounded-md border flex items-center justify-center border-zinc-300 dark:border-zinc-800/80">
          <User size={24}/>
          </div>
          Registro
        </h1>

      </div>
      <FormProvider {...useFormProperties}>
        <form 
          className=" p-1 m-2 rounded-md border-zinc-300 dark:border-zinc-800/80 border"
        >
          <legend>
            <h1 className="text-xl font-bold">
              Informações do cliente
            </h1>
          </legend>
          <div className="flex flex-row flex-wrap gap-2 ">
            <InputSection 
              input_label="Nome"
              input_name="name"
              input_placeholder="Nome do cliente"
            />  
            <InputSection 
              input_label="Nome"
              input_name="name"
              input_placeholder="Nome do cliente"
            />
            <InputSection 
              input_label="Nome"
              input_name="name"
              input_placeholder="Nome do cliente"
            />
            <InputSection 
              input_label="Nome"
              input_name="name"
              input_placeholder="Nome do cliente"
            />
          </div>
        </form>
      </FormProvider>
      
    </div>
  )
}