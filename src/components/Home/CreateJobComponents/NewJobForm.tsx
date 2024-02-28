
import { Coins, Smartphone, PenBox, PenLine} from 'lucide-react'
import Input from "../CreateJobComponents/Input";
import { useForm, FormProvider } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod';
import { AddNewJobMutationType, NewJobFormSchema, NewJobFormSchemaType, UsersProperties } from '../../../@types/CreateJob.d';
import { SelectClientSection } from './SelectClientSection';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { IHistoryData } from '@/@types/HistoryData';

export function NewJobForm () {

  const [userSelected, setUserSelected] = useState<UsersProperties | null>(null)
 
  function handleRemoveUserSelected() {
    setUserSelected(null)
  }

  function handleSelectUser(userSelected : UsersProperties) {
    setUserSelected(userSelected)
  }

  const newJobFormProps = useForm<NewJobFormSchemaType>({
    resolver : zodResolver(NewJobFormSchema),
    defaultValues : { 
      device : "",
      description : "",
    }
  })
  //form provider to inputs and handle submit form

  const {handleSubmit, reset, register} = newJobFormProps

  const queryClient = useQueryClient()

  function GenCacheObject(variables :  AddNewJobMutationType){
    return {
      device : variables.device,
      price : variables.price,
      description : variables.description,
      arrived_at : new Date().toUTCString(),
      customer_name : variables.userSelected.name,
      tag : variables.tag,
      id : Math.ceil(Math.random() * 3000),
      client_id : variables.userSelected.id
    }
  }

  const {mutateAsync: addNewJobMutation} = useMutation({
    mutationFn : AddNewJob,
    onSuccess : (_ ,variables) => {
      const cached = queryClient.getQueryData(['history'])
      console.log(cached)

      queryClient.setQueryData(['history'], 
      (state : IHistoryData []) => [GenCacheObject(variables), ...state ])
      
    }
  })
  async function AddNewJob(newJobFnData : AddNewJobMutationType) {
    try {
      const objectToSend = {
        client_id : newJobFnData.userSelected.id,
        arrived_at : new Date().toUTCString(),
        customer_name : newJobFnData.userSelected.name,
        description :newJobFnData.description,
        tag : newJobFnData.tag,
        device : newJobFnData.device
      }
      await fetch('http://localhost:3000/orders', {
        body : JSON.stringify(objectToSend),
        method : "POST"
      })
      reset()
    } catch(err : unknown) {
      alert(err)
      console.log(err)
    }
    
  }
  async function handleSubmitForm(data : NewJobFormSchemaType) {

    const newJobMutationObject : AddNewJobMutationType = {
      tag : data.tag,
      description : data.description,
      device : data.device,
      price : data.price,
      userSelected : {
        cpf : userSelected?.cpf,
        id : userSelected?.id,
        name : userSelected?.name
      } as UsersProperties
    }

    await addNewJobMutation(newJobMutationObject)
  }
  return (
    <FormProvider {...newJobFormProps}>
      <form 
      onSubmit={handleSubmit(handleSubmitForm)}
      className=" border flex-1 border-zinc-300 dark:border-zinc-800/80 rounded-md m-2 flex flex-col gap-1"
    >
      <h1 className='border-b p-1 dark:text-zinc-300 dark:border-zinc-800 border-zinc-300 w-full pb-1 text-xl text-zinc-800 font-bold  flex justify-between items-center'>
        Type some info to create a new Job <PenBox size={32} />
      </h1>
      
      <Input 
        IType="text"
        icon={Smartphone}
        input_name='device'
        input_placeholder='Nome do dispositivo'

      />
      <Input 
        IType="text"
        icon={Coins}
        input_name='price'
        input_placeholder='Valor do conserto'
        
      />
      <Input 
        IType="text"
        icon={Coins}
        input_name='tag'
        input_placeholder='Dê uma tag'
        
      />
      <textarea 
        className='p-2 mx-2 resize-none bg-transparent border dark:border-zinc-800 border-zinc-300 rounded-md shadow-md min-h-20'
        placeholder='Descrição relatando os problemas'
        {...register('description')}
      />

      <SelectClientSection 
        selectedUser={userSelected}
        handleSelectUser={handleSelectUser}
        handleRemoveSelectedUser={handleRemoveUserSelected}
      />
      <button 
        type='submit'
        className=' disabled:opacity-5 m-2 disabled:cursor-not-allowed flex items-center justify-center bg-transparent text-zinc-950 dark:text-zinc-300 rounded-md p-2 flex-end hover:bg-zinc-200  dark:hover:bg-zinc-800/90 transition duration-200 border dark:border-zinc-800 border-zinc-300  shadow-lg'
        >

        <PenLine size={24} /> Generate
      </button> 

    </form>
    </FormProvider>
    

  )
}