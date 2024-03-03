import { Loader, User } from "lucide-react"
import InputSection from "./InputSection"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { api } from "../../../service/api"

const formSchemaRegistration = z.object({
  name: z.string(),
  email: z.string(),
  cpf: z.string(),
  phone : z.string(),
  address: z.object({
    street: z.string(),
    district: z.string(),
    city: z.string(),
    state: z.string(),
    zipcode: z.string(),
  }),
})

type ClientToSendToDatabase = {
  name : string
  email : string
  cpf : string
  created_at : string
  phone : string
  address : {
    street : string
    district : string
    city : string
    state : string
    zipcode : string
  }
}

type FormSchemaType = z.infer<typeof formSchemaRegistration>

type ApiCepResponse = {
  uf : string
  bairro : string
  localidade : string
  logradouro : string
}
export default function RegistrationSection(){

  const useFormProperties = useForm<FormSchemaType>({
    resolver : zodResolver(formSchemaRegistration),
    defaultValues : {
      name : "",
      email : "",
      cpf : "",
      phone : "",
      address : {
        street : "",
        district : "",
        city : "",
        state : "",
        zipcode : "",
      }
    }
  })
  
  //const queryClient = useQueryClient()
  const { handleSubmit, reset, watch } = useFormProperties //changing this...
  
  const zipCodeValue = watch("address.zipcode")

  const { data, isError, isSuccess }  = useQuery({
    queryKey : ["cep", zipCodeValue],
    queryFn : () => fetchCep(zipCodeValue),
    enabled : zipCodeValue.length > 5,
    refetchOnWindowFocus : false,
    staleTime : Infinity,
    refetchOnMount : false,
  })

  const queryClient = useQueryClient()
  const {mutateAsync : addNewClientMutation, isPending} = useMutation({
    mutationFn : addNewClient,
    mutationKey : ["newClient"],
    onSuccess : (_, variables) => {
      
      queryClient.setQueryData(["UsersHistory"], (state : FormSchemaType []) => {
        return [variables ,...state]
      })
    }
  })
  
  const [displayStreet, setDisplayedStreet] = useState<string>(watch("address.street"))
  const [displayDistrict, setDisplayedDistrict] = useState<string>(watch("address.district"))
  const [displayCity, setDisplayedCity] = useState<string>(watch("address.city"))
  const [displayState, setDisplayedState] = useState<string>(watch("address.state"))
  
  async function fetchCep(query : string) : Promise<ApiCepResponse> {
    await new Promise((resolve) => setTimeout(resolve,2000))
    const endPoint = `https://viacep.com.br/ws/${query}/json/`
    const data :ApiCepResponse = await fetch(
      endPoint,
      {
        method : "GET",
        headers : {
          "Content-Type" : "application/json"
        }
      }
    )
    .then(data => data.json());
    console.log(data)
    return data
  }

  async function addNewClient (data : FormSchemaType) : Promise<FormSchemaType | void> {
    await new Promise(resolver => setTimeout(resolver, 1000))
    let response : FormSchemaType;
    try {
      response = await api.post("/clients", data)
      return response
    } catch (err : any) {
      if(err.message)alert(err.message)
      else alert(err)
      return err
    }
  }

  async function handleSubmitForm (data : FormSchemaType) {
    const formattedDataToSendToDatabase  : ClientToSendToDatabase = {
      address : {
        city : data.address.city,
        district : data.address.district,
        state : data.address.state,
        street: data.address.state,
        zipcode : data.address.zipcode
      },
      phone : data.phone,
      created_at : new Date().toISOString(),
      email : data.email,
      cpf : data.cpf,
      name : data.name
    }
    console.log(data)
    await addNewClientMutation(formattedDataToSendToDatabase)
    reset()
    alert("Cliente Cadastrado com sucesso!")

  }
  useEffect(() => {
    if(isError) {
      setDisplayedCity('um erro ocorreu')
    }
    if(isSuccess) {
      setDisplayedState(data.uf)
      setDisplayedCity(data.localidade)
      setDisplayedDistrict(data.bairro)
      setDisplayedStreet(data.logradouro)
    }
  }, [data, isSuccess, isError])
  return (
    <div className="w-full overflow-y-auto max-h-full">
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
        onSubmit={handleSubmit(handleSubmitForm)}
          className=" w-full p-2 rounded-md"
        >
          <legend>
            <h1 className="text-xl font-bold mb-2 bg-zinc-200 dark:bg-zinc-800/80 rounded-sm p-1">
              Preencha os campos
            </h1>
          </legend>
          <div className="w-full items-center justify-between max-h-screen h-full overflow-auto flex flex-col gap-2  md:gap-1 md:grid md:grid-cols-2 md:grid-flow-row">
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
              input_value={displayStreet}
            />
            <InputSection 
              input_label="Bairro"
              input_name="address.district"
              input_placeholder="Bairro"
              input_value={displayDistrict}
            />
            <InputSection 
              input_label="Cidade"
              input_name="address.city"
              input_placeholder="Cidade"
              input_value={displayCity}
            />
            <InputSection 
              input_label="Estado brasileiro"
              input_name="state"
              input_placeholder="Estado"
              input_value={displayState}
            />
             <InputSection 
              input_label="Numero de telefone"
              input_name="phone"
              input_placeholder="Celular"
            />
            <InputSection 
              input_label="Número da casa"
              input_name="address.number"
              input_placeholder="Número da casa"
            />
            
          </div>
          <button
            className=" flex mt-2 items-center justify-center gap-2 w-full p-2 rounded-md bg-transparent border border-zinc-300 dark:border-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-800/80 transition duration-200"
            type="submit"

          >
            {
              isPending? (
                <span className="flex items-center gap-2 justify-center"><Loader className="animate-spin" size={24} /> Registrar</span>
              ) : (
                "Registrar"
              )
            }
          </button>
        </form>
      </FormProvider>
      
    </div>
  )
}