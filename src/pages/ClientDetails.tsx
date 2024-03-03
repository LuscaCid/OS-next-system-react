import { api } from "../service/api"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Check, Loader, Pencil, X } from "lucide-react"
import { useSearchParams } from "react-router-dom"
import type { ClientToSendToDatabase } from "../components/User/UsersRegister/RegistrationSection"
import InputWithData from "../components/User/UserDetails/InputWithData"
import { FormProvider, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

export type IUserFromDatabase = ClientToSendToDatabase

const formSchemaEdition = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    cpf: z.string().optional(),
    phone : z.string().optional(),
    address: z.object({
      street: z.string().optional(),
      district: z.string().optional(),
      city: z.string().optional(),
      state: z.string().optional(),
      zipcode: z.string().optional(),
    }),
  })
  
type FormSchemaEdtionType = z.infer<typeof formSchemaEdition>
export function ClientDetails () {
    
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()

    const { data, isLoading, isError, isSuccess } = useQuery({
        queryKey : ["user-data"],
        queryFn : () => fetchUser(),
        staleTime : Infinity,
        retry : 2,
        refetchOnWindowFocus : false
    })
    
    async function fetchUser() {
        const id = searchParams.get("id")
        try {
            const response  = await api.get(`/clients?id=${id}`)
            console.log(response.data)
            const [data ] : IUserFromDatabase [] = response.data
            console.log(data)
            return data
        } catch (error) {
            console.log(error)
            return 
        }
    }

    const { mutateAsync : UpdateChangesMutation } = useMutation({
        mutationFn : updateUser,
        onSuccess : () => {
            queryClient.invalidateQueries({queryKey : ["user-data"]})
            return alert("Mudancas salvas com Sucesso!")
        },
        onError : (error) => console.log(error)
    })

    async function updateUser (data : FormSchemaEdtionType) {
        const id = searchParams.get("id")
        console.log(id)
        const response = await api.put(`/clients/${id}`, data)
        return response.data
    }
    
    const useFormProperties = useForm<FormSchemaEdtionType>({//criacao de um formulario de edicao que vai receber as modificacoes advindas d
        resolver : zodResolver(formSchemaEdition),
        defaultValues : {
          name : data?.name,
          email : data?.email,
          cpf : data?.cpf,
          phone : data?.phone,
          address : {
            street : data?.address.street,
            district : data?.address.district,
            city : data?.address.city,
            state : data?.address.state,
            zipcode : data?.address.zipcode,

          }
        }
      })    
      
    const { handleSubmit, reset } = useFormProperties
    
    async function handleSubmitEditionForm(data : FormSchemaEdtionType) {
        console.log(data)
        const responseData = await UpdateChangesMutation(data)
        console.log(responseData)
        reset()
    }

    if(isLoading) {
        return (
            <span className="flex items-center justify-between  w-40 mt-30 mx-auto">
                Loading... <Loader size={25} className="animate-spin"/>
            </span>
        )
    }
    if(isError) {
        return (
            <span className="flex border border-zinc-300 dark:border-zinc-800 p-2  items-center justify-between  w-40 mt-30 mx-auto">
                Error When Fetching data <X size={25} className="animate-ping"/>
            </span>
        )
    }
   
    return (
        <main className="relative m-2 overflow-y-auto  w-full p-2 border border-zinc-300 dark:border-zinc-800/80 rounded-md">
            <h1 className="text-3xl  font-bold flex items-center w-full justify-between p-1 border-b border-zinc-300 dark:border-zinc-800">Editar <Pencil size={24} /></h1>
            <FormProvider {...useFormProperties}>
                <form
                    onSubmit={handleSubmit(handleSubmitEditionForm)} 
                    className=" flex mt-6 flex-col gap-2 absolute inset-1">
                    {isSuccess && (
                        <div>
                            <div className="flex mt-8  sm:flex-nowrap flex-wrap items-center gap-2 w-full justify-between">
                            <InputWithData
                                labelTemplate="Alterar o nome"
                                
                                IName="name"
                                IPlaceholder="Nome"
                                Id="name"
    
                            />
                            <InputWithData
                                labelTemplate="Alterar o E-mail" 
                                IName="email"
                                IPlaceholder=" E-mail"
                                Id="email"
                                
                            />
                            <InputWithData
                                labelTemplate="Alterar o cpf" 
                                IName="cpf"
                                IPlaceholder="CPF"
                                Id="cpf"
                                
                            />
                        </div>
                        <div className="flex sm:flex-nowrap flex-wrap items-center gap-2 w-full justify-between">
                            <InputWithData
                                labelTemplate="Alterar o Celular" 
                                IName="phone"
                                IPlaceholder="Numero do celular"
                                Id="phone"
    
                            />
                            <InputWithData
                                labelTemplate="Alterar o CEP" 
                                IName="address.zipcode"
                                IPlaceholder="CEP"
                                Id="zipcode"
                                
                            />
                            <InputWithData
                                labelTemplate="Alterar a Rua" 
                                IName="address.street"
                                IPlaceholder="Nome da rua"
                                Id="street"
                                
                            />
                        </div>
                        <div className="flex sm:flex-nowrap flex-wrap items-center gap-2 w-full justify-between">
                            <InputWithData
                                labelTemplate="Alterar o Bairro" 
                                IName="address.district"
                                IPlaceholder="Bairro"
                                Id="district"
    
                            />
                            <InputWithData
                                labelTemplate="Alterar a cidade" 
                                IName="address.city"
                                IPlaceholder="Cidade"
                                Id="city"
                                
                            />
                            <InputWithData
                                labelTemplate="Alterar o estado" 
                                IName="address.state"
                                IPlaceholder="Alterar o estado"
                                Id="state"
                                
                            />
                    </div>
                        </div>
                    )}
                    <footer className="flex flex-col gap-2 items-center justify-between sm:flex sm:flex-row ">
                        <button
                            type="submit" 
                            className=" font-bold text-md w-full  flex items-center gap-2 rounded-md bg-zinc-200 dark:bg-zinc-800/80  hover:bg-green-300 dark:hover:bg-green-900 transition duration-200 justify-center  p-2 text-bold text-2x1">
                            <span>Salvar alteracoes</span> <Check className="text-green-500" size={24}  />
                        </button>

                        <button className=" w-full flex items-center font-bold text-md gap-2 justify-center p-2 bg-zinc-200 dark:bg-zinc-800/80 hover:bg-red-300 dark:hover:bg-red-800 transition duration-200 rounded-md  ">
                            <span>Deletar</span> <X className="text-red-500 " size={24} /> 
                        </button>
                    </footer>
                    
                </form>
            </FormProvider>

        </main>
    )     


}