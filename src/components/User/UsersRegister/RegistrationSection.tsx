import { User } from "lucide-react"
import InputSection from "./InputSection"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

const formSchemaRegistration = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  phone : z.string(),
  address: z.object({
    street: z.string(),
    number: z.string(),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
})

type CEP = {
  
    cep : string
    logradouro : string
    complemento : string
    bairro : string
    localidade : string
    uf : string
     
}

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
  
  //const queryClient = useQueryClient()
  
  const {data : CEPResponse, mutateAsync : fetchCEPMutation} = useMutation({
    mutationFn : fetchCep,
    onSuccess : (data : CEP, ) => {
      console.log(data)
      
      /*
      
      queryClient.setQueryData(['cep'], (state : ICEPData[]) => [GenCEPCacheObject(variables),...state]) 
      
      */
    }
    
  })

  async function fetchCep(query : string) : Promise<CEP> {
    const response = await fetch(`https://viacep.com.br/ws/${query}/json/`)
    const data : CEP = await response.json()
    return data
  }

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
          className=" p-2 m-1 rounded-md border-zinc-300 dark:border-zinc-800/80 border"
        >
          <legend>
            <h1 className="text-xl font-bold mb-2 bg-zinc-200 dark:bg-zinc-800/80 rounded-sm p-1">
              Preencha os campos
            </h1>
          </legend>
          <div className="flex md:flex-row flex-col flex-wrap gap-2 lg:grid lg:grid-cols-2 lg:items-center [&>*:nth-child(3)]:mb-3 md:[&>*:nth-child(3)]:mb-0 ">
              
            <InputSection 
              input_label="Nome"
              input_name="name"
              input_placeholder="Nome do cliente"
            />  
            <InputSection 
              input_label="E-mail"
              input_name="email"
              input_placeholder="E-mail do cliente"
            />
            <InputSection
            
              input_label="cpf"
              input_name="cpf"
              input_placeholder="cpf do cliente"
            />
            <InputSection 
              input_label="CEP"
              input_name="address.zipcode"
              input_placeholder="CEP"
            />
            <InputSection 
              input_label="Nome"
              input_name="address.street"
              input_placeholder="Nome da rua"
            />
            <InputSection 
              input_label="Bairro"
              input_name="address.district"
              input_placeholder="Bairro"
            />
            <InputSection 
              input_label="Cidade"
              input_name="address.city"
              input_placeholder="Cidade"
            />
             <InputSection 
              input_label="Numero de telefone"
              input_name="address.phone"
              input_placeholder="Celular"
            />
            <InputSection 
              input_label="Número da casa"
              input_name="address.number"
              input_placeholder="Número da casa"
            />
            <InputSection 
              input_label="Estado brasileiro"
              input_name="state"
              input_placeholder="Estado"
            />
          </div>
        </form>
      </FormProvider>
      
    </div>
  )
}